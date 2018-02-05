import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import api from '../../utils/api'
import styled from 'styled-components'
import Router from 'next/router'
import Header from './../upload/header'

const USER_ID = 2

const Container = styled.div`
  background: url('/static/img/bg-d2.png') center top;
  height: auto;
  min-height:100vh;
  background-size: cover;
  background-attachment: fixed;
  color: #032E51;
`

const SubmitButton = styled.button`
  background-color: #336699;
  color: #fff;
  font-weight: bold;
  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'}
  }
`

const BackButton = styled.button`
  background-color: rgba(0,0,0,0);
  border: 1px solid #336699;
  color: #336699;
  font-weight: bold;

  &:hover {
    cursor: ${props => props.disabled ? 'no-drop' : 'pointer'} ;
  }
`

const SubmitSection = styled.div`
  padding-top: 25px;
`

const QuestionSection = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
`

export const MainAnswer = props => {
  const {setQuestion,question:{answers,currentQuestion}} = props
  const questionid = props.url.query.id
  
  return (
    <Container>
      <Header/>
      <div className='container'>
        <QuestionSection className='h3'>
          {`คำถามที่ ${questionid} : `}{currentQuestion.data}
        </QuestionSection>
        <Editor questionNumber={questionid} />
        <SubmitSection>
          <div className='row'>
            <div className='col-6'>
              <BackButton className='btn btn-large float-left' onClick={()=>back()}>กลับ</BackButton>
            </div>
            <div className='col-6'>
              <SubmitButton className='btn btn-large float-right' onClick={()=>saveAnswer(questionid,answers.data,props)}>บันทึก</SubmitButton>
            </div>
          </div>
        </SubmitSection>
      </div>
    </Container>
  )
}

const saveAnswer = (questionid,data,props) => {
  console.log('saving')
  let {question:{currentAnswerId}} = props
  if(!currentAnswerId.id) {
    console.log('posting')
    api.post(`/answers`,{
      question_id: questionid,
      user_id: USER_ID,
      data: data,
    })
  }else {
    console.log('updating')
    api.put(`/answers`,{
      question_id: questionid,
      user_id: USER_ID,
      data: data,
    })
  }
}

const back = () => {
  Router.push('/question')
}

const getQuestionData = (props) => {
  console.log('getQuestionData')
  let {url:{query:id},setCurrentQuestion} = props
      api.get(`/questions/${id.id}`)
      .then((response)=> {
        setCurrentQuestion(response.data[0])
      })
}

const getAnswerData = (props) => {
  let {url:{query:id},setCurrentAnswerId,setAnswer} = props
  api.get(`/users/${USER_ID}/answers/${id.id}`)
  .then((response) => {
    if(response.data.data[0]!==undefined) {
      setCurrentAnswerId(response.data.data[0].id)
      setAnswer(response.data.data[0].questionid,response.data.data[0].data)
    }
  })
}

const clearAnswerData = (props) => {
  let {url:{query:id},setCurrentAnswerId,setAnswer} = props
  setAnswer(id.id,'')
  setCurrentAnswerId('')
}

export default compose(
  connect(
    state => ({
      question: state.question,
    }),
    { ...questionActions }
  ),
  lifecycle({
    componentWillMount() {
      getQuestionData(this.props)
      getAnswerData(this.props)
    },
    componentWillUnmount() {
      clearAnswerData(this.props)
    }
  })
)(MainAnswer)
