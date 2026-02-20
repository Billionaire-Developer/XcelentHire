const express = require('express')
const app = express()

app.use('/', (req, res) =>{
    res.send("Hello!")
})

port = 5500
app.listen(port, () =>{
    console.log(`server running a port ${port}`)
})