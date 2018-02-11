import React from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {pageId, appId} from './messenger.json'

const MessengerCustomerChat = dynamic(import('react-messenger-customer-chat'),{
  ssr: false
})

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
`

const Messenger = styled(MessengerCustomerChat)`
  position: absolute;
  bottom: 0;
  right: 0;
`

export default (Component) => (props) => (
  <Container>
    <Component {...props} />
    <Messenger
      pageId={pageId}
      appId={appId}
      htmlRef={`div`}
    />
  </Container>
)
