import getLast100MathesHome from './getLast100MatheForTeams';

function getData(el) {
  const dataForPrediction = {
    transferCost: {
      home: 0,
      away: 0,
    },
    schemes: {
      home: [],
      away: [],
    },
    lackPlayers: {
      home: {
        att: 0,
        def: 0,
        mild: 0,
      },
      away: {
        att: 0,
        def: 0,
        mild: 0,
      },
    },
    weather: {
      temperature: null,
      precipitation: null,
    },
    factsAndTrends: {
      'Match Winner': {
        home: 0,
        away: 0,
      },
      'Goals Over/Under': {
        'Over 2.5': 0,
        'Under 2.5': 0,
      },
      'Total - Home': {
        'Over 1': 0,
        'Under 1': 0,
      },
      'Total - Away': {
        'Over 1': 0,
        'Under 1': 0,
      },
      'Both Teams Score': {
        Yes: 0,
        No: 0,
      },
    },
    predicton: {
      'Match Winner': {
        home: 0,
        away: 0,
      },
      'Goals Over/Under': {
        'Over 2.5': 0,
        'Under 2.5': 0,
      },
      'Total - Home': {
        'Over 1': 0,
        'Under 1': 0,
      },
      'Total - Away': {
        'Over 1': 0,
        'Under 1': 0,
      },
      'Both Teams Score': {
        Yes: 0,
        No: 0,
      },
      'Asian Handicap': {
        'Home -1': 0,
        'Away -1': 0,
        'Home +0': 0,
        'Away +0': 0,
      },
    },
    getTransferCost() {
      this.transferCost.home = document.querySelector(
        `.card__input--transfer-cost-home${el.fixture.id}`
      ).value;
      this.transferCost.away = document.querySelector(
        `.card__input--transfer-cost-away${el.fixture.id}`
      ).value;
      const transferBlock = document.querySelector(
        `.card__transfer-cost${el.fixture.id}`
      );
      transferBlock.remove();
      addBlockPlayStyle();
    },
    getSchemes() {
      const schemesHome = document.querySelector(
        `.card__schemes-home${el.fixture.id}`
      );
      const schemesHomeItem =
        schemesHome.querySelectorAll(`.card__schemes-item`);
      const schemesAway = document.querySelector(
        `.card__schemes-away${el.fixture.id}`
      );
      const schemesAwayItem =
        schemesAway.querySelectorAll(`.card__schemes-item`);
      const btnScheme = document.querySelector(
        `.card__btn--playStyle${el.fixture.id}`
      );

      btnScheme.addEventListener('click', () => {
        schemesHomeItem.forEach((el) => {
          if (el.children[1].checked) {
            this.schemes.home.push(el.children[0].innerHTML);
          }
        });

        schemesAwayItem.forEach((el) => {
          if (el.children[1].checked) {
            this.schemes.away.push(el.children[0].innerHTML);
          }
        });

        const playStyle = document.querySelector(
          `.card__play-style${el.fixture.id}`
        );
        playStyle.remove();
        addBlockLackOfPlayers();
        console.log(this);
      });
    },
    lackOfPlayers() {
      const quntityDefHome = document.querySelector(
        `.card__quantity--def-home${el.fixture.id}`
      );
      const quntityDefAway = document.querySelector(
        `.card__quantity--def-away${el.fixture.id}`
      );
      const quntityMildHome = document.querySelector(
        `.card__quantity--mild-home${el.fixture.id}`
      );
      const quntityMildAway = document.querySelector(
        `.card__quantity--mild-away${el.fixture.id}`
      );
      const quntityAttHome = document.querySelector(
        `.card__quantity--att-home${el.fixture.id}`
      );
      const quntityAttAway = document.querySelector(
        `.card__quantity--att-away${el.fixture.id}`
      );
      const btnLackOfPlayers = document.querySelector(
        `.card__btn--lackOfPlayers${el.fixture.id}`
      );

      btnLackOfPlayers.addEventListener('click', () => {
        if (quntityDefHome.value) {
          this.lackPlayers.home.def = +quntityDefHome.value;
        } else {
          this.lackPlayers.home.def = 0;
        }

        if (quntityDefAway.value) {
          this.lackPlayers.away.def = +quntityDefAway.value;
        } else {
          this.lackPlayers.away.def = 0;
        }

        if (quntityMildHome.value) {
          this.lackPlayers.home.mild = +quntityMildHome.value;
        } else {
          this.lackPlayers.home.mild = 0;
        }

        if (quntityMildAway.value) {
          this.lackPlayers.away.mild = +quntityMildAway.value;
        } else {
          this.lackPlayers.away.mild = 0;
        }

        if (quntityAttHome.value) {
          this.lackPlayers.home.att = +quntityAttHome.value;
        } else {
          this.lackPlayers.home.att = 0;
        }

        if (quntityAttAway.value) {
          this.lackPlayers.away.att = +quntityAttAway.value;
        } else {
          this.lackPlayers.away.att = 0;
        }
        const lackOfPlayers = document.querySelector(
          `.card__lackOfPlayers${el.fixture.id}`
        );
        lackOfPlayers.remove();
        weather();
      });
    },
    getWeather() {
      const button = document.querySelector(
        `.card__btn--weather${el.fixture.id}`
      );
      button.addEventListener('click', () => {
        this.weather.temperature = document.querySelector(
          `.card__temperature${el.fixture.id}`
        ).value;
        this.weather.precipitation = document.querySelector(
          `.card__precipitation${el.fixture.id}`
        ).value;

        const weatherBlock = document.querySelector(
          `.card__weather${el.fixture.id}`
        );
        weatherBlock.remove();
        factAndTrends();
      });
    },
    getTrendsAndFacts() {
      const mainOutcomes = document.querySelector(
        `.card__main-outcomes${el.fixture.id}`
      );
      const totals = document.querySelector(`.card__totals${el.fixture.id}`);
      const individualTotalOver = document.querySelector(
        `.card__individual-totals-over${el.fixture.id}`
      );
      const individualTotalUnder = document.querySelector(
        `.card__iindividual-totals-under${el.fixture.id}`
      );
      const bothTeamsScore = document.querySelector(
        `.card__both-with-score${el.fixture.id}`
      );
      const button = document.querySelector(
        `.card__btn--factsAndTrends${el.fixture.id}`
      );

      mainOutcomes.children[0].addEventListener('click', () => {
        this.factsAndTrends['Match Winner'].home++;
      });
      mainOutcomes.children[1].addEventListener('click', () => {
        this.factsAndTrends['Match Winner'].away++;
      });
      totals.children[0].addEventListener('click', () => {
        this.factsAndTrends['Goals Over/Under']['Over 2.5']++;
      });
      totals.children[1].addEventListener('click', () => {
        this.factsAndTrends['Goals Over/Under']['Under 2.5']++;
      });
      individualTotalOver.children[0].addEventListener('click', () => {
        this.factsAndTrends['Total - Home']['Over 1']++;
      });
      individualTotalOver.children[0].addEventListener('click', () => {
        this.factsAndTrends['Total - Away']['Over 1']++;
      });
      individualTotalOver.children[1].addEventListener('click', () => {
        this.factsAndTrends['Total - Home']['Under 1']++;
      });
      individualTotalOver.children[1].addEventListener('click', () => {
        this.factsAndTrends['Total - Away']['Under 1']++;
      });
      mainOutcomes.children[0].addEventListener('click', () => {
        this.factsAndTrends['Both Teams Score'].Yes++;
      });
      mainOutcomes.children[1].addEventListener('click', () => {
        this.factsAndTrends['Both Teams Score'].No++;
      });

      button.addEventListener('click', () => {
        const factsAndTrends = document.querySelector(
          `.card__factsAndTrends${el.fixture.id}`
        );
        factsAndTrends.remove();
        addPagePrediction();
      });
    },
    getPrediction() {
      const mainOutcomes = document.querySelector(
        `.card__main-outcomes${el.fixture.id}`
      );
      const totals = document.querySelector(`.card__totals${el.fixture.id}`);
      const doubleChance = document.querySelector(
        `.card__doublle-chance${el.fixture.id}`
      );
      const fores = document.querySelector(`.card__fores${el.fixture.id}`);
      const individualTotalOver = document.querySelector(
        `.card__individual-totals-over${el.fixture.id}`
      );
      const individualTotalUnder = document.querySelector(
        `.card__iindividual-totals-under${el.fixture.id}`
      );
      const bothTeamsScore = document.querySelector(
        `.card__both-with-score${el.fixture.id}`
      );
      const button = document.querySelector(
        `.card__btn--prediction${el.fixture.id}`
      );

      mainOutcomes.children[0].addEventListener('click', () => {
        this.predicton['Match Winner'].home++;
      });
      mainOutcomes.children[1].addEventListener('click', () => {
        this.predicton['Match Winner'].away++;
      });

      doubleChance.children[0].addEventListener('click', () => {
        this.predicton['Asian Handicap']['Home +0']++;
      });
      doubleChance.children[1].addEventListener('click', () => {
        this.predicton['Asian Handicap']['Away +0']++;
      });
      fores.children[0].addEventListener('click', () => {
        this.predicton['Asian Handicap']['Home -1']++;
      });
      fores.children[1].addEventListener('click', () => {
        this.predicton['Asian Handicap']['Away -1']++;
      });
      totals.children[0].addEventListener('click', () => {
        this.predicton['Goals Over/Under']['Over 2.5']++;
      });
      totals.children[1].addEventListener('click', () => {
        this.predicton['Goals Over/Under']['Under 2.5']++;
      });
      individualTotalOver.children[0].addEventListener('click', () => {
        this.predicton['Total - Home']['Over 1']++;
      });
      individualTotalOver.children[0].addEventListener('click', () => {
        this.predicton['Total - Away']['Over 1']++;
      });
      individualTotalUnder.children[1].addEventListener('click', () => {
        this.predicton['Total - Home']['Under 1']++;
      });
      individualTotalUnder.children[1].addEventListener('click', () => {
        this.predicton['Total - Away']['Under 1']++;
      });
      bothTeamsScore.children[0].addEventListener('click', () => {
        this.predicton['Both Teams Score'].Yes++;
      });
      bothTeamsScore.children[1].addEventListener('click', () => {
        this.predicton['Both Teams Score'].No++;
      });

      button.addEventListener('click', () => {
        const prediction = document.querySelector(
          `.card__prediction${el.fixture.id}`
        );
        prediction.remove();
        getLast100MathesHome(el, this);
        console.log(this);
      });
    },
  };

  function addBlockPlayStyle() {
    const matchBlock = document.querySelector(`.matches__card${el.fixture.id}`);
    matchBlock.innerHTML = `
      <div class="card__play-style${el.fixture.id}">
      <div class="card__title-wrapper">
        <h4 class="card__title">
          <a href="https://www.transfermarkt.ru/"
            >Transfermarkt</a
          >
        </h4>
      </div>

      <div class="card__schemes">
        <div class="card__title-wrapper">
          <div class="card__data-title">
            Выберите наиболее используемые схемы
          </div>
        </div>
        <div class="card__data-wrapper">
          <div class="card__team">
            <img
              src="${el.teams.home.logo}"
              alt="logo"
              class="card__logo"
            />
          </div>
          <div class="card__team">
            <img
              src="${el.teams.away.logo}"
              alt="logo"
              class="card__logo"
            />
          </div>
        </div>
        <div class="card__schemes-wrapper">
          <div class="card__schemes-home  card__schemes-home${el.fixture.id}">
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-4-2</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-3-3</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">3-5-2</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-5-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-4-1-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-2-3-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">3-4-3</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">5-3-2</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">5-4-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-3-2-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-2-4</span>
              <input type="checkbox" class="card__scheme" />
            </div>
          </div>
          <div class="card__schemes-away  card__schemes-away${el.fixture.id}">
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-4-2</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-3-3</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">3-5-2</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-5-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-4-1-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-2-3-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">3-4-3</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">5-3-2</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">5-4-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-3-2-1</span>
              <input type="checkbox" class="card__scheme" />
            </div>
            <div class = 'card__schemes-item'>
              <span class="card__scheme-name">4-2-4</span>
              <input type="checkbox" class="card__scheme" />
            </div>
          </div>
        </div>
      </div>

      <div class="card__button-wrapper">
        <button
          type="button"
          class="btn btn-primary card__btn card__btn--playStyle${el.fixture.id}"
        >
          Далее
        </button>
      </div>
    </div>
      `;
  }

  function addBlockLackOfPlayers() {
    const matchBlock = document.querySelector(`.matches__card${el.fixture.id}`);
    matchBlock.innerHTML = `
    <div class="card__lackOfPlayers${el.fixture.id}">
    <div class="card__title-wrapper">
      <h4 class="card__title">Отсутствующие игроки</h4>
    </div>
    <div class = 'card__logo--wrapper'>
        <img src = '${el.teams.home.logo}' class = 'card__logo'>
    </div>
    <div class="card__quntityPlayers">
      <div class="card__header-tabl">
        <div><b>Амплуа</b></div>
        <div><b>Кол-во</b></div>
      </div>
      <div class="card__tabl-item">
        <div class="card__amplua">Защитник</div>
        <div class="card__quntity-wrapper">
          <input
            type="number"
            class="card__quantity card__quantity--def card__quantity--def-home${el.fixture.id}"
          />
        </div>
      </div>
      <div class="card__tabl-item">
        <div class="card__amplua">Полузащитник</div>
        <div class="card__quntity-wrapper">
          <input
            type="number"
            class="card__quantity card__quantity--mild card__quantity--mild-home${el.fixture.id}"
          />
        </div>
      </div>
      <div class="card__tabl-item">
        <div class="card__amplua">Нападающий</div>
        <div class="card__quntity-wrapper">
          <input
            type="number"
            class="card__quantity card__quantity--att card__quantity--att-home${el.fixture.id}"
          />
        </div>
      </div>
    </div>
    <div class = 'card__logo--wrapper'>
    <img src = '${el.teams.away.logo}' class = 'card__logo'>
    </div>

    <div class="card__quntityPlayers">
      <div class="card__header-tabl">
        <div><b>Амплуа</b></div>
        <div><b>Кол-во</b></div>
      </div>
      <div class="card__tabl-item">
        <div class="card__amplua">Защитник</div>
        <div class="card__quntity-wrapper">
          <input
            type="number"
            class="card__quantity card__quantity--def card__quantity--def-away${el.fixture.id}"
          />
        </div>
      </div>
      <div class="card__tabl-item">
        <div class="card__amplua">Полузащитник</div>
        <div class="card__quntity-wrapper">
          <input
            type="number"
            class="card__quantity card__quantity--mild card__quantity--mild-away${el.fixture.id}"
          />
        </div>
      </div>
      <div class="card__tabl-item">
        <div class="card__amplua">Нападающий</div>
        <div class="card__quntity-wrapper">
          <input
            type="number"
            class="card__quantity card__quantity--att card__quantity--att-away${el.fixture.id}"
          />
        </div>
      </div>
    </div>


    <div class="card__button-wrapper">
      <button
        type="button"
        class="btn btn-primary card__btn--lackOfPlayers card__btn--lackOfPlayers${el.fixture.id}"
      >
        Далее
      </button>
    </div>
  </div>
    `;
    dataForPrediction.lackOfPlayers();
  }

  function weather() {
    const matchBlock = document.querySelector(`.matches__card${el.fixture.id}`);
    matchBlock.innerHTML = `
    <div class="card__weather${el.fixture.id}">
    <div class="card__wrapper">
      <div class="card__title-wrapper">
        <h4 class="card__title">
          <a href="https://nb-bet.com/">NB-Bet</a>
        </h4>
      </div>
      <div class="card__title-wrapper">
        <h5 class="card__data-title">Погода</h5>
      </div>
      <div class="card__temperature-wrapper">
        <div>Температура:</div>
        <input
          type="text"
          class="card__temperature card__temperature${el.fixture.id}"
          placeholder="+5, -5"
        />
        <div>Осадки:</div>
        <input
          type="text"
          class="card__temperature card__precipitation${el.fixture.id}"
          placeholder="Дождь, снег"
        />
      </div>
      <div class="card__button-wrapper">
        <button type="button" class="btn btn-primary card__btn card__btn--weather${el.fixture.id}">Далее</button>
      </div>
    </div>
  </div>
    `;

    dataForPrediction.getWeather();
  }

  function factAndTrends() {
    const matchBlock = document.querySelector(`.matches__card${el.fixture.id}`);
    matchBlock.innerHTML = `
    <div class="card__factsAndTrends${el.fixture.id}">
    <div class="card__title-wrapper">
      <h4 class="card__title">
        <a href="https://nb-bet.com/">NB-Bet</a>
      </h4>
    </div>
    <div class="card__title-wrapper">
      <div class="card__data-title">Факты, тренды и серии команд</div>
    </div>
    <div class="card__buttons-group">
      <div class="card__buttons-item card__main-outcomes${el.fixture.id}">
        <button class="btn btn-dark card__button-trends">П1</button>
        <button class="btn btn-dark card__button-trends">П2</button>
      </div>
      <div class="card__buttons-item card__totals${el.fixture.id}">
        <button class="btn btn-dark card__button-trends">ТБ 2.5</button>
        <button class="btn btn-dark card__button-trends">ТМ 2.5</button>
      </div>
      <div class="card__buttons-item card__individual-totals-over${el.fixture.id}">
        <button class="btn btn-dark card__button-trends">ИТ1Б1</button>
        <button class="btn btn-dark card__button-trends">ИТ2Б1</button>
      </div>
      <div class="card__buttons-item card__individual-totals-under${el.fixture.id}">
        <button class="btn btn-dark card__button-trends">ИТ1М1</button>
        <button class="btn btn-dark card__button-trends">ИТ2М1</button>
      </div>
      <div class="card__buttons-item card__both-with-score${el.fixture.id}">
        <button class="btn btn-dark card__button-trends">ОЗ Да</button>
        <button class="btn btn-dark card__button-trends">ОЗ Нет</button>
      </div>
    </div>
    <div class="card__button-wrapper">
      <button type="button" class="btn btn-primary card__btn card__btn--factsAndTrends${el.fixture.id}">Далее</button>
    </div>
  </div>
    `;

    dataForPrediction.getTrendsAndFacts();
  }

  function addPagePrediction() {
    const matchBlock = document.querySelector(`.matches__card${el.fixture.id}`);
    matchBlock.innerHTML = `
    <div class="card__prediction${el.fixture.id}">
    <div class="card__title-wrapper">
      <h4 class="card__title">
        <a href="https://nb-bet.com/">NB-Bet</a>
      </h4>
    </div>
    <div class="card__title-wrapper">
      <div class="card__data-title">Прогнозы</div>
    </div>
    <div class="card__buttons-group">
      <div class="card__buttons-item card__main-outcomes${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">П1</button>
        <button class="btn btn-dark card__button-prediction">П2</button>
      </div>
      <div class="card__buttons-item card__doublle-chance${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">1X</button>
        <button class="btn btn-dark card__button-prediction">2X</button>
      </div>
      <div class="card__buttons-item card__fores${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">Ф1 -1</button>
        <button class="btn btn-dark card__button-prediction">Ф2 -1</button>
      </div>
      <div class="card__buttons-item card__totals${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">ТБ 2.5</button>
        <button class="btn btn-dark card__button-prediction">ТМ 2.5</button>
      </div>
      <div class="card__buttons-item card__individual-totals-over${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">ИТ1Б1</button>
        <button class="btn btn-dark card__button-prediction">ИТ2Б1</button>
      </div>
      <div class="card__buttons-item card__individual-totals-under${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">ИТ1М1</button>
        <button class="btn btn-dark card__button-prediction">ИТ2М1</button>
      </div>
      <div class="card__buttons-item card__both-with-score${el.fixture.id}">
        <button class="btn btn-dark card__button-prediction">ОЗ Да</button>
        <button class="btn btn-dark card__button-prediction">ОЗ Нет</button>
      </div>
    </div>
    <div class="card__button-wrapper">
      <button type="button" class="btn btn-primary card__btn card__btn--prediction${el.fixture.id}">Далее</button>
    </div>
  </div>
    `;

    dataForPrediction.getPrediction();
  }

  dataForPrediction.getTransferCost();
  dataForPrediction.getSchemes();
}

export default getData;
