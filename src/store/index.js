import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';
import router from '../router/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    errors: [],
    isAdmin: false,
    robots: [],
    totalVotes: 0,
    currentUserVoted: false,
    selectedRobot: null,
  },
  mutations: {
    setUser(state, user) {
      // TO DO fix caching issue in prod for state and user refresh after new login
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
    setErrors(state, errors) {
      state.errors = [...state.errors, errors];
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
  actions: {
    // Users
    async login({ commit, dispatch }, form) {
      try {
        let user;
        // Since GCP auth doesn't have username/email sing in methods by default this is a temporary (to be changed in the future) hack to allow a username only for the Admin
        if (form.email === 'Admin') {
          const adminEmail = 'admin@mondorobot.com';
          const res = await fb.auth.signInWithEmailAndPassword(adminEmail, form.password);
          user = res.user;
        } else {
          const res = await fb.auth.signInWithEmailAndPassword(form.email, form.password);
          user = res.user;
        }
        dispatch('fetchUserProfile', user);
        commit('clearErrors');
      } catch (error) {
        console.error(error);
        commit('setErrors', error);
      }
    },
    async loginWithGoogle({ commit, dispatch }) {
      const { provider } = fb;
      fb.auth
        .signInWithPopup(provider)
        .then((result) => {
          const { user } = result;
          dispatch('fetchUserProfile', user);
        }).catch((error) => {
          console.error(error);
          commit('setErrors', error);
        });
    },
    async fetchUserProfile({ commit, dispatch }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit('setUser', userProfile.data());
      dispatch('fetchAllRobots');
      // Leaves user on current page if reload/refresh or sends to Robots view from login/regsiter
      if (router.currentRoute.path === '/') {
        router.push('/robots');
      }
    },
    async registerUser({ commit, dispatch }, form) {
      try {
        const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password);
        await fb.usersCollection.doc(user.uid).set({
          fullName: form.fullName,
          isAdmin: false,
          hasVoted: false,
        });
        dispatch('fetchUserProfile', user);
        commit('clearErrors');
      } catch (error) {
        console.error(error);
        commit('setErrors', error);
      }
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUser', null);
      router.push('/');
    },

    // Voting
    async submitVote({ dispatch }, robotName) {
      const robotRef = fb.robotsCollection.doc(robotName);
      const robotDoc = await robotRef.get();
      const robotData = robotDoc && robotDoc.data();
      let votes;
      if (robotData && robotData.hasOwnProperty('votes')) {
        votes = robotData.votes + 1;
      }
      await robotRef.update({ votes });

      dispatch('fetchAllRobots');
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

    // Robots
    async fetchAllRobots({ commit, dispatch }) {
      const robotsArray = [];
      await fb.robotsCollection.get().then((querySnapshot) => {
        let totalVotes = 0;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const robot = doc.data();
          robot.id = doc.id;
          totalVotes += robot.votes;
          robotsArray.push(robot);
        });
        commit('setTotalVotes', totalVotes);
      });
      dispatch('fetchAllImages', robotsArray);
    },
    async fetchAllImages({ commit }, robotsArray) {
      // Download image from firebase storage
      const newRobotsArray = [];
      await Promise.all(robotsArray.map(async (robot) => {
        const newRobotObj = { ...robot };
        fb.fbStorage.ref().child(`robotImages/${robot.imgName}`).getDownloadURL()
          .then((url) => {
            newRobotObj.imagePath = url;
            newRobotsArray.push(newRobotObj);
          })
          .catch((error) => {
            console.error(error);
          });
      }));
      commit('setRobots', newRobotsArray);
    },
    async addRobot({ dispatch }, robotObj) {
      const { name, file } = robotObj;
      const newRobotObj = { ...robotObj };
      delete newRobotObj.file;
      newRobotObj.createdOn = new Date();
      await fb.robotsCollection.doc(name).set(newRobotObj);
      await dispatch('uploadRobotImage', file);
      dispatch('fetchAllRobots');
    },
    async removeRobot({ dispatch }, robotName) {
      await fb.robotsCollection.doc(robotName).delete();
      dispatch('fetchAllRobots');
    },
    async uploadRobotImage(context, file) {
      try {
        if (file && file.name) {
          const filePath = `robotImages/${file.name}`;
          const metadata = { contentType: file.type };

          await fb.fbStorage.ref()
            .child(filePath)
            .put(file, metadata);
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.processing = false;
      }
    },
  },
});

export default store;
