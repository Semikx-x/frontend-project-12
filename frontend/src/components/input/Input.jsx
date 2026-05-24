import React from 'react';
import { Field, ErrorMessage as Error } from "formik";

export const Input = ({id, label, name, placeholder}) => {
  return (
    <div className="form-floating mb-3">
      <Field name={name} id={id} placeholder={placeholder} className="form-control"></Field>
      <label htmlFor={id}>{label}</label>
      <Error name={name}>{(error) => <div className="alert alert-danger mt-3" role="alert">{error}</div>}</Error>
    </div>
  )
}