<template>
  <div :class="$style.container">
    <div v-if="mask" :class="$style.background"></div>
    <div :class="$style.content">
      <div :class="$style.first"></div>
      <div :class="$style.second"></div>
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
      mask: {
        type: Boolean,
        default: true
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
		computed: {},
		methods: {}
	}
</script>

<style module>
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    margin: auto;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000000;
  }

  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;
  }

  .content {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .content .first {
    width: 100%;
    height: 100%;
    border: 5px solid black;
    box-shadow: 0 0 10px white;
    animation: first 2s infinite linear;
  }

  .content .second {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 5px solid white;
    box-shadow: 0 0 10px black;
    animation: second 2s infinite linear;
  }

  @keyframes first{
    0%   {
      transform: rotate(0) scale(1);
      border-width: 5px;
      border-radius: 0;
    }
    25%   {
      transform: rotate(-90deg) scale(0.8);
      border-width: 0px;
      border-radius: 5px;
    }
    50%   {
      transform: rotate(-180deg) scale(1);
      border-width: 5px;
      border-radius: 0;
    }
    75%   {
      transform: rotate(-270deg) scale(1.2);
      border-width: 9px;
      border-radius: 5px;
    }
    100% {
      transform: rotate(-360deg) scale(1);
      border-width: 5px;
      border-radius: 0;
    }
  }

  @keyframes second{
    0%   {
      transform: rotate(45deg) scale(1);
      border-width: 5px;
      border-radius: 0;
    }
    25%  {
      transform: rotate(135deg) scale(1.2);
      border-width: 9px;
      border-radius: 5px;
    }
    50%  {
      transform: rotate(225deg) scale(1);
      border-width: 5px;
      border-radius: 0;
    }
    75%  {
      transform: rotate(135deg) scale(0.8);
      border-width: 0px;
      border-radius: 5px;
    }
    100% {
      transform: rotate(405deg) scale(1);
      border-width: 5px;
      border-radius: 0;
    }
  }
</style>
