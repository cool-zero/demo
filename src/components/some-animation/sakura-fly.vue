<template>
  <div :class="$style.container">
    <svg :class="$style.svg" viewBox="0 0 1 1" width="300" height="300">
      <defs>
        <clipPath id="clipSakura" clipPathUnits="objectBoundingBox">
          <path :d="sakuraBorder"></path>
        </clipPath>
      </defs>
      <path :d="sakuraBorder" stroke="black" stroke-width="0.01"></path>
    </svg>
    <div :class="$style.content">
      <div :class="$style['sakura-petal']"
           v-for="(item, index) in petalsProps"
           :style="{'width': item.length + 'px',
             'height': item.length + 'px',
             'left': item.left + '%',
             'top': item.top + '%',
             animationDuration: item.duration + 's',
             animationDelay: item.animationDelay + 's'}"
      >
      </div>
<!--      <div :class="$style.sakura">-->
<!--        <div :class="[$style['sakura-petal']]" v-for="index in 5"></div>-->
<!--      </div>-->
    </div>
    <div :class="$style.circle">
      <div v-for="(item, index) in mousePoints"
           @animationend = "doClickAni($event, index)"
           :style="{left: item.left + 'px', top: item.top + 'px'}">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'sakura-fly',
        data() {
            return {
              angle: 80,
              notch: 60,
              notchWidth: 0.07,
              petalNumber: 50,
              petalsProps: [],
              mousePoints: []
            };
        },
        props: {
          petalAngle: {
            type: Number,
            default: 90
          }
        },
        components: {},
        beforeCreate() {
        },
        created() {
          const init = this.init;
          init();
          const mousePoints = this.mousePoints;
          document.addEventListener("click", e => {
            mousePoints.push({
              left: e.clientX,
              top: e.clientY
            });
          },false);
        },
        beforeMount() {
        },
        mounted() {},
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        computed: {
          sakuraBorder() {
            const yCenter = 0.5;
            const xDelta = 0.5 / Math.tan(this.angle / 360 * Math.PI);
            const notchNeighbor = this.notchWidth / Math.tan(this.notch / 360 * Math.PI);
            return `M ${0.5} 1
            Q ${0.5 - xDelta} ${yCenter} ${0.5 - this.notchWidth} ${this.notchWidth}
            L ${0.5} ${this.notchWidth + notchNeighbor}
            L ${0.5 + this.notchWidth} ${this.notchWidth}
            Q ${0.5 + xDelta} ${yCenter} ${0.5} 1
            `;
          }
        },
        methods: {
          getRandom(range, base) {
            range = range || 40;
            if(base !== 0) base = base || 20;
            return Math.random() * range + base;
          },
          init() {
            this.petalsProps.length = 0;
            for (let i = 0; i < this.petalNumber; i++) {
              this.petalsProps.push({
                length: this.getRandom(),
                left: Math.random() * 150 - 50,
                top: Math.random() * 20 - 20,
                duration: this.getRandom(5, 10),
                animationDelay: this.getRandom(10, 0),
                translateY: this.getRandom(500, 500)
              });
            }
          },
          doClickAni(e, index) {
            this.mousePoints.splice(0, index + 1);
          }
        }
    }
</script>

<style module>
  .container {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999999;
    pointer-events: none;
  }

  .content {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
  }

  .svg {
    /*display: none;*/
    width: 0;
    height: 0;
  }

  .sakura-petal {
    width: 100px;
    height: 100px;
    position: absolute;
    clip-path: url(#clipSakura);
    background-image: linear-gradient(0, white , rgb(255, 192, 203) 70%);
    animation: sakura-petal-keyframe infinite linear;
    opacity: 0;
    filter: drop-shadow(20px 20px 20px rgba(26,58,70,0.7));
  }

  @keyframes sakura-petal-keyframe {
    0%   {
      opacity: 0;
      transform: translateY(0px);
    }
    10%  {
      opacity: 1;
      transform: translateY(100px) translateX(150px) rotateX(72deg) rotateY(72deg) rotateZ(72deg);
    }
    50%  {
      transform: translateY(500px) translateX(750px) rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
    90%  {
      opacity: 1;
      transform: translateY(900px) translateX(1350px) rotateX(648deg) rotateY(648deg) rotateZ(648deg);
    }
    100% {
      opacity: 0;
      transform: translateY(1000px) translateX(1500px) rotateX(720deg) rotateY(720deg) rotateZ(720deg);
    }
  }

  .sakura {
    width: 0;
    height: 0;
    position: absolute;
    transform-style: preserve-3d;
    left: 100px;
    top: 100px;
  }

  /*.sakura:before {*/
  /*  content: '';*/
  /*  display: block;*/
  /*  position: absolute;*/
  /*  width: 20px;*/
  /*  height: 20px;*/
  /*  border-radius: 50%;*/
  /*  background: yellow;*/
  /*  transform: translate(-50%, -50%);*/
  /*  z-index: 1;*/
  /*}*/

  .sakura > .sakura-petal {
    width: 40px;
    height: 40px;
    transform-origin: bottom center;
    position: absolute;
    left: -15px;
    bottom: 0;
  }

  .sakura > .sakura-petal:nth-child(2) {
    transform: rotate(72deg);
  }

  .sakura > .sakura-petal:nth-child(3) {
    transform: rotate(144deg);
  }

  .sakura > .sakura-petal:nth-child(4) {
    transform: rotate(216deg);
  }

  .sakura > .sakura-petal:nth-child(5) {
    transform: rotate(288deg);
  }

  .circle {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
  }

  .circle > div {
    width: 100px;
    height: 100px;
    margin-left: -50px;
    margin-top: -50px;
    position: absolute;
    border-radius: 50%;
    animation: circle-ani 0.5s;
  }

  @keyframes circle-ani {
    0%   {
      box-shadow: 0 0 5px rgba(0, 255, 255, 0.45) inset;
      transform: scale(0.7);
    }
    100% {
      box-shadow: 0 0 100px rgba(0, 255, 255, 0.45) inset;
      transform: scale(0);
    }
  }
</style>
