const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//path for express
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//path for handlebar
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('/',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Name in app.js'
    })
})


app.get('/about',(req,res) => {
    res.render('about',{
        title: 'Title in app.js',
        name: 'Name in app.js'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helpTxt : 'Help tecst diynamyxc :) ...',
        title: 'titleeeeeeee',
        name: 'nnnammmnnmmeee'
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found in help.'
    })
})



// app.get('/',(req,res) => {
//     res.send('<h1>Hello Express...!</h1>')
// })

// app.get('/help',(req,res) => {
//     res.send('help.html')
// })

// app.get('/about',(req,res) => {
//     res.send('about.html')
// })

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({error:'Enter valid address'})
    } 
    console.log(req.query)
    geocode(req.query.address,(error,  {lattitude , longitude, location} = {}) =>{
        if(error){
            res.send({error})
        } 
        forecast(lattitude,longitude, (error, forecastData)=>{
            if(error){
                res.send({error})
            } 
            res.send({
                address: req.query.address, 
                forecast: 'Forecast for '+req.query.address+' : '+forecastData,
                location
            })

        })
    })


})

// app.get('/weather?address=*',(req,res)=> {
//     res.render('404', {
//         title: '404',
//         name: 'Andrew Mead',
//         errorMessage: 'Page not found in help.'
//     })
// })

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide search term...'
        })
    }
    
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is on...')
})




