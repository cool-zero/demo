<template>
  <div :class="$style.container">
    <input type="text"
      :class="$style.input"
      ref="input"
      v-model="value"/>
    <transition>
      <transition-group tag="ul"
        :class="$style['options-list']"
        name="options"
        :enter-active-class="$style['options-enter-active']"
        :enter-class="$style['options-enter']"
        :leave-active-class="$style['options-leave-active']"
        :move-class="$style['options-move']"
        :leave-to-class="$style['options-leave-to']">
        <li :class="$style.option"
          v-for="(option, index) in list"
          @click.stop.prevent="doOptionClick($event, index)"
          v-if="maxLength && index < maxLength"
          :key="option"
          :title="option"
          :data-index="index"
          v-show="option.toLowerCase().includes(value.toLowerCase())"
        >
          <p>{{option}}</p>
          <span v-if="optionRemoveBtn"
            @click.stop.prevent="doRemoveClick($event, index)"
            :class="$style.remove"
            class="fa fa-close">
          </span>
        </li>
      </transition-group>
    </transition>
    <button type="button" :class="$style.clear" @click="doClearClick">
      <i class="fa fa-close"></i>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'selectInput',
    data() {
      return {
        list: [],
        value: ""
      };
    },
    props: {
      options: {
        type: Array,
        default: null
      },
      maxLength: {
        type: Number,
        default: 10
      },
      optionRemoveBtn: {
        type: Boolean,
        default: true
      },
      clearBtn: {
        type: Boolean,
        default: true
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
      this.list = [...this.options];
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
    },
    methods: {
      doInput(e) {
        console.log(e.target.value);
        this.$emit('input', e);
      },
      doClearClick(e) {
        this.value = "";
        this.$emit('clear', e);
      },
      doOptionClick(e, index) {
        this.value = this.list[index];
        this.$emit('selected', e, index, this.value);
      },
      doRemoveClick(e, index) {
        this.list.splice(index, 1);
        this.$emit('remove', e, index);
      },
      beforeEnter(el) {
        el.style.opacity = 0;
        el.style.height = 0;
      },
      enter(el, done) {
        const delay = el.dataset.index * 150;
        setTimeout(function () {
          el.style.opacity = 1;
          el.style.height = 'auto';
        }, delay)
      },
      leave(el, done) {
        const delay = el.dataset.index * 150;
        setTimeout(function () {
          el.style.opacity = 0;
          el.style.height = 0;
        }, delay);
      }
    }
  }
</script>

<style module>
  .container {
    width: auto;
    height: auto;
    position: relative;
  }

  .input {
    width: 100%;
    height: 100%;
    padding: 0.25rem 0.125rem;
    border: 0.0625rem solid #C0C0C0;
    border-radius: 0.3125rem;
  }

  .input:focus {
    border-color: cyan;
    box-shadow: 0 0 0.25rem cyan inset;
  }

  .clear {
    position: absolute;
    height: 100%;
    right: 0;
    top: 0;
    padding: 0.375rem;
    background: transparent;
    color: #888888;
    cursor: pointer;
    transition: all 0.3s;
  }

 .clear:hover {
    color: black;
  }

  .options-list {
    position: absolute;
    width: 100%;
    height: auto;
    left: 0;
    top: 100%;
    padding: 0.25rem;
    margin: 0.125rem auto;
    box-shadow: 0 0 0.3125rem #08c5fc inset;
    border-radius: 0.3125rem;
    /* display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column; */
    transform: scaleY(0);
    transition: all 0.3s;
    transform-origin: 50% 0;
  }

  .input:focus + .options-list,
  .options-list:hover {
    transform: scaleY(1);
  }

  .option {
    width: 100%;
    padding: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: all 0.3s;
  }

  .option:hover {
    box-shadow: 0 0 0.375rem cyan inset;
  }

  .option > p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .remove {
    display: block;
  }

  .remove:hover {
    color: red;
  }

  .options-move {
    transition: all 0.5s;
  }

  .options-enter-active,
  .options-leave-active {
    position: absolute;
    height: 0;
  }

  .options-leave-to,
  .options-enter
  /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-1.875rem);
  }
</style>
