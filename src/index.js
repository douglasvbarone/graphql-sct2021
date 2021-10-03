import { ApolloServer } from 'apollo-server'

import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'

import { pets, owners, categories } from './fakeDB'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ pets, owners, categories })
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
