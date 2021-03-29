import dns from 'dns';
import * as jwt from 'jsonwebtoken';
import { v4 as uuid4 } from 'uuid';
import user from '../models/User.mjs';

const { User } = user;
let amplitudeUserId;

const env = process.env.NODE_ENV;
const isProd = env === 'production';

export const routes = function(fastify, opts, done) {
  const nextRequestHandler = opts.nextApp.getRequestHandler();

  fastify.get('/_next/*', (req, reply) => {
    nextRequestHandler(req.raw, reply.raw).then(() => {
      reply.sent = true;
    });
  });

  const contactSchema = {
    type: 'object',
    required: ['email', 'message', 'name'],
    properties: {
      email: { type: 'string' },
      message: { type: 'string' },
      name: { type: 'string' }
    }
  };

  fastify.post('/api/contact', contactSchema, (req, reply) => {
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
        text: req.body.message
      },
      (err, info) => {
        if (err) {
          fastify.log.error(err);
        }

        reply.send({
          messageId: info.messageId
        });
      }
    );
  });

  fastify.get(
    '/admin',
    {
      preValidation: [fastify.authenticate]
    },
    req => {
      return req.user;
    }
  );

  fastify.get('/login', req => {
    const email = req.email;
    const userRecord = User.findOne({ email });

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
      email: userRecord.email
    };
    const signature = process.env.AUTH_JWT_SIGNATURE;
    const expiration = '6h';
    const token = jwt.sign({ data }, signature, { expiresIn: expiration });

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name
      },
      token
    };
  });

  fastify.all('/*', (req, reply) => {
    nextRequestHandler(req.raw, reply.raw).then(() => {
      const clientAddress = req.headers['x-forwarded-for'] || req.remoteAddress;
      fastify.log.info(`${clientAddress}`, clientAddress);

      if (opts.amplitudeClient) {
        const event = {
          event_type: 'CLIENT_REQUEST',
          user_id: amplitudeUserId
        };
        amplitudeUserId = amplitudeUserId ? amplitudeUserId : uuid4();
        opts.amplitudeClient.logEvent(event);
      }

      reply.sent = true;
    });
  });

  done();
};
