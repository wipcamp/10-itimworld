import React from 'react'
import IndexPage from '../components/Index/Main'
import { compose } from 'recompose'

import withRedux from '../store/wrapper'

import Messenger from '../components/Core/Messenger'

const Index = props => <IndexPage {...props} />

export default compose(
  withRedux(),
  Messenger
)(Index)
