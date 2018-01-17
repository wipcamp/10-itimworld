import React from 'react'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'

import { header, fields } from './form.json'

const renderField = ({
  label,
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div className='input-row'>
    <label>{label}</label>
    <input
      {...input}
      type={type}
      placeholder={placeholder}
    />
    {touched &&
      error && <span className='error'>{error}</span>}
  </div>
)

export const MainRegister = props => {
  return (
    <div>
      <h1>{`${header}`}</h1>
      { fields.map(({label, name, type, placeholder}, i) => (
        <Field
          key={i}
          label={label}
          name={name}
          placeholder={placeholder}
          component={renderField}
          type={type}
        />
      )) }
    </div>
  )
}

export default compose(
  reduxForm({
    form: 'register'
  })
)(MainRegister)
