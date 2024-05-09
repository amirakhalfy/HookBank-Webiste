// AddIndividual.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './form.css'; // Make sure this path is correct
import { Navbar } from './components'; // Assuming Navbar is correctly imported


// Validation schema using Yup
const validationSchema = Yup.object().shape({
  userId: Yup.string().required('User ID is required'),
  empTitle: Yup.string(),
  term: Yup.string(),
  loanAmnt: Yup.number(),
  purpose: Yup.string(),
  homeOwnership: Yup.string(),
  dti: Yup.number(),
  grade: Yup.string(),
  annualInc: Yup.number(),
  intRate: Yup.number(),
});

const AddIndividual = () => {
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('/create_individual', values);
      if (response.status === 201) {
        alert('Individual record created!');
      }
    } catch (error) {
      console.error('There was an error creating the individual record:', error);
      alert('Failed to create individual record.');
    }
    setSubmitting(false);
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
    <Navbar />
    <div className="card"> {/* Added card class */}
      <h1>Add Individual</h1>
      <Formik
        initialValues={{
          userId: '',
          empTitle: '',
          term: '',
          loanAmnt: '',
          purpose: '',
          homeOwnership: '',
          dti: '',
          grade: '',
          annualInc: '',
          intRate: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form"> {/* Added form class */}
            <Field name="userId" placeholder="User ID" />
            <ErrorMessage name="userId" component="span" className="errorMessage" />

            <Field name="empTitle" placeholder="Employment Title" />
            <Field name="term" placeholder="Term" />
            <Field name="loanAmnt" placeholder="Loan Amount" type="number" />
            <Field name="purpose" placeholder="Purpose" />
            <Field name="homeOwnership" placeholder="Home Ownership" />
            <Field name="dti" placeholder="DTI" type="number" />
            <Field name="grade" placeholder="Grade" />
            <Field name="annualInc" placeholder="Annual Income" type="number" />
            <Field name="intRate" placeholder="Interest Rate" type="number" />

            <button type="submit" disabled={isSubmitting}>
              Create Individual
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>

  );
};

export default AddIndividual;
