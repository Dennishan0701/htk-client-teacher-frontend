<template>
  <div class="info-edit-main">
    <div class="info-edit-content card">
      <div class="info-edit-detail">
        <div class="info-edit-nav">
          <ul>
            <li v-for="(item,$index) in navList"
                :class="{ active:item.active, success:item.success}">
              <div>
                <div @click="navClick($index)">
                  <i class="icon iconfont" :class="item.icon"></i>
                  <p>{{ item.name }}</p>
                </div>
                <em></em>
              </div>
            </li>
          </ul>
        </div>
        <div class="info-edit-form">
          <div class="info-edit-wrapper" :style="{'transform':'translate3d('+ (-index * 100 + '%') +',0,0)'}">
            <!-- 联系方式 -->
            <div class="info-edit-slider">
              <div class="info-edit-contect">
                <Form ref="formContect" :model="formContect" :rules="ruleContect">
                  <div class="info-edit-left">
                    <FormItem prop="headerUrl">
                      <div class="info-edit-header">
                        <div v-if="formContect.headerUrl!=''">
                          <img :src="formContect.headerUrl">
                        </div>
                        <Input type="text" v-model="formContect.headerUrl" style="display: none"></Input>
                      </div>
                      <Button type="primary" @click="uploadOpen('header',320,320)">上传头像</Button>
                    </FormItem>
                  </div>
                  <div class="info-edit-right">
                    <FormItem label="姓名" prop="name">
                      <Input type="text" v-model="formContect.name"></Input>
                    </FormItem>
                    <FormItem label="性别" prop="gender">
                      <RadioGroup v-model="formContect.gender">
                        <Radio label="1">男</Radio>
                        <Radio label="0">女</Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem label="微信" prop="WeChat">
                      <Input type="text" v-model="formContect.WeChat"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="email">
                      <Input type="text" v-model="formContect.email" class="editEmail"></Input>
                    </FormItem>
                    <FormItem label="QQ" prop="QQ">
                      <Input type="text" v-model="formContect.QQ"></Input>
                    </FormItem>
                    <FormItem label="电话" prop="phone">
                      <Input type="text" v-model="formContect.phone"></Input>
                    </FormItem>
                    <!--<FormItem label="紧急联系人电话" prop="emergencyPhone">-->
                      <!--<Input type="text" v-model="formContect.emergencyPhone"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="紧急联系人关系" prop="relationship">-->
                      <!--<Input type="text" v-model="formContect.relationship"></Input>-->
                    <!--</FormItem>-->
                  </div>
                </Form>
              </div>
            </div>
            <!-- 学历信息 -->
            <div class="info-edit-slider">
              <div class="info-edit-education">
                <Form ref="formEducation" :model="formEducation" :rules="ruleEducation">
                  <FormItem prop="province" label="高考所在地：">
                    <Select v-model="formEducation.province" style="width: 150px;" @on-change="getCity">
                      <Option v-for="(item,index) in provinceList" :value="item.areaCode" :key="index">{{ item.areaName }}</Option>
                    </Select>
                    <span class="eduLabel">省</span>
                  </FormItem>
                  <FormItem prop="city">
                    <Select v-model="formEducation.city" style="width: 150px;" @on-change="getArea">
                      <Option v-for="(item,index) in cityList" :value="item.areaCode" :key="index">{{ item.areaName }}</Option>
                    </Select>
                    <span class="eduLabel">市</span>
                  </FormItem>
                  <FormItem prop="area">
                    <Select v-model="formEducation.area" style="width: 150px;">
                      <Option v-for="(item,index) in areaList" :value="item.areaCode" :key="index">{{ item.areaName }}</Option>
                    </Select>
                    <span class="eduLabel">区</span>
                  </FormItem>
                  <FormItem  label="高考文理科：" prop="science">
                    <RadioGroup v-model="formEducation.science">
                      <Radio label="1">文科</Radio>
                      <Radio label="2">理科</Radio>
                    </RadioGroup>
                  </FormItem>
                  <FormItem  label="在读院校：" prop="school">
                    <Select v-model="formEducation.school" filterable  style="width: 335px;">
                      <Option v-for="(item,index) in schoolList" :value="item.teacherSchoolUuid" :key="index">{{ item.teacherSchoolName }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem  label="学历：" prop="education">
                    <Select v-model="formEducation.education" style="width: 100px;">
                      <Option v-for="(item,index) in educationList" :value="item.name" :key="index">{{ item.title }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem  label="最高学历：" prop="bestEducation">
                    <Select v-model="formEducation.bestEducation">
                      <Option v-for="(item,index) in educationList" :value="item.name" :key="index">{{ item.title }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem  label="年级：" prop="grade">
                    <Select v-model="formEducation.grade">
                      <Option v-for="(item,index) in gradeList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="专业" prop="major">
                    <Input type="text" v-model="formEducation.major" style="width: 440px;" placeholder="最多三十字" :maxlength="30"></Input>
                  </FormItem>
                </Form>
              </div>
            </div>
            <!-- 授课偏好 -->
            <div class="info-edit-slider">
              <div class="info-edit-like">
                <Form ref="formLike" :model="formLike" :rules="ruleLike">
                  <FormItem  label="年级偏好：" prop="likeId" style="width: 100%">
                    <Select v-model="formLike.likeId" style="width: 110px;">
                      <Option v-for="(item,index) in likeList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem  label="第一科目：" prop="firstId">
                    <Select v-model="formLike.firstId">
                      <Option v-for="(item,index) in subjectList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem  label="第二科目：" prop="secondId">
                    <Select v-model="formLike.secondId">
                      <Option v-for="(item,index) in subjectList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem  label="第三科目：" prop="thirdId">
                    <Select v-model="formLike.thirdId">
                      <Option v-for="(item,index) in subjectList" :value="item.value" :key="index">{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                </Form>
              </div>
            </div>
            <!-- 支付信息 -->
            <div class="info-edit-slider">
              <div class="info-edit-pay">
                <Form ref="formPay" :model="formPay" :rules="rulePay">
                  <FormItem label="身份证号" prop="idcard" style="width: 100%">
                    <Input type="text" v-model="formPay.idcard" style="width: 200px;"></Input>
                  </FormItem>
                  <div style="width: 100%;display: flex;">
                    <FormItem prop="idcardUrl1">
                      <div class="idcard1 card">
                        <div class="info-edit-upload" @click="uploadOpen('idcard1',320,196)">
                          <div class="info-edit-upload-tip">
                            <Icon type="plus"></Icon>
                            <p>上传身份证<span>正面</span></p>
                          </div>
                          <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                          <!--<Icon type="plus"></Icon>-->
                          <!--<p>上传身份证<span>正面</span>（支持拖拽）</p>-->
                          <!--</div>-->
                          <!--</Upload>-->
                          <div class="idCard-img" v-show="formPay.idcardUrl1!=''">
                            <img :src="formPay.idcardUrl1">
                            <Input type="text" v-model="formPay.idcardUrl1" style="display: none"></Input>
                            <!--<div class="idCard-close" @click="formPay.idcardUrl1=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                            <!--</div>-->
                          </div>
                        </div>
                      </div>
                    </FormItem>
                    <FormItem prop="idcardUrl2">
                      <div class="idcard2 card">
                        <div class="info-edit-upload" @click="uploadOpen('idcard2',320,196)">
                          <div class="info-edit-upload-tip">
                            <Icon type="plus"></Icon>
                            <p>上传身份证<span>反面</span></p>
                          </div>
                          <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                          <!--<Icon type="plus"></Icon>-->
                          <!--<p>上传身份证<span>反面</span>（支持拖拽）</p>-->
                          <!--</div>-->
                          <!--</Upload>-->
                          <div class="idCard-img" v-show="formPay.idcardUrl2!=''">
                            <img :src="formPay.idcardUrl2">
                            <Input type="text" v-model="formPay.idcardUrl2" style="display: none"></Input>
                            <!--<div class="idCard-close" @click="formPay.idcardUrl2=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                            <!--</div>-->
                          </div>
                        </div>
                      </div>
                    </FormItem>
                  </div>
                  <FormItem label="银行" prop="bank">
                    <Input type="text" :value="'招商银行'" disabled  v-model="formPay.bank"></Input>
                  </FormItem>
                  <FormItem label="银行卡号" prop="bankNum">
                    <Input type="text" v-model="formPay.bankNum" :maxlength="19" style="width: 155px"></Input>
                  </FormItem>
                  <FormItem label="开户行" prop="bankAddress" style="width: 100%">
                    <Input type="text" v-model="formPay.bankAddress" placeholder="最多31个字" :maxlength="31" style="width: 480px;"></Input>
                  </FormItem>
                  <FormItem prop="bankUrl1">
                    <div class="bank1 card">
                      <div class="info-edit-upload" @click="uploadOpen('bank1',320,196)">
                        <div class="info-edit-upload-tip">
                          <Icon type="plus"></Icon>
                          <p>上传银行卡<span>正面</span></p>
                        </div>
                        <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                            <!--<Icon type="plus"></Icon>-->
                            <!--<p>上传银行卡<span>正面</span>（支持拖拽）</p>-->
                          <!--</div>-->
                        <!--</Upload>-->
                        <div class="idCard-img" v-show="formPay.bankUrl1!=''">
                          <img :src="formPay.bankUrl1">
                          <Input type="text" v-model="formPay.bankUrl1" style="display: none"></Input>
                          <!--<div class="idCard-close" @click="formPay.bankUrl1=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem prop="bankUrl2">
                    <div class="bank2 card">
                      <div class="info-edit-upload" @click="uploadOpen('bank2',320,196)">
                        <div class="info-edit-upload-tip">
                          <Icon type="plus"></Icon>
                          <p>上传银行卡<span>反面</span></p>
                        </div>
                        <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                            <!--<Icon type="plus"></Icon>-->
                            <!--<p>上传银行卡<span>反面</span>（支持拖拽）</p>-->
                          <!--</div>-->
                        <!--</Upload>-->
                        <div class="idCard-img" v-show="formPay.bankUrl2!=''">
                          <img :src="formPay.bankUrl2">
                          <Input type="text" v-model="formPay.bankUrl2" style="display: none"></Input>
                          <!--<div class="idCard-close" @click="formPay.bankUrl2=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
            <!-- 入职材料 -->
            <div class="info-edit-slider">
              <div class="info-edit-entry" style="padding: 15px 0">
                <Form ref="formEntry" :model="formEntry" :rules="ruleEntry">
                  <FormItem prop="agreementUrl1">
                    <h3>兼职协议第一页</h3>
                    <div class="agreement1 card">
                      <div class="info-edit-upload" @click="uploadOpen('agreement1',320,446)">
                        <div class="info-edit-upload-tip">
                          <div>
                            <Icon type="plus"></Icon>
                            <b>上传图片</b>
                          </div>
                      </div>
                        <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                            <!--<div>-->
                              <!--<Icon type="plus"></Icon>-->
                              <!--<b>上传图片</b>-->
                            <!--</div>-->
                            <!--<p>（支持拖拽）</p>-->
                          <!--</div>-->
                        <!--</Upload>-->
                        <div class="idCard-img" v-show="formEntry.agreementUrl1!=''">
                          <img :src="formEntry.agreementUrl1">
                          <Input type="text" v-model="formEntry.agreementUrl1" style="display: none"></Input>
                          <!--<div class="idCard-close" @click="formEntry.agreementUrl1=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem prop="agreementUrl2">
                    <h3>兼职协议第二页</h3>
                    <div class="agreement2 card">
                      <div class="info-edit-upload" @click="uploadOpen('agreement2',320,446)">
                        <div class="info-edit-upload-tip">
                          <div>
                            <Icon type="plus"></Icon>
                            <b>上传图片</b>
                          </div>
                        </div>
                        <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                            <!--<div>-->
                              <!--<Icon type="plus"></Icon>-->
                              <!--<b>上传图片</b>-->
                            <!--</div>-->
                            <!--<p>（支持拖拽）</p>-->
                          <!--</div>-->
                        <!--</Upload>-->
                        <div class="idCard-img" v-show="formEntry.agreementUrl2!=''">
                          <img :src="formEntry.agreementUrl2">
                          <Input type="text" v-model="formEntry.agreementUrl2" style="display: none"></Input>
                          <!--<div class="idCard-close" @click="formEntry.agreementUrl2=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem prop="registerUrl">
                    <h3>信息登记表</h3>
                    <div class="register card">
                      <div class="info-edit-upload" @click="uploadOpen('register',320,446)">
                        <div class="info-edit-upload-tip">
                          <div>
                            <Icon type="plus"></Icon>
                            <b>上传图片</b>
                          </div>
                        </div>
                        <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                            <!--<div>-->
                              <!--<Icon type="plus"></Icon>-->
                              <!--<b>上传图片</b>-->
                            <!--</div>-->
                            <!--<p>（支持拖拽）</p>-->
                          <!--</div>-->
                        <!--</Upload>-->
                        <div class="idCard-img" v-show="formEntry.registerUrl!=''">
                          <img :src="formEntry.registerUrl">
                          <Input type="text" v-model="formEntry.registerUrl" style="display: none"></Input>
                          <!--<div class="idCard-close" @click="formEntry.registerUrl=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem prop="studentCardUrl">
                    <h3>学生证</h3>
                    <div class="studentCard card">
                      <div class="info-edit-upload" @click="uploadOpen('studentCard',320,446)">
                        <div class="info-edit-upload-tip">
                          <div>
                            <Icon type="plus"></Icon>
                            <b>上传图片</b>
                          </div>
                        </div>
                        <!--<Upload-->
                          <!--type="drag"-->
                          <!--action=""-->
                          <!--:show-upload-list="false"-->
                          <!--:on-success="uploadImg">-->
                          <!--<div class="info-edit-upload-tip">-->
                            <!--<div>-->
                              <!--<Icon type="plus"></Icon>-->
                              <!--<b>上传图片</b>-->
                            <!--</div>-->
                            <!--<p>（支持拖拽）</p>-->
                          <!--</div>-->
                        <!--</Upload>-->
                        <div class="idCard-img" v-show="formEntry.studentCardUrl!=''">
                          <img :src="formEntry.studentCardUrl">
                          <Input type="text" v-model="formEntry.studentCardUrl" style="display: none"></Input>
                          <!--<div class="idCard-close" @click="formEntry.studentCardUrl=''">-->
                            <!--<Icon type="close-round"></Icon>-->
                          <!--</div>-->
                        </div>
                      </div>
                    </div>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传图片 -->
    <Modal v-model="uploadShow" width="360" class-name="vertical-center-modal" :mask-closable="false">
      <p slot="header">
        <span>{{ headerText }}</span>
      </p>
      <p slot="close">
        <!--<img src="../../../assets/images/close2.png" alt="关闭">-->
        <Icon type="close-round"></Icon>
      </p>
      <div class="uploadImgMain" :style="{'height':cHeight+'px'}">
        <croppa
          v-if="uploadShow"
          v-model="croppa"
          :width="cWidth"
          :height="cHeight"
          placeholder="支持拖拽上传，可移动、裁剪、放大缩小。">
        </croppa>
      </div>
      <div slot="footer">
        <Button type="primary" @click="uploadCroppedImage(imgType)">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import RULE from '@/common/js/infoRule';
  const device = sessionStorage.getItem('device');

  export default {
    data () {
      return {
        navList:[
          {name:'联系方式',icon:'icon-lianxi',active:true,success:false,type:'formContect'},
          {name:'学历信息',icon:'icon-xueli1',active:false,success:false,type:'formEducation'},
          {name:'授课偏好',icon:'icon-class',active:false,success:false,type:'formLike'},
          {name:'支付信息',icon:'icon-zhifufangshi',active:false,success:false,type:'formPay'},
          {name:'入职材料',icon:'icon-yuangongruzhi',active:false,success:false,type:'formEntry'},
        ],
        index:0,
        device:device,
        croppa: {},
        headerText:'', //对话框头部文字
        imgType:'', //上传图片类型
        cWidth:320,  //上传图片宽
        cHeight:320, //上传图片高
        infoData:'',
        infoUrl:this.$store.state.info,
        getProvinceUrl:this.$store.state.getAllProvince,
        getCityUrl:this.$store.state.getCity,
        getAreaUrl:this.$store.state.getArea,
        getSchoolUrl:this.$store.state.getSchool,
        getGradeUrl:this.$store.state.getGrade,
        getSubjectUrl:this.$store.state.getSubject,
        getGradePreferenceUrl:this.$store.state.getGradePreference,
        infoSaveUrl:this.$store.state.infoSave,
        uploadFileUrl:this.$store.state.infoUploadFile,
        uploadShow:false, //上传头像弹窗
        provinceList:[], //省列表
        cityList:[], //市列表
        areaList:[], //区列表
        schoolList:[], //学校列表
        educationList:[
          {name:1,title:'本科'},
          {name:2,title:'研究生'},
          {name:3,title:'博士'},
        ], //学校列表
        gradeList:[], //学校列表
        likeList:[], //年级列表
        subjectList:[], //学科列表
        formContect:{  //联系方式数据
          name: '',
          gender:'',
          WeChat:'',
          email:'',
          QQ:'',
          phone:'',
//          emergencyPhone:'',
//          relationship:'',
          headerUrl:'',
          headerFileName:'',
        },
        ruleContect: { //联系方式规则
          name: [
            { required: true,validator: RULE().validateName, trigger: 'blur' }
          ],
          gender: [
            { required: true,message: '请选择', validator: RULE().validateGender, trigger: 'change' }
          ],
          WeChat: [
            { required: true,validator: RULE().validateWeChat, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱有误', trigger: 'blur' }
          ],
          QQ: [
            { required: true,validator: RULE().validateQQ, trigger: 'blur' },
          ],
          phone: [
            { required: true,validator: RULE().validatePhone, trigger: 'blur' },
          ],
//          emergencyPhone: [
//            { required: true,validator: RULE().validateEmergencyPhone, trigger: 'blur' },
//          ],
//          relationship: [
//            { required: true,validator: RULE().validateRelationship, trigger: 'blur' },
//          ],
          headerUrl: [
            { required: true,validator: RULE().validateHeaderUrl },
          ],
        },
        formEducation:{ //学历数据
          province:null,
          city:null,
          area:null,
          science:null,
          school:null,
          education:null,
          bestEducation:null,
          grade:null,
          major:'',
        },
        ruleEducation:{ //学历规则
          province: [
            { required: true, message: '请选择', validator: RULE().validateHeaderUrl, trigger: 'change' }
          ],
          city: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          area: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          science: [
            { required: true, message: '请选择', validator: RULE().validateScience, trigger: 'change' }
          ],
          school: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          education: [
            { required: true, message: '请选择', validator: RULE().validateEducation, trigger: 'change' }
          ],
          bestEducation: [
            { required: true, message: '请选择', validator: RULE().validateBestEducation, trigger: 'change' }
          ],
          grade: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          major: [
            { required: true, validator: RULE().validateMajor, trigger: 'blur' },
          ],
        },
        formLike:{ //偏好数据
          likeId:null,
          firstId:null,
          secondId:null,
          thirdId:null,
        },
        ruleLike:{ //偏好规则
          likeId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          firstId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          secondId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          thirdId: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
        },
        formPay:{ //支付数据
          idcard:'',
          idcardUrl1:'',
          idcardUrl2:'',
          bank:'招商银行',
          bankNum:'',
          bankAddress:'',
          bankUrl1:'',
          bankUrl2:'',
          idcardFileName1:'',
          idcardFileName2:'',
          bankFileName1:'',
          bankFileName2:'',
        },
        rulePay:{ //支付规则
          idcard: [
            { required: true, validator: RULE().validateIdcard, trigger: 'blur' },
          ],
          idcardUrl1: [
            { required: true, validator: RULE().validateIdcardUrl1 },
          ],
          idcardUrl2: [
            { required: true, validator: RULE().validateIdcardUrl2 },
          ],
          bank: [
            { required: true, },
          ],
          bankNum:[
            { required: true, validator: RULE().validateBankNum, trigger: 'blur' },
          ],
          bankAddress:[
            { required: true, validator: RULE().validateBankAddress, trigger: 'blur' },
          ],
          bankUrl1: [
            { required: true, validator: RULE().validateBankUrl1 },
          ],
          bankUrl2: [
            { required: true, validator: RULE().validateBankUrl2 },
          ],
        },
        formEntry:{ //入职数据
          agreementUrl1:'',
          agreementUrl2:'',
          registerUrl:'',
          studentCardUrl:'',
          agreementFileName1:'',
          agreementFileName2:'',
          registerFileName:'',
          studentCardFileName:'',
        },
        ruleEntry:{ //入职规则
          agreementUrl1: [
            { required: true, validator: RULE().validateAgreementUrl1 },
          ],
          agreementUrl2: [
            { required: true, validator: RULE().validateAgreementUrl2 },
          ],
          registerUrl: [
            { required: true, validator: RULE().validateRegisterUrl },
          ],
          studentCardUrl: [
            { required: true, validator: RULE().validateStudentCardUrl },
          ],
        },
      }
    },
    mounted () {
      this.getInfo();
      this.getProvince();
      this.getSchool();
      this.getGrade();
      this.getSubject();
      this.getGradePreference();
    },
    watch:{
      next (curVal,oldVal) {
        this.navClick(this.index+1);
      }
    },
    methods: {
      navClick(index){  //导航切换
        if(index == 0) { //如果是第一层
          this.index = index;  //当前进度
          this.$emit('buttonSave',false);
          for(let i = 0;i<this.navList.length;i++){
            this.navList[i].active = false;
            if(i<index){
              this.navList[i].success = true;
            } else {
              this.navList[i].success = false;
            }
          }
          this.navList[index].active = true;
        } else {
          let num = 0; //完善个数
          for(let j =0;j<index;j++) {
            let name = this.navList[j].type;
            this.$refs[name].validate((valid) => {
              if (valid) {
                num++;
                if (num == index) { //点选表单之前全部完善
                  this.index = index;  //当前进度
                  for(let i = 0;i<this.navList.length;i++){
                    this.navList[i].active = false;
                    if(i<index){
                      this.navList[i].success = true;
                    } else {
                      this.navList[i].success = false;
                    }
                  }
                  this.navList[index].active = true;

                  if(index == 4) { //保存or下一步
                    this.$emit('buttonSave',true);
                    this.$emit('saveFn',this.saveInfo);
                  } else {
                    this.$emit('buttonSave',false);
                  }
                }

              } else {
                this.$Message.destroy()
                this.$Message.error('请完善表单!');
              }
            })
          }
        }

      },
      uploadCroppedImage(type) {  //图片裁剪上传
        this.croppa.generateBlob((blob) => {
          if(blob == null) {
            this.$Message.error('请选择图片');
          } else {
            let fileName = this.croppa.getChosenFile().name;
            let fd = new FormData();
            fd.append('file', blob)
            this.$axios.post(this.uploadFileUrl,fd).then( res => {
              let imgUrl = res.data.data;
              this.uploadShow = false;
              this.imgPush(type,imgUrl,fileName);
            })
          }
        })

      },
      imgPush(type,imgUrl,fileName) {
        if(type == 'header') { //头像
          this.formContect.headerUrl = imgUrl;
          this.formContect.headerFileName = fileName;
        } else if(type == 'idcard1') { //身份证正面
          this.formPay.idcardUrl1 = imgUrl;
          this.formPay.idcardFileName1 = fileName;
        } else if(type == 'idcard2') { //身份证反面
          this.formPay.idcardUrl2 = imgUrl;
          this.formPay.idcardFileName2 = fileName;
        } else if(type == 'bank1') {  //银行卡正面
          this.formPay.bankUrl1 = imgUrl;
          this.formPay.bankFileName1 = fileName;
        } else if(type == 'bank2') {  //银行卡反面
          this.formPay.bankUrl2 = imgUrl;
          this.formPay.bankFileName2 = fileName;
        } else if(type == 'agreement1') {  //兼职协议第一页
          this.formEntry.agreementUrl1 = imgUrl;
          this.formEntry.agreementFileName1 = fileName;
        } else if(type == 'agreement2') { //兼职协议第二页
          this.formEntry.agreementUrl2 = imgUrl;
          this.formEntry.agreementFileName2 = fileName;
        } else if(type == 'register') {  //信息登记表
          this.formEntry.registerUrl = imgUrl;
          this.formEntry.registerFileName = fileName;
        } else if(type == 'studentCard') {  //学生证
          this.formEntry.studentCardUrl = imgUrl;
          this.formEntry.studentCardFileName = fileName;
        }
      },
      getInfo () {  //获取个人信息
        this.$axios.get(this.infoUrl)
          .then( res => {
            let infoData =  res.data.data;
            let imgList = infoData.teacherFileList;
            let headerUrl,idcardUrl1,idcardUrl2,bankUrl1,bankUrl2,
              agreementUrl1,agreementUrl2,registerUrl,studentCardUrl,
              headerFileName,idcardFileName1,idcardFileName2,
              bankFileName1,bankFileName2,agreementFileName1,
              agreementFileName2,registerFileName,studentCardFileName;
            for(let i of imgList) {
              if(i.purpose == 1) { //头像
                headerUrl = i.fileAddress;
                headerFileName = i.fileOriginalName;
              } else if(i.purpose == 2) { //身份证正面
                idcardUrl1 = i.fileAddress
                idcardFileName1 = i.fileOriginalName;
              } else if(i.purpose == 3) { //身份证反面
                idcardUrl2 = i.fileAddress;
                idcardFileName2 = i.fileOriginalName;
              } else if(i.purpose == 4) { //银行卡正面
                bankUrl1 = i.fileAddress;
                bankFileName1 = i.fileOriginalName;
              } else if(i.purpose == 5) { //银行卡反面
                bankUrl2 = i.fileAddress;
                bankFileName2 = i.fileOriginalName;
              } else if(i.purpose == 6) { //兼职协议第一页
                agreementUrl1 = i.fileAddress
                agreementFileName1 = i.fileOriginalName;
              } else if(i.purpose == 7) { //兼职协议第二页
                agreementUrl2 = i.fileAddress;
                agreementFileName2 = i.fileOriginalName;
              } else if(i.purpose == 8) { //信息登记表
                registerUrl = i.fileAddress;
                registerFileName = i.fileOriginalName;
              } else if(i.purpose == 9) { //学生证
                studentCardUrl = i.fileAddress;
                studentCardFileName = i.fileOriginalName;
              }
            }
            this.infoData = infoData;
            this.formContect = { //联系人信息
              name:infoData.teacherName || '',
              gender:infoData.sex,
              WeChat:infoData.wechat || '',
              email:infoData.email || '',
              QQ:infoData.qq || '',
              phone:infoData.phone || '',
//              emergencyPhone:infoData.emergencyPhone || '',
//              relationship:infoData.emergencyRelation || '',
              headerUrl:headerUrl || '',
              headerFileName:headerFileName || '',
            };
            this.formEducation = { //学历数据
              province:infoData.provinceCode,
              city:infoData.cityCode,
              area:infoData.districtCode,
              science:infoData.artsOrScience,
              school:infoData.teacherSchoolUuid,
              education:infoData.education,
              bestEducation:infoData.highestEducation,
              major:infoData.major || '',
              grade:infoData.grade,
            };
            this.formLike = { //偏好数据
              likeId:infoData.gradePreferenceValue,
              firstId:infoData.teachingSubjectUuid,
              secondId:infoData.secondSubjectUuid,
              thirdId:infoData.thirdSubjectUuid,
            };
            this.formPay = { //支付数据
              idcard:infoData.idNumber || '',
              idcardUrl1:idcardUrl1 || '',
              idcardUrl2:idcardUrl2 || '',
              bank:'招商银行',
              bankNum:infoData.cardNumber || '',
              bankAddress:infoData.bankAddress || '',
              bankUrl1:bankUrl1 || '',
              bankUrl2:bankUrl2 || '',
              idcardFileName1:idcardFileName1 || '',
              idcardFileName2:idcardFileName2 || '',
              bankFileName1:bankFileName1 || '',
              bankFileName2:bankFileName2 || '',
            };
            this.formEntry = { //入职数据
              agreementUrl1:agreementUrl1 || '',
              agreementUrl2:agreementUrl2 || '',
              registerUrl:registerUrl || '',
              studentCardUrl:studentCardUrl || '',
              agreementFileName1:agreementFileName1 || '',
              agreementFileName2:agreementFileName2 || '',
              registerFileName:registerFileName || '',
              studentCardFileName:studentCardFileName || '',
            };
          })
      },
      uploadOpen (type,width,height) {  //打开上传窗口

        if(device == 'mac') {
          let args = `{"requesttype":25,"data" : {"type": "${type}" }}`;
          sendData(args);
        } else {
          this.uploadShow = true;
          this.imgType = type;
          this.cWidth = width;
          this.cHeight = height;
          if(type == 'header') {
            this.headerText = '上传头像';
          } else if(type == 'idcard1') {
            this.headerText = '上传身份证正面';
          } else if(type == 'idcard2') {
            this.headerText = '上传身份证反面';
          } else if(type == 'bank1') {
            this.headerText = '上传银行卡正面';
          } else if(type == 'bank2') {
            this.headerText = '上传银行卡反面';
          } else if(type == 'agreement1') {
            this.headerText = '上传兼职协议第一页';
          } else if(type == 'agreement2') {
            this.headerText = '上传兼职协议第二页';
          } else if(type == 'register') {
            this.headerText = '上传信息登记表';
          } else if(type == 'studentCard') {
            this.headerText = '上传学生证';
          }
        }

      },
      getProvince (value) { //获取省
        if(value != ""){
           this.$axios.get(this.getProvinceUrl,{
             loading: false,
           })
            .then( res => {
              this.provinceList = res.data.data;
            })
        }
      },
      getCity (value) { //获取市
        if(value !== null){
          this.$axios.get(this.getCityUrl,{
            params:{
              provinceCode : value,
            },
            loading: false,
          }).then( res => {
            this.cityList = res.data.data;
          })
        }
      },
      getArea (value) { //获取区
        if(value !== null){
          this.$axios.get(this.getAreaUrl,{
            params:{
              cityCode : value,
            },
            loading: false,
          }).then( res => {
            this.areaList = res.data.data;
          })
        }

      },
      getSchool () { //获取学校
        this.$axios.get(this.getSchoolUrl).then( res => {
          this.schoolList = res.data.data;
        })
      },
      getGrade () { //获取年级
        this.$axios.get(this.getGradeUrl).then( res => {
          this.gradeList = res.data.data;
        })
      },
      getGradePreference () { //获取年级
        this.$axios.get(this.getGradePreferenceUrl).then( res => {
          this.likeList = res.data.data;
        })
      },
      getSubject () { //获取年级
        this.$axios.get(this.getSubjectUrl).then( res => {
          this.subjectList = res.data.data;
        })
      },
      saveInfo () {
        this.$axios.post(this.infoSaveUrl,{
          teacherName: this.formContect.name,
          sex: this.formContect.gender,
          phone: this.formContect.phone,
          wechat: this.formContect.WeChat,
          qq: this.formContect.QQ,
          email: this.formContect.email,
//          emergencyPhone: this.formContect.emergencyPhone,
//          emergencyRelation: this.formContect.relationship,
          provinceCode: this.formEducation.province,
          cityCode: this.formEducation.city,
          districtCode: this.formEducation.area,
          artsOrScience: this.formEducation.science,
          teacherSchoolUuid: this.formEducation.school,
          education: this.formEducation.education,
          highestEducation: this.formEducation.bestEducation,
          major: this.formEducation.major,
          grade: this.formEducation.grade,
          gradePreferenceValue: this.formLike.likeId,
          teachingSubjectUuid: this.formLike.firstId,
          secondSubjectUuid: this.formLike.secondId,
          thirdSubjectUuid: this.formLike.thirdId,
          idNumber: this.formPay.idcard,
          cardNumber: this.formPay.bankNum,
          bankAddress: this.formPay.bankAddress,
          teacherFileList:[
            {
              purpose:1,
              fileAddress:this.formContect.headerUrl,
              fileOriginalName:this.formContect.headerFileName,
            },
            {
              purpose:2,
              fileAddress:this.formPay.idcardUrl1,
              fileOriginalName:this.formPay.idcardFileName1,
            },
            {
              purpose:3,
              fileAddress:this.formPay.idcardUrl2,
              fileOriginalName:this.formPay.idcardFileName2,
            },
            {
              purpose:4,
              fileAddress:this.formPay.bankUrl1,
              fileOriginalName:this.formPay.bankFileName1,
            },
            {
              purpose:5,
              fileAddress:this.formPay.bankUrl2,
              fileOriginalName:this.formPay.bankFileName2,
            },
            {
              purpose:6,
              fileAddress:this.formEntry.agreementUrl1,
              fileOriginalName:this.formEntry.agreementFileName1,
            },
            {
              purpose:7,
              fileAddress:this.formEntry.agreementUrl2,
              fileOriginalName:this.formEntry.agreementFileName2,
            },
            {
              purpose:8,
              fileAddress:this.formEntry.registerUrl,
              fileOriginalName:this.formEntry.registerFileName,
            },
            {
              purpose:9,
              fileAddress:this.formEntry.studentCardUrl,
              fileOriginalName:this.formEntry.studentCardFileName,
            },
          ]
        }).then( res => {
          this.$Message.success('保存成功!');
          this.$emit('goRead',true)
        })
      },
    },
    props:["next"],
  }
</script>


