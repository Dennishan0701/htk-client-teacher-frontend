<template>
  <div class="error">
    <img :src="errorImgBase64" alt="error">
    <Button type="primary" @click="refresh">刷新</Button>
    <div class="error-bg"></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        errorImgBase64: sessionStorage.getItem('errorImgBase64')
      }
    },
    methods : {
      refresh () {
        window.location.reload();
      }
    },

  }
</script>
<style lang="less" scoped>
  .error{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 3;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    background-color: #fff;
    .error-bg{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top:0;
      z-index: -1;
      background-image: linear-gradient(to bottom, #5e85c8 0%, #623db6 100%);
      opacity: .1;
    }
    img{
      display: block;
      margin: 0 auto;
    }
    button{
      display: block;
      width: 85px;
      margin: 20px auto;
    }
  }
</style>
