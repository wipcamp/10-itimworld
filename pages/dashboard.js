import React from 'react'
import {compose} from 'recompose'

import withRedux from '../store/wrapper'
import serverRender from '../utils/serverRender'
import clientRender from '../utils/clientRender'
import Messenger from '../components/Core/Messenger'

import MainUpload from '../components/Dashboard/Main'

const UploadPage = props => (
  <div>
    <MainUpload {...props} />
  </div>
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger
)(UploadPage)
