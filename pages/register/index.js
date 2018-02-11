import React from 'react'
import RegisterPage from '../../components/Register/Main'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import Messenger from '../../components/Core/Messenger'

const Register = props => (
  <RegisterPage {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger
)(Register)
