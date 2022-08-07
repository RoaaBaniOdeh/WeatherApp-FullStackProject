const render = new Render();
const city = new citiesWeather();
let cityName = $('#city-name')

async function loadPage() {
  await city.getDataFromDB()
  render.renderTheCities(city.cityData);
}
async function  handleSearch()   {
  await city.getCityData(cityName.val());
  render.renderTheCities(city.cityData)
}
async function saveCity()
{
  const name=$(this).closest('.city-info').find('.name').html()
  const condition=$(this).closest('.city-info').find('.condition').html()
  const temperature=$(this).closest('.city-info').find('.temprature').html()
  await cities.saveCity({name:name,temperature:temperature,condition:condition})
  render.renderTheCities(cities.cityData)
}
async function removeCity()
{
  const name=$(this).closest('.city-info').find('.name').html()
  const condition=$(this).closest('.city-info').find('.condition').html()
  const temperature=$(this).closest('.city-info').find('.temprature').html()
  await cities.deleteCity({name:name,temperature:temperature,condition:condition})
  render.renderTheCities(cities.cityData)
}
$(document).on('ready',loadPage);
$('body').on('click','.addCity',saveCity)
$('body').on('click','.removeCity',removeCity)
