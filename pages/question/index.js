import React from 'react'
import QuestionPage from '../../components/Question/Main'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import Messenger from '../../components/Core/Messenger'
import checkIsClosed from '../../utils/checkIsClosed'

const Register = props => (
  <QuestionPage {...props} />
)

export default compose(
  checkIsClosed,
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger
)(Register)
