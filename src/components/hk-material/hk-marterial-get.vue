<template>
  <router-link :to="to" tag="div"
               :class="$style.container">
    <div :class="$style.content">
      <hk-material-img :src="src"
                       :level="level"
                       :stars-offset="starsOffset">
      </hk-material-img>
    </div>
    <div :class="$style.quantity" v-if="quantity">
      <i class="fa fa-times"></i>{{quantity}}
    </div>
  </router-link>
</template>

<script>
    import HkMaterialImg from "./hk-material-img";
    export default {
        name: 'hk-marterial-get',
        data() {
            return {
              starsOffset: 20
            };
        },
        props: {
          to: {
            type: String,
            default: ''
          },
          src: {
            type: String
          },
          level: {
            type: Number,
            default: 3
          },
          quantity: {
            type: Number,
            default: 9999
          }
        },
        components: {HkMaterialImg},
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
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .content {
    background-color: white;
    width: 100%;
    padding: 5% 0;
    border-radius: 0.6rem;
  }

  .quantity {
    font-size: 0.875rem;
    width: 68.75%;
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
    background: white;
  }
</style>
