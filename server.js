const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const data = require('./data')
const { friends } = require('./data')


const hostname = 'localhost'
const port = 3001

const app = express()
const server = http.createServer(app)


//template engine config
app.engine('html', es6Renderer)//registers es6 as html engine
app.set('views', 'templates')//set 'views' setting to look in 'template' folder
app.set('view engine', 'html')//set default 'view-engine' to the one registered for html
const partials = {
    head: 'partials/head',
    foot: 'partials/foot'
}

//public folder/ static files
app.use(express.static('./public'))