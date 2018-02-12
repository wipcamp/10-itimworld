import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import ProfileMenu from './ProfileMenu'
import { withState, withHandlers, compose, lifecycle, withStateHandlers } from 'recompose'

import cookie from '../../../utils/cookie'
import api from '../../../utils/api'

const Header = styled.div`
  background: rgba(109,75,65,0.5);
  padding: 8px 0 7px;
  position: relative;
  display: flex;
  align-items: center;
  
`

const ImgLogo = styled.img`
  height: 40px;
  cursor: default;
  user-select: none;
  user-drag: none;
  align-self: center;
`

const TempBox = styled.div`
  height: 40px;
`

const Margin = styled.div`
  margin-top: -42px;
`

const BackButton = styled.i`
  cursor: pointer;
  font-size: 2em;
  color: #fff;
`

const backStep = () => {
  let path = window.location.pathname
  if (/[1-9]/g.test(path)) {
    path = '/question'
  } else {
    path = '/dashboard'
  }
  Router.push(path)
}

const checkDashboard = () => (
  window && window.location.pathname ? window.location.pathname : null
)

const HeaderContainer = props => (
  <Header>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 d-flex align-items-center justify-content-center'>
          <ImgLogo className='mx-auto' src='/static/img/logo.svg' alt='wipcamp-logo' />
        </div>

        <Margin className='col-12 d-flex align-items-center justify-content-center'>
          {
            !(checkDashboard() === '/dashboard')
              ? <BackButton onClick={() => backStep()} className='fas fa-chevron-circle-left mr-auto' />
              : <TempBox className='mx-auto' />
          }
          <ProfileMenu {...props} />
        </Margin>
      </div>
    </div>
  </Header>
)

export default compose(
  withState('wipid', 'setWipid', ''),
  withState('name', 'setName', ''),
  withState('img', 'setImg', null),
  withState('guide', 'setGuide', true),
  withState('node', 'setNode', null),
  withStateHandlers(
    ({ initialDropdown = false }) => ({
      dropdownVisible: initialDropdown
    }),
    {
      toggleDD: ({ dropdownVisible }, {setGuide}) => () => {
        setGuide(false)
        return {
          dropdownVisible: !dropdownVisible
        }
      },
      closeDD: () => () => ({
        dropdownVisible: false
      })
    }
  ),
  withHandlers({
    handleClickOutside: ({node, closeDD}) => ({ target }) => {
      !node.contains(target) && closeDD()
    }
  }),
  lifecycle({
    async componentDidMount () {
      const { props } = this
      document.addEventListener('click', props.handleClickOutside)
      let { token } = cookie({req: false})
      let { data } = await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
      if (data) {
        props.setImg(`https://graph.facebook.com/${data.provider_acc}/picture?height=50000`)
        let { data: registrant } = await api.get(`/registrants/${data.id}`, {Authorization: `Bearer ${token}`})
        registrant = registrant[0]
        props.setWipid(data.id)
        props.setName(registrant.nickname)
      }
    },
    componentWillUnmount () {
      document.removeEventListener('click', this.props.handleClickOutside)
    }
  })
)(HeaderContainer)
