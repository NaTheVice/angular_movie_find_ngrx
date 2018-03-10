const { makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = [`
  type Cinema {
    id: ID!
    name: String
    movies: [Movie]
  }

  type Movies{
    total_pages: String
    page: Int
    results: [Movie]
  }

  type Movie {
    id: ID!
    release_date: String
    title: String!
    poster_path: String
    overview: String
    genre_ids: [Int]
    cast(limit: Int): [Cast]
  }

  type Cast {
    id: ID!
    character: String
    actor: Actor
  }

  type Actor {
    id: ID!
    name: String,
    photo: String
    movies(limit: Int): [Movie]
  }

  type Query {
    hello: String
    cinemas: [Cinema]
    cinema(id: ID!): Cinema
    movies(page: Int): Movies
    movie(id: ID!): Movie,
    actor(id: ID!): Actor
  }


  schema {
    query: Query,
  }
  `];

  const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = schema
