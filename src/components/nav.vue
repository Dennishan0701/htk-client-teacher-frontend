<template>
  <div class="nav-left">
    <div class="nav-left-main">
      <ul>
        <!--<li>-->
          <!--<Tooltip placement="bottom-end" content="信息" :delay="300">-->
            <!--<a href="javascript:;"></a>-->
          <!--</Tooltip>-->
        <!--</li>-->
        <!--<li>-->
          <!--<Tooltip placement="bottom-end" content="信息" :delay="300">-->
            <!--<a href="javascript:;"></a>-->
          <!--</Tooltip>-->
        <!--</li>-->
        <!--<li class="nav-message" @click="bulletinBoardShow">-->
          <!--<Tooltip placement="bottom-start" content="信息" :delay="300">-->
            <!--<a href="javascript:;"></a>-->
          <!--</Tooltip>-->
        <!--</li>-->
        <li class="nav-help" @click="help">
          <Tooltip placement="bottom-start" content="帮助" :delay="300">
            <a href="javascript:;"></a>
          </Tooltip>
        </li>
        <li class="nav-test" @click="device">
          <Tooltip placement="top-start" content="设备测试" :delay="300">
            <a href="javascript:;"></a>
          </Tooltip>
        </li>
        <li class="nav-setting">
          <div style="padding: 9px 0">
            <a href="javascript:;"></a>
          </div>
          <div class="setting-list">
            <div class="setting-list-main">
              <div @click="feedback">意见反馈</div>
              <div @click="aboutus">关于我们</div>
            </div>
            <div class="setting-list-arrow"></div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 用户帮助 -->
    <Modal v-model="helpShow" width="570" class="helpWindow" class-name="vertical-center-modal" :transition-names="['none','none']" :mask-closable="false">
      <p slot="header">
        <span>用户帮助</span>
      </p>
      <p slot="close">
        <!--<img src="../assets/images/close2.png" alt="关闭">-->
        <Icon type="close-round"></Icon>
      </p>
      <div class="helpWindowContent">
        <div class="help-content">
          <div class="help-main">
            <div class="help-question scrollHide">
              <ul>
                <li v-for="(item,$index) in helpMain" @click="helpSelect($index)" :class="{ active : helpIndex == $index }"> {{ item.qusetion }}</li>
              </ul>
            </div>
            <div class="help-answer">
              <ul>
                <li v-for="(item,$index) in helpMain" v-show="helpIndex == $index">
                  <span>答：</span>
                  <p v-for="(answer,index) in item.answer" class="pl">
                    {{ answer }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>

  </div>
</template>
<script>
  const token = sessionStorage.getItem('token');
  export default {
    data () {
      return {
        activeName:'',
        testNum:0,
        deviceNum:0,
        helpMain:this.$store.state.helpMainTeacher,
        helpIndex:0,
        helpShow:false,
//        offsetTop :0,
      }
    },
    beforeMount () {
      this.routerStart();
    },
    mounted () {
    },
    methods: {
      device () {  //设备测试
        this.deviceNum++;
        let args = '{' +
            '"requesttype":11,' +
            '"messageid":'+ this.deviceNum +',' +
            '"jscallback" : "callbackDevice",' +
            '"data" : {' +
              '"reserve" :""' +
            '}'+
          '}';
        sendData(args);
      },
      routerStart () {  //刷新页面后保持菜单栏状态
        this.activeName = this.$route.name;
      },
      help () { //用户帮助
        this.helpShow = true;
      },
      helpClose () {
        this.helpShow = false;
      },
      helpSelect (index){
        this.helpIndex = index;
      },
      bulletinBoardShow () { //打开公告板
        this.$store.commit("BULLETIN_BOARD","true");
      },
      feedback(){ //意见反馈
        let args = '{' +
          '"requesttype":16,' +
          '"messageid":'+ 0 +',' +
          '"jscallback" : "feedback"' +
          '}';
        sendData(args);
      },
      aboutus () { //关于我们
        let args = '{' +
          '"requesttype":24,' +
          '"messageid":'+ 0 +',' +
          '"jscallback" : "feedback"' +
          '}';
        sendData(args);
      },

    },
  }
</script>

