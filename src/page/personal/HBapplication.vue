<template>
  <div class="hb-content">
    <div class="hbHeader commonTitle">
      <div class="crHeader commonTitleMain">
        <h2>手写板申请</h2>
      </div>
    </div>
    <div class="hbContainer">
      <div>
        <!--注意事项-->
        <div class="remindTips">
          <p>注意事项</p>
          <p>1、所有老师至少上过一节正式课后，方能申请手写板;</br>
            2、请老师仔细填写信息，为避免工作人员遗漏信息，一旦提交，不能在线修改，如有任何问题，请垂询掌门小管家;</br>
            3、手写板发货后将暂时扣除老师200元押金，老师自申请之日起累计上满40小时正式课，将以补贴形式返回押金;</p>
        </div>
        <!--填写邮件信息（未预约）-->
        <div class="mailInfo" v-if="teacherInfo.isOrder!==0">
          <p>填写邮件信息</p>
          <p><span>姓名：</span>{{teacherInfo.teacherName }}</p>
          <p><span>电话：</span>{{teacherInfo.phone}}</p>
          <Form ref="mailInfo" :model="mailInfo" :rules="ruleMail" label-position="left">
            <!--<FormItem prop="tcName" class="tcName" label="姓名：">-->
            <!--<Input v-model="mailInfo.tcName" class="input1" style="width: 202px;"></Input>-->
            <!--</FormItem>-->
            <!--<FormItem prop="phone" class="phone" label="电话：">-->
            <!--<Input v-model="mailInfo.phone" class="input1" style="width: 202px;"></Input>-->
            <!--</FormItem>-->
            <FormItem prop="provinceCode" label="邮寄地址：" class="province"
                      style="width: 260px;margin: 0;display: inline-block;">
              <Select v-model="mailInfo.provinceCode" style="width: 157px;margin-left:17px;" @on-change="getCity">
                <Option v-for="(item,index) in provinceList" :value="item.areaCode" :key="index">{{ item.areaName }}
                </Option>
              </Select>
              <span class="eduLabel">省</span>
            </FormItem>
            <FormItem prop="cityCode" class="cityCode" style="width: 185px;margin-left:17px;display: inline-block;">
              <Select v-model="mailInfo.cityCode" style="width: 168px;" @on-change="getArea">
                <Option v-for="(item,index) in cityList" :value="item.areaCode" :key="index">{{ item.areaName }}
                </Option>
              </Select>
              <span class="eduLabel">市</span>
            </FormItem>
            <FormItem prop="districtCode" class="area" style="width:252px;margin-left:17px;display: inline-block;">
              <Select v-model="mailInfo.districtCode" style="width:234px;">
                <Option v-for="(item,index) in areaList" :value="item.areaCode" :key="index">{{ item.areaName }}
                </Option>
              </Select>
              <span class="eduLabel">区</span>
            </FormItem>
            <FormItem class="postAddress" prop="postAddress">
              <Input v-model="mailInfo.postAddress" class="input1" placeholder="详细街道"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('mailInfo')">预约</Button>
            </FormItem>
          </Form>
        </div>
        <!--填写邮件信息（已预约）-->
        <div class="mailInfo" v-else>
          <p>填写邮件信息</p>
          <p><span>姓名：</span>{{teacherInfo.teacherName}}</p>
          <p><span>电话：</span>{{teacherInfo.phone}}</p>
          <p><span>邮寄地址：</span>{{teacherInfo.province}}{{teacherInfo.city}}{{teacherInfo.district}}{{teacherInfo.postAddress}}</p>
          <p class="hasOrder">已预约</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import '../../style/HBapplication.less';
</style>

<script>
  import RULE from '@/common/js/infoRule';

  export default {
    data() {
      return {
        getProvinceUrl: this.$store.state.getAllProvince,
        getCityUrl: this.$store.state.getCity,
        getAreaUrl: this.$store.state.getArea,
        getTabletApplicationUrl:this.$store.state.getTabletApplication,
        saveTabletPostInfo:this.$store.state.saveTabletPostInfo,
        provinceList: [], //省列表
        cityList: [], //市列表
        areaList: [], //区列表
        teacherInfo:[],
        mailInfo: {
//          tcName: '',
//          phone: '',
          provinceCode: "",
          cityCode: "",
          districtCode: "",
          postAddress: ""
        },
        ruleMail: { //邮寄规则
//          tcName: [
//            {validator: RULE().validateName, trigger: 'blur'}
//          ],
//          phone: [
//            {validator: RULE().validatePhone, trigger: 'blur'},
//          ],
          provinceCode: [
            {validator: RULE().validateGender, trigger: 'change'}
          ],
          cityCode: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          districtCode: [
            {required: true, message: '请选择', trigger: 'change'}
          ],
          postAddress: [
            {validator: RULE().validateAddress, trigger: 'blur'}
          ],
        }
      }
    },
    beforeMount() {

    },
    mounted() {
      this.getTabletApplication();
      this.getProvince()
    },
    created: function () {

    },
    methods: {
      getTabletApplication(){
        this.$axios.get(this.getTabletApplicationUrl).then( res => {
          this.teacherInfo = res.data.data;
//          this.mailInfo.tcName=this.teacherInfo.teacherName;
//          this.mailInfo.phone=this.teacherInfo.phone;
          if(this.teacherInfo.isOrder==0){
            this.getProvince();
          }
        })
      },
      getProvince() { //获取省
        this.$axios.get(this.getProvinceUrl,{
          loading:false
        })
          .then(res => {
            this.provinceList = res.data.data;
          })
      },
      getCity(value) { //获取市
        if(value != ""){
          this.$axios.get(this.getCityUrl, {
            params: {
              provinceCode: value,
            },
            loading:false,
          }).then(res => {
            this.cityList = res.data.data;
          })
        }
      },
      getArea(value) { //获取区
        if(value != ""){
          this.$axios.get(this.getAreaUrl, {
            params: {
              cityCode: value,
            },
            loading:false,
          }).then(res => {
            this.areaList = res.data.data;
          })
        }
      },
      //  提交申请手写板信息
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios.post(this.saveTabletPostInfo, this.mailInfo).then( res => {
              this.$Message.info('您已预约成功!');
              this.getTabletApplication();
            })

          }
          else {
             this.$Message.error('请完善表单！');
          }
        })
      },
    }
  }
</script>

