import React from 'react'
import { compose } from 'recompose'
import EditProfileComponent from '../components/EditProfile/Main'
import withRedux from '../store/wrapper'
import clientRender from '../utils/clientRender'
import serverRender from '../utils/serverRender'

const EditProfile = props => (
  <EditProfileComponent {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`)
)(EditProfile)
