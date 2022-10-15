// postman://auth/callback?code=b9467211a5ea549f650897ba303aa617771ffff585789b48e833f1c254a4928d

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(Notify.failure('Oops, there is no country with that name'));
  });
}
