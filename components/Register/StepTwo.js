import React from 'react'
import { compose, withProps } from 'recompose'
import FormContainer from './FormContainer'
import { fields } from './form2.json'

const StepTwo = (props) => {
  return (
    <FormContainer
      {...props}
      fields={fields}
      buttonText={`ลงทะเบียน`}
    />
  )
}

export default compose(
  withProps(
    props => ({
      onSubmit: props.saveRegisterStep2
    })
  )
)(StepTwo)
