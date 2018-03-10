const movies = require('./api/movies')
const credits = require('./api/credits')
const { take, pick } = require('lodash')


const resolveFunctions = {
  Query: {
    movies(root, args) {
      return movies.getList(args.page)
    },
    movie(root, args) {
      return movies.get(args.id)
    }
  },
  Movies:{
    page(root){
      return root.page
    }
  },
  Movie: {
    cast(root, args) {
      return credits.get(root.id)
        .then(({ cast }) => {
          if (args.limit) {
            return take(cast, args.limit)
          }
          return cast
        })
    }
  },
  Cast: {
    id(root) {
      return root.credit_id
    },
    actor(root) {
      return root
    }
  },
  Actor: {
    photo(root) {
      return `https://image.tmdb.org/t/p/w500${root.profile_path}`
    },
    movies(root, args) {
      console.log("root id", root.id)
      return movies.getActorMovies(root.id)
        .then((movies) => {
          if (args.limit) {
            return take(movies, args.limit)
          }
          return movies
        })
    }
  }
}

module.exports = resolveFunctions
