import React from 'react'
import {compose, withState} from 'recompose'
import { connect } from 'react-redux'
import { actions as tokenActions } from '../../store/reducers/token'
import styled, { keyframes } from 'styled-components'
import FacebookLogin from 'react-facebook-login'

import { responser } from '../../utils/auth'
import { appId, fields, scope } from './facebook.json'

const Container = styled.div`
  position: relative;
  background-image: url('/static/img/background.png');
  background-size: cover;
  background-position: center bottom;
  overflow: hidden;
`

const Spinner = keyframes`
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
`

const Loading = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 1.5s ease-in-out;
  display: flex;
  flex-direction: column;
  
  i {
    color: #222;
    font-size: 10em;  
    animation: ${Spinner} 2s linear infinite;
  }

  opacity: ${props => props.loading ? 1 : 0};
  visibility: ${props => props.loading ? 'visible' : 'hidden'};
`

const Layout = styled.div`
  min-height: 100vh;
`

const Logo = styled.img`
  min-width: 300px;
  max-width: 500px;
  margin-bottom: 5em;
  margin-top: -8em;
`

const IndexCompose = ({setToken, loading, setLoad}) => {
  return <Container className='container-fluid'>
    <Loading loading={loading} className={`justify-content-center align-items-center`}>
      <div className='text-center'>
        <i className='fa fa-refresh' />
        <h1 className='animated pulse infinite mt-3'>กรุณาคอยสักประเดี๋ยว..</h1>
        <h4 className='animated pulse infinite'>รู้หมือไร่? หน้าเว็บเลือกทีมได้นะ!</h4>
      </div>
    </Loading>
    <div className='row'>
      <Layout className='col-12 d-flex flex-column justify-content-center align-items-center'>
        <Logo src='/static/img/logofinals.png' alt='wipcamp-logo' />
        <FacebookLogin
          appId={appId}
          autoLoad
          fields={fields}
          scope={scope}
          callback={(res) => responser(res, setToken, setLoad)}
          icon={`fa fa-facebook mt-2 mr-3`}
          textButton={`Login with Facebook`}
          cssClass='btn btn-primary'
          tag={`button`}
        />
      </Layout>
    </div>
  </Container>
}

export default compose(
  connect(
    state => ({
      token: state.token
    }),
    { ...tokenActions }
  ),
  withState('loading', 'setLoad', true)
)(IndexCompose)
