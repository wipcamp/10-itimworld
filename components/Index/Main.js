import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { actions as tokenActions } from '../../store/reducers/token'
import styled from 'styled-components'
import {compose, lifecycle} from 'recompose'
import FacebookLogin from 'react-facebook-login'

import axios from '../../utils/api'

import { appId, fields, scope } from './facebook.json'

const Container = styled.div`
  position: relative;
  background-image: url('/static/img/background.png');
  background-size: cover;
  background-position: center bottom;
  overflow: hidden;
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

const auth = async (res, setToken) => {
  let {data} = await axios.post('/auth/login', { ...res }, null)
  setToken(data.accessToken)
  Router.push('/register')
}

const postData = async res => {
  let { data } = await axios.post('/users', { ...res }, null)
  if (data) {
    return data
  }
  return null
}

const getUserData = async res => axios.post(`/users/${res.id}`, { ...res }, null)

const responser = async (res, setToken) => {
  let user = await getUserData(res)
  if (!user.data) {
    user = await postData(res)
  }
  auth(res, setToken)
}

const getToken = () => (window ? window.localStorage.getItem('token') : null)

const IndexCompose = ({setToken}) => {
  return <Container className='container-fluid'>
    <div className='row'>
      <Layout className='col-12 d-flex flex-column justify-content-center align-items-center'>
        <Logo src='/static/img/wipcamp-logo.svg' alt='wipcamp-logo' />
        <FacebookLogin
          appId={appId}
          autoLoad
          fields={fields}
          scope={scope}
          callback={(res) => responser(res, setToken)}
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
  lifecycle({
    async componentDidMount () {
      let {setToken} = this.props
      let token = await getToken()
      setToken(token)
    }
  })
)(IndexCompose)
