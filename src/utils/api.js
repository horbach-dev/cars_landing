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
