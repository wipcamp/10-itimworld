import React from 'react'
import Loading from '../Core/Loading'
import Header from '../Core/Header/Main'
import cookie from '../../utils/cookie'
import api from '../../utils/api'
import Router from 'next/router'
import moment from 'moment'

import Timeup from './timeisup'

const getSlip = (documents) => {
  const slip = documents.filter((data) => data.type_id === 4)
  if (slip.length === 0) {
    return { is_approve: 0, reason: 'ไม่พบไฟล์ในระบบ กรุณาอัพโหลดใหม่' }
  } else if (slip[slip.length - 1].is_approve === 0) {
    return { is_approve: 0, reason: slip[slip.length - 1].approve_reason }
  } else {
    return 1
  }
}

export default (path) => (Component) => {
  return class extends React.Component {
    state = {
      loading: true,
      uploadRejected: false,
      end: false,
      slip: {}
    }

    uploadSuccess = () => {
      this.setState({ 
        uploadRejected: false
      })
    }

    async componentDidMount () {
      const endTimeToConfirm = moment('03 Apr 2018 23:59:59 GMT+7', 'DD MMM YYYY hh:mm:ss')
      let { token } = cookie({req: false})
      let { data } = await api.get(`/campers/${this.props.initialValues.user_id}`, {Authorization: `Bearer ${token}`})
      data = data.data[0]
      if (data === undefined) {
        return Router.push('/announce/annoucement')
      }
      const preConfirm = '/accept-camper'
      const finishConfirm = '/accept-camper/finish'
      const waiver = '/accept-camper/confirm'
      const end = '/accept-camper/end'
      const { profile_registrant: { tell_wipper: tellWip }, confirm_camper: confirmCamp } = data
      switch (path) {
        case preConfirm: {
          if (tellWip !== null) {
            Router.push(end)
            return
          } else if (confirmCamp !== null) {
            Router.push(finishConfirm)
            return
          }

          if (moment().isAfter(endTimeToConfirm)) {
            this.setState({
              loading: false,
              end: true
            })
            return
          }
          break
        }

        case finishConfirm: {
          if (tellWip !== null) {
            Router.push(end)
            return
          } else if (confirmCamp === null) {
            Router.push(preConfirm)
            return
          }
          let { data: user } = await api.get(`/registrants/${this.props.initialValues.user_id}`, {Authorization: `Bearer ${token}`})
          user = user[0]
          const slip = getSlip(user.documents)
          if (slip !== 1) {
            this.setState({
              uploadRejected: true,
              slip
            })
          }
          break
        }

        case end: {
          if (confirmCamp !== null) {
            Router.push(finishConfirm)
            return
          } else if (tellWip === null) {
            Router.push(preConfirm)
            return
          }
          break
        }

        case waiver: {
          if (confirmCamp !== null) {
            Router.push(finishConfirm)
            return
          } else if (tellWip !== null) {
            Router.push(end)
            return
          }

          if (moment().isAfter(endTimeToConfirm)) {
            this.setState({
              loading: false,
              end: true
            })
            return
          }
          break
        }
      }
      this.setState({
        loading: false
      })
    }

    render () {
      if (this.state.loading) return <Loading />
      if (this.state.end) return <Timeup />
      return (
        <div>
          <Header {...this.props} />
          <Component {...this.props} {...this.state} uploadSuccess={this.uploadSuccess} />
        </div>
      )
    }
  }
}
