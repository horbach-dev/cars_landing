const axios = require("axios");
const { getBitrixFields } = require('./config');

const createBitrixLead = async data => {
  try {
    const encoded = encodeURI(`https://b24-m8cxsx.bitrix24.by/rest/1/0qucbw7z35w2sf9m/crm.lead.add.json?${getBitrixFields(data)}`);
    await axios.get(encoded)
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  createBitrixLead
}
