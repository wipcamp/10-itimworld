import React from 'react'
import styled, {keyframes} from 'styled-components'
import {logout} from '../../../utils/auth'
import Link from 'next/link'
import { closeRegister } from '../../../schedule.json'
import moment from 'moment'

const boxShadowColor = '255,255,255'

export const pulse = keyframes`
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
    background-position: center;
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

  & .dropdown-item {
    cursor: pointer;
  }
  & .dropdown-item:hover {
    background: lightgray;
  }
`

const DisplayName = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ProfileMenu = props => {
  const end = moment(`${closeRegister} GMT+7`, 'DD MMM YYYY hh:mm:ss')
  const isClosed = moment().isAfter(end)
  const { dropdownVisible, toggleDD, setNode, name, wipid } = props
  return (
    <div className='btn-group'
      ref={setNode}
    >
      <DisplayName>
        <div>
          WIP ID: {wipid}
        </div>
        <div>
          สวัสดี น้อง{name}
        </div>
      </DisplayName>
      <Circle
        {...props}
        onClick={toggleDD}>
        <i className='fas fa-user' />
      </Circle>
      <Dropdown className={`dropdown-menu dropdown-menu-right ${dropdownVisible && 'show'}`} >
        {
          !isClosed && <Link href='/editprofile'><a className='dropdown-item'>แก้ไขข้อมูลส่วนตัว</a></Link>
        }
        <a className='dropdown-item' onClick={() => logout()}>ออกจากระบบ</a>
      </Dropdown>
    </div>
  )
}

export default ProfileMenu
