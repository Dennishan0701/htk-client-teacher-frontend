<template>
  <div class="salary-content">
    <div class="salaryHeader commonTitle">
      <div class="commonTitleMain">
        <h2>薪资结算<!--<span>申诉</span>--></h2>
        <p>*老师薪资通过工资卡发放，请到个人信息页面填写卡片信息</p>
      </div>
    </div>
    <div class="salaryContainer">
      <ul>
        <li>
          <div class="card">
            <Carousel>
              <Carousel-item v-for="(item,$index) in wagesList" :key="$index">
                <div class="demo-carousel">
                  <p class="date">{{item.date}}</p>
                  <p>应发薪资：{{item.money}}元</p>
                  <p>测评课：{{item.cepin}}课时</p>
                  <p>正式课：{{item.zhengshi}}课时</p>
                  <p>课时薪资：{{item.money2}}元</p>
                  <p>奖惩：{{item.reward}}</p>
                </div>
              </Carousel-item>
            </Carousel>
          </div>
        </li>
        <li>
          <div class="card">
            <Table highlight-row :columns="columns1"  :data="data1" border></Table>
          </div>
          <ul class="punishTitle">
            <li>奖惩</li>
            <!--<li @click="infoShow()">奖惩补录+</li>-->
            <li>
              <i-button type="primary" @click="show">奖惩补录+</i-button>
            </li>
          </ul>
          <div class="card publish ">
            <Table highlight-row :columns="columns2"  :data="data2" border></Table>
          </div>
        </li>
      </ul>
    </div>
    <!--弹窗-->
    <div>
      <Modal v-model="modal" width="360">
        <p slot="header">
          <span>信息补录</span>
        </p>
        <p slot="close">
          <!--<img src="../../assets/images/close2.png" alt="关闭">-->
          <Icon type="close-round"></Icon>
        </p>
        <div class="infoBody">
          <p>金额：<input type="text" v-model="money"><span>元</span></p>
          <p>奖惩补录信息：</p>
          <textarea name="" id="" v-model="textarea" @keyup="limitLength" maxlength="48"></textarea>
          <p>还可以输入<span>{{limit}}</span>字</p>
        </div>
        <div slot="footer">
          <Button type="primary" @click="add">提交</Button>
        </div>
      </Modal>
    </div>

    <!--信息补录-->
    <!--<div class="wrap" v-if="a">-->
    <!--<div class="infoCollect">-->
    <!--<p class="infoTitle">-->
    <!--<span>信息补录</span><img @click="closeInfo()" src="../../assets/images/close2.png" alt="关闭">-->
    <!--</p>-->
    <!--<div class="infoBody">-->
    <!--<p>金额：<input type="text"><span>元</span></p>-->
    <!--<p>奖惩补录信息：</p>-->
    <!--<textarea name="" id=""></textarea>-->
    <!--<p>还可以输入<span>48</span>字</p>-->
    <!--<p class="submit">提交</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<style lang="less">
  @import '../../style/salary.less';
</style>

<script>
  export default {
    data() {
      return {
//        走马灯
        wagesList: this.$store.state.wagesList,
//        表1
        columns1: [
          {
            type: 'index',
            width: 32,
            align: 'center'
          },
          {
            title: '学生',
            key: 'student'
          },
          {
            title: '上课时间',
            key: 'schooltime'
          },
          {
            title: '课时费（元）',
            key: 'money'
          },
          {
            title: '出勤',
            key: 'attendance'
          },
          {
            title: '备注',
            key: 'remarks'
          }
        ],
        data1: this.$store.state.salaryList,
//        表2
        columns2: [
          {
            type: 'index',
            width: 32,
            align: 'center'
          },
          {
            title: '奖惩补贴信息',
            key: 'student'
          },
          {
            title: '补贴额（元）',
            key: 'schooltime'
          },
          {
            title: '补贴形式',
            key: 'money'
          },
          {
            title: '审核',
            key: 'attendance'
          }
        ],
        data2: this.$store.state.rewardList,
//        对话框
        modal: false,
        money: "",
        textarea: "",
        limit:48,
      }
    },
    beforeMount() {

    },
    mounted() {
      // 获取薪资
//      this.$axios.get(this.$store.state.resetpsd, {
//        params: {
//          name: 'asd'
//        }
//      }).then(res => {
//        this.data1 = res.data.columns1;
//      })
//      //  获取奖惩
//      this.$axios.get(this.$store.state.resetpsd, {
//        params: {
//          name: 'asd'
//        }
//      }).then(res => {
//        this.data2 = res.data.columns2;
//      })
    },
    created: function () {

    },
    methods: {
//      点击补录显示
      show(){
        this.modal = true;
        this.money = "",
          this.textarea = ""
      },
//      字数限制
      limitLength(){
        if(this.textarea.length<=48){
          this.limit=48-this.textarea.length;
        }
      },
      // 点击添加奖惩补录
      add() {
        this.modal = false;
        this.$axios.post(this.$store.state.resetpsd, {
          money: this.money,
          textarea: this.textarea
        }).then(res => {
          this.$Message.success('提交成功');
        })
      },

    }
  }
</script>

