import React from 'react'
import { Field } from 'redux-form'

export default class Editor extends React.Component {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
  }

  render() {
    const ReactQuill = this.ReactQuill
    const renderQuill = ({ input }) => {
      if (typeof window !== 'undefined' && ReactQuill) {
        return (
          <ReactQuill
            {...input}
            onChange={(newValue, delta, source) => {
              if (source === 'user') {
                input.onChange(newValue);
              }
            }}
            onBlur={(range, source, quill) => {
              input.onBlur(quill.getHTML());
            }}
            theme={"snow"}
          />
        )
      } else {
        return <textarea />;
      }
    }
    return <Field name="description" component={renderQuill} />
  }
    
}
