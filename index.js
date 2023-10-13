// start your server here

//if i want to use .env file and get rid of || 3000
require('dotenv').config()

const server = require("./api/server.js")

const port = process.env.PORT || 3000

server.listen(port, () => console.log(`\nAPI running on port ${port}\n}`))