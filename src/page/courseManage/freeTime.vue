<template>
  <div class="free-content">
    <div class="free-title commonTitle">
      <div class="free-title-main commonTitleMain">
        <div>
          <h2>空闲时间</h2>
        </div>
        <div v-if="editMode">
          <Button @click="tipShow('saveTemplate')" :disabled="submitDisabled" :class="{active:!submitDisabled}">存为模板</Button>
          <Button @click="tipShow('cancelTemplate')" type="primary" class="active">取消</Button>
        </div>
        <div v-else>
          <Button @click="tipShow('editTemplate')" class="secondaryBtn">编辑模板</Button>
          <Button @click="tipShow('useTemplate')" class="secondaryBtn">应用模板</Button>
          <Button type="primary" :disabled="submitDisabled" :class="{active:!submitDisabled}" @click="tipShow('saveFreeTime')">提交</Button>
        </div>
      </div>
    </div>
    <div class="free-main">
      <div class="free-date">
        <div
          class="free-date-month"
          v-for="(month,monthIndex) in monthList"
          :class="{ active : mIndex == monthIndex, disable : month.disable }"
        ><p @click="monthChange(monthIndex,false,month.disable)">{{ month.dateCH }}</p>
          <ul>
            <li
              v-for="(item,weekIndex) in month.week"
              @click="weekChange(monthIndex,weekIndex)"
              :class="{ active : mIndex + '-' +  wIndex == monthIndex + '-' + weekIndex }"
              :select="item.selected"
            ><Icon type="checkmark-round" v-show="item.selected"></Icon>
              <span>{{ item.weekName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="free-table">
        <div class="card">
          <div class="free-table-main">
            <div class="free-table-header">
              <table cellspacing="0" cellpadding="0" border="0">
                <colgroup>
                  <col width="16%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                </colgroup>
                <thead>
                <tr>
                  <th>时间</th>
                  <th v-for="(date,$index) in freeTimeWeekColumns">
                    <div :class="{disable:date.disable}">
                      <p>{{ date.name }}</p>
                      <p>{{ date.title }}</p>
                      <label
                        :for="'title'+$index"
                        v-if="date.title!=''"
                        class="free-table-checkbox"
                        @click="check($index)"
                        :class="{selected:date.allSelect}"
                      >全</label>
                      <input :id="'title'+$index" type="checkbox" v-if="date.title!=''" style="display: none">
                    </div>
                  </th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="free-table-detail"
                 ref="freeTableDetail">
              <!--@mousedown="mouseDown()"-->
              <!--@mouseup="mouseUp()"-->
              <table cellspacing="0" cellpadding="0" border="0" :style="{minHeight:tableHeight+'px'}">
                <colgroup>
                  <col width="16%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                  <col width="12%">
                </colgroup>
                <tbody>
                <tr v-for="(time,timeIndex) in freeTimeTamp">
                  <td>{{ time.time }}</td>
                  <td v-for="(item,itemIndex) in weekList">
                    <em>占位</em>
                    <span
                      :class="{selected:item[timeIndex].selected,disable:item[timeIndex].disable}"
                      @click="selected(item[timeIndex],itemIndex)"
                      :time_index="timeIndex"
                      :item_index="itemIndex"
                    ><Icon type="checkmark-round" v-if="item[timeIndex].selected"></Icon></span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h3 class="free-tip">* 注：必须选满一个月才能提交空闲时间</h3>
      </div>
    </div>
    <Modal v-model="tipWindow" width="320">
      <p slot="header">
        <span>提示</span>
      </p>
      <p slot="close" @click="tipWindow = false">
        <Icon type="close-round"></Icon>
      </p>
      <div class="freeTimeMoudel" v-html="tip.text"></div>
      <div slot="footer">
        <Button type="primary" @click="ok">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<style lang="less">
  @import '../../style/free.less';
</style>

<script>
  import { timestamp } from '@/common/js/common';

  export default {
    data () {
      return {
        tip:{
          type:'',
          text:'',
        },
        tableHeight:0,
        tipWindow:false, //提示窗
        editMode:false, //编辑模式
        year:new Date().getFullYear(),
        month:new Date().getMonth() + 1,
        week:0,  //周
        wIndex:0, //周下标
        monthList:[],  //左侧选项卡数据
        mIndex:0, //月下标
        weekList: [],//周数据
        submitDisabled:true,
        dateTimeList:'',
        freeTimeListUrl:this.$store.state.freeTimeList,
        saveFreeTimeUrl:this.$store.state.saveFreeTime,
        saveFreeTimeTemplateUrl:this.$store.state.saveFreeTimeTemplate,
        getFreeTimeTemplateUrl:this.$store.state.getFreeTimeTemplate,
        freeTimeAll:[], //全部数据
        freeTimeAllList:[], //全部处理后数据
        freeTimeData:[],  //月数据
        freeTimeDataList:[],  //月处理后数据
        freeTimeAllColumns:[],
        freeTimeMonthColumns:[],
        freeTimeWeekColumns:[],
        freeTimeTamp:[
          {time:'06:00 - 07:00'},
          {time:'07:00 - 08:00'},
          {time:'08:00 - 09:00'},
          {time:'09:00 - 10:00'},
          {time:'10:00 - 11:00'},
          {time:'11:00 - 12:00'},
          {time:'12:00 - 13:00'},
          {time:'13:00 - 14:00'},
          {time:'14:00 - 15:00'},
          {time:'15:00 - 16:00'},
          {time:'16:00 - 17:00'},
          {time:'17:00 - 18:00'},
          {time:'18:00 - 19:00'},
          {time:'19:00 - 20:00'},
          {time:'20:00 - 21:00'},
          {time:'21:00 - 22:00'},
          {time:'22:00 - 23:00'},
          {time:'23:00 - 24:00'},
        ],
      }
    },
    beforeMount () {
      this.timeSet();
    },
    mounted () {
      window.onresize = () => {
        this.tableHeightFun();
      }
    },
    methods: {
      tableHeightFun () {
        let mh = this.$refs.freeTableDetail.clientHeight;
        if(mh > 605) {
          this.tableHeight = mh - 44;
        } else {
          this.tableHeight = 0;
        }
      },
      timeSet () {  //获取服务器时间
        timestamp().then( data =>{
          this.year = data.year;
          this.month = data.month;
          this.wIndex = data.weekInMonth;
          this.week = data.weekInMonth;
          let year = data.year;
          let month = data.month;
          let dateTimeList = '?',and = '&';
          this.monthList = [];
          for(let i = 0;i<3;i++){ //最近3个月
            let date = {
              dateCH : year + '年' + month + '月',
              dateISO : this.moment(data.timestamp).add(i, 'M').format('YYYY-MM'),
              week : [
                {weekName:'第一周',selected:false},
                {weekName:'第二周',selected:false},
                {weekName:'第三周',selected:false},
                {weekName:'第四周',selected:false},
                {weekName:'第五周',selected:false},
                {weekName:'第六周',selected:false},
              ],
              month:month,
              disable:false,
            }
            month++;
            if(month > 12) {
              month = 1;
              year++;
            }
            this.monthList.push(date);

            if(i == 2){
              and = '';
            }
            dateTimeList += `dateTimeList=${date.dateISO}${and}`;
          }
          this.dateTimeList = dateTimeList;
          this.getFreeTime()
        })
      },
      getFreeTime () {  //获取空闲时间
        this.$axios.get(this.freeTimeListUrl + this.dateTimeList)
          .then( ({data}) => {
            this.submitDisabled = !data.data.isCommit;
            this.dataHandle(data);
            this.tableHeightFun();
          })
      },
      dataHandle ({data}) { //处理原始数据
        this.freeTimeAll = data.freeTimeMonthList;
        let freeTimeAll = data.freeTimeMonthList;
        let allFreeTime= []; //全部数据
        let allTitle = []; //全部表头
        for (let a in freeTimeAll) { //循环全部数据（3个月）
          let monthList = freeTimeAll[a].freeTimeListList;
          let monthFreeTime = [];
          let monthTitle = [];
          for (let m in monthList) { //循环月数据（6周）
            let weekList = monthList[m];
            let weekFreeTime = [];
            let weekTitle = [  //表头
              {name: 'MON', title: '', allSelect: false, disable: false},
              {name: 'TUE', title: '', allSelect: false, disable: false},
              {name: 'WED', title: '', allSelect: false, disable: false},
              {name: 'THU', title: '', allSelect: false, disable: false},
              {name: 'FRI', title: '', allSelect: false, disable: false},
              {name: 'SAT', title: '', allSelect: false, disable: false},
              {name: 'SUN', title: '', allSelect: false, disable: false},
            ];
            for (let w in weekList) { //循环周数据（7天）
              weekTitle[w].title = weekList[w].freetimeDate; //表头日期赋值

              let dayFreeTime = []  //天数据（每天含有6-23点，是否选中）

              for(let i = 6; i < 24; i++) { //天数据 6-23点 选中 禁选
                let start = i<10? `0${i}:00`: `${i}:00`;
                let end = i+1<10? `0${i+1}:00`: `${i+1}:00`;
                dayFreeTime.push({
                  time:`${start} - ${end}`,
                  selected:false,
                  disable:false,
                })
              }

              if(parseInt(weekList[w].freetimeDate.substring(5,7))!=this.monthList[a].month){
                weekTitle[w].disable = true;  //非选择月禁止点击
              }
              weekFreeTime.push(dayFreeTime); //周数据数组
              let dayList = weekList[w].freetimePeriodList; //当天空闲时间
              if(dayList.length != 0){  //循环当天空闲时间
                let temp = 0;
                for(let d in dayList){
                  // 空闲时间-6对应左侧时间下标（6:00开始）
                  let itemIndex = parseInt(dayList[d].substring(0, 2))-6;
                  if(itemIndex >= 0) {
                    weekFreeTime[w][itemIndex].selected = true;
                    temp++;
                  }
                }
                //判断是否全天空闲
                if(temp >= 18){
                  weekTitle[w].allSelect = true;
                }
              }
            }
            monthTitle.push(weekTitle);
            monthFreeTime.push(weekFreeTime)
          }
          allTitle.push(monthTitle);
          allFreeTime.push(monthFreeTime);
        }
        this.freeTimeAllColumns = allTitle;
        this.freeTimeAllList = allFreeTime;
        this.monthChange(0, true) //初始化
      },
      monthChange(monthIndex,first,disable){  //改变月
        if(disable) {
          return false
        } else {
          this.mIndex = monthIndex;
          if(!first) {
            this.weekChange (monthIndex, 0); //不是首次默认选中第一周
          } else {
            this.weekChange (monthIndex,this.week); //默认选中本周
          }
        }
      },
      weekChange (monthIndex,weekIndex) {  //改变周
        this.wIndex = weekIndex; //选中下标（class）
        this.weekList = this.freeTimeAllList[monthIndex][weekIndex]; //本周数据
        this.freeTimeWeekColumns = this.freeTimeAllColumns[monthIndex][weekIndex];
        this.monthList[monthIndex].week[weekIndex].selected = true; //选中状态

        for(let i in this.freeTimeWeekColumns) { //非本月数据禁止点击，取消选择
          if(this.freeTimeWeekColumns[i].disable) {
            this.freeTimeWeekColumns[i].allSelect = false;
            for(let time of this.weekList[i]){
              time.disable = true;
              time.selected = false;
            }
          }
        }

        if(monthIndex == 0) { //如果是首月，判断选中个数
          let weekList = this.monthList[0].week; //首月星期
          let selectNum = 0; //选中个数
          if(this.submitDisabled) {
            for(let item of weekList){
              if(item.selected) {
                selectNum++;
                if(selectNum >= weekList.length){ //判断提交按钮能否点击
                  this.submitDisabled = false;
                }
              }
            }
          }
        }

      },
      check(index){ //全选
        this.freeTimeWeekColumns[index].allSelect = !this.freeTimeWeekColumns[index].allSelect;
        for(let item of this.weekList[index]){
          if(this.freeTimeWeekColumns[index].allSelect) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        }
      },
      selected (val,index) { //空闲时间选择
        if(!val.disable)val.selected=!val.selected;

        let temp = 0;
        for(let item of this.weekList[index]) {
          if(item.selected) {
            temp++;
          }
        }
        if(temp>=18) {
          this.freeTimeWeekColumns[index].allSelect = true;
        } else {
          this.freeTimeWeekColumns[index].allSelect = false;
        }

      },
      mouseDown (selected) {
        let that = this;
        this.$refs.freeTableDetail.onmouseover = function (ev) {
          let attributes = ev.target.attributes;
          let timeIndex,itemIndex;
          for(let i of attributes) {
            if(i.name == 'time_index') {
              timeIndex = i.value;
            } else if(i.name == 'item_index'){
              itemIndex = i.value;
            }
          }
          if(timeIndex && itemIndex){
            that.weekList[itemIndex][timeIndex].selected = true;
          }
        }
      },
      mouseUp (selected) {
        this.$refs.freeTableDetail.onmouseover = null;
      },
      editTemplate () {  //编辑模板
        this.editMode = true;
        this.monthChange(0); //到首月
        this.submitDisabled = true;
        for(let i of this.monthList[0].week){ //清空周选择状态
          i.selected = false;
        }
        this.monthList[0].week[0].selected = true; //首周选中
        this.monthList[1].disable = true; //次月禁选
        this.monthList[2].disable = true; //次月禁选
        for(let week of this.freeTimeAllList[0]){ //清空首月空闲时间
          for(let day of week){
            for(let hour of day){
              hour.selected = false;
            }
          }
        }

        for(let weekColumn of this.freeTimeAllColumns[0]) { //清空首月全选状态
          for(let dayColumn of weekColumn) {
            dayColumn.allSelect = false;
          }
        }
      },
      saveTemplate () {  //保存模板
        this.$axios.post(this.saveFreeTimeTemplateUrl,{
          "freeTimeSaveList": this.saveDataHandle([this.freeTimeAllList[0]],[this.freeTimeAll[0]])
        }).then( res => {
          this.$Message.success('模板保存成功');
          this.cancelTemplate();
          this.tipShow('useTemplateNow');
        })
      },
      useTemplate () {  //应用模板
        this.$axios.get(this.getFreeTimeTemplateUrl + this.dateTimeList)
          .then( ({ data }) => {
            this.dataHandle(data);
            this.submitDisabled = false;
            for(let month of this.monthList){
              for(let week of month.week){
                week.selected = true;
              }
            }
          })

      },
      cancelTemplate () {  //取消编辑模板
        this.editMode = false;
        for(let i of this.monthList[0].week){ //已选周重置
          i.selected = false;
        }
        this.monthList[1].disable = false;
        this.monthList[2].disable = false;
        this.getFreeTime();

      },
      saveFreeTime () {  //保存空闲时间
        let selectedMonth = [];
        for(let month of this.monthList){
          let temp = 0;
          for(let week of month.week){
            if(week.selected) temp++;

            if(temp == 6) {
              selectedMonth.push(month.dateISO);
            }
          }
        }

        this.$axios.post(this.saveFreeTimeUrl,{
          "freeDateTimeList":selectedMonth,
          "freeTimeSaveList":this.saveDataHandle(this.freeTimeAllList,this.freeTimeAll)
        }).then( res => {
          this.$Message.success('保存成功');
          this.getFreeTime();
        })
      },
      saveDataHandle(dataStart,dataEnd){ //处理需要保存的空闲时间（恢复到原始状态）
        let [freeTimeAllList,freeTimeAll] = [dataStart,dataEnd];
        for(let a in freeTimeAllList){ //循环全部数据
          let monthList = freeTimeAllList[a];
          for(let m in monthList){
            let weekList = monthList[m];
            for(let w in weekList){
              let dayList = weekList[w];
              let freeList = [];
              for(let d of dayList){
                if(d.selected){
                  freeList.push((d.time).replace(' - ','-'));
                }
              }
              //数据还原
              freeTimeAll[a].freeTimeListList[m][w].freetimePeriodList = freeList;
            }
          }
        }
        return freeTimeAll;
      },
      ok(){
        this.tipWindow = false;
        let tipType = this.tip.type;
        if(tipType == 'editTemplate') {
          this.editTemplate();
        } else if(tipType == 'saveTemplate') {
          this.saveTemplate();
        } else if(tipType == 'useTemplate') {
          this.useTemplate();
        } else if(tipType == 'cancelTemplate') {
          this.cancelTemplate();
        } else if(tipType == 'saveFreeTime') {
          this.saveFreeTime();
        } else if(tipType == 'useTemplateNow') {
          this.useTemplate();
        }
      },
      tipShow(type){
        this.tipWindow = true;
        this.tip.type = type;
        let tipType = this.tip.type;
        if(tipType == 'editTemplate') {
          this.tip.text = '<p>确认进入编辑模式？</p>（刚刚编辑的空闲时间不会保存）';
        } else if(tipType == 'saveTemplate') {
          this.tip.text = '确认将本次编辑存为模板？';
        } else if(tipType == 'useTemplate') {
          this.tip.text = '<p>确认使用模板？</p>（刚刚编辑的空闲时间不会保存）';
        } else if(tipType == 'cancelTemplate') {
          this.tip.text = '确认取消本次编辑？';
        } else if(tipType == 'saveFreeTime') {
          this.tip.text = '确认保存？';
        } else if(tipType == 'useTemplateNow') {
          this.tip.text = '是否使用模板？';
        }
      }
    },
    destroyed () {
      window.onresize = null;
    },
  }
</script>

