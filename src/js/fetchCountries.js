import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3/name';

export function fetchCountries(searchQuery, renderCountries) {
  fetch(`${BASE_URL}/${searchQuery}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      renderCountries(data);
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}
