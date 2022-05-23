const http = require('http')
const express = require('express')
const es6Renderer = require('express-es6-template-engine')
const ceos = require('./data')


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

app.get('/', (req, res) => {
    res.render('home', {
        partials,
        locals: {
            title: `Apple CEO's Home`
        }
    })
});

app.get('/ceos', (req, res) => {
    res.render('ceo-list', {
        partials,
        locals: {
            ceos,
            title: "CEO's"
        }
    })
});

app.get('/ceos/:slug', (req, res) => {
    currentCEO = ceos.find(p => p.slug === req.params.slug)
    if (!currentCEO) {
        res.status(404).send(`Could not find CEO with slug: ${req.params.slug}`)
        return
    }
    res.render('ceo-details', {
        partials,
        locals: {
            currentCEO,
            title: `${currentCEO.name}'s Details`
        }
    });
});

app.post('/ceos/:name', (req, res) => {
    currentCEO = ceos.find(p => p.name.toLowerCase() === req.params.name.replace("+", " ").toLowerCase())
    if (!currentCEO) {
        res.status(404).send(`Could not find CEO with name: ${req.params.name}`)
        return
    }
    res.render('ceo-details', {
        partials,
        locals: {
            currentCEO,
            title: `${currentCEO.name}'s Details`
        }
    });
});

//catch any missing pages
app.get('*', (req, res) => {
    res.send('Page not found')
})




//server listener
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})