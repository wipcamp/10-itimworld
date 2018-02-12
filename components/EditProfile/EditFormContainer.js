import React from 'react'
import styled from 'styled-components'
import FieldInput from '../Core/Input'

const FormContainer = styled.form`
  background: #fff;
  border-radius: 10px;
  margin-bottom: 50px;
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
