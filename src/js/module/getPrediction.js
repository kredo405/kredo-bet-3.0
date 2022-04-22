import axios from 'axios';
import getOdds from './getOdds';

function getPrediction(outcomes, match, dataForPrediction) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
    params: { fixture: `${match.fixture.id}` },
    headers: {
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      'x-rapidapi-key': 'f570367049msh92d23c8fda1a817p1b03cfjsne8957d93c6e0',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      const { teams } = response.data.response[0];
      const { response: prediction } = response.data;
      calcPoison(teams, outcomes, match, dataForPrediction, prediction);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function calcPoison(teams, outcomes, match, dataForPrediction, prediction) {
  // Высчитываем примерные индивидуальные тоталы команд
  let expectedGoalsHome =
    ((+teams.home.last_5.goals.for.average +
      +teams.away.last_5.goals.against.average) /
      2 +
      (outcomes.avgGoals.homeFor + outcomes.avgGoals.awayAgainst) / 2) /
    2;

  let expectedGoalsAway =
    ((+teams.away.last_5.goals.for.average +
      +teams.home.last_5.goals.against.average) /
      2 +
      (outcomes.avgGoals.awayFor + outcomes.avgGoals.homeAgainst) / 2) /
    2;

  // рассчиываем распределение паусона все матчи
  function poissonGoals(expectedGoals, goals, number) {
    return (
      ((expectedGoals ** goals * 2.71828 ** -expectedGoals) / number) * 100
    );
  }
  let poisonGoals0Home = poissonGoals(expectedGoalsHome, 0, 1);
  let poisonGoals0Away = poissonGoals(expectedGoalsAway, 0, 1);
  let poisonGoals1Home = poissonGoals(expectedGoalsHome, 1, 1);
  let poisonGoals1Away = poissonGoals(expectedGoalsAway, 1, 1);
  let poisonGoals2Home = poissonGoals(expectedGoalsHome, 2, 2);
  let poisonGoals2Away = poissonGoals(expectedGoalsAway, 2, 2);
  let poisonGoals3Home = poissonGoals(expectedGoalsHome, 3, 6);
  let poisonGoals3Away = poissonGoals(expectedGoalsAway, 3, 6);
  let poisonGoals4Home = poissonGoals(expectedGoalsHome, 4, 24);
  let poisonGoals4Away = poissonGoals(expectedGoalsAway, 4, 24);
  let poisonGoals5Home = poissonGoals(expectedGoalsHome, 5, 120);
  let poisonGoals5Away = poissonGoals(expectedGoalsAway, 5, 120);

  // рассчитываем вероятности прохода ставки по распределению паусона
  function calcProbabilityPoison() {
    outcomes['Match Winner'].home.poison =
      (poisonGoals1Home * poisonGoals0Away) / 100 +
      (poisonGoals2Home * poisonGoals0Away) / 100 +
      (poisonGoals3Home * poisonGoals0Away) / 100 +
      (poisonGoals4Home * poisonGoals0Away) / 100 +
      (poisonGoals5Home * poisonGoals0Away) / 100 +
      (poisonGoals2Home * poisonGoals1Away) / 100 +
      (poisonGoals3Home * poisonGoals1Away) / 100 +
      (poisonGoals4Home * poisonGoals1Away) / 100 +
      (poisonGoals5Home * poisonGoals1Away) / 100 +
      (poisonGoals3Home * poisonGoals2Away) / 100 +
      (poisonGoals4Home * poisonGoals2Away) / 100 +
      (poisonGoals5Home * poisonGoals2Away) / 100 +
      (poisonGoals4Home * poisonGoals3Away) / 100 +
      (poisonGoals5Home * poisonGoals3Away) / 100 +
      (poisonGoals5Home * poisonGoals4Away) / 100;
    outcomes['Match Winner'].away.poison =
      (poisonGoals0Home * poisonGoals1Away) / 100 +
      (poisonGoals0Home * poisonGoals2Away) / 100 +
      (poisonGoals0Home * poisonGoals3Away) / 100 +
      (poisonGoals0Home * poisonGoals4Away) / 100 +
      (poisonGoals0Home * poisonGoals5Away) / 100 +
      (poisonGoals1Home * poisonGoals2Away) / 100 +
      (poisonGoals1Home * poisonGoals3Away) / 100 +
      (poisonGoals1Home * poisonGoals4Away) / 100 +
      (poisonGoals1Home * poisonGoals5Away) / 100 +
      (poisonGoals2Home * poisonGoals3Away) / 100 +
      (poisonGoals2Home * poisonGoals4Away) / 100 +
      (poisonGoals2Home * poisonGoals5Away) / 100 +
      (poisonGoals3Home * poisonGoals4Away) / 100 +
      (poisonGoals3Home * poisonGoals5Away) / 100 +
      (poisonGoals4Home * poisonGoals5Away) / 100;
    outcomes['Asian Handicap']['Home +0'].poison =
      outcomes['Match Winner'].home.poison +
      (poisonGoals0Home * poisonGoals0Away) / 100 +
      (poisonGoals1Home * poisonGoals1Away) / 100 +
      (poisonGoals2Home * poisonGoals2Away) / 100 +
      (poisonGoals3Home * poisonGoals3Away) / 100 +
      (poisonGoals4Home * poisonGoals4Away) / 100 +
      (poisonGoals5Home * poisonGoals5Away) / 100;
    outcomes['Asian Handicap']['Away +0'].poison =
      outcomes['Match Winner'].away.poison +
      (poisonGoals0Home * poisonGoals0Away) / 100 +
      (poisonGoals1Home * poisonGoals1Away) / 100 +
      (poisonGoals2Home * poisonGoals2Away) / 100 +
      (poisonGoals3Home * poisonGoals3Away) / 100 +
      (poisonGoals4Home * poisonGoals4Away) / 100 +
      (poisonGoals5Home * poisonGoals5Away) / 100;
    outcomes['Asian Handicap']['Home -1.5'].poison =
      (poisonGoals2Home * poisonGoals0Away) / 100 +
      (poisonGoals3Home * poisonGoals0Away) / 100 +
      (poisonGoals3Home * poisonGoals1Away) / 100 +
      (poisonGoals4Home * poisonGoals0Away) / 100 +
      (poisonGoals4Home * poisonGoals1Away) / 100 +
      (poisonGoals4Home * poisonGoals2Away) / 100 +
      (poisonGoals5Home * poisonGoals0Away) / 100 +
      (poisonGoals5Home * poisonGoals1Away) / 100 +
      (poisonGoals5Home * poisonGoals2Away) / 100 +
      (poisonGoals5Home * poisonGoals3Away) / 100;
    outcomes['Asian Handicap']['Away -1.5'].poison =
      (poisonGoals0Home * poisonGoals2Away) / 100 +
      (poisonGoals0Home * poisonGoals3Away) / 100 +
      (poisonGoals1Home * poisonGoals3Away) / 100 +
      (poisonGoals0Home * poisonGoals4Away) / 100 +
      (poisonGoals1Home * poisonGoals4Away) / 100 +
      (poisonGoals2Home * poisonGoals4Away) / 100 +
      (poisonGoals0Home * poisonGoals5Away) / 100 +
      (poisonGoals1Home * poisonGoals5Away) / 100 +
      (poisonGoals2Home * poisonGoals5Away) / 100 +
      (poisonGoals3Home * poisonGoals5Away) / 100;
    outcomes['Goals Over/Under']['Under 1.5'].poison =
      (poisonGoals0Home * poisonGoals0Away) / 100 +
      (poisonGoals1Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals1Away) / 100;
    outcomes['Goals Over/Under']['Under 2.5'].poison =
      (poisonGoals0Home * poisonGoals0Away) / 100 +
      (poisonGoals1Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals1Away) / 100 +
      (poisonGoals1Home * poisonGoals1Away) / 100 +
      (poisonGoals2Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals2Away) / 100;
    outcomes['Goals Over/Under']['Under 3.5'].poison =
      (poisonGoals0Home * poisonGoals0Away) / 100 +
      (poisonGoals1Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals1Away) / 100 +
      (poisonGoals1Home * poisonGoals1Away) / 100 +
      (poisonGoals2Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals2Away) / 100 +
      (poisonGoals2Home * poisonGoals1Away) / 100 +
      (poisonGoals1Home * poisonGoals2Away) / 100 +
      (poisonGoals3Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals3Away) / 100;
    outcomes['Goals Over/Under']['Over 1.5'].poison =
      100 - outcomes['Goals Over/Under']['Under 1.5'].poison;
    outcomes['Goals Over/Under']['Over 2.5'].poison =
      100 - outcomes['Goals Over/Under']['Under 2.5'].poison;
    outcomes['Goals Over/Under']['Over 3.5'].poison =
      100 - outcomes['Goals Over/Under']['Under 3.5'].poison;
    outcomes['Both Teams Score'].No.poison =
      (poisonGoals0Home * poisonGoals0Away) / 100 +
      (poisonGoals1Home * poisonGoals0Away) / 100 +
      (poisonGoals2Home * poisonGoals0Away) / 100 +
      (poisonGoals3Home * poisonGoals0Away) / 100 +
      (poisonGoals4Home * poisonGoals0Away) / 100 +
      (poisonGoals5Home * poisonGoals0Away) / 100 +
      (poisonGoals0Home * poisonGoals1Away) / 100 +
      (poisonGoals0Home * poisonGoals2Away) / 100 +
      (poisonGoals0Home * poisonGoals3Away) / 100 +
      (poisonGoals0Home * poisonGoals4Away) / 100 +
      (poisonGoals0Home * poisonGoals5Away) / 100;
    outcomes['Both Teams Score'].Yes.poison =
      100 - outcomes['Both Teams Score'].No.poison;
    outcomes['Total - Home']['Over 0.5'].poison =
      poisonGoals2Home +
      poisonGoals3Home +
      poisonGoals4Home +
      poisonGoals5Home +
      poisonGoals1Home;
    outcomes['Total - Away']['Over 0.5'].poison =
      poisonGoals2Away +
      poisonGoals3Away +
      poisonGoals4Away +
      poisonGoals5Away +
      poisonGoals1Away;
    outcomes['Total - Home']['Over 1.5'].poison =
      poisonGoals2Home + poisonGoals3Home + poisonGoals4Home + poisonGoals5Home;
    outcomes['Total - Away']['Over 1.5'].poison =
      poisonGoals2Away + poisonGoals3Away + poisonGoals4Away + poisonGoals5Away;
  }
  calcProbabilityPoison();

  getOdds(outcomes, match, dataForPrediction, prediction);
}

export default getPrediction;
