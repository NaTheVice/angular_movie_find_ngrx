const axios = require('axios');
const baseUrl = 'https://api.themoviedb.org/3/tv/popular?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de?page=1'


module.exports = {
  getList(page) {
    return axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de?page=${page}`)
      .then(body => body.data)
      .catch(error => {
        console.log(error);
      });
  },
  get(id) {
    return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de&append_to_response=credits`)
      .then(body  => body.data)
      .catch(error => {
        console.log(error);
      });
  },
  getSeason(id, number){
    return axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de`)
      .then(body  => body.data.results)
      .catch(error => {
        console.log(error);
      });
  },
  getSeasons(id){
    return axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=f81bd9740a1f947cd670b275ccd1596c&language=de`)
      .then(body => body.data.seasons) 
      .catch(error => {
        console.log(error);
      });
  }

}
