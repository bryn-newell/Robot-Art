<template>
  <main id="app">
    <Nav v-show="true" :mobileNavActive="mobileNavActive" @open-nav="mobileNavActive = true" @close-nav="mobileNavActive = false" />
    <router-view v-show="!mobileNavActive" class="container"/>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Nav from '@/components/Nav.vue';

export default {
  components: {
    Nav,
  },
  computed: {
    ...mapState([
      'user',
    ]),
    showNav() {
      return !!this.user;
    },
  },
  data() {
    return {
      mobileNavActive: false,
    };
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
