import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'

import Header from '../../components/Core/Header/Main'

import MainExam from '../../components/Exam/Main'
import Step1 from '../../components/Exam/Step1'
import Step2 from '../../components/Exam/Step2'
import Step3 from '../../components/Exam/Step3'

import api from '../../utils/api'
import cookie from '../../utils/cookie'
import { actions as ExamActions } from '../../store/reducers/exam'

class ExamPage extends React.Component {
  async componentDidMount () {
    document.getElementsByTagName('html')[0].addEventListener('contextmenu', (ev) => {
      ev.preventDefault()
      return false
    }, false)
    document.getElementsByTagName('html')[0].addEventListener('keydown', (ev) => {
      if (ev.keyCode !== 13 && ev.keyCode !== 8 && (ev.keyCode < 48 || ev.keyCode > 57) && (ev.keyCode > 105 || ev.keyCode < 96)) {
        ev.preventDefault()
        return false
      }
      return true
    }, false)
    this.checkWipRole()
  }
  async checkWipRole () {
    const { setIsAdmin } = this.props
    console.log('props', this.props)
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
    const {step, error} = this.props.exam
    return (
      <MainExam>
        <Header />
        {
          error
            ? <h1>ERROR</h1>
            : <div>
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
            </div>
        }
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
