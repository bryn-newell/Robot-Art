<template>
  <section>
    <h1 class="page-heading">Robots</h1>
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
