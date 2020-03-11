<template>
  <svg style="width: 0 !important; height: 0 !important; display: none">
    <defs>
      <path :d="hexagon" id="hexagonPath" />
      <clipPath id="clipHexagon" clipPathUnits="objectBoundingBox">
        <path :d="percentHexagon" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
	export default {
		name:'',
		data(){
			return {};
		},
		props: {
		  cutLine: {
		    type: Number,
		    default: 15
		  }
		},
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {},
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {
      percentHexagon() {
        let cutLine = this.cutLine / 200;
        const longer = (cutLine / 2 * Math.sqrt(3));
        const shorter = (cutLine / 2);
        const left = 13.4 / 200;
        const right = 186.6 / 200;
        const middle = 0.5;
        const top = 0;
        const bottom = 1;
        const quarter = 0.25;
        const quarter3 = 0.75;
        return `M ${middle - longer} ${top + shorter}
                Q ${middle} ${top} ${middle + longer} ${top + shorter}
                L ${right - longer} ${quarter - shorter}
                Q ${right} ${quarter} ${right} ${quarter + cutLine}
                L ${right} ${quarter3 - cutLine}
                Q ${right} ${quarter3} ${right - longer} ${quarter3 + shorter}
                L ${middle + longer} ${bottom - shorter}
                Q ${middle} ${bottom} ${middle - longer} ${bottom - shorter}
                L ${left + longer} ${quarter3 + shorter}
                Q ${left} ${quarter3} ${left} ${quarter3 - cutLine}
                L ${left} ${quarter + cutLine}
                Q ${left} ${quarter} ${left + longer} ${quarter - shorter}
                L ${middle - longer} ${top + shorter}`;
        // return `M 0.435 0.0375
        //         Q 0.5 0 0.565 0.0375
        //         L 0.868 0.2125
        //         Q 0.933 0.25 0.933 0.325
        //         L 0.933 0.675
        //         Q 0.933 0.75 0.868 0.7875
        //         L 0.565 0.9625
        //         Q 0.5 1 0.435 0.9625
        //         L 0.132 0.7875
        //         Q 0.067 0.75 0.067 0.675
        //         L 0.067 0.325
        //         Q 0.067 0.25 0.132 0.2125
        //         L 0.435 0.0375`;
      },
      hexagon() {
        let cutLine = this.cutLine;
        const longer = (cutLine / 2 * Math.sqrt(3));
        const shorter = (cutLine / 2);
        const left = 13.4;
        const right = 186.6;
        const middle = 100;
        const top = 0;
        const bottom = 200;
        const quarter = 50;
        const quarter3 = 150;
        return `M ${middle - longer} ${top + shorter}
                Q ${middle} ${top} ${middle + longer} ${top + shorter}
                L ${right - longer} ${quarter - shorter}
                Q ${right} ${quarter} ${right} ${quarter + cutLine}
                L ${right} ${quarter3 - cutLine}
                Q ${right} ${quarter3} ${right - longer} ${quarter3 + shorter}
                L ${middle + longer} ${bottom - shorter}
                Q ${middle} ${bottom} ${middle - longer} ${bottom - shorter}
                L ${left + longer} ${quarter3 + shorter}
                Q ${left} ${quarter3} ${left} ${quarter3 - cutLine}
                L ${left} ${quarter + cutLine}
                Q ${left} ${quarter} ${left + longer} ${quarter - shorter}
                L ${middle - longer} ${top + shorter}`;
        // return `M 87 7.5
        //         Q 100 0 113 7.5
        //         L 173.6 42.5
        //         Q 186.6 50 186.6 65
        //         L 186.6 135
        //         Q 186.6 150 173.6 157.5
        //         L 113 192.5
        //         Q 100 200 87 192.5
        //         L 26.4 157.5
        //         Q 13.4 150 13.4 135
        //         L 13.4 65
        //         Q 13.4 50 26.4 42.5
        //         L 87 7.5`;
      }
    },
		methods: {}
	}
</script>

<style scoped>

</style>
