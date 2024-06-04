const toFixedNoRounding = (num, n) => {
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g')
  const a = num.toString().match(reg)[0]
  const dot = a.indexOf('.')
  if (dot === -1) {
    return a + '.' + '0'.repeat(n)
  }
  const b = n - (a.length - dot) + 1
  return b > 0 ? a + '0'.repeat(b) : a
}

const fixFloat = (num, n) => {
  const reg = new RegExp('^-?\\d+(?:\\.\\d{0,' + n + '})?', 'g')
  return num.toString().match(reg)[0]
}

function toFixed(num, fixed) {
  let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString()?.match(re)[0] || 0;
}

export default {toFixedNoRounding, fixFloat, toFixed}
