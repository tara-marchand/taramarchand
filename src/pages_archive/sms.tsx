import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Sms(): JSX.Element {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  async function submitSmsForm(bodyData: {
    fromEmail: string;
    message: string;
  }) {
    const body = JSON.stringify(bodyData);

    fetch('/fastify/api/sms', {
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(() => router.push('/'))
      .catch((reason) => {
        console.log(reason);
      });
  }

  return (
    <form className="w-full max-w-lg" onSubmit={handleSubmit(submitSmsForm)}>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="fromEmail">
            Your Email <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="fromEmail"
            className="appearance-none block w-full border py-2 px-3 mb-3 focus:outline-none bg-gray-100 focus:bg-white"
            id="fromEmail"
            name="fromEmail"
            type="text"
            placeholder="username@domain.com"
            ref={register({
              required: 'Your email address is required.',
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: 'Value must match email address format.',
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="message">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            className="no-resize appearance-none block w-full border py-2 px-3 mb-3 focus:outline-none bg-gray-100 focus:bg-white h-48 resize-none"
            id="message"
            name="message"
            ref={register({ required: 'Message is required.' })}
          ></textarea>
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="shadow focus:shadow-outline focus:outline-none py-2 px-3"
            type="submit"
          >
            Send Message
          </button>
        </div>
        <div className="md:w-2/3"></div>
      </div>
    </form>
  );
}
