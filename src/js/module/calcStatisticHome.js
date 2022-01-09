import axios from 'axios';

function calcStaticticHome(lastMatchesHome, lastMatchesAway, match) {
  let outcomes = {
    'Match Winner': {
      home: {
        all: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      away: {
        all: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
    },
    'Asian Handicap': {
      'Home -1.5': {
        all: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Away -1.5': {
        all: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Home +0': {
        all: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Away +0': {
        all: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
    },
    'Goals Over/Under': {
      'Over 1.5': {
        all: 0,
        home: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Over 2.5': {
        all: 0,
        away: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Over 3.5': {
        all: 0,
        home: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Under 1.5': {
        all: 0,
        away: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Under 2.5': {
        all: 0,
        away: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Under 3.5': {
        all: 0,
        away: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
    },
    'Both Teams Score': {
      Yes: {
        all: 0,
        home: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      No: {
        all: 0,
        home: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
    },
    'Total - Home': {
      'Over 0.5': {
        all: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Over 1.5': {
        all: 0,
        home: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
    },
    'Total - Away': {
      'Over 0.5': {
        all: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
      'Over 1.5': {
        all: 0,
        away: 0,
        h2h: 0,
        againstSimilar: 0,
        poison: 0,
      },
    },
  };

  // рассчитываем статистику для домашней команды
  let quantityMatchesAll = 0,
    quantityMatchesHome = 0;

  lastMatchesHome.forEach((el) => {
    if (match.teams.home.id === el.homeTeam.team_id) {
      quantityMatchesAll++;
      quantityMatchesHome++;
      if (el.goalsHomeTeam > el.goalsAwayTeam) {
        outcomes['Match Winner'].home.all++;
        outcomes['Match Winner'].home.home++;
      }
      if (el.goalsHomeTeam - el.goalsAwayTeam > 1) {
        outcomes['Asian Handicap']['Home -1.5'].home.all++;
        outcomes['Asian Handicap']['Home -1.5'].home.home++;
      }
      if (el.goalsHomeTeam - el.goalsAwayTeam >= 0) {
        outcomes['Asian Handicap']['Home +0'].home.all++;
        outcomes['Asian Handicap']['Home +0'].home.home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 1.5) {
        outcomes['Goals Over/Under']['Over 1.5'].home.all++;
        outcomes['Goals Over/Under']['Over 1.5'].home.home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 2.5) {
        outcomes['Goals Over/Under']['Over 2.5'].home.all++;
        outcomes['Goals Over/Under']['Over 2.5'].home.home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 3.5) {
        outcomes['Goals Over/Under']['Over 3.5'].home.all++;
        outcomes['Goals Over/Under']['Over 3.5'].home.home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 1.5) {
        outcomes['Goals Over/Under']['Under 1.5'].home.all++;
        outcomes['Goals Over/Under']['Under 1.5'].home.home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 2.5) {
        outcomes['Goals Over/Under']['Under 2.5'].home.all++;
        outcomes['Goals Over/Under']['Under 2.5'].home.home++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 3.5) {
        outcomes['Goals Over/Under']['Under 3.5'].home.all++;
        outcomes['Goals Over/Under']['Under 3.5'].home.home++;
      }

      if (el.goalsHomeTeam > 0 && el.goalsAwayTeam > 0) {
        outcomes['Both Teams Score'].Yes.home.all++;
        outcomes['Both Teams Score'].Yes.home.home++;
      }
      if (
        (el.goalsHomeTeam === 0 && el.goalsAwayTeam >= 0) ||
        (el.goalsHomeTeam >= 0 && el.goalsAwayTeam === 0)
      ) {
        outcomes['Both Teams Score'].No.home.all++;
        outcomes['Both Teams Score'].No.home.home++;
      }

      if (el.goalsHomeTeam > 0.5) {
        outcomes['Total - Home']['Over 0.5'].home.all++;
        outcomes['Total - Home']['Over 0.5'].home.home++;
      }
      if (el.goalsHomeTeam > 1.5) {
        outcomes['Total - Home']['Over 1.5'].home.all++;
        outcomes['Total - Home']['Over 1.5'].home.home++;
      }
    }

    if (match.teams.away.id === el.awayTeam.team_id) {
      quantityMatchesAll++;
      if (el.goalsAwayTeam > el.goalsHomeTeam) {
        outcomes['Match Winner'].home.all++;
      }
      if (el.goalsAwayTeam - el.goalsHomeTeam > 1) {
        outcomes['Asian Handicap']['Home -1.5'].home.all++;
      }
      if (el.goalsAwayTeam - el.goalsHomeTeam >= 0) {
        outcomes['Asian Handicap']['Home +0'].home.all++;
      }
      if (el.goalsAwayTeam + el.goalsHomeTeam > 1.5) {
        outcomes['Goals Over/Under']['Over 1.5'].home.all++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 2.5) {
        outcomes['Goals Over/Under']['Over 2.5'].home.all++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam > 3.5) {
        outcomes['Goals Over/Under']['Over 3.5'].home.all++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 1.5) {
        outcomes['Goals Over/Under']['Under 1.5'].home.all++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 2.5) {
        outcomes['Goals Over/Under']['Under 2.5'].home.all++;
      }
      if (el.goalsHomeTeam + el.goalsAwayTeam < 3.5) {
        outcomes['Goals Over/Under']['Under 3.5'].home.all++;
      }

      if (el.goalsHomeTeam > 0 && el.goalsAwayTeam > 0) {
        outcomes['Both Teams Score'].Yes.home.all++;
      }
      if (
        (el.goalsHomeTeam === 0 && el.goalsAwayTeam >= 0) ||
        (el.goalsHomeTeam >= 0 && el.goalsAwayTeam === 0)
      ) {
        outcomes['Both Teams Score'].No.home.all++;
      }

      if (el.goalsAwayTeam > 0.5) {
        outcomes['Total - Home']['Over 0.5'].home.all++;
      }
      if (el.goalsAwayTeam > 1.5) {
        outcomes['Total - Home']['Over 1.5'].home.all++;
      }
    }
  });
  console.log(lastMatchesHome, lastMatchesAway, match);
}

export default calcStaticticHome;
