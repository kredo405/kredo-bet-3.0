import axios from 'axios';

function calcPrediction(outcomes, match, odds) {
  const options = {
    method: 'GET',
    url: 'https://transfermarket.p.rapidapi.com/clubs/get-profile',
    params: { id: '631' },
    headers: {
      'x-rapidapi-host': 'transfermarket.p.rapidapi.com',
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

export default calcPrediction;
