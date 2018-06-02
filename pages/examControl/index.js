import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'

import MainExam from '../../components/Exam/Main'
import Control from '../../components/Exam/Control'

import api from '../../utils/api'
import cookie from '../../utils/cookie'
import { actions as ExamActions } from '../../store/reducers/exam'

class ExamPage extends React.Component {
  componentDidMount () {
    this.checkWipRole()
  }
  async checkWipRole () {
    const { setIsAdmin } = this.props
    let {token} = cookie({req: false})
    const headers = {
      Authorization: `Bearer ${token}`
    }
    const wipId = JSON.parse(window && window.localStorage.getItem('user')).id
    const data = await api.get('/userroles/user_id/' + wipId, headers)
    if (data && data.data && data.data.find(ele => ele.role_id >= 6)) {
      setIsAdmin(true)
    }
  }
  render () {
    const {error, isAdmin} = this.props.exam
    return (
      <MainExam>
        {error && <h1>ERROR</h1>}
        {error === false && isAdmin && <Control />}
      </MainExam>
    )
  }
}

export default compose(
  withRedux(),
  connect(
    state => ({
      exam: state.exam
    }),
    {...ExamActions}
  ),
  clientRender(`/`),
  serverRender(`/`)
)(ExamPage)
