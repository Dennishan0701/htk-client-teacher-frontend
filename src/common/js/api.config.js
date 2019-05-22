
/**
 * Created by Binhang Luo on 2018/2/3.
 * API接口地址
 */

import store from '../../store/store';


/*
 *
 * @公共API
 *
 * API    客户端接口地址
 * webAPI websocket地址
 *
 * */

export default function apiBase(type) {
  let host = window.location.host,
    API = 'http://clienttest.haiketang.net',
    webAPI = "clienttest.haiketang.net";
  if(host === 'clteacher.onlyhi.cn' || host === 'clstudent.onlyhi.cn') {  //正式环境
    API = 'http://client.onlyhi.cn';
    webAPI = "client.onlyhi.cn";
  } else if(host === 'localhost:8085' || host === 'localhost:8086') {  //正式环境
    API = 'http://clienttest.haiketang.net';
    webAPI = "clienttest.haiketang.net";
  }
  let API_BASE_URL = type == 'webAPI'? webAPI : API;

  return API_BASE_URL;
}

export function apiBase2() {
  let host = window.location.host,
    API = 'https://getaway.onlyeduhi.cn';
  if(host === 'clteacher.onlyhi.cn' || host === 'clstudent.onlyhi.cn') {  //正式环境
    API = 'https://hkt.onlyhi.cn';
  } else if(host === 'localhost:8085' || host === 'localhost:8086') {  //正式环境
    API = 'https://getaway.onlyeduhi.cn';
  }

  return API;
}



//webSocket
store.state.socket = 'ws://'+ apiBase('webAPI') +':20027/ws'; //上传课件长连接
store.state.socket2 = 'ws://'+ apiBase('webAPI') +':20035/ws'; //上传课件长连接

//公共API
store.state.timestamp = '/common/serverTime'; //获取服务器时间戳
store.state.getCourseRoom = '/client/course/iosGetCourseRoom'; //进入房间
store.state.getUserPhone = '/client/user/getUserPhone'; //获取用户手机
store.state.getAuthCode = '/client/user/sendAuthCode'; //获取验证码
store.state.resetpsd = '/client/user/resetpsdByJson'; //重置密码
store.state.getAllProvince = '/common/getAllProvince'; //获取省
store.state.getCity = '/common/getCitysByProvinceCode'; //获取市
store.state.getArea = '/common/getDistrictsByCityCode'; //获取区
store.state.getSubject = '/common/getAllSubject'; //获取年级偏好






//教师端API
store.state.teacherClassInfo = '/client/home/teacherClassInfo'; //教师信息
store.state.teacherExpendClassTime = '/client/home/teacherExpendClassTime'; //教师剩余课时
store.state.teacherCourseRemindList = '/client/home/teacherCourseRemindList'; //教师课程提醒
store.state.teacherCourseV1List = '/client/teacher/noEndCourseV1List'; //教师1v1上课列表
store.state.teacherCourseList = '/client/teacher/noEndCourseList'; //教师1v多上课列表
store.state.teacherCourseRecordV1List = '/client/teacher/getCourseRecordV1List'; //教师1v1课程记录
store.state.teacherCourseRecordList = '/client/teacher/getCourseRecordList'; //教师1v多课程记录
store.state.getCoursewareListByJson = '/client/courseware/getCoursewareListByJson'; //教师获取课件列表
store.state.converByJson = '/client/courseware/converByJson'; //教师课件转码
store.state.deleteCoursewareByJson = '/client/courseware/deleteCoursewareByJson'; //教师删除课件
store.state.getSysCoursewareList = '/client/courseware/getSysCoursewareList'; //教师系统课件



//新教师端API
store.state.courseCalendar = '/teacher/courseCalendar'; //课程日历
store.state.dateCourseList = '/teacher/courseList'; //教师日历获取上课列表
store.state.teacherInfo = '/teacher/teacherInfo'; //教师日历获取上课列表
store.state.todayNoEndCourseList = '/teacher/todayNoEndCourseList'; //教师今天课程提醒
store.state.courseSchedule = '/teacher/courseSchedule'; //教师今天课程提醒
store.state.getNoEndCourseList = '/teacher/getNoEndCourseList'; //教师待上课程
store.state.freeTimeList = '/teacher/freeTimeList'; //获取空闲时间
store.state.saveFreeTime = '/teacher/saveFreeTime'; //保存空闲时间
store.state.saveFreeTimeTemplate = '/teacher/saveFreeTimeTemplate'; //保存空闲时间模板
store.state.getFreeTimeTemplate = '/teacher/getFreeTimeTemplate'; //获取空闲时间模板
store.state.info = '/teacher/info'; //教师信息
store.state.infoUploadFile = '/teacher/uploadFile'; //上传图片
store.state.infoSave = '/teacher/infoSaveByJson'; //保存教师信息
store.state.getSchool = '/teacher/getAllSchool'; //获取学校
store.state.getGrade = '/teacher/getAllGrade'; //获取年级
store.state.getGradePreference = '/teacher/getAllGradePreference'; //获取年级偏好
store.state.getCourseRecordList = '/teacher/getCourseRecordList'; //获取课程记录
store.state.getTabletApplication='/teacher/viewTabletApply';//获取手写板信息
store.state.saveTabletPostInfo="/teacher/saveTabletApply";// 申请手写板
store.state.saveDir="/courseware/saveDir";// 新建文件夹
store.state.moveCourseware="/courseware/moveCourseware";// 移动文件
store.state.coursewareList="/courseware/list";// 获取课件
store.state.deleteDirAndCourseware="/courseware/deleteDirAndCourseware";// 删除课件
store.state.updateDir="/courseware/updateDir";// 重命名文件夹
store.state.coursewareUploadFile="/courseware/uploadFile";// 上传文件
store.state.findByName="/courseware/findByName";// 课件搜索
store.state.viewTeacherAppraise = '/teacher/viewTeacherAppraise'; //教师查看反馈

store.state.getTrainingVideo = '/teacher/getTrainingVideo'; //教师查看反馈


//我要排课
store.state.getStudents = '/crm/course/course/client/getStudents'; //查询该老师的学生列表
store.state.arrangeCourse = '/crm/course/course/client/arrangeCourse'; //老师排课

// store.state.getStudents = '/course/getStudents'; //查询该老师的学生列表
// store.state.arrangeCourse = '/course/arrangeCourse'; //老师排课
//我要调课

store.state.getChangeRecord = '/crm/course/orderChangeRecord/client/getChangeRecord'; //获取调课次数
store.state.getStudentInfo = '/crm/course/course/client/getStudentInfo'; //查询该老师所对应的学生
store.state.getSubject = '/crm/course/course/client/getStudentSubject'; //根据学生获取对应老师所教科目
store.state.getCourseTime = '/crm/course/course/client/getCourseTime'; //根据学生电话科目获取该学生课程时间列表
store.state.adjustCourse = '/crm/course/course/client/adjustCourse'; //确认调课

