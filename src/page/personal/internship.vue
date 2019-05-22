<template>
  <div class="intership-content">
    <div class="intership-title commonTitle">
      <div class="intership-title-main commonTitleMain">
        <h2>实习证明</h2>
        <div>
          <Icon type="ios-camera"  @click="capture()"/>
          <a class="down" download="downImg" href=""></a>
        </div>
      </div>
    </div>
    <div class="intership-main">
      <div class="intership-detail">
        <h3>实习证明</h3>
        <p><span>周嘉明</span>，从 <span>2016年04月4日</span> 至 <span>2017年12月15日</span> 在我公司实习，主要从事教学活动。</p>
        <p>在实习期间工作认真，脚踏实地，虚心请教并且努力掌握工作技能，善于思考,能够举一反三。对学生认真负责，获得学生和家长的一致好评；积极配合同事的工作，虚心听取他人意见。能够将在学校所学的知识灵活应用到具体的工作中去，传授给学生。同时，该学生严格遵守我公司的各项规章制度，实习时间，服从实习安排，完成实习任务，尊敬实习单位人员，并能与公司同事和睦相处。</p>
        <p>此为本公司在实习结束后关于该学生在实习期间的综合表现的评价，供学校以及就业单位参考。</p>
        <div class="intership-inscribe">
          <div class="right">
            <div class="intership-seal">上海济忆网络科技有限公司</div>
            <div class="intership-time">2017年12月26日</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  export default {
    data () {
      return {

      }
    },
    beforeMount () {

    },
    mounted () {

    },
    created () {

    },
    methods: {
      capture () {  //截图下载
        html2canvas(document.querySelector(".intership-detail")).then(function(canvas) {
          let e = document.createEvent("MouseEvents")
          e.initEvent("click", true, true);
          let down = document.querySelector(".down");
          down.setAttribute('href',canvas.toDataURL("image/jpg"));
          down.dispatchEvent(e);
        });
      },
    },
    destroyed () {

    }

  }
</script>
<style lang="less">
  .intership-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    .intership-title-main{
      i{
        cursor: pointer;
      }
    }
    .intership-main{
      flex: 5;
      overflow-y: auto;
      .intership-detail{
        width: 900px;
        padding: 25px 80px;
        margin: 0 auto;
        line-height: 28px;
        h3{
          text-align: center;
          font-size: 18px;
          color: #323741;
          margin-bottom: 15px;
          font-weight: 600;
        }
        p{
          color: #727a89;
          font-size: 16px;
          span{
            font-weight: 600;
          }
        }
        .intership-inscribe{
          margin-top: 35px;
          text-align: right;
          .right{
            display: inline-block;
            text-align: center;
            color: #323741;
            line-height: 1;
            font-size: 16px;
            .intership-seal{
              background: url("../../assets/teacher/seal.png") no-repeat center;
              height: 91px;
              padding-top: 66px;
            }
            .intership-time{
              margin-top: 6px;
            }
          }
        }
      }

    }
  }
</style>

