import React from 'react'
import AnswerPage from '../../components/Question/AnswerMain'
import { compose } from 'recompose'

import serverRender from '../../utils/serverRender'
import withRedux from '../../store/wrapper'

const Answer = props => (
  <AnswerPage {...props} />
)

export default compose(
  withRedux(),
  serverRender(`/`)
)(Answer)
