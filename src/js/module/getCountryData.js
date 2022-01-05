import axios from 'axios';
import { arrCountries } from './../../data/countries';
function getCountryData() {
  const dropdownCountry = document.querySelector(
    '.search-panel__dropdown-menu--country'
  );
  arrCountries.forEach((el) => {
    let li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item search-panel__item" href="#">${el.name}<img src='${el.flag}' class='search-panel__flag'></a>`;
    dropdownCountry.append(li);
  });
}

export default getCountryData;
