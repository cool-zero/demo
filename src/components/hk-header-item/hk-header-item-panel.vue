<template>
  <div :class="$style.panel">
    <div :class="$style.container">
      <div :class="$style.message">
        <slot></slot>
      </div>
      <img :src="icon" :class="$style.icon"  alt="1"/>
      <hexagon-btn :class="$style.btn" @click="doClick">
        <span class="fa fa-plus"></span>
      </hexagon-btn>
    </div>
  </div>
</template>

<script>
	export default {
		name: 'hkHeaderItemPanel',
		data() {
			return {};
		},
		props: {
      icon: {
        type: String
      }
    },
		components: {
      'hexagon-btn': () => import('@/components/buttons/hexagon-btn')
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
      doClick(e) {
        this.$emit('click', e);
      }
    }
	}
</script>

<style module>
  .container {
    position: relative;
    padding: 0 2.5rem;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border-radius: 0.25rem;
    transform: skew(-10deg);
    margin-right: 1.5rem;
  }

  .message {
    font-size: 0.875rem;
    padding-left: 1rem;
  }

  .icon {
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    object-fit: contain;
    left: 0.5rem;
    bottom: -0.25rem;
    transform: skew(10deg);
  }

  .btn {
    position: absolute;
    width: 1.75rem;
    height: 1.75rem;
    right: 0;
    top: 50%;
    transform: skew(10deg) translate(50%, -50%);
  }
</style>
