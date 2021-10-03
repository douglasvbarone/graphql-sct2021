<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="pet in pets" :key="pet.id" :cols="4">
        <v-card>
          <v-card-title>
            {{ pet.name }} (<em>{{ pet.breed }}</em
            >)
          </v-card-title>
          <v-card-text>
            <small>{{ pet.category.name }}</small>
            <div v-for="owner in pet.owners" :key="owner.id">
              {{ owner.name }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { gql } from 'graphql-tag'
export default {
  name: 'Home',
  apollo: {
    pets: {
      query: gql`
        {
          pets {
            id
            name
            breed
            owners {
              id
              name
            }
            category {
              name
            }
          }
        }
      `
    }
  },
  components: {}
}
</script>
