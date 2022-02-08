import axios from 'axios';
import calcStaticticHome from './calcStatisticHome';
function getLast100MathesHome(match, dataForPrediction) {
  //   получаем последние 100 матчей домашней команды
  const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${match.teams.home.id}/last/100`,
    params: { timezone: 'Europe/London' },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const { fixtures: lastMatchesHome } = response.data.api;
      getLast100MathesAway(match, lastMatchesHome, dataForPrediction);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function getLast100MathesAway(match, lastMatchesHome, dataForPrediction) {
  //   получаем последние 100 матчей гостевой команды
  const options = {
    method: 'GET',
    url: `https://api-football-v1.p.rapidapi.com/v2/fixtures/team/${match.teams.away.id}/last/100`,
    params: { timezone: 'Europe/London' },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      const { fixtures: lastMatchesAway } = response.data.api;

      calcStaticticHome(
        lastMatchesHome,
        lastMatchesAway,
        match,
        dataForPrediction
      );
    })
    .catch(function (error) {
      console.error(error);
    });
}

export default getLast100MathesHome;
