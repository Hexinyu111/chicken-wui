// pages/address_info/address_info.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    phone: '',
    region: ['请选择', '请选择', '请选择'],
    address: '',//详细地址
    customItem: '请选择'
  },
  // 获取省市区
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value,

    })
  },
  getName: function(e) {
    this.setData({
      userName: e.detail.value,

    })
  },
  getPhone: function(e) {
    this.setData({
      phone: e.detail.value,

    })
  },
  getAddress: function(e) {
    this.setData({
      address: e.detail.value,
    })
  },
  getAddressDetail: function() {
    wx.request({
      url: app.globalData.url + '/address/findAll',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.data == '') {
          return
        } else {
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

  // 保存地址
  saveAddress: function() {
    wx.request({
      url: app.globalData.url + '/address/save',
      method: 'GET',
      data: {
        userName: this.data.userName,
        phone: this.data.phone,
        province: this.data.region[0],
        city: this.data.region[1],
        area: this.data.region[2],
        address: this.data.address,
        userId: wx.getStorageSync("openid")
      },
      success: function(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.data
          })
          wx.navigateBack({
            delta:1
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAddressDetail()
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
    this.getAddressDetail()
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