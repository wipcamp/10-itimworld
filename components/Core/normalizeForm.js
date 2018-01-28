export const normalizePhone = value => {
  if (!value) {
    return value
  }

  const onlyNums = value.replace(/[^\d]/g, '')
  console.log(`only num > `, onlyNums)
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
