import React from 'react'
import End from '../../components/AcceptCamper/end'
import { compose } from 'recompose'

import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import getToken from '../../utils/getToken'
import withRedux from '../../store/wrapper'
import Messenger from '../../components/Core/Messenger'

const EndWaiver = (props) => (
  <End {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger,
  getToken()
)(EndWaiver)
