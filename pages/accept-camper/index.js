import React from 'react'
import AcceptCamper from '../../components/AcceptCamper/Main'
import serverRender from '../../utils/serverRender'
import clientRender from '../../utils/clientRender'
import { compose, lifecycle } from 'recompose'
import campers from '../../components/custom/campers.json'
import api from '../../utils/api'
import cookie from '../../utils/cookie'
import Router from 'next/router'

class index extends React.Component {
  state = {
    isShow: false
  }

  async componentDidMount () {
    
  }
  render () {
    return (
      <div>
        <AcceptCamper />
      </div>
    )
  }
}

export default compose(
  clientRender(`/`),
  serverRender(`/`),
  lifecycle({
    async componentWillMount () {
      let {token} = await cookie({req: false})
      let { data } = await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
      let checkCamper = await campers.filter(el => {
        return el.wipId === data.id
      })
      if (checkCamper.length === 0) {
        Router.push('/announce/annoucement')
      }
    }})
)(index)
