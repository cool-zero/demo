<template>
  <div :class="$style.container" ref="container" @click="goNext">
    <svg :class="$style.left" viewBox="0 0 115 356.4" preserveAspectRatio="xMinYMid">
      <path :d="leftPath"
            fill="url(#linearGrad1)"
            stroke="rgb(215, 213, 229)"
            stroke-width="10"></path>
    </svg>
    <div :class="$style.center">
      <svg :class="$style['center-svg']"
           viewBox="0 0 115 356.4"
           preserveAspectRatio="none">
        <path :d="centerPath"
              fill="url(#linearGrad2)"></path>
        <path d="M 0 6
		      L 115 6" stroke-width="8" stroke="rgb(215, 213, 229)"></path>
        <path d="M 115 350.4
		      L 0 350.4" stroke-width="8" stroke="rgb(215, 213, 229)"></path>
      </svg>
      <div :class="$style.content">
        <p>{{content}}</p>
        <button @click="goNext"
                v-show="next"
                type="button"
                :class="$style.next">
          <i class="fa fa-sort-down"></i>
        </button>
      </div>
    </div>
    <svg :class="$style.right" viewBox="0 0 115 356.4" preserveAspectRatio="xMinYMid">
      <path :d="leftPath"
            fill="url(#linearGrad1)"
            stroke="rgb(215, 213, 229)"
            stroke-width="10"></path>
    </svg>
  </div>
</template>

<script>
	export default {
		name: 'hkDialog',
		data() {
			return {
			  cutLine: 30,
        isMounted: false,
        content: ''
      };
		},
		props: {
		  message: {
		    type: String,
        default: ''
      },
      next: {
		    type: Boolean,
        default: true
      },
      interval: {
		    type: Number,
        default: 100
      }
    },
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {
		  this.isMounted = true;
		  let end = 0;
		  if(this.interval) {
        const message = this.message;
        const that = this;
        const startInterval =  setInterval(() => {
          that.content = message.substring(0, end);
          end++;
          if(end >= message.length) {
            clearInterval(startInterval);
          }
        },this.interval);
      }
    },
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {
      leftPath() {
		    const right = 100 + this.cutLine;
		    const left = 0;
		    const top = 0;
		    const padding = 5;
		    const bottom = 346.4 + padding * 2;
		    const cutLine = this.cutLine;
        return `M ${right} ${padding}
          Q ${right - cutLine} ${padding} ${right - cutLine - cutLine / 2} ${padding + cutLine / 2 * Math.sqrt(3)}
          L ${right - cutLine - (200 - cutLine) / 2} ${bottom / 2 - cutLine / 2 * Math.sqrt(3)}
          Q ${right - cutLine - 100} ${bottom / 2} ${right - cutLine - (200 - cutLine) / 2} ${bottom / 2 + cutLine / 2 * Math.sqrt(3)}
          L ${right - cutLine - cutLine / 2} ${bottom - padding - cutLine / 2 * Math.sqrt(3)}
          Q ${right - cutLine} ${bottom - padding} ${right} ${bottom - padding}`;
      },
      centerPath() {
		    return `M 0 5
		      L 115 5
		      L 115 351.4
		      L 0 351.4`;
      }
    },
		methods: {
		  goNext(e) {
		    this.$emit('click', e);
      }
    }
	}
</script>

<style module>
  .container {
    width: 100%;
    height: 100%;
    /*background-image: linear-gradient(90deg, rgba(230, 230, 232, 1) 0, rgba(230, 230, 232, 0.8) 50%,*/
    /*   rgba(230, 230, 232, 1) 100%);*/
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }

  .left,
  .center,
  .right {
    height: 100%;
  }

  .right {
    margin-left: -1px;
    transform: rotate(180deg);
  }

  .center {
    width: 1px;
    flex: 1;
    position: relative;
  }

  .center-svg {
    width: 100%;
    height: 100%;
  }

  .content {
    position: absolute;
    left: 0;
    top: 0;
    padding: 0.25rem;
    width: 100%;
    height: 100%;
    text-align: left;
    text-indent:2em;
    z-index: 1;
  }

  .next {
    position: absolute;
    padding: 0.25rem 0.5rem;
    right: 0;
    bottom: 0.125rem;
    background: transparent;
    animation: next 1s infinite linear;
  }

  @keyframes next {
    0%   {
      transform: translateY(0);
    }
    50%  {
      transform: translateY(0.25rem);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
