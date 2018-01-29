import React from 'react'
import styled, {keyframes} from 'styled-components'
import { withState, withHandlers, compose, lifecycle, withStateHandlers } from 'recompose'

const style = {
  headerBg: '#6AA6DD',
  guidePosition: -15
}

const Header = styled.div`
  background: ${style.headerBg};
  padding: 5px 0;
  position: relative;
  display: flex;
  align-items: center;
  
`

const bounce1 = keyframes`
  0%, 20%, 50%, 80%, 100% {
    bottom: ${style.guidePosition}px;
  }
  40% {
    bottom: ${style.guidePosition + 10}px;
    opacity: 0;
  }
  60% {
    bottom: ${style.guidePosition + 5}px;
  }
`

const bounce2 = keyframes`
  0%, 20%, 50%, 80%, 100% {
    bottom: ${style.guidePosition - 5}px;
  }
  40% {
    bottom: ${style.guidePosition + 5}px;
    opacity: 0;
    
  }
  60% {
    bottom: ${style.guidePosition}px;
  }
`

const Circle = styled.div`
  background: #fff;
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${style.headerBg};
  cursor: pointer;
  position: relative;
  font-size: 25px;

  ${props => props.img && `
    background-image: url(${props.img});
    background-size: cover;
    & > svg, & > i {
      display: none;
    }
  `}

  &::before, &::after {
    content: '';
    border: solid black;
    border-width: 0 1.5px 1.5px 0;
    display: inline-flex;
    padding: 4px;
    position: absolute;
    justify-content: center;
    transform: rotate(45deg);
    transition: opacity 1s ease-in-out;
    bottom: -15px;
    opacity: 1;
  }

  ${props => props.guide ? `
    &::before {
      animation: ${bounce1} 1s infinite;
    }

    &::after {
      animation: ${bounce2} 1s infinite;
    }

  ` : `
    &::before, &::after {
      display: none;
    }
  `}
`

const Dropdown = styled.div`
  
  right: 0;
  left: auto;
  top: 60px;
  user-select: none;

  &::before {
    content: '';
    border: 0 solid transparent;
    border-bottom-width: 10px;
    border-left-width: 10px;
    border-right-width: 10px;
    border-bottom-color: #fff;
    position: absolute;
    top: -8px;
    right: 13px;
    z-index: 2;
  }


  & .dropdown-item:hover {
    background: lightgray;
  }
`

const ImgLogo = styled.img`
  cursor: grab;
  user-select: none;
  user-drag: none;
`

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const HeaderContainer = props => {
  const { guide, dropdownVisible, toggleDD, setNode, img } = props
  return (
    <Header>
      <div className='container'>
        <div className='row'>
          <div className='offset-3 col-6 offset-md-5 col-md-2'>
            <ImgLogo src='/static/img/logo-white.svg' alt='wipcamp-logo' />
          </div>
          <Column className='col-3 col-md-4 text-right'
            innerRef={setNode}
          >
            <div className='btn-group'>
              <Circle
                img={img}
                guide={guide}
                onClick={toggleDD}>
                <i className='fas fa-user' />
              </Circle>
              <Dropdown className={`dropdown-menu dropdown-menu-right ${dropdownVisible && 'show'}`} >
                <a className='dropdown-item' href='#'>แก้ไขข้อมูลส่วนตัว</a>
                <a className='dropdown-item' href='#'>ออกจากระบบ</a>
              </Dropdown>
            </div>
          </Column>
        </div>
      </div>
    </Header>
  )
}

export default compose(
  // withState('dropdownVisible', 'setDropdownVisible', false),
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
    handleClickOutside: ({node, closeDD}) => (event) => {
      if (node.contains(event.target)) {
        return
      }
      closeDD()
    }
  }),
  lifecycle({
    /* eslint-disable */
    componentDidMount() {
      document.addEventListener('click', this.props.handleClickOutside)
    },
    componentWillUnmount() {
      document.removeEventListener('click', this.props.handleClickOutside)
    }
    /* eslint-enable */
  })
)(HeaderContainer)
