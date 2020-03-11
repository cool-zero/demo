<template>
  <svg :class="$style.template">
    <defs>
      <linearGradient id="linearGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgba(230, 230, 232, 1)" ></stop>
        <stop offset="100%" style="stop-color:rgba(230, 230, 232, 1)" ></stop>
      </linearGradient>
      <linearGradient id="linearGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:rgba(230, 230, 232, 1)" ></stop>
        <stop offset="30%" style="stop-color:rgba(230, 230, 232, 0.95)" ></stop>
        <stop offset="50%" style="stop-color:rgba(230, 230, 232, 0.8)" ></stop>
        <stop offset="70%" style="stop-color:rgba(230, 230, 232, 0.95)" ></stop>
        <stop offset="100%" style="stop-color:rgba(230, 230, 232, 1)" ></stop>
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
    export default {
        name: 'linear-gradient-def',
        data() {
            return {};
        },
        props: {},
        components: {},
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        computed: {},
        methods: {}
    }
</script>

<style module>
  .template {
    width: 0;
    height: 0;
    display: none;
  }
</style>
