import React from 'react'
// import AcceptCamper from '../../components/AcceptCamper/Main'
import AcceptDocs from '../../components/AcceptCamper/AcceptDocs'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import { compose } from 'recompose'
import campers from '../../components/custom/campers.json'

import Router from 'next/router'

import withRedux from '../../store/wrapper'
import Messenger from '../../components/Core/Messenger'

import getToken from '../../utils/getToken'

class index extends React.Component {
  state = {
    loading: true
  }

  componentWillMount () {
    const id = this.props.initialValues.user_id
    let checkCamper = campers.filter(el => el.wipId === id)
    if (checkCamper.length === 0) {
      Router.push('/_error')
    } else {
      this.setState({
        loading: false
      })
    }
  }

  render () {
    if (this.state.loading) return <div />
    return <AcceptDocs {...this.props} />
  }
}

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger,
  getToken()
)(index)
