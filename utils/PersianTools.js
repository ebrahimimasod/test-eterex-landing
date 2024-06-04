import {
  isShebaValid,
  getShebaInfo,
  verifyCardNumber,
  getBankNameFromCardNumber,
  digitsEnToFa,
  addCommas,
  numberToWords,
  verifyIranianNationalId,
  URLfix,
} from '@persian-tools/persian-tools'

const isShebaValidMethod = (sheba) => {
  return isShebaValid(sheba)
}

const getShebaInfoMethod = (sheba) => {
  return getShebaInfo(sheba)
}

const verifyCardNumberMethod = (cardNumber) => {
  return verifyCardNumber(cardNumber)
}

const getBankNameFromCardNumberMethod = (cardNumber) => {
  return getBankNameFromCardNumber(cardNumber)
}

const toFaNumMethod = (num) => {
  return digitsEnToFa(num)
}

const addCommasMethod = (num) => {
  return addCommas(num)
}

const validateNationalCode = (code) => {
  return verifyIranianNationalId(code)
}

const numberToWordsMethod = (code) => {
  return numberToWords(code)
}

const fixUrl = (url) => {
  return URLfix(url)
}

export default {
  isShebaValidMethod,
  getShebaInfoMethod,
  verifyCardNumberMethod,
  getBankNameFromCardNumberMethod,
  toFaNumMethod,
  addCommasMethod,
  numberToWordsMethod,
  validateNationalCode,
  fixUrl,
}
