var count=0; //当前执行数据下标
var pauseNum=1; //（0：暂停 1：播放）
var abc=0; //总时间/100
var r; //单轨迹数据定时器
var playNum=0; //（1：播放 2：重播）
var backNum=0; //改变时间后执行数据下标
var zz=0; //当前时间（毫秒）
var myAry=new Array();  //轨迹数据
var myAryR=new Array(); //绘图定时器数组
var ctx_begin=new Array(); //canvas数组
var length=0; //轨迹数据数
var ex=0; //当前时间（分秒）
var u; //时间进度定时器
var whData = new Array(); //画布数组
var pageTotal = 0; //总页数
var audio; //媒体Dom
var media; //媒体信息（video:audio）

//获取URL参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return (r[2]); return null;
};


if(location.host === "clteacher.onlyhi.cn" ||  location.host === "clstudent.onlyhi.cn"){
  var API = 'http://client.onlyhi.cn/client/course/getTrackData';
  var webAPI = "file.onlyhi.cn";
  var replaceStr = 'courseware.onlyhi.cn';
}else{
  var API = 'http://clienttest.haiketang.net/client/course/getTrackDataNew';
  var webAPI = "filetest.haiketang.net";
  var replaceStr = 'courseware.onlyeduhi.cn';
  var API = 'http://client.onlyhi.cn/client/course/getTrackData';
  var webAPI = "file.onlyhi.cn";
  var replaceStr = 'courseware.onlyhi.cn';
}

//数据初始化
function canvasBegin(){
  var token = GetQueryString('token');
  var uuid = GetQueryString('uuid');
  // $(".page-current").val(1);
  $.ajax({
    type:'get',
    dataType:'json',
    url: API,
    header:{
      token:token,
    },
    data:{
      token:token,
      courseUuid:uuid,
    },
    success:function(res){
      // alert('数据获取成功')
      if(res.code == 0 ){
        imgUrl = res.data.imageUrl;
        whData = res.data.boardWHList;
        pageTotal = res.data.pages+2;
        drawList = res.data.drawList;
        length = drawList.length;
        myAry = drawList;
        media = res.data.mp4Url?'video': 'audio';
        var src = res.data.mp4Url?res.data.mp4Url:res.data.voiceUrl;
        audio =  res.data.mp4Url?document.getElementById("video1"):document.getElementById("audio1");
        audio.src= src;
        var duration = res.data.videoDuration?res.data.videoDuration:res.data.duration;
        abc=Math.round(duration/100);
        $(".duration").text(forMatTime(Math.round(abc/10)));
        var imgTemp = 0;
        if(imgUrl.length != 0){
          for(let i = 0;i<imgUrl.length;i++){
            imgLoad()
            function imgLoad () {
              var imgHtml = new Image();
              imgHtml.src = imgUrl[i];
              imgHtml.onload = function() {
                imgTemp++;
                var progress = Math.floor((imgTemp/imgUrl.length)*100)+'%'
                $(".loading p").html(progress)
                if(imgTemp == imgUrl.length){
                  // alert('图片加载成功')
                  audioStart();
                  $(".loading p").html('');
                }
              }
              imgHtml.onerror = function () {
                if(replaceStr === 'courseware.onlyhi.cn') {
                  imgUrl[i] = imgUrl[i].replace(/static.onlyhi.cn/g, replaceStr);
                } else {
                  imgUrl[i] = imgUrl[i].replace(/clienttest.haiketang.net/g, replaceStr);
                }
                imgHtml.src = imgUrl[i];
                imgLoad()
              }
            }
          }
        }else{
          audioStart();
        }
      }else{
        // alert(res.message);
        document.write(res.message);
      }
    },
    error:function(res){
      // alert(res.message);
      document.write(res.message);
    }
  })
}

//媒体文件加载完毕后播放
function audioStart(){
  canvas_div();
  //判断是否为IOS设备（如果IOS = 1 需要用户touchstart触发）
  if(GetQueryString('device') != 'iOS'){
    var readyState = audio.readyState;
    if(readyState == 4){
      pause();
    }else{
      $(audio).one('canplaythrough',function(){
        pause();
      })
    }
  }else{
    $(".iosPlay").show().one("touchstart", function() {
      $(".iosPlay").hide();
      audio.play();
      //先静音播放获取媒体加载状态，获取后重新播放
      audio.muted = true;
      var readyState = audio.readyState;
      if(readyState == 4){
        pause();
        audio.muted = false;
      }else{
        $(audio).one('canplaythrough',function(){
          pause();
          audio.muted = false;
        })
      }
    })
  }
}

//绘制椭圆方法
function EllipseOne(context, x, y, a, b,color,Solid) {
  context.save();
  var r = (a > b) ? a : b;
  var ratioX = a / r;
  var ratioY = b / r;
  context.scale(ratioX, ratioY);
  context.beginPath();
  context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
  context.closePath();
  context.restore();
  if(Solid == '1') {
    context.fillStyle = 'rgb' + color;
    context.fill();
  }
  context.strokeStyle ='rgb' + color;
  context.stroke();
}

//绘制图片方法 添加定时器
function drawCircle(){
  for(var i=count;i<length;i++){
    r=setTimeout("timedCountsDraw("+i+")",myAry[i][2]-zz);
    myAryR[i]=r;
  }
}

//创建canvas
function canvas_div(){
  for(var i=0;i<pageTotal;i++)
  {
    var bacImg = i<2?'#fff': 'url('+imgUrl[i-2]+')';
    _canvasWidth = whData[i][0];
    _canvasHeight = whData[i][1];
    var canvasHtml =  '<div class="canvas-bg hide" style="background:'+ bacImg +' no-repeat center;background-size: cover;">' +
      '<canvas height="'+ _canvasHeight +'" width="'+ _canvasWidth +'" class="canvas" id="canvas_begin'+i+'"></canvas>' +
      '</div>';
    $("#stage-inner").append(canvasHtml);
    ctx_begin[i]=document.getElementById("canvas_begin"+i).getContext("2d");
    $(".canvas-bg").eq(0).css('display','block').siblings(".canvas-bg").hide();
  }
  pageLoad();
}

//定时器绘图方法
function timedCountsDraw(num){
  console.log(num)
  var cc=Math.max(0,parseInt(myAry[num][9]));
  $(".canvas-bg").eq(cc).css('display','block').siblings(".canvas-bg").hide();
  if(num <= 0 ) num = 1;
  count=num;
  if(pauseNum==0) return;
  var num1 = myAry[num+1]?myAry[num+1]:false;
  if(myAry[num][6]==3 && num1[6]==3)//画线
  {
    ctx_begin[cc].beginPath();
    var _a=myAry[num][0];
    if(_a.indexOf("=")>-1){_a=_a.substr(1,_a.length);}
    ctx_begin[cc].moveTo(_a,myAry[num][1]);
    ctx_begin[cc].strokeStyle='rgb'+myAry[num][3];//画笔颜色
    ctx_begin[cc].lineJoin="round";//画笔颜色
    ctx_begin[cc].lineCap="round";
    ctx_begin[cc].lineWidth=myAry[num][4];//画笔粗细
    ctx_begin[cc].lineTo(num1[0],num1[1]);
    ctx_begin[cc].stroke();
  }
  else
  {
    if(myAry[num][6]==2)//矩形
    {
      ctx_begin[cc].beginPath();
      ctx_begin[cc].lineWidth = myAry[num][4];
      ctx_begin[cc].strokeStyle = 'rgb'+myAry[num][3];
      ctx_begin[cc].rect(parseInt(myAry[num][0]), parseInt(myAry[num][1]),parseInt(myAry[num][10]), parseInt(myAry[num][11]));
      if(myAry[num][14] == '1') {
        ctx_begin[cc].fillStyle = 'rgb'+myAry[num][3];
        ctx_begin[cc].fill();
      }
      ctx_begin[cc].stroke();
    }
    if(myAry[num][6]==1){//椭圆
      EllipseOne(ctx_begin[cc], parseInt(myAry[num][0]), parseInt(myAry[num][1]), parseInt(myAry[num][10]), parseInt(myAry[num][11]),myAry[num][3], parseInt(myAry[num][14]))
    }
    if(myAry[num][5]==1)//橡皮差
    {
      ctx_begin[cc].globalCompositeOperation = "destination-out";
      ctx_begin[cc].beginPath();
      ctx_begin[cc].arc(myAry[num][0],myAry[num][1],myAry[num][4],0, Math.PI * 2);
      ctx_begin[cc].strokeStyle = "rgba(250,250,250,0)";
      ctx_begin[cc].fill();
      ctx_begin[cc].globalCompositeOperation = "source-over";
    }
    if(myAry[num][7]==1)//清除画布
    {
      ctx_begin[cc].beginPath();
      ctx_begin[cc].clearRect(0, 0,5000, 5000);
    }
    if(myAry[num][8]==1)//打字
    {
      var canvasText = myAry[num][12] || '';
      var canvasTextArr = canvasText.split('\n');
      ctx_begin[cc].font=myAry[num][4]+"px  Microsoft YaHei";
      ctx_begin[cc].fillStyle = 'rgb' + myAry[num][3];
      var textX = parseInt(myAry[num][0]);
      var textY = parseInt(myAry[num][1]) + parseInt(myAry[num][4]);
      var lineHeight = myAry[num][4]*1.2;
      for(var j = 0;j<canvasTextArr.length;j++){
        textYP = textY+(lineHeight*j);
        ctx_begin[cc].fillText(canvasTextArr[j],textX,textYP);
      }
    }
    if(myAry[num][13]==1)//打开白板清空其他画布
    {
      for(var j=0;j<pageTotal;j++){
        if(j!=1){
          ctx_begin[j].beginPath();
          ctx_begin[j].clearRect(0, 0,5000, 5000);
        }
      }
    }
  }

}

//无延时绘制图片方法
function backDrawCircle(){
  for(var i=0;i<=backNum;i++) {
    timedCountsDraw(i)
  }
}

//清除画布
function clearCanvas(){
  for(var i=0;i<pageTotal;i++)
  {
    var canvas_begin = document.getElementById("canvas_begin"+i);
    var ctx_begin = canvas_begin.getContext("2d");
    ctx_begin.clearRect(0, 0,10000,10000);
  }
}

//时间进度条
function timeChange(){
  var totalWidth=$(".scrubber").width();
  var Left=totalWidth*10*ex/abc;
  dragTime(Left);
  ex+=0.1;
  u=setTimeout("timeChange()",100);
  if(ex>=Math.round(abc / 10)+1)
  {
    dragTime(totalWidth);
    playNum=2;
    play()
  }
}

var touchEvent = false
//拖动和点击滚动条
function YDrag(){
  var device =  GetQueryString('device');
  var Left = 0;
  var leftWidth=$(".scrubber").offset().left;
  var oDiv = document.getElementById("drag");
  var outDiv = document.getElementById("scrubber");
  var widthX=$(".scrubber").width();
  var innerDiv =  $("#stage-inner")[0];
  var startX = 0;
  var moveX = 0;
  var touchTime;
  if(device == 'Android' || device == 'iOS') {//移动端

    if(!touchEvent) {
      touchEvent = true

      innerDiv.addEventListener('touchstart',function (event) {
        startX = event.touches[0].clientX;
        moveX = 0;
      },false)

      innerDiv.addEventListener('touchmove', function (event) {
        moveX = event.touches[0].clientX - startX;
        if(Math.abs(moveX) >= 20) {
          Left = $(".scrubber-draggable").offset().left - leftWidth + moveX;
          var k = Left / $(".scrubber").width() * 100 || 0;
          k = Math.min(Math.max(k, 0), 100);
          var j=Math.round(abc*k/1000) || 0;
          $(".mobileTime").show().text(forMatTime(j));
        }
      }, false);

      innerDiv.addEventListener('touchend', function (event) {
        if(Math.abs(moveX) >= 20) {
          clearTimeout(touchTime)
          touchTime = setTimeout(function () {
            dragTime(Left)
            gotoPlay(Left);	//开始播放
            $(".mobileTime").hide()
          },100)
        }
      }, false);
    }

  } else { //PC端
    oDiv.onmousedown = function(ev) {
      document.onmousemove = function(ev) {
        ev = ev || event;
        Left = ev.clientX - leftWidth;
        if(Left<0) Left=0;
        if(Left>widthX) Left=widthX;
        play();
        clearTimeout(u)
        dragTime(Left);
      }
      document.onmouseup = function(ev) {
        document.onmousemove = null;
        document.onmouseup = null;
        playNum=1;
        $('.loading').show();
        setTimeout(function(){
          gotoPlay(Left);//开始播放
        },100)
      };
      return false;
    }
    outDiv.onmouseup = function(ev) {
      ev=ev || event;
      Left=ev.clientX - leftWidth;
      play();
      $('.loading').show();
      setTimeout(function(){
        dragTime(Left);	//时间轴变化
        gotoPlay(Left);	//开始播放
      },100)

    }
    outDiv.onmousemove = function(ev) {
      ev = ev || event;
      Left = ev.clientX - leftWidth;
      var moveLeft = Left / $(".scrubber").width() * 100 || 0;
      var moveTime =Math.round(abc*moveLeft/1000) || 0;
      var moveTimeShow = forMatTime(moveTime);
      $(".timeShow").css({'display':'block','left':Left});
      $(".timeShow span").text(moveTimeShow);
      outDiv.onmouseout = function (ev) {
        $(".timeShow").hide();
      }
    }
  }
}

//进度条填充部分
function dragTime(Left){
  var k = Left / $(".scrubber").width() * 100 || 0;
  k = Math.min(Math.max(k, 0), 100);
  $(".progress").css("width",k+"%");
  $("#drag").css("left",k+"%");
  var j=Math.round(abc*k/1000) || 0;
  $(".played").text(forMatTime(j));
}

//毫秒转换分秒
function forMatTime(j){
  var ex = Math.ceil(j),
    g = Math.floor(ex / 3600),
    d = Math.floor(ex / 60) % 60,
    f = ex % 60,
    k = d + ":" + (f > 9 ? f: "0" + f);
  if (g > 0) {
    k = g + ":" + k;
  }
  return k;
}

//将时间转换为数字
function backTime(str){
  var ddd=str.split(":");
  if(ddd.length == 1){
    var d=parseInt(ddd[0]);
    var f=0;
    var h= 0;
  }else if(ddd.length == 2){
    var d=parseInt(ddd[0])*60;
    var f=parseInt(ddd[1]);
    var h= 0;
  }else if(ddd.length == 3){
    var d=parseInt(ddd[0])*3600;
    var f=parseInt(ddd[1])*60;
    var h=parseInt(ddd[2]);
  }
  var k=h+d+f;
  return k;
}


//进度条手动改变触发
function gotoPlay(Left){
  clearTimeout(u);
  for (var i = 0; i < myAryR.length; i++) {
    clearTimeout(myAryR[i]);
  }
  ex=backTime($(".played").text());//获取当前时间
  if(myAry[length-1][2] < ex*1000) {
    backNum = length-1;
  } else {
    for(var i=0;i<length;i++)
    {
      if(myAry[i][2]>ex*1000)
      {
        count=i-1;
        backNum=i-1;
        break;
      }
    }
  }
  zz=ex*1000;
  clearCanvas();
  pause()
  backDrawCircle();
}

//页面初始化（定义canvas宽高、进度条宽度）
function pageLoad(){
  var ratio = media == 'video'? 0.8: 1
  var pageWidth=$(window).width();
  var pageHeight=$(window).height();
  if(ratio == 0.8) $('video').show()
  $(".time").width(pageWidth - 140); //播放+音量+全屏 = 140
  $(".scrubber").width(pageWidth - 200) //140 + 时间宽度 = 200
  for(var i = 0;i<whData.length;i++){
    var canvasB = whData[i][0]/whData[i][1];
    var canvasW = pageWidth*ratio;
    var canvasH = pageWidth*ratio/canvasB;
    if(canvasH>=pageHeight){
      canvasH = pageHeight;
      canvasW = pageHeight*canvasB;
    }
    var camvasT = (pageHeight - canvasH)/2;
    var camvasL = (pageWidth*ratio - canvasW)/2;
    $(".canvas-bg").eq(i).css({top:camvasT,left:camvasL,width:canvasW,height:canvasH});
  }
};


//页面交互（关闭功能栏）
var openTimer;
$("#stage-inner").on("mousemove",function (ev) {
  $(".player,.return").removeClass("close");
  clearTimeout(openTimer)
  openTimer = setTimeout(function () {
    $(".player,.return").addClass("close");
  },3000)
})

$(".player,.return").on("mouseenter",function (ev) {
  $(".player,.return").removeClass("close");
  clearTimeout(openTimer)
})

