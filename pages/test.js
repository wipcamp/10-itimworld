import React from 'react'
import AllAnnouce from '../components/custom/Annouce'
import Check from '../components/custom/Checkname'
import cookie from '../utils/cookie'
import api from '../utils/api'

class Test extends React.Component {
  state = {
      wipId:''
    }     
    async componentDidMount () {
      let {token} = await cookie({req: false})
      let {data} = await api.post(`/auth/me`, null, {Authorization: `Bearer ${token}`})
      this.setState({wipId:data.id})
    }
     
    render() {
      return (
        <div>
          <AllAnnouce  wipId={this.state.wipId} />
        </div>
      )
    }
  }
  export default Test