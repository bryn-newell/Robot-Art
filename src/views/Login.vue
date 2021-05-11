<template>
  <section class="login-card">
    <img :src="logo" alt="Mondo Robot">
    <label v-if="isRegister" for="fullname-input">Full Name</label>
    <input v-if="isRegister" type="text" id="fullname-input">
    <label for="email-input">Email</label>
    <input type="email" id="email-input">
    <label for="password-input">Password</label>
    <input type="password" id="password-input">
    <button class="btn">Log in</button>
    <button class="btn-secondary" @click="isRegister = true">Register</button>
  </section>
</template>

<script>
import logo from '@/assets/Logo.png';

export default {
  data() {
    return {
      logo,
      isRegister: false,
    };
  },
};
</script>

<style lang="scss">
.login-card {
  align-items: center;
  background-color: $white;
  border-radius: $border-radius;
  border: 1px solid $gray-1;
  box-shadow: 0px 23px 30px -9px rgba(0, 0, 0, 0.17);
  display: flex;
  flex-direction: column;
  max-width: 607px;
  margin: 0 auto;
  padding: 54px;
  img {
    height: 91px;
    margin: 84px 0;
    width: 233px;
  }
  input {
    margin-bottom: 44px;
  }
  #password-input {
    margin-bottom: 56px;
  }
  .btn {
    margin-bottom: 18px;
  }
  .btn-secondary {
    margin-bottom: 54px;
  }

  @media (max-width: $breakpoint-sm) {
    height: 100vh;
    img {
      height: 65px;
      margin: 74px 0;
      width: 165px;
    }
    input {
      margin-bottom: 28px;
    }
    #password-input {
      margin-bottom: 60px;
    }
  }
}
</style>
