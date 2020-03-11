<template>
  <img v-if="src" :src="src">
</template>

<script>
  import Pea from "./classes/Bullets/Pea";
  import Bullet from "./classes/Bullet";

  export default {
    name: 'test-img-draw',
    data() {
      return {
        img: null,
        src: null
      };
    },
    props: {},
    components: {},
    beforeCreate() {
    },
    created() {
      this.img = this._createImg();
    },
    beforeMount() {
    },
    mounted() {
      this.src = this.img.toDataURL('image/png');
      const obj = new Pea();
      console.log(obj);
      console.log(
        obj.constructor.name
      );
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
      _createImg () {
        const canvas = document.createElement('canvas');
        const width = canvas.width = 56;
        const height = canvas.height = 80;
        const context = canvas.getContext('2d');

        context.save();
        context.beginPath();
        context.fillStyle = 'rgb(37,37,37)';
        context.ellipse(
          width * 0.4,
          height * 0.95,
          height * 0.06,
          height * 0.04,
          0,
          0,
          Math.PI * 2
        );
        context.ellipse(
          width * 0.62,
          height * 0.94,
          height * 0.06,
          height * 0.04,
          0,
          0,
          Math.PI * 2
        );
        context.fill();
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        context.fillStyle = 'rgb(163,50,13)';
        context.rect(width * 0.33, height * 0.6, width * 0.07, height * 0.35);
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(-Math.PI / 18);
        context.translate(-width / 2, -height / 2);
        context.rect(width * 0.5, height * 0.5, width * 0.07, height * 0.45);
        context.restore();
        context.fill();
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        context.lineWidth = width * 0.05;
        context.strokeStyle = 'rgb(105,20,9)';
        context.moveTo(width * 0.38, height * 0.38);
        context.lineTo(width * 0.28, height * 0.48);
        context.lineTo(width * 0.14, height * 0.58);
        context.moveTo(width * 0.38, height * 0.38);
        context.closePath();
        context.stroke();
        context.restore();

        // 上身
        context.save();
        context.beginPath();
        context.moveTo(width * 0.3, height * 0.35);
        context.lineTo(width * 0.53, height * 0.35);
        context.lineTo(width * 0.6, height * 0.63);
        context.lineTo(width * 0.3, height * 0.63);
        context.lineTo(width * 0.3, height * 0.35);
        context.closePath();
        context.fillStyle = 'rgb(197,131,56)';
        context.fill();
        context.restore();

        // 扣子
        context.save();
        context.beginPath();
        context.fillStyle = 'rgba(0,0,0,1)';
        for (let i = 0.08; i <= 0.24; i += 0.08) {
          context.arc(
            width * 0.37,
            height * (i + 0.35),
            height * 0.02,
            0,
            Math.PI * 2
          );
          context.fill();
        }
        context.closePath();
        context.restore();

        context.save();
        context.lineWidth = width * 0.05;
        context.strokeStyle = 'rgb(105,20,9)';
        context.beginPath();
        context.moveTo(width * 0.45, height * 0.4);
        context.lineTo(width * 0.37, height * 0.5);
        context.lineTo(width * 0.2, height * 0.6);
        context.moveTo(width * 0.45, height * 0.4);
        context.closePath();
        context.stroke();
        context.restore();

        // 头
        context.save();
        context.beginPath();
        context.arc(
          width * 0.4,
          height * 0.2,
          height * 0.15,
          0,
          Math.PI * 2
        );
        context.closePath();
        context.fillStyle = 'rgb(96,109,87)';
        context.fill();
        context.restore();

        // 眼球
        context.save();
        context.beginPath();
        context.fillStyle = 'rgb(255,255,255)';
        context.strokeStyle = 'rgb(0,0,0)';
        context.arc(
          width * 0.25,
          height * 0.15,
          height * 0.04,
          0,
          Math.PI * 2
        );
        context.closePath();
        context.stroke();
        context.fill();
        context.beginPath();
        context.arc(
          width * 0.45,
          height * 0.15,
          height * 0.05,
          0,
          Math.PI * 2
        );
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();

        // 眼睛
        context.save();
        context.beginPath();
        context.fillStyle = 'rgb(0,0,0)';
        context.arc(
          width * 0.25,
          height * 0.15,
          height * 0.02,
          0,
          Math.PI * 2
        );
        context.arc(
          width * 0.45,
          height * 0.15,
          height * 0.03,
          0,
          Math.PI * 2
        );
        context.fill();
        context.closePath();
        context.restore();

        context.save();
        context.beginPath();
        context.ellipse(
          width * 0.35,
          height * 0.29,
          height * 0.06,
          height * 0.04,
          Math.PI,
          0,
          Math.PI
        );
        context.strokeStyle = 'rgb(0,0,0)';
        context.stroke();
        context.restore();

        context.save();
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = 'rgba(84,228,255,0.4)';
        context.fillRect(0,0,canvas.width, canvas.height);
        context.restore();

        return canvas;
      }
    }
  }
</script>

<style module>
</style>
