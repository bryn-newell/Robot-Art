import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    robots: [
      {
        name: 'Bender',
        votes: 5,
      },
      {
        name: 'Megazord',
        votes: 5,
      },
      {
        name: 'Rosie',
        votes: 5,
      },
      {
        name: 'Voltron',
        votes: 5,
      },
      {
        name: 'Wall-E',
        votes: 5,
      },
    ],
    totalVotes: 25,
  },
  mutations: {
    addRobot() {
      // TO DO
    },
    removeRobot() {
      // TO DO
    },
  },
  actions: {
  },
  modules: {
  },
});
