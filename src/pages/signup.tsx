import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';

export default function Signup(): ReactElement {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();

  async function submitSignupForm(body: { email: string; password: string }) {
    const bodyJson = JSON.stringify(body);

    // send `user`
    fetch('/api/users', {
      body: bodyJson,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(() => router.push('/'))
      .catch((reason) => console.log(reason));
  }

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit(submitSignupForm)}>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-3">
            <label className="block mb-2" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              autoComplete="email"
              className="appearance-none block w-full border py-2 px-3 mb-3 bg-gray-100 focus:outline-none focus:bg-white"
              id="email"
              name="email"
              placeholder="username@hostname.com"
              ref={register({
                required: 'Email is required.',
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: 'Value must match email address format.',
                },
              })}
              type="text"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-3">
            <label className="block mb-2" htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              className="appearance-none block w-full border py-2 px-3 mb-3 bg-gray-100 focus:outline-none focus:bg-white"
              id="password"
              name="password"
              placeholder="Password"
              ref={register({ required: 'Password is required.' })}
              type="password"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3">
            <Button text="Sign Up" type="submit" />
          </div>
          <div className="md:w-2/3"></div>
        </div>
      </form>
    </div>
  );
}
