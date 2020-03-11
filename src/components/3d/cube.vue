<template>
  <div :class="$style.container">
    <div :class="$style.front">front</div>
    <div :class="$style.back">back</div>
    <div :class="$style.left">left</div>
    <div :class="$style.right">right</div>
    <div :class="$style.top">top</div>
    <div :class="$style.bottom">bottom</div>
  </div>
</template>

<script>
    export default {
        name: 'cube',
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
  .container {
    width: 100px;
    height: 100px;
    position: relative;
    animation: cube 10s linear infinite;
    backface-visibility: visible;
    transform-style: preserve-3d;
    /*transform: rotateX(-45deg) rotateY(45deg);*/
  }

  @keyframes cube {
    0%   {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    50%  {
      transform: rotateX(180deg) rotateY(180deg) rotateZ(180deg);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }

  .container > div {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 100px;
  }

  .top {
    background: rgba(255, 98, 73, 0.47);
    transform: rotateX(90deg) translateZ(50px);
  }

  .bottom {
    background: rgba(0, 0, 0, 0.3);
    transform: rotateX(-90deg) translateZ(50px);
  }

  .left {
    background: rgba(124, 252, 0, 0.37);
    transform: rotateY(-90deg) translateX(0px) translateY(0px) translateZ(50px);
  }

  .right {
    background: rgba(255, 0, 0, 0.33);
    transform: rotateY(90deg) translateX(0px) translateY(0px) translateZ(50px);
  }

  .front {
    background: rgba(255, 0, 255, 0.33);
    transform: translateZ(50px);
  }

  .back {
    background: rgba(0, 0, 255, 0.34);
    transform: translateZ(-50px);
  }
</style>
