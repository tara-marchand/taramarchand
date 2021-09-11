import { FastifyPluginCallback } from 'fastify';
import twilio from 'twilio';
import { ExtendedFastifyInstance } from '../types/fastify';

export const sms: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'POST',
    url: '/sms',
    preHandler: (fastify as ExtendedFastifyInstance).authenticate,
    schema: {
      body: {
        schema: {
          $ref: 'https://www.taramarchand.com/#sms',
        },
      },
    },
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
  done();
};

export default sms;
