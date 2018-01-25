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

const saveAnswer = (questionid,data,props) => {
  console.log('saving')
  const {saveAnswer} = props
  saveAnswer(questionid,1,data)
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
      let {url:{query:id},setCurrentQuestion} = this.props
      axios.get(`http://localhost:8000/api/v1/questions/${id.id}`)
      .then(function(response) {
        setCurrentQuestion(response.data[0])
      })
    }
  })
)(MainAnswer)
