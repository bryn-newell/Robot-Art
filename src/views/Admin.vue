<template>
  <section>
    <h1 class="page-heading">Admin</h1>
    <section class="card-row">
      <UploadCard />
      <RobotCard v-for="(robot,index) in robots" :robot="robot" :key="index" page="Admin" />
    </section>
  </section>
</template>

<script>
import RobotCard from '@/components/RobotCard.vue';
import UploadCard from '@/components/UploadCard.vue';
import RobotMixin from '@/components/mixins/RobotMixin.vue';

export default {
  components: {
    RobotCard,
    UploadCard,
  },
  mixins: [RobotMixin],
};
</script>
