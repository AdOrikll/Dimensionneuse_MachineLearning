const express = require('express');
const app = express()
const port = 3000
const ip = require('ip');
const TeachableMachine = require("@sashido/teachablemachine-node");
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage(
        {
            destination: './uploads/',
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        }
    )
});

app.listen(port, () => {
    console.log(`Serveur lancé:\t\thttp://localhost:${port}`)
    console.log(`Accès à distance:\thttp://${ip.address()}:${port}`)
})
app.use(express.urlencoded({extended: true}))

// Site
app.use(express.static('website'))

const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/u3cWdHHG1/"
});

// POST endpoint
app.post('/image', upload.single('image'), function (req, res, next) {
    console.log(`Received ${req.file.originalname}`);

    const url = __dirname + '/' + req.file.path
    const results = model.classify({imageUrl: url})
        .then(r => {
            res.send(r)
        })
        .catch(err => {
            console.log(err)
        })
})