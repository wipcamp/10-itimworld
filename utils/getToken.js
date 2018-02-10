import React from 'react'
import cookie from './cookie'
import api from './api'

export default () => Component => {
  return class extends React.Component {
    state = {
      show: false,
      initialValues: {}
    }

    async componentDidMount () {
      let { token } = cookie({req: false})
      let { data } = await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
      this.setState({
        initialValues: { user_id: data.id },
        show: true
      })
    }

    render () {
      if (!this.state.show) {
        return <div />
      }
      return <Component {...this.props} initialValues={this.state.initialValues} />
    }
  }
}
