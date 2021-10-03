<template>
  <v-app>
    <v-app-bar app color="primary" dark><h1>GraphQL Pets</h1> </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  })
}
</script>
