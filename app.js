//app.js
App({
  onLaunch: function () {
    // wx.hideTabBar()
    const updateManager = wx.getUpdateManager();
    //检测版本更新
    updateManager.onCheckForUpdate(function (res) {
      
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        //监听小程序有版本更新事件
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          // 新版本下载失败
          wx.showModal({
            title: '已经有新版本咯~',
            content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开呦~',
          })
        })
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

   
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
      // }
    })
  },
  // 确认授权
  getUserInfo: function (e) {
    var that=this
    if (e.detail.userInfo) {
      that.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync("userinfo", e.detail.userInfo)
      // this.setData({
      that.userInfo=e.detail.userInfo,
        that.hasUserInfo= true
      // }),
        // 登录
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求获取openid
              wx.request({
                url: that.globalData.url + '/wx-user/getOpenID',
                data: {
                  code: res.code
                },
                success: function (res) {
                  that.globalData.islogin = true
                  wx.switchTab({
                    url: '../index/index'
                  })
                  
                  wx.setStorageSync('openid', res.data.openid)
                  wx.request({
                    url: that.globalData.url + '/user/save',
                    data: {
                      nickName: e.detail.userInfo.nickName,
                      avatarUrl: e.detail.userInfo.avatarUrl,
                      gender: e.detail.userInfo.gender,
                      province: e.detail.userInfo.province,
                      city: e.detail.userInfo.city,
                      country: e.detail.userInfo.country,
                      openid: wx.getStorageSync("openid"),
                      sharedPerson: that.globalData.sharedPerson,//分享参数
                      redPacketSharer: that.globalData.redPacketSharer,
                       fosterPerson: that.globalData.fosterPerson
                    },
                   
                    header: {
                      "Content-Type": "applciation/json"
                    },
                    method: 'GET',
                  })
                
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
    } else {
      wx.navigateBack()
    }
  },
  globalData: {
    // url: 'https://xiaoyushop.ltd:8086/',
    sharedPerson: '',
    fosterPerson:'',
    url:'http://192.168.0.106:8086',
    userInfo: null
  },
})

