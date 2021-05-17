<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
    >
      <!-- <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div> -->

      <v-spacer/>

      <!-- <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn> -->
      <v-menu bottom right>
        <template v-slot:activator="{on, attrs}">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn :to="{name: 'home'}" text exact-active-class="green">Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn :to="{name: 'about'}" text exact-active-class="green">About</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn :to="{name: 'quiz'}" text exact-active-class="green">Quiz</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn :to="{name: 'list'}" text exact-active-class="green">List</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn :to="{name: 'labels'}" text exact-active-class="green">Labels</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
    <v-footer app>
      &copy; Aiwaka 2021
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
