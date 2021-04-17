import get from 'lodash.get';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link, { LinkProps } from 'next/link';

export default function Signup(): ReactElement {
  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useState<{ name?: string; password?: string }>({
    name: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = get(e, 'target.name');
    const value = get(e, 'target.value');
    const update = {};
    update[name] = value;

    setUser(() => update);
  };

  const onSignupClick = () => {
    const userData = {
      name: user.name,
      password: user.password,
    };

    // TODO POST /api/users
    console.log('Sign up ' + userData.name + ' ' + userData.password);
  };

  return (
    <div className="w-full max-w-lg">
      <form onSubmit={handleSubmit(onSignupClick)}>
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
              onChange={onChange}
              placeholder="First Last"
              ref={register({ required: 'Name is required.' })}
              type="text"
              value={user.name}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
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
              onChange={onChange}
              placeholder="Password"
              ref={register({ required: 'Password is required.' })}
              type="password"
              value={user.password}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
      </form>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="shadow focus:shadow-outline focus:outline-none py-2 px-3"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="md:w-2/3"></div>
      </div>
    </div>
  );
}
