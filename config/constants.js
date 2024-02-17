const developmentURL = "https://localhost/users"
const productionURL = "https://burgerim.ru/users"

const env = process.env.NODE_ENV
const baseURL = env == "development" ? developmentURL : productionURL

module.exports = { baseURL }
