import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import api from '../../utils/api'
import getCookie from '../../utils/cookie'
import getToken from '../../utils/getToken'
import {Link} from '../../routes'
import styled from 'styled-components'
import Header from '../Core/Header/Main'
import checkRegisterStep from '../../utils/checkRegisterStep'

const Container = styled.div`
  background: #29241B url('/static/img/bg.png') center top;
  height: auto;
  min-height:100vh;
  background-size: cover;
  background-attachment: fixed;
  color: #032E51;
`

const Question = styled.div`
  background: url('/static/img/frame.png') left top;
  ${props => props.answered ? '' : 'filter: grayscale(80%);'}
  height: 108px;
  width: 289px;
  background-repeat: no-repeat;
  background-size: contain;
  color: #FFF;
  text-align: center;
  display:flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin: 0 auto;
  transition: all .5s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`

export const MainQuestion = props => {
  const { question: { questions: allQuestion, answered } } = props
  let questionNo = 0
  let answeredQuestion = []
  answered.map((data, index) => {
    answeredQuestion[index] = data.question_id
  })
  return (
    <Container>
      <Header />
      <div className='container pt-5'>
        <div className='row'>
          { allQuestion.map((question) => {
            questionNo++
            return (
              <div className='col-sm-6 pt-3' key={questionNo}>
                <Link href={{ pathname: '/question/answer', query: { id: question.id } }} prefetch>
                  <Question answered={answeredQuestion.indexOf(question.id) >= 0}>คำถามที่ {questionNo}</Question>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

const getQuestions = async (props) => {
  let { token } = await getCookie({req: false})
  let {setQuestion} = props
  api.get('/questions', {Authorization: `Bearer ${token}`})
    .then((response) => {
      setQuestion(response.data)
    })
}

const getAnsweredQuestions = async (props) => {
  let { token } = await getCookie({req: false})
  let {setAnsweredQuestion} = props
  api.get(`/registrants/${props.initialValues.user_id}`, {Authorization: `Bearer ${token}`})
    .then((response) => {
      setAnsweredQuestion(response.data[0].eval_answers)
    })
}

export default compose(
  connect(
    state => ({
      question: state.question
    }),
    { ...questionActions }
  ),
  getToken(),
  checkRegisterStep('/question'),
  lifecycle({
    componentWillMount () {
      getQuestions(this.props)
      getAnsweredQuestions(this.props)
    }
  })
)(MainQuestion)
