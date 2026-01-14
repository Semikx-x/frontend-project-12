import React from 'react';
import { Field, ErrorMessage as Error } from "formik";

export const Input = ({id, label, name, placeholder}) => {
  return (
    <div className="form-floating mb-3">
      <label htmlFor={id}>{label}</label>
      <Field name={name} id={id} placeholder={placeholder}></Field>
      <Error name={name}>{(error) => <span>{error}</span>}</Error>
    </div>
  )
}