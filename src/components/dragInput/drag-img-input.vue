<template>
  <div
    class="drag-input"
    @dragenter.stop.prevent="doDragEnter"
    @dragover.stop.prevent="doDragOver"
    @dragend.stop.prevent="doDragEnd"
    @drop.stop.prevent="doDrop"
  >
    <img ref="img" class="img" v-show="displayImgSrc" :src="displayImgSrc" />
    <label class="input-file-label">
      {{labelText}}
      <input class="file" type="file" accept="image/x-png,image/jpeg,image/gif" @change="doFileChange" />
    </label>
    <div v-if="needCut" class="cut-img" :style="canvasStyle"
      @dragstart.stop="cutBorderDragStart"
      @drag.stop="cutBorderDrag"
      @drop.stop.prevent="cutBorderDrop">
      <div draggable="true" class="cut-border"
      :style="cutBorderStyle" ref="cutBorder"></div>
      <canvas class="canvas" ref="canvas">
      </canvas>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dragImgInput',
    data() {
      return {
        canvas: null,
        context: null,
        canvasRect: null,
        canvasStyle: {
          'display': 'none'
        },
        cutBorderLeft: 0,
        cutBorderTop: 0,
        cutBorderWOH: 0,
        displayImgSrc: null,
        oldX: null,
        oldY: null
      };
    },
    props: {
      labelText: {
        type: String,
        default: ''
      },
      needCut: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
      if(this.needCut) {
        this.canvas = this.$refs.canvas;
        this.context = this.canvas.getContext('2d');
      }
    },
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    computed: {
      cutBorderStyle() {
        return {
          left: `${this.cutBorderLeft}px`,
          top: `${this.cutBorderTop}px`,
          width: `${this.cutBorderWOH}px`,
          height: `${this.cutBorderWOH}px`
        };
      }
    },
    methods: {
      doDragEnter(e) {},
      doDragOver(e) {},
      doDragEnd(e) {},
      doDrop(e) {
        this.handleImg((e.dataTransfer.files)[0]);
      },
      doFileChange(e) {
        this.handleImg((e.target.files)[0]);
      },
      handleImg(imgFile) {
        if (!imgFile) return;
        // if ( /\.(jpe?g|png|gif)$/i.test(imgFile.name))
        this.displayImgSrc = URL.createObjectURL(imgFile);
        this.drawImgOnCvs(imgFile);
      },
      drawImgOnCvs(imgFile) {
        if (!this.needCut) return;
        this.canvasStyle.display = 'block';
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        const image = new Image();
        const context = this.context;
        const canvas = this.canvas;
        const MAX_WH = 400;
        reader.onload = (e) => {
          image.src = e.target.result;
          image.onload = () => {
            let width = image.width;
            let height = image.height;
            if (width > height) {
              height = height / width * MAX_WH;
              width = MAX_WH;
            } else {
              width = width / height * MAX_WH;
              height = MAX_WH;
            }
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, 0, 0, width, height);
            this.canvasRect = canvas.getBoundingClientRect();
            this.updateCutBorder(this.canvasRect);
          }
        }
      },
      updateCutBorder(canvasRect) {
        this.cutBorderLeft = canvasRect.left;
        this.cutBorderTop = canvasRect.top;
        this.cutBorderWOH = Math.min(canvasRect.width, canvasRect.height);
      },
      revokeImgUrl() {
        URL.revokeObjectURL(this.displayImgSrc);
      },
      cutBorderDragStart(e) {
        e.dataTransfer.setDragImage(new Image(),0,0);
        this.oldX = e.screenX;
        this.oldY = e.screenY;
      },
      cutBorderDrag(e) {
        this.cutBorderLeft += e.screenX - this.oldX;
        this.cutBorderLeft = Math.max(this.cutBorderLeft, this.canvasRect.left);
        this.cutBorderLeft = Math.min(this.cutBorderLeft, this.canvasRect.right - this.cutBorderWOH);
        this.cutBorderTop += e.screenY - this.oldY;
        this.cutBorderTop = Math.max(this.cutBorderTop, this.canvasRect.top);
        this.cutBorderTop = Math.min(this.cutBorderTop, this.canvasRect.bottom - this.cutBorderWOH);
        this.oldX = e.screenX;
        this.oldY = e.screenY;
      },
      cutBorderDrop(e) {
        this.oldY = this.oldY = null;
      }
    }
  }
</script>

<style scoped>
  .drag-input {
    width: 200px;
    height: 200px;
    box-shadow: 0 0 10px #888888;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }

  .input-file-label {
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file {
    display: none;
  }

  .cut-img {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: none;
    border-left: 1px solid #888888;
    z-index: 1;
  }

  .canvas-display {
    display: block;
  }

  .canvas {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .cut-border {
    border: 1px solid black;
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,0.3);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    cursor: move;
    resize: both;
  }
</style>
