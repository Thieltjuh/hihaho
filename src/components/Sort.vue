<template>
  <div class="sorting">
    Sort by: {{this.sort}} on: 
    <span v-for="(sortOn, index) in sortList" :key="index">
        <a href="#" v-on:click="sortEvent(sortOn)">{{sortOn}}</a>
        <span v-if="index + 1 < sortList.length"> - </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Sort',
  props: {
    sort: '',
    sortList: Array,
  },
  emits: ['sort-event'],
  methods: {
    sortEvent: function (sortOn) {
      this.$emit('sort-event', sortOn);
    },
  },
};
</script>