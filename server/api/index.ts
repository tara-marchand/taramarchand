import jwt, { Secret } from 'jsonwebtoken';
import Sequelize from 'sequelize';
import { FindOptions } from 'sequelize/types';
import twilio from 'twilio';

import { models, sequelize } from '../models';
import { User, UserAttributes, UserCreationAttributes } from '../models/User';
import { contactSchema } from '../schemas/contact';
import { smsSchema } from '../schemas/sms';

export default function api(fastify, _opts, done) {
  fastify.post('/_signup', (req, reply) => {
    const token = fastify.jwt.sign({ foo: 'bar' });

    reply.send({ token });
  });

  fastify.get('/_login', async (req, reply) => {
    const email = req.email;
    const userRecord = (await sequelize.models.User.findOne({
      email,
    } as FindOptions<UserAttributes>)) as User;

    if (!userRecord) {
      throw new Error('User not found');
    } else {
      const correctPassword = fastify.jwt.verify(
        userRecord.password,
        req.password
      );

      if (!correctPassword) {
        throw new Error('Incorrect password');
      }
    }

    const data = {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
    };
    const signature = process.env.AUTH_JWT_SIGNATURE as Secret;
    const expiration = '6h';
    const token = jwt.sign({ data }, signature, { expiresIn: expiration });

    reply.send({
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token,
    });
  });

  fastify.get('/_cookies', (req, reply) => {
    const token = reply.jwtSign({
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

  fastify.post('/contact', contactSchema, (req, reply) => {
    let { nodemailer } = fastify;
    let subject = '[taramarchand.com] Contact form message';
    if (req.body.name) {
      subject += ` from ${req.body.name}`;
    }

    nodemailer.sendMail(
      {
        from: req.body.email,
        to: 'tara@mac.com',
        subject,
        text: req.body.message,
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
  });

  fastify.post('/sms', smsSchema, (_req, reply) => {
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
  });

  // Log in
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: { $ref: 'user#' },
      response: {
        200: { $ref: 'user#' },
      },
    },
    handler: async function (request, reply) {
      const { email, password } = request.body;

      // if the username / password is missing, we use status code 400
      // indicating a bad request was made and send back a message
      if (!email || !password) {
        return reply
          .status(400)
          .send('Request missing email or password param');
      }

      try {
        let user = await User.authenticate(email, password);
        user = await user.authorize();

        return reply.serialize(user);
      } catch (err) {
        return reply.status(400).send('Invalid email or password');
      }
    },
  });

  // Log out
  fastify.route({
    method: 'DELETE',
    url: '/logout',
    schema: {
      body: { $ref: 'user#' },
      response: {
        200: { $ref: 'user#' },
      },
    },
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
