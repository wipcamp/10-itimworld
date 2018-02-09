import moment from 'moment'

export const normalizePhone = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  if (onlyNums.length <= 3) {
    return onlyNums
  }
  if (onlyNums.length <= 6) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

export const normalizeCitizenId = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  const len = onlyNums.length
  if (len < 2) {
    return onlyNums
  } else if (len < 6) {
    return `${onlyNums.slice(0, 1)}-${onlyNums.slice(1)}`
  } else if (len < 11) {
    return `${onlyNums.slice(0, 1)}-${onlyNums.slice(1, 5)}-${onlyNums.slice(5)}`
  } else if (len < 13) {
    return `${onlyNums.slice(0, 1)}-${onlyNums.slice(1, 5)}-${onlyNums.slice(5, 10)}-${onlyNums.slice(10)}`
  }
  return `${onlyNums.slice(0, 1)}-${onlyNums.slice(1, 5)}-${onlyNums.slice(5, 10)}-${onlyNums.slice(10, 12)}-${onlyNums.slice(12, 13)}`
}

export const normalizeGpax = (value, previousValue, _) => {
  if (!value) {
    return value
  }

  value = value.replace(/[^0-9.]/g, '')
  const maximum = 4
  const minimum = 0
  let result
  let sections = value.split('.')

  if (sections[0] !== '0' && sections[0] !== '00') {
    sections[0] = sections[0].replace(/^0+/, '')
  } else {
    sections[0] = '0'
  }

  if (sections[1]) {
    result = sections[0] + '.' + sections[1].slice(0, 2)
  } else if (value.indexOf('.') > -1) {
    result = sections[0] + '.'
  } else {
    result = sections[0]
  }

  return result <= maximum && result >= minimum ? result : previousValue
}

export const normalizeDate = (value) => {
  if (!value || moment.isMoment(value) || moment.isDate(value)) {
    return value
  }
  return ''
}

export const normalizeThai = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^ก-๙ ]/g, '')
}

export const normalizeEng = (value) => {
  if (!value) {
    return value
  }
  return value.replace(/[^a-zA-Z"' ]/g, '')
}
