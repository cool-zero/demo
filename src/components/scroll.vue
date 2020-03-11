<template>
  <div class="scroll"
       ref="container"
       @wheel.prevent="handleScroll">
    <div class="scroll-content"
         ref="content"
         :style="contentTrans"
         :class="{'transition-clear': ySliderIsDown || xSliderIsDown}">
      <slot></slot>
    </div>
    <div v-if="yScroll && ySliderHPercent"
         class="y-scroll-box"
         ref="yBox"
         @click.stop.prevent="yScollBoxClick">
      <div class="y-scroll-slider"
           ref="ySlider"
           @click.stop="scrollSliderClick"
           @mousedown.stop="ySliderDown"
           :style="yScrollSliderTrans"
           :class="{'transition-clear': ySliderIsDown}"
      ></div>
    </div>
    <div class="x-scroll-box"
         v-if="xScroll && xSliderWPercent"
         ref="xBox"
         @click.stop.prevent="xScollBoxClick">
    	<div class="x-scroll-slider"
           ref="xSlider"
           @click.stop="scrollSliderClick"
           @mousedown.stop="xSliderDown"
           :style="xScrollSliderTrans"
           :class="{'transition-clear': xSliderIsDown}"
      ></div>
    </div>
  </div>
</template>

<script>
  import {
    on,
    off
  } from '@/utils/event.js';
  export default {
    name: '',
    data() {
      return {
        observer: null,
        speed: 4,
        transX: 0,
        transY: 0,
        ySliderHPercent: "",
        xSliderWPercent: "",
        ySliderMax: "",
        xSliderMax: "",
        ySliderIsDown: false,
        xSliderIsDown: false,
        yDownOffset: "",
        xRightOffset: "",
        scrollStep: 4
      };
    },
    props: {
      xScroll: {
        type: Boolean,
        default () {
          return true;
        }
      },
      yScroll: {
        type: Boolean,
        default () {
          return true;
        }
      },
      step: {
        type: Number,
        default () {
          return 30;
        }
      },
      yScrollWidth: {
        type: Number,
        default() {
          return 10;
        }
      },
      yScrollColor: {
        type: String,
        default() {
          return 'rgba(136, 136, 136, 0.3)'
        }
      }
    },
    components: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
      this.init();
      let resizeElement = this.$refs.content;
      this.observer = new MutationObserver((mutationList) => {
        for (let mutation of mutationList) {
          let type = mutation.type;
          switch (type) {
            case "childList":
              this.init();
              break;
            case "attributes":
              console.log(`The ${mutation.attributeName} attribute was modified.`);
              break;
            case "subtree":
              console.log(`The subtree was modified.`);
              break;
            default:
              break;
          }
        }
      });
      this.observer.observe(resizeElement, {
        attributes: true,
        attributeFilter: [''],
        attributeOldValue: true,
        childList: true,
        subtree: true
      });
      const that = this;
      window.onresize = () => {
        that.init();
      }
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    computed: {
      yScrollSliderTrans(){
        return {
          transform:`translateY(${this.transY}%)`,
          height:this.ySliderHPercent + "%",
          backgroundColor: this.yScrollColor,
          width: this.yScrollWidth + 'px'
        };
      },
      contentTrans(){
        return {
          transform:`translate(${-(this.transX * this.xSliderWPercent / 100)}%,${-(this.transY * this.ySliderHPercent / 100)}%)`
        };
      },
      yScrollShow(){
        return this.yScroll && this.ySliderHPercent;
      },
      xScrollSliderTrans() {
        return {
          transform:`translateX(${this.transX}%)`,
          width: this.xSliderWPercent + "%"
        };
      },
      xScrollShow() {
        return this.xScroll && this.xSliderHPercent;
      }
    },
    methods: {
      init() {
        let containerH = this.$refs.container.offsetHeight;
        let contentH = this.$refs.content.offsetHeight;
        this.ySliderHPercent = containerH * 100 / contentH;
        this.ySliderHPercent = this.ySliderHPercent < 100 ? this.ySliderHPercent : "";
        this.ySliderMax = contentH * 100 / containerH - 100;
        this.scrollStep = this.step / containerH * 100;
        let containerW = this.$refs.container.offsetWidth;
        let contentW = this.$refs.content.offsetWidth;
        this.xSliderWPercent = containerW * 100 / contentW;
        this.xSliderWPercent = this.xSliderWPercent < 100 ? this.xSliderWPercent : "";
        this.xSliderMax = contentW * 100 / containerW - 100;
      },
      ySliderDown(e) {
        this.ySliderIsDown = true;
        document.onselectstart = () => false;
        this.yDownOffset = e.clientY;
        on(document, 'mousemove', this.ySliderMove);
        on(document, 'mouseup', this.ySliderUp);
      },
      ySliderMove(e) {
        e.stopPropagation();
        if(!this.ySliderIsDown) {
            return;
        }
        const offset = e.clientY - this.yDownOffset;
        this.yDownOffset = e.clientY;
        const ySliderPosPercent = offset * 100 / this.$refs.ySlider.offsetHeight;
        this.formatTransY(this.transY + ySliderPosPercent);
      },
      ySliderUp(e) {
        e.stopPropagation();
        off(document, 'mousemove', this.ySliderMove);
        this.ySliderIsDown = false;
        document.onselectstart = null;
        this.yDownOffset = 0;
      },
      scrollSliderClick(e) {},
      yScollBoxClick(e) {
        let offset = Math.abs(e.currentTarget.getBoundingClientRect().top - e.clientY);
        let ySliderHeight = this.$refs.ySlider.offsetHeight;
        let yHalfHeight = ySliderHeight / 2;
        let moveY = (offset - yHalfHeight) * 100 / ySliderHeight;
        this.formatTransY(moveY);
      },
      handleScroll(e) {
        if(!(this.yScroll && this.ySliderHPercent)) return;
        e.stopPropagation();
        if(e.deltaY > 0) {
            //向下滚动
            this.formatTransY(this.transY + this.scrollStep);
        }else {
            this.formatTransY(this.transY - this.scrollStep);
        }
      },
      formatTransY(y) {
        this.transY = Math.max(Math.min(y, this.ySliderMax), 0);
      },
      xScollBoxClick(e) {

      },
      xSliderDown(e) {
        this.xSliderIsDown = true;
        document.onselectstart = () => false;
        this.xRightOffset = e.clientX;
        on(document, 'mousemove', this.xSliderMove);
        on(document, 'mouseup', this.xSliderUp);
      },
      xSliderMove(e) {
        e.stopPropagation();
        if(!this.xSliderIsDown) {
            return;
        }
        const offset = e.clientX - this.xRightOffset;
        this.xRightOffset = e.clientX;
        const xSliderPosPercent = offset * 100 / this.$refs.xSlider.offsetWidth;
        this.formatTransX(this.transX + xSliderPosPercent);
      },
      xSliderUp(e) {
        e.stopPropagation();
        off(document, 'mousemove', this.xSliderMove);
        this.xSliderIsDown = false;
        document.onselectstart = null;
        this.xRightOffset = 0;
      },
      formatTransX(x) {
        this.transX = Math.max(Math.min(x, this.xSliderMax), 0);
      }
    }
  }
</script>

<style scoped>
  .scroll {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  /*.scroll-content,*/
  .y-scroll-box,
  .y-scroll-slider,
  .x-scroll-box,
  .x-scroll-slider{
    position: absolute;
  }

  .scroll-content {
    /*left: 0;*/
    /*top: 0;*/
    width: auto;
    transition: all 0.3s;
  }

  .y-scroll-box {
    right: 0;
    top: 0;
    width: 10px;
    height: 100%;
    background: rgba(136, 136, 136, 0);
    transition: background-color 0.3s;
    border-radius: 20px;
  }

  .y-scroll-slider {
    width: 100%;
    right: 0;
    top: 0;
    background-color: rgba(136, 136, 136, 0.3);
    border-radius: 4px;
    transition: all 0.3s;
  }

  .y-scroll-box:hover {
    background-color: rgba(136, 136, 136, 0.2);
  }

  .y-scroll-box:hover .y-scroll-slider {
    width: 100%;
    border-radius: 20px;
  }

  .y-scroll-slider:hover {
    background-color: rgba(136, 136, 136, 0.7);
  }

  .x-scroll-box {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    background: rgba(136, 136, 136, 0);
    transition: background-color 0.3s;
    border-radius: 20px;
  }

  .x-scroll-slider {
    height: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba(136, 136, 136, 0.3);
    border-radius: 4px;
    transition: all 0.3s;
  }

  .transition-clear {
    transition: all 0s;
  }
</style>
