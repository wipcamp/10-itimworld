import React from 'react'
import styled from 'styled-components'
import ProfileMenu from './ProfileMenu'
import { withState, withHandlers, compose, lifecycle, withStateHandlers } from 'recompose'

import cookie from '../../../utils/cookie'
import api from '../../../utils/api'

const Header = styled.div`
  background: #564238;
  padding: 5px 0;
  position: relative;
  display: flex;
  align-items: center;
  
`

const ImgLogo = styled.img`
  height: 52px;
  cursor: default;
  user-select: none;
  user-drag: none;
  align-self: center;
`

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const HeaderContainer = props => (
  <Header>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-8 offset-md-4 col-md-4 text-center'>
          <ImgLogo src='/static/img/logo.svg' alt='wipcamp-logo' />
        </div>
        <Column className='col-4 col-md-4 text-right'>
          <ProfileMenu {...props} />
        </Column>
      </div>
    </div>
  </Header>
)

export default compose(
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
        props.setImg(`http://graph.facebook.com/${data.provider_acc}/picture?height=50000`)
        let { data: registrant } = await api.get(`/registrants/${data.id}`, {Authorization: `Bearer ${token}`})
        registrant = registrant[0]
        props.setName(registrant.nickname)
      }
    },
    componentWillUnmount () {
      document.removeEventListener('click', this.props.handleClickOutside)
    }
  })
)(HeaderContainer)
