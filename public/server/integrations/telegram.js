const axios = require("axios");
const { getTelegramApiUri } = require('./config')

const createTelegramLead = async data => {
  try {
    const uri = await getTelegramApiUri(data)
    await axios.post(uri)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  createTelegramLead
}
