'use client';

import React, { useState } from 'react';
import { FormikHelpers, useFormik } from 'formik';
import { Button, Form, Input } from 'antd';

interface Values {
  eventOrSituation?: string;
  feelingsStart?: string;
  automaticThoughts?: string;
  thinkingErrors?: string;
  alternativeThoughts?: string;
  feelingsEnd?: string;
}

export default function CbtForm() {
  const formik = useFormik<Values>({
    initialValues: {},
    onSubmit(values: Values, { setSubmitting }: FormikHelpers<Values>) {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    },
  });
  const [step, setStep] = useState(0);

  return (
    <div>
      <h1>Signup</h1>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={formik.handleSubmit}>
        <Form.Item label="Event or situation">
          <Input
            id="eventOrSituation"
            name="eventOrSituation"
            onChange={formik.handleChange}
            value={formik.values.eventOrSituation}
          />
        </Form.Item>
        <Form.Item label="Feelings">
          <Input
            id="feelingsStart"
            name="feelingsStart"
            onChange={formik.handleChange}
            value={formik.values.feelingsStart}
          />
        </Form.Item>
        <Form.Item label="Automatic thoughts">
          <Input.TextArea
            id="automaticThoughts"
            name="automaticThoughts"
            onChange={formik.handleChange}
            value={formik.values.automaticThoughts}
          />
        </Form.Item>
        <Form.Item label="Thinking errors">
          <Input.TextArea
            id="thinkingErrors"
            name="thinkingErrors"
            onChange={formik.handleChange}
            value={formik.values.thinkingErrors}
          />
        </Form.Item>
        <Form.Item label="Alternative thoughts">
          <Input.TextArea
            id="alternativeThoughts"
            name="alternativeThoughts"
            onChange={formik.handleChange}
            value={formik.values.alternativeThoughts}
          />
        </Form.Item>
        <Form.Item label="Feelings">
          <Input
            id="feelingsEnd"
            name="feelingsEnd"
            onChange={formik.handleChange}
            value={formik.values.feelingsEnd}
          />
        </Form.Item>
        <Form.Item>
          {step > 0 && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setStep(step - 1);
              }}
            >
              Previous
            </Button>
          )}
          {step < 5 && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                setStep(step + 1);
              }}
            >
              Next
            </Button>
          )}
          {step === 5 && (
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
}
