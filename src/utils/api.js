import axios from 'axios'
import { message } from 'antd';
import { FormError } from "../utils/formError";

const FORM_ERROR_CODE = 10001;
const ALERT_ERROR_CODE = 10101;

// const local = '/'
const local = 'http://localhost:8002/'

const client = axios.create({
  baseURL: local,
});

export const request = (endpoint, options = {}) => {
  const ready = client(endpoint, options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.message === "Network Error") {
        message.error('Произошла ошибка, свяжитесь с нами по телефону!');
      }

      if (!error.response || !error.response.data) {
        throw error;
      }

      if (error.response.status === 404) {
        return message.error('Произошла ошибка, свяжитесь с нами по телефону!');
      }

      const errorCode = error.response.data.code;

      if (errorCode === 2300) {
        message.error('Произошла ошибка, свяжитесь с нами по телефону!');
      }

      if (error.response.data) {
        if (errorCode === FORM_ERROR_CODE) {
          message.warning('Пожалуйста заполните поля правильно!');
          throw new FormError(error.response.data.errors)
        }
      }

      if (errorCode === ALERT_ERROR_CODE) {
        if(error.response.data.message) {
          // throw new AlertError(error.response.data.message)
        }
      }

      throw error;
    });

  return {
    ready,
  };
};

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

// const TELEGRAM_CHAT_ID = '-1002023620623'
const TELEGRAM_CHAT_ID = '-535143097'
const TELEGRAM_TOKEN = '1953457589:AAHflTWrEBxI31Gf3PSrJaW7X29DC3AFQMg'
// const TELEGRAM_TOKEN = '7096977936:AAGlkv6pnrQKy64Bohuqjsq6v6dk8BLCA40'

const fields = {
  mark: 'Марка',
  model: 'Модель',
  year: 'Год',
  price: 'Цена',
  name: 'Имя',
  phone: 'Телефон',
}

export const sendTelegramMessage = async (data) => {
  const message = Object.keys(data).map(field => {
    if (field === 'date') return ''
    if (field === 'phone') return encodeURIComponent(`<b>${fields[field]}:</b> <a href='${data[field]}'>${data[field]}</a>`) + '%0A'
    return encodeURIComponent(`<b>${fields[field]}:</b> ${data[field]}`) + '%0A'
  }).join('')

  console.log(message)

  console.log(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${message}`)

  return `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&parse_mode=html&text=${message}`
}

const api = {
  sendForm: data => {
    return request('/send-from', {
      method: 'POST',
      data
    })
  },
  sendShortForm: data => {
    return request('/send-short-from', {
      method: 'POST',
      data
    })
  },
  getAllCars: () => {
    return request('/get-all-cars')
  },
  removeCar: (id) => {
    return request(`/remove-car/${id}`, {
      method: 'POST'
    })
  },
  handleAccept: (id) => {
    return request(`/accept-car/${id}`, {
      method: 'POST'
    })
  },
  webSocketConnect: (id) => {
    return request(`/connect-websocket/${id}`);
  },
  PushSubscribe: (data) => {
    return request('/subscribe', {
      method: 'POST',
      data: data
    })
  }
}

export default api;
