import React from 'react'
import withRedux from 'next-redux-wrapper'

import { initStore } from './createStore'

export default (mapStateToProps, mapDispatchToProps) => Component => {
  const withReduxWrapper = props => <Component {...props} />

  withReduxWrapper.getInitialProps = async propsData => {
    if (Component.getInitialProps) {
      await Component.getInitialProps(propsData)
    }
  }

  return withRedux(
    initStore,
    mapStateToProps,
    mapDispatchToProps
  )(Component)
}
