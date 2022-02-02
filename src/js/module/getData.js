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
    wether: {
      temperature: 0,
      precipitation: [],
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

        weather();
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
    <div class="card__lackOfPlayers">
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

  function weather() {}

  dataForPrediction.getTransferCost();
  dataForPrediction.getSchemes();
}

export default getData;
