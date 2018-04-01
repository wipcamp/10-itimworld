import React from 'react'
import Custom from '../../components/custom/index'
import Linktoannouce from '../../components/custom/linktoannouce'
import styled from 'styled-components'

const Bg = styled.div`
  background-image: url('../static/img/bg1.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`
export default class Index extends React.Component {
  render () {
    return (
      <div>
        <Bg>
          <Custom />
          <Linktoannouce />
        </Bg>
      </div>
    )
  }
}
