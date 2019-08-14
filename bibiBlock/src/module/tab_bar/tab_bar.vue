<template>
  <cover-view class="tab-bar">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path="item.pagePath" :data-index="index" @click="switchTab">
      <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath"></cover-image>
    </cover-view>
  </cover-view>
</template>
<script>
export default {
  props: ['selected'],
  data () {
    return {
      selected: 0,
      color: '#7A7E83',
      selectedColor: '#3cc51f',
      list: [
        {
          pagePath: '/pages/index/main',
          text: '首页',
          iconPath: '/static/tabs/home.png',
          selectedIconPath: '/static/tabs/home-active.png'
        },
        {
          pagePath: '/pages/find/main',
          text: '发现',
          iconPath: '/static/tabs/home.png',
          selectedIconPath: '/static/tabs/home-active.png'
        },
        {
          pagePath: '/pages/message/main',
          text: '消息',
          iconPath: '/static/tabs/home.png',
          selectedIconPath: '/static/tabs/home-active.png'
        },
        {
          pagePath: '/pages/mine/main',
          text: '我的',
          iconPath: '/static/tabs/home.png',
          selectedIconPath: '/static/tabs/home-active.png'
        }
      ]
    }
  },
  methods: {
    switchTab (e) {
      const {
        currentTarget: {
          dataset: {path, index}
        }
      } = e
      console.log(path, index)
      // wx.switchTab({ url: path })
      this.$emit('switchTab',index)
    }
  }
}
</script>
<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 116px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 2px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 81px;
  height: 81px;
}

.tab-bar-item cover-view {
  font-size: 10px;
}
</style>