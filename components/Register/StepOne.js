import React from 'react'
import { compose, withProps } from 'recompose'
import FormContainer from './FormContainer'
import { fields } from './form.json'

const StepOne = (props) => {
  console.log(props)
  return (
    <FormContainer
      {...props}
      fields={fields}
      buttonText={`ถัดไป`}
    />
  )
}

export default compose(
  withProps(
    props => ({
      onSubmit: props.saveRegisterStep1
    })
  )
)(StepOne)
