<template>
  <hk-message-panel
    :header="header"
    :has-footer="false"
  >
    <div :class="$style.container" class="column-flex">
      <div font-gray font-75>
        {{info}}
      </div>
      <div :class="$style['game-rewards']">
        <span font-white font-75>玩法奖励：</span>
        <hk-material-img
          width="2rem"
          v-for="(item, index) in gameRewards"
          :key="item.key"
          :src="item.src"
          :level="item.level"
          border-width="1px"
          border-radius="0.4rem"
          stars-size="0.5rem"
        >
        </hk-material-img>
      </div>
      <div :class="$style.missions">
        <scroll
          :y-scroll-width="3"
          y-scroll-color="#61c1ff"
        >
          <div :class="$style.list">
            <hk-mission-item
              font-size="0.5rem"
              v-for="(item, index) in missions"
              :mission="item"
              :key="item.key"
            >
            </hk-mission-item>
          </div>
        </scroll>
      </div>
    </div>
  </hk-message-panel>
</template>

<script>
    import HkMessagePanel from "./hk-message-panel";
    import HkMaterialImg from "../hk-material/hk-material-img";
    import HkMissionItem from "../hk-mission/hk-mission-item";
    export default {
        name: 'hk-check-points-mission',
        data() {
            return {};
        },
        props: {
          header: {
            type: String
          },
          info: {
            type: String
          },
          gameRewards: {
            type: Array
          },
          missions: {
            type: Array
          }
        },
        components: {
          HkMissionItem,
          HkMaterialImg,
          HkMessagePanel,
          scroll: () => import('@/components/scroll')
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
        methods: {}
    }
</script>

<style module>
  .container {}

  .game-rewards {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .missions {
    border-top: 2px solid rgba(255, 255, 255, 0.4);
    width: 100%;
    height: 1px;
    flex: 1;
  }

  .list {
    padding: 0.125rem 0.25rem 0 0 ;
  }

  .list > div + div {
    margin-top: 0.25rem;
  }
</style>
