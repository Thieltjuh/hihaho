<template>
  <div class="container">
    <!-- Gallery -->
    <Gallery v-if="!isMobile" />

    <!-- Mobile Gallery -->
    <GalleryMobile v-if="isMobile" />
  </div>
</template>

<script>
import Gallery from './Gallery.vue';
import GalleryMobile from './GalleryMobile.vue';
import IsMobileMixin from '../mixins/detectMobile.js';

export default {
  name: 'Home',
  components: {
    Gallery,
    GalleryMobile,
  },
  mixins: [IsMobileMixin],
};
</script>