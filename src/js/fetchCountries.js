import Notiflix from 'notiflix';

export default function fetchCountries(countryName, section) {
  section.innerHTML = '';

  let languages = '';

  fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw Notiflix.Notify.failure('Ничего не найдено');
      }
    })
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.warning('Слишком много совпадений');
      }

      if (data.length >= 2 && data.length <= 10) {
        manyCountriesMarkup(data);
      }

      if (data.length === 1) {
        oneCountryMarkup(data);
      }
    })
    .catch(error => {
      error;
    });

  function manyCountriesMarkup(data) {
    Notiflix.Notify.info('Уточните запрос');

    const list = document.createElement('ul');
    list.classList.add('list');

    let result = data.map(item => {
      return `<li>${item.name}</li>`;
    });

    list.insertAdjacentHTML('afterbegin', result.join(''));
    section.appendChild(list);
  }

  function oneCountryMarkup(data) {
    Notiflix.Notify.success('Успешно найдено');

    const country = document.createElement('div');
    country.classList.add('country');

    let result = data.map(item => {
      return `<div><h2 class="title">${item.name}</h2>
                        <ul>
                            <li> Capital: ${item.capital}</li>
                            <li> Population: ${item.population}</li>
                            <li> Languages:
                            <ul>
                                ${data.map(item => {
                                  item.languages.map(lang => {
                                    languages += `<li>${lang.name}</li>`;
                                    return languages;
                                  });

                                  return languages;
                                })}
                            </ul>
                            </li>
                        </ul></div>
                        <img src="${item.flag}" alt="флаг ${item.name}" width=500>`;
    });

    country.insertAdjacentHTML('afterbegin', result.join(''));
    section.appendChild(country);
  }
}
