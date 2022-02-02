import calcStaticticAway from './calcStatisticAway';

function calcStaticticHome(lastMatchesHome, lastMatchesAway, match) {
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
  };

  // рассчитываем статистику для домашней команды
  let quantityMatchesHome = 0;

  lastMatchesHome.forEach((el) => {
    if (match.teams.home.id === el.homeTeam.team_id) {
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

  calcStaticticAway(outcomes, lastMatchesAway, match, quantityMatchesHome);
}

export default calcStaticticHome;
