// pages/activity/activity.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ranking: '0', //排名
    invite: '0', //邀请的人数
    money: '0.00', //获得的红包金额
    show: false, //提现弹框
    // record: false,
    recordlist: [],
    active_hongbao: false,
    moneyall: '0.00',
    avatarUrl:'',
    nickname: '',
    firstPrize:'',//首奖励
    status: 'normal',
    need_money:0,
    //导航栏参数
    statusBarHeight: 0,
    navTop:0,
    navHeight:0
  },
  back(){
    wx.navigateBack({
      detla:1
    })
  },
  close() {
    this.setData({
      show: false
    })
  },
  onClose() {
    this.setData({
      active_hongbao: false
    })
  },
  closehongbao() {
    this.setData({
      active_hongbao: false
    })
  },
  copy() {
    wx.setClipboardData({
      data: "gugu_kefu",
      success: function(res) {
        wx.showToast({
          title: '复制成功',
          icon: 'none'
        })
      }
    });
  },
  onShareAppMessage: function(ops) {
    var that = this
    var uid=''
    uid = wx.getStorageSync("openid")
    var time = Date.now()
    return {
      title: '免费送鸡蛋，还能领现金',
      imageUrl: '../../images/sharehongbao.jpg', //图片地址
      path: '/pages/index/index?uid=' + uid + '&sharedPerson=' + time, //用户点击首先进入的当前页面
    }

  },
  // 战绩排名
  getdata() {
    wx.request({
      url: app.globalData.url + '/red/user-ranking',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.data.number > 98) {
          this.setData({
            ranking: res.data.data.number + '+'
          })
        } else {
          this.setData({
            ranking: res.data.data.number,
          })
        }

      }
    })
  },
  //获取邀请的好友
  getdata2() {
    wx.request({
      url: app.globalData.url + '/red/user-invitation-number',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          invite: res.data.data
        })

      }
    })
  },
  //获取的红包金额
  getdata3() {
    wx.request({
      url: app.globalData.url + '/red/get-user-money',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          money: res.data.data,
          need_money: (100 - res.data.data).toFixed(2)
        })
      }
    })
  },
  // 进来弹红包金额
  getMoney() {
    if (this.data.money < 100) {
      wx.showToast({
        title: '奖励未达100元，还差一点点~',
        icon: 'none'
      })
    } else {
      this.setData({
        show: true
      })
    }
  },
  //邀请记录
  getRecord() {
    wx.request({
      url: app.globalData.url + '/red/red-assistance',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            // record: true,
            recordlist: res.data.data
          })
        }


      }
    })
  },
   getTime() { //获取时间
     wx.request({
       url: app.globalData.url + '/red/get-the-latest-amount',
       method: 'GET',
       data: {
         userId: wx.getStorageSync("openid"),
         time: wx.getStorageSync('createTime')
       },
       success: res => {
         if(res.data.code==200){
           wx.setStorageSync('createTime', res.data.data.createTime)
           this.setData({
             moneyall:res.data.data.money,
             active_hongbao: true
           })
         }
       }
     })
  },
  // 获取首奖励
  getFirstPrisr(){
    wx.request({
      url: app.globalData.url + '/red/first-prize-money',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
      },
      success: res => {
       this.setData({
          firstPrize:res.data.data
       })
      }
    })
  },
  onLaunch: function () {
   
  },
  onLoad: function(options) {
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
    var userInfo = app.globalData.userInfo
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickname: userInfo.nickName
    })
    this.getdata()
    this.getdata2()
    this.getdata3()
    this.getRecord()
    this.getTime()
    this.getFirstPrisr()
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
    // this.getdata()
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

})