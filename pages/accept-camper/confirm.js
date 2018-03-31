import React from 'react'
import ConfirmFirst from '../../components/AcceptCamper/confirmFirst'
import ConfirmTwo from '../../components/AcceptCamper/confirmTwo'
import styled from 'styled-components'

const BackgroundContainer = styled.div`
    background-image: url("../../static/img/background.png");
    min-height : 100vh;
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

export default class index extends React.Component {
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
          {step === 2 && <ConfirmTwo />}
        </BackgroundContainer>
      )
    }
}
