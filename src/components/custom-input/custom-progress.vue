<template>
  <div :class="[$style.progress, $style[direction]]"
       ref="progress"
       @click.stop="doProgressClick"
  >
    <slot></slot>
    <div
      v-if="progressColor"
      :class="$style['selected']"
      :style="selectedStyle"
    ></div>
    <div :class="[$style.bar, $style[direction]]"
         @mousedown.stop.prevent="doMouseDown"
         :style="barStyle"
         ref="bar"
    >
      <slot name="bar"></slot>
    </div>
  </div>
</template>

<script>
  import {on, off} from "../../utils/event";
  export default {
    name: 'custom-progress',
    data() {
        return {
          value: 0,
          barLength: 0,
          lastFrame: 0,
          trans: 0,
          progressLength: 0,
          horizontal: {
            length: 'width',
            pos: 'left',
            dir: 'X',
            base: 1
          },
          vertical: {
            length: 'height',
            pos: 'bottom',
            dir: 'Y',
            base: -1
          }
        };
    },
    props: {
      direction: {
        type: String,
        default: 'vertical',
        validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) !== -1
        }
      },
      initValue: {
        type: Number,
        default: 0,
        validator(value) {
          return typeof value === 'number';
        }
      },
      progressColor: {
        type: String,
        default: 'cyan'
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
      this.value = this.initValue;
      this.init();
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
      barStyle() {
        return {
          transform:
            `translate${this[this.direction].dir}(${this[this.direction].base * this.trans}px)`
        };
      },
      selectedStyle() {
        return {
          backgroundColor: this.progressColor,
          transform:
            `scale${this[this.direction].dir}(${this.value / 100})`
        }
      }
    },
    methods: {
      init() {
        (this.$refs.bar) && (this.barLength = this.$refs.bar.offsetWidth);
        (this.$refs.progress) && (this.progressLength = this.$refs.progress.getBoundingClientRect()[this[this.direction].length]);
        this.trans = this.progressLength * this.value / 100;
      },
      doMouseDown(e) {
        this.$emit('mousedown', e);
        this.init();
        this.lastFrame = e[`client${this[this.direction].dir}`];
        on(document, 'mousemove', this.doMouseMove);
        on(document, 'mouseup', this.doMouseUp);
      },
      /**
       * @param {MouseEvent} e
       */
      doMouseMove: function (e) {
        e.stopPropagation();
        e.preventDefault();
        const dir = this[this.direction].dir;
        if (!this.lastFrame) return;
        this.trans += (e[`client${dir}`] - this.lastFrame) * this[this.direction].base;
        this.trans = Math.max(Math.min(this.trans, this.progressLength), 0);
        this.value = Math.abs(this.trans) / this.progressLength * 100;
        this.lastFrame = e[`client${dir}`];
        console.log(this.value);
        this.$emit('mousemove', e);
        this.$emit('onchange', this.value);
      },
      /**
       * @param {MouseEvent} e
       */
      doMouseUp(e) {
        e.stopPropagation();
        this.$emit('mouseup', e);
        this.$emit('changed', this.value);
        this.lastFrame = 0;
        off(document, 'mousemove', this.doMouseMove);
        off(document, 'mouseup', this.doMouseUp);
      },
      /**
       * @param {MouseEvent} e
       */
      doProgressClick(e) {
        const direction = this[this.direction];
        this.trans += (e[`client${direction.dir}`] - this.$refs.bar.getBoundingClientRect()[direction.pos]) * direction.base;
        this.value = this.trans / this.progressLength * 100;
        console.log(this.value);
        this.$emit('changed', this.value);
      },
      setValue(v) {
        v = Math.max(Math.min(v, 100), 0);
        this.progressLength = this.$refs.progress.getBoundingClientRect()[this[this.direction].length];
        this.value = v;
        this.trans = this.progressLength * this.value / 100;
      }
    },
    watch: {
      initValue(value) {
        this.setValue(value);
      }
    }
  }
</script>

<style module>
  .progress {
    background-color: white;
    position: relative;
    margin: auto;
  }

  .progress.horizontal {
    width: 100%;
    height: 0.25rem;
  }

  .progress.vertical {
    height: 100%;
    width: 0.25rem;
  }

  .selected {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transform-origin: left bottom;
  }

  .bar {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    box-shadow: 0 0 3px #888888;
    background-color: white;
    position: absolute;
    margin-left: -0.25rem;
    margin-bottom: -0.25rem;
    /*transition: all 0.1s;*/
  }

  .bar:hover {
    cursor: pointer;
  }

  .bar.horizontal {
    left: 0;
    bottom: 50%;
  }

  .bar.vertical {
    left: 50%;
    bottom: 0;
  }
</style>
