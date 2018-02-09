import React from 'react'
import MainUpload from '../components/Dashboard/Main'
import withRedux from '../store/wrapper'

const UploadPage = props => (
  <div>
    <MainUpload {...props} />
  </div>
)

export default withRedux()(UploadPage)
