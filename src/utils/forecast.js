const request = require('request')

const forecast = (latitude,longtitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=adc3d3d98e2d0d9b2eee95ce7e71208e&query='+ latitude +','+ longtitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable weather services!',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            const temp = body.current.temperature
            const feelslike = body.current.feelslike
            callback(undefined,'temperature is : '+ temp+ '  and it feels like : '+feelslike)
        }

    })

}


module.exports = forecast