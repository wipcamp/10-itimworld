import React from 'react'
import Custom from '../../components/custom/index'
import Linktoannouce from '../../components/custom/linktoannouce'
import styled from 'styled-components'
import { compose } from 'recompose'

import MainAnnounce from '../../components/custom/Main'

import withRedux from '../../store/wrapper'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import Messenger from '../../components/Core/Messenger'

const Bg = styled.div`
  background-image: url('../static/img/bg1.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`

const Announce = (props) => (
  <MainAnnounce {...props} />
)

export default compose(
  withRedux(),
  clientRender(`/`),
  serverRender(`/`),
  Messenger
)(Announce)
