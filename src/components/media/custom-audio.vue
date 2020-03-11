<template>
  <div
    :class="$style.container"
    :style="containerStyle"
    @dblclick.stop.prevent="doPlay"
    @drop.stop.prevent="doFileDrop"
    @dragover.stop.prevent
  >
    <audio
      :src="mediaSrc"
      ref="media"
      @timeupdate="mediaTimeUpdate"
      @ended="mediaEnded"
      @durationchange="doDurationchange"
    ></audio>
    <div :class="$style['cover-box']">
      <img :class="$style.img" :src="coverSrc" alt="">
      <canvas ref="cover" :class="[$style.cover, {[$style.paused]: paused}]"></canvas>
      <canvas
        ref="analyser"
        :class="$style.analyser"
      ></canvas>
    </div>
    <div :class="$style.content">
      <div :class="[$style.controls, {[$style.active]: controlsActive}]">
        <div :class="$style.progress">
          <custom-progress
            :init-value="progress"
            direction="horizontal"
            @onchange="setProgress"
            @changed="setProgress"
          >
            <div :class="$style.buffered" :style="bufferedStyle"></div>
          </custom-progress>
        </div>
        <div
          class="fa"
          :class="[$style.control, playModeClass]"
          @click.stop.prevent="doModeSwitch"
        ></div>
        <div class="fa fa-step-backward"
              :class="$style.control"
              title="上一首"
              @click.stop.prevent="doBackwards"
        ></div>
        <div class="fa"
              :class="[pauseOrPlayClass, $style.control]"
              @click.stop.prevent="doPlay"
        >
        </div>
        <div class="fa fa-step-forward"
              :class="$style.control"
              title="下一首"
              @click.stop.prevent="doForwards"
        ></div>
        <div :class="[$style.control, $style['volume-container']]">
          <div :class="$style['volume-content']">
            <div :class="[$style['volume-progress'], {[$style.visible]: volumeShow}]">
              <custom-progress
                :init-value="initVolume"
                @mousedown="doVolumeProcessShow"
                @mouseup="doVolumeProcessHide"
                @onchange="setVolume"
                direction="vertical"
              ></custom-progress>
            </div>
            <span class="fa"
                  :class="[volumeBtnClass]"
                  @click.stop.prevent="doVolumeToggle"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomProgress from "../custom-input/custom-progress";

  export default {
    name: 'custom-audio',
    data() {
      return {
        activeIndex: 0,
        dragFile: null,
        media: null,
        paused: true,
        controlsActive: false,
        muted: false,
        volumeShow: false,
        initVolume: 10,
        progress: 0,
        bufferedLength: 0,
        audioContext: null,
        analyser: null,
        analyserAnimation: null,
        analyserCanvas: null,
        analyserContext: null,
        mediaElementAudioSource: null,
        dataArray: null,
        playModes: [
          'random', 'list', 'cycle'
        ],
        playModeIndex: 0,
        colors: ['cyan', 'blue', 'orange']
      };
    },
    props: {
      mediaList: {
        type: Array,
        // required: true,
        default() {
          return [
            {
              src: require('@/assets/only+my+railgun.wav'),
              cover: require('@/assets/1.png')
            },
            {
              src: require('@/assets/万神纪（人声本家·正式版） - 肥皂菌丨珉珉的猫.mp3'),
              cover: require('@/assets/蓝色.jpg')
            },
            {
              src: require('@/assets/权御天下 - 洛天依.mp3'),
              cover: require('@/assets/1.png')
            }
          ]
        }
      },
      initIndex: {
        type: Number,
        default: 0,
        validator(value) {
          return value >= 0 ;
        }
      },
      initMode: {
        type: Number,
        default: 0
      }
    },
    components: {CustomProgress},
    beforeCreate() {
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.activeIndex = this.initIndex || this.activeIndex || 0;
      this.playModeIndex = this.initIndex || this.playModeIndex || 0;
      // this.mediaSrc = this.mediaList[this.activeIndex].src;
      // this.coverSrc = this.mediaList[this.activeIndex].cover;
      /**
       * @type {HTMLMediaElement}
       */
      this.media = this.$refs.media;
      this.media.muted = this.muted;
      this.setVolume(this.initVolume);
      // 创建新的音频上下文接口
      const audioCtx = this.audioContext = new AudioContext();
      this.initCover();
      this.initAnalyser();
      window.onresize = () => {
        this.initCover();
      };
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
      mediaSrc() {
        return this.dragFile || this.mediaList[this.activeIndex].src;
      },
      coverSrc() {
        return this.mediaList[this.activeIndex].cover;
      },
      playMode() {
        return this.playModes[this.playModeIndex];
      },
      containerStyle() {
        return {
        };
      },
      playModeClass() {
        switch (this.playModeIndex) {
          case 0: return 'fa-random';
          case 1: return 'fa-retweet';
          case 2: return 'fa-rotate-right';
        }
      },
      pauseOrPlayClass() {
        return this.paused ? 'fa-play':'fa-pause';
      },
      volumeBtnClass() {
        return this.muted ? 'fa-volume-off': 'fa-volume-up';
      },
      bufferedStyle() {
        return {
          transform: `scaleX(${this.bufferedLength / 100})`
        }
      }
    },
    methods: {
      initCover() {
        const canvas = this.$refs.cover;
        const canvasParent = canvas.parentElement;
        const canvasParentRect = canvasParent.getBoundingClientRect();
        const length = Math.min(canvasParentRect.width, canvasParentRect.height);
        canvas.width = canvas.height = length * 0.7;
        this.drawCover(canvas);
      },
      initAnalyser() {
        const canvas = this.analyserCanvas = this.$refs.analyser;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight * 0.7;
        const context = this.analyserContext = canvas.getContext('2d');
        const analyser = this.analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.5;
        const dataArray = this.dataArray = new Uint8Array(analyser.frequencyBinCount);
        const audioElementSource =
          this.mediaElementAudioSource =
            this.audioContext.createMediaElementSource(this.media);
        audioElementSource.connect(analyser);
        analyser.connect(this.audioContext.destination);
      },
      /**
       * 媒体元数据改变时回调
       * */
      doDurationchange(e) {
        if(!this.paused) this.play();
        this.initCover();
      },
      /**
       * 媒体播放时间更新回调
       * */
      mediaTimeUpdate(e) {
        const media = e.target;
        const progress = media.currentTime / media.duration;
        this.progress = progress * 100;
        const buffered = this.media.buffered;
        if(buffered.length) {
          this.bufferedLength = buffered.end(buffered.length - 1);
        }
      },
      /**
       * 媒体播放完毕后回调
       * */
      mediaEnded(e) {
        this.goForwards();
      },
      goBackwards() {},
      /**
       * 走向下一首
       * */
      goForwards: function () {
        this.setProgress(0);
        const mode = this.playMode;
        if (mode === 'one') {
          return;
        }
        if (this.dragFile) this.dragFile = null;
        if (mode === 'random') {
          this.activeIndex = Math.floor(Math.random() * this.mediaList.length);
        } else if (mode === 'list') {
          this.activeIndex = (this.activeIndex + 1) % this.mediaList.length;
        } else {
          this.paused = true;
          this.media.pause();
        }
        this.bufferedLength = 0;
      },
      /**
       * 处理文件拖拽后播放事件
       * @param {DragEvent} e
       */
      doFileDrop(e) {
        const file = (e.dataTransfer.files)[0];
        if(this.media.canPlayType(file.type)) {
          this.dragFile = URL.createObjectURL(file);
        }
      },
      /**
       * 播放模式切换
       * */
      doModeSwitch(e) {
        this.playModeIndex = (this.playModeIndex + 1) % this.playModes.length;
      },
      /**
       * 上一首按钮点击事件
       * */
      doBackwards(e) {
        console.log('上一首');
        this.activeIndex = (this.activeIndex - 1) % (this.mediaList.length);
        this.progress = 0;
        this.bufferedLength = 0;
      },
      /**
       * 处理播放、暂停按钮点击事件
       * @param {MouseEvent} e
       * */
      doPlay(e) {
        this.playClickSound();
        this.paused = !this.paused;
        if(this.media.paused) {
          this.play();
        }else {
          this.media.pause();
          this.audioContext.suspend();
          this.stopAnalyserAni();
        }
      },
      play() {
        this.media.play();
        this.audioContext.resume();
        this.startAnalyserAni(2);
        this.paused = false;
      },
      doForwards(e) {
        this.goForwards();
        // this.activeIndex = (this.activeIndex + 1) % (this.mediaList.length);
        // this.progress = 0;
        // this.bufferedLength = 0;
      },
      doVolumeToggle(e) {
        this.muted = !this.muted;
        this.media.muted = this.muted;
      },
      doVolumeProcessShow(e) {
        this.volumeShow = true;
        this.controlsActive = true;
      },
      doVolumeProcessHide(e) {
        this.volumeShow = false;
        this.controlsActive = false;
      },
      setProgress(progress) {
        this.progress = progress;
        if(!this.media) return;
        if(this.media.duration) {
          this.media.currentTime = progress / 100 * this.media.duration;
        }else {
          this.media.currentTime = 0;
        }
      },
      setVolume(volume) {
        this.media.volume = volume / 100;
      },
      /**
       * @param {HTMLCanvasElement} canvas
       */
      drawCover(canvas) {
        canvas = canvas || this.$refs.canvas;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = this.coverSrc;
        image.onload = () => {
          const length = Math.min(image.width, image.height);
          let sx, sy;
          if(image.width === length) {
            sx = 0;
            sy = (image.height - length) / 2;
          }else {
            sx = (image.width - length) / 2;
            sy = 0;
          }
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.save();
          context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
          context.clip();
          context.drawImage(image, sx, sy, length, length, 0, 0, canvas.width, canvas.height);
          context.restore();
          context.save();
          context.beginPath();
          context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 8, 0, Math.PI * 2);
          context.closePath();
          context.clip();
          context.clearRect(0 , 0, canvas.width, canvas.height);
          context.restore();
          context.save();
          context.strokeStyle = 'rgba(0, 0, 0, 0.3)';
          context.lineWidth = 8;
          context.beginPath();
          context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 8 + 4, 0, Math.PI * 2);
          context.closePath();
          context.stroke();
          context.restore();
        };
      },
      /**
       * 播放按钮点击声音
       * @param {Number} frequency 声音频率
       * @param {Number} time 持续时间（s）
       * */
      playClickSound(frequency = 400, time = 1) {
        const audioCtx = this.audioContext;
        // 创建一个OscillatorNode, 它表示一个周期性波形（振荡），基本上来说创造了一个音调
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        // 把音量，音调和终节点进行关联
        oscillator.connect(gainNode);
        // audioCtx.destination返回AudioDestinationNode对象，表示当前audio context中所有节点的最终节点，一般表示音频渲染设备
        gainNode.connect(audioCtx.destination);
        // 指定音调的类型，其他还有square|triangle|sawtooth
        oscillator.type = 'sine';
        // 设置当前播放声音的频率，也就是最终播放声音的调调
        oscillator.frequency.value = frequency;
        // 当前时间设置音量为0
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // 0.01秒后音量为1
        gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
        // 音调从当前时间开始播放
        oscillator.start(audioCtx.currentTime);
        // 1秒内声音慢慢降低，是个不错的停止声音的方法
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + time);
        // 1秒后完全停止声音
        oscillator.stop(audioCtx.currentTime + 1);
        // gainNode.disconnect();
      },

      /**
       * 柱形动画
       */
      drawCylindricalAni() {
        const width = this.analyserCanvas.width;
        const height = this.analyserCanvas.height;
        /**
         * @type {CanvasRenderingContext2D}
         */
        const context = this.analyserContext;
        const analyser = this.analyser;
        // analyser.fftSize = 64;
        const dataArray = this.dataArray;
        context.clearRect(0, 0, width, height);
        analyser.getByteFrequencyData(dataArray);
        context.save();
        context.beginPath();
        context.lineWidth = width / dataArray.length / 2;
        context.lineCap = 'round';
        const base = height / 255;
        for (let i = 0; i < dataArray.length; i++) {
          context.moveTo((i * 2 + 0.5) * context.lineWidth, height - dataArray[i] * base);
          context.lineTo((i * 2 + 0.5) * context.lineWidth, height);
        }
        context.strokeStyle = 'rgba(0, 255, 255, 0.3)';
        context.stroke();
        context.restore();
        this.analyserAnimation = requestAnimationFrame(this.drawCylindricalAni);
      },

      /**
       * 圆形动画
       */
      drawCircleAni(frame = 0) {
        const width = this.analyserCanvas.width;
        const height = this.analyserCanvas.height;
        const context = this.analyserContext;
        const analyser = this.analyser;
        const dataArray = this.dataArray;
        frame = (++ frame) % this.colors.length;
        context.clearRect(0 , 0, width, height);
        analyser.getByteTimeDomainData(dataArray);
        const angleStep = Math.PI * 2 / dataArray.length;
        context.beginPath();
        for (let i = 0; i < dataArray.length; i++) {
          context.save();
          context.translate(width / 2, height / 2);
          context.rotate(angleStep * i);
          if(i === 0) {
            context.moveTo(0, (dataArray[i] - 100) * 2);
          }else {
            context.lineTo(0, (dataArray[i] - 100) * 2);
          }
          context.restore();
        }
        context.save();
        context.translate(width / 2, height / 2);
        context.lineTo(0, (dataArray[0] - 100) * 2);
        context.strokeStyle = this.colors[frame];
        context.stroke();
        context.closePath();
        context.restore();
        const drawCircleAni = this.drawCircleAni;
        this.analyserAnimation = requestAnimationFrame(() => {
          drawCircleAni(frame);
        });
      },

      /**
       * 波形动画
       */
      startWaveAni() {},
      /**
       * 开始动画
       * */
      startAnalyserAni(style = 1) {
        this.stopAnalyserAni();
        switch (style) {
          case 1: this.drawCylindricalAni(); break;
          case 2: this.drawCircleAni(); break;
        }
      },

      /**
       * 停止动画
       */
      stopAnalyserAni() {
        if(this.analyserAnimation) {
          cancelAnimationFrame(this.analyserAnimation);
          this.analyserAnimation = null;
        }
      }
    }
  }
</script>

<style module>
  .container {
    width: 640px;
    height: 360px;
    position: relative;
    overflow: hidden;
  }

  .cover-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(3px);
  }

  .analyser {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    animation: cover 10s infinite linear;
  }

  .cover.paused {
    animation-play-state: paused;
  }

  @keyframes cover {
    100% {
      transform: rotate(360deg);
    }
  }

  .content {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .controls {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    transform: translateY(100%);
    transition: all 0.5s;
    padding: 0.625em 0;
  }

  .controls > .control {
    opacity: 0;
  }

  .progress {
    width: 100%;
    padding: 0 0.4em;
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translateX(-50%);
  }

  .buffered {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    background-color: rgba(136, 136, 136, 0.3);
    transform-origin: left bottom;
  }

  .container:hover .controls,
  .controls.active .control{
    transform: translateY(0);
  }

  .container:hover .control,
  .controls.active .control {
    opacity: 1;
  }

  .control {
    width: 1em;
    height: 1em;
    display: block;
    color: white;
    margin: auto 0.5em;
    transition: all 0.3s;
  }

  .control:hover {
    text-shadow: 0 0 0.5em cyan;
  }

  .control:active {
    color: cyan;
  }

  .volume-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .volume-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .volume-progress {
    height: 5em;
    padding: 0.5em;
    border-radius: 0.125rem;
    background-color: rgba(0, 0, 0, 0.48);
    visibility: hidden;
    margin-bottom: 1em;
  }

  .volume-content:hover > .volume-progress,
  .visible {
    visibility: visible;
  }
</style>
