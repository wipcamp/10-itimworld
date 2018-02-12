import React from 'react'
import {compose} from 'recompose'
import ErrorComponent from '../components/Core/Error'
import Messenger from '../components/Core/Messenger'

const Error = ({ statusCode }) => (
  <ErrorComponent />
)

Error.getInitialProps = ({ res, jsonPageRes }) => {
  const statusCode = res ? res.statusCode : jsonPageRes && jsonPageRes.status
  return { statusCode }
}

export default compose(
  Messenger
)(Error)
