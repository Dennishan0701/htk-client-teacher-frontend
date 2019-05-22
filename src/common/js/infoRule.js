export default function RULE() {
  const ChineseREG =/^[\u4e00-\u9fa5]{0,}$/; //非中文
  const numberREG =/^[0-9]*$/; //数字
  const bankNumREG =/^[0-9]*\d{19}$/; //19位数字
  const phoneREG = /^1\d{10}$/; //手机
  const idcardREG =/(^\d{15}$)|(^\d{17}(\d|X|x)$)/; //身份证
  const nameREG = /^[\u4e00-\u9fa5]{0,}$|^[A-Za-z]+$/; //中文或英文
  const QQREG = /[1-9][0-9]{4,}/; //qq
  const wechatREG = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}|^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)|^1[3|4|5|7|8|9]\d{9}$/; //微信
  const address=/^[A-Za-z0-9\u4e00-\u9fa5]+$/;//验证地址（数字，字母，汉字）
  return {
    validateHeaderUrl: (rule, value, callback) => {   //头像
      if (value === '') {
        callback(new Error('请上传头像'));
      } else {
        callback();
      }
    },
    validateName: (rule, value, callback) => {   //姓名
      if (value === '') {
        callback(new Error('姓名不能为空'));
      } else if (!nameREG.test(value)) {
        callback(new Error('请输入中文或英文'));
      } else {
        callback();
      }
    },
    validateWeChat: (rule, value, callback) => {  //微信
      if (value === '') {
        callback(new Error('微信号不能为空'));
      } else if (!wechatREG.test(value)) {
        callback(new Error('微信号、邮箱或手机号'));
      } else {
        callback();
      }
    },
    validateGender: (rule, value, callback) => {  //性别
      if (value === null) {
        callback(new Error('请选择'));
      } else {
        callback();
      }
    },
    validateEmail: (rule, value, callback) => {  //邮箱
      if (value === '') {
        callback(new Error('邮箱不能为空'));
      } else {
        callback();
      }
    },
    validateQQ: (rule, value, callback) => { //QQ
      if (value === '') {
        callback(new Error('QQ不能为空'));
      } else if (!QQREG.test(value)) {
        callback(new Error('5位以上数字'));
      } else {
        callback();
      }
    },
    validatePhone: (rule, value, callback) => {  //电话
      if (value === '') {
        callback(new Error(' 电话不能为空'));
      } else if (!phoneREG.test(value)) {
        callback(new Error('请输入国内手机号'));
      } else {
        callback();
      }
    },
    validateEmergencyPhone: (rule, value, callback) => {  //紧急联系人电话
      if (value === '') {
        callback(new Error('紧急联系人电话不能为空'));
      } else if (!phoneREG.test(value)) {
        callback(new Error('请输入国内手机号'));
      } else {
        callback();
      }
    },
    validateRelationship: (rule, value, callback) => {   //紧急联系人关系
      if (value === '') {
        callback(new Error('紧急联系人关系不能为空'));
      } else if (!nameREG.test(value)) {
        callback(new Error('请输入中文或英文'));
      } else {
        callback();
      }
    },
    validateScience: (rule, value, callback) => {   //文理科
      if (value === null) {
        callback(new Error('请选择'));
      } else {
        callback();
      }
    },
    validateEducation: (rule, value, callback) => {   //学历
      if (value === null) {
        callback(new Error('请选择'));
      } else {
        callback();
      }
    },
    validateBestEducation: (rule, value, callback) => {   //最高学历
      if (value === null) {
        callback(new Error('请选择'));
      } else {
        callback();
      }
    },
    validateMajor: (rule, value, callback) => {   //专业
      if (value === '') {
        callback(new Error('专业不能为空'));
      } else if (!nameREG.test(value)) {
        callback(new Error('请输入中文或英文'));
      } else {
        callback();
      }
    },
    validateIdcard: (rule, value, callback) => {   //身份证号
      if (value === '') {
        callback(new Error('身份证号不能为空'));
      } else if (!idcardREG.test(value)) {
        callback(new Error('请输入15或者17位身份证号'));
      } else {
        callback();
      }
    },
    validateIdcardUrl1: (rule, value, callback) => {   //身份证正面
      if (value === '') {
        callback(new Error('请上传身份证正面'));
      } else {
        callback();
      }
    },
    validateIdcardUrl2: (rule, value, callback) => {   //身份证反面
      if (value === '') {
        callback(new Error('请上传身份证反面'));
      } else {
        callback();
      }
    },
    validateBankNum: (rule, value, callback) => {   //银行卡号
      if (value === '') {
        callback(new Error('银行卡号不能为空'));
      }  else if (!bankNumREG.test(value)) {
        callback(new Error('银行卡号有误'));
      } else {
        callback();
      }
    },
    validateBankAddress: (rule, value, callback) => {   //开户行
      if (value === '') {
        callback(new Error('开户行不能为空'));
      }  else {
        callback();
      }
    },
    validateBankUrl1: (rule, value, callback) => {   //银行卡正面
      if (value === '') {
        callback(new Error('请上传银行卡正面'));
      }  else {
        callback();
      }
    },
    validateBankUrl2: (rule, value, callback) => {   //银行卡反面
      if (value === '') {
        callback(new Error('请上传银行卡反面'));
      }  else {
        callback();
      }
    },
    validateAgreementUrl1: (rule, value, callback) => {   //兼职协议第一页
      if (value === '') {
        callback(new Error('请上传兼职协议第一页'));
      }  else {
        callback();
      }
    },
    validateAgreementUrl2: (rule, value, callback) => {   //兼职协议第二页
      if (value === '') {
        callback(new Error('请上传兼职协议第二页'));
      }  else {
        callback();
      }
    },
    validateRegisterUrl: (rule, value, callback) => {   //信息登记表
      if (value === '') {
        callback(new Error('请上传信息登记表'));
      }  else {
        callback();
      }
    },
    validateStudentCardUrl: (rule, value, callback) => {   //学生证
      if (value === '') {
        callback(new Error('请上传学生证'));
      }  else {
        callback();
      }
    },
    validateAddress: (rule, value, callback) => {   //住址
      if (value === '') {
        callback(new Error('详细街道不能为空'));
      } else if (!address.test(value)) {
        callback(new Error('请输入中文或数字或字母'));
      } else {
        callback();
      }
    },
  }
}



