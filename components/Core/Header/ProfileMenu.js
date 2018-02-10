import React from 'react'
import styled, {keyframes} from 'styled-components'
import {logout} from '../../../utils/auth'

const boxShadowColor = '255,255,255'

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${boxShadowColor}, 0.9);
  }
  70% {
    box-shadow: 0 0 0 0.7rem rgba(${boxShadowColor}, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(${boxShadowColor}, 0);
  }
`

const pulse2 = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(${boxShadowColor}, 0.9);
  }
  70% {
    box-shadow: 0 0 0 1.5rem rgba(${boxShadowColor}, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(${boxShadowColor}, 0);
  }
`

const Circle = styled.div`
  background: #fff;
  width: 42px;
  height: 42px;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #564238;
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

  ${props => props.guide && `
    animation: ${pulse} 2s 2;
    @media screen and (min-width: 576px) {
      animation-name: ${pulse2};
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

const DisplayName = styled.div`
  color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`

const ProfileMenu = props => {
  const { dropdownVisible, toggleDD, setNode, name } = props
  return (
    <div className='btn-group'
      ref={setNode}
    >
      <DisplayName>สวัสดี น้อง{name}</DisplayName>
      <Circle
        {...props}
        onClick={toggleDD}>
        <i className='fas fa-user' />
      </Circle>
      <Dropdown className={`dropdown-menu dropdown-menu-right ${dropdownVisible && 'show'}`} >
        <a className='dropdown-item' onClick={() => logout()}>ออกจากระบบ</a>
      </Dropdown>
    </div>
  )
}

export default ProfileMenu
