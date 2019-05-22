<template>
  <div class="changeContainer">
    <div class="commonTitle">
      <div class="commonTitleMain">
        <h2>调课 <span>本月（按人工月统计）你还有<i>{{getChangeRecordNum}}</i>次调课机会，调课只能调整到近2周，课程未开始前都可以进行调课。</span></h2>
      </div>
    </div>
    <div class="cwBody">
      <Form class="formItem" :model="formItem" :label-width="132" label-position="right">
        <div class="chooseStudent">
          <p class="formTitle">1.选择调课学生</p>
          <FormItem label="选择学生:" class="stuName">
            <Select v-model="formItem.leadsUuid" @on-change="getSubject">
              <Option v-for="(item,index) in studentList" :value="item.leadsUuid" :key="index">{{ item.leadsName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="手机号码:" class="stuPhone">
            <Input v-model="hidePhone" placeholder="请选择" readonly></Input>
          </FormItem>
          <FormItem label="选择科目:" class="subject">
            <Select v-model="formItem.subject" @on-change="getCourseTime">
              <Option v-for="(item,index) in subjectList" :value="item" :key="item">{{item}}
              </Option>
            </Select>
          </FormItem>
          <FormItem prop="courseTime" label="上课时间:" class="courseTime">
            <Select v-model="formItem.courseTime"  @on-change="getCourseInfo">
              <Option v-for="(item,index) in courseTimeList" :value="item.courseTime" :key="index">
                {{ item.courseTime }}
              </Option>
            </Select>
          </FormItem>
        </div>
        <div class="chooseTime">
          <p class="formTitle">2.选择调课时间</p>
          <FormItem label="上课日期:">
            <DatePicker type="date" :clearable="false" :options="options" placeholder="请选择" v-model="formItem.courseAdjustDate"
                        @on-change="isClick"></DatePicker>
          </FormItem>
          <FormItem label="开始时间:">
            <Cascader :data="startTimeData"
                      v-model="startTimeValue"
                      :clearable="false"
                      :render-format="label => label.join(' : ')"
                      @on-change="isClick"
                      style="width: 196px;"></Cascader>
          </FormItem>
          <FormItem label="授课时长:">
            <RadioGroup v-model="formItem.courseAdjustLength" @on-change="isClick">
              <Radio label="45">45min</Radio>
              <Radio label="60">60min</Radio>
              <Radio label="90">90min</Radio>
              <Radio label="120">120min</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      </Form>
      <Button class="submit" type="primary" :disabled="isCheck" :class="{ active: isLoad}" @click="handleSubmit">确认调课</Button>
    </div>
  </div>
</template>
<style lang="less">
  @import '../../style/changeClass.less';
</style>
<script>
  import {timestamp, forMatTime} from '@/common/js/common';
  import { apiBase2 } from '@/common/js/api.config';

  const defaultForm = {  //初始化表单信息
    stuPhone: '',
    subject: '',
    courseTime: '',
    courseAdjustDate: '',
    courseAdjustStartTime: '',
    courseAdjustLength: '',
    courseOrderUuid: '',
    courseRequestUuid: ' ',
    coursePayRequestUuid: '',
    crUuid: '',
    courseUuid:'',
    leadsUuid:''
  };

  export default {
    data() {
      return {
        startTimeValue: [],  //开始时间选中
        startTimeData: [],  //开始时间列表
        getChangeRecordUrl: this.$store.state.getChangeRecord,
        getStudentsUrl: this.$store.state.getStudentInfo,
        getSubjectUrl: this.$store.state.getSubject,
        getCourseTimeUrl: this.$store.state.getCourseTime,
        adjustCourseUrl: this.$store.state.adjustCourse,
        getChangeRecordNum: 5,  //调课机会
        hidePhone: '',  //隐藏后号码
        studentList: [],  //学生列表
        subjectList: [], //学科列表
        courseTimeList: [],  //上课时间列表
        isLoad: false,  //loading
        isCheck: true,  //是否不可点击
        formItem: Object.assign({},defaultForm),
        options: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now() - 86400000 || date.valueOf() > Date.now() + 1123200000;
          }
        },
      }
    },
    created() {
      let minutes = []
      for(let i = 0;i<12;i++) {  //开始时间分钟 间隔五分钟
        let num = i*5 < 10? `0${i*5}` : `${i*5}`
        minutes.push({
          value: num,
          label: num,
        })
      }

      for(let i = 6;i<24;i++) { //开始时间小时 6-24
        let num = i < 10? `0${i}` : `${i}`
        this.startTimeData.push({
          value: num,
          label: num,
          children: minutes,
        })
      }
    },
    mounted() {
      this.getChangeRecord();
      this.getStudents();
    },
    methods: {
      numHiding(value) {  //隐藏号码中间4位
        if (!value) return '';
        let r = value.substring(3, 7);
        return value.replace(r, '****');
      },
      getChangeRecord() { //获取调课次数
        this.$axios.get(this.getChangeRecordUrl,{
          baseURL: apiBase2(),
        }).then(({ data }) => {
            let hasChangeNum = data.data == null ? 0 : data.data;
            this.getChangeRecordNum = 5 - hasChangeNum;
          })
      },
      getStudents() { //获取学生
        this.$axios.get(this.getStudentsUrl,{
          baseURL: apiBase2(),
          loading: false,
        }).then(({ data }) => {
          this.studentList = data.data;
        })
      },
      getSubject(value) { //自动选择手机并且获取科目
        if (value) {
          for (let item of this.studentList) { //自动选择手机
            if (this.formItem.leadsUuid == item.leadsUuid) {
              this.formItem.stuPhone = item.leadsPhone;
              this.hidePhone = this.numHiding(this.formItem.stuPhone);
            }
          }
          this.$axios.get(this.getSubjectUrl, { //获取科目
            params: {
              leadsUuid: value,
            },
            baseURL: apiBase2(),
            loading: false,
          }).then(res => {
            Object.assign(this.formItem,{
              subject: '',
              courseTime: '',
            })
            this.subjectList = res.data.data;
            this.courseTimeList = [];
          });
        }
      },
      getCourseTime(value) { //获取上课时间,还有一些其他字段
        if (value) {
          this.$axios.get(this.getCourseTimeUrl, {
            params: {
              leadsUuid: this.formItem.leadsUuid,
              subject: value
            },
            baseURL: apiBase2(),
            loading: false,
          }).then(res => {
            this.courseTimeList = res.data.data;
          })
        }
      },
      getCourseInfo(value){  //根据选择的上课时间,获取一些其他字段
        if(value) {
          for (let item of this.courseTimeList) {
            if (this.formItem.courseTime == item.courseTime) {
              Object.assign(this.formItem, {
                courseOrderUuid: item.courseOrderUuid,
                courseRequestUuid: item.courseRequestUuid,
                crUuid: item.crUuid,
                courseUuid: item.courseUuid,
                coursePayRequestUuid: item.coursePayRequestUuid || null
              })
            }
          }
          this.isClick();
        }
      },
      isClick(value) { // 表单验证正确，调课按钮变蓝
        if(Array.isArray(value)){
          Object.assign(this.formItem,{
            courseAdjustStartTime: value.join(':')
          })
        }
        let objectArray = Object.values(this.formItem);
        this.isCheck = objectArray.includes("") ? true : false;
      },
      handleSubmit() {   // 点击调课
        let date = this.formItem.courseAdjustDate;
        let formatDate = this.moment(date).format('YYYY-MM-DD');
        let times = this.formItem.courseAdjustStartTime;
        let dateTime = formatDate + " " + times;
        let chooseTime = this.moment(dateTime).format('x');
        let endDate = this.moment(dateTime).add(Number(this.formItem.courseAdjustLength), 'm');
        let endHour = endDate.hour();
        let endMinute = endDate.minute();
        timestamp().then(res => {
          let nowTime = res.timestamp;
          if (chooseTime < nowTime) {
            this.$Notice.warning({
              title: '提示',
              desc: '选择时间已经超过当前时间，无法排课！',
              duration:5,
            });
          } else if((endHour>0 && endHour < 6) || (endHour == 0 && endMinute>0)) {
            this.$Notice.warning({
              title: '提示',
              desc: '结束时间不能超过24点！',
              duration:5,
            });
          } else {
            this.isLoad = true;
            this.isCheck = true;
            let formItem = JSON.parse(JSON.stringify(this.formItem));
            Object.assign(formItem,{
              courseAdjustDate: formatDate,
              courseAdjustLength: Number(formItem.courseAdjustLength)
            })
            this.$axios.post(this.adjustCourseUrl,formItem,{
              baseURL: apiBase2(),
            }).then(res => {
              this.isLoad = false;
              this.startTimeValue = [];
              this.hidePhone = '';
              this.formItem = Object.assign({},defaultForm);
              this.$Message.success('调课成功！');
              this.getChangeRecord();
              this.getStudents();
            }).catch(error => {
              this.isLoad = false;
            });
          }
        });
      },
    },
  }
</script>

