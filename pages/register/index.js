import React from 'react'
import RegisterPage from '../../components/Register/Main'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'

const Register = props => (
  <RegisterPage {...props} />
)

export default compose(
  withRedux()
)(Register)
