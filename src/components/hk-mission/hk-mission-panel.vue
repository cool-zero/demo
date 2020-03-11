<template>
  <div :class="$style.container">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: 'hk-mission-panel',
        data() {
            return {};
        },
        props: {},
        components: {},
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
  .container {
    border: 0.125rem solid rgba(84, 84, 84, 0.2);
    border-radius: 0.5rem;
    position: relative;
    /*background-color: rgba(61, 101, 137, 0.36);*/
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
  }

  .container:before,
  .container:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 50%;
    background-color: rgba(92, 187, 251, 0.8);
    width: 0.25rem;
    border-radius: 0.3125rem;
  }

  .container:before {
    left: -0.125rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  .container:after {
    right: -0.125rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
</style>
