// pages/my_eggs/my_egg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAgg:'0',
    change_agg:'',
    userName:'',
    phone:'',
    region:'',
    address:''
  },
  bindKeyInput:function(e){
    this.setData({
      change_agg: e.detail.value//要兑换的鸡蛋数
    })
  },
  getAddressDetail: function () {
    wx.request({
      url: app.globalData.url + '/address/findAll',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if(res.data.data!=''){
          this.setData({
            userName: res.data.data.userName,
            region: [res.data.data.province, res.data.data.city, res.data.data.area],
            phone: res.data.data.phone,
            address: res.data.data.address,
          })
        }
       
      }
    })
  },
  sendOrder:function(e){
    if (this.data.userName == '' || this.data.phone == '' || this.data.region==''||this.data.address==''){
      wx.showToast({
        title: '请完整填写收货人信息',
        icon: 'none'
      })
      return
    }
    if (this.data.change_agg==''){
      wx.showToast({
        title: '请填写要兑换的鸡蛋数',
        icon: 'none'
      })
      return
    }
    if (this.data.change_agg > this.data.userAgg){
      wx.showToast({
        title: '鸡蛋数量不够哦，赶紧去喂养小鸡下蛋吧',
        icon:'none'
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/order/save',
      method: 'GET',
      data: {
        number: this.data.change_agg,
        userId: wx.getStorageSync("openid")
      },
      success: function (res) {
        wx.showToast({
          title: res.data.data,
          icon: 'none'
        })
      }
    })
  },
  getAgg() {
    wx.request({
      url: app.globalData.url + '/user/getAgg',
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.data == null) {
          res.data.data = 0
        }
        this.setData({
          userAgg: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddressDetail()
    this.getAgg()
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
    this.getAddressDetail()
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

  }
})