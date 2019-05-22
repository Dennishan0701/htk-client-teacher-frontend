var c=0,count=0,d=0,z=0,pauseNum=1,abc=0,r=[],playNum=0,backNum=0;
var zz=0,drag=0;
var _w=$(window).width(),_h=$(window).height();
//简写绘画代码定义的变量
var myAry=new Array();
//参数
var myAryR=new Array();
var ctx_begin=new Array();
var length=0;
//秒表跳动的时间定义
var ex=0,f=0;
var u;
var whData = 0;



function EllipseOne(context, x, y, a, b,color) {
  context.save();
  var r = (a > b) ? a : b;
  var ratioX = a / r;
  var ratioY = b / r;
  context.scale(ratioX, ratioY);
  context.beginPath();
  context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
  context.closePath();
  context.restore();
  context.strokeStyle ='rgb' + color;
  context.stroke();
}
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
  var r = window.location.search.substr(1).match(reg);
  if (r!=null) return (r[2]); return null;
};


if(location.host === "clteacher.onlyhi.cn" ||  location.host === "clstudent.onlyhi.cn"){
  var API = 'http://client.onlyhi.cn';
  var webAPI = "file.onlyhi.cn";
}else if(location.host == "frontendtest.haiketang.net"){
  var API = 'http://clienttest.haiketang.net';
  var webAPI = "filetest.haiketang.net";
} else if(location.host == "localhost:8085"){
  var API = 'http://clienttest.haiketang.net';
  var webAPI = "filetest.haiketang.net";
}else{
  var API = 'http://clienttest.haiketang.net';
  var webAPI = "filetest.haiketang.net";
  // var API = 'http://client.onlyhi.cn';
  // var webAPI = "file.onlyhi.cn";
}

function canvasBegin(){	 //参数转数组
  var token = GetQueryString('token');
  var uuid = GetQueryString('uuid');
  $(".page-current").val(1);
  $.ajax({
    type:'get',
    dataType:'json',
    url: API + '/client/course/getTrackDataNew',
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
        var audioSrc = res.data.voiceUrl;
        audio.src= audioSrc;
        canvas_div();
        abc=Math.round(res.data.duration/100);
        $(".duration").text(forMatTime(Math.round(abc/10)));
        var imgTemp = 0;
        if(imgUrl.length != 0){
          for(var i = 0;i<imgUrl.length;i++){
            var imgHtml = new Image();
            imgHtml.src = imgUrl[i];
            imgHtml.onload = function(){
              imgTemp++;
              var progress = Math.floor((imgTemp/imgUrl.length)*100)+'%'
              $(".loading p").html(progress)
              if(imgTemp == imgUrl.length){
                // alert('图片加载成功')
                audioStart();
                $(".loading p").html('');
              }
            }

          }
        }else{
          audioStart();
        }
      }else{
        alert(res.message);
        document.write('无法播放');
      }
    },
    error:function(res){
      alert(res.message);
      document.write('无法播放');
    }
  })
}

function audioStart(){
  if(GetQueryString('ios') != 1){
    var readyState = $("#audio1")[0].readyState;
    if(readyState == 4){
      // alert('音频加载成功')
      pause();
    }else{
      $("#audio1").one('canplaythrough',function(){
        // alert('音频加载成功')
        pause();
      })
    }
  }else{
    $(".iosPlay").show().one("touchstart", function() {
      $(".iosPlay").hide();
      audio.play();
      audio.muted = true;
      var readyState = $("#audio1")[0].readyState;
      if(readyState == 4){
        // alert('音频加载成功')
        pause();
        audio.muted = false;
      }else{
        $("#audio1").one('canplaythrough',function(){
          // alert('音频加载成功')
          pause();
          audio.muted = false;
        })
      }
    })
  }
}

function drawCircle(){
  for(var i=count;i<length;i++){
    r=setTimeout("timedCountsDraw("+i+")",myAry[i][2]-zz);
    myAryR[i]=r;
  }
}

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

function timedCountsDraw(num){
  var cc=Math.max(0,parseInt(myAry[num][9]));
  $(".canvas-bg").eq(cc).css('display','block').siblings(".canvas-bg").hide();
  if(num <= 0 ) num = 1;
  console.log(num)
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
      console.log(parseInt(myAry[num][0]), parseInt(myAry[num][1]), parseInt(myAry[num][10]), parseInt(myAry[num][11]))
      ctx_begin[cc].lineWidth = myAry[num][4];
      ctx_begin[cc].strokeStyle = 'rgb'+myAry[num][3];
      ctx_begin[cc].strokeRect(parseInt(myAry[num][0]), parseInt(myAry[num][1]),parseInt(myAry[num][10]), parseInt(myAry[num][11]));
    }
    if(myAry[num][6]==1){//椭圆
      EllipseOne(ctx_begin[cc], parseInt(myAry[num][0]), parseInt(myAry[num][1]), parseInt(myAry[num][10]), parseInt(myAry[num][11]),myAry[num][3])
      console.log(num)
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
  for(var i=0;i<=backNum;i++)
  {
    console.log(backNum)
    var cc=Math.max(0,parseInt(myAry[i][9]));
    $(".canvas-bg").eq(cc).css('display','block').siblings(".canvas-bg").hide();
    var num1 = myAry[i+1]?myAry[i+1]:false;
    if(myAry[i][6]==3 && num1[6]==3)//画线
    {
      ctx_begin[cc].beginPath();
      var _a=myAry[i][0];
      if(_a.indexOf("=")>-1){_a=_a.substr(1,_a.length);}
      ctx_begin[cc].moveTo(_a,myAry[i][1]);	//起始点（x,y）
      ctx_begin[cc].strokeStyle='rgb'+myAry[i][3];//画笔颜色
      ctx_begin[cc].lineJoin="round";//画笔颜色
      ctx_begin[cc].lineCap="round";
      ctx_begin[cc].lineWidth=myAry[i][4];//画笔粗细
      ctx_begin[cc].lineTo(num1[0],num1[1]);
      ctx_begin[cc].stroke();
    }
    else
    {
      // console.log(i)
      if(myAry[i][6]==2)//矩形
      {
        console.log(ctx_begin[cc],parseInt(myAry[i][0]), parseInt(myAry[i][1]), parseInt(myAry[i][10]), parseInt(myAry[i][11]),'矩形')
        ctx_begin[cc].lineWidth = myAry[i][4];
        ctx_begin[cc].strokeStyle = 'rgb'+myAry[i][3];
        ctx_begin[cc].strokeRect(parseInt(myAry[i][0]), parseInt(myAry[i][1]), parseInt(myAry[i][10]), parseInt(myAry[i][11]));

      }
      if(myAry[i][6]==1){//椭圆
        console.log(ctx_begin[cc],parseInt(myAry[i][0]), parseInt(myAry[i][1]), parseInt(myAry[i][10]), parseInt(myAry[i][11]),myAry[i][3],'椭圆')
        EllipseOne(ctx_begin[cc], parseInt(myAry[i][0]), parseInt(myAry[i][1]), parseInt(myAry[i][10]), parseInt(myAry[i][11]),myAry[i][3])

      }
      if(myAry[i][5]==1)//橡皮差
      {
        ctx_begin[cc].globalCompositeOperation = "destination-out";
        ctx_begin[cc].beginPath();
        ctx_begin[cc].arc(myAry[i][0],myAry[i][1],myAry[i][4],0, Math.PI * 2);
        ctx_begin[cc].strokeStyle="rgba(250,250,250,0)";
        ctx_begin[cc].fill();
        ctx_begin[cc].globalCompositeOperation = "source-over";
      }
      if(myAry[i][7]==1)//清除画布
      {
        ctx_begin[cc].beginPath();
        ctx_begin[cc].clearRect(0, 0,5000,5000);
      }
      if(myAry[i][8]==1)//打字
      {
        var canvasText = myAry[i][12] || '';
        var canvasTextArr = canvasText.split('\n');
        ctx_begin[cc].font=myAry[i][4]+"px  Microsoft YaHei";
        ctx_begin[cc].fillStyle = 'rgb' + myAry[i][3];
        var textX = parseInt(myAry[i][0]);
        var textY = parseInt(myAry[i][1]) + parseInt(myAry[i][4]);
        var lineHeight = myAry[i][4]*1.2;
        for(var j = 0;j<canvasTextArr.length;j++){
          textYP = textY+(lineHeight*j);
          ctx_begin[cc].fillText(canvasTextArr[j],textX,textYP);
        }
      }
      if(myAry[i][13]==1)//打开白板清空其他画布
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


//拖动和点击滚动条
function YDrag(){
  var oDiv = document.getElementById("drag");
  var outDiv = document.getElementById("scrubber");
  var widthX=$(".scrubber").width();
  var leftWidth=$(".scrubber").offset().left;
  var Left=0;
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
//进度条填充部分
function dragTime(Left){
  var k = Left / $(".scrubber").width() * 100 || 0;
  k = Math.min(Math.max(k, 0), 100);
  $(".progress").css("width",k+"%");
  $("#drag").css("left",k+"%");
  //如果改动了前面的计时毫秒，这里也要相应的更改
  var j=Math.round(abc*k/1000) || 0;
  $(".played").text(forMatTime(j));
}
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
function gotoPlay(Left){
  clearTimeout(u);//停止时间
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
  clearCanvas();//清除画布
  backDrawCircle();
  pause()
}

function pageLoad(){
  var pageWidth=$(window).width();
  var pageHeight=$(window).height();
  var warpperHeight=pageHeight;
  $("#stage").width(pageWidth).height(pageHeight);
  $("#stage-inner").width(pageWidth).height(warpperHeight);
  var timeBar = $(".time");
  timeBar.width(pageWidth - 140);
  $(".scrubber").width(pageWidth - 200)
  for(var i = 0;i<whData.length;i++){
    var canvasB = whData[i][0]/whData[i][1];
    var canvasW = pageWidth;
    var canvasH = pageWidth/canvasB;
    if(canvasH>=warpperHeight){
      canvasH = warpperHeight;
      canvasW = warpperHeight*canvasB;
    }
    var camvasT = (warpperHeight - canvasH)/2;
    var camvasL = (pageWidth - canvasW)/2;
    $(".canvas-bg").eq(i).width(canvasW).height(canvasH).css({top:camvasT,left:camvasL});
  }
};


var openTimer;
$("body").on("mousemove",function (ev) {
  $(".player,.return").removeClass("close");
  clearTimeout(openTimer)
  openTimer = setTimeout(function () {
    $(".player,.return").addClass("close");
  },3000)
})

$(audio).on('mousedown',function (ev) {
  ev = ev || window.ev
  console.log(ev)
})
