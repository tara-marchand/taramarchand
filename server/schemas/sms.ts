export const smsSchema = {
  $id: 'sms',
  type: 'object',
  required: ['fromEmail', 'message'],
  properties: {
    fromEmail: { type: 'string' },
    message: { type: 'string' },
  },
};
