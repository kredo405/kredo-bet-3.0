import axios from 'axios';
import calcPrediction from './calcPrediction';

function getOdds(outcomes, match) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
    params: { fixture: `${match.fixture.id}` },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);

      const { bookmakers } = response.data.response[0];

      const odds = {
        'Match Winner': {
          Home: [],
          Away: [],
        },
        'Goals Over/Under': {
          'Over 1.5': [],
          'Over 2.5': [],
          'Over 3.5': [],
          'Under 1.5': [],
          'Under 2.5': [],
          'Under 3.5': [],
        },
        'Both Teams Score': {
          Yes: [],
          No: [],
        },
        'Total - Home': {
          'Over 0.5': [],
          'Over 1.5': [],
        },
        'Total - Away': {
          'Over 0.5': [],
          'Over 1.5': [],
        },
      };

      sortingOdds(bookmakers);

      function sortingOdds(bookmakers) {
        for (let key in odds) {
          bookmakers.forEach((el) => {
            el.bets.forEach((item) => {
              if (item.name === key) {
                for (let j in odds[key]) {
                  item.values.forEach((val) => {
                    if (val.value === j) {
                      const obj = {
                        bookmaker: el.name,
                        odd: +val.odd,
                      };
                      odds[key][j].push(obj);
                    }
                  });
                }
              }
            });
          });
        }
      }
      calcPrediction(outcomes, match, odds);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export default getOdds;
