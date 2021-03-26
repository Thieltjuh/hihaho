<template>
  <!-- Gallery -->
  <div class="gallery">
    <h1>Simple Gallery</h1>

    <!-- Sort -->
    <Sort @sort-event="sortAlbums" sort="id" :sortList="['asc', 'desc']" />

    <div class="row">
      <div><br /></div>
      <div class="col-lg-2 col-md-3 col-sm-4 mb-3 mb-lg-3" v-for="album in getCurrentPageAlbums()" :key="album.id">
        <div class="clickable-image" v-on:click="setCurrentImage(album)" data-ripple-color="light" data-bs-toggle="modal" data-bs-target="#modalView">
          <img :src="album.thumbnailUrl" :alt="album.title" :title="album.title" />
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <pagination v-model="page" :records="albumLength" :per-page="limitPerPage" @paginate="getAlbums" />
  </div>

  <!-- Modal -->
  <Modal title="Image view" :image="this.currentImage" :imageTitle="this.currentImageTitle" />
</template>

<script>
import axios from 'axios';
import Pagination from 'v-pagination-3';
import Modal from './Modal.vue';
import SortMixin from '../mixins/sort.js';
import Sort from './Sort.vue';

export default {
  name: 'Gallery',
  components: {
    Pagination,
    Modal,
    Sort,
  },
  data() {
    return {
      page: 1,
      albums: [],
      albumLength: 0,
      currentImage: '',
      currentImageTitle: '',
      limitPerPage: 20,
    };
  },
  methods: {
    sortAlbums: function (order) {
      this.changeSorting('id', order);
      this.albums = [];
      this.getAlbums();
    },
    setCurrentImage: function (image) {
      this.currentImage = image.url;
      this.currentImageTitle = image.title;
    },
    getCurrentPageAlbums: function () {
      if (this.albums.find((album) => album.page === this.page)) {
        return this.albums.find((album) => album.page === this.page).data;
      }
      return [];
    },
    getAlbums: function () {
      if (!this.albums.find((album) => album.page === this.page)) {
        this.addAlbums();
      }
    },
    addAlbums: function () {
      axios.get( `http://localhost:5000/albums?_page=${this.page}&_limit=${this.limitPerPage}&_sort=${this.sort}&_order=${this.order}`)
        .then((res) => {
            this.albums.push({
              page: this.page,
              data: res.data,
            });
          }, (error) => {
            console.log(error);
          }
        );
    },
  },
  created() {
    axios.get(`http://localhost:5000/albumLength`)
      .then((res) => {
          this.albumLength = res.data[0];
          this.getAlbums();
        }, (error) => {
          console.log(error);
        }
      );
  },
  mixins: [SortMixin],
};
</script>