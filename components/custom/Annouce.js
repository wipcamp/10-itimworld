import React from 'react'
import styled from 'styled-components'
import Bg from '../../components/custom/Background'

import { compose } from 'recompose'

import checkStep from '../../utils/checkRegisterStep'
import getToken from '../../utils/getToken'

const Bg1 = styled.div`
  overflow-x:hidden;
  overflow-y:hidden;
`

const MouseFlashlight = styled.div`
  cursor: none;
  --cursorX: 50%;
  --cursorY: 50%;
  position: relative;
  display: inline-block;
  z-index:5;
  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    background: radial-gradient(
      circle 15vmax at var(--cursorX) var(--cursorY),
      rgba(0,0,0,0) 0%,
      rgba(0,0,0,.5) 80%,
      rgba(0,0,0,1) 100%
    )
  }
`

class AnnounceWithFlashlight extends React.Component {
  state = {
    node: null
  }

  update = (e) => {
    try {
      let x = e.clientX || e.touches[0].clientX
      let y = e.clientY || e.touches[0].clientY
      const { node } = this.state
      x -= node.offsetLeft
      y -= node.offsetTop
      node.style.setProperty('--cursorX', x + 'px')
      node.style.setProperty('--cursorY', y + 'px')
    } catch (err) {
      /* ignore error */
    }
  }

  loadRef = (node) => {
    this.setState({ node })
  }

  render () {
    return (
      <Bg1>
        <MouseFlashlight
          onMouseMove={this.update}
          onTouchMove={this.update}
          innerRef={this.loadRef}
        >
          <Bg  {...this.props}/>
        </MouseFlashlight>
      </Bg1>
    )
  }
}

export default compose(
  getToken(),
  checkStep('/announce/annoucement')
)(AnnounceWithFlashlight)
