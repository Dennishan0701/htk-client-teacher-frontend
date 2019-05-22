<template>
  <div class="content">
    <div class="main changePassword">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="手机号" prop="phone">
          <Input type="text" v-model="userPhone" number disabled="disabled"></Input>
        </FormItem>
        <FormItem label="验证码" prop="code">
          <Input type="text" v-model="formCustom.code"></Input>
          <Button
            type="primary"
            @click="handleCode('formCustom')"
            class="codeBtn"
            :disabled="disabled"
            :class="{disabledBtn:disabledBtn}"
          >{{ codeState }}</Button>
        </FormItem>
        <!--<FormItem label="旧密码" prop="passwdOld">-->
          <!--<Input type="password" v-model="formCustom.passwdOld"></Input>-->
        <!--</FormItem>-->
        <FormItem label="新密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
          <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  import sha512 from '../../../static/js/sha512'
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
//        else if (value!=this.authCode) {
//          return callback(new Error('验证码错误'));
//        }
        else{
          callback()
        }

      };
      //判断旧密码
//      const validatePassOld = (rule, value, callback) => {
//        if (value === '') {
//          callback(new Error('请输入密码'));
//        } else if (value.length < 6) {
//          callback(new Error('密码不能小于6位!'));
//        } else if(!pwdReg.test(value)){
//          callback(new Error('请使用字母、数字和符号两种及以上6-20位密码!'));
//        } else{
//          callback();
//        }
//      };
      //判断新密码
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6) {
          callback(new Error('密码不能小于6位!'));
        } else if(!pwdReg.test(value)){
          callback(new Error('请使用字母、数字和符号两种及以上6-20位密码!'));
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
          callback(new Error('请使用字母、数字和符号两种及以上6-20位密码!'));
        }  else if (value !== this.formCustom.passwd) {
          callback(new Error('两次输入密码不一致!'));
        } else{
          callback()
        }
      };
      return {
        courseWait:"",
        userPhone:'',
        tip:false,
        changeSuccess: false,
        userPhoneData:'',
        show:false,
        codeState:'获取验证码',
        codeTemp:60,
        disabled:false,
        authCode:0,
        disabledBtn:false,
        formCustom: {
          phone:'',
          passwd: '',
          passwdOld: '',
          passwdCheck: '',
          code: '',
        },
        ruleCustom: {
//          passwdOld: [
//            { validator: validatePassOld, trigger: 'blur' }
//          ],
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
        }
      }
    },
    watch:{
      codeState(curVal,oldVal){  //监听倒计时
        this.codeState = curVal;
      }
    },
    mounted:function() {
        this.getPhone();
        if(isFirst == 'true'){
          const title = '提示';
          const content = '<p>您当前密码为原始密码，为保证账户安全，请修改。</p>';
          this.$Modal.warning({
            title: title,
            content: content
          });
        }
    },
    methods: {
      handleSubmit (name) {   //提交重置后密码
        this.$refs[name].validate((valid) => {
          if (valid) {
            let newPassword = sha512(this.userPhoneData + "&" + this.formCustom.passwd + ":onlyhi");
            this.$axios({
              method:"post",
              url: this.$store.state.resetpsd,
              data: {
                'token' : token,
                'phone' : this.userPhoneData,
//                'oldPassword' : oldPassword,
                'authCode' : this.authCode,
                'password' : newPassword,
              },
            })
            .then( res => {
              const title = '提示';
              const content = '<p>密码修改成功,请重新登陆!</p>';
              this.$Modal.success({
                title: title,
                content: content,
                onOk: function(){
                  let args = '{' +
                    '"requesttype":14,' +
                    '"messageid":'+ 0 +',' +
                    '"jscallback" : "signOut",' +
                    '"data" : {' +
                    '"msgbox" :'+ true +'' +
                    '}'+
                    '}'
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
      handleCode (name) {  //发送验证码
        let phone = this.userPhoneData;
        this.$axios({
          method:"post",
          url: this.$store.state.getAuthCode,
          data:{
            'phone' : phone,
          }
        })
        .then( res => {
          let temp = 60;
          this.disabled = true;
          this.disabledBtn = true;
          this.codeState = temp + "秒后重试";
          let secondDown = setInterval(() => {
            temp--;
            this.codeState = temp + "秒后重试";
            if(temp<=0){
              this.codeState = '获取验证码' ;
              this.disabled = false;
              this.disabledBtn = false;
              clearInterval(secondDown)
            }
          },1000)
//          this.authCode = res.data.data.authCode;
        })
      },
      getPhone () {  //获取用户手机号
        this.$axios.get(this.$store.state.getUserPhone)
        .then( res => {
          let phoneData = res.data.data;
          this.formCustom.phone = phoneData;
          this.userPhoneData = phoneData;
          this.userPhone = phoneData.substring(0,3)+"****"+phoneData.substring(7,11);
        })
      },
    },
  }
</script>

<style>
.changePassword .ivu-input {
  width: 260px;
  height: 36px;
}
.changePassword .codeBtn{
  position: absolute;
  left: 275px;
  top:2px;
  background: #F42440;
  border-color: #F42440 ;
}
.changePassword .ivu-btn-primary,.changePassword .ivu-btn-primary:hover{
    background: #F42440;
    border-color: #F42440;
  }
.changePassword .codeBtn.disabledBtn{
  background: #eee;
  border-color: #ccc;
}
</style>
