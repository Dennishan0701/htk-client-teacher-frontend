<template>
  <Modal v-model="bulletinBoard" width="811" class-name="vertical-center-modal" :transfer="false" :mask-closable="false" :closable="false">
    <p slot="header">
      <span>我的消息</span>
      <i class="close" @click="close">
        <Icon type="close-round"></Icon>
      </i>
    </p>
    <div class="bulletinBoardMoudel">
      <div class="bb-content">
        <div class="bb-header">
          <div class="bb-nav"
               v-for="(item,$index) in bbHeader"
               :class="{active:$index == bbHeaderActive}"
               @click="navClick($index)">
            <span>{{ item.title }}</span>
            <i>{{ item.unread }}</i>
          </div>
        </div>
        <div class="bb-main">
          <div class="bb-list">
            <div class="bb-item"
                 v-for="(item,$index) in bbList"
                 :class="{active:$index == bbListActive}"
                 @click="itemClick($index)">
              <div class="bb-item-title">
                <label class="bb-item-unread" v-if="item.unread">[未读]</label>
                <label class="bb-item-top" v-if="item.top">顶</label>
                <label class="bb-item-rule" v-if="item.tag == 1">规章制度</label>
                <label class="bb-item-subject" v-if="item.tag == 2">学科信息</label>
                <label class="bb-item-function" v-if="item.tag == 3">新功能</label>
                <h3>{{ item.title}}</h3>
                <span>{{ item.date}}</span>
              </div>
              <p>{{ item.value }}</p>
            </div>
          </div>
          <div class="bb-detail">
            <h3>关于狄琪琪老师私下授课的通报批评</h3>
            <p>
              嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
              嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
              嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
              嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
              嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
              嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子安贫，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！
            </p>
          </div>
        </div>
      </div>

    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>
  export default {
    data () {
      return {
        bulletinBoard:true,
        bbHeader:[
          {
            title: "全部",
            unread: 10,
          },
          {
            title: "公告",
            unread: 2,
          },
          {
            title: "系统消息",
            unread: 8,
          },
        ],
        bbList:[
          {
            title: "关于狄琪琪老师私下授课",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有",
            date: "2-13",
            unread: true,
            top: true,
            tag: 1,
          },
          {
            title: "关于标准作业的答疑攻略",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有 ",
            date: "2-13",
            unread: true,
            top: true,
            tag: 2,
          },
          {
            title: "关于狄琪琪老师私下授课",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有",
            date: "2-13",
            unread: true,
            top: true,
            tag: 3,
          },
          {
            title: "关于狄琪琪老师私下授课",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有",
            date: "2-13",
            unread: true,
            top: true,
            tag: 1,
          },
          {
            title: "关于标准作业的答疑攻略",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有 ",
            date: "2-13",
            unread: true,
            top: true,
            tag: 2,
          },
          {
            title: "关于狄琪琪老师私下授课",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有",
            date: "2-13",
            unread: true,
            top: true,
            tag: 3,
          },
          {
            title: "关于狄琪琪老师私下授课",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有",
            date: "2-13",
            unread: true,
            top: true,
            tag: 1,
          },
          {
            title: "关于标准作业的答疑攻略",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有 ",
            date: "2-13",
            unread: true,
            top: true,
            tag: 2,
          },
          {
            title: "关于狄琪琪老师私下授课",
            value: "检查自己是否佩戴耳机/扬声器，耳机/尽量使用有",
            date: "2-13",
            unread: true,
            top: true,
            tag: 3,
          },
        ],
        bbHeaderActive: 0,
        bbListActive: 0,

      }
    },
    mounted () {
      this.bulletinBoard = true;
    },
    methods: {
      close(){
        this.$store.commit("BULLETIN_BOARD","false");
        this.bulletinBoard = false;
      },
      navClick(index){
        this.bbHeaderActive = index;
      },
      itemClick(index){
        this.bbListActive = index;
      },
    },
  }
</script>
<style lang="less">
  @import "../my-theme/info.less";
  .bulletinBoard{
    .close{
      position: absolute;
      font-size: 12px;
      right: 16px;
      top: 12px;
      line-height: 1;
      overflow: hidden;
      cursor: pointer;
    }
    .ivu-modal-footer{
      padding: 0;
    }
    .bulletinBoardMoudel{
      .bb-content{
        display: flex;
        flex-direction: column;
        height: 408px;
        .bb-header{
          display: flex;
          height: 30px;
          border-bottom: 1px solid #eaeaea;
          width: 100%;
          .bb-nav{
            margin-right: 28px;
            font-size: 12px;
            line-height: 30px;
            position: relative;
            cursor: pointer;
            i{
              position: absolute;
              right: -14px;
              top: 2px;
              font-size: 10px;
              width: 16px;
              height: 16px;
              background-color: @error-color;
              color: #fff;
              text-align: center;
              line-height: 14px;
              border-radius: 50%;
            }
            &.active{
              color: @primary-color;
              &:after{
                content: "";
                position: absolute;
                width: 0;
                height: 0;
                border-bottom: 4px solid @primary-color;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                bottom: 0;
                left: 50%;
                margin-left: -5px;
              }
            }
          }
        }
        .bb-main{
          display: flex;
          flex: 5;
          .bb-list{
            width: 270px;
            overflow-y: auto;
            &::-webkit-scrollbar-track {
              border-width: 2px;
              background-color: #f0f4f5;
            }
            .bb-item{
              border-bottom: 1px solid #eaeaea;
              padding: 15px 15px 15px 0;
              cursor: pointer;
              position: relative;
              .bb-item-title{
                line-height: 18px;
                display: flex;
                white-space: nowrap;
                font-size: 14px;
                label{
                  font-size: 12px;
                  margin-right: 5px;
                  line-height: 1;
                  &.bb-item-unread{
                    color: @error-color;
                    font-size: 14px;
                    line-height: 18px;
                  }
                  &.bb-item-top{
                    border: 1px solid #e60012;
                    color: #e60012;
                    padding: 1px 2px;
                    border-radius: 2px;
                  }
                  &.bb-item-rule{
                    border: 1px solid #623db6;
                    color: #623db6;
                    padding: 1px 2px;
                    border-radius: 2px;
                  }
                  &.bb-item-subject{
                    border: 1px solid #55ccc2;
                    color: #55ccc2;
                    padding: 1px 2px;
                    border-radius: 2px;
                  }
                  &.bb-item-function{
                    border: 1px solid #37b658;
                    color: #37b658;
                    padding: 1px 2px;
                    border-radius: 2px;
                  }
                }
                h3{
                  color: #727a89;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  flex: 1;
                  font-size: 14px;
                  transition: color .3s;
                }
                span{
                  color: #727a89;
                }
              }
              p{
                font-size: 12px;
                color: #a3acbe;
                margin-top: 9px;
                line-height: 1;
                transition: color .3s;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &:hover,&.active{
                h3,p,span{
                  color: @primary-color;
                }
              }
              &.active{
                &:after{
                  content: "";
                  width: 0;
                  height: 0;
                  position: absolute;
                  right: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  border-right: 10px solid #f0f4f5;
                  border-top: 9px solid transparent;
                  border-bottom: 9px solid transparent;
                }
              }
            }
          }
          .bb-detail{
            flex: 5;
            overflow-y: auto;
            padding: 15px 20px;
            background-color: #f0f4f5;
            h3{
              font-size: 15px;
              font-weight: 600;
              text-align: center;
              margin-bottom: 10px;
            }
            p{
              line-height: 1.6;
            }
          }
        }
      }
    }
  }
</style>
