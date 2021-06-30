import { pets, owners, categories } from './fakeDB'

export const resolvers = {
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

  Mutation: {
    addPet(parent, args, context, info) {
      pets.push(args)
      return pets[pets.length - 1]
    }
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
