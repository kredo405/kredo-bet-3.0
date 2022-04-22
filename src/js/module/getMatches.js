import axios from 'axios';
import publishMatches from './publishMatches';
function getMathes(leagueId) {
  let date = document.querySelector('.search-panel__date').value;
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { date: `${date}` },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const arrMatches = [];
      response.data.response.forEach((el) => {
        if (el.league.id === leagueId) {
          arrMatches.push(el);
        }
      });

      publishMatches(arrMatches);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export default getMathes;
