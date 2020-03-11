<template>
  <li :class="container">
    <div :class="$style.body"></div>
    <div :class="$style.children"
         v-if="item.children && item.children.length"
    >
      <tree-list :list="item.children"></tree-list>
    </div>
  </li>
</template>

<script>
    import TreeList from "./tree-list";
    export default {
        name: 'tree-item',
        data() {
            return {};
        },
        props: {
          item: {
            type: Object
          }
        },
        components: {TreeList},
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        computed: {},
        methods: {}
    }
</script>

<style module>
</style>
