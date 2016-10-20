/**
 * @author: Pietro Di Tommaso
 * @file: server.js
 * @description: This file handles express server boot
 */

const express = require('express')
const app = express()

app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.listen(3000, function() {
    console.log('Webserver running on port 3000...')
})