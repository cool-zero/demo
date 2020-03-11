<template>
  <div :class="$style.container">
    <img :src="src" alt="" :class="$style.img">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
  class Star{
    constructor() {
      this.x = Math.random();
      this.y = Math.random();
      this.size = Math.random() * 10 + 10;
      this.scale = 0;
      this.duration = (Math.random() * 2 + 1) * 1000;
      this.changeTime = this.duration;
    }
    resetDuration() {
      this.changeTime = this.duration;
    }
    resetCoordinate() {
      this.x = Math.random();
      this.y = Math.random();
    }
  }
  class Firefly{
    constructor() {
      this.x = Math.random();
      this.y = Math.random();
      this.color =
        `rgba(${Math.random() * 255},
        ${Math.random() * 255},
        ${Math.random() * 255},
        ${Math.random()})`;
      this.speedX = Math.random() * 20 - 10;
      this.speedY = Math.random() * 20 - 10;
    }
    resetCoordinate() {
      this.x = Math.random();
      this.y = Math.random();
    }
  }
  export default {
    name: 'stars-glint',
    data() {
      return {
        requestAnimation: null,
        starArr: [],
        starImage: null,
        fireflyArr: [],
        lastTime: null,
      };
    },
    props: {
      src: {
        type: String,
        default: require('@/assets/shenshe.png')
      }
    },
    components: {},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      for (let i = 0; i < 50; i++) {
        this.starArr.push(new Star());
      }
      for(let i = 0; i < 20; i++) {
        this.fireflyArr.push(new Firefly());
      }
      this.starImage = this.drawStar();
      this.lastTime = Date.now();
      this.draw();
      const _this = this;
      window.addEventListener('visibilitychange',e => {
        if(document.hidden) {
          _this.stopAnimation();
        }else {
          _this.draw();
        }
      }, false);
      window.addEventListener('resize', e => {
        const canvas = _this.$refs.canvas;
        if(!canvas) return false;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }, false);
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
      drawStar() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        context.beginPath();
        context.moveTo(0, 50);
        context.lineTo(35, 35);
        context.lineTo(50, 0);
        context.lineTo(65, 35);
        context.lineTo(100, 50);
        context.lineTo(65, 65);
        context.lineTo(50, 100);
        context.lineTo(35, 65);
        context.lineTo(0, 50);
        context.closePath();
        context.fillStyle = 'rgba(255, 255, 255, 1)';
        context.fill();
        return canvas;
      },
      draw: function () {
        const canvas = this.$refs.canvas;
        if (!canvas) return;
        const cw = canvas.width;
        const ch = canvas.height;
        const starImage = this.starImage;
        /**
         * @type {CanvasRenderingContext2D}
         */
        const context = canvas.getContext('2d');
        const now = Date.now();
        const deltaTime = now - this.lastTime;
        this.lastTime = now;
        context.clearRect(0, 0, cw, ch);
        context.save();
        context.restore();
        this.starArr.forEach(star => {
          if (star.changeTime * 2 < star.duration) {
            star.scale -= (1 / star.duration * deltaTime);
          } else {
            star.scale += (1 / star.duration * deltaTime);
          }
          star.changeTime -= deltaTime;
          star.scale = Math.min(Math.max(star.scale, 0), 1);
          if (star.changeTime <= 0) {
            star.resetDuration();
            // star.resetCoordinate();
          }
          context.save();
          const actualSize = star.size * star.scale;
          // context.translate(star.x * cw - actualSize / 2, star.y * ch - actualSize / 2);
          context.drawImage(
            starImage,
            star.x * cw - actualSize / 2,
            star.y * ch - actualSize / 2,
            actualSize,
            actualSize
          );
          context.restore();
        });
        this.fireflyArr.forEach(firefly => {
          firefly.x += firefly.speedX * deltaTime / 1000 / cw;
          firefly.y -= firefly.speedY * deltaTime / 1000 / ch;
          if(firefly.x < 0) firefly.x = 1;
          if(firefly.x > 1) firefly.x = 0;
          if(firefly.y < 0) firefly.y = 1;
          if(firefly.y > 1) firefly.y = 0;
          context.beginPath();
          context.arc(firefly.x * cw, firefly.y * ch, 3, 0, Math.PI * 2);
          context.closePath();
          context.save();
          context.fillStyle = 'rgba(0, 255, 255, 0.5)';
          context.fill();
          context.restore();
          context.save();
          context.beginPath();
          context.arc(firefly.x * cw, firefly.y * ch, 10, 0, Math.PI * 2);
          context.closePath();
          context.strokeStyle = firefly.color;
          context.stroke();
          context.restore();
        });
        this.requestAnimation = requestAnimationFrame(this.draw);
      },
      stopAnimation() {
        if(this.requestAnimation) {
          cancelAnimationFrame(this.requestAnimation);
          this.requestAnimation = null;
        }
      }
    }
  }
</script>

<style module>
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
  }

  .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    z-index: -1;
  }

  .canvas {
    margin: auto;
  }
</style>
