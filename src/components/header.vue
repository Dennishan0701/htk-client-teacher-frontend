<template>
  <div class="header" :class="{webHeader}">
    <div class="header-main">
      <div class="header-logo">
        <img src="../assets/teacher/logo.png">
      </div>
      <div class="header-nav" ref="headerNav" :class="{navBan}">
        <div class="header-nav-item" v-for="menu in headerList" :class="{ active:rn == menu.name }">
          <router-link v-if="menu.grade == 0" :to="menu.link">{{ menu.title }}</router-link>
          <p v-if="menu.grade == 1">{{ menu .title }}<i></i></p>
          <ul v-if="menu.grade == 1">
            <li v-for="item in menu.item">
              <router-link :to="item.link" v-if="!item.click">{{ item.title }}</router-link>
              <a href="javascript:;" v-else @click="item.click">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 退出 -->
    <Modal v-model="tipWindow" width="320" class="sign-out">
      <p slot="header">
        <span>退出提醒</span>
      </p>
      <p slot="close">
        <Icon type="close-round"></Icon>
      </p>
      <div class="tipWindow">
        <p>确定退出登录吗？</p>
      </div>
      <div slot="footer">
        <Button type="primary" @click="signOutBtn">确认</Button>
        <Button type="primary" @click="tipWindow = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  const device = sessionStorage.getItem('device')

  export default {
    data () {
      return {
        helpMain:this.$store.state.helpMain,
        helpIndex:0,
        helpShow:false,
        offsetTop :0,
        tipWindow: false,
        webHeader:false,
        navBan:false,
        headerList:[
          {
            title: '首页',
            name: 'home',
            link: '/home',
            grade: 0,
          },
          {
            title: '我的课程',
            name: 'courseManage',
            grade:1,
            item: [
              {title: '待上课程',link:'/courseManage/courseWait'},
              {title: '空闲时间',link:'/courseManage/freeTime'},
              {title: '我的课表',link:'/courseManage/mySchedule'},
              {title: '课程记录',link:'/courseManage/courseRecord'},
              {title: '我要排课',link:'/courseManage/openClass'},
              {title: '我要调课',link:'/courseManage/changeClass'},
            ],
          },
          {
            title: '课件管理',
            name: 'coursewareManage',
            grade:1,
            item: [
              {title: '我的课件',link:'/coursewareManage/myCourseware'},
              {title: '课件库',click: this.tip},
//              {title: '课件库',link:'/coursewareManage/systemCourseware'},
//              {title: '优秀视频',link:'/coursewareManage/excellentVideo'},
            ],
          },
          {
            title: '个人中心',
            name: 'personal',
            grade:1,
            item: [
              {title: '个人信息',link:'/personal/info'},
              {title: '薪资结算',click: this.tip},
              {title: '修改密码',click: this.changePsw},
              {title: '退出登录',click: this.signOut},
//              {title: '薪资结算',link:'/personal/salary'},
//              {title: '合作协议',link:'/personal/cooperation'},
//              {title: '实习证明',link:'/personal/internship'},
//              {title: '手写板申请',link:'/personal/HBapplication'},
            ],
          },
        ],
      }
    },
    props:['rn'],
    mounted () {
      if(device == 'web') this.webHeader = true;

      let methods =  window._client_user_web_methods_;
      Object.assign(methods, {
        navBan : res => {
          this.navBan = res;
        }
      });
    },
    methods: {
      feedback(){ //意见反馈
        let args = `{
          "requesttype": 16,
          "messageid": 0,
          "jscallback": "feedback"
        }`
        sendData(args);
      },
      support(){ //远程协助
        let args = '{' +
          '"requesttype":18' +
          '}';
        sendData(args);
      },
      help () { //用户帮助
        this.helpShow = true;
      },
      helpClose () {
        this.helpShow = false;
      },
      helpSelect (index){
        this.offsetTop = this.$refs.helpQuestion[index].offsetTop - 60;
        this.helpIndex = index;
        this.$refs.helpArrow.style.top = this.offsetTop + 'px';
      },
      changePsw(){
        this.$router.push('/personal/info');
        this.$store.commit("CHANGE_PASSWORD","true");
      },
      signOut () {
        this.tipWindow = true;
      },
      signOutBtn () {
        if(device !== 'web') {
          let args = `{
            "requesttype": 14,
            "messageid": 0,
            "jscallback": "signOut",
            "data": {
              "msgbox": true
            }
          }`
          sendData(args);
        } else {
          window.location.href = '../static/login.html'
        }
      },
      tip(){
        this.$Message.info("敬请期待")
      }
    },
  }
</script>
<style lang="less">
  .sign-out .tipWindow{
    padding: 20px 0;
    text-align: center;
  }
  .sign-out button{
    margin: 0 15px !important;
    width: 100px !important;
  }
</style>
