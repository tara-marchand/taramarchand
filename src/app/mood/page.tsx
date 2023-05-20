'use client';

import React, { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocalStorage } from './useLocalStorage';

type Inputs = {
  habit?: string;
};

export default function Mood() {
  const formDataKey = 'form-local-data';

  const { state: formDataString, update } = useLocalStorage(formDataKey, null);

  const getSavedData = useCallback(() => {
    const initialValues: Inputs = { habit: undefined };
    if (formDataString) {
     // Parse it to a JS object with form data
      try {
        return JSON.parse(formDataString);
      } catch (err) {
        console.log(err);
      }
    }
    return initialValues;
  }, [formDataString]);

  const {
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>({ defaultValues: getSavedData() });

  const onFormSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    localStorage.removeItem(formDataKey);
    console.log(data);
  }

  console.log(watch('habit')); // watch input value by passing the name of it

  return (
    <>
      {/* {habits?.forEach((habit) => (
        <p>{habit}</p>
      ))} */}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>
          Habit{' '}
          <input type="string" onChange={(e) => update(e.target.value)} {...(register('habit'), { required: true })} />
        </label>
        <button type="submit">
          Submit
        </button>
        {/* {errors.habit && <span>Habit is required</span>} */}
      </form>
    </>
  );
}

