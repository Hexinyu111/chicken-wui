// pages/video/video.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video_url: '',
    duration: '',
    active: 0,
    isShow: true,
    movieData: [],
    page:1,
    size:8,
    movieId:19,
    showmovie:2
  },
  getMove(e) {
    if (e) {
      if (e.detail.name == 0) {
       this.data.movieId = 19
      } else if (e.detail.name == 1) {
        this.data.movieId = 14
      } else if (e.detail.name == 2) {
        this.data.movieId = 18
      } else if (e.detail.name == 3) {
        this.data.movieId = 16
      } else if (e.detail.name == 4) {
        this.data.movieId = 17
      } else if (e.detail.name == 5) {
        this.data.movieId = 15
      } else {
        this.data.movieId = 19
      }
    }
    wx.request({
      url: app.globalData.url + '/rules/watch-video-list',
      method: 'GET',
      data: {
        categoryId: this.data.movieId,
        page:this.data.page,
        size: this.data.size
      },
      success: res => {
        this.setData({
          movieData: res.data.data
        })
      }
    })
  },
  showMovie() {
    wx.request({
      url: app.globalData.url + '/pageswitch/video-switch',
      method: 'GET',
      data:{
       version:'1.1.1' 
      },
      success: res => {
        this.setData({
         showmovie: res.data.data
        })
      }
    })
  },
 
  todetail(e) {
    var id = e.target.id
    var url = e.currentTarget.dataset.url
    var title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: '../movie_detail/movie_detail?id=' + id + '&url=' + url + '&title=' + title,
    })

  },


  play() {
    this.setData({
      isShow: false
    })
  },
  pause() {
    this.setData({
      isShow: true
    })
  },
  waiting() {
    wx.hideToast({
      title: '加载中……',
      icon: 'loading'
    })
  },
 
  onLaunch() {

  },
  onShareAppMessage: function (ops) {
    return {
      title: '快来免费领鸡蛋啦',
      imageUrl: '../../images/shareimg.jpg', //图片地址
      path: '/pages/index/index?uid=' + that.data.uid + '&sharedPerson=' + time, //用户点击首先进入的当前页面
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.showMovie()
    this.getMove()
    this.onShareAppMessage()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.data.page++
 
    this.getMove()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.page++
    this.data.size += 8
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    this.getMove()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
