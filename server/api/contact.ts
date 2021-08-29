import * as fastify from 'fastify';

import { ExtendedFastifyInstance } from '../types/fastify';

export const contact: fastify.FastifyPluginCallback<Record<never, never>> = (
  fastify,
  _options,
  done
) => {
  fastify.route({
    method: 'POST',
    url: '/contact',
    schema: {
      body: {
        schema: {
          $ref: 'https://www.taramarchand.com/#contact',
        },
      },
    },
    handler: function (
      request: fastify.FastifyRequest<{
        Body: {
          email: string;
          fastify: ExtendedFastifyInstance;
          message: string;
          name: string;
        };
      }>,
      reply
    ) {
      const typedThis = this as ExtendedFastifyInstance;
      const { nodemailer } = typedThis;
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
        (err: Record<string, unknown>, info: Record<string, unknown>) => {
          console.log(request.body);
          if (err) {
            fastify.log.error(err.message as string);
          }

          reply.send({
            messageId: info.messageId,
          });
        }
      );
    },
  });
  done();
};

export default contact;
