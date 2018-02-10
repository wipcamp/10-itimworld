/* global alert */
import React from 'react'
import api from './api'
import cookie from './cookie'
import Router from 'next/router'
import Loading from '../components/Core/Loading'

const checkStep = (path) => Component => {
  return class extends React.Component {
    state = {
      showComponent: false
    }

    async componentDidMount () {
      const { props } = this
      const registerPath = '/register'
      const dashboardPath = '/dashboard'
      let {token} = cookie({req: false})
      let data =
      await api.get(`/registrants/${props.initialValues.user_id}`, {Authorization: `Bearer ${token}`})
          .then(res => res.data)
          .catch(err => alert(err))
      let show = false
      if (!data.length) { // user not register
        if (path === registerPath) {
          props.setRegisterStep(1)
          show = true
        } else if (path === dashboardPath) {
          Router.push(registerPath)
        }
      } else {
        data = data[0]
        if (path === registerPath) {
          if (!data) {
          } else if (!data.profile_registrant.skill_computer) {
            props.setRegisterStep(2)
            show = true
          } else {
            Router.push(dashboardPath)
          }
          this.setState({showComponent: show})
        } else if (path === dashboardPath) {
          if (!data.first_name || !data.profile_registrant.skill_computer) {
            Router.push(registerPath)
          } else {
            show = true
          }
        }
      }
      this.setState({ showComponent: show })
    }

    render () {
      if (!this.state.showComponent) {
        return <Loading />
      }
      return (
        <Component {...this.props} />
      )
    }
  }
}

export default checkStep
