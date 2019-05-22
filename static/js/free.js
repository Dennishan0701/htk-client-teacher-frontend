$(function() {




     $('#calendar').fullCalendar({
       themeSystem: 'bootstrap3',
       defaultView:'agendaWeek',
       editable: true,
       aspectRatio: 1.8,
       scrollTime: '00:00',
       firstDay:1,
       timeFormat: 'H:mm',
       slotLabelFormat:'H:mm',
       defaultTimedEventDuration:'00:30:00',
       locale:'zh-cn',
       allDaySlot:false,
       header: {
         left: 'today prev,next',
         center: 'title',
         right: 'agendaWeek'
       },
       resources: [

       ],
       events: function (start, end, timezone, callback) {
         var tcDateStart = start.format('YYYY-MM-DD');
         var tcDateEnd = end.format('YYYY-MM-DD');
         $.ajax({
           type:'post',
           url:'http://192.168.3.138:8080/onlyhi-admin/wechat/tcTeacher/getTeacherDate',
           dataType:'json',
           timeout:3000,
           data:{
             token:'acdb11dacdaeb35e3760a71203e3b69140411524f27150a9c4e7c7473b4242179a0844d611861fab64ab99db3fbd80cd347a9e00f18a479ca964ac1b74347bad',
             teacherUuid:'A08BE9BF-3B4C-48D1-9944-B836AD2BCCD5',
             tcDateStart: tcDateStart,
             tcDateEnd: tcDateEnd,
           },
           success:function (res) {
             var arr = new Array(); //数据列表
             res.data.forEach(function(v,i){
               var item = {
                 start: v.tcDate + 'T' + v.tcTime,
               };
               arr.push(item);

             });
             callback(arr);

           },
           error:function () {
             alert('网络延迟，请稍后再试');
           }
         })
       },
       dayClick: function(date, jsEvent, view) {
         var start = date.format().substring(0,16);
         var item = {
           title:'',
           start: start,
         };
         $('#calendar').fullCalendar('renderEvent',item);

       },
       eventClick: function (calEvent, jsEvent, view) {
         var _id = calEvent._id;
         $('#calendar').fullCalendar('removeEvents',_id);
       },
       eventAllow: function(dropLocation, draggedEvent) {
         if(dropLocation.start.day() < dropLocation.end.day()){
           if(dropLocation.end.hour()==0 && dropLocation.end.minute()==0 && dropLocation.end.day() - dropLocation.start.day() == 1){
             return true;
           }else{
             return false;
           }
         } else {
           return true;
         }
       },
       // eventMouseover: function (event, jsEvent, view) {
       //   var deleteBtn = '<span class=deleteBtn>x</span>';
       //   $(this).append(deleteBtn);
       // },
       // eventMouseout: function (event, jsEvent, view) {
       //   $(this).find('.deleteBtn').remove();
       // },
     });





  function fun_date(aa){
    var date = new Date();
    date.setDate(date.getDate()+aa);
    var time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    return time;
  }


  $(".save").on('click',function () {
    var teacherDateList = '', //保存空闲时间
        view = $('#calendar').fullCalendar('getView'),
        startDate = view.start.format(),
        endDate = view.end.format(),
        data = $('#calendar').fullCalendar('clientEvents'),
        tcTime,item,tcStartDate,tcEndMinute,tcStartMinute,
        totalMinute,count,tcHour,tcMinute;
    data.forEach(function(v,i){
      tcStartDate = v.start.format('YYYY-MM-DD');
      if ( v.end === null ) {
        tcTime = v.start.format('HH:mm');
        item = '{'+
          '"teacherUuid" :"A08BE9BF-3B4C-48D1-9944-B836AD2BCCD5",'+
          '"tcDate" : "'+ startDate +'",'+
          '"tcTime" : "'+ tcTime + '"' +
          '},';
        teacherDateList+=item;
      } else {
        tcStartMinute = v.start._i[3] * 60 + v.start._i[4];
        tcEndMinute = v.end._i[3] * 60 + v.end._i[4];
        if(tcEndMinute == 0) tcEndMinute = 1440;
        totalMinute =  tcEndMinute - tcStartMinute;
        count = totalMinute/30;
        for ( var i = 0; i < count; i++ ) {
          tcHour = parseInt(tcStartMinute/60)<10?'0' + parseInt(tcStartMinute/60):parseInt(tcStartMinute/60);
          tcMinute = tcStartMinute%60==30? tcStartMinute%60 : '00';
          tcTime = tcHour + ':' + tcMinute;
          tcStartMinute+=30;
          item = '{'+
              '"teacherUuid" :"A08BE9BF-3B4C-48D1-9944-B836AD2BCCD5",'+
              '"tcDate" : "'+ startDate +'",'+
              '"tcTime" : "'+ tcTime + '"' +
            '},';
          teacherDateList+=item;
        }
      }
    });

    console.log('[' + teacherDateList.substring(0,teacherDateList.length -1 ) + ']');
    saveFree(teacherDateList);
    function saveFree(teacherDateList){
      $.ajax({
        type:'post',
        url:'http://192.168.3.138:8080/onlyhi-admin/wechat/tcTeacher/updateTeacherDate',
        dataType:'json',
        timeout:3000,
        data:{
          token:'acdb11dacdaeb35e3760a71203e3b69140411524f27150a9c4e7c7473b4242179a0844d611861fab64ab99db3fbd80cd347a9e00f18a479ca964ac1b74347bad',
          teacherUuid:'A08BE9BF-3B4C-48D1-9944-B836AD2BCCD5',
          startDate: startDate,
          endDate: endDate,
          teacherDateList:'[' + teacherDateList.substring(0,teacherDateList.length -1 ) + ']',
        },
        success:function (res) {

        },
        error:function () {
          alert('网络延迟，请稍后再试');
        }
      })
    }
  });

});
