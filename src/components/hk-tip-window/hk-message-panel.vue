<template>
  <div :class="$style.container" v-show="isShow">
    <div :class="[$style.dialog, {[$style['dialog-open']]: openReady}, {[$style['dialog-close']]: closeReady}]"
         @animationend='dialogAni'
         :style="{'width': width, 'height': height}"
    >
      <div :class="$style.content">
        <header :class="$style.header">
          <div :class="$style.title">
            {{header}}
          </div>
          <button type="button"
                  :class="$style.close"
                  @click="doClose">
            <i class="fa fa-close"></i>
          </button>
        </header>
        <div :class="$style.middleware">
          <div :class="$style.body">
            <horizontal-swiper>
              <slot></slot>
            </horizontal-swiper>
            <div :class="$style['body-bottom-border']">
              <div :class="$style['border-line']"></div>
              <div :class="$style['border-diamond']"></div>
              <div :class="$style['border-line']"></div>
            </div>
          </div>
          <footer :class="$style.footer" v-if="hasFooter">
            <button v-if="cancel"
                    type="button"
                    class="btn-blue"
                    @click="doCancel">
              取消
            </button>
            <button v-if="confirm"
                    type="button"
                    class="btn-yellow"
                    @click="doConfirm">
              确定
            </button>
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HorizontalSwiper from "../swiper-panel/horizontal-swiper-panel";
  export default {
    name: 'hkMessagePanel',
    data() {
      return {
        isShow: true,
        closeReady: false,
        openReady: true
      };
    },
    props: {
      header: {
        type: String,
        default: '提示'
      },
      hasFooter: {
        type: Boolean,
        default: true
      },
      confirm: {
        type: Boolean,
        default: true
      },
      cancel: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '80vh'
      },
      height: {
        type: String,
        default: '50vh'
      }
    },
    components: {HorizontalSwiper},
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
    methods: {
      doClose(e) {
        this.$emit('beforeClose', e);
        this.closeReady = true;
        this.$emit('afterClose', e);
      },
      doConfirm(e) {
        this.$emit('confirm', e);
        this.isShow = false;
      },
      doCancel(e) {
        this.$emit('cancel', e);
        this.isShow = false;
      },
      dialogAni(e) {
        if(this.closeReady) {
          this.isShow = false;
          this.closeReady = false;
          this.openReady = true;
        }else {
          this.openReady = false;
        }
      }
    }
  }
</script>

<style module>
  .container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000000;
  }

  .dialog {
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /*width: 60%;*/
    /*height: 60%;*/
    /*min-width: 300px;*/
    /*min-height: 200px;*/
    /*max-width: 500px;*/
    /*max-height: 400px;*/
    /*animation: pulse 0.5s;*/
  }

  .dialog-open {
    animation: pulse 0.3s;
  }

  .dialog-close {
    animation: pulse 0.3s reverse;
    /*animation-direction: reverse;*/
    /*animation-play-state: running;*/
  }

  @keyframes pulse {
    0%   {
      transform: scale(0.95);
      opacity: 0;
    }
    50%  {
      transform: scale(1.05);
      opacity: 1;
    }
    100% {
      transform: scale(1);
    }
  }

  .dialog:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 1.5rem;
    border: 3px solid rgba(255, 255, 255, 0.2);
    z-index: -1;
  }

  .content {
    width: 80%;
    height: 90%;
    border: 2px solid rgb(214, 230, 253);
    border-radius: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(37, 72, 114, 0.67) inset;
    background: rgba(37, 72, 114, 0.1);
  }

  .content:before {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 113%;
    height: 102%;
    z-index: -1;
    border-radius: 1rem;
    border-left: 0.25rem solid rgb(91, 192, 254);
    border-right: 0.25rem solid rgb(91, 192, 254);
  }

  .header {
    width: 100%;
    padding: 0.5rem 0 0.5rem 0;
    color: rgb(88, 193, 246);
    position: relative;
    overflow: hidden;
    margin-bottom: 0.125rem;
  }

  .close {
    padding: 0.25rem 1rem;
    border-bottom-left-radius: 0.5rem;
    border-top-right-radius: 0.9rem;
    border: 1px solid rgba(34, 63, 93, 0.2);
    background: rgba(37, 72, 114, 0.1);
    position: absolute;
    right: 0;
    top: 0;
    font-size: 1.125rem;
    color: rgb(88, 193, 246);
  }

  .title {
    position: relative;
    font-family: SimHei,sans-serif;
  }

  .title:before {
    content: '- DIALOG -';
    display: block;
    position: absolute;
    font-size: 0.5rem;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .middleware {
    width: 100%;
    height: 1px;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: linear-gradient(0, rgba(54, 115, 166, 0.5), rgba(36, 61, 100, 0.5));
    position: relative;
    border-bottom-left-radius: 0.9rem;
    border-bottom-right-radius: 0.9rem;
  }

  .middleware:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 30%,transparent 0);
    background-size: 15px 15px;
  }

  .body {
    width: 100%;
    height: 1px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .body-bottom-border {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .border-line {
    width: 35%;
    height: 1px;
    background: rgba(230, 230, 232, 0.5);
    position: relative;
  }

  .border-line:before,
  .border-line:after {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background: rgba(230, 230, 232, 0.5);
    position: absolute;
    left: 0;
  }

  .border-line:before {
    top: -2px;
  }

  .border-line:after {
    bottom: -2px;
  }

  .border-diamond {
    width: 0.625rem;
    height: 0.625rem;
    transform: rotate(45deg);
    background: rgba(230, 230, 232, 0.5);
    margin: auto 0.25rem;
  }

  .footer {
    width: 100%;
    position: relative;
    padding: 0.5rem 2rem;
    display: flex;
    justify-content: space-around;
  }

  .footer > button {
    padding: 0.25rem 2rem;
    border-radius: 0.25rem;
    font-weight: bolder;
  }
</style>
