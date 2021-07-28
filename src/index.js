import { ApolloServer } from 'apollo-server-express'
import express from 'express'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  const app = express()
  server.applyMiddleware({ app })
  await new Promise(resolve => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
