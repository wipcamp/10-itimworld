import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import api from '../../utils/api'
import styled, {keyframes} from 'styled-components'
import Router from 'next/router'
import Header from './../Core/Header/Main'
import getCookie from '../../utils/cookie'
import getToken from '../../utils/getToken'
import Alert from '../Core/Alert'

const Container = styled.div`
  background: #29241B url('/static/img/bg.png') center top;
  height: auto;
  min-height:100vh;
  background-size: cover;
  background-attachment: fixed;
  color: #032E51;
`

const SubmitButton = styled.button`
  height: 45px;
  width: 100px;
  font-size: 24px;
  background-color: #B5A06B;
  color: #fff;
  font-weight: bold;
  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'}
  }
`

const BackButton = styled.button`
  height: 45px;
  width: 100px;
  font-size: 24px;
  background-color: rgba(0,0,0,0);
  border: 1px solid #695C3D;
  color: #695C3D;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'} ;
  }
`

const SubmitSection = styled.div`
  padding-top: 25px;
`

const QuestionSection = styled.div`
  color: #FFF;
  padding-top: 25px;
  padding-bottom: 25px;
`

const Spinner = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`

const Loading = styled.i`
    color: #FFF;
    font-size: 24px;  
    animation: ${Spinner} 2s linear infinite;
`

export const MainAnswer = props => {
  const {question: {answers, currentQuestion, error, show, message, isPending}, hideDialog} = props
  const questionid = props.url.query.id
  return (
    <Container>
      <Header />
      <div className='container pb-5'>
        <Alert showDialog={show} error={error} message={message} hideDialog={hideDialog} />
        <QuestionSection className='h3'>
          {`คำถามที่ ${questionid} : `}{currentQuestion.data}
        </QuestionSection>
        <Editor questionNumber={questionid} />
        <SubmitSection>
          <div className='row'>
            <div className='col-6'>
              <BackButton className='btn btn-large float-left' onClick={() => back()}>กลับ</BackButton>
            </div>
            <div className='col-6'>
              <SubmitButton className='btn btn-large float-right' disabled={isAnswerEmpty(props) || isPending} onClick={() => saveAnswer(questionid, answers.data, props)}>{ isPending ? <Loading className='fas fa-sync-alt' /> : 'บันทึก' }</SubmitButton>
            </div>
          </div>
        </SubmitSection>
      </div>
    </Container>
  )
}

const isAnswerEmpty = (props) => {
  let {question: {answers}} = props
  if (answers.length === undefined || answers.length < 2) {
    return true
  }
  return false
}

const saveAnswer = async (questionid, data, props) => {
  let {question: {answers}} = props
  props.postingAnswer(true)
  if (answers.length === undefined || answers.length < 2) {
    return
  }

  let { token } = await getCookie({req: false})
  let {question: {currentAnswerId}} = props
  if (!currentAnswerId.id) {
    api.post(`/answers`, {
      question_id: questionid,
      user_id: props.initialValues.user_id,
      data: data
    }, {
      Authorization: `Bearer ${token}`
    })
      .then(res => {
        props.postedAnswer({error: false, message: 'บันทึกคำตอบเสร็จสมบูรณ์'})
        props.postingAnswer(false)
      })
      .then(
        setTimeout(() => Router.push('/question'), 3000)
      )
      .catch(() => {
        props.postedAnswer({error: true, message: 'บันทึกคำตอบล้มเหลว!'})
        props.postingAnswer(false)
      })
  } else {
    api.put(`/answers`, {
      question_id: questionid,
      user_id: props.initialValues.user_id,
      data: data
    }, {
      Authorization: `Bearer ${token}`
    })
      .then(res => {
        props.postedAnswer({error: false, message: 'บันทึกคำตอบเสร็จสมบูรณ์'})
        props.postingAnswer(false)
      })
      .then(() =>
        setTimeout(() => Router.push('/question'), 3000)
      )
      .catch(() => {
        props.postedAnswer({error: true, message: 'บันทึกคำตอบล้มเหลว!'})
        props.postingAnswer(false)
      })
  }
}

const back = () => {
  Router.push('/question')
}

const getQuestionData = async (props) => {
  let { token } = await getCookie({req: false})
  let {url: {query: id}, setCurrentQuestion} = props
  api.get(`/questions/${id.id}`, {Authorization: `Bearer ${token}`})
    .then((response) => {
      setCurrentQuestion(response.data[0])
    })
}

const getAnswerData = async (props) => {
  let { token } = await getCookie({req: false})
  let {url: {query: id}, setCurrentAnswerId, setAnswer, postingAnswer} = props
  api.get(`/users/${props.initialValues.user_id}/answers/${id.id}`, {Authorization: `Bearer ${token}`})
    .then((response) => {
      if (response.data.data[0] !== undefined) {
        setCurrentAnswerId(response.data.data[0].id)
        setAnswer(response.data.data[0].questionid, response.data.data[0].data)
      } else {
        postingAnswer(false)
      }
    })
}

const clearAnswerData = (props) => {
  let {url: {query: id}, setCurrentAnswerId, setAnswer} = props
  setAnswer(id.id, '')
  setCurrentAnswerId('')
}

export default compose(
  connect(
    state => ({
      question: state.question
    }),
    { ...questionActions }
  ),
  getToken(),
  lifecycle({
    componentWillMount () {
      getQuestionData(this.props)
      getAnswerData(this.props)
    },
    componentWillUnmount () {
      clearAnswerData(this.props)
    }
  })
)(MainAnswer)
