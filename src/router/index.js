import Vue from 'vue';
import Router from 'vue-router';


/*
 *
 * 公共组件
 *
 * */
import Home from '@/page/public/Home'; //首页
import upload from '@/page/public/upload'; //白板课件


/*
 *
 * 课程管理
 *
 * */
import courseWait from '@/page/courseManage/courseWait'; //待上课程
import freeTime from '@/page/courseManage/freeTime'; //空闲时间
import mySchedule from '@/page/courseManage/mySchedule'; //我的课表
import courseRecord from '@/page/courseManage/courseRecord'; //课程记录
import temOpening from '@/page/courseManage/temOpening'; //临时开课
import openClass from '@/page/courseManage/openClass'; //我要排课
import changeClass from '@/page/courseManage/changeClass'; //我要调课


/*
 *
 * 课件管理
 *
 * */
import myCourseware from '@/page/coursewareManage/myCourseware'; //我的课件
import systemCourseware from '@/page/coursewareManage/systemCourseware'; //系统课件
import excellentVideo from '@/page/coursewareManage/excellentVideo'; //优秀视频


/*
*
* 个人中心
*
* */
import info from '@/page/personal/info'; //个人信息
import salary from '@/page/personal/salary'; //薪资结算
import cooperation from '@/page/personal/cooperation'; //合作协议
import internship from '@/page/personal/internship'; //实习证明
import HBapplication from '@/page/personal/HBapplication'; //手写板申请
import changePassword from '@/page/personal/changePassword'; //重置密码


export default new Router({
  mode:'hash',
  routes: [
    // ----------------------公共路由
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
    },
    {
      path: '/upload',
      name: '画板上传 ',
      component: upload,
    },
    // ----------------------课程管理
    {
      path: '/courseManage/courseWait',
      name: '待上课程',
      component: courseWait,
    },
    {
      path: '/courseManage/freeTime',
      name: '空闲时间',
      component: freeTime,
    },
    {
      path: '/courseManage/mySchedule',
      name: '我的课表',
      component: mySchedule,
    },
    {
      path: '/courseManage/courseRecord',
      name: '课程记录',
      component: courseRecord,
    },
    {
      path: '/courseManage/temOpening',
      name: '临时开课',
      component: temOpening,
    },
    {
      path: '/courseManage/openClass',
      name: '我要排课',
      component: openClass,
    },
    {
      path: '/courseManage/changeClass',
      name: '我要调课',
      component: changeClass,
    },
    // ----------------------课件管理
    {
      path: '/coursewareManage/myCourseware',
      name: '我的课件',
      component: myCourseware,
    },
    {
      path: '/coursewareManage/systemCourseware',
      name: '系统课件',
      component: systemCourseware,
    },
    {
      path: '/coursewareManage/excellentVideo',
      name: '优秀视频',
      component: excellentVideo,
    },
    // ----------------------个人中心
    {
      path: '/personal/info',
      name: '个人信息',
      component: info,
    },
    {
      path: '/personal/salary',
      name: '薪资结算',
      component: salary,
    },
    {
      path: '/personal/cooperation',
      name: '合作协议',
      component: cooperation,
    },
    {
      path: '/personal/internship',
      name: '实习证明',
      component: internship,
    },
    {
      path: '/personal/HBapplication',
      name: '手写板申请',
      component: HBapplication,
    },
    // {
    //   path: '/personal/changePassword',
    //   name: '修改密码',
    //   component: changePassword,
    // },
  ]
});

Vue.use(Router);
