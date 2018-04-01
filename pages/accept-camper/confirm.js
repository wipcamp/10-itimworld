import React from 'react'
import { compose } from 'recompose'

import ConfirmFirst from '../../components/AcceptCamper/confirmFirst'
import ConfirmTwo from '../../components/AcceptCamper/confirmTwo'
import styled from 'styled-components'

import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import withRedux from '../../store/wrapper'
import Messenger from '../../components/Core/Messenger'
import getToken from '../../utils/getToken'

import checkUser from '../../components/AcceptCamper/checkUser'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : calc(100vh - 59px);
    width : 100%;
    background-size : cover;
    background-position : center;

    .box-shadow {
      box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .1);
    }
  
    .pointer {
      cursor: pointer;
    }
`

class ConfirmWaiver extends React.Component {
    state = {
      step: 1
    }

    nextStep = () => {
      this.setState({
        step: 2
      })
    }

    render () {
      const { step } = this.state
      return (
        <BackgroundContainer>
          {step === 1 && <ConfirmFirst nextStep={this.nextStep} />}
          {step === 2 && <ConfirmTwo {...this.props} />}
        </BackgroundContainer>
      )
    }
}

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger,
  getToken(),
  checkUser('/accept-camper/confirm')
)(ConfirmWaiver)
