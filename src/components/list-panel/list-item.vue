<template>
  <li :class="$style.container">
    <slot></slot>
  </li>
</template>

<script>
	export default {
		name: 'listItem',
		data() {
			return {};
		},
		props: [],
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
    height: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
  }

  .container.active {
    width: 120%;
  }

  .container + .container {
    margin-top: 0.3125rem;
  }
</style>
