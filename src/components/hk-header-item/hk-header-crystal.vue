<template>
  <hk-header-item-panel
      :icon="require('@/assets/1.png')"
      @click="addCrystal">
    {{crystal}}
  </hk-header-item-panel>
</template>

<script>
	export default {
		name: 'hkHeaderCrystal',
		data() {
			return {
        crystal: this.$store.getters.getUser.crystal
      };
		},
		props: [],
		components: {
      'hk-header-item-panel': () => import('@/components/hk-header-item/hk-header-item-panel')
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
      addCrystal(e) {
        console.log('addCrystal has been clicked');
      }
    }
	}
</script>

<style module>

</style>
