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
import { mapState } from 'vuex';

export default {
  components: {
    RobotCard,
  },
  computed: {
    ...mapState([
      'robots',
    ]),
  },
};
</script>
