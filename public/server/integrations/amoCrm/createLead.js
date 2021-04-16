const axios = require("axios");

const createLead = (type, props) => {
  const body = {
    add: [
      {
        name: 'Заявка с ЛВ.БЕЛ (первая)',
        created_at: new Date,
        updated_at: new Date,
        price: props.price
      },
    ]
  }

  // const data = axios.post('/api/v2/leads', {
  //   data: body
  // })

  if (type === 200) {
    return next();
  } else {
    return res.status(401).json({ message: "Не авторизован", code: 2300 });
  }
}

module.exports = createLead;
