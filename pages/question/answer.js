import React from 'react'
import AnswerPage from '../../components/Question/AnswerMain'
import { compose } from 'recompose'

import serverRender from '../../utils/serverRender'
import withRedux from '../../store/wrapper'
import Messenger from '../components/Core/Messenger'

const Answer = props => (
  <AnswerPage {...props} />
)

Answer.getInitialProps = async ({ query }) => {
  await console.log('queryyyyyyyyyyyyyyy !!!!!! --------> ', query)
  return query
}

export default compose(
  withRedux(),
  serverRender(`/`),
  Messenger
)(Answer)
