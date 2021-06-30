const { ApolloServer, gql } = require('apollo-server')

const pets = [
  {
    id: 1,
    name: 'Mel',
    owners: [1, 2],
    age: 7,
    breed: 'Caramelus brasiliensis',
    category: 1
  },
  {
    id: 2,
    name: 'Lua',
    owners: [1, 2],
    age: 7,
    breed: 'Caramelus brasiliensis',
    category: 1
  },
  {
    id: 3,
    name: 'Rex',
    owners: [3],
    age: 3,
    breed: 'Pincher',
    category: 1
  },
  {
    id: 4,
    name: 'Tessa',
    owners: [6],
    age: 4,
    breed: 'Diabo da Tasmânia',
    category: 1
  },
  {
    id: 5,
    name: 'Laila',
    owners: [5],
    age: 5,
    breed: 'Burriler',
    category: 1
  },
  {
    id: 6,
    name: 'Thor',
    owners: [7],
    age: 3,
    breed: 'Boxer',
    category: 1
  },
  {
    id: 7,
    name: 'Charlie',
    owners: [1, 2],
    age: 1,
    breed: 'Frajola',
    category: 2
  },

  {
    id: 8,
    name: 'Gojira',
    owners: [7],
    age: 2,
    breed: 'Malhado',
    category: 2
  },
  {
    id: 9,
    name: 'Goldie',
    owners: [6],
    age: 1,
    breed: 'Beta',
    category: 3
  }
]

const categories = [
  {
    id: 1,
    name: 'Cachorro'
  },
  {
    id: 2,
    name: 'Gato'
  },
  {
    id: 3,
    name: 'Peixe'
  }
]

const owners = [
  {
    id: 1,
    name: 'Douglas Barone',
    phone: '+556799995551'
  },
  {
    id: 2,
    name: 'Bruna Ferreira',
    phone: '+556799995552'
  },
  {
    id: 3,
    name: 'Ulysses Ferreira',
    phone: '+556799995553'
  },
  {
    id: 4,
    name: 'Rosinei Viana',
    phone: '+556799995554'
  },
  {
    id: 5,
    name: 'José Pedro',
    phone: '+556799995555'
  },
  {
    id: 6,
    name: 'Leandro Steffen',
    phone: '+556799995556'
  },
  {
    id: 7,
    name: 'Jéssica Barone',
    phone: '+556799995557'
  }
]

const typeDefs = gql`
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
`

const resolvers = {
  Query: {
    pets(parent, { search }, context, info) {
      const sanitizedSearch = search?.toLowerCase().trim()

      return sanitizedSearch
        ? pets.filter(({ name }) =>
            name.toLowerCase().trim().includes(sanitizedSearch)
          )
        : pets
    },

    categories: () => categories,
    owners: () => owners
  },

  Pet: {
    owners(parent, args, context, info) {
      return owners.filter(({ id }) => parent.owners.includes(id))
    },

    category(parent, args, context, info) {
      return categories.find(({ id }) => id === parent.category)
    }
  },

  Category: {
    pets(parent, args, context, info) {
      return pets.filter(({ category }) => category === parent.id)
    }
  },

  Owner: {
    pets(parent, args, context, info) {
      return pets.filter(({ owners }) => owners.includes(parent.id))
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Servidor pronto na URL: ${url}`)
})
