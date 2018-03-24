const movies = require("./api/movies");
const series = require("./api/series");
const credits = require("./api/credits");
const { take, pick } = require("lodash");

const resolveFunctions = {
  Query: {
    movies(root, args) {
      return movies.getList(args.page);
    },
    movie(root, args) {
      return movies.get(args.id);
    },
    topSeries(root, args) {
      return series.getList(args.page);
    },
    serie(root, args) {
      return series.get(args.id);
    },
    detailSerie(root, args) {
      return series.getDetails(args.id);
    }
  },
  Movies: {
    page(root) {
      return root.page;
    }
  },
  Series: {
    page(root) {
      return root.page;
    }
  },
  Movie: {
    cast(root, args) {
      return credits.get(root.id).then(({ cast }) => {
        if (args.limit) {
          return take(cast, args.limit);
        }
        return cast;
      });
    }
  },
  SeriesDetails:{
    seasons(root){
      return root.seasons;
    }
  },
  Serie: {
    seasons(root, args) {
      return series.get(root.id).then(({ seasons }) => {
        return seasons;
      });
    },
    cast(root, args) {
      return credits.getTv(root.id).then(({ cast }) => {
        if (args.limit) {
          return take(cast, args.limit);
        }
        return cast;
      });
    }
  },

  Season: {
    air_date(root) {
      let year = new String(root.air_date);
      year = year.slice(0, 4);
      return year;
    }
  },

  Cast: {
    id(root) {
      return root.credit_id;
    },
    actor(root) {
      return root;
    }
  },
  Actor: {
    photo(root) {
      return `https://image.tmdb.org/t/p/w500${root.profile_path}`;
    }
  }
};

module.exports = resolveFunctions;
