<template>
  <section>
    <h1 class="page-heading">Results</h1>
    <section class="card-row">
      <RobotCard v-for="(robot,index) in robots" :robot="robot" :key="index" page="Results" />
    </section>
  </section>
</template>

<script>
import RobotCard from '@/components/RobotCard.vue';
import RobotMixin from '@/components/mixins/RobotMixin.vue';

export default {
  components: {
    RobotCard,
  },
  mixins: [RobotMixin],
};
</script>
