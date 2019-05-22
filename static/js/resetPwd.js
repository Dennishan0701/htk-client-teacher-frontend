/**
 * Created by ShenBo on 2017/12/7.
 */

if(location.host == "clsteacher.onlyhi.cn" || location.host == "clstudent.onlyhi.cn"){
  var API = 'http://client.onlyhi.cn';
}else if(location.host == "frontendtest.haiketang.net" || location.host == 'newteacher.onlyeduhi.cn'){
  var API = 'http://clienttest.haiketang.net';
}else if(location.host == "localhost:8086"){
  var API = 'http://clienttest.haiketang.net';
}else{
  var API = 'http://client.onlyhi.cn';
}

var pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
var mobileReg = /^1\d{10}$/;
var codeReg = /^\d{4}$/;

$(function () {
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return "";
  }
  // var code = '';
//        手机号检测
  $(".phone input").keyup(function () {
    var $phone =  $(this).val();
    if (!mobileReg.test($phone)) {
      $(".phone .error").show();
      $(this)[0].className = 'icon3';
      $('.code button').addClass('wait').attr('disabled',true);
    }else {
      $(".phone .error").hide();
      $(this)[0].className = 'icon2';
      $('.code button').removeClass('wait').removeAttr('disabled');
    }
    sumbmitShow ()
  });
//        密码检测
  var $pwd1 = '';
  $(".password1 input").keyup(function () {
    $pwd1 = $(this).val();
    if (!pwdReg.test($pwd1)) {
      $(".password1 .error").show();
      $(this)[0].className = 'icon3';
    }else {
      $(".password1 .error").hide();
      $(this)[0].className = 'icon2';
    }
    sumbmitShow ()
  })

  $(".password2 input").keyup(function () {
    var $pwd2 = $(this).val();
    if ($pwd2 !== $pwd1) {
      $(".password2 .error").show();
      $(this)[0].className = 'icon3';
    }else {
      $(".password2 .error").hide();
      $(this)[0].className = 'icon2';
    }
    sumbmitShow ()
  })


//        验证码
  $(".code input").keyup(function () {
    var $code = $(this).val();
    if (!codeReg.test($code)) {
      $(".code .error").show();
      $(this)[0].className = 'icon3';
    }else {
      $(".code .error").hide();
      $(this)[0].className = 'icon2';
    }
    sumbmitShow ()
  })
//        发送验证码
  $(".codeBtn").on("click", function () {
    var $this = $(this);
    var $phone = $(".phone input").val();


    if (!mobileReg.test($phone)) {
      $(".phone input").attr({placeholder: "请输入正确手机号码"}).focus().val("");
      $(".phone .error").show();
      return false;
    }else{
      $(".phone .error").hide();
      $this.addClass("wait").attr("disabled", true);
      $.ajax({
        url: API+'/client/user/sendAuthCode',
        type: 'post',
        // //本地环境
        data: {phone: $phone},
        dataType: 'json',
        timeout:5000,
        // 发起请求前就调用
        beforeSend: function (data) {
          var second = 60;
          $this.html(second--+'s').addClass("wait").attr("disabled", true);
          timerId = setInterval(function () {
            $this.html(second--+'s').addClass("wait").attr("disabled", true);
            if (second <= 0) {
              clearInterval(timerId);
              $this.html("重新发送").removeClass("wait").attr("disabled", false);
            }
          }, 1000);
        },
        success: function (data) {
          if (data.code == 0) {
            // var data = data.data;
            // code = data.authCode;
          } else if (data.result == 101) {
            $this.html("重新发送").removeClass("wait").attr("disabled", false);
          }
        },
        error: function () {
        }
      });
    }
  })


//  显示密码
  $(".eyes").click(function () {
    if($(this).hasClass("eyes2")) {
      $(this).removeClass("eyes2");
      $(".password1 input,.password2 input").attr('type','password')
    } else {
      $(this).addClass('eyes2')
      $(".password1 input,.password2 input").attr('type','text')
    }
  })


//        确认修改密码

  $(".submit").on("click", function () {
    var $name = $(".phone input").val();
    var $code = $(".code input").val();
    var $pwd = $(".password1 input").val();
    $.ajax({
      type: 'post',
      url: API + '/client/user/retrievePassword',
      data: {
        phone:$name,
        password: sha512($name + "&" + $pwd + ":onlyhi"),
        authCode: $code,
        deviceType: GetQueryString("deviceType") || 'PC',
        userType: GetQueryString("userType") || 'teacher',
        deviceId: GetQueryString("deviceId") || '123456',
      },
      dataType: "json",
      timeout:5000,
      jsonp: "jsoncallback",
      // 发起请求前就调用
      beforeSend: function (data) {

      },
      success: function (data) {
        if (data.code == 0) {
          $(".form").hide();
          $(".succeedMsg").show();
        }else {
          $(".errorMsg").css({'top':'40px'}).html(data.message);
          setTimeout(function () {
            $(".errorMsg").css({'top':'-80px'});
          },2000)
        }
      },
      error: function () {
        $(".errorMsg").css({'top':'40px'}).html('网络请求中断，请检查网络');
        setTimeout(function () {
          $(".errorMsg").css({'top':'-80px'});
        },2000);
      }
    });
  });

  function sumbmitShow () {
    var $name = $(".phone input").val();
    var $code = $(".code input").val();
    var $pwd1 = $(".password1 input").val();
    var $pwd2 = $(".password2 input").val();
    if(mobileReg.test($name) && codeReg.test($code) && pwdReg.test($pwd1) && $pwd1===$pwd2) {
      $(".submit").removeClass('wait').removeAttr('disabled');
    } else{
      $(".submit").addClass('wait').attr('disabled',true);
    }

  }


  function sendData(command) {
    if(GetQueryString('deviceType') == 'mac') {
      window.webkit.messageHandlers.sendData.postMessage(command);
    } else {
      if (typeof(QCefClient) == 'undefined') {
        return;
      } else {
        QCefClient.invokeMethod("callClientFun",command);
      }
    }
  };


  $(".login").click(function () {
    let args = '{"requesttype":28,"data" : {}}';
    sendData(args);
  })
})
