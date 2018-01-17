import React from 'react';
import { Field } from 'redux-form';
// import ReactQuill from 'react-quill';

export default class Editor extends React.Component {
  state = { 
    val: ''
   }

  componentWillMount() {
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
      this.reactQuillRef = null
    }
  }

  handle(e, input) {
    setTimeout(() => {
      input.onChange(e)
    }, 0)
  }

  forceFocus() {
    this.reactQuillRef.focus()
  }

  render() {
    
    const ReactQuill = this.ReactQuill
    const renderQuill = ({name, input, value}) => {
      if (typeof window !== 'undefined' && ReactQuill)
        return (
          <div>
            <ReactQuill
              {...input}
              ref={(el) => { this.reactQuillRef = el }}
              onChange={e => this.handle(e, input)
              }
              onBlur={() => this.forceFocus()}
              theme="snow"
              value={input.value}
            />
          </div>
        )
      return <div />
    }
    return (
      <Field name="answer" component={renderQuill} />
    )
  }
}
