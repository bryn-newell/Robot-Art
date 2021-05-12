import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    robotObjects: {
      Bender: {
        name: 'Bender',
        votes: 5,
      },
      Megazord: {
        name: 'Megazord',
        votes: 5,
      },
      Rosie: {
        name: 'Rosie',
        votes: 5,
      },
      Voltron: {
        name: 'Voltron',
        votes: 5,
      },
      WallE: {
        name: 'Wall-E',
        votes: 5,
      },
    },
    totalVotes: 25,
    currentUserVoted: false,
    selectedRobot: null,
  },
  mutations: {
    addRobot() {
      // TO DO
    },
    removeRobot() {
      // TO DO
    },
    voteForRobot(state, robotName) {
      state.totalVotes += 1;
      state.currentUserVoted = true;
      state.selectedRobot = robotName;
      const robot = state.robotObjects[robotName];
      if (robot) {
        robot.votes += 1;
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
