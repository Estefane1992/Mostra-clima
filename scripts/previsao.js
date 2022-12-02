const key = 'HJTVVvEOXhZvBrDpNSqYXTd2NBBMvZqy';

// pega informação de tempo
const getWeather = async (id) => {
    const base = ('http://dataservice.accuweather.com/currentconditions/v1/');
    const consulta = `${id}?apikey=${key}`;

    const response = await fetch(base + consulta);
    const data = await response.json();

    return data [0];
}

// pega informação da cidade
const getCity = async (city) => {
    
    const base = ('http://dataservice.accuweather.com/locations/v1/cities/search');
    const consulta= `?apikey=${key}&q=${city}`;

    const resposta = await fetch(base + consulta);
    const data = await resposta.json();
    return data[0];
    
};



