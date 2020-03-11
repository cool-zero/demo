<template>
  <ul :class="$style.list"
      @keydown="doListKeyDown">
    <li v-for="(item, index) in list"
        :class="[$style.item, {[$style.active]: activeIndex === index}]"
        @click="doItemClick($event, index)">
      {{item}}
    </li>
  </ul>
</template>

<script>
	export default {
		name: 'listPanel',
		data() {
			return {
        activeIndex: 0,
        maxIndex: 0
      };
		},
		props: {
      list: {
        type: Array,
        default: null
      }
    },
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {
      (this.list) && (this.maxIndex = this.list.length - 1);
      document.addEventListener('keydown', this.doListKeyDown);
    },
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {},
		methods: {
      doListKeyDown(e) {
        e.stopPropagation();
        e.preventDefault();
        if(e.keyCode === 40) {
          this.activeIndex ++;
        }else if(e.keyCode === 38) {
          this.activeIndex --;
        }
        this.activeIndex = Math.min(Math.max(this.activeIndex, 0), this.maxIndex);
      },
      doItemClick(e, index) {
        this.activeIndex = index;
      }
    }
	}
</script>

<style module>
  .list {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }

  .item {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    transition: all 0.3s;
  }

  .item + .item {
    margin-top: 0.3125rem;
  }

  .item.active {
    width: 120%;
  }
</style>
