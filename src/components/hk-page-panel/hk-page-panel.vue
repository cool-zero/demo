<template>
  <div :class="$style.panel">
    <div class="column-flex" :class="$style.container">
      <img :src="src"  alt="" :class="$style.img"/>
      <div :class="$style.background" :style="{'background-color': backgroundColor}"></div>
      <header class="row-flex space-between" :class="$style.header">
        <div class="row-flex width-auto" :class="$style.buttons">
          <quadrilateral-btn @click="goBack">
            <i class="fa fa-angle-left"></i>&nbsp;返回
          </quadrilateral-btn>
          <quadrilateral-btn @click="goHome">
            <i class="fa fa-home"></i>&nbsp;主菜单
          </quadrilateral-btn>
        </div>
        <div class="row-flex width-auto">
          <hk-header-power></hk-header-power>
          <hk-header-gold></hk-header-gold>
          <hk-header-crystal></hk-header-crystal>
        </div>
      </header>
      <div :class="$style.body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'hkPagePanel',
		data() {
			return {};
		},
		props: {
      src: {
        type: String,
        default: null
      },
      backgroundColor: {
        type: String,
        default: 'transparent'
      }
    },
		components: {
      'quadrilateral-btn': () => import('@/components/buttons/quadrilateral-btn'),
      'hk-header-gold': () => import('@/components/hk-header-item/hk-header-gold'),
      'hk-header-crystal': () => import('@/components/hk-header-item/hk-header-crystal'),
      'hk-header-power': () => import('@/components/hk-header-item/hk-header-power')
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
      goBack() {
        this.$router.go(-1);
      },
      goHome() {
        (this.$route.path !== '/') && (this.$router.push('/'));
      }
    }
	}
</script>

<style module>
  .panel {
    width: 100%;
    height: 100%;
    min-width: 50rem;
  }

  .container {
    width: 100%;
    height: 100%;
    padding: 0.5rem 1rem;
    position: relative;
  }

  .img {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    filter: blur(10px);
  }

  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: transparent;
    background-image:
      linear-gradient(180deg, rgba(255,255,255,0.1)1%, transparent 1%, transparent 50%, rgba(255,255,255,0.1)50%,rgba(255,255,255,0.1)51%,transparent 51%),
      linear-gradient(60deg, transparent 49.5%,rgba(255,255,255,0.1)49.5%, rgba(255,255,255,0.1) 50.5%, transparent 50.5%),
      linear-gradient(120deg, transparent 49.5%,rgba(255,255,255,0.1)49.5%, rgba(255,255,255,0.1) 50.5%, transparent 50.5%);
    background-size: 70px 121.24px;
  }

  .header {
    height: auto;
    margin-bottom: 0.5rem;
  }

  .body {
    height: 100px;
    width: 100%;
    flex: 1;
    padding-top: 0.625rem;
    position: relative;
  }

  .buttons > * + * {
    margin-left: 0.5rem;
  }
</style>
