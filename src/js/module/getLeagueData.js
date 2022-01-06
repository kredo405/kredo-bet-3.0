import axios from 'axios';
import { leagues } from './../../data/leagues';
function getLeagueData(country) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
    params: { country: `${country}` },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export default getLeagueData;
