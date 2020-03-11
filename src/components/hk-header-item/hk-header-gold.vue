<template>
  <hk-header-item-panel
    :icon="require('@/assets/1.png')"
    @click="addGold">
    {{gold}}
  </hk-header-item-panel>
</template>

<script>
	export default {
		name: 'hkHeaderGold',
		data() {
			return {
        gold: this.$store.getters.getUser.gold
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
      addGold(e) {
        console.log("AddGold has been clicked.");
      }
    }
	}
</script>

<style module>

</style>
