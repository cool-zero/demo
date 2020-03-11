<template>
  <div id="app">
<!--    <hk-header-gold></hk-header-gold>-->
    <linear-gradient-def></linear-gradient-def>
    <hexagon-def></hexagon-def>
<!--    <test-img-draw></test-img-draw>-->
    <pvz-main></pvz-main>
<!--    <hk-material-info :material="material"></hk-material-info>-->
<!--    <hk-check-points-mission-->
<!--      :game-rewards="gameRewards"-->
<!--      :missions="missions"-->
<!--      info="哈哈哈哈哈哈哈哈哈哈">-->
<!--    </hk-check-points-mission>-->
<!--    <custom-div style="background: green; width: 300px; height: 300px;">-->
<!--      <resize-box style="border: 1px solid red">-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--        我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。-->
<!--      </resize-box>-->
<!--    </custom-div>-->
<!--    <stars-glint></stars-glint>-->
<!--    <custom-div style="background: black;height: 30em; position: absolute">-->
<!--&lt;!&ndash;      <custom-audio></custom-audio>&ndash;&gt;-->
<!--&lt;!&ndash;      <custom-progress></custom-progress>&ndash;&gt;-->
<!--    </custom-div>-->
<!--    <custom-div style="width: 300px">-->
<!--      <drag-sort-list :content-list="dragList"></drag-sort-list>-->
<!--    </custom-div>-->
<!--    <custom-div style="background-color: transparent; padding: 20px; height: 300px">-->
<!--&lt;!&ndash;      <hk-mission-item :mission="mission"></hk-mission-item>&ndash;&gt;-->
<!--&lt;!&ndash;      <hk-material-img :src="require('@/assets/logo.png')"></hk-material-img>&ndash;&gt;-->
<!--&lt;!&ndash;      <hk-marterial-get :src="require('@/assets/logo.png')">&ndash;&gt;-->
<!--&lt;!&ndash;      </hk-marterial-get>&ndash;&gt;-->
<!--    </custom-div>-->
<!--    <hk-material-obtain-tip-->
<!--      :material="material"-->
<!--    >-->
<!--    </hk-material-obtain-tip>-->
<!--    <custom-div>-->
<!--      <cube></cube>-->
<!--    </custom-div>-->
<!--    <router-view name="app"></router-view>-->
<!--    <scroll>-->
<!--      <div style="width: 100%; height: 2000px; background-color: yellow;">-->

<!--      </div>-->

<!--    </scroll>-->
<!--    <custom-div style="width: 100%; height: 500px; border: 1px solid black">-->
<!--      <hk-adventure></hk-adventure>-->
<!--    </custom-div>-->
<!--    <custom-div style="width: 100%;height: 100vh;">-->
<!--      <hk-adventure-maintask></hk-adventure-maintask>-->
<!--    </custom-div>-->
<!--    <custom-div style="width: 300px;height: 500px;">-->
<!--      <hk-check-points-img :src="require('@/assets/1.png')"></hk-check-points-img>-->
<!--    </custom-div>-->
<!--&lt;!&ndash;    <custom-div style="background: black">&ndash;&gt;-->
<!--&lt;!&ndash;      <hk-material-img :src="require('@/assets/logo.png')"></hk-material-img>&ndash;&gt;-->
<!--&lt;!&ndash;    </custom-div>&ndash;&gt;-->
<!--&lt;!&ndash;    <custom-div style="padding: 5rem;">&ndash;&gt;-->
<!--&lt;!&ndash;      <hk-message @close="test" @afterClose = "test"></hk-message>&ndash;&gt;-->
<!--&lt;!&ndash;    </custom-div>&ndash;&gt;-->
<!--    <custom-div style="background: url('../static/img/1.png'); width: 100%; height: 160px;">-->
<!--      <hk-dialog></hk-dialog>-->
<!--    </custom-div>-->
<!--    <custom-div></custom-div>-->
<!--    &lt;!&ndash; <custom-div style="height: 500px; width: 300px;">-->
<!--      <select-input-->
<!--        :options="options"-->
<!--      >-->
<!--      </select-input>-->
<!--    </custom-div> &ndash;&gt;-->
<!--    &lt;!&ndash; <custom-div style="width: 300px; height: auto; padding: 10px; border: 1px solid black;">-->
<!--      <list-panel :list="[1, 2, 3, 4, 5, 6]"></list-panel>-->
<!--    </custom-div> &ndash;&gt;-->
<!--    <custom-div style="width: 400px; height: 300px; border: 1px solid red;">-->
<!--      <horizontal-swiper-panel>-->
<!--        <swiper-item style="width: 300px; height: 100px;">1</swiper-item>-->
<!--        <swiper-item style="width: 300px; height: 100px;">2</swiper-item>-->
<!--        <swiper-item style="width: 300px; height: 100px;">3</swiper-item>-->
<!--        <swiper-item style="width: 300px; height: 100px;">4</swiper-item>-->
<!--        <swiper-item style="width: 300px; height: 100px;">5</swiper-item>-->
<!--      </horizontal-swiper-panel>-->
<!--    </custom-div>-->
<!--    <custom-div>-->
<!--      &lt;!&ndash; <loading-mask></loading-mask> &ndash;&gt;-->
<!--      &lt;!&ndash; <loading-2></loading-2> &ndash;&gt;-->
<!--      <loading-3></loading-3>-->
<!--    </custom-div>-->
<!--    <custom-div style="width: 100%; height: 500px; border: 1px solid black">-->
<!--      <hk-adventure></hk-adventure>-->
<!--    </custom-div>-->
<!--    <hexagon-def></hexagon-def>-->
<!--    <linear-gradient-def></linear-gradient-def>-->
<!--    <custom-div style="width: 100px;" customTitle="圆形进度条">-->
<!--      <circle-process :value="57"></circle-process>-->
<!--    </custom-div>-->
<!--    <custom-div customTitle="哈哈哈哈哈哈哈哈哈哈或或">-->
<!--      <svg-clock style="width:200px">-->
<!--      </svg-clock>-->
<!--    </custom-div>-->
<!--    <custom-div customTitle="胡笳十八拍" style="width:300px;height:300px">-->
<!--      <scroll>-->
<!--        <p style="width: 100%;height: 100%;">-->
<!--          我生之初尚无为，我生之后汉祚衰。天不仁兮降乱离，地不仁兮使我逢此时。干戈日寻兮道路危，民卒流亡兮共哀悲。烟尘蔽野兮胡虏盛，志意乖兮节义亏。对殊俗兮非我宜，遭忍辱兮当告谁？笳一会兮琴一拍，心愤怨兮无人知。-->
<!--          戎羯逼我兮为室家，将我行兮向天涯。云山万重兮归路遐，疾风千里兮扬尘沙。人多暴猛兮如虺蛇，控弦被甲兮为骄奢。两拍张弦兮弦欲绝，志摧心折兮自悲嗟。-->
<!--          越汉国兮入胡城，亡家失身兮不如无生。毡裘为裳兮骨肉震惊，羯羶为味兮枉遏我情。鼙鼓喧兮从夜达明，胡风浩浩兮暗塞营。伤今感晋兮三拍成，衔悲畜恨兮何时平。-->
<!--          无日无夜兮不思我乡土，禀气合生兮莫过我最苦。天灾国乱兮人无主，唯我薄命兮没戎虏。殊俗心异兮身难处，嗜欲不同兮谁可与语！寻思涉历兮多艰阻，四拍成兮益凄楚。-->
<!--          雁南征兮欲寄边声，雁北归兮为得汉青。雁飞高兮邈难寻，空断肠兮思愔愔。攒眉向月兮抚雅琴，五拍泠泠兮意弥深。-->
<!--          冰霜凛凛兮身苦寒，饥对肉酪兮不能餐。夜间陇水兮声呜咽，朝见长城兮路杳漫。追思往日兮行李难，六拍悲来兮欲罢弹。-->
<!--          日暮风悲兮边声四起，不知愁心兮说向谁是！原野萧条兮烽戍万里，俗贱老弱兮少壮为美。逐有水草兮安家葺垒，牛羊满野兮聚如蜂蚁。草尽水竭兮羊马皆徙，七拍流恨兮恶居于此。-->
<!--          为天有眼兮何不见我独漂流？为神有灵兮何事处我天南海北头？我不负天兮天何配我殊匹？我不负神兮神何殛我越荒州？制兹八拍兮拟排忧，何知曲成兮心转愁。-->
<!--          天无涯兮地无边，我心愁兮亦复然。人生倏忽兮如白驹之过隙，然不得欢乐兮当我之盛年。怨兮欲问天，天苍苍兮上无缘。举头仰望兮空云烟，九拍怀情兮谁与传？-->
<!--          城头烽火不曾灭，疆场征战何时歇？杀气朝朝冲塞门，胡风夜夜吹边月。故乡隔兮音尘绝，哭无声兮气将咽。一生辛苦兮缘别离，十拍悲深兮泪成血。-->
<!--          我非食生而恶死，不能捐身兮心有以。生仍冀得兮归桑梓，死当埋骨兮长已矣。日居月诸兮在戎垒，胡人宠我兮有二子。鞠之育之兮不羞耻，憋之念之兮生长边鄙。十有一拍兮因兹起，哀响缠绵兮彻心髓。-->
<!--          东风应律兮暖气多，知是汉家天子兮布阳和。羌胡蹈舞兮共讴歌，两国交欢兮罢兵戈。忽遇汉使兮称近诏，遗千金兮赎妾身。喜得生还兮逢圣君，嗟别稚子兮会无因。十有二拍兮哀乐均，去住两情兮难具陈。-->
<!--          不谓残生兮却得旋归，抚抱胡儿兮注下沾衣。汉使迎我兮四牡騑騑，胡儿号兮谁得知？与我生死兮逢此时，愁为子兮日无光辉，焉得羽翼兮将汝归。一步一远兮足难移，魂消影绝兮恩爱遗。十有三拍兮弦急调悲，肝肠搅刺兮人莫我知。-->
<!--          身归国兮儿莫知随，心悬悬兮长如饥。四时万物兮有盛衰，唯我愁苦兮不暂移。山高地阔兮见汝无期，更深夜阑兮梦汝来斯。梦中执手兮一喜一悲，觉后痛吾心兮无休歇时。十有四拍兮涕泪交垂，河水东流兮心是思。-->
<!--          十五拍兮节调促，气填胸兮谁识曲？处穹庐兮偶殊俗。愿得归来兮天从欲，再还汉国兮欢心足。心有怀兮愁转深，日月无私兮曾不照临。子母分离兮意难怪，同天隔越兮如商参，生死不相知兮何处寻！-->
<!--          十六拍兮思茫茫，我与儿兮各一方。日东月西兮徒相望，不得相随兮空断肠。对萱草兮忧不忘，弹鸣琴兮情何伤！今别子兮归故乡，旧怨平兮新怨长！泣血仰头兮诉苍苍，胡为生兮独罹此殃！-->
<!--          十七拍兮心鼻酸，关山阻修兮行路难。去时怀土兮心无绪，来时别儿兮思漫漫。塞上黄蒿兮枝枯叶干，沙场白骨兮刀痕箭瘢。风霜凛凛兮春夏寒，人马饥豗兮筋力单。岂知重得兮入长安，叹息欲绝兮泪阑干。-->
<!--          胡笳本自出胡中，缘琴翻出音律同。十八拍兮曲虽终，响有余兮思无穷。是知丝竹微妙兮均造化之功，哀乐各随人心兮有变则通。胡与汉兮异域殊风，天与地隔兮子西母东。苦我怨气兮浩于长空，六合虽广兮受之应不容！-->
<!--        </p>-->
<!--      </scroll>-->
<!--    </custom-div>-->
<!--    <custom-div>-->
<!--      <hexagon-btn style="width: 30px;" @click="test">-->
<!--        <i class="fa fa-plus"></i>-->
<!--      </hexagon-btn>-->
<!--    </custom-div>-->
<!--    <custom-div style="width: 200px; height: 200px; background:green;">-->
<!--      <hexagon-item :src="require('@/assets/1.png')">-->
<!--      </hexagon-item>-->
<!--    </custom-div>-->
<!--    <custom-div style="width: 100%; height: 500px; border: 1px solid red;">-->
<!--      <swiper-panel :titleList="titleList">-->
<!--        <swiper-item>-->
<!--          <div style="width: 100%;height: 100%;background: yellow;"></div>-->
<!--        </swiper-item>-->
<!--        <swiper-item>2</swiper-item>-->
<!--        <swiper-item>3</swiper-item>-->
<!--      </swiper-panel>-->
<!--    </custom-div>-->
<!--    <custom-div style="background: yellow;">-->
<!--      <vertical-btn>-->
<!--        出击-->
<!--        <template #extra>ATTACK</template>-->
<!--      </vertical-btn>-->
<!--    </custom-div>-->
  </div>
</template>

<script>
  import SelectInput from "./components/custom-input/select-input";
  import HkDialog from "./components/hk-dialog/hk-dialog";
  import LinearGradientDef from "./components/svg-def/linear-gradient-def";
  import HkMessage from "./components/hk-tip-window/hk-message-panel";
  import HkCheckPointsImg from "./components/hk-nav-img/hk-checkpoints-img";
  import HkAdventureMaintask from "./components/hk-adventure/hk-adventure-maintask";
  import HkHeaderGold from "./components/hk-header-item/hk-header-gold";
  import Cube from "./components/3d/cube";
  import HkMaterialObtainTip from "./components/hk-tip-window/hk-material-obtain-tip";
  import HkMaterialImg from "./components/hk-material/hk-material-img";
  import HkMarterialGet from "./components/hk-material/hk-marterial-get";
  import HkMaterialInfo from "./components/hk-tip-window/hk-material-info";
  import HkMissionItem from "./components/hk-mission/hk-mission-item";
  import HkCheckPointsMission from "./components/hk-tip-window/hk-check-points-mission";
  import DragSortList from "./components/drag-sort-list/drag-sort-list";
  import ResizeBox from "./components/resize-box/resize-box";
  import SakuraFly from "./components/some-animation/sakura-fly";
  import CustomAudio from "./components/media/custom-audio";
  import CustomProgress from "./components/custom-input/custom-progress";
  import StarsGlint from "./components/some-animation/stars-glint";
  import PvzMain from "./components/pvz/pvz-main";
  import TestImgDraw from "./components/pvz/test-img-draw";
  export default {
    name: 'App',
    data: function () {
      return {
        titleList: [{
          name: '出击',
          English: 'ATTACK'
        },
          {
            name: '挑战',
            English: 'CHALLENGE'
          },
          {
            name: '活动',
            English: 'EVENT'
          }
        ],
        selectValue: "",
        options: [
          '哈哈哈哈哈哈哈哈',
          '哈哈哈哈哈哈',
          'XIIXIXII嘻嘻嘻嘻嘻嘻系嘻嘻嘻嘻嘻嘻',
          '嘻嘻嘻嘻',
          '第 1 条',
          '第 2 条',
          '第 3 条',
          '第 4 条',
          '第 5 条',
          '第 6 条'
        ],
        material: {
          name: "绯樱意志",
          level: 3,
          src: require('@/assets/1.png'),
          quantity: 9999,
          info: '3456789guhjkughvb',
          to: '',
          obtainList: [
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: '',
              notOpen: true
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            },
            {
              message: "【购买】（30级以上可以购买）",
              to: ''
            }
          ]
        },
        mission: {
          name: '我是mission',
          type: '日常',
          desc: '我是desc',
          progress: 1,
          total: 3,
          timeRemain: '剩余3天',
          to: '',
          award: [
            {
              src: require('@/assets/logo.png'),
              quantity: 1000,
              level: 4
            },
            {
              src: require('@/assets/logo.png'),
              quantity: 199
            }
          ]
        },
        gameRewards: [
          {
            key: 1,
            src: require('@/assets/logo.png'),
            level: 3
          },
          {
            key: 2,
            src: require('@/assets/logo.png'),
            level: 3
          },
          {
            key: 3,
            src: require('@/assets/logo.png'),
            level: 4
          },
          {
            key: 4,
            src: require('@/assets/logo.png'),
            level: 4
          }
        ],
        missions: [
          {
            key: 1,
            name: '我是mission',
            type: '日常',
            desc: '我是desc',
            progress: 1,
            total: 3,
            timeRemain: '剩余3天',
            to: '',
            award: [
              {
                src: require('@/assets/logo.png'),
                quantity: 1000,
                level: 4
              },
              {
                src: require('@/assets/logo.png'),
                quantity: 199
              }
            ]
          },
          {
            key: 2,
            name: '我是mission',
            type: '日常',
            desc: '我是desc',
            progress: 1,
            total: 3,
            timeRemain: '剩余3天',
            to: '',
            award: [
              {
                src: require('@/assets/logo.png'),
                quantity: 1000,
                level: 4
              },
              {
                src: require('@/assets/logo.png'),
                quantity: 199
              }
            ]
          },
          {
            key: 3,
            name: '我是mission',
            type: '日常',
            desc: '我是desc',
            progress: 1,
            total: 3,
            timeRemain: '剩余3天',
            to: '',
            award: [
              {
                src: require('@/assets/logo.png'),
                quantity: 1000,
                level: 4
              },
              {
                src: require('@/assets/logo.png'),
                quantity: 199
              }
            ]
          }
        ],
        dragList: [
          {
            key: 1,
            value: 1,
            open: false,
            selected: 'none'
          },
          {
            key: 2,
            value: 2,
            open: false,
            selected: 'none'
          },
          {
            key: 3,
            value: 3,
            open: false,
            selected: 'none',
            children: [
              {
                key: 3.1,
                value: 3.1,
                open: false,
                selected: 'none'
              },
              {
                key: 3.2,
                value: 3.2,
                open: false,
                selected: 'none',
                children: [
                  {
                    key: '3.2.1',
                    value: '3.2.1',
                    open: false,
                    selected: 'none'
                  },
                  {
                    key: '3.2.2',
                    value: '3.2.2',
                    open: false,
                    selected: 'none'
                  },
                  {
                    key: '3.2.3',
                    value: '3.2.3',
                    open: false,
                    selected: 'none'
                  },
                  {
                    key: '3.2.4',
                    value: '3.2.4',
                    open: false,
                    selected: 'none'
                  },
                ]
              },
              {
                key: 3.3,
                value: 3.3,
                open: false,
                selected: 'none'
              },
              {
                key: 3.4,
                value: 3.4,
                open: false,
                selected: 'none'
              }
            ]
          },
          {
            key: 4,
            value: 4,
            open: false,
            selected: 'none'
          },
          {
            key: 5,
            value: 5,
            open: false,
            selected: 'none'
          },
          {
            key: 6,
            value: 6,
            open: false,
            selected: 'none'
          },
        ]
      }
    },
    components: {
      TestImgDraw,
      PvzMain,
      StarsGlint,
      CustomProgress,
      CustomAudio,
      SakuraFly,
      ResizeBox,
      DragSortList,
      HkCheckPointsMission,
      HkMissionItem,
      HkMaterialInfo,
      HkMarterialGet,
      HkMaterialImg,
      HkMaterialObtainTip,
      Cube,
      HkHeaderGold,
      HkAdventureMaintask,
      HkCheckPointsImg,
      HkMessage,
      LinearGradientDef,
      HkDialog,
      SelectInput,
      'custom-div': () => import('@/components/div-with-title/div-with-title'),
      'circle-process': () => import('@/components/circle-process/circle-process'),
      'svg-clock': () => import('@/components/svg-clock/svg-clock'),
      'scroll': () => import('@/components/scroll'),
      'chess': () => import('@/components/chess/chess'),
      'hexagon-btn': () => import('@/components/buttons/hexagon-btn'),
      'hexagon-def': () => import('@/components/svg-def/hexagon-def'),
      'hexagon-item': () => import('@/components/polygons/hexagon-item'),
      'swiper-panel': () => import('@/components/swiper-panel/swiper-panel'),
      'swiper-item': () => import('@/components/swiper-panel/swiper-item'),
      'vertical-btn': () => import('@/components/buttons/vertical-btn'),
      'hk-page-panel': () => import('@/components/hk-page-panel/hk-page-panel'),
      'hk-adventure': () => import('@/components/hk-adventure/hk-adventure'),
      'loading-mask': () => import('@/components/loading/loading-mask'),
      'loading-2': () => import('@/components/loading/loading-2'),
      'loading-3': () => import('@/components/loading/loading-3'),
      'horizontal-swiper-panel': () => import('@/components/swiper-panel/horizontal-swiper-panel'),
      'list-panel': () => import('@/components/list-panel/list-panel'),
      'list-item': () => import('@/components/list-panel/list-item')
    },
    methods: {
      test() {
        console.log(123);
      }
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #app>div {
    width: 100%;
  }
</style>
