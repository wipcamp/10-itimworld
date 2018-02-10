import React from 'react'
import QuestionPage from '../../components/Question/Main'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'

const Register = props => (
  <QuestionPage {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`)
)(Register)
