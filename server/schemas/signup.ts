// Fastify route schema
const commonProperties = {
  email: {
    type: 'string',
  },
};

export const signupRequest = {
  $id: 'signupRequest',
  type: 'object',
  properties: {
    ...commonProperties,
    password: {
      type: 'string',
    },
  },
  required: ['email'],
};

export const signupResponse = {
  $id: 'signupReply',
  type: 'object',
  properties: {
    ...commonProperties,
    id: {
      type: 'number',
    },
  },
};
