<template>
  <div class="circle-process">
    <svg class="process-svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" :stroke="pathStroke" stroke-width="10" fill="rgba(0,0,0,0)" />
      <circle cx="50" cy="50" r="45" :stroke="processStroke" stroke-width="10" fill="rgba(0,0,0,0)" :stroke-dasharray="processLength" transform="rotate(-90,50 50)"/>
      <text x="50" y="45" dy=".3em" text-anchor="middle" dominant-baseline="middle">
        {{value}}%
      </text>
    </svg>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        strokeWidth: 10
      };
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      pathStroke: {
        type: String,
        default: 'rgba(136,136,136,0.2)'
      },
      processStroke: {
        type: String,
        default: 'cyan'
      }
    },
    components: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
      // const that = this;
      // setInterval(()=>{
      //   that.value = (++that.value) % 100;
      // },50);
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    computed: {
      processLength() {
        const percent = this.value / 100;
        const perimeter = 2 * Math.PI * 45;
        return `${perimeter * percent} ${perimeter * (1 - percent)}`;
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .circle-process {
    position: relative;
    transition: all 0.5s;
  }

  .process-svg {
    width: 100%;
    height: 100%;
  }

  text {
    text-anchor: middle;  /* 文本水平居中 */
    dominant-baseline: middle; /* 文本垂直居中 */
  }
</style>
