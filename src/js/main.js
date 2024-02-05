import '../styles/style.scss';

const inputCity = document.querySelector('input#city');
const searchBtn = document.querySelector('input.search');

searchBtn.addEventListener('click', e =>
{
    e.preventDefault();

    return import(/* webpackPrefetch */ './functions').then(module => {
    
    const getWeather = module.default;

    const city = inputCity.value;

    getWeather(city);
})})


