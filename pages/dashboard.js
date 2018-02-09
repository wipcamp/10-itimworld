import React from 'react'
import MainUpload from '../components/dashboard/Main'
import withRedux from '../store/wrapper'

const UploadPage = props => (
  <div>
    <MainUpload {...props} />
  </div>
)

export default withRedux()(UploadPage)
