<template>
  <div class="home-class-tip card">
    <div class="home-class-tip-main">
      <h2>课程提醒</h2>
      <div class="home-class-tip-table">
        <table  cellpadding="0" cellspacing="0" v-if="todayClassTip.length">
          <colgroup>
            <col width="50">
            <col width="110">
            <col width="50">
            <col width="180">
            <col width="80">
          </colgroup>
          <tr v-for="(item,$index) in todayClassTip" :class="{active:item.enter}">
            <td>今天</td>
            <td>{{ item.startTime }} - {{ item.endTime }}</td>
            <td>{{ item.subject }}</td>
            <td>学生：{{ item.studentName }}</td>
            <td><Button type="error" v-if="item.enter" @click="start($index,item.courseUuid,item)">进入教室</Button></td>
          </tr>
        </table>
        <div class="classTipNull tip-null" v-else>
          <img src="../assets/teacher/null.png" alt="null">
          <span class="tip-null-text">暂无课程提醒哦~</span>
        </div>
      </div>
    </div>

    <Modal v-model="enterWindow" width="320" class="enterWindow">
      <p slot="header">
        <span>进入教室</span>
      </p>
      <p slot="close">
        <Icon type="close-round"></Icon>
      </p>
      <div class="enterWindowImg" v-if="enterType === 0">
        <img src="../assets/teacher/loadingMain.gif"/>
      </div>
      <div class="enterWindowText" v-else-if="enterType === 1">
        <Icon type="checkmark-circled"></Icon>进入教室成功！</div>
      <div class="enterWindowError" v-else-if="enterType === 2">
        <p>进入教室失败！</p>
        <Button type="primary" @click="start(startIndex,startUuid,startItem)">重新进入</Button>
        <div>若长时间不能进入教室，请检查网络或者联系班主任
        </div>
      </div>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>

<script>
  import { timestamp } from '@/common/js/common';
  let interval = new Array(); //定时器集合
  export default {
    data () {
      return {
        todayClassTip:[], //今天课程提醒
        todayNoEndCourseList:this.$store.state.todayNoEndCourseList, //今天课程提醒接口
        enterWindow:false,  //进入教室弹窗
        enterType:null, //进入状态
        startIndex:null, //进入下标
        startUuid:null, //进入教室ID
        startItem:null, //进入教室数据
      }
    },
    mounted () {
      timestamp().then(({timestamp}) => {
        this.getClassTip(timestamp);
      });

      let methods =  window._client_user_web_methods_;
      Object.assign(methods, {
        enterProgess : res => {
          let as = JSON.parse(res["args"]).state;
          this.enterWindow = true;
          this.enterType = as;
        }
      });

    },
    methods: {
      getClassTip(timestamp) { //课程提醒
        this.$axios.get(this.todayNoEndCourseList)
          .then(({data}) => {
            this.todayClassTip = data.data.list;
            if( this.todayClassTip.length ) {
              for(let i = 0, length = this.todayClassTip.length;i < length;i++) {
                let list = this.todayClassTip[i];
                Object.assign(list, { enter: false });
                let ISOtime = `${list.courseDate.replace(/-/g,'/')} ${list.startTime}`;
                let second = (new Date(ISOtime).getTime() - timestamp)/1000;
                if(second <= 1200) { //小于20分钟可以进入教室
                  Object.assign(list, { enter: true });
                } else {
                  interval[i] = setInterval(()=>{
                    second--;
                    if(second <= 1200){
                      clearInterval(interval[i]);
                      Object.assign(list, { enter: true });
                    }
                  },1000)
                }
              }
            }
          })
      },
      start($index, uuid, item) {  //进入房间
        this.startIndex = $index;
        this.startUuid = uuid;
        this.startItem = item;
        this.$axios({
          method: "post",
          url: this.$store.state.getCourseRoom,
          data: {
            'courseUuid': uuid,
          },
        }).then(res => {
          let data = res.data.data;
          let args = `{
            "requesttype": 2,
            "messageid": ${$index},
            "jscallback": "coursewareClassback",
            "data": {
              "commchannelid": "${data.commChannelId}",
              "signallingchannelid": "${data.signallingChannelId}",
              "recordId": "${data.recordId}",
              "courseType": "${data.courseType}",
              "courseUuid": "${uuid}",
              "tabId": ${this.startIndex},
              "value": ${JSON.stringify(item)}
            }
          }`
          sendData(args);
        })
      },
    },
    destroyed () {
      for(let i of interval){
        clearInterval(i);
      }
    }
  }
</script>

