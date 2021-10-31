import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fastifyNodemailer from 'fastify-nodemailer';
import fp from 'fastify-plugin';
import get from 'lodash.get';
import nodemailerMailgunTransport from 'nodemailer-mailgun-transport';

const mailgunApiKey = get(process.env, 'MAILGUN_API_KEY');
const mailgunDomain = get(process.env, 'MAILGUN_DOMAIN');

const fastifyMailgun = fp(
  async function (fastify, _opts, done) {
    mailgunApiKey &&
      mailgunDomain &&
      fastify.register(
        fastifyNodemailer,
        nodemailerMailgunTransport({
          auth: {
            api_key: mailgunApiKey,
            domain: mailgunDomain,
          },
        })
      );

    done();
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-mailgun' }
);

export { fastifyMailgun };
