import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { actions as questionActions } from '../../store/reducers/question'

export class Editor extends React.Component {
  state = {
    value: ''
  }

  componentWillMount () {
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
    this.modules = {
      toolbar : [
        [{ 'header': [1, 2,3,4,5, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean']
      ]
    }
  }

  handle (value) {
    this.setState({value})
  }

  render () {
    const ReactQuill = this.ReactQuill
    const { questions, answers, setAnswer } = this.props
    this.formats = ['italic', 'underline'] // default formats
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div>
          {console.log(this.props)}
          { questions[0].data }
          <ReactQuill
            onChange={(val) => setAnswer(1, val)}
            theme='snow'
            value={answers[0].data}
            modules={this.modules}
          />
        </div>
      )
    }
    return <textarea />
  }
}

export default compose(
  connect(
    state => ({
      questions: state.question.questions,
      answers: state.question.answers
    }),
    { setAnswer: questionActions.setAnswer }
  )
)(Editor)
