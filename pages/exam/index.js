import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'

import MainExam from '../../components/Exam/Main'
import Step1 from '../../components/Exam/Step1'
import Step2 from '../../components/Exam/Step2'

class ExamPage extends React.Component {
  render () {
    const {step, error} = this.props.exam
    return (
      <MainExam>
        {error && <h1>ERROR</h1>}
        {error === false && step === 1 && <Step1 />}
        {error === false && step === 2 && <Step2 />}
      </MainExam>
    )
  }
}

export default compose(
  withRedux(),
  connect(
    state => ({
      exam: state.exam
    })
  ),
  clientRender(`/`),
  serverRender(`/`)
)(ExamPage)
