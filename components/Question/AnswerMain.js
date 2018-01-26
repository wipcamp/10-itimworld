import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import api from '../../utils/api'

const USER_ID = 1

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

const saveAnswer = (questionid,data,props) => {
  console.log('saving')
  let {question:{currentAnswerId}} = props
  if(currentAnswerId.id=='') {
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
