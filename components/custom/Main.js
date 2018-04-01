import React from 'react'
import Custom from './index'
import Linktoannouce from './linktoannouce'
import styled from 'styled-components'
import { compose } from 'recompose'

import checkStep from '../../utils/checkRegisterStep'
import getToken from '../../utils/getToken'

const Bg = styled.div`
  background-image: url('../../static/img/bg1.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
`

const Main = (props) => (
  <Bg>
    <Custom {...props} />
    <Linktoannouce {...props} />
  </Bg>
)

export default compose(
  getToken(),
  checkStep('/announce')
)(Main)
