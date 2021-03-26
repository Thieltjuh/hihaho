<template>
  <!-- Gallery Mobile -->
  <div class="gallery gallery--mobile">
    <h1>Simple Mobile Gallery</h1>

    <!-- Sort -->
    <Sort @sort-event="sortAlbums" sort="id" :sortList="['asc', 'desc']" />

    <div class="row">
      <div class="col mb-3" v-for="album in albums" :key="album.id">
        <img :src="album.thumbnailUrl" :alt="album.title" :title="album.title" />
      </div>
    </div>
  </div>

  <button id="scrollToTop" type="button" v-on:click="scrollToTOp()" class="btn btn-dark backToTop button-hidden">
    Back to Top
  </button>
</template>

<script>
import axios from 'axios';
import SortMixin from '../mixins/sort.js';
import Sort from './Sort.vue';

export default {
  name: 'GalleryMobile',
  components: {
    Sort,
  },
  data() {
    return {
      page: 1,
      albums: [],
      limitPerPage: 20,
    };
  },
  methods: {
    sortAlbums: function (order) {
      this.changeSorting('id', order);
      this.albums = [];
      this.getAlbums();
    },
    scrollToTOp: function () {
      $('html, body').animate({ scrollTop: 0 }, 'fast');
    },
    onScroll: function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.page += 1;
        this.getAlbums();
      }

      if (window.scrollY > 100) {
        $('#scrollToTop').removeClass('button-hidden');
        $('#scrollToTop').addClass('button-visible');
      } else {
        $('#scrollToTop').addClass('button-hidden');
        $('#scrollToTop').removeClass('button-visible');
      }
    },
    getAlbums: function () {
      axios.get( `http://localhost:5000/albums?_page=${this.page}&_limit=${this.limitPerPage}&_sort=${this.sort}&_order=${this.order}`)
        .then((res) => {
            this.albums = [...this.albums, ...res.data];
          }, (error) => {
            console.log(error);
          }
        );
    },
  },
  created() {
    window.addEventListener('scroll', this.onScroll);
    this.getAlbums();
  },
  unmounted() {
    window.removeEventListener('scroll', this.onScroll);
  },
  mixins: [SortMixin],
};
</script>