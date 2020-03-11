<template>
  <div :class="$style.box" :style="boxStyle" ref="box">
    <slot></slot>
    <div :class="$style.dragy"
         @mousedown.stop.prevent = 'doMouseDownY'
    ></div>
  </div>
</template>

<script>
  import {on, off} from "../../utils/event";
  export default {
    name: 'resize-box',
    data() {
        return {
          width: 0,
          lastFrame: 0,
          mouseIsDown: false
        };
    },
    props: {
      minWidth: {
        type: Number,
      },
      maxWidth: {
        type: Number
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
      boxStyle() {
        return {
          width: this.width ? `${this.width}px` : ''
        }
      }
    },
    methods: {
      /**
       * @param {MouseEvent} e
       */
      doMouseDownY(e) {
        this.lastFrame = e.clientX;
        this.mouseIsDown = true;
        this.width = this.$refs.box.getBoundingClientRect().width;
        on(document, 'mousemove', this.doMouseMoveY);
        on(document, 'mouseup', this.doMouseUpY);
      },
      /**
       * @param {MouseEvent} e
       */
      doMouseMoveY(e) {
        e.stopPropagation();
        if(!this.mouseIsDown) return;
        this.width += (e.clientX - this.lastFrame);
        this.minWidth && (this.width = Math.max(this.width, this.minWidth));
        this.maxWidth && (this.width = Math.min(this.width, this.maxWidth));
        this.lastFrame = e.clientX;
      },
      /**
       * @param {MouseEvent} e
       */
      doMouseUpY(e) {
        e.stopPropagation();
        off(document, 'mousemove', this.doMouseMoveY);
        off(document, 'mouseup', this.doMouseUpY);
        this.mouseIsDown = false;
      }
    }
  }
</script>

<style module>
  .box {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .dragy {
    width: 4px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: -2px;
  }

  .dragy:hover {
    transform: scaleX(2);
    cursor: e-resize;
    background: rgba(75, 75, 75, 0.33);
  }
</style>
