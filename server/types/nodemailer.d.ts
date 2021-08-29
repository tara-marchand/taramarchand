declare module 'nodemailer/lib/mailer' {}

export type Nodemailer = {
  sendMail: (
    options: unknown,
    callback: (
      err: Record<string, unknown>,
      info: Record<string, unknown>
    ) => void
  ) => Promise<unknown>;
};
