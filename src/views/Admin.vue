<template>
  <section class="admin">
    <h1 class="page-heading">Admin</h1>
    <section class="card-row">
      <UploadCard />
      <RobotCard v-for="(robot,index) in robots" :robot="robot" :key="index" />
    </section>
  </section>
</template>

<script>
import RobotCard from '@/components/RobotCard.vue';
import UploadCard from '@/components/UploadCard.vue';

export default {
  components: {
    RobotCard,
    UploadCard,
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
    justify-content: space-between;
    width: 100%;
    .card {
      margin-bottom: 34px;
    }
    @media (max-width: 874px) {
      justify-content: center;
    }
  }
}
</style>
