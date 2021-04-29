export const contactSchema = {
  $id: 'contact',
  type: 'object',
  required: ['email', 'message', 'name'],
  properties: {
    email: { type: 'string' },
    message: { type: 'string' },
    name: { type: 'string' },
  },
};
