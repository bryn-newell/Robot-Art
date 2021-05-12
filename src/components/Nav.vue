<template>
  <section class="nav-background">
    <nav class="nav container">
        <img :src="logo" alt="Mondo Robot" role="presentation">
        <div class="primary-links">
          <router-link to="/robots" class="primary">Robots</router-link>
          <router-link to="/results" class="primary">Results</router-link>
        </div>
        <div class="secondary-links">
          <router-link to="/admin" class="secondary">Admin</router-link>
          <a class="secondary" href="#">Log Out</a>
        </div>
    </nav>
  </section>
</template>

<script>
import logo from '@/assets/Logo.png';

export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style lang="scss">
.nav-background {
  background-color: $white;
}
.nav {
  display: flex;
  align-items: center;
  height: 80px;
  text-align: left;
  img {
    height: 32px;
    margin-right: 56px;
    width: 81px;
  }
  a {
    color: $gray-3;
    font-size: $font-size-18;
    font-weight: bold;
    margin-right: 40px;
    text-decoration: none;
    &:hover, &:focus, &:active {
      text-decoration: underline;
    }
    &.secondary {
      color: $gray-2;
      font-weight: normal;
      font-size: $font-size-16;
    }
  }
  .secondary-links {
    margin-left: auto;
  }
}
</style>
