<template>
  <section class="admin">
    <h1 class="page-heading">Admin</h1>
    <section class="card-row">
      <RobotCard v-for="(robot,index) in robots" :robot="robot" :key="index" />
    </section>
  </section>
</template>

<script>
import RobotCard from '@/components/RobotCard.vue';

export default {
  components: {
    RobotCard,
  },
  data() {
    return {
      robots: [
        { name: 'Bender' },
        { name: 'Megazord' },
        { name: 'Rosie' },
        { name: 'Voltron' },
        { name: 'Wall-E' },
      ],
    };
  },
};
</script>

<style lang="scss">
.admin {
  .card-row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -25px;
    .card {
      margin-right: 25px;
      margin-bottom: 34px;
    }
  }
}
</style>
