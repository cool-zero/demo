<template>
  <router-link :to="to" tag="div"
               :style="{'background-color': backgroundColor}"
               :class="$style.container">
    <div :class="[$style.content, colorClass]">
      <img :src="src" :class="$style.img">
      <div :class="$style.stars" v-if="hasStars">
        <i class="fa fa-star" v-for="index in stars"></i>
      </div>
    </div>
    <div :class="$style.quantity" v-if="quantity">
      <i class="fa fa-times"></i>{{quantity}}
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'hk-material-img-temp',
    data() {
        return {};
    },
    props: {
      to: {
        type: [String, Object],
        default: ''
      },
      src: {
        type: String,
        default: ''
      },
      quantity: {
        type: Number
      },
      stars: {
        type: Number,
        default: 4
      },
      hasStars: {
        type: Boolean,
        default: true
      },
      backgroundColor: {
        type: String,
        default: 'white'
      }
    },
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
    computed: {
      colorClass() {
        switch(this.stars) {
          case 4: return this.$style.purple
        }
      }
    },
    methods: {}
  }
</script>

<style module>
  .container {
    width: 100px;
    height: 100px;
    border-radius: 0.7rem;
    padding: 0.375rem 0;
    background: white;
    position: relative;
  }

  .content {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    position: relative;
    border: 0.1875rem solid;
  }

  .content.purple {
    border-color: rgb(231, 162, 252);
    background: linear-gradient(180deg, rgb(104, 52, 156), rgb(183, 106, 219));
  }

  .content.blue {
    border-color: rgb(127, 228, 253);
    background: linear-gradient(180deg, rgb(42, 108, 168), rgb(84, 185, 227));
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .stars {
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateY(50%);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fddf4a;
  }

  .stars > i {
    transform: rotate(20deg);
  }

  .quantity {
    width: 68px;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 0);
    border-bottom-left-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
    background: white;
  }
</style>
