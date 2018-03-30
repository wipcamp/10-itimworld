import React from 'react'
import ConfirmFirst from '../../components/AcceptCamper/confirmFirst'
import ConfirmTwo from '../../components/AcceptCamper/confirmTwo'

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
        <div>
          {step === 1 && <ConfirmFirst nextStep={this.nextStep} />}
          {step === 2 && <ConfirmTwo />}
        </div>
      )
    }
}
