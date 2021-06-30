import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Pet {
    id: ID!
    name: String!
    owners: [Owner]
    age: Int
    breed: String
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
    pets: [Pet!]
  }

  type Owner {
    id: ID!
    name: String!
    phone: String
    pets: [Pet!]
  }

  # Tipo especial para consulta
  type Query {
    pets(search: String): [Pet!]
    categories: [Category!]
    owners: [Owner!]
  }

  # Tipo especial para alterar dados
  type Mutation {
    addPet(
      id: ID!
      name: String!
      owners: [Int!]!
      age: Int
      breed: String
      category: Int!
    ): Pet!
  }
`
