<template>
  <div class="crContainer">
    <div class="commonTitle">
      <div class="crHeader commonTitleMain">
        <h2>课程记录</h2>
        <div>
          <span>科目：</span>
          <Select v-model="formData.subject" @on-change="selectSubject" class="classSubject"
                  style="width:70px;height:27px;margin-right: 28px;">
            <Option v-for="item in subjectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span>时间：</span>
          <Row>
            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" @on-change="selectDate"
                        style="width: 200px"></DatePicker>
          </Row>
        </div>
      </div>
    </div>
    <div class="crHeader2">
      <div class="crHeader2-main">
        <p>{{dateTime}}</p>
        <div class="crHeader2-right">
          <p class="crHeader2-tab">
          <span v-for="(item,$index) in classType" :classType="$index" :class="{active:i==$index}"
                @click="selectClassType($index)">{{item}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="crBody" v-if="courseRecord.length" @scroll="changeDate($event)">
      <div v-for="(cr,$index) in courseRecord">
        <div class="crItem">
          <p class="crTitle" ref="courseDate" v-show="$index!=0">{{cr.list[0].courseDate}}</p>
          <ul class="courseList" :style="{width:courseListWidth}">
            <li class="card" v-for="item in cr.list">
              <div v-if="item.video!=''" class="courseHead"
                   :class="{ 'evaluation': item.courseType==0, 'official': item.courseType==1}">
                <!--<img :src="item.imgUrl" alt="课程封面图">-->
                <div v-if="item.recordStatus === 1">
                  <img src="../../assets/images/cBg.png" alt="课程封面图">
                  <p class="playVideo" @click="start(item.courseUuid)">
                    <img src="../../assets/images/play.png" alt="播放">
                  </p>
                </div>
                <div class="courseListNoVideo" v-else-if="item.recordStatus === 2">
                  <img src="../../assets/teacher/emoji-null.png">
                  <span>检测不到回顾视频</span>
                </div>
                <div class="courseListNoVideo" v-else-if="item.recordStatus === 3">
                  <img src="../../assets/teacher/emoji-null.png">
                  <span>视频转换中，次日方可查看</span>
                </div>
              </div>
              <div v-else class="courseHead" style="background-color: #c3c8ca;">
                <p class="notFound"><img src="../../assets/images/notFound.png" alt="无视频">检测不到回顾视频</p>
              </div>
              <div class="courseBody">
                <div>
                  <p>{{item.subject}}</p>
                  <p :title="item.name" style="max-width:5em;overflow: hidden;text-overflow:ellipsis;white-space: nowrap">{{item.name}}</p>
                </div>
                <div>
                  <p>{{item.startTime}}- {{item.endTime}}</p>
                  <p>{{item.grade}}<span>{{item.subjectVersion}}</span></p>
                </div>
              </div>
              <div class="courseFooter">
                <span class="writeFeedback"  @click="feedback(item.courseUuid)" v-if="item.classTeacherAppraiseUuid === null">填写反馈</span>
                <span class="readFeedback" @click="readFeedback(item.classTeacherAppraiseUuid)" v-else>查看反馈</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="courseListNull tip-null" v-else>
      <img src="../../assets/teacher/ai.png" alt="null">
      <span class="tip-null-text" style="font-size: 16px;color: #8d8d8d;">没有课程记录哦~</span>
    </div>
    <!--观看课程视频-->
    <div class="videoWarp" v-if="videoWarpper">
      <div class="videoContain" ref="videoContain">
        <div class="videoHead" ref="videohead">
          <img src="../../assets/images/close2.png" @click="videoWarpper=false" alt="关闭视频">
        </div>
        <div class="videoBody">
          <div class="videoMain" v-html="iframe"></div>
        </div>
      </div>
    </div>
    <!--老师反馈-->
    <Modal v-model="modal" width="430">
      <p slot="header">
        <span>老师反馈</span>
      </p>
      <p slot="close">
        <Icon type="close-round"></Icon>
      </p>
      <div style="padding: 14px 14px 0;font-size: 14px;">
        <p style="font-size: 12px;margin-bottom: 10px;">{{ commentInfo.createTime }}</p>
        <p style="word-wrap: break-word;">{{ commentInfo.appraiseContent }}</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" @click="modal=false" style="width: 125px;">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<style lang="less">
  @import '../../style/courseRecord.less';
</style>
<script>
  import {timestamp} from '@/common/js/common';
  import {GetQueryString} from '../../common/js/common';

  const token = sessionStorage.getItem('token')
  export default {
    data() {
      return {
        subjectList: [ //学科列表
          {value: '', label: '全部'},
          {value: '语文', label: '语文'},
          {value: '数学', label: '数学'},
          {value: '英语', label: '英语'},
          {value: '物理', label: '物理'},
          {value: '化学', label: '化学'},
          {value: '生物', label: '生物'},
          {value: '政治', label: '政治'},
          {value: '历史', label: '历史'},
          {value: '地理', label: '地理'},
          {value: '科学', label: '科学'},
        ],
        dateTime: "", //标题展示日期
        classType: ["全部", "测评课", "正式课"], //课程类型
        i: 0, //类型选中下标
        formData: {  //请求数据
          subject: '',
          startDate: "",
          endDate: "",
          courseType: "",
          pageNo: 1,
          pageSize: 10000,
        },
        courseRecord:[], //课程记录列表
        videoWarpper: false, //播放器显示
        iframe: "", //iframe DOM
        modal:false, //老师反馈弹窗显示
        commentInfo:'',  //老师反馈内容
        courseListWidth:'100%', //课程记录宽度
        viewTeacherAppraise:this.$store.state.viewTeacherAppraise,
      }
    },
    mounted() {
      this.courseRecordList();
    },
    updated() {

      if(this.courseRecord.length) {
        let crBody = document.querySelector('.crBody');
        // crBody - (padding 80 - margin 65 = 15);
        this.courseListWidth = crBody.clientWidth - 15 + 'px';
        window.onresize = ()=> {
          this.courseListWidth = crBody.clientWidth - 15 + 'px';
        }
      }

    },
    methods: {
      selectSubject(value) {  //科目选择
        this.formData.subject = value;
        this.courseRecordList()
      },
      selectDate(date) {  //日期时间选择
        [this.formData.startDate,this.formData.endDate] = date;
        this.courseRecordList();
      },
      selectClassType(index) {  //课程类型选择
        this.i = index;
        if (index==0){
          this.formData.courseType = "";
        } else{
          this.formData.courseType = index-1;
        }
        this.courseRecordList();
      },
      courseRecordList() {  //查询课程记录列表
        this.$axios.get(this.$store.state.getCourseRecordList, {
          params: this.formData
        }).then(({data}) => {
            this.courseRecord = data.data;
            if (this.courseRecord.length) {
              this.dateTime = this.courseRecord[0].courseDate;
            } else {
              this.dateTime = this.formData.startDate;
              this.$Message.error("没有课程记录哦！");
            }
          })
      },
      start(uuid) {  //查看回放
        this.videoWarpper = true;
        this.iframe = `<iframe src="../../static/play2.html?token=${token}&uuid=${uuid}"
                               id="iframe"
                               width="100%"
                               height="100%"
                               frameborder="no"
                               marginwidth="0"
                               marginheight="0"
                               scrolling="no"
                               allowtransparency="yes"
                               allowfullscreen="true"></iframe>`;
      },
      changeDate(e) {  //日期切换
        let crItem = document.getElementsByClassName("crItem");
        let scrollTop = e.target.scrollTop;
        for (let i = 0, length = crItem.length; i < length; i++) {
          if (scrollTop >= crItem[i].offsetTop) {
            this.dateTime = crItem[i].children[0].innerHTML;
          }
        }
      },

      feedback(courseUuid){  //填写老师反馈
        let args = `{
          "requesttype": 22,
          "courseUuid": "${courseUuid}",
          "callback": "refreshTeacherRecord"
        }`;
        sendData(args);
      },
      readFeedback(classTeacherAppraiseUuid){  //查看老师反馈
        this.$axios.get(this.viewTeacherAppraise,{
          params:{
            classTeacherAppraiseUuid:classTeacherAppraiseUuid,
          }
        }).then( ({ data }) => {
          this.commentInfo =  data.data
          this.modal = true;
        })

      },
    },
    destroyed () {
      window.onresize = null;
    },
  }
</script>
