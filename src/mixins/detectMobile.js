export default {
  data() {
    return {
      isMobile: false,
    }
  },
  methods: {
    checkMobileSize: function () {
      this.isMobile = false;

      if (window.innerWidth < 600) {
        this.isMobile = true;
      }
    },
  },
  created() {
    this.checkMobileSize();
    window.addEventListener('resize', this.checkMobileSize);
  },
  unmounted() {
    window.removeEventListener('resize', this.checkMobileSize);
  },
};