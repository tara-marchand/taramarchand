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

  fastify.post('/api/contact', (req, reply, next) => {
    let { nodemailer } = fastify;
    let from = req.params.email;

    nodemailer.sendMail(
      {
        from,
        to: 'tara@mac.com',
        subject: 'foo',
        text: 'bar'
      },
      (err, info) => {
        if (err) {
          next(err);
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
    (req, reply) => {
      return req.user;
    }
  );

  fastify.get('/login', (req, reply) => {
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
      if (isProd) {
        const clientAddress =
          req.headers['x-forwarded-for'] || req.remoteAddress;

        clientAddress &&
          dns.reverse(clientAddress, function(err, domains) {
            if (err) {
              fastify.log.error(err.toString());
            }
            const hostname = domains && domains.length ? domains[0] : '';

            fastify.log.error({ clientHostname: hostname });

            if (opts.amplitudeClient) {
              const event = {
                event_type: 'CLIENT_REQUEST',
                user_id: amplitudeUserId
              };
              if (hostname !== '') {
                event.user_properties.hostname = hostname;
              }
              amplitudeUserId = amplitudeUserId ? amplitudeUserId : uuid4();
              opts.amplitudeClient.logEvent(event);
            }
          });
      }
      reply.sent = true;
    });
  });

  done();
};
