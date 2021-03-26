import nodemailer from 'nodemailer';
import React from 'react';

export default function home(): JSX.Element {
  return (
    <form className="w-full max-w-lg" onSubmit={submitContactForm}>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="name">
            Name
          </label>
          <input
            autoComplete="name"
            className="appearance-none block w-full border border-gray-200 py-2 px-3 mb-3 bg-gray-100 focus:outline-none focus:bg-white"
            id="name"
            name="name"
            type="text"
            placeholder="First Last"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="email">
            E-mail
          </label>
          <input
            autoComplete="email"
            className="appearance-none block w-full border border-gray-200 py-2 px-3 mb-3 focus:outline-none bg-gray-100 focus:bg-white"
            id="email"
            name="email"
            type="email"
            placeholder="username@hostname.com"
            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full px-3">
          <label className="block mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="no-resize appearance-none block w-full border border-gray-200 py-2 px-3 mb-3 focus:outline-none bg-gray-100 focus:bg-white h-48 resize-none"
            id="message"
            name="message"
            required
          ></textarea>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3">
          <button
            className="shadow focus:shadow-outline focus:outline-none py-2 px-3"
            type="submit"
          >
            Send
          </button>
        </div>
        <div className="md:w-2/3"></div>
      </div>
    </form>
  );
}

async function submitContactForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const { elements } = event.currentTarget;
  const body = JSON.stringify({
    email: (elements.namedItem('email') as HTMLInputElement).value,
    message: (elements.namedItem('message') as HTMLTextAreaElement).value,
    name: (elements.namedItem('name') as HTMLInputElement).value,
  });

  fetch('/api/contact', {
    body,
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then((response) => response.json())
    .catch((reason) => {
      console.log(reason);
    });
}
