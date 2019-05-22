<template>
  <div class="info-content">
    <div class="info-title commonTitle">
      <div class="info-title-main commonTitleMain">
        <h2>个人信息</h2>
        <!--<a href="javascript:;" @click="typeClick" v-if="onlyReadType">编辑</a>-->
        <!--<div v-else>-->
        <div v-if="!onlyReadType">
          <a href="javascript:;" @click="typeClick">退出</a>
          <Button type="primary" size="small" @click="next" v-if="!saveShow">下一步</Button>
          <Button type="primary" size="small" @click="save" v-else>保存</Button>
        </div>
      </div>
    </div>
    <div class="info-main">
      <transition :name="transitionName">
        <onlyRead v-if="onlyReadType" @changeType="changeType"></onlyRead>
        <edit v-else  :next="NEXT"  @buttonSave="buttonSave" @saveFn="saveFn" @goRead="goRead"></edit>
      </transition>
    </div>
  </div>
</template>

<style lang="less">
  @import '../../style/info.less';
</style>

<script>
  import onlyRead from '@/page/personal/infoType/onlyRead'
  import edit from '@/page/personal/infoType/edit'

  export default {
    data () {
      return {
        onlyReadType:true,
        transitionName:'vux-pop-in',
        NEXT:0,
        saveShow:false,
        saveAjax:'',
      }
    },
    beforeMount () {
    },
    mounted () {

    },
    created: function () {
    },
    watch:{

    },
    methods: {
      typeClick(){
        this.onlyReadType = !this.onlyReadType;
        this.saveShow = false;
        if(this.onlyReadType) {
          this.transitionName = 'vux-pop-in';
        } else {
          this.transitionName = 'vux-pop-out';
        }
      },
      changeType(res){
        this.onlyReadType = res;
      },
      buttonSave(res){
        this.saveShow = res;
      },
      saveFn(fn){
        this.saveAjax = fn;
      },
      next(){
        this.NEXT++;
      },
      save () {
        this.saveAjax();
      },
      goRead (res) {
        this.onlyReadType = res;
        this.saveShow = false;
      },
    },

    components:{
      onlyRead,
      edit
    }
  }
</script>


