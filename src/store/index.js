import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    isAdmin: false,
    robots: [],
    totalVotes: 0,
    currentUserVoted: false,
    selectedRobot: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user && user.hasVoted) {
        state.currentUserVoted = true;
      }
      if (user && user.selectedRobot) {
        state.selectedRobot = user.selectedRobot;
      }
      if (user && user.isAdmin) {
        state.isAdmin = true;
      }
    },
    setRobots(state, robots) {
      state.robots = robots;
    },
    setTotalVotes(state, totalVotes) {
      state.totalVotes = totalVotes;
    },
    editRobot() {
      // TO DO
    },
    removeRobot(state, robotName) {
      if (state.robots[robotName]) {
        Vue.delete(state.robots, robotName);
      }
    },
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
      dispatch('fetchUserProfile', user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit('setUser', userProfile.data());
      // Leaves user on current page if reload/refresh or sends to Robots view from login/regsiter
      if (router.currentRoute.path === '/') {
        router.push('/robots');
      }
    },
    async registerUser({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
      await fb.usersCollection.doc(user.uid).set({
        fullName: form.fullName,
        isAdmin: false,
        hasVoted: false,
      });
      dispatch('fetchUserProfile', user);
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUser', null);
      router.push('/');
    },
    async submitVote({ dispatch }, robotName) {
      const robotRef = fb.robotsCollection.doc(robotName);
      const robotDoc = await robotRef.get();
      const robotData = robotDoc && robotDoc.data();
      let votes;
      if (robotData && robotData.votes) {
        votes = robotData.votes + 1;
      }
      await robotRef.update({ votes });

      dispatch('updateUserVote', robotName);
    },
    async updateUserVote({ dispatch }, robotName) {
      const userId = fb.auth.currentUser.uid;
      await fb.usersCollection.doc(userId).update({
        hasVoted: true,
        selectedRobot: robotName,
      });
      dispatch('fetchUserProfile', { uid: userId });
    },
    async addRobot(context, robotObj) {
      const { name } = robotObj;
      await fb.robotsCollection.doc(name).set(robotObj);
    },
  },
});

// realtime firebase
fb.robotsCollection.onSnapshot((snapshot) => {
  const robotsArray = [];
  let totalVotes = 0;

  snapshot.forEach((doc) => {
    const robot = doc.data();
    robot.id = doc.id;
    totalVotes += robot.votes;
    robotsArray.push(robot);
  });
  store.commit('setTotalVotes', totalVotes);
  store.commit('setRobots', robotsArray);
});

export default store;
