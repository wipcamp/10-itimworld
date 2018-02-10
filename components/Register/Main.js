import React from 'react'
import { compose, lifecycle, withProps } from 'recompose'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Router from 'next/router'

import {actions as registerActions} from '../../store/reducers/register'
import Alert from '../Core/Alert'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import { validate } from '../Core/validationForm'
import checkRegisterStep from '../../utils/checkRegisterStep'
import getToken from '../../utils/getToken'

const Image = styled.img`
  max-width: 340px;
`

const BackgroundContainer = styled.div`
  background: #252525;
  min-height: 100vh;
  height: auto;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;

  background-image: url('/static/img/background.png');
  


  @media screen and (min-width: 768px) {
    background-image: url('/static/img/background.png');
    background-size: cover;
    background-position: 50% 100%;
  }
`

export const MainRegister = props => {
  const { registerData } = props
  const { registerStep } = registerData
  return (
    <div>
      <BackgroundContainer>
        <div className='container'>
          <Alert {...props} {...registerData} />
          <div className='row '>
            <div className='col-12 mt-4 col-md-6 mx-auto text-center justify-content-center'>
              <Image src='/static/img/logo.svg' className='img-fluid mb-3' alt='wipcamp-logo' />
            </div>
            <div className='col-12 col-md-10 mx-auto text-center' >
              {
                registerStep === 1
                  ? (<StepOne {...props} />)
                  : (<StepTwo {...props} />)
              }
            </div>
          </div>
        </div>
      </BackgroundContainer>
    </div>
  )
}

export default compose(
  connect(
    (state, ownProps) => ({
      registerData: state.register
    }),
    {...registerActions}
  ),
  getToken(),
  checkRegisterStep('/register'),
  withProps(
    props => ({
      initialValues: {
        ...props.initialValues,
        allergic_foods: '-',
        congenital_diseases: '-',
        congenital_drugs: '-'
      }
    })
  ),
  reduxForm({
    form: 'register',
    validate,
    onSubmitFail: (_, __, ___, props) => props.onSubmitError()
  }),
  lifecycle({
    componentWillReceiveProps (nextProps) {
      if (this.props.registerData.registerStep === 1 && nextProps.registerData.registerStep === 2) {
        setTimeout(
          window.scroll({top: 0, behavior: 'smooth'}),
          100
        )
      }

      if (this.props.registerData.registerStep === 2 && nextProps.registerData.registerStep === 3) {
        Router.push('/dashboard')
      }
    }
  })
)(MainRegister)
