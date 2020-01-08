// pages/movie_detail/movie_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video:'',
    id:'',
    url:'',
    title:'',
    windoeheight:'',
    statusBarHeight: 0,
    navTop: 0,
    navHeight: 0,
    showmovie:0,
  },
  back() {
    wx.switchTab({
      url: '../video/video',
    })
  },

  showMovie() {
    wx.request({
      url: app.globalData.url + '/pageswitch/video-switch',
      method: 'GET',
      data: {
        version: '1.1.1'
      },
      success: res => {
        this.setData({
          showmovie: res.data.data
        })
      }
    })
  },
  pageSize(){
    var windoeheight = wx.getSystemInfoSync().windowHeight - 80
    this.setData({
      windoeheight: windoeheight
    })

    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        this.setData({
          statusBarHeight: res.statusBarHeight,
          navTop: menuButtonObject.top,
          navHeight: res.statusBarHeight + menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) * 2
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showMovie()
    this.pageSize()
    this.setData({
      id: options.id,
      url: options.url,
      title: options.title,
    })
    wx.request({
      url: app.globalData.url + '/rules/watch-video',
      method: 'GET',
      data: {
        vid: this.data.id
      },
      success: res => {
        this.setData({
          video:res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.pageSize()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that=this
    return {
      title:this.data.title,
      imageUrl: this.data.url, //图片地址
    }
  }
})