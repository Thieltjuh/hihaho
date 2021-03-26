export default {
  data() {
    return {
      sort: 'id',
      order: 'asc'
    }
  },
  methods: {
    changeSorting: function (sort, order) {
      this.sort = sort;
      this.order = order;
    },
  }
};