<template>
  <div class="info-read-main">
    <div class="info-read-content card">
      <div class="info-left card">
        <div class="info-left-main">
          <div class="info-left-top">
            <div class="info-header">
              <div
                :style="headerBackground"
                v-if="headerUrl!=''">
              </div>
            </div>
            <div class="info-name">
              <span>{{ infoData.teacherName }}</span>
              <i class="icon iconfont icon-nvsheng" v-if="infoData.sex == 1"></i>
              <i class="icon iconfont icon-nan" v-else-if="infoData.sex == 0"></i>
            </div>
            <div class="info-phone">
              <p>{{ infoData.phone }}</p>
            </div>
          </div>
          <div class="info-left-bottom">
            <Button @click="changePsw">修改密码</Button>
          </div>
        </div>
      </div>
      <div class="info-right">
        <div class="info-right-main">
          <div class="info-item">
            <div class="info-item-title">
              <h2>联系方式</h2>
            </div>
            <div class="info-item-detail">
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>微信：{{ infoData.wechat || "无" }}</td>
                  <td>邮箱：{{ infoData.email || "无" }}</td>
                  <td>QQ：{{ infoData.qq || "无" }}</td>
                </tr>
                <!--<tr>-->
                  <!--<td>紧急联系人：{{ infoData.emergencyPhone || "无" }}</td>-->
                  <!--<td>紧急联系人关系：{{ infoData.emergencyRelation || "无" }}</td>-->
                <!--</tr>-->
              </table>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-title">
              <h2>学历信息</h2>
            </div>
            <div class="info-item-detail">
              <table cellspacing="0" cellpadding="0" border="0" style="table-layout: fixed;">
                <colgroup>
                  <col width="40%">
                  <col>
                  <col>
                </colgroup>
                <tr>
                  <td>高考所在地：{{ infoData.examLocation || "无" }}</td>
                  <td>文理科：{{ infoData.artsOrScience || "无" | science }}</td>
                </tr>
                <tr>
                  <td>在读院校：{{ infoData.teacherSchoolName || "无" }}</td>
                  <td>学历：{{ infoData.education || "无" | education }}</td>
                  <td>最高学历：{{ infoData.highestEducation || "无" | education }}</td>
                </tr>
                <tr>
                  <td>专业：{{ infoData.major || "无" }}</td>
                  <td>年级：{{ infoData.grade || "无" }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-title">
              <h2>授课偏好</h2>
            </div>
            <div class="info-item-detail">
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>年级偏好：{{ infoData.gradePreferenceName || "无" }}</td>
                  <td>第一科目：{{ infoData.teachingSubject || "无" }}</td>
                  <td>第二科目：{{ infoData.secondSubject || "无" }}</td>
                  <td>第三科目：{{ infoData.thirdSubject || "无" }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-title">
              <h2>支付信息</h2>
              <Switch v-model="switchPay" size="small"></Switch>
            </div>
            <div class="info-item-detail" :class="{'filter':!switchPay}">
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>身份证号码：{{ replace(infoData.idNumber,3,14) || "无" }}</td>
                </tr>
              </table>
              <div class="info-item-pic">
                <div class="info-item-img1">
                  <img :src="IdCardUrl1" v-if="IdCardUrl1!=''">
                </div>
                <div class="info-item-img1">
                  <img :src="IdCardUrl2" v-if="IdCardUrl2!=''">
                </div>
              </div>
              <table cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>银行：工商银行</td>
                  <td>银行卡号：{{ replace(infoData.cardNumber,5,14) || "无" }}</td>
                  <td>开户行：{{ infoData.bankAddress || "无" }}</td>
                </tr>
              </table>
              <div class="info-item-pic">
                <div class="info-item-img1">
                  <img :src="bankUrl1" v-if="bankUrl1!=''">
                </div>
                <div class="info-item-img1">
                  <img :src="bankUrl2" v-if="bankUrl2!=''">
                </div>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item-title">
              <h2>入职材料</h2>
              <Switch v-model="switchData" size="small"></Switch>
            </div>
            <div class="info-item-detail" :class="{'filter':!switchData}">
              <div class="info-item-paper">
                <div class="info-item-img2">
                  <p>兼职协议第一页</p>
                  <div>
                    <img :src="agreementUrl1" v-if="agreementUrl1!=''">
                  </div>
                </div>
                <div class="info-item-img2">
                  <p>兼职协议第二页</p>
                  <div>
                    <img :src="agreementUrl2" v-if="agreementUrl2!=''">
                  </div>
                </div>
                <div class="info-item-img2">
                  <p>信息登记表</p>
                  <div>
                    <img :src="registerUrl" v-if="registerUrl!=''">
                  </div>
                </div>
                <div class="info-item-img2">
                  <p>学生证</p>
                  <div>
                    <img :src="studentCardUrl" v-if="studentCardUrl!=''">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="tipWindow" width="460" class="infoTipWindow" :mask-closable="false">
      <p slot="header">
        <span>个人信息填写说明</span>
      </p>
      <p slot="close" @click="$router.go(-1)">
        <Icon type="close-round"></Icon>
      </p>
      <div class="infoMoudel">
        <p>由于系统检测您未在客户端填写过个人信息，
          <br>为了不影响您的<span class="orange">工资发放</span>和<span class="orange">等级评定</span>，请尽快填写完善个人信息。</p>
        <div class="rule">
          <p>个人信息完善需<span class="orange">一次性完成</span>，需准备以下材料，
            <br>如材料未准备齐全，可点击“返回”返回上一级界面。</p>
          <ul>
            <li>1.高清身份证正反面照片。</li>
            <li>2.高清银行卡正反面照片。</li>
            <li>3.银行卡开户行。</li>
            <li>4.兼职协议第一、二页高清照片（全职教师可没有）</li>
            <li>5.学生证、教师资格证高清照片（不是学生可没有）</li>
          </ul>
        </div>
        <p><span class="orange">*</span>信息一旦填写，<span class="orange">无法在此客户端更改</span>，请认真填写确保信息准确。</p>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-right: 30px;" @click="chageType">开始填写</Button>
        <Button type="primary" @click="$router.go(-1)">返回</Button>
      </div>
    </Modal>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        switchPay:false,
        switchData:false,
        tipWindow:false,
        infoUrl:this.$store.state.info,
        infoData:'',
        headerUrl:'',
        IdCardUrl1:'',
        IdCardUrl2:'',
        bankUrl1:'',
        bankUrl2:'',
        agreementUrl1:'',
        agreementUrl2:'',
        registerUrl:'',
        studentCardUrl:'',
      }
    },
    mounted () {
      this.getInfo()
    },
    computed: {
      headerBackground () {
        return this.headerUrl?`background:#fff url(${this.headerUrl}) center / cover no-repeat;`:'';
      },
    },
    methods: {
      replace(data,start,end) {
        if(data == null) {
          return '';
        } else {
          if(!this.switchPay){
            let r = data.substring(start,end);
            return data.replace(r,'***********');
          } else {
            return data;
          }
        }

      },
      chageType () {
        this.tipWindow = false;
        this.$emit('changeType',false);
      },
      getInfo () {
        this.$axios.get(this.infoUrl)
          .then( ({ data }) => {
            this.infoData = data.data;
//            if(this.infoData.completeFlag){
//              this.tipWindow = false;
//            } else {
//              this.tipWindow = true;
//            }


            let imgList = this.infoData.teacherFileList;
            for(let i of imgList) {
              if(i.purpose == 1) { //头像
                this.headerUrl = i.fileAddress || '';
              } else if(i.purpose == 2) { //身份证正面
                this.IdCardUrl1 = i.fileAddress
              } else if(i.purpose == 3) { //身份证反面
                this.IdCardUrl2 = i.fileAddress
              } else if(i.purpose == 4) { //银行卡正面
                this.bankUrl1 = i.fileAddress
              } else if(i.purpose == 5) { //银行卡反面
                this.bankUrl2 = i.fileAddress
              } else if(i.purpose == 6) { //兼职协议第一页
                this.agreementUrl1 = i.fileAddress
              } else if(i.purpose == 7) { //兼职协议第二页
                this.agreementUrl2 = i.fileAddress
              } else if(i.purpose == 8) { //信息登记表
                this.registerUrl = i.fileAddress
              } else if(i.purpose == 9) { //学生证
                this.studentCardUrl = i.fileAddress
              }
            }
          })
      },
      changePsw(){
        this.$store.commit("CHANGE_PASSWORD","true");
      },
    },
    filters:{
      science (val) {
        if(val == 1){
          return '文科'
        } else if(val == 2){
          return '理科'
        }
      },
      education (val) {
        if(val == 1){
          return '本科'
        } else if(val == 2){
          return '研究生'
        }
      },
    },
    components:{

    }
  }
</script>


