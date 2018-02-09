import React from 'react'
import { compose, withHandlers, lifecycle } from 'recompose'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import {actions as registerActions} from '../../store/reducers/register'
import Router from 'next/router'
import Alert from '../Core/Alert'

import { validate } from '../Core/validationForm'
import { fields as fieldsRegister1 } from './form.json'
import { fields as fieldsRegister2 } from './form2.json'
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

  background-image: url('/static/img/bg1-01.png');


  @media screen and (min-width: 768px) {
    background-image: url('/static/img/bg-d1-01.png');
    background-size: cover;
    background-position: 50% 100%;
    
  }
`

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

const SubmitButton = styled.button`
  background-color: #336699;
  color: #fff;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'} ;
  }
`

const FormRegister = props => {
  const { handleSubmit, pristine, submitting, saveRegisterStep1, saveRegisterStep2, registerData: { registerStep } } = props
  return (
    <RegisterSection onSubmit={
      handleSubmit((values) => {
        switch (registerStep) {
          case 1: saveRegisterStep1(values)
            break
          case 2: saveRegisterStep2(values)
            break
        }
      })
    }>
      <SubHeader>ลงทะเบียน</SubHeader>
      {
        (registerStep === 1 ? (
          <div className='row px-3 pb-5 pt-3'>
            {
              fieldsRegister1.map((field, index) => (
                <FieldInput key={index} {...field} />
              ))
            }
            <div className='col-12'>
              <SubmitButton
                className={'btn btn-lg btn-block'}
                type='submit'
                disabled={pristine || submitting}
                title={'ถัดไป'}
              >
                {
                  registerStep === 1 ? 'ถัดไป' : 'ลงทะเบียน'
                }

              </SubmitButton>
            </div>
            <button type='button' onClick={() => props.setRegister(2)}>ถัดไป</button>
          </div>
        ) : (
          <div className='row px-3 pb-5 pt-3'>
            {
              fieldsRegister2.map((field, index) => (
                <FieldInput key={index} {...field} />
              ))
            }
            <div className='col-12'>
              <SubmitButton
                className={'btn btn-lg btn-block'}
                type='submit'
                disabled={pristine || submitting}
                title={'ถัดไป'}
              >
                {
                  registerStep === 1 ? 'ถัดไป' : 'ลงทะเบียน'
                }

              </SubmitButton>
            </div>
            <button type='button' onClick={() => Router.push({pathname: '/upload'})}>ถัดไปอีก</button>
          </div>
        ))
      }
    </RegisterSection>
  )
}

export const MainRegister = props => {
  const { registerData } = props
  return (
    <div>
      <BackgroundContainer>
        <div className='container'>
          <Alert {...props} {...registerData} />
          <div className='row '>
            <div className='col-12 mt-4 col-md-6 mx-auto text-center justify-content-center'>
              <img src='/static/img/logo.svg' className='img-fluid' alt='wipcamp-logo' />
            </div>
            <div className='col-12 col-sm-10 mx-auto text-center' >
              <FormRegister {...props} />
            </div>
          </div>
        </div>
      </BackgroundContainer>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      registerData: state.register
    }),
    {...registerActions}
  ),
  reduxForm({
    form: 'register',
    validate,
    initialValues: {
      user_id: 10009
    },
    onSubmitFail: (_, __, ___, props) => props.onSubmitError()
  }),
  withHandlers({
    setRegister: props => (num) => {
      props.setRegisterStep(num)
    }
  }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (nextProps.registerData.registerStep === 2) {
        setTimeout(
          window.scroll({top: 0, behavior: 'smooth'}),
          100
        )
      }
    }
  })
)(MainRegister)
