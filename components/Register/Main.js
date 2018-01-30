import React from 'react'
import { compose } from 'recompose'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {actions as registerActions} from '../../store/reducers/register'

import { fields } from './form.json'
import FieldInput from '../Core/Input'

const SubHeader = styled.h3`
  background: #336699;
  color: #fff;
  padding: 10px 0;
  margin: 0;
  border-radius: 10px 10px 0 0;
`

const BackgroundContainer = styled.div`
  background: #252525;
  min-height: 100vh;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`

const RegisterSection = styled.form`
  color: #032e51;
  background: #fff;
  margin-bottom: 5em;
  border-radius: 10px;
`

const SubmitButton = styled.button`
  background-color: #336699;
  color: #fff;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'} ;
  }
`

const FormRegister = props => {
  const { handleSubmit, pristine, submitting, saveRegister } = props
  console.log('show vat > ', props)
  return (
    <RegisterSection onSubmit={handleSubmit(saveRegister)}>
      <SubHeader>ลงทะเบียน</SubHeader>
      <div className='row px-3 pb-5 pt-3'>
        {
          fields.map((field, index) => (
            <FieldInput key={index} {...field} />
          ))
        }
        <div className='col-12'>
          <SubmitButton
            className={'btn btn-lg'}
            type='submit'
            disabled={pristine || submitting}
            title={'ถัดไป'}
          >
          ถัดไป
          </SubmitButton>
        </div>
      </div>
    </RegisterSection>
  )
}

export const MainRegister = props => (
  <div>
    <BackgroundContainer>
      <div className='container'>
        <div className='row '>
          <div className='col-12 col-md-6 mx-auto text-center justify-content-center'>
            <img src='https://wip.camp/assets/img/logo/wipcamp9-full-transparent.svg' className='img-fluid' alt='wipcamp-logo' />
          </div>
          <div className='col-12 text-center text-white'>
            <div>
              ขั้นตอนการลงทะเบียน
            </div>
          </div>
          <div className='col-12 col-sm-10 mx-auto text-center' >
            <FormRegister {...props} />
          </div>
        </div>
      </div>
    </BackgroundContainer>
  </div>
)

export default compose(
  connect(
    state => ({
      temp: state
    }),
    {...registerActions}
  ),
  reduxForm({
    form: 'register',
    initialValues: {
      user_id: 10
    }
  })
)(MainRegister)
