<template>
  <div @mouseenter="doMouseenter"
       @mousemove="doMousemove"
       @mouseleave="doMouseleave" ref='outer'
       :class="$style.container">
    <slot></slot>
    <div :class="$style.title" v-if="customTitle" :style="titleStyle" ref="title">
      {{customTitle}}
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        titleStyle: {
          'display': 'none',
          'left': 0,
          'right': 0,
          'width': 'auto'
        }
      };
    },
    props: {
      customTitle:{
        type: String,
        default: ''
      }
    },
    components: {},
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    computed: {},
    methods: {
      doMouseenter(e) {

      },
      doMousemove(e) {
        if(!this.customTitle) return;
        if(e.target !== this.$refs.outer) {
          this.titleStyle.display = 'none';
          return ;
        }
        const titleStyle = this.titleStyle;
        titleStyle.display = 'inline-block';
        const position = this.$refs.title.getBoundingClientRect();
        const docBodyPos = document.body.getBoundingClientRect();
        if(e.clientX + position.width > docBodyPos.right) {
          titleStyle.left = `${docBodyPos.right - position.width}px`;
        }else {
          titleStyle.left = `${e.clientX}px`;
        }
        titleStyle.top = `${e.clientY}px`;
      },
      doMouseleave(e) {
        if(!this.customTitle) return;
        this.titleStyle.display = 'none';
      }
    }
  }
</script>

<style module>
  .container {
    padding: 1.25rem;
  }

  .title {
    display: none;
    border-radius: 2px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 3px 5px;
    position: absolute;
    width: 100%;
    max-width: 300px;
    pointer-events: none;
    font-size: 0.8rem;
  }
</style>
