<template>
  <Modal v-model="changePassword" width="377" :transfer="false" :mask-closable="false" :closable="false">
    <p slot="header">
      <span>修改密码</span>
      <i class="close" @click="close">
        <Icon type="close-round"></Icon>
      </i>
    </p>
    <div class="pswMoudel">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="85">
        <FormItem label="手机号：" prop="phone">
          <p>{{userPhoneData}}</p>
        </FormItem>
        <FormItem label="验证码：" prop="code">
          <Input type="text" v-model="formCustom.code" :maxlength="6" number></Input>
          <Button
            type="primary"
            @click="handleCode"
            class="codeBtn"
            :disabled="disabled"
            :class="{disabledBtn:disabledBtn}"
          >{{ codeState }}</Button>
        </FormItem>
        <FormItem label="新密码：" prop="passwd" :maxlength="20">
          <Input :type="inputType" v-model="formCustom.passwd"></Input>
          <em :class="eyes" @click="openPassword"></em>
        </FormItem>
        <FormItem label="确认密码：" prop="passwdCheck" :maxlength="20">
          <Input :type="inputType" v-model="formCustom.passwdCheck"></Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import sha512 from '../../static/js/sha512'
  const phoneReg= /^1\d{10}$/;
  const pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
  const isFirst = sessionStorage.getItem('isFirst');
  export default {
    data () {
      //判断用户手机号
      const validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if (!phoneReg.test(value)){
          return callback(new Error('请输入正确的手机号码'));
        } else {
          callback();
        }
      };
      //判断验证码
      const validateCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        else{
          callback()
        }

      };
      //判断新密码
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不能小于6位!'));
        } else if(!pwdReg.test(value)){
          callback(new Error('字母、数字和符号两种及以上6-20位'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      //判断新密码第二次
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不能小于6位!'));
        }else if(!pwdReg.test(value)){
          callback(new Error('字母、数字和符号两种及以上6-20位'));
        }  else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else{
          callback()
        }
      };
      return {
        inputType:'password',
        eyes: 'eyes1',
        courseWait:"",
        userPhone:'',
        tip:false,
        changeSuccess: false,
        userPhoneData:'',
        show:false,
        codeState:'获取',
        codeTemp:60,
        disabled:false,
        disabledBtn:false,
        formCustom: {
          phone:'',
          passwd: '',
          passwdOld: '',
          passwdCheck: '',
          code: '',
        },
        changePassword:true,
        ruleCustom: {
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
        },
        noChanged:this.$store.state.fetchNoChangePsw,
      }
    },
    mounted () {
      this.changePassword = true;
      this.getPhone();
      if(isFirst == 'true' && this.noChanged !== 'true'){
        const title = '提示';
        const content = '<p>您当前密码为原始密码，为保证账户安全，请修改。</p>';
        this.$Modal.warning({
          title: title,
          content: content
        });
      }
    },
    watch:{
      codeState(curVal,oldVal){  //监听倒计时
        this.codeState = curVal;
      }
    },
    methods: {
      close(){
        this.$store.commit("CHANGE_PASSWORD","false");
        this.changePassword = false;
      },
      handleSubmit (name) {   //提交重置后密码
        this.$refs[name].validate((valid) => {
          if (valid) {
            let newPassword = sha512(this.userPhoneData + "&" + this.formCustom.passwd + ":onlyhi");
            this.$axios({
              method:"post",
              url: this.$store.state.resetpsd,
              data: {
                'phone' : this.userPhoneData,
                'authCode' : this.formCustom.code,
                'password' : newPassword,
              },
            })
              .then( res => {
                const title = '提示';
                const content = '<p>密码修改成功,请重新登录!</p>';
                this.$Modal.success({
                  title: title,
                  content: content,
                  onOk: () => {
                    let args = `{
                      "requesttype": 14,
                      "messageid": 0,
                      "jscallback": "signOut",
                      "data": {
                        "msgbox": true
                      }
                    }`
                    sendData(args);
                  }
                });
              })

          } else {
            this.$Message.error('请完善表单');
          }
        })
      },
      handleReset (name) {  //重置表单
        this.$refs[name].resetFields();
        this.formCustom.phone = this.userPhoneData; //手机号赋值
      },
      handleCode () {  //发送验证码
        let phone = this.userPhoneData;
        this.$axios({
          method:"post",
          url: this.$store.state.getAuthCode,
          data:{
            'phone' : phone,
          },
          loading: false,
        }).then( res => {
            let temp = 60;
            this.disabled = true;
            this.disabledBtn = true;
            this.codeState = temp + "s";
            let secondDown = setInterval(() => {
              temp--;
              this.codeState = temp + "s";
              if(temp<=0){
                this.codeState = '获取' ;
                this.disabled = false;
                this.disabledBtn = false;
                clearInterval(secondDown)
              }
            },1000)
          })
      },
      getPhone () {  //获取用户手机号
        this.$axios.get(this.$store.state.getUserPhone,{
          loading:false,
        }).then( res => {
            let phoneData = res.data.data;
            this.formCustom.phone = phoneData;
            this.userPhoneData = phoneData;
            this.userPhone = phoneData.substring(0,3)+"****"+phoneData.substring(7,11);
          })
      },
      openPassword() {
        this.inputType = this.inputType === 'password' ? 'text' : 'password';
        this.eyes = this.eyes === 'eyes1' ? 'eyes2' : 'eyes1';
      },
    },
  }
</script>
<style lang="less">
  .changePswMain{
    .ivu-modal-content{
      .ivu-modal-body{
        padding: 15px 43px 0;
      }
      p{
        font-size: 14px;
      }
    }
    .ivu-input{
      width: 132px;
      font-size: 14px;
    }
    .ivu-form-item{
      margin-bottom: 20px;
    }
    .ivu-form-item-label{
      font-size: 14px;
    }
    .codeBtn{
      position: absolute;
      right: 17px;
      top: 2px;
      width: 50px;
      height: 32px;
      background-color: #fff;
      color: #5e85c8;
      padding: 0;
      &.disabledBtn{
        color: #dadada;
      }
    }
    em{
      width: 50px;
      position: absolute;
      right: 17px;
      top: 2px;
      cursor: pointer;
      height: 32px;
      background-image: url("../assets/images/eyes1.png");
      background-size: 20px auto;
      background-position: center;
      background-repeat: no-repeat;
      &:hover{
        background-image: url("../assets/images/eyes2.png");
      }
    }
    em.eyes2{
      background-image: url("../assets/images/eyes3.png");
    }
  }
</style>
