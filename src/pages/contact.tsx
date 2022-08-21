import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [captchaToken, setCaptchaToken] = useState<string>();
  const { register, getValues, errors } = useForm();
  const router = useRouter();
  const captchaRef = useRef<HCaptcha>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    captchaRef.current?.execute();
  }

  useEffect(() => {
    if (captchaToken) {
      const body = JSON.stringify(getValues());
      fetch('fastify/api/contact', {
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
  }, [captchaToken, getValues(), router]);

  return (
    <form className="w-full max-w-full" onSubmit={onSubmit}>
      <div className="-mx-2 mb-4 flex flex-wrap">
        <div className="w-full px-3">
          <label className="mb-2 block" htmlFor="name">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="name"
            className="mb-3 block w-full appearance-none border bg-gray-100 py-2 px-3 focus:bg-white focus:outline-none"
            id="name"
            type="text"
            placeholder="First Last"
            {...register('name', { required: 'Name is required.' })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
      </div>
      <div className="-mx-2 mb-4 flex flex-wrap">
        <div className="w-full px-3">
          <label className="mb-2 block" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            autoComplete="email"
            className="mb-3 block w-full appearance-none border bg-gray-100 py-2 px-3 focus:bg-white focus:outline-none"
            id="email"
            type="text"
            placeholder="username@domain.com"
            {...register('email', {
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
      <div className="-mx-2 mb-4 flex flex-wrap">
        <div className="w-full px-3">
          <label className="mb-2 block" htmlFor="message">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            className="no-resize mb-3 block h-48 w-full resize-none appearance-none border bg-gray-100 py-2 px-3 focus:bg-white focus:outline-none"
            id="message"
            {...register('message', { required: 'Message is required.' })}
          ></textarea>
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
        </div>
      </div>
      <div className="mb-4">
        <HCaptcha
          sitekey="131a7a71-ae46-4c71-abe0-79934e238aa3"
          onVerify={setCaptchaToken}
          ref={captchaRef}
        />
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="focus:shadow-outline py-2 px-3 shadow focus:outline-none"
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
