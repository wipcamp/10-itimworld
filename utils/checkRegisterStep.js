/* global alert */
import React from 'react'
import moment from 'moment'
import api from './api'
import cookie from './cookie'
import Router from 'next/router'
import Loading from '../components/Core/Loading'
import ClosedRegisterComponent from '../components/Register/ClosedRegister'
import { closeRegister as closeSchedule } from '../schedule.json'

const checkStep = (path) => Component => {
  return class extends React.Component {
    state = {
      doneLoading: false,
      closedRegister: false
    }

    async componentDidMount () {
      const { props } = this
      const registerPath = '/register'
      const dashboardPath = '/dashboard'
      const announcePath = '/announce'
      let {token} = cookie({req: false})
      let data =
        await api.get(`/registrants/${props.initialValues.user_id}`, {Authorization: `Bearer ${token}`})
          .then(res => res.data)
          .catch(err => alert(err))
      let show = false
      let closedRegister = false
      if (path === dashboardPath) {
        Router.push(announcePath)
        return
      }
      if (!data.length) { // user not register
        if (path === registerPath) {
          closedRegister = this.isClosed()
          if (!closedRegister) {
            props.setRegisterStep(1)
          }
          show = true
        } else {
          Router.push(registerPath)
        }
      } else {
        data = data[0]
        if (path === registerPath) {
          if (!data) {
          } else if (!data.profile_registrant.skill_computer) {
            closedRegister = this.isClosed()
            if (!closedRegister) {
              props.setRegisterStep(2)
            }
            show = true
          } else {
            Router.push(announcePath)
          }
        } else {
          if (!data.first_name || !data.profile_registrant.skill_computer) {
            Router.push(announcePath)
          } else {
            show = true
          }
        }
      }
      this.setState({ doneLoading: show, closedRegister })
    }

    isClosed () {
      const end = moment(`${closeSchedule} GMT+7`, 'DD MMM YYYY hh:mm:ss')
      return moment().isAfter(end)
    }

    render () {
      const { closedRegister, doneLoading } = this.state
      if (!doneLoading) return <Loading />
      if (closedRegister) return <ClosedRegisterComponent />
      return (
        <Component {...this.props} />
      )
    }
  }
}

export default checkStep
