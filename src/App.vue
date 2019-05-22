<template>
  <div id="app">
    <div class="warpper" v-if="uploadHide">
      <headerTop :rn="routerName"></headerTop>
      <div class="container">
        <navBar></navBar>
        <div class="section">
          <div class="content">
            <transition :name="transitionName">
              <router-view></router-view>
            </transition>
            <loading v-if="fetchLoading == 'true'"></loading>
          </div>
        </div>
      </div>
    </div>
    <div class="uploadContent" v-else>
      <router-view></router-view>
      <loading v-if="fetchLoading == 'true'"></loading>
    </div>
    <changePsw v-if="fetchChangePsw == 'true'" class="changePswMain"></changePsw>
    <bulletinBoard v-if="fetchBulletinBoard == 'true'" class="bulletinBoard"></bulletinBoard>
  </div>

</template>


<script>
  import { mapGetters } from 'vuex';
  import headerTop from './components/header';
  import navBar from './components/nav';
  import loading from './components/loading';
  import changePsw from './components/changePassword';
  import bulletinBoard from './components/bulletinBoard';

export default {
  name: 'app',
  data () {
    return {
      uploadHide:true,
      routerName:'',
      transitionName: 'vux-pop-in',
      position:false,
      scroll:null,
    }
  },
  watch: {
    '$route' (to, from) {
      this.routerName = to.path.split('/')[1];
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'vux-pop-out' : 'vux-pop-in';
    },
  },
  mounted () {
    this.uploadShow();
    this.headerNav();
    this.isFirst();

    let methods =  window._client_user_web_methods_;
    Object.assign(methods, {
      goCourseware : () => {
        this.$router.push('/coursewareManage/myCourseware');
      }
    });

//    this.$refs.error.onload = () => {
//      sessionStorage.setItem('errorImgBase64',this.getBase64Image(this.$refs.error))
//    };

    document.body.ondragstart=function(){window.event.returnValue=false;}

  },
  computed:{
    ...mapGetters([
      'fetchLoading',
      'fetchChangePsw',
      'fetchBulletinBoard',
//      'fetchError',
    ]),
  },
  methods : {
    uploadShow () {
      if (this.$route.fullPath === '/upload') {
        this.uploadHide = false;
      }
    },
    headerNav () {
      this.routerName = this.$route.path.split('/')[1];
    },
    isFirst () {
      const isFirst = sessionStorage.getItem('isFirst');
      if(isFirst == "true") {
        this.$store.commit("CHANGE_PASSWORD","true");
        this.$router.push('/personal/info');

      }
    },
    getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
    }
  },
  components:{
    headerTop,
    navBar,
    loading,
//    error,
    changePsw,
    bulletinBoard,
  },
}
</script>

<style lang="less">
  @import './style/common.less';
</style>
