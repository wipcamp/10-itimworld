import React from 'react'
import styled, {keyframes} from 'styled-components'
import ProfileMenu from './profileMenu'
import { withState, withHandlers, compose, lifecycle, withStateHandlers } from 'recompose'

const Header = styled.div`
  background: #6AA6DD;
  padding: 5px 0;
  position: relative;
  display: flex;
  align-items: center;
  
`

const ImgLogo = styled.img`
  cursor: default;
  user-select: none;
  user-drag: none;
`

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const HeaderContainer = props => (
  <Header>
    <div className='container'>
      <div className='row'>
        <div className='offset-3 col-6 offset-md-4 col-md-4'>
          <ImgLogo src='/static/img/logo.svg' alt='wipcamp-logo' />
        </div>
        <Column className='col-3 col-md-4 text-right'>
          <ProfileMenu {...props} />
        </Column>
      </div>
    </div>
  </Header>
)

export default compose(
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
    componentDidMount () {
      document.addEventListener('click', this.props.handleClickOutside)
    },
    componentWillUnmount () {
      document.removeEventListener('click', this.props.handleClickOutside)
    }
  })
)(HeaderContainer)
