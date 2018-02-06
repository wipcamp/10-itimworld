import React from 'react'
import QuestionPage from '../../components/Question/Main'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'

const Register = props => (
  <QuestionPage {...props} />
)

export default compose(
  withRedux()
)(Register)
