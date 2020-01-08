// pages/steps/steps.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    windoeheight:""

  },
  getdata() {
    wx.request({
      url: app.globalData.url + '/user/dynamic',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
       
        var obj = res.data.data
        Object.keys(obj).forEach(function(key) {
          for (let i of obj[key]) {
            if (i.url == 'dailyGreetings') {
              i.url = '每日问候'
              i.image='../../images/meiriwenhou.png'
              i.bg ='#8E22F8'
              i.num ="获取了10g粮食"
            } else if(i.url == 'authorizedLogin') {
              i.url = '授权登录'
              i.bg = '#F17217'
              i.num = '获取了500g粮食'
              i.image = '../../images/way4.png'
            } else if (i.url == 'signIn') {
              i.url = '每日签到'
              i.bg = '#519802'
              i.num = '获取了20g粮食'
              i.image = '../../images/way1.png'
            } else if (i.url == 'warmCare') {
              i.url = '限时打卡'
              i.bg = '#ED2C2E'
              i.num = '获取了20g粮食'
              i.image = '../../images/limittime.png'
            } else if (i.url == 'inviteFriends' || i.url == '/rules/invite-friends') {
              i.url = '邀请好友'
              i.bg = '#FF9432'
              i.num = '获取了100g粮食'
              i.image = '../../images/way2.png'
            } else if (i.url == 'chicksLayEggs') {
              i.url = '小鸡下蛋'
              i.image = '../../images/xiaojixiadan.png'
              i.bg = '#E8A540'
              i.num = '获取了1颗鸡蛋'
            } else if (i.url == 'together') {
              i.url = '合养喂养'
              i.image = '../../images/weiyang.png'
              i.bg = '#ED772C'
              i.num = '消耗了100g粮食'
            } else if (i.url == 'raiseChickens') {
              i.url = '个人喂养'
              i.image = '../../images/weiyang.png'
              i.bg = '#ED772C'
              i.num = '消耗了100g粮食'
            } else if (i.url == 'watchVideo') {
              i.url = '观看视频广告'
              i.image = '../../images/way3.png'
              i.bg = '#20B296'
              i.num = '获取了50g粮食'
          }
          }
        });
        this.setData({
          obj: obj
        })

      }
    })
  },
  onLoad: function(options) {
    var windoeheight = wx.getSystemInfoSync().windowHeight
    this.setData({
      windoeheight: windoeheight
    })

    this.getdata()
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})