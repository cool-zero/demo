<template>
  <div :class="$style['hexagon-item']" 
      :style="{width: sideLength * 1.1 +'px', height: sideLength * 1.1 + 'px'}">
    <svg :class="$style['hexagon-border']" viewBox="0 0 200 200">
      <use xlink:href="#hexagonPath" fill="none" stroke="cyan" stroke-width="8" />
    </svg>
    <div :class="$style['hexagon-img-outer']" 
        :style="{width: sideLength+'px', height: sideLength+'px'}">
      <img src="../../assets/1.png" :class="$style['hexagon-img']" />
    </div>
  </div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {};
		},
		props: {
      src: {
        type: String
      },
      sideLength: {
        type: Number,
        default: 100
      }
    },
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {},
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {

    },
		methods: {
      doMousemove(e) {
        // console.log(e.currentTarget);
      }
    }
	}
</script>

<style module>
  .hexagon-item {
    position: relative;
    clip-path: url(#clipHexagon);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hexagon-border {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    /* transform: translate(-50%, -50%); */
    display:none;
    background: transparent;
  }
  
  .hexagon-border-inner {
    
  }

  .hexagon-img-outer {
    clip-path: url(#clipHexagon);
    overflow: hidden;
  }

  .hexagon-item:hover .hexagon-border {
    display: block;
  }

  .hexagon-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
