import calcStaticticAway from './calcStatisticAway';

function calcStaticticHome(
  lastMatchesHome,
  lastMatchesAway,
  match,
  dataForPrediction
) {
  let outcomes = {
    'Match Winner': {
      home: {
        home: 0,
        poison: 0,
      },
      away: {
        away: 0,
        poison: 0,
      },
    },
    'Asian Handicap': {
      'Home -1.5': {
        home: 0,
        poison: 0,
      },
      'Away -1.5': {
        away: 0,
        poison: 0,
      },
      'Home +0': {
        home: 0,
        poison: 0,
      },
      'Away +0': {
        away: 0,
        poison: 0,
      },
    },
    'Goals Over/Under': {
      'Over 1.5': {
        home: 0,
        away: 0,
        poison: 0,
      },
      'Over 2.5': {
        away: 0,
        home: 0,
        poison: 0,
      },
      'Over 3.5': {
        home: 0,
        away: 0,
        poison: 0,
      },
      'Under 1.5': {
        away: 0,
        home: 0,
        poison: 0,
      },
      'Under 2.5': {
        away: 0,
        home: 0,
        poison: 0,
      },
      'Under 3.5': {
        away: 0,
        home: 0,
        poison: 0,
      },
    },
    'Both Teams Score': {
      Yes: {
        home: 0,
        away: 0,
        poison: 0,
      },
      No: {
        home: 0,
        away: 0,
        poison: 0,
      },
    },
    'Total - Home': {
      'Over 0.5': {
        home: 0,
        poison: 0,
      },
      'Over 1.5': {
        home: 0,
        poison: 0,
      },
    },
    'Total - Away': {
      'Over 0.5': {
        away: 0,
        poison: 0,
      },
      'Over 1.5': {
        away: 0,
        poison: 0,
      },
    },
    avgGoals: {
      homeFor: 0,
      homeAgainst: 0,
      awayFor: 0,
      awayAgainst: 0,
    },
    calcAvgGoals(arr, field, team, teamScored, teamMissed) {
      // Рассчитываем среднее кол-во забитых и пропущенных голов
      let sumGoalsFor = 0;
      let sumGoalsAgainst = 0;
      let quantityMatches = 0;

      arr.forEach((el) => {
        if (
          match.teams[field].id === el[team].team_id &&
          match.league.name === el.league.name
        ) {
          sumGoalsFor += el.goalsHomeTeam;
          sumGoalsAgainst += el.goalsAwayTeam;
          quantityMatches++;
        }
      });

      this.avgGoals[teamScored] = sumGoalsFor / quantityMatches;
      this.avgGoals[teamMissed] = sumGoalsAgainst / quantityMatches;
    },
  };

  outcomes.calcAvgGoals(
    lastMatchesHome,
    'home',
    'homeTeam',
    'homeFor',
    'homeAgainst'
  );
  outcomes.calcAvgGoals(
    lastMatchesAway,
    'away',
    'awayTeam',
    'awayFor',
    'awayAgainst'
  );

  // рассчитываем статистику для домашней команды
  let quantityMatchesHome = 0;
  lastMatchesHome.forEach((el) => {
    if (
      match.teams.home.id === el.homeTeam.team_id &&
      match.league.name === el.league.name
    ) {
      quantityMatchesHome++;
      if (el.goalsHomeTeam > el.goalsAwayTeam) {
        outcomes['Match Winner'].home.home++;
      }
      if (el.goalsHomeTeam - el.goalsAwayTeam > 1) {
        outcomes['Asian Handicap']['Home -1.5'].home++;
      }
      if (el.goalsHomeTeam - el.goalsAwayTeam >= 0) {
        outcomes['Asian Handicap']['Home +0'].home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 1.5) {
        outcomes['Goals Over/Under']['Over 1.5'].home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 2.5) {
        outcomes['Goals Over/Under']['Over 2.5'].home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 3.5) {
        outcomes['Goals Over/Under']['Over 3.5'].home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 1.5) {
        outcomes['Goals Over/Under']['Under 1.5'].home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 2.5) {
        outcomes['Goals Over/Under']['Under 2.5'].home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 3.5) {
        outcomes['Goals Over/Under']['Under 3.5'].home++;
      }

      if (el.goalsHomeTeam > 0 && el.goalsAwayTeam > 0) {
        outcomes['Both Teams Score'].Yes.home++;
      }
      if (
        (el.goalsHomeTeam === 0 && el.goalsAwayTeam >= 0) ||
        (el.goalsHomeTeam >= 0 && el.goalsAwayTeam === 0)
      ) {
        outcomes['Both Teams Score'].No.home++;
      }

      if (el.goalsHomeTeam > 0.5) {
        outcomes['Total - Home']['Over 0.5'].home++;
      }
      if (el.goalsHomeTeam > 1.5) {
        outcomes['Total - Home']['Over 1.5'].home++;
      }
    }
  });

  calcStaticticAway(
    outcomes,
    lastMatchesAway,
    match,
    quantityMatchesHome,
    dataForPrediction
  );
}

export default calcStaticticHome;
