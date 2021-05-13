import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    robots: {
      Bender: {
        name: 'Bender',
        votes: 0,
      },
      Megazord: {
        name: 'Megazord',
        votes: 0,
      },
      Rosie: {
        name: 'Rosie',
        votes: 0,
      },
      Voltron: {
        name: 'Voltron',
        votes: 0,
      },
      'Wall-E': {
        name: 'Wall-E',
        votes: 0,
      },
    },
    totalVotes: 0,
    currentUserVoted: false,
    selectedRobot: null,
    userAuthed: false,
    isAdmin: false,
    user: {},
  },
  mutations: {
    addRobot(state, newRobot) {
      const { name } = newRobot;
      Vue.set(state.robots, name, newRobot);
    },
    editRobot() {
      // TO DO
    },
    removeRobot(state, robotName) {
      if (state.robots[robotName]) {
        Vue.delete(state.robots, robotName);
      }
    },
    voteForRobot(state, robotName) {
      state.totalVotes += 1;
      state.currentUserVoted = true;
      state.selectedRobot = robotName;
      const robot = state.robots[robotName];
      if (robot) {
        robot.votes += 1;
      }
    },
    userLogin(state) {
      state.userAuthed = true;
    },
    userLogout(state) {
      state.userAuthed = false;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit('setUser', userProfile.data());
      router.push('/robots');
    },
    async registerUser({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        fullName: form.fullName,
      })
      dispatch('fetchUserProfile', user)
    },
  },
});
