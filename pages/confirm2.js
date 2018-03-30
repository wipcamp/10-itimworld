import React from 'react'
import Dropzone from 'react-dropzone'
import MainConfirm from '../components/Confirm/Main'

class Confirm extends React.Component {
  state = {
    file: {}
  }

  drop = (files) => {
    this.setState({
      file: files[0]
    })
  }

  render () {
    return (
      <div>
        <MainConfirm {...this.props} />
      </div>
    )
  }
}

export default Confirm
