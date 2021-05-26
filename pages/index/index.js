// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad() {

  },
  toDetail(e){
    wx.navigateTo({
      url: `../${e.currentTarget.dataset.page}`
    })
  }
})
