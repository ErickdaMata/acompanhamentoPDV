const functions = require('firebase-functions');

const app = require('express')()
const consign = require('consign')
 
const db = require('./config/db')
app.db = db 

consign()
    .include('./config/passport.js')
    .then('./dev.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/rotas.js')
    .into(app) 

 exports.api = functions.https.onRequest(app);