const getBitrixFields = ({ mark, model, year, price, name, phone }) => {
  let str = ''

  if (mark || model || year) {
    str = str + `FIELDS[TITLE]=${mark} ${model} г. ${year}&FIELDS[COMMENTS]=${mark} ${model}, ${year} год`
  }

  if (name) {
    str = str + `&FIELDS[NAME]=${name}`
  }

  if (price) {
    str = str + `&FIELDS[OPPORTUNITY]=${price}&FIELDS[CURRENCY_ID]=USD`
  }

  if (phone) {
    str = str + `&FIELDS[PHONE][0][VALUE]=${phone}`
  }

  return str
}

const TELEGRAM_CHAT_ID = '-535143097'
const TELEGRAM_TOKEN = '1953457589:AAHflTWrEBxI31Gf3PSrJaW7X29DC3AFQMg'

const fields = {
  mark: 'Марка',
  model: 'Модель',
  year: 'Год',
  price: 'Цена',
  name: 'Имя',
  phone: 'Телефон',
}

const getTelegramApiUri = (data) => {
  const message = Object.keys(data).map(field => {
    if (field === 'date') return ''
    if (field === 'phone') return encodeURIComponent(`<b>${fields[field]}:</b> <a href='${data[field]}'>${data[field]}</a>`) + '%0A'
    return encodeURIComponent(`<b>${fields[field]}:</b> ${data[field]}`) + '%0A'
  }).join('')

  return `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${message}`
}

module.exports = {
  getBitrixFields,
  getTelegramApiUri,
}
