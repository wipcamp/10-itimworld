import { defineAction } from 'redux-define'

const appsCreator = defineAction('wip-itim')

export const promiseStates = ['PENDING', 'RESOLVED', 'REJECTED']
export default namespace => (action, isContainPromiseStates) => (
  isContainPromiseStates
    ? appsCreator.defineAction(namespace).defineAction(action, promiseStates)
    : appsCreator.defineAction(namespace).defineAction(action).toString()
)
