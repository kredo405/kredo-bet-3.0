import axios from 'axios';
import { arrCountries } from './../../data/countries';
function getCountryData() {
  const dropdownCountrylist = document.querySelector(
      '.search-panel__dropdown-menu--country'
    ),
    buttonCountry = document.querySelector('.search-panel__button-toggle');

  arrCountries.forEach((el) => {
    let li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item search-panel__item" href="#">
    ${el.name}<img src='${el.flag}' class='search-panel__flag'></a>`;
    dropdownCountrylist.append(li);
  });

  function changeVaalueTogle(country) {
    let countryItem = document.querySelectorAll('.search-panel__item');
    countryItem.forEach((el) => {
      el.addEventListener('click', (e) => {
        country.innerHTML = e.target.innerHTML;
      });
    });
  }

  changeVaalueTogle(buttonCountry);
}

export default getCountryData;
