import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { actions as registerActions } from '../../store/reducers/register'

export const MainRegister = props => {
  const { register } = props
  return (
    <div>
      register component
      <h1>{`${register.firstName}`}</h1>
      <Input
        label={`firstname`}
        field={`firstName`}
        type={`text`}
        handleChange={props.setField}
        value={register.firstName}
        placeholder={`Input your name`}
      />
    </div>
  )
}

const Input = ({ field, label, type, placeholder, value, handleChange }) => (
  <div>
    <label htmlFor={`input-${field}`}>{label}:</label>
    <input
      id={`input-${field}`}
      type={type}
      className='form-control'
      placeholder={placeholder}
      onChange={e => handleChange(field, e.target.value)}
      value={value}
      required
    />
  </div>
)

export default compose(
  connect(
    state => ({
      register: state.register
    }),
    { ...registerActions }
  )
)(MainRegister)
