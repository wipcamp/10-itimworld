import React from 'react'
import styled, { keyframes } from 'styled-components'

import FieldInput from '../Core/Input'

const slideFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(2000px);
  }
  60% {
      opacity: 1;
      transform: translateX(-15px);
  }
  80% {
      transform: translateX(10px);
  }
  100% {
      transform: translateX(0);
  }
`

const RegisterSection = styled.form`
  color: #032e51;
  background: #fff;
  margin-bottom: 5em;
  border-radius: 10px;

  animation: ${slideFromRight} 1.5s ease-in-out;
`

const SubHeader = styled.h3`
  background: #336699;
  color: #fff;
  padding: 10px 0;
  margin: 0;
  border-radius: 10px 10px 0 0;
`

const SubmitButton = styled.button`
  background-color: #336699;
  color: #fff;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'} ;
  }
`

const FormContainer = (props) => {
  const { handleSubmit, pristine, submitting, buttonText, onSubmit } = props
  const { fields, steptwo } = props
  return (
    <div>
      <RegisterSection onSubmit={handleSubmit(onSubmit)}>
        <SubHeader>ลงทะเบียน</SubHeader>
        <div className='row px-3 pb-4 pt-3'>
          {
            fields.map((field, index) => (
              <FieldInput key={field + index} {...field} />
            ))
          }
          {
            steptwo && (
              <div className='col'>
                <p className='mb-1'><strong>เมื่อลงทะเบียนจะถือว่า คุณยอมรับ<a href='https://wip.camp/legal' target='_blank'>ข้อตกลง</a></strong></p>
              </div>
            )
          }
          <div className='col-12'>
            <SubmitButton
              className={'btn btn-lg btn-block'}
              type='submit'
              disabled={pristine || submitting}
              title={buttonText}
            >
              {buttonText}
            </SubmitButton>
          </div>
        </div>
      </RegisterSection>
    </div>
  )
}

export default FormContainer
