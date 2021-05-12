<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'robotObjects',
    ]),
    robots() {
      return Object.values(this.robotObjects);
    },
  },
};
</script>
