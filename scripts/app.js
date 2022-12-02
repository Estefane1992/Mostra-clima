const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    console.log(data)
    // estrutura de propriedade
    const {cityDets, weather} = data;


    // atualizar detales do modelo
    details.innerHTML = 
        `<h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    // atualizar noite/dia e icon/imagem
    const iconScr = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconScr);

    let timeScr = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeScr);

    // remover o d-none se presente
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}
const atualizarCidade = async (city) => {
   
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {cityDets, weather };
}
cityForm.addEventListener('submit', e => {
    // impedir ação padrão
    e.preventDefault();

    // obter valor da cidade
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // atualizar a inerface do usuário com a nova cidade
    atualizarCidade(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // definir armazenamento local
    localStorage.setItem('city', city);
})
if(localStorage.getItem('city')){
    atualizarCidade(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
