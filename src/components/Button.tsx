import React from 'react';

interface Props {
  text: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export function Button(props: Props) {
  return (
    <button
      className="bg-gray-500 hover:bg-gray-700 cursor-pointer text-white text-base py-2 px-4 rounded border-none"
      type={props.type}
    >
      {props.text}
    </button>
  );
}
