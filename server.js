const express = require('express')
const cors = require('cors')
require('dotenv').config()
const peopleRoute = require('./routes/peopleRoute')

const app = express()
const port = process.env.PORT || 7000
const dbConnect = require('./config/db')

app.use(express.json())
app.use(cors())
app.use('/people', peopleRoute);

app.get('/', (req, res) => res.send('Hello World!'))



app.listen(port, () => console.log(`server listening on port ${port}!`))


// http://localhost:7002/people/getAllPeople