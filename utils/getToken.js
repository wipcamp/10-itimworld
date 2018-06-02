import React from 'react'
import cookie from './cookie'
import api from './api'
import Loading from '../components/Core/Loading'
import {Router} from '../routes'

export default () => Component => {
  return class extends React.Component {
    state = {
      show: false,
      initialValues: {}
    }

    async componentDidMount () {
      let { token } = cookie({req: false})
      if (token === 'null' || !token) {
        Router.pushRoute('/')
      }
      let { data } =
      await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
          .catch(() => Router.pushRoute('/'))
      this.setState({
        initialValues: { user_id: data && data.id ? data.id : null },
        show: true
      })
      if (data && window) {
        await window.localStorage.setItem('user', JSON.stringify(data))
      }
    }

    render () {
      if (!this.state.show) {
        return <Loading />
      }
      return <Component {...this.props} initialValues={this.state.initialValues} />
    }
  }
}
