import { FastifyPluginCallback } from 'fastify';
import twilio from 'twilio';

export const sms: FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'POST',
    url: '/sms',
    schema: {
      body: {
        schema: {
          $ref: 'https://www.taramarchand.com/#smssch',
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
