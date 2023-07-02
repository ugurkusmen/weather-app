const request = require('request')


const geocode = (address,callback)=>{
    const url ='https://geocode.maps.co/search?q={'+encodeURIComponent(address)+'}'
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable map services!',undefined)
        }
        else if(response.body.length===0){
            callback('The coordinates couldnt find out. Try another coordinate',undefined)
        }else{
            callback(undefined,{latitude:response.body[0].lat,longtitude:response.body[0].lon,location:response.body[0].display_name})
        }
    })
}


module.exports = geocode