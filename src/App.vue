<template>
  <main id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Log in</router-link>
    </div>
    <router-view/>
  </main>
</template>

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
