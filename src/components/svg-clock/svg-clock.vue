<template>
  <div>
    <svg viewBox="0 0 300 300">
      <circle cx="150" cy="150" r="3" stroke-width="2" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.8)"/>
      <text v-for="(item,index) of numbers" x="150" y="150"
          :dx="item.dx"
          :dy="item.dy">
        {{item.number}}
      </text>
      <circle cx="150" cy="150" r="145" stroke-width="10" fill="rgba(0,0,0,0)" stroke="rgba(0,0,0,0.8)"/>
      <line x1="150" y1="160" x2="150" y2="40" style="stroke:rgb(0,0,255);stroke-width:3" :transform="minuteRotate"/>
      <line x1="150" y1="160" x2="150" y2="80" style="stroke:rgb(0,255,0);stroke-width:3" :transform="hourRotate" />
      <line x1="150" y1="160" x2="150" y2="30" style="stroke:rgb(255,0,0);stroke-width:2" :transform="secondRotate"/>
    </svg>
  </div>
</template>

<script>
	export default {
		name:'',
		data(){
			return {
        startAnimation: null,
        hourAngle: 0,
        minuteAngle: 0,
        secondAngle: 0,
        numbers: [
          {number: 1, dx: 65, dy: -112.6},
          {number: 2, dx: 112.6, dy: -65},
          {number: 3, dx: 130, dy: 0},
          {number: 4, dx: 112.6, dy: 65},
          {number: 5, dx: 65, dy: 112.6},
          {number: 6, dx: 0, dy: 130},
          {number: 7, dx: -65, dy: 112.6},
          {number: 8, dx: -112.6, dy: 65},
          {number: 9, dx: -130, dy: 0},
          {number: 10, dx: -112.6, dy: -65},
          {number: 11, dx: -65, dy: -112.6},
          {number: 12, dx: 0, dy: -130}]
      };
		},
		props:[],
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {
      this.startAnimation = null;
      this.animationClock();
    },
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {
      hourRotate() {
        return `rotate(${this.hourAngle}, 150 150)`;
      },
      minuteRotate() {
        return `rotate(${this.minuteAngle}, 150 150)`;
      },
      secondRotate() {
        return `rotate(${this.secondAngle}, 150 150)`;
      }
    },
		methods: {
      animationClock() {
        const now = new Date();
        const milliSecond = now.getMilliseconds();
        const second = now.getSeconds() + milliSecond / 1000;
        const minute = now.getMinutes() + second / 60;
        const hour = now.getHours() + minute / 60;
        const hour12 = hour % 12;
        this.secondAngle = second * 6;
        this.minuteAngle = minute * 6;
        this.hourAngle = hour12 * 30;
        requestAnimationFrame(this.animationClock);
      }
    }
	}
</script>

<style scoped>
  text {
    text-anchor: middle;
    dominant-baseline: middle;
  }
</style>
