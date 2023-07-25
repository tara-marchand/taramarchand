'use client';

import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
  eventOrSituation?: string;
  feelingsStart?: string;
  automaticThoughts?: string;
  thinkingErrors?: string;
  alternativeThoughts?: string;
  feelingsEnd?: string;
}

export default function CbtForm() {
  const [step, setStep] = useState(0);
  const initialValues: Values = {};

  function handleSubmit(
      values: Values,
      { setSubmitting }: FormikHelpers<Values>
    ) {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    }

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form className='w-full'>
          {step === 0 && <div className="h-1/2">
          <label className="block" htmlFor="eventOrSituation">Event or situation</label>
          <Field id="eventOrSituation" name="eventOrSituation" />
          </div>}
          
          {step === 1 && <div className="h-1/2">
          <label className="block" htmlFor="feelingsStart">Feelings</label>
          <Field id="feelingsStart" name="feelingsStart" />
          </div>}
          
          {step === 2 && <div className="h-1/2">
          <label className="block" htmlFor="automaticThoughts">Automatic thoughts</label>
          <Field id="automaticThoughts" name="automaticThoughts" component="textarea" />
          </div>}
          
          {step === 3 && <div className="h-1/2">
          <label className="block" htmlFor="thinkingErrors">Thinking errors</label>
          <Field id="thinkingErrors" name="thinkingErrors" component="textarea" />
          </div>}
          
          {step === 4 && <div className="h-1/2">
          <label className="block" htmlFor="alternativeThoughts">Alternative thoughts</label>
          <Field id="alternativeThoughts" name="alternativeThoughts" component="textarea" />
          </div>}
          
          {step === 5 && <div className="h-1/2">
          <label className="block" htmlFor="feelingsEnd">Feelings</label>
          <Field id="feelingsEnd" name="feelingsEnd" />
          </div>}
          
          {step === 6 && <div className="h-1/2">
          <button className="block" type="submit">Submit</button>
          </div>}
          {step !== 0 && <button className="block" onClick={(e) => { e.preventDefault(); setStep(step - 1)}}>Previous</button>}
          {step !== 6 && <button className="block" onClick={(e) => { e.preventDefault(); setStep(step + 1)}}>Next</button>}
        </Form>
      </Formik>
    </div>
  );
};
