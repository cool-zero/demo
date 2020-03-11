<template>
  <div
    :class="$style.container"
    @mousemove="containerMouseMove">
    <div :class="$style['plants-list']" >
      <div v-if="isTableList" :class="$style['table-list']" :style="plantOptionsStyle">
        <div
          :class="$style['plant-options']"
          :style="{width: stageWidth / horizontalNumber, height: stageHeight / 6}"
          v-for="(option, index) of plantOptions"
          :key="index"
          @click="plantOptionClick(index, $event)">
          <div
            :class="$style['plant-option-img']"
            v-if="option">
            <img :src="option.src" alt="" />
          </div>
          <div :class="$style['plant-option-cost']" v-if="option">
            {{option.cost}}
          </div>
          <div
            v-if="option"
            :class="$style['plant-option-mask']"
            :style="{height: `${(
                option.entity.cost <= sunlight ?
                option.entity.prepareTime / option.entity._initPrepareTime : 1
              ) * 100}%`}"
          ></div>
        </div>
      </div>
    </div>
    <canvas
      @click.stop="stageClick"
      :width="stageWidth"
      :height="stageHeight"
      ref="stage"
      id="stageCvs"
    ></canvas>
    <div :class="$style.extra">
      <img
        v-show="plantSelected.src"
        :src="plantSelected.src"
        alt=""
        :class="$style['plant-selected']"
        :style="plantSelectedStyle"/>
    </div>
  </div>
</template>

<script>
  import PeaseShooter from './classes/Plants/PeaseShooter';
  import Pea from "./classes/Bullets/Pea";
  import PlantOption from "./classes/PlantOption";
  import Sunflower from "./classes/Plants/Sunflower";
  import Sunlight from "./classes/Bullets/Sunlight";
  import Zombie from "./classes/Zombie";
  export default {
    name: 'pvz-main',
    data() {
      return {
        isTableList: true,
        stageWidth: 630,
        stageHeight: 480,
        plantOptionsSize: 6,
        horizontalNumber: 9,
        verticalNumber: 5,
        plantOptions: new Array(this.plantOptionsSize),
        images: {},
        plants: [],
        bullets: [],
        plantPreparing: null,
        plantSelected: { x: 0, y: 0, src: null, plant: null },
        unexpectedPoints: [],
        sunlight: 100,
        zombies: [],
        animation: null,
        lastFrame: null
      };
    },
    props: {},
    components: {},
    beforeCreate() {
    },
    created() {
      for (let i = 0; i < this.plantOptionsSize; i++) {
        this.$set(this.plantOptions, i, null)
      }
    },
    beforeMount() {
    },
    mounted() {
      const canvas = this.$refs.stage;
      this.images.peaseShooter = PeaseShooter.createImg();
      this.images.pea = Pea.createImg();
      this.$set(this.plantOptions, 0, new PlantOption(PeaseShooter));
      this.$set(this.plantOptions, 1, new PlantOption(Sunflower));
      this.zombies.push(new Zombie(canvas.width, canvas.height));
      this.start();
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
      plantOptionsWidth() {
        return this.stageWidth / this.horizontalNumber * 0.8 * this.plantOptionsSize;
      },
      plantOptionsHeight() {
        return this.stageHeight / 6 * 0.8;
      },
      plantOptionsStyle() {
        return {
          width: `${this.plantOptionsWidth}px`,
          height: `${this.plantOptionsHeight}px`
        };
      },
      plantSelectedStyle() {
        return {
          left: `${this.plantSelected.x}px`,
          top: `${this.plantSelected.y}px`
        }
      }
    },
    methods: {
      /**
       * @param {MouseEvent} e
       */
      containerMouseMove(e) {
        if(this.plantSelected.src) {
          this.plantSelected.x = e.clientX;
          this.plantSelected.y = e.clientY;
        }
      },
      plantOptionClick(index, e) {
        const option = this.plantOptions[index];
        if(option) {
          if(option.entity.prepareTime > 0) {
            console.log('还在准备中......');
            return false;
          }
          if(!option.entity.hasEnoughSunlight(this.sunlight)) {
            console.log('阳光不足......');
            return false;
          }
          this.plantSelected.plant = option;
          this.plantSelected.src = option.img.toDataURL('image/png');
        }
      },
      stageClick(e) {
        if(this.plantSelected.src) {
          this.plantPreparing = this.plantSelected.plant;
          this.plantPreparing.setPlanted(e.offsetX, e.offsetY);
          this.plantSelected.plant = null;
          this.plantSelected.src = null;
        }else {
          this.unexpectedPoints.push({
            'x': e.offsetX,
            'y': e.offsetY
          });
        }
      },
      update() {
        const now = Date.now();
        const stageCvs = this.$refs.stage || document.querySelector('#stageCvs');
        const deltaMillSec = now - this.lastFrame;
        this.lastFrame = now;
        const plants = this.plants;
        const bullets = this.bullets;
        const unitWidth = stageCvs.width / this.horizontalNumber;
        const unitHeight = stageCvs.height / this.verticalNumber;
        const context = stageCvs.getContext('2d');
        /**
         * 绘制场景
         */
        context.clearRect(0, 0, stageCvs.width, stageCvs.height);
        context.save();
        context.beginPath();
        for (let i = 0; i <= this.horizontalNumber; i++) {
          context.moveTo(i * unitWidth, 0);
          context.lineTo(i * unitWidth, stageCvs.height);
        }
        for (let i = 0; i <= this.verticalNumber; i++) {
          context.moveTo(0, i * unitHeight);
          context.lineTo(stageCvs.width, i * unitHeight);
        }
        context.lineWidth = '1';
        context.strokeStyle = 'rgba(255, 0, 0, 0.1)';
        context.closePath();
        context.stroke();
        context.restore();
        for(let i = 0; i < this.horizontalNumber; i++) {
          for (let j = 0; j < this.verticalNumber; j++) {
            context.save();
            context.beginPath();
            if((i + j) % 2 === 0) {
              context.fillStyle = 'rgba(14,244,37,0.9)';
            }else {
              context.fillStyle = 'rgba(15,255,56,0.96)';
            }
            context.rect(i * unitWidth, j * unitHeight, unitWidth, unitHeight);
            context.fill();
            if(this.plantPreparing
              && context.isPointInPath(
                this.plantPreparing.bePlantedX,
                this.plantPreparing.bePlantedY)
            ) {
              const clazz = this.plantPreparing.class;
              this.$set(
                plants,
                plants.length,
                new clazz(
                  i * unitWidth + (unitWidth - clazz.getWidth()) / 2,
                  j * unitHeight + (unitHeight - clazz.getHeight()) / 2
                )
              );
              this.plantPreparing.entity.initPrepareTime();
              this.plantPreparing = null;
            }
            context.closePath();
            context.restore();
          }
        }

        for (let i = 0; i < plants.length; i++) {
          const plant = plants[i];
          let bullet = null;
          (plant.attack) && (bullet = plant.attack(deltaMillSec));
          (bullet) && (bullets.push(...bullet));
          // draw plant
          context.save();
          context.drawImage(plant.img, plant.x, plant.y);
          context.restore();
        }
        for (let i = 0; i < bullets.length; i++) {
          const bullet = bullets[i];
          if(!bullet) continue;
          (bullet.move) && (bullet.move(deltaMillSec));
          // draw bullet
          context.save();
          context.beginPath();
          context.rect(bullet.x, bullet.y, bullet.img.width, bullet.img.height);
          context.strokeStyle = 'rgba(0,0,0,0)';
          context.stroke();
          context.drawImage(bullet.img, bullet.x, bullet.y);
          context.closePath();
          for (let j = 0; j < this.unexpectedPoints.length; j++) {
            const point = this.unexpectedPoints[i];
            if(context.isPointInPath(point.x, point.y)) {
              if(bullet.award) {
                if(bullet instanceof Sunlight) {
                  this.sunlight += bullet.award();
                }
              }
            }
          }
          this.unexpectedPoints.length = 0;
          context.restore();
        }
        // 僵尸信息更新
        for (let i = this.zombies.length - 1; i >= 0; i--) {
          /**
           * @type {Zombie}
           */
          const zombie = this.zombies[i];
          if(!zombie instanceof Zombie) {
            this.zombies[i] = null;
            continue;
          }
          zombie.updateDebuff(deltaMillSec);
          zombie.move(deltaMillSec);
          zombie.attack(deltaMillSec);
          zombie.draw(context);
          this.bullets.forEach(bullet => zombie.beAttacked(bullet));
        }
        // 子弹飞出边界判定
        for (let i = 0; i < bullets.length; i++) {
          bullets[i].edgeDetect(stageCvs.width);
          if(bullets[i].isDisabled) {
            bullets.splice(i, 1);
          }
        }
        // 刷新植物准备时间
        for (let i = 0; i < this.plantOptions.length; i++) {
          const option = this.plantOptions[i];
          (option) && (option.entity.updatePrepareTime(deltaMillSec));
        }
        // 清除死亡僵尸
        let tempZombie;
        for (let i = this.zombies.length - 1; i >= 0; i--) {
          tempZombie = this.zombies[i];
          if(tempZombie instanceof Zombie) {
            if(tempZombie.isDisabled) this.zombies.splice(i, 1);
          }else {
            this.zombies.splice(i, 1);
          }
        }
        this.animation = requestAnimationFrame(this.update);
      },
      start() {
        this.lastFrame = Date.now();
        this.animation = requestAnimationFrame(this.update);
      },
      end() {},
      pause() {
        if(this.animation) {
          cancelAnimationFrame(this.animation);
          this.animation = null;
        }
      }
    }
  }
</script>

<style module>
  .container {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .container > .extra {
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    pointer-events: none;
  }

  .canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
  }

  .plants-list {
    align-self: flex-start;
    border: 1px solid black;
  }

  .plants-list > .table-list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background: #be3434;
  }

  .plant-options {
    height: 100%;
    width: 100%;
    border: 1px solid #782121;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .plant-option-mask {
    width: 100%;
    background: rgba(0,0,0,0.3);
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .plant-option-cost {
    text-align: center;
    background: white;
    font-size: 0.5em;
    padding: 1px 0;
  }

  .plant-option-img {
    width: 100%;
    height: 1px;
    flex: 1;
    box-shadow: 0 0 5px rgb(125, 255, 12) inset;
    border-radius: inherit;
  }

  .plant-option-img > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .plant-selected {
    transform: translate(-50%, -50%);
    position: absolute;
    user-select: none;
  }
</style>
