const { makeExecutableSchema} = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = [`
  type Cinema {
    id: ID!
    name: String
    movies: [Movie]
  }

  type Movie {
    id: ID!
    title: String
    poster_path: String
    overview: String
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
    movies: [Movie]
    movie(id: ID!): Movie,
    actor(id: ID!): Actor
  }


  schema {
    query: Query,
  }
  `];

  const schema = makeExecutableSchema({typeDefs, resolvers});

module.exports = schema
