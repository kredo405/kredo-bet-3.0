// import axios from 'axios';
import { arrCountries } from './../../data/countries';
import getLeagueData from './getLeagueData';
function getCountryData() {
  const dropdownCountrylist = document.querySelector(
      '.search-panel__dropdown-menu--country'
    ),
    buttonCountry = document.querySelector('.search-panel__button-toggle');

  arrCountries.forEach((el) => {
    let li = document.createElement('li');
    li.innerHTML = `<a class="dropdown-item search-panel__item" href="#">
    <p>${el.name}</p><img src='${el.flag}' class='search-panel__flag'></a>`;
    dropdownCountrylist.append(li);
  });

  function changeValueTogle(country) {
    let countryItem = document.querySelectorAll('.search-panel__item');
    countryItem.forEach((el) => {
      el.addEventListener('click', () => {
        country.innerHTML = el.children[0].innerHTML;
        getLeagueData(el.children[0].innerHTML);
      });
    });
  }

  changeValueTogle(buttonCountry);
}

export default getCountryData;
