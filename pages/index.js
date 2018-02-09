import React from 'react'
// import IndexPage from '../components/Index/Main'
import IndexPage from '../components/Index/Landing'
import { compose } from 'recompose'

import withRedux from '../store/wrapper'

const Index = props => <IndexPage {...props} />

export default compose(
  withRedux()
)(Index)
