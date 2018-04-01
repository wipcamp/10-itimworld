import React from 'react'
import { compose } from 'recompose'

import Finish from '../../components/AcceptCamper/finish'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import Messenger from '../../components/Core/Messenger'
import getToken from '../../utils/getToken'

const FinishPage = (props) => (
  <Finish {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger,
  getToken()
)(FinishPage)
