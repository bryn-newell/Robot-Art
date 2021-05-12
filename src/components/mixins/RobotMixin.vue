<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'robots',
    ]),
  },
};
</script>
