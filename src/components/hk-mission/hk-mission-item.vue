<template>
  <hk-mission-panel
    :style="{fontSize: fontSize}"
    :class="$style.container" v-if="mission">
    <div :class="[$style.content, {[$style['clear-border']]: contentBorderRight}]">
      <div :class="$style.header">
        <i :class="$style['mission-name']" v-html="mission.name"></i>
        <span v-html="mission.type"></span>
        <div :class="$style.bar"></div>
      </div>
      <div :class="$style.body">
        <span v-html="mission.desc"></span>
      </div>
      <div :class="$style.footer">
        <div :class="$style.progress" :style="progressStyle"></div>
        <span v-html="mission.progress"></span>
        <span>/</span>
        <span v-html="mission.total"></span>
      </div>
    </div>
    <div :class="$style.boundary"></div>
    <div :class="$style.award" :style="awarsStyle">
      <div :class="$style['award-item']"
           v-for="(item, index) in mission.award">
        <hk-material-img :src="item.src"
                         :level="item.level"
                         :has-stars="false"
                         border-width="1px"
                         border-radius="0.3rem"
                         bg-color="transparent">
        </hk-material-img>
        <div><i class="fa fa-times"></i><i>{{item.quantity}}</i></div>
      </div>
    </div>
    <div :class="$style.router">
      <div :class="$style['time-remain']" >
        <i class="fa fa-clock-o"></i>
        <span v-html="mission.timeRemain"></span>
      </div>
      <router-link
        :to="mission.to || ''"
        tag="div"
        class="btn-yellow"
        :class="$style.btn"
      >
        前往
      </router-link>
    </div>
  </hk-mission-panel>
</template>

<script>
    import HkMissionPanel from "./hk-mission-panel";
    import HkMaterialImg from "../hk-material/hk-material-img";
    export default {
        name: 'hk-mission-item',
        data() {
            return {};
        },
        props: {
          mission: {
            type: Object
          },
          contentBorderRight: {
            type: Boolean,
            default: false
          },
          awardWidth: {
            type: String,
            default: 'auto'
          },
          fontSize: {
            type: String,
            default: '0.75rem'
          }
        },
        components: {HkMaterialImg, HkMissionPanel},
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
          progressStyle() {
            return {
              width: `${this.mission.progress * 100 / this.mission.total}%`
            }
          },
          awarsStyle() {
            return {
              width: this.awardWidth
            };
          }
        },
        methods: {}
    }
</script>

<style module>
  .container {
    font-size: 0.75rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em;
  }

  .content,
  .award,
  .router,
  .header,
  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content,
  .router{
    flex-direction: column;
  }

  .content {
    width: 1px;
    flex: 1;
    padding-right: 0.5em;
    margin-right: 0.5em;
    border-right: 2px solid rgba(82, 118, 150, 0.55);
  }

  .clear-border {
    border: none;
  }

  .content > div {
    width: 100%;
  }

  .body {
    margin: 0.375em auto;
  }

  .header {
    justify-content: space-between;
    position: relative;
    padding-bottom: 0.375rem;
  }

  .mission-name {
    font-size: 1.17em;
  }

  .bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.125em;
    background-image: linear-gradient(
      90deg,
      rgb(238, 183, 145) 2%,
      transparent 2%,
      transparent 4%,
      rgba(238, 183, 145, 0.5) 4%,
      rgba(238, 183, 145, 0.5) 96%,
      transparent 96%,
      transparent 98%,
      rgb(238, 183, 145) 98%
    );
  }

  .body {
    text-align: left;
  }

  .footer {
    height: 0.375em;
    background-color: rgba(29, 50, 71, 0.58);
    transform: skew(-10deg);
    position: relative;
    border-radius: 0.125em;
  }

  .progress {
    height: 100%;
    background-color: #08c5fc;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: inherit;
  }

  .award {
    justify-content: flex-end;
  }

  .award-item {
    width: 3em;
    margin: auto 0.125em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .award-item > * {
    white-space: nowrap;
  }

  .router {
    align-items: stretch;
    margin-left: 0.25em;
  }

  .time-remain {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.1875rem;
    padding: 0.125em 1em;
  }

  .btn {
    margin-top: 0.5em;
    color: black;
    font-weight: bolder;
    padding: 0.25em 1.25em;
    border-radius: 0.1875em;
  }
</style>
