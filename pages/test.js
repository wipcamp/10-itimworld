import React from 'react'
import AllAnnouce from './Annouce/pages/index'
import cookie from '../utils/cookie'
import api from '../utils/api'

class Test extends React.Component {
  state = {
      file: {}
    }     
    async componentDidMount () {
      let {token} = await cookie({req: false})
      console.log(token)
      let {data} = await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
      console.log(data.id)
    }
    drop = (files) => {
      this.setState({
        file: files[0]
      })
    }        
    render() {
      return (
        <div>
          <AllAnnouce/>
        </div>
      )
    }
  }
  export default Test