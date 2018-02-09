import React from 'react'
import {Layout} from './Global'

export default (Component) => class App extends React.Component {
  render () {
    return (
      <Layout>
        <Component {...this.props} />
      </Layout>
    )
  }
}