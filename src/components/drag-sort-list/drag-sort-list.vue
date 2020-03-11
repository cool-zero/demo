<template>
  <transition-group tag="ul" :class="$style.list" v-if="contentList" >
    <li v-for="(item, index) in list"
        :key="item.key"
        :class="[$style.item, {[$style.enter]: dragEnterIndex === index && index !== draggingIndex}]"
        draggable="true"
        @dragstart="doDragStart($event, index)"
        @dragenter.prevent="doDragEnter($event, index)"
        @dragleave.prevent="doDragLeave($event, index)"
        @dragover.stop.prevent="doDragOver($event, index)"
        @dragend.prevent="doDragEnd($event, index)"
        @drag.prevent="doDrag($event, index)"
        @drop.prevent="doDrop($event, index)"
    >
      <div :class="$style.body">
        <span class="fa"
              @click="doItemSelected($event, index)"
              :class="[itemSelectClass(item), $style.select]">
        </span>
        {{item.value}}
        <span v-if="item.children && item.children.length"
              class="fa fa-sort-up"
              @click="liClick($event, index)"
              :class="[$style.btn, {[$style.open]: item.open}]">
        </span>
      </div>
      <div v-if="item.children && item.children.length"
           v-show="item.open"
           :class="[$style.children, {[$style.open]: item.open}]">
        <drag-sort-list :content-list="item.children" />
      </div>
<!--      <transition-->
<!--        @before-enter="beforeEnter"-->
<!--        @enter="enter"-->
<!--        @leave="leave"-->
<!--      >-->
<!--      </transition>-->
<!--      <transition-->
<!--        :enter-active-class="$style['children-enter-active']"-->
<!--        :leave-active-class="$style['children-leave-active']"-->
<!--        :enter-class="$style['children-enter']"-->
<!--        :enter-to-class="$style['children-enter-to']"-->
<!--        :leave-to-class="$style['children-leave-to']"-->
<!--      >-->
<!--      </transition>-->
    </li>
  </transition-group>
</template>

<script>
  export default {
    name: 'drag-sort-list',
    components: {},
    props: {
      contentList: {
        type: Array,
        required: true
      }
    },
    data() {
        return {
          draggingIndex: -1,
          dragEnterIndex: -1,
          draggingEl: null,
          list: null
        };
    },
    computed: {
      itemSelectClass() {
        return function (item) {
          return {
            'fa-check-square': item.selected === 'all',
            'fa-minus-square': item.selected === 'part',
            'fa-square-o': item.selected === 'none'
          }
        }
      }
    },
    beforeCreate() {
    },
    created() {
      this.list = this.contentList.concat();
      this.list.forEach(item => {
        item.open = false;
      });
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
    methods: {
      doDrag(e, index) {
        // console.log(e);
        // console.log('dragging => ', e.target);
      },
      doDragEnd(e, index) {
        // console.log('dragEnd => ', e.target);
        this.dragEnterIndex = -1;
      },
      doDragEnter(e, index) {
        // console.log('dragEnter => ', e.target);
        if(!this.draggingEl) return ;
        if(this.draggingEl.parentNode !== e.currentTarget.parentNode) return;
        this.dragEnterIndex = index;
      },
      doDragLeave(e, index) {
        // console.log('dragExit => ', e.target);
      },
      doDragOver(e, index) {
        // console.log('dragOver => ', e.target);
      },
      //dragstart->drag->dragenter->dragover->dragleave->drop->dragend
      doDragStart(e, index) {
        console.log('dragStart => ', e.target);
        this.draggingIndex = index;
        this.draggingEl = e.target;
        e.dataTransfer.setData("Text",'1');
        e.target.style.opacity = .2;
      },
      doDrop(e, index) {
        console.log('drop => ', e.target);
        if(!this.draggingEl) {
          this.draggingIndex = -1;
          return;
        }
        this.draggingEl.style.opacity = 1;
        if(this.draggingEl.parentNode !== e.currentTarget.parentNode) {
          this.draggingEl = null;
          this.draggingIndex = -1;
          return;
        }
        this.draggingEl = null;
        const dragItem = this.list[this.draggingIndex];
        this.list.splice(this.draggingIndex, 1);
        this.list.splice(index, 0, dragItem);
        this.draggingIndex = -1;
      },
      liClick(e, index) {
        this.list[index].open = !(this.list[index].open);
      },
      doItemSelected(e, index) {
        switch (this.list[index].selected) {
          case 'all':
          case 'part':
            this.setItemSelected(this.list[index], 'none');
            this.setItemParent();
            break;
          case 'none':
            this.setItemSelected(this.list[index], 'all');
            this.setItemParent();
            break;
          default:
            break;
        }
      },
      setItemSelected(item, selected) {
        item.selected = selected;
        if(item.children) {
          const that = this;
          item.children.forEach(child => that.setItemSelected(child, selected));
        }
      },
      setItemParent() {
        let point = this;
        let temp;
        while(point) {
          if(point.$options.name === this.$options.name) {
            temp = point;
          }
          point = point.$parent;
        }
        this.setAll(temp.list);
      },
      setAll(list) {
        let result;
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if(item.children) {
            item.selected = this.setAll(item.children);
          }
          if(i === 0) result = item.selected;
          if(result !== 'part' && item.selected !== result) {
            result = 'part';
          }
        }
        return result;
      },
      beforeEnter(el) {
      },
      enter(el, done) {},
      leave(el, done) {}
    }
  }
</script>

<style module>
  .list {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    flex-direction: column;
    text-align: left;
  }

  .item {
    padding-left: 1rem;
    margin: 0.25em;
    background-color: rgba(124,252,0,0.2);
    transition: all 0.8s, box-shadow 0.1s;
    position: relative;
  }

  .item.enter {
    box-shadow: 0 0 0 3px rgba(255, 255, 0, 0.49), 0 0 0 3px rgba(255, 255, 0, 0.49) inset;
  }

  .item .body {
    position: relative;
  }

  .item .btn {
    position: absolute;
    right: 0.5em;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.5s;
  }

  .item .btn.open {
    transform: translateY(-50%) rotate(180deg);
  }

  .item .select {
    display: inline-block;
    text-align: center;
    width: 1em;
    line-height: 1em;
    height: 1em;
  }

  .item .children {
    padding-left: 1em;
    transform: scaleY(0);
    transition: all 0.5s;
    transform-origin: top;
    width: 100%;
  }

  .children-enter-active,
  .children-leave-active {
    transition: all 0.5s;
    transform-origin: top;
  }

  .children-enter-to{
    transform: scaleY(1);
  }

  .children-enter,
  .children-leave-to {
    transform: scaleY(0);
  }

  .item .children.open {
    transform: scaleY(1);
  }
</style>
