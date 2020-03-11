<template>
  <hk-page-panel background-color="rgba(0, 0, 0, 0.4)" :class="$style.panel">
    <div :class="$style.container">
      <div :class="$style.title">{{mainTask.title}}</div>
      <horizontal-swiper-panel :padding="30" @listClick="doClose">
        <div :class="$style.item"
             v-for="(item, index) in mainTask.list"
             @click.native.stop="doItemClick">
          <hk-check-points-img
            :to="item.to"
            :src="item.src"
            :name="item.name"
            :belong="item.belong"
            :section="item.section"
            :font-size="item.fontSize"
            :progress="item.progress"
          >
          </hk-check-points-img>
        </div>
      </horizontal-swiper-panel>
    </div>
  </hk-page-panel>
</template>

<script>
	import HkCheckPointsImg from "../hk-nav-img/hk-checkpoints-img";
  import HkPagePanel from "../hk-page-panel/hk-page-panel";
  export default {
		name: 'hk-adventure-maintask',
		data() {
			return {
			  mainTask: this.$store.getters.getUser.adventure.mainTask
      };
		},
		props: [],
		components: {
      HkPagePanel,
      HkCheckPointsImg,
      'horizontal-swiper-panel': () => import('@/components/swiper-panel/horizontal-swiper-panel')
    },
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
		  doClose(e) {
		    // this.$router.push('/adventure')
      },
      doItemClick(e) {

      }
    }
	}
</script>

<style module>
  .item {
    width: 30vh;
    height: 50vh;
    margin: auto 0.5rem;
  }

  .panel {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .container {
    width: 100%;
    height: 100%;
  }

  .title {
    position: absolute;
    width: auto;
    white-space:nowrap;
    color: white;
    padding: 0.5rem 0;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    background-image:radial-gradient(at center center, white, transparent 70%);
  }
</style>
