const axios = require('axios');
const baseUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de?page=1'


module.exports = {
  getList(page) {
    return axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de&page=${page}`)
      .then(body => body.data)
      .catch(error => {
        console.log(error);
      });
  },
  get(id) {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de&append_to_response=credits`)
      .then(body  => body.data)
      .catch(error => {
        console.log(error);
      });
  },
  getActorMovies(id){
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de&with_cast=${id}&page=1`)
      .then(body  => body.data.results)
      .catch(error => {
        console.log(error);
      });
  }

}
