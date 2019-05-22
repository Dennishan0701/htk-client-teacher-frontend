<template>
  <div class="home-info-bottom">
    <ul :class="{anim:animate==true}" @mouseover="clearScroll()" @mouseout="startScroll()">
      <li v-for="(item,$index) in noticeList" :key="$index" @click="bulletinBoardShow ()">
        <a href="javascript:;">
          <p>{{ item.text }}</p>
          <span>{{ item.date }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        animate:false,
        noticeList:this.$store.state.noticeList,
        scrollTime:null,
      }
    },
    created () {
      this.startScroll();
    },
    methods: {
      noticeScroll () {  //公告滚动
        this.animate = true;
        setTimeout(() => {
          this.noticeList.push(this.noticeList[0]);
          this.noticeList.shift();
          this.animate = false;
        }, 500)
      },
      clearScroll () { //滚动暂停
        clearInterval(this.scrollTime);
      },
      startScroll () { //滚动开始
        this.scrollTime = setInterval(this.noticeScroll, 2000)
      },
      bulletinBoardShow () { //打开公告板
        this.$store.commit("BULLETIN_BOARD","true");
      },
    },
    destroyed () {
      clearInterval(this.scrollTime);
    }

  }
</script>

