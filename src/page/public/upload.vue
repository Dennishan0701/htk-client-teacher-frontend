<template>
  <div class="upload-content">
    <div class="upload-tab">
      <div class="upload-tab-item"
           @click="tabChange($index)"
           v-for="(item,$index) in tabList"
           :class="{active:$index == tabIndex}">
        <span>{{ item.title }}</span>
        <i></i>
      </div>
    </div>
    <div class="upload-list">
      <div class="table-main" v-if="coursewareHave">
        <!-- 文件夹列表 start -->
        <div class="item folder-list"
             :class="{ open : folderIndex == index }"
             v-for="(folder,index) in coursewareDirList">
          <div class="item-folder">
            <div class="item-detail">
              <div class="item-title" @click="openFolder(index,folder)">
                <i class="item-arrow"></i>
                <i class="item-type folder"></i>
                <p>{{ folder.coursewareDirName }}</p>
              </div>
            </div>
            <div class="item-time">
              <span>{{ moment(folder.updateTime).format("YYYY-MM-DD H:mm") }}</span>
            </div>
          </div>
          <!-- 文件夹内文件 -->
          <div class="item-null" v-if="folder.coursewareList.length == 0">空</div>
          <div class="item-folder-file" v-else>
            <div class="item-file"
                 v-for="(file,$index) in folder.coursewareList"
                 :class="{active: selectIndex2 == `${index}-${$index}`}"
                 @click="coursewareSelect(`${index}-${$index}`,'in')"
                 @dblclick="openCourseware(file,$index)">
              <div class="item-detail">
                <div class="item-title" style="padding-left: 32px;">
                  <i :class="fileImg(file.coursewareName)" class="item-type"></i>
                  <p>{{ file.coursewareName }}</p>
                </div>
                <div class="item-loading" v-if="file.converStatus === 1">
                  <i title="删除" class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                  <span><Icon type="load-c"></Icon>转码中</span>
                </div>
                <div class="item-error" v-else-if="file.converStatus === 3">
                  <i title="删除" class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                  <span>转码失败</span>
                </div>
              </div>
              <div class="item-time">
                <span>{{ moment(file.updateTime).format("YYYY-MM-DD HH:mm") }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 文件夹列表 end -->
        <!-- 文件列表 start -->
        <div class="item" v-for="(file,$index) in coursewareList">
          <div class="item-file"
               :class="{active: selectIndex1 == $index}"
               @click="coursewareSelect($index,'out')"
               @dblclick="openCourseware(file,$index)">
            <div class="item-detail">
              <div class="item-title" style="padding-left: 11px;">
                <i :class="fileImg(file.coursewareName)" class="item-type"></i>
                <p>{{ file.coursewareName }}</p>
              </div>
              <div class="item-uploading" v-if="file.converStatus === 0">
                <Progress :percent="percent" status="active" :stroke-width="6"></Progress>
              </div>
              <div class="item-loading" v-else-if="file.converStatus === 1">
                <i title="删除" class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                <span><Icon type="load-c"></Icon>转码中</span>
              </div>
              <div class="item-error" v-else-if="file.converStatus === 3">
                <i title="删除" class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                <span>转码失败</span>
              </div>
            </div>
            <div class="item-time">
              <span>{{ moment(file.updateTime).format("YYYY-MM-DD HH:mm") }}</span>
            </div>
          </div>
        </div>
        <!-- 文件列表 end -->
      </div>
      <div class="courseListNull tip-null" v-else>
        <img src="../../assets/teacher/ai.png" alt="null">
        <span class="tip-null-text" style="font-size: 16px;color: #8d8d8d;">没有课件~</span>
      </div>
    </div>
    <div class="upload-btn" v-if="tabIndex === 0">
      <Upload :action="api+uploadFileUrl"
              :headers="{token : token}"
              :show-upload-list="false"
              :max-size="102400"
              :data="{isOriginalFile: 0,isPageRequest: 1}"
              name="originalFile"
              :before-upload="handleUpload"
              :on-progress="uploadProgress"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :on-exceeded-size="uploadExceeded"
              :format="['ppt','pptx','doc','docx','pdf','png','jpg','jpeg']"
              :on-format-error="formatError"
              v-if="device != 'mac'">
              <!--v-if="device == 'web'">-->
        <Button type="primary" style="width: 120px;height: 30px;">上传课件</Button>
      </Upload>
      <Button type="primary" style="width: 120px;height: 30px;" v-else @click="uploadPc">上传课件</Button>
    </div>

    <!-- 删除文件弹窗 -->
    <Modal v-model="deleteWindow" width="380" class="coursewareWindowContent"  :closable="false">
      <p slot="header">
        <span>课件删除</span>
        <span @click="closeDeleteWindow">
          <Icon type="close-round" class="close"></Icon>
        </span>

      </p>
      <div class="deleteMain">
        <p>确定删除课件？</p>
      </div>
      <div slot="footer">
        <Button type="primary" @click="sumbitDelete">确认</Button>
        <Button type="primary" style="margin-right: 30px;" @click="closeDeleteWindow">返回</Button>
      </div>
    </Modal>

    <!-- 继续上传弹窗 -->
    <Modal v-model="continueWindow" width="380" class="coursewareWindowContent"  :closable="false">
      <p slot="header">
        <span>上传提示</span>
        <span @click="closeContinueWindow">
          <Icon type="close-round" class="close"></Icon>
        </span>
      </p>
      <div class="deleteMain">
        <p>文件大于30M(30720kb)速度较慢，是否继续上传？</p>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-right: 30px;" @click="uploadContinue">确认</Button>
        <Button type="primary" @click="closeContinueWindow">返回</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import apiBase from '@/common/js/api.config'
  const token = sessionStorage.getItem('token');
  const device = sessionStorage.getItem('device');
  let websocket = null;

  export default{
    data () {
      return {
        percent: 0,
        tabList:[
          {title:'我的课件'},
          {title:'课件库'},
        ],
        tabIndex:0,
        deleteIndex: 0, //删除文件下标
        deleteWindow:false, //删除文件弹窗
        deleteUuid:null, //删除文件ID
        coursewareListUrl:this.$store.state.coursewareList,
        deleteCoursewareUrl:this.$store.state.deleteCoursewareByJson,
        uploadFileUrl:this.$store.state.coursewareUploadFile,
        coursewareDirList:[], //文件夹列表
        coursewareList:[], //文件列表
        folderIndex:null, //打开文件夹
        selectIndex1:null, //文件选中下标
        selectIndex2:null, //文件夹内文件选中下标
        token: token,
        device: device,
        api: apiBase(),
        coursewareHave:true,
        continueWindow:false, //文件大于30M提示弹窗
        file:null, //上传的文件
      }
    },
    mounted () {
      this.getCourseware();

      let methods =  window._client_user_web_methods_;
      Object.assign(methods, {
        classUploadPercent: (res) => {
          let args = JSON.parse(res["args"]);
          this.percent = args.percent
          this.coursewareHave = true;
          if(this.coursewareList.length) {
            if(this.coursewareList[0].converStatus === 0) {
              return false
            }
          }
          this.coursewareList.unshift({
            converStatus: 0,
            coursewareName: args.fileName,
            updateTime: new Date().getTime(),
          });
        }
      });
    },
    methods: {
      tabChange(index) {
        this.tabIndex = index;
        if(index === 0) {
          this.getCourseware ();
        } else {
          this.coursewareShow()
        }
      },
      getCourseware () { //获取课件列表
        this.$axios.get(this.coursewareListUrl).then(res => {
          let data = res.data.data;
          this.coursewareShow(data.coursewareList,data.coursewareDirList);
          const args = '{ "requesttype" : 15 ,"type" : "courseware"}';
          sendData(args);
        })
      },
      coursewareShow (coursewareList=[],coursewareDirList=[]) { //课件展示
        this.coursewareDirList = coursewareDirList;
        this.coursewareList = coursewareList;
        let arr = [];
        setTimeout(() => {this.$Message.destroy()},1000);
        if(!coursewareList.length && !coursewareDirList.length) {
          this.coursewareHave = false;
        } else {
          this.coursewareHave = true;

          for(let item of coursewareDirList) {
            for(let file of item.coursewareList) {
              if(file.converStatus === 1) {
                arr.push(1);
                break
              } else {
                arr.push(2);
              }
            }
          }

          for(let file of coursewareList) {
            if(file.converStatus === 1) {
              arr.push(1);
              break
            } else {
              arr.push(2);
            }
          }

          if(websocket) {
            if(!arr.includes(1)) {
              console.log('close')
              websocket.close();
              websocket = null;
            } else {
              this.sse();
            }
          }
        }
      },
      openFolder (index) { //打开文件夹
        if( index != this.folderIndex) {
          this.folderIndex = index;
        } else {
          this.folderIndex = null;
        }
      },
      fileImg (name) { //文件后缀
        if(name) {
          let suffixIndex = name.lastIndexOf(".");
          let nameLength = name.length;
          let suffix = name.substring(suffixIndex+1,nameLength);
          return suffix.toLowerCase();
        }
      },
      deleteBtn (id) { //删除文件
        this.deleteWindow = true;
        this.deleteUuid = id;
      },
      closeDeleteWindow () {  //关闭删除文件弹窗
        this.deleteWindow = false;
        this.deleteUuid = null;
      },
      sumbitDelete () {  //确认删除
        this.$axios.post(this.deleteCoursewareUrl,{
          coursewareUuid: this.deleteUuid
        }).then(res => {
          this.$Message.success('删除成功');
          let args = `{
            "messageid": ${this.deleteIndex},
            "jscallback": "callbackfn",
            "courseid": "${this.deleteUuid}",
            "operatortype": 1
          }`;
          sendData(args);
          this.getCourseware ();
          this.closeDeleteWindow ();
        })
      },
      sse () {
        if(!websocket){
          const that = this;
          if ('WebSocket' in window) {
            websocket = new WebSocket(this.$store.state.socket2 + "?token=" + token + "&type=1");
            console.log('WebSocket开始连接')
          }
          else {
            this.$Notice.error({
              title: '当前浏览器不支持websocket长连接',
              desc: '',
              duration:2,
            });
          }
          //连接发生错误的回调方法
          websocket.onerror = function () {
            console.log('WebSocket连接发生错误');
          };
          //连接成功建立的回调方法
          websocket.onopen = function (event) {
            console.log('WebSocket连接成功');
          }
          //接收到消息的回调方法
          websocket.onmessage = function (event) {
            if(event.data == 3){
              that.$Notice.error({
                title: '课件自动转换失败',
                desc: '请手动转换pdf格式再上传，或检查网络后重试！转换地址：' +
                '<span onclick="copyText()" style="cursor: pointer">https://smallpdf.com/cn</span>' +
                '<input id="copyText" type="text" value="https://smallpdf.com/cn" style="opacity: 0;position: absolute;z-index: -99;top: -9999px;">',
                duration:0,
              });
              that.getCourseware();
            } else {
              that.getCourseware();
            }
          }
          //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
          window.onbeforeunload = function () {
            websocket.close();
          }
        }
      },
      handleUpload (file) { //文件上传之前
        this.sse ();

        if(this.coursewareList.length) {
          if(this.coursewareList[0].converStatus === 0) {
            this.$Message.error('请等待文件上传完成')
            return false
          }
        }

        if(file.size > 31457280 && file.size < 104857600) { //大于30M小于100M
          this.file = file;
          this.continueWindow = true;
          return false;
        }
      },
      uploadContinue() { //继续上传
        this.continueWindow = false;
        let formData = new FormData();
        formData.append('originalFile',this.file);
        formData.append('isOriginalFile',0);
        formData.append('isPageRequest',1);
        this.$axios({
          url: this.uploadFileUrl,
          method:'post',
          data: formData,
          timeout: 600000,
          loading: false,
          onUploadProgress: progressEvent => { //原生获取上传进度的事件
            if(progressEvent.lengthComputable){
              let percent = progressEvent.loaded / progressEvent.total * 100
              this.uploadProgress({percent: percent},this.file);
            }
          },
        }).then(response => {
          this.uploadSuccess(response.data)
        }).catch(error => {
          this.getCourseware();
        })
      },
      closeContinueWindow() { //停止上传
        this.continueWindow = false;
      },
      uploadProgress (event, file, fileList) { //文件上传中
        this.coursewareHave = true;
        this.percent = Math.min(99,Math.floor(event.percent))

        if(this.coursewareList.length) {
          if(this.coursewareList[0].converStatus === 0) {
            return false
          }
        }
        this.coursewareList.unshift({
          converStatus: 0,
          coursewareName: file.name,
          updateTime: new Date().getTime(),
        });

      },
      uploadSuccess (response, file, fileList) { //文件上传成功
        this.$Message.destroy();
        if(response.code !== 0) {
          this.$Notice.error({
            title: response.message,
            duration:2,
          });
          this.getCourseware();
        } else {
          this.$Message.success('上传成功')
        }
      },
      uploadError (error, file, fileList) { //文件上传失败
        this.$Message.destroy();
        this.$Notice.error({
          title: error.message,
          duration:2,
        });
        this.getCourseware();
      },

      formatError() {  //不支持上传类型
        this.$Message.destroy();
        this.$Notice.error({
          title: '不支持的文件类型',
          desc: '仅支持pdf、ppt、pptx、doc、docx、png、jpg、jpeg',
          duration:5,
        });
      },

      uploadExceeded() {
        this.$Notice.error({
          title: '课件过大',
          desc: '您的课件超过100M，请手动转换pdf格式再上传！转换地址：' +
          '<span onclick="copyText()" style="cursor: pointer;color: #2D8cF0;">https://smallpdf.com/cn</span>' +
          '<input id="copyText" type="text" value="https://smallpdf.com/cn" style="opacity: 0;position: absolute;z-index: -99;top: -9999px;">',
          duration:0,
        });
      },

      uploadPc () {  //c++上传
        this.sse();
        let args = '{"requesttype":12,"jscallback" : "callbackfn","messageid" :"0","data" : {}}';
        sendData(args);
      },

      openCourseware (file,index) {
        if(file.converStatus !== 2) {
          this.$Message.destroy();
          this.$Message.error('课件未转码完成')
        } else {
          let args = `{
            "requesttype": 8,
            "messageid": ${index},
            "jscallback": "callbackfn",
            "data": {
              "courseid": "${file.coursewareUuid}",
              "coursewareUuid": "${file.coursewareUuid}",
              "coursewareName": "${file.coursewareName}",
              "operatortype": 0
            }
          }`;
          sendData(args);
        }
      },
      coursewareSelect(index,type) {
        if(type == 'in') {
          this.selectIndex2 = index;
          this.selectIndex1 = null;
        } else {
          this.selectIndex1 = index;
          this.selectIndex2 = null;
        }
      },
    }
  }
</script>
<style lang="less">
.uploadContent{
  width: 100%;
  height: 100%;
}
  .upload-content{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .upload-tab{
      height: 44px;
      padding-top: 13px;
      display: flex;
      background-color: #f6f6f6;
      border-bottom: 1px solid #d0d0d0;
      .upload-tab-item{
        height: 29px;
        text-align: center;
        position: relative;
        line-height: 29px;
        color: #727a89;
        flex: 5;
        cursor: pointer;
        transition: color .3s;
        i{
          position: absolute;
          bottom: -2px;
          width: 0;
          transition: width .3s;
          height: 1px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #5e85c8;
        }
        &:first-child{
          border-right: 1px solid #d0d0d0;
        }
        &.active{
          color: #5e85c8;
          &:after{
            border-bottom: 6px solid #5e85c8;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
            content: '';
            position: absolute;
            bottom: -2px;
            left: 50%;
            margin-left: -3.5px;
          }
          i{
            width: 100%;
          }
        }
      }
    }
    .upload-list{
      flex: 5;
      background-color: #fff;
      display: flex;
      .table-main{
        overflow-y: auto;
        flex: 5;
        background-color: #fff;
        .item{
          display: flex;
          flex-direction: column;
          position: relative;
          padding: 5px 0;
          &:after{
            content: '';
            width: 92%;
            height: 1px;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            background: #eff3f9;
          }
          .item-folder{
            display: flex;
            font-size: 12px;
            padding: 0 4%;
            &:hover{
              background-color: rgba(94,133,200,.15);
            }
          }
          .item-folder-file{
            padding: 5px 0 0;
            display: none;
            flex-direction: column;
          }
          .item-file{
            display: flex;
            flex: 5;
            padding: 0 4%;
            font-size: 12px;
            &:hover{
              background-color: rgba(94,133,200,.15);
            }
            &.active{
              background-color: rgba(94,133,200,.15);
            }
          }
          .item-detail{
            width: 75%;
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            display: flex;
            flex-wrap: nowrap;
            .item-title {
              display: flex;
              flex-wrap: nowrap;
              flex: 5;
              width: 70%;
              cursor: pointer;
              .item-arrow{
                border-left: 6px solid #c5c5c5;
                border-bottom: 4px solid transparent;
                border-top: 4px solid transparent;
                width: 0;
                height: 0;
                display: block;
                margin-top: 8px;
                margin-right: 5px;
                transition: transform .2s;
              }
              .item-type{
                margin-top: 4px;
                margin-right: 5px;
                display: block;
                width: 15px;
                height: 16px;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100% 100%;
                &.folder{
                  width: 16px;
                  height: 14px;
                  margin-top: 5px;
                  background-image: url("../../assets/teacher/courseware/folder2.png");
                }
                &.ppt,&.pptx{
                  background-image: url("../../assets/teacher/courseware/ppt2.png");
                }
                &.pdf{
                  background-image: url("../../assets/teacher/courseware/PDF2.png");
                }
                &.doc,&.docx{
                  background-image: url("../../assets/teacher/courseware/word2.png");
                }
                &.jpg,&.jpeg,&.png{
                  background-image: url("../../assets/teacher/courseware/img2.png");
                }
              }
              p{
                flex: 5;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 24px;
              }
            }
            .item-button,.item-loading,.item-error,.item-uploading{
              display: flex;
              width: 30%;
              flex-direction: row-reverse;
              overflow: hidden;
              line-height: 24px;
              font-size: 10px;
              .ivu-progress-show-info .ivu-progress-outer {
                padding-right: 35px;
                margin-right: -35px;
              }
              .item-delete{
                margin-left: 5px;
                font-size: 14px;
                cursor: pointer;
                &:active{
                  transform: scale(.95);
                }
                &:hover{
                  color: #5e85c8;
                }
              }
            }
            .item-error{
              span{
                color: #da7194;
                background: url("../../assets/teacher/courseware/error2.png") no-repeat left center;
                padding-left: 13px;
              }
            }
            .item-loading{
              span{
                color: #5e85c8;
                i{
                  margin-right: 2px;
                  animation: turn 1s linear infinite;
                }
              }
            }
          }
          .item-time{
            width: 25%;
            text-align: center;
            line-height: 25px;
            font-size: 10px;
          }
          .item-null{
            align-items: center;
            justify-content: center;
            height: 42px;
            display: none;
          }
          &.open{
            .item-folder{
              background-color: #5e85c8;
              color: #fff;
              .item-arrow{
                transform: rotate(90deg);
                border-left: 8px solid #fff !important;
                transform-origin: 50%;
              }
              .item-delete{
                color: #fff !important;
              }
            }
            .item-null,.item-folder-file{
              display: flex;
            }
          }
        }
      }
    }
    .upload-btn{
      text-align: center;
      padding: 20px 0;
      background: #f6f6f6;
    }
  }
  @keyframes turn {
    from{transform: rotate(0)}
    to{transform: rotate(360deg)}
  }
  .coursewareWindowContent{
    .ivu-modal-body{
      padding: 5px 0 !important;
      .moveMain{
        height: 280px;
        overflow-y: auto;
        line-height: 34px;
        li{
          padding-left: 53px;
          padding-right: 10px;
          margin: 1px 0;
          cursor: pointer;
          background: url("../../assets/teacher/courseware/folder.png") no-repeat 20px center;
          &:hover{
            background-color: rgba(94,133,200,.15);
          }
          &.select{
            background-color: #5e85c8;
            color: #fff;
          }
        }
      }
    }
    .deleteMain{
      text-align: center;
      padding: 30px 0;
    }
  }
</style>
