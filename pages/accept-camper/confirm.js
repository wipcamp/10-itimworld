import React from 'react'
import ConfirmFirst from '../../components/AcceptCamper/confirmFirst'
import ConfirmTwo from '../../components/AcceptCamper/confirmTwo'

export default class index extends React.Component {
    state = {
      change: false
    }

    render () {
      return (
        <div>
          <ConfirmFirst />
          <ConfirmTwo />
        </div>
      )
    }
}
