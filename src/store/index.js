import Vue from 'vue';
import Vuex from 'vuex';

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
  },
  actions: {
  },
  modules: {
  },
});
