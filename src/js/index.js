import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const contentContainer = document.getElementById('content');
const input = document.querySelector('#input');

input.addEventListener(
  'input',
  debounce(evt => {
    fetchCountries(evt.target.value, renderCountries);
  }, 800),
);

function renderCountries(countries) {
  while (contentContainer.firstChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }

  if (countries.length === 1) {
    const oneCountryDiv = document.createElement('div');

    const country = countries[0];

    const murkup = `<div class="one-country">
                      <h2 class="title">${country.name.official}</h2>
                      <div class="flex">
                        <ul class="country-info">
                        <li> Capital: ${country.capital}</li>
                        <li> Subregion: ${country.subregion}</li>
                        </ul>
                      </div>  
                      <img src="${country.flags[0]}" alt="флаг ${country.name.common}" width=500>
                    </div>`;

    oneCountryDiv.insertAdjacentHTML('afterbegin', murkup);
    contentContainer.appendChild(oneCountryDiv);
  }

  if (countries.length > 1) {
    const listOfCountriesDiv = document.createElement('ul');

    listOfCountriesDiv.classList.add('country-list');

    let result = countries.map(country => {
      return `<li>${country.flag} ${country.name.common} ${country.capital} ${country.languages}</li>`;
    });

    listOfCountriesDiv.insertAdjacentHTML('afterbegin', result.join(''));
    contentContainer.appendChild(listOfCountriesDiv);
  }
}
