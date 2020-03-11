<template>
  <div :class="$style.panel" :style="{width: width}">
    <div :class="$style.container" :style="containerStyle">
      <div :class="$style.content">
        <div :class="[$style.box, colorClass]" :style="{'border-width': borderWidth}">
          <img :src="src" :class="$style.img" alt="">
        </div>
        <div v-if="hasStars" :class="$style.stars" :style="starsStyle">
          <span class="fa fa-star font-yellow" v-for="index in level"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'hk-material-img',
        data() {
            return {};
        },
        props: {
          bgColor: {
            type: String,
            default: 'white'
          },
          src: {
            type: String
          },
          level: {
            type: Number,
            default: 3
          },
          hasStars: {
            type: Boolean,
            default: true
          },
          starsOffset: {
            type: Number,
            default: 0
          },
          starsSize: {
            type: String,
            default: '1rem'
          },
          borderWidth: {
            type: String,
            default: '2px'
          },
          borderRadius: {
            type: String,
            default: '0.7rem'
          },
          width: {
            type: String,
            default: '100%'
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
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        computed: {
          containerStyle() {
            return {
              backgroundColor: this.bgColor,
              borderRadius: this.borderRadius
            }
          },
          colorClass() {
            switch (this.level) {
              case 2:
              case 3:
                return this.$style.blue;
              case 4:
                return this.$style.purple
            }
          },
          starsStyle() {
            return {
              transform: `translate(-50%, ${this.starsOffset}%)`,
              fontSize: this.starsSize
            }
          }
        },
        methods: {}
    }
</script>

<style module>
  .panel {
    width: 100%;
    height: auto;
  }

  .container {
    width: 100%;
    padding-top: 93.34%;
    height: 0;
    position: relative;
    border-radius: 0.7em;
  }

  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: inherit;
    padding-bottom: 0.25em;
  }

  .box {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: 2px solid;
  }

  .box.purple {
    border-color: rgb(231, 162, 252);
    background: linear-gradient(180deg, rgb(104, 52, 156), rgb(183, 106, 219));
  }

  .box.blue {
    border-color: rgb(127, 228, 253);
    background: linear-gradient(180deg, rgb(42, 108, 168), rgb(84, 185, 227));
  }

  .stars {
    position: absolute;
    left: 50%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .stars > span {
    transform: rotate(15deg);
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: inherit;
  }
</style>
