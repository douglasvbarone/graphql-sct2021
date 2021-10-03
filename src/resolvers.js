export const resolvers = {
  Query: {
    pets(parent, { search }, { pets }, info) {
      const sanitizedSearch = search?.toLowerCase().trim()

      return sanitizedSearch
        ? pets.filter(({ name }) =>
            name.toLowerCase().trim().includes(sanitizedSearch)
          )
        : pets
    },

    categories: (parent, { search }, { categories }, info) => categories,
    owners: (parent, { search }, { owners }, info) => owners
  },

  Mutation: {
    addPet(parent, { data }, { pets }, info) {
      pets.push(data)

      return pets[pets.length - 1]
    }
  },

  Pet: {
    owners(parent, args, { owners }, info) {
      return owners.filter(({ id }) => parent.owners.includes(id))
    },

    category(parent, args, { categories }, info) {
      return categories.find(({ id }) => id === parent.category)
    }
  },

  Category: {
    pets(parent, args, { pets }, info) {
      return pets.filter(({ category }) => category === parent.id)
    }
  },

  Owner: {
    pets(parent, args, { pets }, info) {
      return pets.filter(({ owners }) => owners.includes(parent.id))
    }
  }
}
