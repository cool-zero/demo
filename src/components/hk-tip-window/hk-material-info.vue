<template>
  <div :class="$style.container">
    <div :class="$style.dialog" :style="dialogStyle">
      <div class="column-flex" :class="$style.content">
        <div :class="$style.base">
          <div :class="$style.img">
            <hk-material-img :has-stars="false"
                             bg-color="transparent"
                             :level="material.level"
                             :src="material.src">
            </hk-material-img>
          </div>
          <div :class="$style.middleware">
            <div :class="$style.name"><i>{{material.name}}</i></div>
            <div :class="$style.quantity">
              <i font-blue>拥有数量&nbsp;</i>
              <i class="fa fa-times font-gray"></i>
              <i>{{material.quantity}}</i>
            </div>
          </div>
          <router-link tag="button"
                       class="btn-blue"
                       :class="$style.btn"
                       :to="material.to || ''"
          >
            获取
          </router-link>
        </div>
        <div :class="$style.info">
          {{material.info}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import HkMaterialImg from "../hk-material/hk-material-img";
    export default {
        name: 'hk-material-info',
        data() {
            return {};
        },
        props: {
          material: {
            type: Object
          },
          width: {
            type: String,
            default: '60vh'
          },
          height: {
            type: String,
            default: 'auto'
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
        computed: {
          dialogStyle() {
            return {
              width: this.width,
              height: this.height
            }
          }
        },
        methods: {}
    }
</script>

<style module>
  .container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  
  .dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60vh;
    height: auto;
    padding: 1rem;
  }

  .dialog:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    display: block;
    border: 3px solid rgba(136, 136, 136, 0.4);
    border-radius: 0.5rem;
    animation: pulse 0.5s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
    }
  }

  .content {
    border-radius: 0.5rem;
    background-color: rgba(29, 51, 88, 0.3);
    color: white;
    padding: 0.75rem;
  }

  .base{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }

  .img {
    width: 20%;
  }

  .middleware {
    text-align: left;
    margin-left: 0.25rem;
  }

  .name {
    margin-bottom: 0.5rem;
  }

  .quantity {
    font-size: 0.75rem;
  }

  .btn {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 0.125rem;
    padding: 0.125rem 1rem;
    color: white;
    font-weight: bold;
  }

  .info {
    text-align: left;
    width: 100%;
    font-size: 0.875rem;
  }
</style>
