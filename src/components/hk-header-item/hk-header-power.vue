<template>
  <hk-header-item-panel
      :icon="require('@/assets/1.png')"
      @click="addPower">
    {{power}}/{{maxPower}}
  </hk-header-item-panel>
</template>

<script>
	export default {
		name: 'hkHeaderPower',
		data() {
			return {
        power: this.$store.getters.getUser.power,
        maxPower: this.$store.getters.getUser.maxPower
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
      addPower(e) {
        console.log("addPower has been clicked.");
      }
    }
	}
</script>

<style module>

</style>
