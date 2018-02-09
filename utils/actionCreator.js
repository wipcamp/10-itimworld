const applicationName = 'wip-itim'
const separator = '/'
const promiseState = ['_PENDING', '_FULFILLED', '_REJECTED']

export default nameSpace => (action, containPromise) => {
  let actionType = applicationName + separator + nameSpace + separator + action
  return containPromise ? {
    ACTION: actionType,
    PENDING: actionType + promiseState[0],
    FULFILLED: actionType + promiseState[1],
    REJECTED: actionType + promiseState[2]
  } : actionType
}
