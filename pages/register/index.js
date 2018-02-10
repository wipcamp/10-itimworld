import React from 'react'
import RegisterPage from '../../components/Register/Main'
import { compose } from 'recompose'

import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import withRedux from '../../store/wrapper'

const Register = props => (
  <RegisterPage {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender()
)(Register)
