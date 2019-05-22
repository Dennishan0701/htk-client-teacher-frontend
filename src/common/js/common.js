/**
 *
 * 《嗨课堂客户端公共方法》
 *
 * 版本 v2.0
 * 作者 Binhang Luo
 * 时间 2018.2
 *
 */
import Vue from 'vue';
import { Notice,Message,Modal,Spin } from 'iview';
import apiBase from './api.config';
import axios from "axios";
import qs from "qs";
import stores from "../../store/store";
import Moment from 'moment';

/*
 *
 * 封装moment.js
 * 日期处理函数
 * 12.4KB
 *
 * */
Moment.locale('zh-cn');
Vue.prototype.moment = Moment;


/*
 *
 * 封装获取URL参数
 *
 * */

export function GetQueryString (name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null)return  unescape(r[2]); return null;
}




/*
*
* AXIOS封装
*
* */

let AJAX_NUM = 0;
const token = sessionStorage.getItem('token');
const Axios = axios.create({
  baseURL: apiBase('api'),
  timeout: 30000,
  responseType: "json",
  withCredentials: true, // 允许带cookie
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  },
  loading:true,
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
  config => {
    // 未登录(本地测试使用)
    if ( !token ) {

      window.location.href = '../../static/login.html';

    } else {

      // 若是有做鉴权token , 就给头部带上token
      config.headers.token = token;

    }

      //loading显示
    if( config.loading ) {

      AJAX_NUM++;
      stores.dispatch('FETCH_LOADING','true');

    }

      // if (
      //   config.method === "post" ||
      //   config.method === "put" ||
      //   config.method === "delete"
      // ) {
      //   // 序列化
      //   config.data = qs.stringify(config.data);
      // }

    return config;

  },
  error => {

    Notice.error({
      title: res.data.message,
      desc: '',
      duration:2,
    });

    return Promise.reject(error.data.message);
  }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
  res => {

    //loading隐藏
    AJAX_NUM--;

    if(AJAX_NUM <= 0){
      AJAX_NUM = 0;
      stores.dispatch('FETCH_LOADING', 'false');
    }

    if (res.data.code !== 0) {

      Notice.error({
        title: res.data.message,
        duration:2,
      });

      return Promise.reject(res.data.message);

    } else {

      return res;

    }

  },
  error => {

    AJAX_NUM = 0;

    stores.dispatch('FETCH_LOADING', 'false');

    Notice.error({
      title: '网络异常 '+ error,
      desc: '请检查网络，或者稍后刷新重试',
      duration:5,
    });

    //调用C++404页面
    if(location.hash !== '#/upload') {
      let args = '{"requesttype":33,"data" : {}}';
      sendData(args);
    }

    return Promise.reject(error);
  }
);
Vue.prototype.$axios = Axios;


/*
*
* C++外部调用函数
*
* */

window._client_user_web_methods_ = {
  uploadProgess (res) {   //c++调用上传课件回调
    let as = JSON.parse(res["args"]).state;
    if (as == 0) {            //c++调用上传中
      // Message.loading({
      //   content: '正在上传中...',
      //   duration: 0
      // });
    } else if ( as == 1 ) {  //c++调用上传成功
      Message.destroy();
      Message.success('上传成功');
    } else if ( as == 2 ) {  //c++调用上传失败
      Message.destroy();
      Notice.error({
        title: '课件上传失败',
        desc: '请手动转换pdf格式再上传，或检查网络后重试！转换地址：' +
        '<span onclick="copyText()" style="cursor: pointer;color: #2D8cF0;">https://smallpdf.com/cn</span>' +
        '<input id="copyText" type="text" value="https://smallpdf.com/cn" style="opacity: 0;position: absolute;z-index: -99;top: -9999px;">',
        duration:0,
      });
    } else if ( as == 3 ) {  //c++调用上传失败
      Message.destroy();
      Notice.error({
        title: '课件过大',
        desc: '您的课件超过30M，请手动转换pdf格式再上传！转换地址：' +
        '<span onclick="copyText()" style="cursor: pointer;color: #2D8cF0;">https://smallpdf.com/cn</span>' +
        '<input id="copyText" type="text" value="https://smallpdf.com/cn" style="opacity: 0;position: absolute;z-index: -99;top: -9999px;">',
        duration:0,
      });
    }
  },
  refresh () {
    window.location.reload();
  },
  copyText () {
    let ele = document.getElementById("copyText");
    ele.select();
    document.execCommand("Copy");
    Message.destroy();
    Message.info('链接复制成功');
  },
};



/*
 *
 * 获取当前时间戳
 *
 * */

export function timestamp(){

  return new Promise((resolve, reject) => {
    Axios.get(stores.state.timestamp,{ loading:false }).then( res => {
      let timeDifference = (new Date().getTimezoneOffset() + 480) * 60000;
      let timestamp = res.data.data.serverTime + timeDifference;
      let date = Moment(timestamp);
      let time = {
        timestamp : timestamp,
        date : date,
        year : date.year(),
        month : date.month() + 1,
        week : date.week(),
        day : date.date(),
        hour : date.hour(),
        minute : date.minute(),
        second : date.second(),
        dateISO : date.format('YYYY-MM-DD'),
        weekInMonth : date.week() - Moment(date.format('YYYY-MM')+'-01').week()
      };
      resolve(time);
    });
  });

}

/*
 *
 * 秒转时分秒
 *
 * */

export function forMatTime(j) {
  var ex = Math.ceil(j),
    g = Math.floor(ex / 3600),
    d = Math.floor(ex / 60) % 60,
    f = ex % 60,
    k = (d > 9 ? d : "0" + d) + ":" + (f > 9 ? f : "0" + f),
    q = (g > 9 ? g : "0" + g) + ":" + k;

  return q;
}
