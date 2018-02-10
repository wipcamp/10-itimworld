import React from 'react'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import { actions as questionActions } from '../../store/reducers/question'
import Editor from './Editor'
import api from '../../utils/api'
import {Link} from '../../routes'
import styled from 'styled-components'
import Header from '../Core/Header/Main'

const Container = styled.div`
  background: #29241B url('/static/img/bg.png') center top;
  height: auto;
  min-height:100vh;
  background-size: cover;
  background-attachment: fixed;
  color: #032E51;
`

const Question = styled.div`
  background: url('/static/img/${props => props.count===1?`frame.png`:`frame.png`}') left top;
  // filter: grayscale(80%);
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
  const { question: { questions: allQuestion }, setQuestion } = props
  let questionNo = 0
  let count = [1,2,2,1]
  let i = -1
  return (
    <Container>
      <Header/>
      <div className='container pt-5'>
        <div className='row'>

        { allQuestion.map((question) => {
          if(i==count.length-1){
            i=-1
          }
          questionNo++
          i++
          return (
            <div className='col-sm-6 pt-3' key={questionNo}>
              <Link route={`/question/answer/${question.id}`} prefetch>
                <Question count={count[i]}>คำถามที่ {questionNo}</Question>
              </Link>
            </div>
          )
        })}
        </div>
      </div>
    </Container>
  )
}

const getQuestions = (props) => {
  console.log('getQuestions')
  let {setQuestion} = props
  api.get('/questions')
  .then((response)=>{
    setQuestion(response.data)
  })
}

export default compose(
  connect(
    state => ({
      question: state.question
    }),
    { ...questionActions }
  ),
  lifecycle({
    componentWillMount() {
      getQuestions(this.props)
    }
  })
)(MainQuestion)
