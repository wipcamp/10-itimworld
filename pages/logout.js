import React from 'react'
import {compose} from 'recompose'
import LogoutPage from '../components/Logout/Main'
import Messenger from '../components/Core/Messenger'

const Logout = () => (
  <LogoutPage />
)

export default compose(
  Messenger
)(Logout)
