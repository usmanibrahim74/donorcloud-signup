export default {
  data() {
    return {
      /* data */
    };
  },
  methods: {
    $formatAmount(amount) {
      return "£" + parseFloat(amount).toFixed(2);
    },
  },
};
