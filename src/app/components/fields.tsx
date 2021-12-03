import React from 'react';

export const GenericInput = (field) => (
  <div className="input-row">
    <input
      className="form-control mb-2"
      id={field.input.name}
      {...field.input}
    />
    {field.meta.touched && field.meta.error &&
      <span className="error">{field.meta.error}</span>}
  </div>
)

export const GenericSelect = (field) => (
  <div className="input-row">
    <select
      className="form-control mb-2"
      id={field.input.name}
      {...field.input}
    >
      {field.options}
    </select>
    {field.meta.touched && field.meta.error &&
      <span className="error">{field.meta.error}</span>}
  </div>
)
