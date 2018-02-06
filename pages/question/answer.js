import React from 'react'
import AnswerPage from '../../components/Question/AnswerMain'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'

const Answer = props => (
  <AnswerPage {...props} />
)

export default compose(
  withRedux()
)(Answer)
