<template>
  <div class="openContainer">
    <div class="commonTitle">
      <div class="commonTitleMain">
        <h2>排课</h2>
      </div>
    </div>
    <div class="cwBody" v-if="studentsList.length">
      <div class="studentList">
        <ul>
          <li class="card" v-for="item in studentsList">
            <div class="courseMain">
              <div class="courseDetail">
                <div>
                  <span>{{item.leadsName}}</span>
                  <span>{{item.subject}}</span>
                </div>
                <p>
                  <span>{{item.grade}}</span>
                  <span>{{item.leadsPhone|numHiding}}</span>
                </p>
              </div>
              <div class="enterRoom">
                <p class="enterClass" @click="openClasses(item)">排课</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="courseListNull tip-null" v-else>
      <img src="../../assets/teacher/ai.png" alt="null">
      <span class="tip-null-text" style="font-size: 16px;color: #8d8d8d;">你还没有学生哦~</span>
    </div>
    <Modal v-model="openClass" width="380" class="openClass">
      <p slot="header">
        <span>排课</span>
      </p>
      <p slot="close">
        <img src="../../assets/images/close2.png" alt="关闭">
      </p>
      <Form :model="formItem" :label-width="70">
        <FormItem label="选择日期:">
          <DatePicker type="date"
                      :options="options"
                      placeholder="请选择"
                      v-model="formItem.courseDate"
                      :clearable="false"
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
        <FormItem label="上课时长:">
          <RadioGroup v-model="formItem.courseLength" @on-change="isClick">
            <Radio label="45">45min</Radio>
            <Radio label="60">60min</Radio>
            <Radio label="90">90min</Radio>
            <Radio label="120">120min</Radio>
          </RadioGroup>
        </FormItem>
        <Button class="submit" type="primary" :disabled="isCheck" :class="{ active: isLoad }" :loading="loadingPaike" @click="handleSubmit">排课</Button>
      </Form>
      <p slot="footer"></p>
    </Modal>
  </div>
</template>
<style lang="less">
  @import '../../style/openClass.less';
</style>
<script>
  import { timestamp,forMatTime } from '@/common/js/common';
  import { apiBase2 } from '@/common/js/api.config';

  const defaultForm = {  //初始化表单信息
    courseDate: '',
    courseStartTime: '',
    courseLength: '',
    courseOrderUuid: '',
    courseRequestUuid: '',
    coursePayRequestUuid: '',
    leadsUuid: '',
    crUuid: '',
  };

  export default {
    data() {
      return {
        loadingPaike:false,
        startTimeValue: [],  //开始时间列表
        startTimeData: [],  //开始时间选中
        getStudentsUrl: this.$store.state.getStudents,
        arrangeCourse: this.$store.state.arrangeCourse,
        studentsList: [],  //学生列表
        openClass: false,  //排课弹窗
        isLoad: false,  //loading
        isCheck: true,  //是否不可点击
        formItem: Object.assign({},defaultForm),
        options: {
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
      }
    },
    filters: {
      numHiding: function (value) {  // 电话号码****
        if (!value) return '';
        let r = value.substring(3,7);
        return value.replace(r,'****');
      }
    },
    created() {
      let minutes = []
      for(let i = 0;i<12;i++) {   //开始时间分钟 间隔五分钟
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
      this.getStudents();
    },
    methods: {
      getStudents() { // 获取该老师的学生列表
        this.$axios.post(this.getStudentsUrl,{},{
          baseURL: apiBase2(),
        }).then(({ data }) => {
          this.studentsList= data.data;
        })
      },
      openClasses({  // 点击排课，显示弹窗
          courseOrderUuid,
          courseRequestUuid,
          coursePayRequestUuid,
          leadsUuid,
          crUuid,
        }){
        this.startTimeValue = [];
        this.openClass = true;
        this.isCheck = true;
        this.isLoad = false;
        Object.assign(this.formItem, {
          courseDate: '',
          courseStartTime: '',
          courseLength: '',
          courseOrderUuid: courseOrderUuid,
          courseRequestUuid: courseRequestUuid,
          crUuid: crUuid || null,
          leadsUuid: leadsUuid,
          coursePayRequestUuid: coursePayRequestUuid || null,
        })
      },
      isClick(value){  // 表单验证正确，排课按钮变蓝
        if(Array.isArray(value)){
          Object.assign(this.formItem,{
            courseStartTime: value.join(':')
          })
        }
        let objectArray = Object.values(this.formItem);
        this.isCheck = objectArray.includes("") ? true : false;
      },
      handleSubmit () { // 点击排课
        this.loadingPaike = true;
        let date = this.formItem.courseDate;
        let formatDate = this.moment(date).format('YYYY-MM-DD');
        let times = this.formItem.courseStartTime;
        let dateTime = formatDate+" " +times;
        let chooseTime = this.moment(dateTime).format('x');
        let endDate = this.moment(dateTime).add(Number(this.formItem.courseLength), 'm');
        let endHour = endDate.hour();
        let endMinute = endDate.minute();
        timestamp().then( res =>{
          let nowTime = res.timestamp;
          if(chooseTime<nowTime){
            this.$Notice.error({
              title: '提示',
              desc: '选择时间已经超过当前时间，无法排课！',
              duration:5,
            });
            this.loadingPaike = false
            this.isCheck = false;
          } else if((endHour>0 && endHour < 6) || (endHour == 0 && endMinute>0)) {
            this.$Notice.error({
              title: '提示',
              desc: '结束时间不能超过24点！',
              duration:5,
            });
            this.loadingPaike = false
            this.isCheck = false;
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
              this.openClass = false;
              this.$Message.success('排课成功！');
              this.loadingPaike = false
            }).catch(error=>{
              this.openClass=false;
              this.loadingPaike = false
            });
          }
        });
      },
    },
  }
</script>

