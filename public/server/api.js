const axios = require("axios");
const { AMO_URL } = require("./constants");


const api = axios.create({
  baseURL: AMO_URL
})

module.exports = api
