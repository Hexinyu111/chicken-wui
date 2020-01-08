// pages/cor_set/cor_set.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    corLists: [],
    selfData: '', //没有合养人
    haveselfData: '', //有合养人
    selfData2: '',
    showHaveCor: false,
    userId: '',
    creatCorImg2: '',//发起人信息
    nickname: '',
    isCreateCor: false,
    putfeed:0,


  },

  //发起人的信息
  getCreatcorInfo() {
    wx.request({
      url: app.globalData.url + '/together/together-user-msg',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            creatCorImg2: res.data.data.headrImg,
            nickname: res.data.data.nikeName,
            putfeed: res.data.data.putFeed
          })
        } else {
          wx.showModal({
            title: '温馨提示',
            content: '您已被管理人移除合养',
            showCancel: false,
            success(res) {
              if (res.confirm) {
                setTimeout(() => {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }, 2000)
              }
            }
          })
        }

      }
    })
  },
 
  //退出合养
  outCoorapotion2() {
    wx.showModal({
      title: '',
      content: '确认退出合养？',
      success:res=> {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/together/sign-out',
            method: 'GET',
            data: {
              userId: wx.getStorageSync('openid'),
            },
            success: res => {
              this.getCorList()
              wx.showToast({
                title: '退出合养成功',
              })

              setTimeout(() => {
                wx.switchTab({
                  url: '../index/index',
                })
              }, 2000)
            }
          })
        }
      }
    })
  },
//删除合养成员
  outCoorapotion(e) {
    this.setData({
      userId: e.currentTarget.dataset.id
    })
    wx.showModal({
      title: '',
      content: '确认删除该合养成员？',
      success:res=> {
        if (res.confirm) {
          wx.request({
            url: app.globalData.url + '/together/sign-out',
            method: 'GET',
            data: {
              userId: this.data.userId,
            },
            success: res => {
              this.getCorList()
              wx.showToast({
                title: '删除成功',
              })
            }
          })
        }
      }
    })
  },



  //获取合养人列表
  getCorList() {
    wx.request({
      url: app.globalData.url + '/together/together-list-page',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          corLists: res.data.data
        })
      }
    })
  },
  //判断当前用户是否是发起合养人
  getCorListCreate() {
    wx.request({
      url: app.globalData.url + '/together/is-together-person',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          isCreateCor: res.data.data
        })
      }
    })
  },

  onLoad: function(options) {

    this.getCorList()
    // this.getCorInfo()
    this.getCreatcorInfo()
    this.getCorListCreate()
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