import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import { actions as profileActions } from '../../store/reducers/profile'
import styled from 'styled-components'
import {compose, lifecycle} from 'recompose'
import FacebookLogin from 'react-facebook-login'

import axios from '../../utils/api'

const appId = `1418974444820427`

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

const handleClick = async res => {
  console.log(res)
}

const postData = async res => {
  console.log(res)
  // return res
  let { data } = await axios.post('/users', { ...res })
  if (data) {
    // Router.push('/register')
    return data
  }
  return null
}

const responser = async (res, setToken) => {
  let { accessToken } = await postData(res)
  setToken(accessToken)
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
          fields='name,picture'
          scope='public_profile'
          onClick={handleClick}
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
      profile: state.profile
    }),
    { ...profileActions }
  ),
  lifecycle({
    async componentDidMount () {
      let {setToken} = this.props
      let token = await getToken()
      setToken(token)
    }
  })
)(IndexCompose)
