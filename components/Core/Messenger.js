import React from 'react'
import styled from 'styled-components'
import {pageId, appId} from './messenger.json'

let MessengerCustomerChat = null
let Messenger = null

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
`

export default (Component) => (props) => (
  <Container>
    <Component {...props} />
    <MessengerContainer />
  </Container>
)

class MessengerContainer extends React.Component {
  componentDidMount () {
    MessengerCustomerChat = require('react-messenger-customer-chat')
    Messenger = styled(MessengerCustomerChat)`
      position: absolute;
      bottom: 0;
      right: 0;
    `
    this.forceUpdate()
  }

  render () {
    if (Messenger === null) return <div />
    return (
      <Messenger
        pageId={pageId}
        appId={appId}
        htmlRef={`div`}
      />
    )
  }
}
