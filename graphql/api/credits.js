const axios = require('axios');

module.exports = {
  get(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=f81bd9740a1f947cd670b275ccd1596c`)
      .then(body => body.data)
      .catch(error => {
            console.log(error);
          });
  },

  getTv(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=f81bd9740a1f947cd670b275ccd1596c`)
      .then(body => body.data)
      .catch(error => {
            console.log(error);
          });
  }
}
