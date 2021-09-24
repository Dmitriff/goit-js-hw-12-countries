import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3/name';

export function fetchCountries(searchQuery, renderCountries) {
  fetch(`${BASE_URL}/${searchQuery}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        Notiflix.Notify.failure(`Стату ответа ${response.status}`);
      }
    })
    .then(data => {
      if (data.status === 404) {
        Notiflix.Notify.failure('Ничего не найдено');
        return;
      }

      if (data.length > 10) {
        Notiflix.Notify.warning('Слишком много совпадений');
        return;
      }

      if (data.length > 1 && data.length <= 10) {
        Notiflix.Notify.success(`Успешно найдено ${data.length} стран. Уточните запрос.`);
      }

      if (data.length === 1) {
        Notiflix.Notify.success('Успешно найдена одна страна');
      }

      renderCountries(data);
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
    });
}
