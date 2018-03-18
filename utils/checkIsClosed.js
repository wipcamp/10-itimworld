import React from 'react'
import moment from 'moment'
import { closeRegister } from '../schedule.json'
import CloseRegisComponent from '../components/Register/ClosedRegister'

const checkIsClosed = (Component) => () => {
  const end = moment(`${closeRegister} GMT+7`, 'DD MMM YYYY hh:mm:ss')
  if (moment().isAfter(end)) return <CloseRegisComponent />
  return <Component />
}

export default checkIsClosed
