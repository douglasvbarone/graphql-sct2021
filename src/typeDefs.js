import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  """
  Um animal de estimação
  """
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

  """
  Tipo especial para consulta
  """
  type Query {
    """
    Todos os pets, ou o resultado da pesquisa
    """
    pets(
      """
      Um termo para busca de pets
      """
      search: String
    ): [Pet!]

    """
    As categorias dos pets. Cachorro, gato, etc.
    """
    categories: [Category!]

    """
    Os donos dos pets
    """
    owners: [Owner!]
  }

  """
  Tipo especial para alterar dados
  """
  type Mutation {
    """
    Adicionar um Pet
    """
    addPet(data: addPetInput!): Pet!
  }

  input addPetInput {
    id: ID!
    name: String!
    owners: [Int!]!
    age: Int
    breed: String
    category: Int!
  }
`
