const isNumber = (number) => {
  if (number === true ||
    number === false ||
    isNaN(number) ||
    number === ''
  ) {
    return null
  }
  return Number(number)
}

const dataIsNotNull = obj => {
  let keys = Object.keys(obj)
  if (keys.length && !keys.find(k => obj[k] === undefined || obj[k] === null)) {
    return true
  }
  return false
}

const convertTo = decimal => numericStr => {
  try {
    let number = (+numericStr).toFixed(decimal)
    return isNumber(number)
  } catch (err) {
    return null
  }
}

const convertToInt = convertTo(0)
const convertToFloat = convertTo(2)

export {
  convertToFloat,
  convertToInt,
  dataIsNotNull
}
