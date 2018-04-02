import React from 'react'
import Loading from '../Core/Loading'
import Header from '../Core/Header/Main'
import cookie from '../../utils/cookie'
import api from '../../utils/api'
import Router from 'next/router'

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
      slip: {}
    }

    uploadSuccess = () => {
      this.setState({ 
        uploadRejected: false
      })
    }

    async componentDidMount () {
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
          break
        }
      }
      this.setState({
        loading: false
      })
    }

    render () {
      if (this.state.loading) return <Loading />
      return (
        <div>
          <Header {...this.props} />
          <Component {...this.props} {...this.state} uploadSuccess={this.uploadSuccess} />
        </div>
      )
    }
  }
}
