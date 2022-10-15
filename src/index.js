import debounce from 'lodash.debounce';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
import markupList from './templates/markupList.hbs';
import markupInfo from './templates/markupInfo.hbs';
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
let name = '';

input.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
  name = input.value.trim();
  e.preventDefault();
  if (!name) {
    clearPage();
    return;
  } else {
    fetchCountries(name)
      .then(data => {
        if (data.length === 1) {
          clearPage();
          info.innerHTML = markupInfo(data);
        } else if (data.length >= 10) {
          clearPage();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          clearPage();
          list.innerHTML = markupList(data);
        }
      })
      .catch(() => {
        clearPage();
      });
  }
}

export function clearPage() {
  list.innerHTML = '';
  info.innerHTML = '';
}
