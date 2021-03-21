import React, { ReactElement, useState } from 'react';

function AddJob({}: Props): ReactElement {
  const [company, setCompany] = useState<string>();
  const [dateApplied, setDateApplied] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [url, setUrl] = useState<string>();

  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 py-4 shadow-lg bg-gray-200">
      <label className="block">
        <span>Company</span>
        <input
          className="block w-full"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>
      <label className="block">
        <span>Date Applied</span>
        <input
          className="block w-full"
          type="text"
          value={dateApplied}
          readOnly
        />
      </label>
      <label className="block">
        <span>Job Title</span>
        <input
          className="block w-full"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="block">
        <span>Job URL</span>
        <input
          className="block w-full"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
    </form>
  );
}

export default AddJob;
