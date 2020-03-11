<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  class Sakura {
    constructor() {
      this.x = 200;
      this.y = 200;
      this.width = 100;
      this.height = 100;
      this.disWidth = 100;
      this.disHeight = 100;
      this.angle = {x: 0, y: 0, z: 0};
      this.image = Sakura.drawImage(width, height);
    };
    rotateX() {
      this.disHeight = this.height * Math.cos(this.angle.x);
      this.y = this.y * Math.cos(this.angle.x)
    };
    static drawImage(width, height) {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d');
      context.fillStyle = 'rgba(0, 255, 0, 0.5)';
      context.fillRect(0, 0, width, height);
      return canvas;
    }
  }
  export default {
    name: 'sakura-canvas',
    data() {
      return {
        animation: null,
        sakuraArr: []
      };
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
      this.sakuraArr.push(new Sakura());
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
    methods: {
      draw() {
        this.animation = requestAnimationFrame(this.draw);
        /**
         * @type {HTMLCanvasElement}
         */
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');
        context.rect()
      }
    }
  }
</script>

<style module>
</style>
