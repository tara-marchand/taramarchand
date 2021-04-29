// Fastify route schema
export const userSchema = {
  $id: 'user',
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  required: ['email', 'password'],
};
