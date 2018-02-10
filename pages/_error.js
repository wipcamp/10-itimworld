import React from 'react'
import ErrorComponent from '../components/Core/Error'

const Error = ({ statusCode }) => (
  <ErrorComponent />
)

Error.getInitialProps = ({ res, jsonPageRes }) => {
  const statusCode = res ? res.statusCode : jsonPageRes && jsonPageRes.status
  return { statusCode }
}

export default Error
