import React from 'react'
import AcceptCamper from '../../components/AcceptCamper/Main'

export default class index extends React.Component {
    state = {
      isShow: false
    }

    render () {
      return (
        <div>
          <AcceptCamper />
        </div>
      )
    }
}
