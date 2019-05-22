<template>
  <div class="cwContainer">
    <div class="commonTitle">
      <div class="commonTitleMain">
        <h2>待上课程<span style="line-height: 35px;color: #939aa9">*只显示近期三天（有课）的课程</span></h2>
        <p><router-link to="/courseManage/temOpening">临时排课</router-link></p>
      </div>
    </div>
    <div class="cwBody" v-if="classHave">
      <div class="courseList" v-for="(cw,$index) in cwList">
        <p class="cwDate">{{ dayList[$index] }}<span>（共{{cw.total}}节）</span></p>
        <ul>
          <!--测评课evaluation,正式课official-->
          <li class="card" v-for="(item,index) in cw.list"
              :class="{ 'evaluation': item.courseType==0, 'official': item.courseType==1}">
            <div class="courseMain">
              <div class="courseDetail">
                <div>
                  <span>{{ item.subject }}</span>
                  <span>{{ item.startTime }} - {{ item.endTime }}</span>
                  <div class="detail" v-if="item.courseType==0" @mouseenter="tipShow($index + '-' + index)"
                      @mouseleave="tipHide()">
                    详情
                    <div class="studyInfo" v-if="courseTip==$index + '-' + index">
                      <span class="triangleUp2"></span>
                      <span class="triangleUp3"></span>
                      <div class="courseTip">
                        <p><span>试听知识点：</span>{{item.monthPoint||item.otherPoint||item.termPoint}}</p>
                        <p><span>学习情况：</span>{{item.studyStatus}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p>
                  <span :title="item.studentName">{{ item.studentName }}
                    <a v-if="item.studentSex==0">(男)</a>
                    <a v-else-if="item.studentSex==1 ">(女)</a>
                  </span>
                  <span>{{item.grade}}</span>
                  <span :title="item.subjectVersion">{{item.subjectVersion}}</span>
                </p>
              </div>
              <div class="enterRoom">
                <Button disabled class="enterClass" v-if="!item.startClass">进入教室</Button>
                <Button
                  :type="item.type"
                  class="enterClass" v-else-if="item.startClass"
                  @click="start(index,item.courseUuid,item)">进入教室</Button>
                  <p class="lateTime" v-show="item.lateShow">迟到{{realLateTime[index]}}</p>
                  <p class="rangeTime" v-show="item.rangeShow">开始{{realLateTime[index]}}</p>
              </div>
            </div>
            <div v-if="item.courseType==0" class="triangleMain">
              <p class="triangleTop"></p>
              <p class="testSign">测</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="courseListNull tip-null" v-else>
      <img src="../../assets/teacher/ai.png" alt="null">
      <span class="tip-null-text" style="font-size: 16px;color: #8d8d8d;">近三天没有课程哦~</span>
    </div>

    <Modal v-model="enterWindow" width="320" class="enterWindow">
      <p slot="header">
        <span>进入教室</span>
      </p>
      <p slot="close">
        <Icon type="close-round"></Icon>
      </p>
      <div class="enterWindowImg" v-if="enterType === 0">
        <img src="../../assets/teacher/loadingMain.gif"/>
      </div>
      <div class="enterWindowText" v-else-if="enterType === 1"><Icon type="checkmark-circled"></Icon>进入教室成功！</div>
      <div class="enterWindowError" v-else-if="enterType === 2">
        <p>进入教室失败！</p>
        <Button type="primary" @click="start(startIndex,startUuid,startItem)">重新进入</Button>
        <div>若长时间不能进入教室，请检查网络或者联系班主任
          <!--<a href="javascript:;" @click="support">请求技术支持</a>-->
        </div>
      </div>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>
<style lang="less">
  @import '../../style/courseWait.less';
</style>
<script>
  import { timestamp,forMatTime } from '@/common/js/common';
  let interval = new Array();
  export default {
    data() {
      return {
        dayList: ['今天', '明天', '后天'],
        cwList: [],
        courseTip: "",//详情现实与隐藏
        lateTime:"",
        classHave: true,
        realLateTime:new Array(),
        enterWindow:false,
        enterType:null,
        startIndex:null,
        startUuid:null,
        startItem:null,
        upData:0,
      }
    },
    mounted() {
      this.getTime();

      let methods =  window._client_user_web_methods_;
      Object.assign(methods, {
        enterProgess : res => {
          let as = JSON.parse(res["args"]).state;
          this.enterWindow = true;
          this.enterType = as;
        }
      });
    },
    watch : {
      lateTime (newValue, oldValue) {
        let newValueArray = newValue.split(",");
        this.realLateTime = newValueArray;
      },
    },
    methods: {
      getTime() {
        timestamp().then(data => {
          let date1 = this.moment(data.timestamp).format("YYYY-MM-DD");
          let date2 = this.moment(date1).add(1, 'days').format("YYYY-MM-DD");
          let date3 = this.moment(date1).add(2, 'days').format("YYYY-MM-DD");
          let courseDateList = [date1, date2, date3];
          let timestamp = data.timestamp;
          this.getCWList(courseDateList, timestamp);
        });
      },
// 获取待上课程列表
      getCWList(courseDateList, timestamp) {
        this.$axios.post(this.$store.state.getNoEndCourseList,
          {courseDateList: courseDateList}).then(res => {
          this.cwList = res.data.data;

          let classHave = [];
          for(let item of this.cwList) {
            if(item.total) {
              classHave.push('T');
            }
          }
          if(!classHave.length) {
            this.classHave = false;
          }
          if (this.cwList[0].total) {
            let lateList = [];
            for(let i=0;i<this.cwList[0].list.length;i++){
              let list = this.cwList[0].list[i];
              let ISOtime = `${list.courseDate.replace(/-/g,'/')} ${list.startTime}`;
              let second = (new Date(ISOtime).getTime() - timestamp) / 1000;
              if(!list.classStatus) {
                this.countDown(i,second,lateList);
              } else {
                Object.assign(list, {
                  startClass: true,
                  lateShow: false,
                  rangeShow: false,
                  type: 'primary',
                });
              }
            }
          }

        })
      },
//      倒计时
      countDown(i,second,lateList){
        let list = this.cwList[0].list[i];
        this.typeShow(i,second,lateList,list)
        interval[i] = setInterval(() => {
          second--;
          this.typeShow(i,second,lateList,list)
        }, 1000);
      },
      typeShow(i,second,lateList,list) {
        let second2 = Math.abs(second),
          startTime = `${list.courseDate.replace(/-/g,'/')} ${list.startTime}`,
          endTime = `${list.courseDate.replace(/-/g,'/')} ${list.endTime}`,
          classTime = (new Date(endTime).getTime() -new Date(startTime).getTime()) / 1000;
        if (second >= 0 && second <= 1200) {
          Object.assign(list, {
            startClass: true,
            lateShow: false,
            rangeShow: true,
            type: 'primary',
          });
          lateList[i] = forMatTime(second);
          this.lateTime =  lateList.toString();
        }
        else if (second < 0) {
          Object.assign(list, {
            startClass: true,
            lateShow: true,
            rangeShow: false,
            type: 'error',
          });
          if(second2>=classTime){
            second2 = classTime
            clearInterval(interval[i]);
          }
          lateList[i] = forMatTime(second2)
          this.lateTime = lateList.toString();
        }
        else {
          Object.assign(list, {
            startClass: false,
            lateShow: false,
            rangeShow: false,
          });
        }
      },
//      详情显示与隐藏
      tipShow(index) {
        this.courseTip = index;
      },
      tipHide() {
        this.courseTip = '';
      },
//      开始上课
      start($index, uuid, item) {  //进入房间
        this.startIndex = $index;
        this.startUuid = uuid;
        this.startItem = item;
        this.$axios({
          method: "post",
          url: this.$store.state.getCourseRoom,
          data: {
            'courseUuid': this.startUuid,
          },
        }).then(res => {
            let data = res.data.data;
            let args = `{
              "requesttype": 2,
              "messageid": ${this.startIndex},
              "jscallback": "coursewareClassback",
              "data": {
                "commchannelid": "${data.commChannelId}",
                "signallingchannelid": "${data.signallingchannelid}",
                "recordId": "${data.recordId}",
                "courseType": "${data.courseType}",
                "courseUuid": "${this.startUuid}",
                "tabId": "${this.i}",
                "value": ${JSON.stringify(this.startItem)}
              }
            }`;
            sendData(args);
            this.getTime();
          })
      },
      target() {
        let args = `{
          "requesttype": 13,
          "url": "www.onlyhi.cn"
        }`;
        sendData(args);
      },
      support() { //技术支持
        let args = `{
          "requesttype": 18
        }`;
        sendData(args);
      },
    },
    destroyed () {
      for(let i of interval){
        clearInterval(i);
      }
    }
  }
</script>

