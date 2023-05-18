const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nameCity.value === '' || nameCountry.value === '') {
        showError('Please enter a valid city and country');   
        return; 
    }

    callAPI(nameCity.value, nameCountry.value);
});

function callAPI(city, country) {
    const appId = '788bf11646c1b1aa33dc467804084227';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                showError('Please enter a valid city and country');
                return;
            } else {
                clearHtml();
                showResult(data);    
            }
        })
        .catch(error => {
            alert(error);
        });
}

function showError(message) {
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 2000);
}

function showResult(data) {
    const { name, main: { temp, temp_max, temp_min }, weather:[arr]} = data;

    const centigrade = kelvinToCentigrade(temp);
    const max = kelvinToCentigrade(temp_max);
    const min = kelvinToCentigrade(temp_min);

    const content = document.createElement('div');
    content.innerHTML = `
        <h5>Clima en ${name}</h5>
        <img src= https://openweathermap.org/img/wn/${arr.icon}@2x.png alt="icono del clima" />
        <h2>${centigrade} &#8451;</h2>
        <p>Max: ${max} &#8451;</p>
        <p>Min: ${min} &#8451;</p> 
    `;

    result.appendChild(content);

}

function kelvinToCentigrade(temp) {
    return parseInt(temp - 273.15);
}

function clearHtml() {
    result.innerHTML = '';
}