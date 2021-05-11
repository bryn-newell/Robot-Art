<template>
  <main id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </main>
</template>

<style lang="scss">
@import './styles/main';

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $gray-3;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $gray-3;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
