$(function() {


   function calendar(data) {
     $('#calendar').fullCalendar({
       themeSystem: 'bootstrap3',
       editable: true,
       aspectRatio: 1.8,
       scrollTime: '00:00',
       firstDay:1,
       timeFormat: 'H:mm',
       slotLabelFormat:'H:mm',
       locale:'zh-cn',
       header: {
         left: 'today prev,next',
         center: 'title',
         right: 'month,agendaWeek,agendaDay'
       },
       resources: [

       ],
       events: data,
     });
   }


    function getData(year,month){
      $.ajax({
        type:'get',
        url:'http://192.168.3.138:8080/onlyhi-admin/teacherTime/getTeacherTimeSchedule',
        dataType:'json',
        data:{
          token:'acdb11dacdaeb35e3760a71203e3b69140411524f27150a9c4e7c7473b4242179a0844d611861fab64ab99db3fbd80cd347a9e00f18a479ca964ac1b74347bad',
          teacherUuid:'170',
          startDate:year+'-'+month+'-1',
          endDate: year+'-'+month+'-31',
        },
        success:function (res) {
          var arr = new Array();
          res.data.teacherDateList.forEach(function(v,i){
            var title = v.subject === null ? '' :  v.subject + '，' + v.grade + '，' + v.stuName;
            var item = {
              start: v.courseDate + 'T' + v.startTime,
              end: v.courseDate + 'T' + v.endTime,
              title:title,
              color: v.subject === null ? 'rgb(45, 140, 240)' : 'rgb(25, 190, 107)'
            };
            arr.push(item);
          });

          calendar(arr);
        },
        error:function () {
          alert('网络延迟，请稍后再试');
        }
      })

    }
    var month = new Date().getMonth() + 1;
    var year = new Date().getYear() ;
    getData(year,month);


  $("#calendar").on('click','.btn-group,.fc-today-button',function () {
    month = $('#calendar').fullCalendar('getDate').months()+1;
    year = $('#calendar').fullCalendar('getDate').year();
    getData(year,month);
  });

});
