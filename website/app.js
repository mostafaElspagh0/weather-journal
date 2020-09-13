// constants and personal API Key for OpenWeatherMap API
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&';
const API_KEY = '21749fd5991160a6ab6bd3332653703e';
const KEY_PARAM = `&key=&APPID=${API_KEY}`;


let counterId = 1;

function getCurrentDate() {
  const d = new Date();
  return `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
}

const getWeatherData = async function (zipcode) {
  try {
    const url = `${WEATHER_API_BASE_URL}zip=${zipcode}${KEY_PARAM}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (err) {
    console.log(`${err}`);
  }
};

const postData = async function (url = '/add', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log(`${error}`);
  }
};

const getEntry = async function (id) {
  try {
    const res = await fetch(`/entry/${id}`);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(`${error}`);
  }
};



function handleGenerate() {
  const zipcode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  if (zipcode) {
    getWeatherData(zipcode)
      .then((value) => {
        const req = {
          date: getCurrentDate(),
          temp: value.main.temp,
          content: feelings,
          id: counterId,
        };
        counterId += 1;
        return postData('/add', req);
      })
      .then((json) => getEntry(json.id))
      .then((json) => {
        document.getElementById('date').innerHTML = json.date;
        document.getElementById('temp').innerHTML = `${json.temp} &#8457;`;
        document.getElementById('content').innerHTML = json.content;
      });
  }
}

document.getElementById('generate').addEventListener('click', handleGenerate);
