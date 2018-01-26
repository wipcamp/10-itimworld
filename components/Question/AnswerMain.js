import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import axios from 'axios'
import api from '../../utils/api'


export const MainAnswer = props => {
  const {setQuestion,question:{answers,currentQuestion}} = props
  const questionid = props.url.query.id
  
  return (
    <div>
      <h1>Questions</h1>
      {currentQuestion.data}
      <Editor questionNumber={questionid} />
      <button onClick={()=>saveAnswer(questionid,answers.data,props)}>บันทึก</button>
    </div>
  )
}

const saveAnswer = (questionid,data) => {
  console.log('saving')
  api.post(`/answers`,{
    question_id: questionid,
    user_id: 2,
    data: data,
  })
}

const getQuestionData = (props) => {
  console.log('getQuestionData')
  let {url:{query:id},setCurrentQuestion} = props
      api.get(`/questions/${id.id}`)
      .then((response)=> {
        setCurrentQuestion(response.data[0])
      })
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
    }
  })
)(MainAnswer)
