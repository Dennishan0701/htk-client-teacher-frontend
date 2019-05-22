<template>
  <div class="schedule-week-main">
    <div class="schedule-date">
      <div class="schedule-date-month">
        <div class="schedule-date-month-prev" @click="datePrev()">
          <Icon type="arrow-left-b"></Icon>
        </div>
        <span>{{ year }}年{{ month }}月</span>
        <div class="schedule-date-month-prev" @click="dateNext()">
          <Icon type="arrow-right-b"></Icon>
        </div>
      </div>
      <div class="schedule-date-week">
        <ul>
          <li v-for="(item,$index) in weekList"
              @click="weekChange($index)"
              :class="{ active : $index == weekIndex }"
          ><span>{{ item }}</span></li>
        </ul>
      </div>
    </div>
    <div class="schedule-table">
      <div class="card">
        <div class="schedule-table-main">
          <div class="schedule-table-header">
            <i></i>
            <Table border :disabled-hover="true" :columns="scheduleColumnsTamp" :data="scheduleDataList" height="42"></Table>
          </div>
          <div class="schedule-table-detail" ref="scheduleTableDetail">
            <Table border :disabled-hover="true" :columns="scheduleColumns" :data="scheduleDataList"></Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import { timestamp } from '@/common/js/common';

  export default {
    data () {
      return {
        year:new Date().getFullYear(),
        month:new Date().getMonth() + 1,
        date:0, //YYYY-MM
        weekIndex:0, //周下标
        weekList:['第一周','第二周','第三周','第四周','第五周','第六周'],
        weekVals:['MON','TUE','WED','THU','FRI','SAT','SUN'],
        timeList:this.timeListArr(),  //表列所有数据,
        scheduleColumnsTamp:[ //覆盖表头
          {
            key: 'NAME',
            title: '时间',
          }
        ],
        scheduleColumns:[ //真实表头
          {
            key: 'NAME',
            title: '时间',
            render : (h,params) => {
              return h('h3',params.row.NAME)
            }
          },
        ],
        scheduleData:[], //月课表（全部数据）
        scheduleDataList:[], //处理后月课表
        scheduleUrl:this.$store.state.courseSchedule,
      }
    },
    beforeMount () { //数据处理
      this.scheduleColumnsTamp = [...this.scheduleColumnsTamp,...this.scheduleColumnsTampArr()];
      this.scheduleColumns = [...this.scheduleColumns,...this.scheduleColumnsArr()];
    },
    mounted () {
      this.timeSet();
      let ele = this.$refs.scheduleTableDetail.children[0];
      this.$emit('childDom',ele);
    },
    methods: {
      timeSet () {  //获取服务器时间
        timestamp().then( data =>{
          this.year = data.year;
          this.month = data.month;
          this.weekIndex = data.weekInMonth;
          this.getSchedule(true);
        });
      },
      scheduleColumnsTampArr() { //覆盖表头数据
        let sctArr = [];
        this.weekVals.forEach((v,i,a)=> {
          let item = {
            key: v,
            title : '',
            renderHeader : (h, params) => {
              return h('div',[
                h('p',params.column.key),
                h('p',this.columentTitle(params.column.title))
              ])
            }
          };
          sctArr.push(item)
        })
        return sctArr;
      },
      scheduleColumnsArr() { //真实表头数据
        let scArr = [];
        this.weekVals.forEach((v,i,a)=> {
          let item = {
            key: v,
            title : '',
            renderHeader : (h, params) => {
              return h('div',[
                h('p',params.column.key),
                h('p',this.columentTitle(params.column.title))
              ])
            },
            render : (h, params) => {
              let data = Object.values(params.row)[i+1]
              return this.renderItem(h,params,data);
            }
          }
          scArr.push(item)
        })
        return scArr;
      },
      timeListArr() { //表列所有数据,
        let tlArr = [];
        for(let i = 7; i< 24; i++) {
          let num = i < 10 ? '0'+i : i;
          let item = {
            'time': `${num}:00`,
            'list': [],
          }
          tlArr.push(item);
        }
        return tlArr;
      },
      weekChange($index){ //改变周
        this.weekIndex = $index;
        let list = this.scheduleData[$index]; //本周课表
        let courseScheduleList = [];  //本周空闲列表集合
        this.scheduleDataList = [];
        for(let i = 0, length = list.length; i < length; i++) { //循环周一到周日
          this.scheduleColumns[i+1].title = list[i].courseDate;
          this.scheduleColumnsTamp[i+1].title = list[i].courseDate;
          courseScheduleList.push(list[i].courseScheduleList)
        }
        for(let i = 0, length = this.timeList.length; i < length; i++) { //循环7点到24点
          let scheduleList =  {
            NAME : this.timeList[i].time,
            MON : this.scheduleDataHandle(courseScheduleList[0],i),
            TUE : this.scheduleDataHandle(courseScheduleList[1],i),
            WED : this.scheduleDataHandle(courseScheduleList[2],i),
            THU : this.scheduleDataHandle(courseScheduleList[3],i),
            FRI : this.scheduleDataHandle(courseScheduleList[4],i),
            SAT : this.scheduleDataHandle(courseScheduleList[5],i),
            SUN : this.scheduleDataHandle(courseScheduleList[6],i),
          }
          this.scheduleDataList.push(scheduleList);
        }

        let imgName = `${this.year}年${this.month}月第${$index+1}周课表`;
        this.$emit('imgName',imgName);
      },
      scheduleDataHandle (data,index) {
        let item = [];
        for(let i = 0, length = data.length;i < length; i++){
          //如果表小时和开始小时相等 匹配对应表列
          let timer = this.timeList[index].time.substring(0,2);
          let startTimer = data[i].startTime.substring(0,2)
          if(timer == startTimer) item.push(data[i]);
        }
        return item;
      },
      datePrev () {  //上月
        this.month--;
        if(this.month < 1) {
          this.year--;
          this.month = 12;
        }
        this.getSchedule();
      },
      dateNext () {  //下月
        this.month++;
        if(this.month > 12) {
          this.year++;
          this.month = 1;
        }
        this.getSchedule();
      },
      getSchedule (first) { //获取课表
        let year = this.year;
        let month = this.month < 10? '0' + this.month : this.month;
        this.date = year + '-' + month;
        this.$axios.get(this.scheduleUrl,{
          params:{
            dateTime:this.date,
          }
        }).then( res => {
          this.scheduleData = res.data.data;
          if (first) {
            this.weekChange(this.weekIndex);
          } else {
            this.weekChange(0);
          }
        })
      },
      columentTitle(title){  //处理表头
        return this.moment(title).format('ll').substring(5);
      },
      itemHeight (data) {  //处理课表标签高度
        let et = data.endTime == '00:00'? '24:00':data.endTime;
        let endTime = new Date(data.courseDate.replace(/-/g,'/')+' '+ et).getTime();
        let startTime = new Date(data.courseDate.replace(/-/g,'/')+' '+data.startTime).getTime();
        let minute = (endTime-startTime)/1000/60;
        return minute/60*100 + '%'; //小时*表格高度
      },
      itemTop (data,name) {  //处理课表标签定位
        let minute = data.startTime.substring(3,5)-name.substring(3, 5)
        return minute/60*100 + '%'; //小时*表格高度
      },
      renderItem(h,params,data) {  //render课表内容
        if( data ) {
          let moudel = [];
          for(let i = 0, length = data.length; i < length; i++){
            let div =  h('div',{
              style : {
                height : this.itemHeight(data[i]),
                top : this.itemTop(data[i],params.row.NAME),
              },
              class : {
                yellow : data[i].courseType == '0'?true:false,
                item : true,
                open : parseInt(this.itemHeight(data[i])) < 100,
              },
            },[
              h('div',[
                h('p',{class:{itemName:true}},data[i].studentName),
                h('p',[
                  h('span',data[i].startTime),
                  h('span','-'),
                  h('span',data[i].endTime),
                ]),
                h('em',data[i].subject.substring(0,1)),
              ])
            ])
            moudel.push(div);
          }
          return moudel;
        }
      },
    },
  }
</script>


