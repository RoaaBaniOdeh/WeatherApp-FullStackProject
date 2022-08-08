
class citiesWeather{
    constructor (){
        this.cityData = [];
    }
    async getDataFromDB()
    {
      let cities=this.cityData
      await $.get('/cities',function (citiess){
        citiess.forEach(city => {
             cities.push(city)

        });
    
     })
     
    }

    async getCityData(cityName)
    {
     this.cityData.push(await $.get(`/city/${cityName}`))
    }
    async saveCity(city)
    {
        city.isSaved=true
        
        console.log(city);
        for(let i=0 ; i<this.cityData.length;i++)
        {
            if(this.cityData[i].cityName==city.name)
            this.cityData[i].isSaved=true
        }
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
                Cities.cityData=Cities.cityData.filter((c)=>c.cityName!=city.name)
            }
        })
    }
    
}