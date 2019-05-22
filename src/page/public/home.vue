<template>
  <div class="home-content">
    <div class="home-left">
      <div class="home-info card">
        <div class="home-info-top">
          <div class="home-header">
            <div class="home-header-img">
              <div class="home-header-user"
                   :style="headerBackground"
                   v-if="info.photo!== null">
              </div>
            </div>
          </div>
          <div class="home-detail">
            <p>
              <span class="home-tag">明星教师</span> ，
              <span class="home-name">{{ info.name }}！</span>
            </p>
            <p class="home-detail-text">
              本月累计上课
              <i>{{ info.hour }}小时</i>
              ，击败了
              <i>{{ info.surpassRatio }}</i>
              的老师！
            </p>
          </div>
        </div>
        <div class="home-info-mid">
          <span>所上小时数</span>
          <div class="home-progress">
            <div class="home-progress-main" ref="progress">
              <div class="progress-bar" :style="{ 'width':progress.width  + '%','backgroundSize':progress.backgourdSize + '% 100%' }">
              </div>
              <div class="progress-first" :style="{ left: progress.firstLeft }">
                <div class="progress-tag">{{ progress.firstNum }}小时</div>
                <div class="progress-line"></div>
                <div class="progress-grade">level 1</div>
              </div>
              <div class="progress-second" :style="{ left: progress.secondLeft }">
                <div class="progress-tag">{{ progress.secondNum }}小时</div>
                <div class="progress-line"></div>
                <div class="progress-grade">level 2</div>
              </div>
            </div>
          </div>
        </div>
        <!--<noticeSection></noticeSection>-->
        <div class="home-info-nav">
          <ul>
            <li>
              <!--<router-link to="/">-->
                <!--<div class="home-nav-icon"></div>-->
                <!--<span>入门培训</span>-->
              <!--</router-link>-->
              <div class="home-nav-link" @click="videoStart">
                <div class="home-nav-icon"></div>
                <span>入门培训</span>
              </div>
            </li>
            <li>
              <!--<router-link to="/">-->
                <!--<div class="home-nav-icon"></div>-->
                <!--<span>测评培训</span>-->
              <!--</router-link>-->
              <div class="home-nav-link" @click="tip">
                <div class="home-nav-icon"></div>
                <span>测评培训</span>
              </div>
            </li>
            <li>
              <router-link to="courseManage/freeTime">
                <div class="home-nav-icon"></div>
                <span>空闲时间</span>
              </router-link>
            </li>
            <li>
              <!--<router-link to="personal/salary">-->
                <!--<div class="home-nav-icon"></div>-->
                <!--<span>薪资结算</span>-->
              <!--</router-link>-->
              <div class="home-nav-link" @click="tip">
                <div class="home-nav-icon"></div>
                <span>薪资结算</span>
              </div>
            </li>
            <li>
              <div @click="hiCommunity" class="home-nav-link">
                <div class="home-nav-icon"></div>
                <span>嗨社区</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <classTipSection></classTipSection>
    </div>
    <div class="home-right">
      <div class="home-date card">
        <div class="home-date-main">
          <div class="home-date-select">
            <h2>{{ year }}年{{ month }}月</h2>
            <div class="home-class-date-btn">
              <div @click="datePrev()">
                <Icon type="chevron-up"></Icon>
              </div>
              <div @click="dateNext()">
                <Icon type="chevron-down"></Icon>
              </div>
            </div>
          </div>
          <div class="home-date-picker">
            <h3>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </h3>
            <p v-for="(item,$index) in dateList" :key="$index">
              <span
                :class="dateStyle(day,month+'-'+day.dateDay)"
                v-for="(day,index) in item"
                :key="$index+'-'+index"
                @click="datePick(day,month+'-'+day.dateDay)"
              >{{ day.isToday?'今':day.dateDay }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="home-class-list">
        <div class="home-class-list-main">
          <h3>
            <strong>共{{ classTotal }}节课</strong>
            <span class="home-class-list-tip">
            <em>测评课</em>
            <em>正式课</em>
          </span>
          </h3>
          <div class="home-class-list-table">
            <table cellpadding="0" cellspacing="0" v-if="classList.length !== 0">
              <colgroup>
                <col width="110">
                <col width="20">
                <col>
                <col width="145">
              </colgroup>
              <tr v-for="(item,$index) in classList" :key="$index">
                <td>{{ item.startTime }} - {{ item.endTime }} </td>
                <td><i :class="item.courseType == 0?'orange':'green'"></i></td>
                <td>{{ item.subject }}</td>
                <td>学生：{{ item.studentName }}</td>
              </tr>
            </table>
            <div class="classTipNull tip-null" v-else>
              <img src="../../assets/teacher/null.png" alt="null">
              <span class="tip-null-text">今天没有课程哦~</span>
            </div>
          </div>
        </div>
        <Spin fix id="loadAPP" v-if="homeClassListShow">
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
            </svg>
          </div>
        </Spin>
      </div>
    </div>
    <div class="home-video" v-if="videoShow">
      <div class="home-video-main">
        <div class="home-video-wrap">
          <video-player  class="vjs-custom-skin"
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true">
          </video-player>
          <div class="video-close" @click="videoShow=false">
            <Icon type="close-round"></Icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import '../../style/home.less';
</style>

<script>
  import { timestamp } from '@/common/js/common';
  import noticeSection from '@/components/notice';
  import classTipSection from '@/components/classTip';
  import 'video.js/dist/video-js.css';
  import { videoPlayer } from 'vue-video-player';


  const progressConfig = {
    firstNum:50,
    secondNum:96,
    totalNum:150,
  }
  export default {
    data () {
      return {
        playerOptions: {},
        videoShow:false,
        year:0,
        month:0,
        day:0,
        time:0,
        date:'', //日期 （YYYY-MM）
        info:'', //教师信息
        progress:{ //进度条配置
          width: 0,
          backgourdSize: 0,
          imgWidth:'',
          firstNum:progressConfig.firstNum,
          secondNum:progressConfig.secondNum,
          totalNum:progressConfig.totalNum,
          firstLeft:progressConfig.firstNum * 100 / progressConfig.totalNum + '%',
          secondLeft:progressConfig.secondNum * 100 / progressConfig.totalNum + '%',
        },
        classTotal:0, //日历课程总数
        pickIndex:'', //日期选中下标
        classList:[], //日历课程列表
        dateList:[], //日历列表
        courseCalendar:this.$store.state.courseCalendar, //获取日历接口
        dateCourseList:this.$store.state.dateCourseList, //获取日历课程接口
        teacherInfo:this.$store.state.teacherInfo, //获取教师信息接口
        getTrainingVideo:this.$store.state.getTrainingVideo, //获取入门培训视频
        homeClassListShow: false, //课程列表loading
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      },
      headerBackground () {
        return this.info.photo?`background:#fff url(${this.info.photo}) center / cover no-repeat;`:'';
      },
    },
    mounted () {
      this.timeSet();
      this.getInfo();
    },
    methods: {
      videoStart() {
        this.$axios.get(this.getTrainingVideo)
          .then( ({ data }) => {
            this.playerOptions= {
              fluid: true,
              playbackRates: [0.7, 1.0, 1.5, 2.0],
              sources: [{
                type: "video/mp4",
                src: data.data.videoUrl,
              }],
            };
            this.videoShow = true;

          })
      },
      timeSet () {  //获取服务器时间
        timestamp().then( data =>{
          this.year = data.year;
          this.month = data.month;
          this.day = data.day;
          this.dateGet(true);  //首次获取
        })
      },
      getInfo() {  //获取教师信息
        this.$axios.get(this.teacherInfo)
          .then( ({ data }) => {
            this.info = data.data;
            let pg = this.progress;
            pg.width = this.info.hour * 100 / progressConfig.totalNum;
            pg.backgourdSize = (100 / pg.width)*100;
            this.$store.state.teacherName = this.info.name;
          })
      },
      datePrev () {  //上月
        this.month--;
        if(this.month < 1) {
          this.year--;
          this.month = 12;
        }
        this.dateGet ();
      },
      dateNext () {  //下月
        this.month++;
        if(this.month > 12) {
          this.year++;
          this.month = 1;
        }
        this.dateGet ();
      },
      dateGet (first) { // 获取日历（按月）
        let year = this.year;
        let month = this.month < 10? '0' + this.month : this.month;
        this.date = year + '-' + month;
        this.$axios.get(this.courseCalendar,{
          params : {
            dateTime : this.date,
          },
          loading: false,
        }).then( res => {
          this.dateList = res.data.data;
          if(first){  //页面初始化 默认选中当天
           for(let j of this.dateList) {
             for (let i of j) {
               if(i.isToday) {
                 let pick = this.month + '-' + this.day;
                 this.datePick (i,pick)
               }
             }
           }
          }
        })
      },
      dateStyle (day,pick) { //日历天数样式
        if(day.dateStatus == 0) {
          return 'un';
        } else {
          if (day.dateStatus == 1){
            return 'no';
          } else if(pick == this.pickIndex){
            return 'picked';
          }
        }
      },
      datePick (day,pick) {  //日历选中
        if(day.dateStatus != 2) {
          return false
        } else {
          this.homeClassListShow = true;
          this.day = day.dateDay;
          this.pickIndex = pick;
          let dateDay = this.day < 10? '0'+this.day:this.day;
          let ymd = this.date + '-' + dateDay;

          this.$axios.get(this.dateCourseList,{
            params:{
              'courseDate' : ymd,
            },
            loading: false,
          }).then( res => {
            this.classList = res.data.data.list;
            this.classTotal = res.data.data.total;
            this.homeClassListShow = false;
          }).catch( error => {
            this.homeClassListShow = false;
          })
        }
      },
      hiCommunity () {
        if(sessionStorage.getItem('device') == 'web') {
          window.open("https://www.vzan.cc/f/s-745762?auth_time=636580064201269353","_blank");
        } else {
          let args = '{ "requesttype" : 13,' +
            '"url" : "https://www.vzan.cc/f/s-745762?auth_time=636580064201269353"' +
            '}';
          sendData(args);
        }
      },
      tip(){
        this.$Message.info("敬请期待")
      }
    },
    components:{
      noticeSection,
      classTipSection,
      videoPlayer,
    }
  }
</script>

