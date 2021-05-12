<template>
  <section class="login-view">
    <section class="card login-card">
      <h1 class="sr-only">{{this.isRegister ? 'Register' : 'Log in'}}</h1>
      <img :src="logo" alt="Mondo Robot">
      <form @submit.prevent="checkForm">
        <label v-if="isRegister" for="fullname-input">Full Name</label>
        <input v-if="isRegister" type="text" id="fullname-input" name="fullname" v-model="fullName">
        <label for="email-input">Email</label>
        <input type="email" id="email-input" name="email" v-model="email">
        <label for="password-input">Password</label>
        <input type="password" id="password-input" name="password" v-model="password">
        <button class="btn" @click="handleLogin" :type="isRegister? 'button' : 'submit'">Log in</button>
        <button class="btn-secondary" @click="handleRegister" :type="isRegister ? 'submit' : 'button'">Register</button>
        <p v-for="(error, index) in formErrors" :key="index">{{error}}</p>
      </form>
    </section>
  </section>
</template>

<script>
import logo from '@/assets/Logo.png';

export default {
  data() {
    return {
      logo,
      isRegister: false,
      fullName: null,
      email: null,
      password: null,
      formErrors: [],
    };
  },
  methods: {
    checkForm() {
      this.formErrors = [];
      if (this.isRegister) {
        if (this.fullName && this.email && this.password) {
          return;
        }
      }
      if (this.email && this.password) {
        return;
      }
      if (!this.fullName) {
        this.formErrors.push('Full name is required');
      }
      if (!this.email) {
        this.formErrors.push('Valid email address is required');
      }
      if (!this.password) {
        this.formErrors.push('Password is required');
      }
    },
    handleLogin(e) {
      if (this.isRegister) {
        this.formErrors = [];
        this.isRegister = false;
        e.preventDefault();
      } else {
        this.$store.commit('userLogin', { email: this.email, password: this.password });
      }
    },
    handleRegister(e) {
      if (!this.isRegister) {
        this.formErrors = [];
        this.isRegister = true;
        e.preventDefault();
      } else {
        // TO DO - handle register new user
      }
    },
  },
};
</script>

<style lang="scss">
.login-view {
  padding-top: 97px;
}
.login-card {
  max-width: 607px;
  margin: 0 auto;
  padding: 54px;
  img {
    height: 91px;
    margin-top: 26px;
    margin-bottom: 84px;
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
    padding: 24px;
    margin: 0;
    img {
      height: 65px;
      margin-top: 50px;
      margin-bottom: 77px;
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
