import { FastifyPluginCallback, RawServerBase } from 'fastify';
import fastifyNodemailer from 'fastify-nodemailer';
import fp from 'fastify-plugin';
import { get } from 'lodash';
import nodemailerMailgunTransport from 'nodemailer-mailgun-transport';

const mailgunApiKey = get(process.env, 'MAILGUN_API_KEY');
const mailgunDomain = get(process.env, 'MAILGUN_DOMAIN');

const getMailgunTransport = () =>
  mailgunApiKey &&
  mailgunDomain &&
  nodemailerMailgunTransport({
    auth: {
      api_key: mailgunApiKey,
      domain: mailgunDomain,
    },
  });

const fastifyMailgun = fp(
  async function (fastify, _opts, done) {
    const nodemailerMailgunTransport = getMailgunTransport();
    nodemailerMailgunTransport &&
      fastify
        .register(fastifyNodemailer, nodemailerMailgunTransport)
        .then(() => done());
  } as FastifyPluginCallback<Record<string, unknown>, RawServerBase>,
  { name: 'fastify-mailgun' }
);

export default fastifyMailgun;
