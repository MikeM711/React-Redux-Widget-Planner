const express = require('express');
// const models
// const routes
// const passport
// const session

const app = express();

// const bodyParser

app.get('/introduction', (req,res) => {
  res.send('Hello World')
})

// routes

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
  if(!err){
    console.log('Site is live')

  } else {
    console.log('err')
  }
})
