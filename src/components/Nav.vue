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
        <button class="btn-link menu-btn" @click="openMobileNav"><hamburgerIcon /></button>
    </nav>
    <nav class="mobile-nav" :class="{'active': mobileNavActive}" :aria-hidden="mobileNavActive ? false : true" >
      <button class="btn-link close-btn" type="button" @click="closeMobileNav" :tabindex="mobileNavActive ? 0 : -1"><closeIcon /></button>
      <a class="link" @click="handleNavigation('robots')" @keypress.enter="handleNavigation('robots')" :tabindex="mobileNavActive ? 0 : -1">Robots</a>
      <a class="link" @click="handleNavigation('results')" @keypress.enter="handleNavigation('results')" :tabindex="mobileNavActive ? 0 : -1">Results</a>
      <a v-if="isAdmin" @click="handleNavigation('admin')" @keypress.enter="handleNavigation('admin')" class="link" :tabindex="mobileNavActive ? 0 : -1">Admin</a>
      <button class="btn-link link" type="button" @click="handleLogOut" :tabindex="mobileNavActive ? 0 : -1">Log Out</button>
    </nav>
  </section>
</template>

<script>
import logo from '@/assets/logo.png';
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
    };
  },
  methods: {
    handleLogOut() {
      this.$store.dispatch('logout');
    },
    handleNavigation(path) {
      this.closeMobileNav();
      this.$router.push(`/${path}`);
    },
    openMobileNav() {
      this.$emit('open-nav');
    },
    closeMobileNav() {
      this.$emit('close-nav');
    },
  },
  props: {
    mobileNavActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.nav-background {
  background-color: $white;
  overflow: hidden;
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
    &.secondary.btn-link {
      margin-right: 0;
    }
  }
  .secondary-links {
    margin-left: auto;
  }
  .menu-btn {
    display: none;
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
      display: inline-block;
      margin-left: auto;
      margin-right: 30px
    }
  }
}
.mobile-nav {
  align-items: center;
  background-color: $gray-3;
  color: $gray-1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 1000px;
  position: absolute;
  transform: translate(100%);
  transition: transform linear .4s, left ease .6s;
  top: 0;
  width: 100vw;
  z-index: 999;
  &.active {
    transform: translate(0);
    left: 0;
  }

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
}
</style>
