import React from 'react';
import { Field, ErrorMessage as Error } from "formik";

export const Input = ({id, label, name, placeholder, disabled}) => {
  return (
    <div className={`form-floating mb-3 ${disabled ? 'opacity-50' : ''}`}>
      <Field name={name} id={id} placeholder={placeholder} disabled={disabled} className="form-control"></Field>
      <label htmlFor={id}>{label}</label>
      <Error name={name}>{(error) => <div className="alert alert-danger mt-3" role="alert">{error}</div>}</Error>
    </div>
  )
}