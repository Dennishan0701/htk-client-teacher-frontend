<!-- 月课表组件 -->
<template>
  <div class="schedule-month-main">
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
    </div>
    <div class="schedule-table">
      <div class="card">
        <div class="schedule-table-main">
          <div class="schedule-table-detail" ref="scheduleTableDetail">
            <table cellspacing="0" cellpadding="0" border="0">
              <thead>
              <tr>
                <th v-for="item in scheduleColumns">
                  {{ item }}
                </th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="(week,weekIndex) in scheduleData" :key="weekIndex">
                  <td v-for="(day,dayIndex) in week" :key="dayIndex">
                    <div class="table-day"
                      :class="{gray:month!=moment(day.courseDate).month()+1}"
                    >{{ moment(day.courseDate).format('D') }}</div>
                    <div class="table-cell">
                      <div class="day-class-detail" v-if="day.courseScheduleList.length">
                        <div class="day-class-total">
                          共{{ day.courseScheduleList.length }} 节课
                        </div>
                        <div class="day-class-list" :class="{open:open == weekIndex+'-'+dayIndex}">
                          <ul>
                            <li v-for="(item,$index) in day.courseScheduleList" :title="item.studentName" :class="{show:$index<num}">
                              <span>{{ item.startTime }}-{{ item.endTime }}</span>
                              <span>{{ item.studentName }}</span>
                            </li>
                            <li class="openBtn"
                                @click="openList(weekIndex+'-'+dayIndex)"
                                v-if="day.courseScheduleList.length>num"
                                v-show="open != weekIndex+'-'+dayIndex"
                            >查看全部 <Icon type="chevron-down"></Icon></li>
                            <li class="closeBtn"
                                @click="open = 0"
                                v-show="open == weekIndex+'-'+dayIndex"
                            >收起 <Icon type="chevron-up"></Icon></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- 隐藏的课表 用于截图 -->
    <div class="schedule-table-hidden">
      <div class="schedule-table">
        <div class="card">
          <div class="schedule-table-main">
            <div class="schedule-table-detail" ref="scheduleTableDetail">
              <table cellspacing="0" cellpadding="0" border="0">
                <thead>
                <tr>
                  <th v-for="item in scheduleColumns">
                    {{ item }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(week,weekIndex) in scheduleData" :key="weekIndex">
                  <td v-for="(day,dayIndex) in week" :key="dayIndex">
                    <div class="table-day"
                         :class="{gray:month!=moment(day.courseDate).month()+1}"
                    >{{ moment(day.courseDate).format('D') }}</div>
                    <div class="table-cell">
                      <div class="day-class-detail" v-if="day.courseScheduleList.length">
                        <div class="day-class-total">
                          共{{ day.courseScheduleList.length }} 节课
                        </div>
                        <div class="day-class-list">
                          <ul>
                            <li v-for="(item,$index) in day.courseScheduleList" :title="item.studentName" class="show">
                              <span>{{ item.startTime }}-{{ item.endTime }}</span>
                              <span>{{ item.studentName }}</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
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
        scheduleData:[], //月课表（全部数据）
        scheduleColumns:['MON','TUE','WED','THU','FRI','SAT','SUN'],
        scheduleUrl:this.$store.state.courseSchedule,
        num: '', //展示数据条数
        scheduleTableDetail:'', //表格dom
        timer:false, //计时器
        open:0,
      }
    },
    mounted () {
      this.timeSet();
      this.scheduleTableDetail = this.$refs.scheduleTableDetail;
      const that = this;
      window.onresize = () => {  //窗口变动显示数据改变
        return (() => {
          that.listNum();
        })()
      }

      let ele = document.querySelectorAll('.schedule-table-hidden .schedule-table')[0];
      this.$emit('childDom',ele);
    },
    watch : {
      num (val) {  //优化窗口变动监听
        if (!this.timer) {
          this.num = val
          this.timer = true
          setTimeout(() => {
            this.timer = false;
          }, 400)
        }
      }
    },
    methods: {
      timeSet () {  //获取服务器时间
        timestamp().then( data =>{
          this.year = data.year;
          this.month = data.month;
          this.getSchedule();
          this.listNum();
        })
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
      getSchedule () {   //获取日历数据
        let year = this.year;
        let month = this.month < 10? '0' + this.month : this.month;
        this.date = year + '-' + month;
        this.$axios.get(this.scheduleUrl,{
          params:{
            dateTime:this.date,
          }
        }).then( res => {
          this.scheduleData = res.data.data;

          let imgName = `${this.year}年${this.month}月课表`;
          this.$emit('imgName',imgName);
        })
      },
      listNum () {  //显示数据量计算（表格高度 - 表头 / 6周 / 数据高度 - 课程数和查看全部）PS最小值为1
        this.num = Math.max(parseInt((this.scheduleTableDetail.offsetHeight - 43)/6/20 - 2),1);
      },
      openList (index) {
        this.open = index;
      }
    },
  }
</script>


