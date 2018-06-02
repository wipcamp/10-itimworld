import React from 'react'
import styled from 'styled-components'

import { RadioContainer, CheckRadio } from '../Core/Input'

import { compose } from 'recompose'
import { connect } from 'react-redux'
import { actions as ExamActions } from '../../store/reducers/exam'

const ChoiceContainer = styled.div`
  margin-top: 20px;
  margin-left: 30px;

  label {
    left: -2px;
    font-size: 130%;
  }

  ${RadioContainer} {
    margin: 10px 0;
  }
`

class QuestionSet extends React.Component {
  constructor (props) {
    super(props)
    this.handleChoose = this.handleChoose.bind(this)
  }
  handleChoose (event) {
    const questionId = event.target.name
    const answerId = event.target.value
    console.log(questionId, answerId)
    this.props.setAnswer({questionId, answerId})
  }
  render () {
    const {data} = this.props.question
    const {number} = this.props
    const answers = this.props.question.exam_choices
    const questionId = this.props.question.id
    return (
      <div className='bg-white p-4 my-3 rounded'>
        <p className='h3'>{number}.  <span dangerouslySetInnerHTML={{__html: data}} /></p>
        <form>
          <ChoiceContainer>
            
            {answers.map((val, key) => {
              console.log(val.data)
              return (
                <RadioContainer key={key}>
                  {/* if choice data == '99' hide field cause it's writing test */}
                  <input
                    type='radio'
                    hidden={val.data === null}
                    defaultChecked={val.data === '99'} 
                    name={questionId}
                    value={val.id}
                    id={val.id}
                    onClick={this.handleChoose}
                  />
                  <label
                    hidden={val.data === null}
                    htmlFor={val.id}
                  >{val.data}</label>
                  <CheckRadio hidden={val.data === null}/>
                </RadioContainer>
              )
            })}
          </ChoiceContainer>
        </form>
      </div>
    )
  }
}

export default compose(
  connect(
    state => ({
      exam: state.exam
    }),
    {...ExamActions}
  )
)(QuestionSet)
