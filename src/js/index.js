import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const contentContainer = document.getElementById('content');
const input = document.querySelector('#input');

input.addEventListener(
  'input',
  debounce(evt => {
    fetchCountries(evt.target.value.trim(), renderCountries);
  }, 800),
);

function renderCountries(data) {
  const countries = logMessages(data);

  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }

  if (!countries) {
    return;
  }

  if (countries.length === 1) {
    const oneCountryDiv = document.createElement('div');

    const country = countries[0];

    const murkup = `<div class="one-country">
                      <h2 class="title">${country.name.common}</h2>
                      <div class="flex">
                        <ul class="country-info">
                          <li> Common Name: ${country.name.common}</li>
                          <li> Ofical Name: ${country.name.official}</li>
                        </ul>
                      </div>  
                      <img src="${country.flags[0]}" alt="флаг ${country.name.common}" width=500>
                    </div>`;

    oneCountryDiv.insertAdjacentHTML('afterbegin', murkup);
    contentContainer.appendChild(oneCountryDiv);
  }

  if (1 < countries.length) {
    const listOfCountriesDiv = document.createElement('ul');

    listOfCountriesDiv.classList.add('country-list');

    let result = countries.map(country => {
      return `<li>${country.flag} ${country.name.common}</li>`;
    });

    listOfCountriesDiv.insertAdjacentHTML('afterbegin', result.join(''));
    contentContainer.appendChild(listOfCountriesDiv);
  }
}

function logMessages(data) {
  if (data.status === 404) {
    Notiflix.Notify.failure('Ничего не найдено');
    return undefined;
  }

  if (data.length > 10) {
    Notiflix.Notify.warning('Слишком много совпадений');
    return undefined;
  }

  if (data.length > 1 && data.length <= 10) {
    Notiflix.Notify.success(`Успешно найдено ${data.length} стран. Уточните запрос.`);
    return data;
  }

  if (data.length === 1) {
    Notiflix.Notify.success('Успешно найдена одна страна');
    return data;
  }
}
