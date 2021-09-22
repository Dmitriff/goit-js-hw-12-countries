import fetchCountries from './fetchCountries';
import debounce from 'lodash/debounce';

const input = document.querySelector('#input');
const section = document.querySelector('.section');

input.addEventListener(
  'input',
  debounce(evt => {
    searchCountry(evt, section);
  }, 800),
);

function searchCountry(evt, section) {
  const countryName = evt.target.value;
  console.log(countryName);

  const insertSection = section;

  fetchCountries(countryName, insertSection);
}
