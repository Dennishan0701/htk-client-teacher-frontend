<template>
  <div class="myCourseware-content">
    <div class="myCourseware-title commonTitle">
      <div class="myCourseware-title-main commonTitleMain">
        <h2>我的课件</h2>
        <div class="myCourseware-title-button">
          <Input
            v-model="search"
            icon="ios-search"
            placeholder="请输入文件名"
            @on-keyup="searchFile"
            style="width: 154px"></Input>
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
            <Button type="primary" style="width: 70px;">上传</Button>
          </Upload>
          <Button type="primary" style="width: 70px;" v-else  @click="uploadPc">上传</Button>
          <Button type="primary" style="width: 90px;" @click="creatFolder">新建文件夹</Button>
          <div class="downloadBtn" @click="downloadWindow" :class="{ 'noHave':!downloadHave }">
            <i class="icon iconfont icon-xiazai1"></i>
            <span v-if="downloadNumShow">{{downloadNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="myCourseware-main">
      <div class="card">
        <div class="table">
          <div class="table-title">
            <p class="table-title-filename">文件名</p>
            <p class="table-title-time"><span>更新时间</span></p>
          </div>
          <div class="table-main" v-if="coursewareHave">
            <!-- 新建文件夹 start -->
            <div class="newFolder item" v-show="newFolderShow">
              <div class="item-folder">
                <div class="item-detail">
                  <div class="item-title">
                    <i class="item-arrow"></i>
                    <i class="item-type folder"></i>
                    <Input v-model="newFolderText"
                           style="width: 150px"
                           @on-blur="submitFolder"
                           @on-enter="submitFolder"
                           :maxlength="30"
                           :autofocus="true"
                           class="new-folder"></Input>
                  </div>
                </div>
                <div class="item-time">
                  <span>-</span>
                </div>
              </div>
            </div>
            <!-- 新建文件夹 end -->
            <!-- 文件夹列表 start -->
            <div class="item folder-list"
                 :class="{ open : folderIndex == index }"
                 v-for="(folder,index) in coursewareDirList">
              <div class="item-folder">
                <div class="item-detail">
                  <div class="item-title" @click="openFolder(index,folder)">
                    <i class="item-arrow"></i>
                    <i class="item-type folder"></i>
                    <p v-if="renameIndex !== index">{{ folder.coursewareDirName }}</p>
                    <Input v-model="renameFolderText"
                           v-else
                           style="width: 150px"
                           @on-blur="submitRenameFolder"
                           @on-enter="submitRenameFolder"
                           :maxlength="30"
                           :autofocus="true"
                           class="rename-folder"></Input>
                  </div>
                  <div class="item-button">
                    <i title='删除文件夹' class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(folder.coursewareDirUuid,'folder')"></i>
                    <i title='重命名' class="item-rename" @click="renameFolder(index,folder)"></i>
                  </div>
                </div>
                <div class="item-time">
                  <span>{{ moment(folder.updateTime).format("YYYY-MM-DD H:mm") }}</span>
                </div>
              </div>
              <!-- 文件夹内文件 -->
              <div class="item-null" v-if="folder.coursewareList.length == 0">空</div>
              <div class="item-file" v-else v-for="(file,$index) in folder.coursewareList">
                <div class="item-detail">
                  <div class="item-title" style="padding-left: 50px;">
                    <i :class="fileImg(file.coursewareName)" class="item-type"></i>
                    <p>{{ file.coursewareName }}</p>
                  </div>
                  <div class="item-loading" v-if="file.converStatus === 1">
                    <i class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                    <span><Icon type="load-c"></Icon>转码中</span>
                  </div>
                  <div class="item-button" v-else-if="file.converStatus === 2">
                    <i title='删除' class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                    <i title='移动到文件夹' class="icon iconfont icon-yiruwenjianjia item-remove" @click="removeFileBtn(file.coursewareUuid)"></i>
                    <i title='预览' class="icon iconfont icon-plus-preview item-preview" @click="coursewarePreview(file.coursewareUuid)"></i>
                    <a title='下载' class="icon iconfont icon-xiazai item-download" v-if="device != 'mac' && file.coursewareUrl" :href="file.coursewareUrl" :download="file.coursewareName"></a>
                    <i title='下载' class="icon iconfont icon-xiazai item-download" v-else-if="file.coursewareUrl" @click="macDownload(file.coursewareUrl)"></i>
                  </div>
                  <div class="item-error" v-else-if="file.converStatus === 3">
                    <i class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                    <span>转码失败</span>
                  </div>
                </div>
                <div class="item-time">
                  <span>{{ moment(file.updateTime).format("YYYY-MM-DD HH:mm") }}</span>
                </div>
              </div>
            </div>
            <!-- 文件夹列表 end -->
            <!-- 文件列表 start -->
            <div class="item" v-for="(file,$index) in coursewareList">
              <div class="item-file">
                <div class="item-detail">
                  <div class="item-title" style="padding-left: 23px;">
                    <i title='删除' :class="fileImg(file.coursewareName)" class="item-type"></i>
                    <p>{{ file.coursewareName }}</p>
                  </div>
                  <div class="item-uploading" v-if="file.converStatus === 0">
                    <Progress :percent="percent" status="active"></Progress>
                  </div>
                  <div class="item-loading" v-else-if="file.converStatus === 1">
                    <i class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                    <span><Icon type="load-c"></Icon>转码中</span>
                  </div>
                  <div class="item-button" v-else-if="file.converStatus === 2">
                    <i title='删除' class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
                    <i title='移动到文件夹' class="icon iconfont icon-yiruwenjianjia item-remove" @click="removeFileBtn(file.coursewareUuid)"></i>
                    <i title='预览' class="icon iconfont icon-plus-preview item-preview" @click="coursewarePreview(file.coursewareUuid)"></i>
                    <a title='下载' class="icon iconfont icon-xiazai item-download" v-if="device != 'mac' && file.coursewareUrl" :href="file.coursewareUrl" :download="file.coursewareName"></a>
                    <i title='下载' class="icon iconfont icon-xiazai item-download" v-else-if="file.coursewareUrl" @click="macDownload(file.coursewareUrl)"></i>
                  </div>
                  <div class="item-error" v-else-if="file.converStatus === 3">
                    <i title='删除' class="icon iconfont icon-shanchu item-delete" @click="deleteBtn(file.coursewareUuid,'file')"></i>
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
            <span class="tip-null-text" style="font-size: 16px;color: #8d8d8d;">你的课件中，没有相应内容哦~</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 移动文件夹弹窗 -->
    <Modal v-model="moveWindow" width="380" class="coursewareWindowContent" :closable="false">
      <p slot="header">
        <span>移动到文件夹</span>
        <span @click="closeMoveWindow">
          <Icon type="close-round" class="close"></Icon>
        </span>
      </p>
      <div class="moveMain">
        <ul>
          <li :class="{ select : moveFolderSelectIndex === '' }"
              @dblclick="moveFile"
              @click="selectMoveFolder('','')">我的课件</li>
          <li v-for="(folder,index) in coursewareDirList"
              :class="{ select : moveFolderSelectIndex === index }"
              @dblclick="moveFile"
              @click="selectMoveFolder(folder.coursewareDirUuid,index)">{{ folder.coursewareDirName }}</li>
        </ul>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-right: 30px;" @click="moveFile" :disabled="moveFileBtn">确认</Button>
        <Button type="primary" @click="closeMoveWindow">返回</Button>
      </div>
    </Modal>
    <!-- 删除文件弹窗 -->
    <Modal v-model="deleteWindow" width="380" class="coursewareWindowContent"  :closable="false">
      <p slot="header">
        <span>{{ deleteTipTitle }}</span>
        <span @click="closeDeleteWindow">
          <Icon type="close-round" class="close"></Icon>
        </span>
      </p>
      <div class="deleteMain">
        <p>{{ deleteTipText }}</p>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-right: 30px;" @click="sumbitDelete">确认</Button>
        <Button type="primary" @click="closeDeleteWindow">返回</Button>
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

    <div class="previewWarpper" v-show="previewShow">
      <div class="coursewareImgClose" @click="coursewareImgClose()"></div>
      <div class="previewContent" v-html="iframe"></div>
    </div>
  </div>
</template>
<script>
  import apiBase from '@/common/js/api.config'
  const token = sessionStorage.getItem('token');
  const device = sessionStorage.getItem('device');
  let websocket = null;
  const body = document.querySelector('body');

  export default {
    data () {
      return {
        percent: 0,
        downloadNum:0, //下载数量
        downloadNumShow:false, //是否显示下载数量
        downloadHave:false, //是否含有下载文件
        search: "", //搜索框
        moveWindow:false, //移动文件弹窗
        moveFolderSelectId: null, //选中移动文件夹ID
        moveFolderSelectIndex: null, //选中移动文件夹下标
        moveFileBtn:true, //移动确认按钮
        deleteWindow:false, //删除文件弹窗
        deleteUuid:null, //删除文件ID
        deleteType:'', //删除类型
        newFolderText: "新建文件夹", //新建文件夹名
        newFolderShow: false, //新建文件
        saveDirUrl:this.$store.state.saveDir,
        moveCoursewareUrl:this.$store.state.moveCourseware,
        coursewareListUrl:this.$store.state.coursewareList,
        deleteDirAndCoursewareUrl:this.$store.state.deleteDirAndCourseware,
        deleteCoursewareUrl:this.$store.state.deleteCoursewareByJson,
        updateDirUrl:this.$store.state.updateDir,
        uploadFileUrl:this.$store.state.coursewareUploadFile,
        findByNameUrl:this.$store.state.findByName,
        coursewareDirList:[], //文件夹列表
        coursewareList:[], //文件列表
        folderIndex:null, //打开文件夹
        renameIndex:null, //重命名文件夹
        renameFolderText:'', //重命名文件名
        renameFolderUuid:null, //重命名文件ID
        previewShow:false, //预览窗口
        iframe:'', //预览网页
        token: token,
        device: device,
        api: apiBase(),
        coursewareHave:true,
        deleteTipTitle:'',
        deleteTipText:'',
        continueWindow:false, //文件大于30M提示弹窗
        file:null, //上传的文件
      }
    },
    mounted () {
      this.getCourseware();

      let args = `{"requesttype": 26, "data": {}}`;
      sendData(args);

      let methods =  window._client_user_web_methods_;
      Object.assign(methods, {
        getCourseware : () => {
          this.getCourseware();
        },
        downloadNum : (res) => {
          let args = JSON.parse(res["args"]);
          this.downloadNum = args.num;
          this.downloadNumShow = args.show;
          this.downloadHave = args.have;
        },
        uploadPercent: (res) => {
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
      searchFile () { //搜索
        if(this.search === '') {
          this.getCourseware ();
        } else {
          this.$axios.get(this.findByNameUrl,{
            params: {
              coursewareName: this.search,
            },
            loading: false,
          }).then( ({ data }) => {
            this.coursewareShow(data.data);
          })
        }
      },
      getCourseware () { //获取课件列表
        this.$axios.get(this.coursewareListUrl).then( ({ data }) => {
          let item = data.data;
          this.coursewareShow(item.coursewareList,item.coursewareDirList);
          let args = `{"requesttype": 15, "type": "courseware"}`;
          sendData(args);
        })
      },

      coursewareShow (coursewareList,coursewareDirList=[]) { //课件展示
        this.coursewareDirList = coursewareDirList;
        this.coursewareList = coursewareList;
        let arr = [];
        setTimeout(() => {this.$Message.destroy();},1000);
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
        if(this.renameIndex === null) {
          if( index != this.folderIndex) {
            this.folderIndex = index;
          } else {
            this.folderIndex = null;
          }
        } else {
          return false;
        }
      },
      creatFolder (){ //新建文件夹
        this.newFolderShow = true;
        this.coursewareHave = true;
        setTimeout(()=>{
          let newFolder = document.querySelector(".new-folder input");
          newFolder.select();
        },100);
      },
      submitFolder () { //确认创建文件夹（回车+失去焦点）
        if(this.newFolderShow) {
          this.$axios.post(this.saveDirUrl,{
            coursewareDirName: this.newFolderText,
          }).then(res => {
            this.newFolderShow = false;
            this.newFolderText = "新建文件夹";
            this.getCourseware();
          })
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
      removeFileBtn (fileId) { //移动文件夹按钮
        this.moveFildId = fileId;
        this.moveWindow = true;
      },
      selectMoveFolder (id,index) {  //选中要移动的文件夹
        this.moveFolderSelectId = id;
        this.moveFolderSelectIndex = index;
        this.moveFileBtn = false;
      },
      moveFile () {  //移动文件夹
        this.$axios.post(this.moveCoursewareUrl,{
          coursewareUuid: this.moveFildId,
          coursewareDirUuid:this.moveFolderSelectId,
        }).then(res => {
          this.closeMoveWindow();
          this.getCourseware();
        })
      },
      closeMoveWindow () {  //关闭移动文件夹弹窗
        this.moveWindow = false;
        this.moveFolderSelectId = null;
        this.moveFolderSelectIndex = null;
        this.moveFileBtn  = true;
      },
      deleteBtn (id,type) { //删除文件/文件夹
        this.deleteWindow = true;
        this.deleteUuid = id;
        this.deleteType = type;
        if(type == 'folder') {
          this.deleteTipTitle = '文件夹删除';
          this.deleteTipText = '确定删除文件夹？';
        } else if(type == 'file') {
          this.deleteTipTitle = '课件删除';
          this.deleteTipText = '确定删除课件？';
        }
      },
      closeDeleteWindow () {  //关闭删除文件夹弹窗
        this.deleteWindow = false;
        this.deleteUuid = null;
      },
      sumbitDelete () {  //确认删除
        let type = this.deleteType,url,data;
        if(type == 'folder') {
          url = this.deleteDirAndCoursewareUrl;
          data = { "coursewareDirUuid": this.deleteUuid };
        } else if(type == 'file') {
          url = this.deleteCoursewareUrl;
          data = { "coursewareUuid": this.deleteUuid };
        }
        this.$axios.post(url,data).then(res => {
          this.$Message.success('删除成功');
          this.closeDeleteWindow ();
          this.getCourseware ();
        })
      },
      renameFolder (index,{coursewareDirName,coursewareDirUuid}) { //文件夹重命名
        this.renameIndex = index;
        this.renameFolderText = coursewareDirName;
        this.renameFolderUuid = coursewareDirUuid;
        setTimeout(()=>{
          let renameFolder = document.querySelector(".rename-folder input");
          renameFolder.select();
        },100);
      },
      submitRenameFolder () {  //确认重命名
        if(this.renameIndex !== null) {
          this.$axios.post(this.updateDirUrl,{
            coursewareDirName: this.renameFolderText,
            coursewareDirUuid: this.renameFolderUuid,
          }).then(res => {
            this.renameIndex = null;
            this.$Message.success('重命名成功');
            this.getCourseware ();
          })
        }
      },
      coursewarePreview(uuid){ //预览课件
        this.iframe = '';
        this.previewShow = true;
        this.iframe = `<iframe src="../../static/preview.html?token=${token}&uuid=${uuid}"
                               id="iframe"
                               width="100%"
                               height="100%"
                               frameborder="no"
                               marginwidth="0"
                               marginheight="0"
                               scrolling="no"
                               allowtransparency="yes"
                               allowfullscreen="true"></iframe>`;
      },
      coursewareImgClose () {
        this.iframe = '';
        this.previewShow = false;
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
      uploadContinue() {  //继续上传
        this.continueWindow = false;
        let formData = new FormData();
        formData.append('originalFile',this.file);
        formData.append('isOriginalFile',0);
        formData.append('isPageRequest',1);
        this.$axios({
          url: this.uploadFileUrl,
          method:'post',
          timeout: 600000,
          data: formData,
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
      closeContinueWindow() {  //取消上传
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

      uploadPc () {  //c++上传
        this.sse();
        let args = `{
          "requesttype": 12,
          "jscallback": "callbackfn",
          "messageid": "0",
          "data" : {}
        }`;
        sendData(args);
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

      downloadWindow() {
        if(this.downloadHave) {
          this.downloadShow = !this.downloadShow;
          if(this.downloadShow) {
            let args = '{"requesttype":29,"data" : {}}';
            sendData(args);
            this.$nextTick(()=>{
              body.addEventListener('click', this.downloadWindowClose);
            })
          } else {
            body.removeEventListener('click', this.downloadWindowClose);
            let args = '{"requesttype":30,"data" : {}}';
            sendData(args);
          }
        }
      },

      downloadWindowClose(){
        body.removeEventListener('click', this.downloadWindowClose);
        let args = '{"requesttype":30,"data" : {}}';
        sendData(args);
        this.downloadShow = false;
      },

      macDownload (url) {
        let args = `{"requesttype":31,"data" : {"url":"${url}"}}`;
        sendData(args);
      },
    },
    destroyed () {
      if(device == 'mac') {
        let args = '{"requesttype":27,"data" : {}}';
        sendData(args);
      } else {
        let args = '{"requesttype":30,"data" : {}}';
        sendData(args);
      }
      document.querySelector('body').removeEventListener('click', this.downloadWindowClose);
    },
  }
</script>
<style lang="less">
@import "../../style/myCourseware.less";
</style>
