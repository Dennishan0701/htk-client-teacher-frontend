<template>
  <div class="temOpening-content">
    <div class="temOpening-title commonTitle">
      <div class="temOpening-title-main commonTitleMain">
        <h2>临时开课</h2>
      </div>
    </div>
    <div class="temOpening-main">
      <div class="temOpening-detail">
        <p class="explain">说明：临时开课功能仅限于紧急情况下，正常课程遇到问题无法进入时使用。<br>
          不得用于其他情况下开课！其他情况下开课不计入课时费。</p>
        <Form :model="formItem" :label-width="75">
          <FormItem label="选择学生:">
            <Select v-model="formItem.leadsUuid" @on-change="changeStudent">
              <Option v-for="(item,index) in studentList" :value="item.leadsUuid" :key="index">{{ item.leadsName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="选择日期:" @on-change="isClick">
            <DatePicker type="date"
                        :options="options"
                        :clearable="false"
                        placeholder="请选择"
                        v-model="formItem.courseDate"></DatePicker>
          </FormItem>
          <FormItem label="开始时间:">
            <Cascader :data="startTimeData"
                      v-model="startTimeValue"
                      :clearable="false"
                      :render-format="label => label.join(' : ')"
                      @on-change="isClick"
                      style="width: 196px;"></Cascader>
          </FormItem>
          <FormItem label="上课时长:">
            <RadioGroup v-model="formItem.courseLength" @on-change="isClick">
              <Radio label="45">45min</Radio>
              <Radio label="60">60min</Radio>
              <Radio label="90">90min</Radio>
              <Radio label="120">120min</Radio>
            </RadioGroup>
          </FormItem>
          <Button class="submit" type="primary" :disabled="isCheck" :class="{ active: isLoad}" @click="handleSubmit">确认调课</Button>
        </Form>

      </div>
    </div>
  </div>
</template>

<script>
  import { timestamp,forMatTime } from '@/common/js/common';
  import { apiBase2 } from '@/common/js/api.config';

  const defaultForm = {  //初始化表单信息
    leadsUuid: '',
    courseDate: '',
    courseStartTime: '',
    courseLength: '',
    courseOrderUuid: '',
    courseRequestUuid: '',
    coursePayRequestUuid: '',
    crUuid: '',
  };

  export default {
    data () {
      return {
        startTimeValue: [],  //开始时间选中
        startTimeData: [],  //开始时间列表
        isLoad: false,  //loading
        isCheck: true,  //是否不可点击
        getStudentsUrl:this.$store.state.getStudents,
        arrangeCourse:this.$store.state.arrangeCourse,
        studentList: [],  //学生列表
        formItem: Object.assign({},defaultForm),
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
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
    mounted () {
      this.getStudents();
    },
    methods: {
      getStudents(){ // 获取该老师的学生列表
        this.$axios.post(this.getStudentsUrl,{},{
          baseURL: apiBase2(),
        }).then(({ data }) => {
          this.studentList = data.data;
        })
      },
      changeStudent(){  // 切换学生，学生信息变更
        for (let item of this.studentList) {
          if (this.formItem.leadsUuid == item.leadsUuid) {
            Object.assign(this.formItem, {
              courseOrderUuid: item.courseOrderUuid,
              courseRequestUuid: item.courseRequestUuid,
              crUuid: item.crUuid,
              coursePayRequestUuid: item.coursePayRequestUuid || null
            })
          }
        }
        this.isClick();
      },
      isClick(value) {
        if(Array.isArray(value)){
          Object.assign(this.formItem,{
            courseStartTime: value.join(':')
          })
        }
        let objectArray = Object.values(this.formItem);
        this.isCheck = objectArray.includes("") ? true : false;
      },
      handleSubmit () {
        let date = this.formItem.courseDate;
        let formatDate = this.moment(date).format('YYYY-MM-DD');
        let times = this.formItem.courseStartTime;
        let dateTime = formatDate+" " +times;
        let chooseTime = this.moment(dateTime).format('x');
        let endDate = this.moment(dateTime).add(Number(this.formItem.courseLength), 'm');
        let endHour = endDate.hour();
        let endMinute = endDate.minute();
        timestamp().then(res=>{
          let nowTime = res.timestamp;
          if(chooseTime < nowTime){
            this.$Notice.error({
              title: '提示',
              desc: '选择时间已经超过当前时间，无法排课！',
              duration:5,
            });
          } else if((endHour>0 && endHour < 6) || (endHour == 0 && endMinute>0)) {
            this.$Notice.error({
              title: '提示',
              desc: '结束时间不能超过24点！',
              duration:5,
            });
          } else{
            this.isLoad = true;
            this.isCheck = true;
            let formItem = JSON.parse(JSON.stringify(this.formItem));
            Object.assign(formItem,{
              courseDate: formatDate,
              courseLength: Number(formItem.courseLength)
            })
            this.$axios.post(this.arrangeCourse,formItem,{
              baseURL: apiBase2(),
            }).then(res => {
              this.isLoad = false;
              this.startTimeValue = [];
              this.formItem = Object.assign({},defaultForm);
              this.$Message.success('开课成功！');
              this.getStudents();
            }).catch(error=>{
              this.isLoad = false;
            });
          }
        });
      },

    },

  }
</script>
<style lang="less">
  @import '../../style/info.less';
  .temOpening-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    .temOpening-main{
      flex: 5;
      overflow-y: auto;
      .temOpening-detail{
        padding: 0px 40px;
        margin: 0 auto;
        p.explain{
          color:#da7194;
          font-size: 12px;
          text-align: center;
          line-height: 20px;
          padding-top: 27px;
        }
        form{
          margin: 0 auto;
          width: 360px;
          margin-top: 40px;
          .ivu-form-item-label{
            font-size: 14px;
            color: @mid-gray-color;
          }
          .ivu-form-item-required .ivu-form-item-label:before{
            content:'';
            margin-right: 0;
          }
          .ivu-form-item {
            margin-bottom: 30px;
          }
          .ivu-select-single .ivu-select-selection{
            height: 34px;
          }
          .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
            height: 34px;
            line-height: 34px;
          }
          .ivu-input {
            height: 34px;
            line-height: 34px;
          }
          .ivu-select{
            width: 172px;
          }
          //radio选中状态
          .ivu-radio-checked .ivu-radio-inner:after {
            opacity: 0;
            transform: none;
            content: none;
          }
          .ivu-radio{
            margin-right: 0;
          }
          .ivu-radio-checked .ivu-radio-inner{
            background: url(../../assets/teacher/check.png) no-repeat center;
            transition: none;
          }
          .ivu-radio-focus{
            box-shadow: none;
          }
          .ivu-radio-wrapper-checked{
            color: @primary-color;
          }
          .submit{
            width: 143px;
            height: 34px;
            text-align: center;
            color:#fff;
            font-size: 12px;
            border-radius: 3px;
            margin: 0 auto;
            display: block;
          }
          .submit[disabled] {
            background-color: @btn-disable-color !important;
          }
          .submit.active{
            color: transparent;
            background: @primary-color url(../../assets/images/load.gif) no-repeat center !important;
          }
        }
      }
    }
  }
</style>

