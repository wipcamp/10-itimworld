import React from 'react'
import { compose } from 'recompose'
import EditProfileComponent from '../components/EditProfile/Main'
import withRedux from '../store/wrapper'
import clientRender from '../utils/clientRender'
import serverRender from '../utils/serverRender'
import moment from 'moment'
import Error from '../components/Core/Error'
import { closeRegister } from '../schedule.json'

const EditProfile = props => {
  const end = moment(`${closeRegister} GMT+7`, 'DD MMM YYYY hh:mm:ss')
  if (moment().isAfter(end)) return <Error />
  return <EditProfileComponent {...props} />
}

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`)
)(EditProfile)
