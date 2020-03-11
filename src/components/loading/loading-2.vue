<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.x"></div>
      <div :class="$style.y"></div>
      <div :class="$style.z"></div>
    </div>
  </div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {};
		},
		props: [],
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {},
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {},
		methods: {}
	}
</script>

<style module>
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .content {
    position: absolute;
    width: 6.25rem;
    height: 6.25rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    /* animation: contentani 5s infinite linear; */
  }

  @keyframes contentani{
    0%   {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .x,
  .y,
  .z,
  .x:before,
  .y:before,
  .z:before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* border: 0.3125rem solid; */
  }

  .x {
    border-color: red;
    animation: x 2s infinite linear;
  }

  .y {
    border-color: blue;
    animation: y 3s infinite linear;
  }

  .z {
    border-color: green;
    animation: z 5s infinite linear;
  }

  .x:before,
  .y:before,
  .z:before {
    content: '';
    transform: rotateZ(45deg);
    border: 5px solid;
    border-radius: 50%;
    transform-origin: center;
  }

  .x:before {
    border-color: red;
  }

  .y:before {
    border-color: blue;
  }

  .z:before {
    border-color: green;
  }

  @keyframes x{
    0%   {
      transform: rotateX(0);
    }
    100% {
      transform: rotateX(360deg);
    }
  }

  @keyframes y{
    0%   {
      transform: rotateZ(135deg) rotateY(0);
    }
    100% {
      transform: rotateZ(135deg) rotateY(360deg);
    }
  }

  @keyframes z{
    0%   {
      transform: rotateZ(45deg) rotateY(0);
    }
    100% {
      transform: rotateZ(45deg) rotateY(360deg);
    }
  }
</style>
