<template>
  <main id="app">
    <template v-if="!userAuthed">
      <Login />
    </template>
    <template v-else>
      <Nav />
      <router-view class="container"/>
    </template>
  </main>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Login from '@/views/Login.vue';
import { mapState } from 'vuex';

export default {
  components: {
    Nav,
    Login,
  },
  computed: {
    ...mapState([
      'userAuthed',
    ]),
  },
};
</script>

<style lang="scss">
@import './styles/main';

#app {
  background-color: $gray-0;
  color: $gray-3;
  font-family: Helvetica, Arial, sans-serif;
  font-size: $font-size-22;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.page-heading {
  margin: 64px 0;
  text-align: left;
  @media (max-width: $breakpoint-sm) {
    margin-left: 32px;
  }
}
</style>
