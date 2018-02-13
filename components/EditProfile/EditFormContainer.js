import React from 'react'
import styled, { keyframes } from 'styled-components'
import FieldInput from '../Core/Input'

const slideFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-2000px);
  }
  60% {
      opacity: 1;
      transform: translateX(15px);
  }
  80% {
      transform: translateX(-10px);
  }
  100% {
      transform: translateX(0);
  }
`

const FormContainer = styled.form`
  background: #fff;
  border-radius: 10px;
  margin-bottom: 50px;

  animation: ${slideFromLeft} 2s ease-in-out;
`

const SubmitButton = styled.button`
  background: #f19d21;
  cursor: pointer;
  color: #fff;

  &:hover {
    background: #e08e13;
  }
`

const Header = styled.h3`
  padding: 10px 0;
  text-align: center;
  border-radius: 10px 10px 0 0;
  color: #fff;
  font-weight: 400;
  background: #e08e13;
`

const EditFormContainer = (props) => {
  const { handleSubmit, pristine, submitting, onSubmit } = props
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Header>แก้ไขข้อมูล</Header>
      <div className='row px-3 pb-4'>
        {
          props.fields.map((field, index) => (
            <FieldInput key={field + index} {...field} />
          ))
        }
        <div className='col-12'>
          <SubmitButton
            type='submit'
            className='btn btn-block'
            disabled={pristine || submitting}
            title={`บันทึกข้อมูล`}
          >
              บันทึกข้อมูล
          </SubmitButton>
        </div>
      </div>
    </FormContainer>
  )
}

export default EditFormContainer
