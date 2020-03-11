<template>
  <div :class="$style.panel">
    <div :class="$style.container">
      <hk-page-panel :src="require('@/assets/蓝色.jpg')">
        <swiper-panel :titleList="titleList">
          <swiper-item>
            <attack-page></attack-page>
          </swiper-item>
          <swiper-item>
            <challenge-page></challenge-page>
          </swiper-item>
          <swiper-item>
            <event-page></event-page>
          </swiper-item>
        </swiper-panel>
      </hk-page-panel>
      <router-view name="adventure"></router-view>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'hkAdventure',
		data() {
			return {
        titleList: [
          {
            name: '出击',
            English: 'ATTACK'
          },
          {
            name: '挑战',
            English: 'CHALLENGE'
          },
          {
            name: '活动',
            English: 'EVENT'
          }
        ]
      };
		},
		props: [],
		components: {
      'hk-page-panel': () => import('@/components/hk-page-panel/hk-page-panel'),
      'swiper-panel': () => import('@/components/swiper-panel/swiper-panel'),
      'swiper-item': () => import('@/components/swiper-panel/swiper-item'),
      'attack-page': () => import('./hk-adventure-pages/attack-page'),
      'challenge-page': () => import('./hk-adventure-pages/challenge-page'),
      'event-page': () => import('./hk-adventure-pages/event-page')
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
		methods: {}
	}
</script>

<style module>
  .panel,
  .container{
    width: 100%;
    height: 100%;
  }

  .container {
    position: relative;
  }

  .view {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
