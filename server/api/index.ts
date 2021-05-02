import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import twilio from 'twilio';

import { models } from '../models';
import { User } from '../models/User';
import get from 'lodash.get';

export default function api(fastify, _opts, done) {
  fastify.route({
    method: 'POST',
    // preValidation: fastify.authenticate,
    url: '/signup',
    schema: {
      body: {
        schema: { $ref: 'https://www.taramarchand.com/#usersch' },
      },
      response: {
        200: {
          schema: { $ref: 'https://www.taramarchand.com/#usersch' },
        },
      },
    },
    handler: async function (request, reply) {
      const body = get(request, 'body') as User | undefined;
      let hashedPassword;

      if (body) {
        hashedPassword = bcrypt.hashSync(body.password, 10);
      }

      // Create new user
      if (hashedPassword) {
        try {
          const userData = Object.assign({}, body, {
            password: hashedPassword,
          });
          const user = (await models.User.create(userData)) as User;
          // Data will be an object with the user and its `AuthToken`
          // Send back the new user and auth token to the client
          //
          // const userData = await user.authorize();
          // const token = fastify.jwt.sign({ foo: 'bar' });
          // reply.send({ userData, token });
          return reply.serialize({
            id: user.id,
            email: user.email,
          });
        } catch (err) {
          return reply.status(400).send(err);
        }
      }
    },
  });

  // Log in
  fastify.route({
    method: 'POST',
    url: '/signin',
    schema: {
      body: {
        id: {
          type: 'number',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
    handler: async function (request, reply) {
      const body = get(request, 'body') as
        | { email: string; password: string }
        | undefined;

      // if the username /password is missing, use status code 400
      // indicating a bad request was made and send back a message
      if (!body || !body.email || !body.password) {
        return reply
          .status(400)
          .send('Request missing body or email or password param');
      }

      try {
        let user = await User.authenticate(body.email, body.password);
        user = await user.authorize();

        return reply.serialize(user);
      } catch (err) {
        return reply.status(400).send('Invalid email or password');
      }
    },
  });

  fastify.get('/_cookies', async (req, reply) => {
    const token = await reply.jwtSign({
      name: 'foo',
      role: ['admin', 'spy'],
    });

    reply
      .setCookie('token', token, {
        domain: '*',
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .code(200)
      .send('Cookie sent');
  });

  fastify.get('/_verifycookie', async (req, reply) => {
    try {
      req
        .jwtVerify()
        .then(() => {
          reply.send({ code: 'OK', message: 'it works!' });
        })
        .catch((error) => fastify.log.error(error));
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.post(
    '/contact',
    {
      schema: {
        body:  { $ref: 'https://www.taramarchand.com/#contactsch' }
      },
    },
    (request, reply) => {
      let { nodemailer } = fastify;
      let subject = '[taramarchand.com] Contact form message';
      if (request.body.name) {
        subject += ` from ${request.body.name}`;
      }

      nodemailer.sendMail(
        {
          from: request.body.email,
          to: 'tara@mac.com',
          subject,
          text: request.body.message,
        },
        (err, info) => {
          if (err) {
            fastify.log.error(err);
          }

          reply.send({
            messageId: info.messageId,
          });
        }
      );
    }
  );

  fastify.post('/sms', {
    schema: { $ref: 'https://www.taramarchand.com/#smssch' },
    handler: (_req, reply) => {
      const twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      const myPhoneNum = process.env.MY_PHONE_NUM || '';

      twilioClient.messages
        .create({
          body: 'body',
          from: '',
          to: myPhoneNum,
        })
        .then((message) => reply.send(message));
    },
  });

  // Log out
  fastify.route({
    method: 'DELETE',
    url: '/logout',
    // schema: {
    //   body: { $ref: 'user#' },
    //   response: {
    //     200: { $ref: 'user#' },
    //   },
    // },
    handler: async function (request, reply) {
      const {
        user,
        cookies: { auth_token: authToken },
      } = request;

      if (user && authToken) {
        await request.user.logout(authToken);
        return reply.status(204).send();
      }

      return reply
        .status(400)
        .send({ errors: [{ message: 'Not authenticated' }] });
    },
  });

  done();
}
