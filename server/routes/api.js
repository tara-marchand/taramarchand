const twilio = require('twilio');
const user = require('../models/User');
const jwt = require('jsonwebtoken');

const { User } = user;

const contactSchema = {
  type: 'object',
  required: ['email', 'message', 'name'],
  properties: {
    email: { type: 'string' },
    message: { type: 'string' },
    name: { type: 'string' },
  },
};

const smsSchema = {
  type: 'object',
  required: ['fromEmail', 'message'],
  properties: {
    fromEmail: { type: 'string' },
    message: { type: 'string' },
  },
};

module.exports = function api(fastify, _opts, done) {
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
      email: userRecord.email,
    };
    const signature = process.env.AUTH_JWT_SIGNATURE;
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
    const myPhoneNum = process.env.MY_PHONE_NUM;

    twilioClient.messages
      .create({
        body: 'body',
        from: '',
        to: myPhoneNum,
      })
      .then((message) => reply.send(message));
  });

  done();
};
