<template>
  <div :class="$style.container">
    <div :class="$style.line"></div>
    <div :class="$style.content">
      <div :class="$style.box"></div>
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
    /* transform: rotate(45deg); */
  }

  .line {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: black;
    transform: translateY(50px);
  }

  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    animation: box 5s infinite linear;
  }

  .box:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: 5px solid cyan;
    transform: rotate(45deg);
  }

  @keyframes box{
    0%   {
      transform: translateY(0);
    }
    5%  {
      transform: translateY(-50%);
    }
    10%  {
      transform: translateY(0);
    }
    15%  {
      transform: translateY(-50%);
    }
    20%  {
      transform: translateY(0);
    }
    25%  {
      transform: translateY(-100%) rotateY(0);
    }
    30%  {
      transform: translateY(-100%) rotateY(360deg);
    }
    35%  {
      transform: translateY(-100%) rotateY(0deg);
    }
    40%  {
      transform: translateY(-100%) rotateY(360deg);
    }
    45%  {
      transform: translateY(0);
    }
    50%  {
      transform: translateY(-50%);
    }
    55%  {
      transform: translateY(0);
    }
    60%  {
      transform: translateY(-100%) rotateZ(0);
    }
    65%  {
      transform: translateY(-100%) rotateZ(360deg);
    }
    70%  {
      transform: translateY(-100%) rotateZ(0deg);
    }
    75%  {
      transform: translateY(-100%) rotateZ(360deg);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
