import { leagues } from './../../data/leagues';
import getMathes from './getMatches';
function getLeagueData(country) {
  const leaguesList = document.querySelector(
      '.search-panel__dropdown-menu--league'
    ),
    leagueButton = document.querySelector(
      '.search-panel__button-toggle--league'
    ),
    buttonView = document.querySelector('.search-panel__button');
  const liItems = leaguesList.querySelectorAll('li');
  liItems.forEach((el) => {
    el.remove();
  });
  for (let key in leagues[`${country}`].league) {
    let li = document.createElement('li');
    li.classList.add('search-panel__li');
    li.innerHTML = `<a class="dropdown-item search-panel__item" href="#">
  <p>${leagues[`${country}`].league[key].name}</p><img src='${
      leagues[`${country}`].league[key].logo
    }' class='search-panel__flag'></a>`;
    leaguesList.append(li);

    const arrList = document.querySelectorAll('.search-panel__li');

    arrList.forEach((el) => {
      el.addEventListener('click', (e) => {
        let leagueName = el.children[0].children[0].innerHTML;
        leagueButton.innerHTML = leagueName;
      });
    });
  }
  buttonView.addEventListener('click', () => {
    getMathes(leagues[`${country}`].league[`${leagueButton.innerHTML}`].id);
  });
}

export default getLeagueData;
