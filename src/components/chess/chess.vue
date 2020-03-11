<template>
  <div class="chess" ref="chessContainer">
    <canvas class="chess-canvas" ref="canvas" @click.stop.prevent="doClick"></canvas>
  </div>
</template>

<script>
  import ChessPiece from './chess-piece.js';
	export default {
		name:'',
		data(){
			return {
        canvas: null,
        context: null,
        animation: null,
        last: null,
        unitLength: 0,
        chessPieceRadius: 0,
        radiusFactor: 1 / 3,
        chessBoard: null,
        chessPieces: null,
        side: 'red',
        selectedCP: null
      };
		},
		props:[],
		components: {},
		beforeCreate() {},
		created() {},
		beforeMount() {},
		mounted() {
      this.canvas = this.$refs.canvas;
      const outerBCR = this.$refs.chessContainer.getBoundingClientRect();
      this.context = this.canvas.getContext('2d');
      const outerWidth = outerBCR.width;
      const outerHeight = outerBCR.height;
      this.unitLength = Math.min(outerWidth / 10, outerHeight / 11);
      const chessPieceRadius = this.chessPieceRadius = this.unitLength * this.radiusFactor;
      this.canvas.width = this.unitLength * 10;
      this.canvas.height = this.unitLength * 11;
      this.last = new Date();
      this.chessBoard = ChessPiece.drawChessboard(this.unitLength);
      this.chessPieces = ChessPiece.createChess();
      this.chessPieces.forEach(chessPiece => {
        chessPiece.draw(chessPieceRadius);
      });
      this.startAni();
    },
		beforeUpdate() {},
		updated() {},
		beforeDestroy() {},
		destroyed() {},
		computed: {},
		methods: {
      main() {
        const now = new Date();
        const time = now - this.last;
        this.update(time);
        this.last = now;
        this.animation = requestAnimationFrame(this.main);
      },
      update(millisecond) {
        const second = millisecond / 1000;
        const canvas = this.canvas;
        const context = this.context;
        const chessPieces = this.chessPieces;
        const unitLength = this.unitLength;
        const chessPieceRadius = this.chessPieceRadius;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制棋盘
        context.drawImage(this.chessBoard, 0, 0);

        // 绘制棋子
        for(let i = 0; i < chessPieces.length; i++) {
          const chessPiece = chessPieces[i];
          context.drawImage(chessPiece.image, chessPiece.x * unitLength - chessPieceRadius,
              chessPiece.y * unitLength - chessPieceRadius);
          if(chessPiece.selected) {
            context.save();
            context.beginPath();
            context.arc(chessPiece.x * unitLength + 1, chessPiece.y * unitLength +1,
                chessPieceRadius + 3, 0, Math.PI * 2);
            context.strokeStyle = '#FF0000';
            context.stroke();
            context.fillStyle = 'rgba(255, 0, 0, 0.3)';
            context.fill();
            context.closePath();
            context.restore();
          }
        }
      },
      startAni() {
        this.main();
      },
      pauseAni() {
        (this.animation) && (window.cancelAnimationFrame(this.animation)) && (this.animation = null);
      },
      doClick(e) {
        const canvasBCR = this.canvas.getBoundingClientRect();
        let offsetX = e.clientX - canvasBCR.left;
        let offsetY = e.clientY - canvasBCR.top;
        let x = offsetX / this.unitLength;
        let y = offsetY / this.unitLength;
        const radiusPow2 = this.radiusFactor * this.radiusFactor;
        for (let i = 0; i < this.chessPieces.length; i++) {
          const chessPiece = this.chessPieces[i];
          if(chessPiece.side !== this.side) continue;
          if(Math.pow(chessPiece.x - x, 2) + Math.pow(chessPiece.y - y, 2) <= radiusPow2) {
            // find the chessPiece clicked
            if(this.selectedCP === chessPiece) {
              this.selectedCP.selected = false;
              this.selectedCP = null;
            }else {
              this.selectedCP && (this.selectedCP.selected = false);
              this.selectedCP = chessPiece;
              chessPiece.selected = true;
            }
            return ;
          }
        }
        x = Math.round(x);
        y = Math.round(y);
        // 没有点击在己方棋子上，如果已经有选中的棋子判断是否可以移动到指定点
        if(this.selectedCP) {
          const moveState = this.selectedCP.moveTo(x, y, this.chessPieces);
          if(moveState === 'win') {
            // do sth and notify game-over
            this.selectedCP = null;
            setTimeout(this.pauseAni, 100);
          }else if(moveState === 'moved') {
            // 已经移动了，本次移动结束，通知另一方开始移动
            this.selectedCP = null;
          }
        }
      }
    }
	}
</script>

<style scoped>
.chess {
  width: 100%;
  height: 100%;
}
.chess-canvas {
  /* width: 100%;
  height: 100%; */
}
</style>
