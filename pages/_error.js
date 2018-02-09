import React from 'react'
import Landing from '../components/Index/Landing'

const Error = ({ statusCode }) => (
  <Landing />
)

Error.getInitialProps = ({ res, jsonPageRes }) => {
  const statusCode = res ? res.statusCode : jsonPageRes && jsonPageRes.status
  return { statusCode }
}

export default Error
