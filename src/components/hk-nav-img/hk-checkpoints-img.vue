<template>
  <router-link :to="to" tag="div" :class="$style.container">
    <img :src="src" :class="$style.img">
    <div :class="$style.footer">
      <div :class="$style.title" v-html="name" :style="{'font-size': fontSize + 'px'}"></div>
      <div :class="$style.belong">{{belong}}</div>
      <div :class="$style.section">{{section}}</div>
      <div :class="$style['progress-list']">
        <div :class="$style['progress-item']">
          <div :class="$style.message">
            <span :class="$style.n">N</span>
            <span>{{progress.normal}}%</span>
          </div>
          <div :class="$style.bar">
            <div :class="$style.normal" :style="{width: progress.normal + '%'}"></div>
          </div>
        </div>
        <div :class="$style['progress-item']">
          <div :class="$style.message">
            <span :class="$style.h">H</span>
            <span>{{progress.hard}}%</span>
          </div>
          <div :class="$style.bar">
            <div :class="$style.hard" :style="{width: progress.hard + '%'}"></div>
          </div>
        </div>
        <div :class="$style['progress-item']">
          <div :class="$style.message">
            <span :class="$style.s">S</span>
            <span>{{progress.super}}%</span>
          </div>
          <div :class="$style.bar">
            <div :class="$style.super" :style="{width: progress.super + '%'}"></div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
	export default {
		name: 'hkCheckPointsImg',
		data() {
			return {};
		},
		props: {
      to: {
        type: [String, Object],
        default: ''
      },
      src: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: '123'
      },
      belong: {
        type: String,
        default: 'MAIN TASK'
      },
      section: {
        type: String,
        default: '第一章'
      },
      fontSize: {
        type: Number,
        default: 20
      },
      progress: {
        type: Object,
        default() {
          return {
            normal: 10,
            hard: 20,
            super: 30
          };
        }
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
		methods: {}
	}
</script>

<style module>
  .container {
    width: 100%;
    height: 100%;
    border: 0.125rem solid rgba(136, 136, 136, 0.3);
    border-radius: 0.25rem;
    position: relative;
  }

  .container:active {
    border-color: cyan;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .footer {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem;
  }

  .title {
    font-size: 1.25rem;
    color: #000;
  }

  .belong {
    font-size: 0.5rem;
    color: rgb(173, 173, 173);
  }

  .section {
    color: rgb(117, 197, 235);
  }

  .progress-list {
    width: 100%;
    background-image: linear-gradient(0, black, transparent);
    position: absolute;
    left: 0;
    bottom: 100%;
    display: flex;
    justify-content: center;
  }

  .progress-item {
    width: 33%;
    padding: 0.5rem;
  }

  .message {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 0.75rem;
  }

  .bar {
    width: 100%;
    background: rgb(126, 129, 131);
  }

  .normal,
  .hard,
  .super {
    height: 0.25rem;
    transform: skew(-20deg);
  }

  .message > .n {
    color: rgb(143, 203, 90);
  }

  .normal {
    background: rgb(143, 203, 90);
  }

  .message > .h {
    color: rgb(220, 168, 67);
  }

  .hard {
    background: rgb(220, 168, 67);
  }

  .message > .s {
    color: rgb(235, 90, 37);
  }

  .super {
    background: rgb(235, 90, 37);
  }
</style>
