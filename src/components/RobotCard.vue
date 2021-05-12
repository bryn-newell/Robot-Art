<template>
  <div class="card robot-card">
    <h3 class="card-title">{{ robot.name }}</h3>
    <img src="../assets/Wall-E.png" :alt="robot.name">
    <div class="btn-row">
      <button class="btn" type="button" @click="handleEdit">Edit</button>
      <button class="btn-secondary" type="button" @click="handleDelete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleDelete() {
      // TO DO
    },
    handleEdit() {
      // TO DO
    },
  },
  props: {
    robot: {
      type: Object,
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
    width: 349px;
  }
  .btn-row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .btn {
      margin-right: 24px;
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
