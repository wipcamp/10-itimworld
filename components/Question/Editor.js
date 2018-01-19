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
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline','strike'],
        ['blockquote','code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        [{ 'align': [] }],
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
        <ReactQuill
          onChange={(val) => setAnswer(1, val)}
          theme='snow'
          value={answers[0].data}
          modules={this.modules}
        />          
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
