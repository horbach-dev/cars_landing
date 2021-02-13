const FORM_ERROR_CODE = 10001;

const fieldsErrors = {
  mark: 'Введите марку',
  model: 'Введите модель',
  year: 'Введите год',
  price: 'Введите желаемую цену',
  name: 'Введите Ваше имя',
  phone: 'Введите номер телефона',
}

const emptyValidation = (req, res, next) => {
  const { name = '', phone = '' } = req.body

  const errors = {}

  Object.keys(req.body).forEach(key => {
    const field = req.body[key]
    if (!field || field === '') {
      errors[key] = fieldsErrors[key]
    }
  })

  if (Object.keys(errors).length) {
    return res.status(400).json({code: FORM_ERROR_CODE, errors})
  }

  if (name && name.length < 2) {
    return res.status(400).json({
      code: FORM_ERROR_CODE, errors: {
        name: 'Минимум 2 символа'
      }
    })
  }

  const phoneNumbers = parseInt(phone.replace(/[^\d]/g, '')) || 0
  if (phoneNumbers && phoneNumbers !== 0) {
    if (String(phoneNumbers).length < 12) {
      return res.status(400).json({
        code: FORM_ERROR_CODE, errors: {
          phone: 'Введен не полностью'
        }
      })
    }
  }

  next()
}

module.exports = {
  emptyValidation,
}
