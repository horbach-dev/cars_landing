import { FormError } from "./formError";

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

const fieldsErrors = {
  mark: 'Введите марку',
  model: 'Введите модель',
  year: 'Введите год',
  price: 'Введите желаемую цену',
  name: 'Введите Ваше имя',
  phone: 'Введите номер телефона',
}

const formValidation = (data) => {
  const { name, ...fieldsData } = data
  const errors = {}

  Object.keys(fieldsData).forEach(key => {
    const field = fieldsData[key]

    if (!field || field === '') {
      errors[key] = fieldsErrors[key]
    }
  })

  const phoneNumbers = parseInt(fieldsData.phone.replace(/[^\d]/g, '')) || 0
  if (phoneNumbers && phoneNumbers !== 0) {
    if (String(phoneNumbers).length < 12) {
      errors.phone = 'Номер введен не полностью'
    }

    const codes = ['37529','37533','37544','37517','37524','37525']
    const isValid = codes.some(code => String(phoneNumbers).startsWith(code))

    console.log(isValid)
    console.log(phoneNumbers)
    if (!isValid) {
      errors.phone = 'Ошибка в коде оператора'
    }
  }

  return errors
}

export const sendTelegramMessage = async (data) => {
  const errors = formValidation(data)

  if (Object.keys(errors).length > 0) {
    return new Promise((resolve, reject) => {
      reject(new FormError(errors))
    })
  }

  const message = Object.keys(data).map(field => {
    if (field === 'date') return ''
    if (field === 'phone') return encodeURIComponent(`<b>${fields[field]}:</b> <a href='${data[field]}'>${data[field]}</a>`) + '%0A'
    return encodeURIComponent(`<b>${fields[field]}:</b> ${data[field]}`) + '%0A'
  }).join('')

  return fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${message}`)
}
