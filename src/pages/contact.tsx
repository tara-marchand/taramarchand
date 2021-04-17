import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Contact(): JSX.Element {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  async function submitContactForm(bodyData: {
    email: string;
    message: string;
    name: string;
  }) {
    const body = JSON.stringify(bodyData);

    fetch('/api/contact', {
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
    <form
      className="w-full max-w-lg"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="name"
            className="appearance-none block w-full border py-2 px-3 mb-3 bg-gray-100 focus:outline-none focus:bg-white"
            id="name"
            name="name"
            type="text"
            placeholder="First Last"
            ref={register({ required: 'Name is required.' })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="email"
            className="appearance-none block w-full border py-2 px-3 mb-3 focus:outline-none bg-gray-100 focus:bg-white"
            id="email"
            name="email"
            type="text"
            placeholder="username@domain.com"
            ref={register({
              required: 'Email is required.',
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
