
class citiesWeather{
    constructor (){
        this.cityData = [];
    }
    async getDataFromDB()
    {
     this.cityData= await $.get('/cities')
    }
    async getCityData(cityName)
    {
     this.cityData.push(await $.get(`/city/${cityName}`))
    }
    async saveCity(city)
    {
        await $.post('/city',city,function(){

        })
    }
    async removeCity(city)
    {
        let Cities=this
      await  $.ajax({
            method:'delete',
            url:`/city/${city.name}`,
            success: function (){
                Cities.cityData=allCities.cityData.filter((c)=>c.name!=city.name)
            }
        })
    }
    
}