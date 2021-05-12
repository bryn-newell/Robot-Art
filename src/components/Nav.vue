<template>
  <section class="nav-background">
    <nav class="nav container">
        <img :src="logo" alt="Mondo Robot" role="presentation">
        <div class="primary-links">
          <router-link to="/robots" class="primary link">Robots</router-link>
          <router-link to="/results" class="primary link">Results</router-link>
        </div>
        <div class="secondary-links">
          <router-link v-if="isAdmin" to="/admin" class="secondary link">Admin</router-link>
          <button class="secondary btn-link link" @click="handleLogOut">Log Out</button>
        </div>
        <button class="btn-link menu-btn" @click="mobileNavActive = true"><hamburgerIcon /></button>
    </nav>
    <nav class="mobile-nav" v-if="mobileNavActive">
      <button class="btn-link close-btn" type="button" @click="mobileNavActive = false"><closeIcon /></button>
      <a class="link" @click="handleNavigation('robots')">Robots</a>
      <a class="link" @click="handleNavigation('results')">Results</a>
      <a v-if="isAdmin" @click="handleNavigation('admin')" class="link">Admin</a>
      <button class="btn-link link" type="button" @click="handleLogOut">Log Out</button>
    </nav>
  </section>
</template>

<script>
import logo from '@/assets/Logo.png';
import hamburgerIcon from '@/assets/Hamburger.svg';
import closeIcon from '@/assets/Close.svg';
import { mapState } from 'vuex';

export default {
  components: {
    hamburgerIcon,
    closeIcon,
  },
  computed: {
    ...mapState([
      'isAdmin',
    ]),
  },
  data() {
    return {
      logo,
      mobileNavActive: false,
    };
  },
  methods: {
    handleLogOut() {
      this.$store.commit('userLogout');
    },
    handleNavigation(path) {
      this.mobileNavActive = false;
      this.$router.push(`/${path}`);
    },
  },
};
</script>

<style lang="scss">
.nav-background {
  background-color: $white;
}
.nav {
  align-items: center;
  display: flex;
  height: 80px;
  text-align: left;
  img {
    height: 32px;
    margin-right: 56px;
    width: 81px;
  }
  .link {
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
  @media (max-width: $breakpoint-sm) {
    img {
      height: 26px;
      margin-left: 24px;
      width: 67px;
    }
    .primary-links,
    .secondary-links {
      display: none;
    }
    .menu-btn {
      margin-left: auto;
      margin-right: 30px
    }
  }
}
.mobile-nav {
  align-items: center;
  background-color: $gray-3;
  color: $gray-1;
  display: none;
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 10;
  .link {
    color: $gray-1;
    font-size: $font-size-40;
    margin-bottom: 63px;
    text-decoration: none;
    &:hover, &:focus {
      text-decoration: underline;
    }
    &:first-of-type {
      margin-top: 143px;
    }
  }
  .close-btn {
    position: absolute;
    top: 34px;
    right: 34px;
  }
  @media (max-width: $breakpoint-sm) {
    display: flex;
    flex-direction: column;
  }
}
</style>
