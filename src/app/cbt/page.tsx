'use client';

import React, { useState } from 'react';

enum Step {
  'event',
  'eventFeelings',
  'automaticThoughts',
  'thinkingErrors',
  'alternativeThoughts',
  'alternativeThoughtFeelings',
}

export default function Cbt() {
  const [step, setStep] = useState();

  return (
    <div>
      <h2>Thought record</h2>
      {`${step}`}
      {typeof step === undefined && <button onClick={() => setStep(Step.event)}>Start</button>}
      {typeof step === 'number' && (
        <form>
          {step === Step.event && (
            <label className="block">
              <span>Event/situation</span>{' '}
              <textarea className="box-border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 " />
            </label>
          )}
          {step === Step.eventFeelings && (
            <label className="block">
              <span>Feelings</span>{' '}
              <input
                className="box-border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                type="number"
              />
            </label>
          )}
          {step === Step.automaticThoughts && (
            <label className="block">
              <span>Automatic thoughts</span>
              <textarea className="box-border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 " />
            </label>
          )}
          {step === Step.thinkingErrors && (
            <label className="block">
              <span>Thinking errors</span>{' '}
              <textarea className="box-border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 " />
            </label>
          )}
          {step === Step.alternativeThoughts && (
            <label className="block">
              <span>Alternative thoughts</span>
              <textarea className="block w-full box-border mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 " />
            </label>
          )}
          {step === Step.alternativeThoughtFeelings && (
            <label className="block">
              <span>Feelings</span>{' '}
              <input
                className="box-border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                type="number"
              />
            </label>
          )}
        </form>
      )}
    </div>
  );
}
