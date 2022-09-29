const connectToMongo = require('./db');
const express = require('express')
const authRoute = require('./routes/auth')
var cors = require('cors') 
const path = require("path");

connectToMongo();
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', authRoute)
if ( process.env.NODE_ENV == "production"){

  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}


app.listen(port, () => {
  console.log(`eternalight backend listening on http://localhost:${PORT}`)
})
