<template>
  <div class="card robot-card">
    <h3 class="card-title">{{ robot.name }}</h3>
    <img src="../assets/Wall-E.png" :alt="robot.name">
    <div class="btn-row" v-if="page === 'Admin'">
      <button class="btn" type="button" @click="handleEdit">Edit</button>
      <button class="btn-secondary" type="button" @click="handleDelete">Delete</button>
    </div>
    <button v-if="page === 'Robots'" class="btn" @click="handleVote" :disabled="voteCast">{{ isSelectedRobot ? 'Vote Cast' : 'Vote' }}</button>
    <div class="voting-results" v-if="page === 'Results'">
      <div>
        <span class="votes">{{robot.votes}}</span> /{{totalVotes}}
        <span class="sr-only">Votes</span>
      </div>
      <div class="result-container"><div class="result-bar" :style="{width: resultsBarWidth}"></div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'totalVotes',
      'currentUserVoted',
      'selectedRobot',
    ]),
    isSelectedRobot() {
      return this.selectedRobot === this.robot.name;
    },
    resultsBarWidth() {
      const percentage = (this.robot.votes / this.totalVotes) * 100;
      return `${percentage}%`;
    },
    voteCast() {
      return this.currentUserVoted;
    },
  },
  methods: {
    handleDelete() {
      this.$store.commit('removeRobot', this.robot.name);
    },
    handleEdit() {
      // TO DO
      const newRobotObj = {};
      this.$store.commit('editRobot', newRobotObj);
    },
    handleVote() {
      this.$store.dispatch('submitVote', this.robot.name);
    },
  },
  props: {
    robot: {
      type: Object,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.robot-card {
  max-width: 397px;
  padding: 24px;
  img {
    height: 321px;
    margin-top: 20px;
    width: 349px;
  }
  .btn-row {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    width: 100%;
    .btn {
      margin-right: 24px;
    }
  }
  .voting-results {
    color: $gray-2;
    font-weight: bold;
    width: 100%;
    .votes {
      font-size: $font-size-40;
      color: $gray-3;
    }
    .result-container {
      border-radius: $border-radius;
      border: 2px solid $gray-1;
      height: 34px;
      position: relative;
      width: 100%;
      .result-bar {
        background-color: $gray-3;
        border-radius: $border-radius;
        content: '';
        height: 26px;
        left: 2px;
        position: absolute;
        top: 2px;
      }
    }
  }

  @media (max-width: $breakpoint-sm) {
    max-width: 359px;
    img {
      height: 321px;
      width: 311px;
    }
  }
}
</style>
