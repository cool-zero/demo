<template>
  <hk-message-panel
    :confirm="false"
    :cancel="false"
    :class="$style.panel"
  >
    <div class="row-flex" :class="$style.container" @mousedown.stop.prevent="doMouseDown">
      <div class="column-flex space-between" :class="$style.icon">
        <div :class="$style['img-outer']">
          <img :src="material.src" alt="" :class="$style.img">
        </div>
        <div :class="$style.stars">
          <span v-for="index in material.level"
                class="fa fa-star font-yellow"
          >
          </span>
        </div>
      </div>
      <div :class="$style.nav">
        <div :class="$style.title">
          <i>{{material.name}}</i>
        </div>
        <div :class="$style.body">
          <scroll y-scroll-color="#61c1ff" :y-scroll-width="3">
            <ul
              v-if="material.obtainList"
              :class="$style.list"
            >
              <li
                v-for="(obtainItem, index) in material.obtainList"
                :class="$style.item"
              >
                <router-link :to="obtainItem.notOpen ? '' : obtainItem.to"
                             tag="div"
                             :style="{fontSize: (obtainItem.fontSize || 12) + 'px'}"
                             :class="[$style.router, {[$style['not-open']]: obtainItem.notOpen}]">
                  <span>{{obtainItem.message}}</span>
                  <span class="fa fa-play-circle"></span>
                </router-link>
              </li>
            </ul>
          </scroll>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="fa fa-exclamation-circle" font-blue font-75 :class="$style['footer-icon']"></div>
      <div font-blue font-75 :class="$style.footer">部分材料可以去商店碰碰运气哦</div>
    </template>
  </hk-message-panel>
</template>

<script>
    import HkMessagePanel from "./hk-message-panel";
    import scroll from "../scroll";
    export default {
        name: 'hk-material-obtain-tip',
        data() {
            return {};
        },
        props: {
          material: {
            type: Object
          }
        },
        components: {
          HkMessagePanel,
          scroll
        },
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
        methods: {
          doMouseDown() {}
        }
    }
</script>

<style module>
  .panel {
    width: 80vh;
    height: 50vh;
  }

  .container {
    position: relative;
    padding: 0.5rem 0.75rem;
  }

  .icon {
    height: 100%;
    width: 35%;
    margin-right: 1rem;
  }

  .nav {
    width: 1px;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .nav > .title {
    width: 100%;
    text-align: left;
    color: white;
    border-bottom: 0.5px solid #58c0f9;
    padding-bottom: 2px;
    margin-bottom: 2px;
  }

  .nav > .body {
    width: 100%;
    height: 1px;
    flex: 1;
  }

  .img-outer {
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }

  .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0.625rem;
  }

  .img-outer:before,
  .img-outer:after{
    content: '';
    display: block;
    position: absolute;
    width: 10%;
    height: 10%;
  }

  .img-outer:before {
    border-top: 0.1875rem solid #58c0f9;
    border-left: 0.1875rem solid #58c0f9;
    left: 0;
    top: 0;
  }

  .img-outer:after {
    border-bottom: 0.1875rem solid #58c0f9;
    border-right: 0.1875rem solid #58c0f9;
    bottom: 0;
    right: 0;
  }

  .stars {
    width: 100%;
    text-align: left;
  }

  .stars > span {
    transform: rotate(15deg);
  }

  .list {
    width: 100%;
    padding-right: 5px;
  }

  .item {
    color: black;
    width: 100%;
    font-weight: bolder;
  }

  .item + .item {
    margin-top: 0.125rem;
  }

  .router {
    display: flex;
    width: 100%;
    padding: 0.25rem 0.5rem;
    background-color: #58c0f9;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.25rem;
    font-size: 0.75rem;
  }

  .router:active {
    background-color: cyan;
  }

  .router.not-open {
    background-color: rgb(108, 117, 126);
  }

  .router.not-open:active {
    background-color: rgb(82, 92, 101);
  }

  .footer {
    padding: 0.125rem 0;
    font-weight: bolder;
  }

  .footer-icon {
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
