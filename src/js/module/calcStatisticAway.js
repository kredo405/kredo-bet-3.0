import getPrediction from './getPrediction';

function calcStaticticAway(
  outcomes,
  lastMatchesAway,
  match,
  quantityMatchesHome,
  dataForPrediction
) {
  // рассчитываем статистику для домашней команды
  let quantityMatchesAway = 0;

  lastMatchesAway.forEach((el) => {
    if (
      match.teams.away.id === el.awayTeam.team_id &&
      match.league.name === el.league.name
    ) {
      quantityMatchesAway++;
      if (el.goalsHomeTeam < el.goalsAwayTeam) {
        outcomes['Match Winner'].away.away++;
      }
      if (el.goalsAwayTeam - el.goalsHomeTeam > 1) {
        outcomes['Asian Handicap']['Away -1.5'].away++;
      }
      if (el.goalsAwayTeam - el.goalsHomeTeam >= 0) {
        outcomes['Asian Handicap']['Away +0'].away++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 1.5) {
        outcomes['Goals Over/Under']['Over 1.5'].away++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 2.5) {
        outcomes['Goals Over/Under']['Over 2.5'].away++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 3.5) {
        outcomes['Goals Over/Under']['Over 3.5'].away++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 1.5) {
        outcomes['Goals Over/Under']['Under 1.5'].away++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 2.5) {
        outcomes['Goals Over/Under']['Under 2.5'].away++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 3.5) {
        outcomes['Goals Over/Under']['Under 3.5'].away++;
      }

      if (el.goalsHomeTeam > 0 && el.goalsAwayTeam > 0) {
        outcomes['Both Teams Score'].Yes.away++;
      }
      if (
        (el.goalsHomeTeam === 0 && el.goalsAwayTeam >= 0) ||
        (el.goalsHomeTeam >= 0 && el.goalsAwayTeam === 0)
      ) {
        outcomes['Both Teams Score'].No.away++;
      }

      if (el.goalsAwayTeam > 0.5) {
        outcomes['Total - Away']['Over 0.5'].away++;
      }
      if (el.goalsAwayTeam > 1.5) {
        outcomes['Total - Away']['Over 1.5'].away++;
      }
    }
  });

  //   Рассчитываем проценты
  function calcPercentOutcomes(UperCase, team, quantity) {
    outcomes['Match Winner'][`${team}`][`${team}`] =
      (outcomes['Match Winner'][`${team}`][`${team}`] * 100) / quantity;
    outcomes['Asian Handicap'][`${UperCase} -1.5`][`${team}`] =
      (outcomes['Asian Handicap'][`${UperCase} -1.5`][`${team}`] * 100) /
      quantity;
    outcomes['Asian Handicap'][`${UperCase} +0`][`${team}`] =
      (outcomes['Asian Handicap'][`${UperCase} +0`][`${team}`] * 100) /
      quantity;
    outcomes['Goals Over/Under']['Over 1.5'][`${team}`] =
      (outcomes['Goals Over/Under']['Over 1.5'][`${team}`] * 100) / quantity;
    outcomes['Goals Over/Under']['Over 2.5'][`${team}`] =
      (outcomes['Goals Over/Under']['Over 2.5'][`${team}`] * 100) / quantity;
    outcomes['Goals Over/Under']['Over 3.5'][`${team}`] =
      (outcomes['Goals Over/Under']['Over 3.5'][`${team}`] * 100) / quantity;
    outcomes['Goals Over/Under']['Under 1.5'][`${team}`] =
      (outcomes['Goals Over/Under']['Under 1.5'][`${team}`] * 100) / quantity;
    outcomes['Goals Over/Under']['Under 2.5'][`${team}`] =
      (outcomes['Goals Over/Under']['Under 2.5'][`${team}`] * 100) / quantity;
    outcomes['Goals Over/Under']['Under 3.5'][`${team}`] =
      (outcomes['Goals Over/Under']['Under 3.5'][`${team}`] * 100) / quantity;
    outcomes['Both Teams Score'].Yes[`${team}`] =
      (outcomes['Both Teams Score'].Yes[`${team}`] * 100) / quantity;
    outcomes['Both Teams Score'].No[`${team}`] =
      (outcomes['Both Teams Score'].No[`${team}`] * 100) / quantity;
    outcomes[`Total - ${UperCase}`]['Over 0.5'][`${team}`] =
      (outcomes[`Total - ${UperCase}`]['Over 0.5'][`${team}`] * 100) / quantity;
    outcomes[`Total - ${UperCase}`]['Over 1.5'][`${team}`] =
      (outcomes[`Total - ${UperCase}`]['Over 1.5'][`${team}`] * 100) / quantity;
  }
  calcPercentOutcomes('Home', 'home', quantityMatchesHome);
  calcPercentOutcomes('Away', 'away', quantityMatchesAway);
  getPrediction(outcomes, match, dataForPrediction);
}

export default calcStaticticAway;
