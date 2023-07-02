const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirect = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirect))
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        name:'Weather App Hizmetinizde',
        news:'ben varim ',
        foot:'pls rate us!'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'About kismindasiniz',
        news:'ve buradan çikmalisiniz ' ,
        foot:'created by uğur küsmen!'
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        name:'ohh if you came here there will be a problem ',
        news:'Try to enter correct url or go the main page ',
        foot:'you can mail us!'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        name:'ops :(',
        news:'we couldnt find the page you re looking for ',
        foot:'you can mail us!'
    })
})     

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('Please provide a address')
    }
    const address = req.query.address
    geocode(address,(error,{latitude,longtitude,location} = { })=>{
        if(error){
            return res.send({error})
        }else{

         
        forecast( latitude,longtitude, (error, forecastData) => {
           if (error) {
                return res.send({error})
           } else {

                console.log(location)
                console.log(forecastData)
                res.send({
                    temp: forecastData,
                    location:address,
                    address:location

                })
           }
          })

        }


})
    
})



app.get('/*',(req,res)=>{
    res.render('404',{
        name:'Uups 404 not found page :( ',
        news:'You cant find anythink here. You can go back to main page :(',
        foot:'you can mail us!'
    })
})



app.listen(port,()=>{
    console.log('server is running on '+ port)
}).addListener