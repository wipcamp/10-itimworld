import React from 'react'
import Annouce from '../../components/custom/Annouce'
import { compose } from 'recompose'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import Messenger from '../../components/Core/Messenger'

const Announcement = (props) => (
  <Annouce {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger
)(Announcement)
