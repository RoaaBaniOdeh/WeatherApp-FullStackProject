const render = new Render();
const city = new citiesWeather();
let cityName = $('#city-name')

async function loadPage() {
  await city.getDataFromDB()
  render.renderTheCities(city.cityData);
}

async function  handleSearch()   {
  await city.getCityData(cityName.val());
  cityName.val('')
  render.renderTheCities(city.cityData)
}


async function saveCity()
{
  const name=$(this).closest('.city-info').find('.name').html()
  const condition=$(this).closest('.city-info').find('.condition').html()
  const temperature=$(this).closest('.city-info').find('.temprature').html()
  await city.saveCity({name:name,temperature:temperature,condition:condition})
  render.renderTheCities(city.cityData)
}

async function removeCity()
{
  const name=$(this).closest('.city-info').find('.name').html()
  console.log(name)
  const condition=$(this).closest('.city-info').find('.condition').html()
  console.log(condition)
  const temperature=$(this).closest('.city-info').find('.temprature').html()
  console.log(temperature)
  await city.removeCity({name:name,temperature:temperature,condition:condition})
  render.renderTheCities(city.cityData)
}


$(document).ready(loadPage);
$('body').on('click','.addCity',saveCity)
$('body').on('click','.removeCity',removeCity)
