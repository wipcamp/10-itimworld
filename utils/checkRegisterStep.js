/* global alert */
import React from 'react'
import api from './api'
import Router from 'next/router'

const checkStep = (path) => Component => {
  return class extends React.Component {
    state = {
      showComponent: false
    }

    async componentWillMount () {
      const { props } = this
      let data =
      await api.get(`/registrants/${props.initialValues.user_id}`)
          .then(res => res.data[0])
          .catch(err => alert(err))
      let show = false
      if (path === '/register') {
        if (!data) {
        } else if (!data.first_name) {
          props.setRegisterStep(1)
          show = true
        } else if (!data.profile_registrant.skill_computer) {
          props.setRegisterStep(2)
          show = true
        } else {
          Router.push('/dashboard')
        }
        this.setState({showComponent: show})
      } else if (path === '/dashboard') {
        if (!data.first_name || !data.profile_registrant.skill_computer) {
          Router.push('/register')
        } else {
          show = true
        }
      }
      this.setState({ showComponent: show })
    }

    render () {
      if (!this.state.showComponent) {
        return <div />
      }
      return (
        <Component {...this.props} />
      )
    }
  }
}

export default checkStep
