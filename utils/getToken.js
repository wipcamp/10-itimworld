import React from 'react'
import cookie from './cookie'
import api from './api'
import Loading from '../components/Core/Loading'

export default () => Component => {
  return class extends React.Component {
    state = {
      show: false,
      initialValues: {}
    }

    async componentDidMount () {
      let { token } = cookie({req: false})
      if(token==='null'){
        window.location.replace('/')
      }
      let { data } = await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
      this.setState({
        initialValues: { user_id: data.id },
        show: true
      })
    }

    render () {
      if (!this.state.show) {
        return <Loading />
      }
      return <Component {...this.props} initialValues={this.state.initialValues} />
    }
  }
}
