const express = require('express')
const router = express.Router()
const axios =require('axios')
//to recive obj/data from post
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//////////////////////
const City = require('../models/city');
const { remove } = require('../models/city');

router.get('/cities', function (req, res) {
    City.find({}, function (err, cities) {
        res.send(cities)
    })
})



const weatherPicture = {
    "clear sky":"https://cdn3.vectorstock.com/i/1000x1000/52/77/sunny-weather-icon-weather-concept-vector-26575277.jpg", 
    "few clouds": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Gnome-weather-few-clouds.svg/1200px-Gnome-weather-few-clouds.svg.png",
    "light rain": 'https://p.kindpng.com/picc/s/432-4325960_light-rain-png-weather-clipart-transparent-png.png',
  
}









function getWeather(lon,lat,cityName,res){
//axsos get data from  api
axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=bd6dfc2e79ebd0350b35fe55aebcf7d3`)
.then(function (response) {
    console.log(response.data);
    // handle success 
    res.send({cityName:cityName,desc: response.data.weather[0].description,temp: (response.data.main.temp -271),pic: weatherPicture[response.data.weather[0].description]}  )
 
  
  })
  
}

function getLongAndLat(cityName,response) {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=bd6dfc2e79ebd0350b35fe55aebcf7d3`
      )
      .then((result) => {
          if(result.data[0])
          getWeather(result.data[0].lon,result.data[0].lat,cityName,response)
          else response.end()
      });
  }
  

  router.get('/city/:cityName',function(req,res){  
    
    getLongAndLat(req.params.cityName,res)
    
    
})


router.post('/city',function(req,res){  
    console.log(req.body);
    const city =new City({temp:req.body.temperature,cityName: req.body.name,
        desc:req.body.condition,
        pic:weatherPicture[req.body.condition] ,
        isSaved: true
    })
        city.save()
        res.end()
})


router.delete('/city/:cityName',function(req,res){  
   City.deleteOne({name: req.params.cityName}).then(function(){
    res.end()
   })
})
module.exports = router