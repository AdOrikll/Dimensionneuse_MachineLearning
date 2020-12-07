const express = require('express');
const app = express()
const port = 3000
const ip = require('ip');
const teachablemachine = require('./TM_Dimn');

app.listen(port, () => {
    console.log(`Serveur lancé:\thttp://localhost:${port}`)
    console.log(`Accès à distance:\thttp://${ip.address()}:${port}`)
})
app.use(express.urlencoded({ extended: true }))

// Site
app.use(express.static('website'))

// POST endpoint
app.post('/image', function (req, res) {
    console.log(req);
    return teachablemachine.classify(req.url);
})