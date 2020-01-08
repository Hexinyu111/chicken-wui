// 1.倒计时时间
// 2.接口地址
// 3.首页群组版本号
// 4.视频和视频详情页版本号、
// 5.个人中心版本号
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isLogin: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    status: 'normal',
    friends: [],
    time: '',
    show: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    showChicken1: 1,
    food_number: 0, //当前总饲料数
    is_get: true, //领饲料是否授权,
    isSign: false, //true显示已签到，false显示未签到
    userAgg: 0, //当前用户鸡蛋数
    show_pen: false, //不显示粮食和倒计时
    already_input: 0,
    percent: 0,
    original_time: 0, //进入页面时获取时间戳
    current_time: 0, //当前时间的时间戳
    yun1: true,
    attentionAnim: '',
    feedFirstClick: true,
    showfeed: true,
    uid: '', //分享参数
    re_uid: '',
    sharedPerson: '',
    ani: '',
    showAni: true,
    scrollData: '',
    showFriendScroll: false,
    friendremain: '',
    showscrollMsg: false,
    current: 'tab1',
    showAggAll: true,
    friendsNum: [],
    shareDaily: 0,
    isShareDaily: true, //每日问候是否完成
    isxsdk: true, //限时打卡
    getWeight: 0, //弹框上获取的粮食数
    agentId: '',
    // showmovie: 0,
    flag: false, //鸡的点击动画
    jinrishici: '',
    poem: '',
    showPoem: false,
    navTop: 0,
    corList: [], //合养列表
    selfData: '', //自己的合养信息
    putfeed: 0, //自己的喂养信息
    creatCorImg: '', //发起合养人的头像----左上角
    corLists: [],
    selfImg: '', //合养列表自己的信息
    creatorId:'',//发起人id
    isCreateCor:false,
    scrollinfo:[],
    scrollinfoOpac:0,//滚动消息第一个透明度
    // blurFlag:false,//合养页面的模糊度
    // corNum:false,//邀请合养的弹框
    selfNickName:'',
    showInviteCor:1,
  },
  animationfinish(event){
    var that=this
    setTimeout(()=>{
      this.setData({
        scrollinfoOpac: event.detail.current
      })
    },150)
  },
  // 底部滚动列表消息
  getScrollInfo() {
    wx.request({
      url: app.globalData.url + '/together/together-dynamic',
      method: 'GET',
      data: {
        userId: this.data.creatorId
      },
      success: res => {
        for (let i of res.data.data){
          if (i.userId.length>4){
            i.userId = i.userId.substring(0, 4) + '...'
          }
        
        }
        this.setData({
          scrollinfo: res.data.data
        })
      }
    })
  },
  //获取当前用户的信息----右边列表第一个
  getCorInfo() {
    wx.request({
      url: app.globalData.url + '/together/together-person',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            putfeed: res.data.data.putFeed,
            creatCorImg: res.data.data.headrImg,
          })
        }
      }
    })
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
        if(res.data.code==200){
          this.setData({
            creatCorImg2: res.data.data.headrImg,
            creatorId: res.data.data.togetherId,
          })
          this.getFoodStatus()
          this.getScrollInfo()
        }
      
      
     
      
      }
    })
  },
 
  //获取合养人列表
  getCorList() {
    wx.request({
      url: app.globalData.url + '/together/together-list',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        // if(res.data.data.length<2){
        //   this.setData({
        //     // blurFlag:true,
        //     // corNum:true
        //   })
        // }
        // if (res.data.data.length ==1 ) {
        //   this.setData({
        //     showInviteCor:2
        //   })
        // }
        // if (res.data.data.length ==2) {
        //   this.setData({
        //     showInviteCor: 3
        //   })
        // }
        let temp = []
        let temp2 = res.data.data
        let userid = wx.getStorageSync("openid")
        for (let i in temp2) {
          
          if (i < 2) {
            temp2[i].nikeName = temp2[i].nikeName.substring(0, 2) + '...'
            temp.push(temp2[i])
          }

        }
        this.setData({
          corList: temp
        })

      }
    })
  },
  onClose4() {
    this.setData({
      show4: false
    });
  },
  back() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  clickAni() {
    this.setData({
      flag: true
    })
    setTimeout(() => {
      this.setData({
        flag: false
      })
    }, 600)
  },
  handleChangeScroll({
    detail
  }) {
    if (detail.key == 'tab1') {
      this.setData({
        current: detail.key,
        showAggAll: true
      });
    } else {
      this.setData({
        current: detail.key,
        showAggAll: false
      });
    }

  },

  onClose5() {
    this.setData({
      show5: false
    });
  },
  onClose6() {
    this.setData({
      show6: false
    });
  },

  showPopup3() {
    this.setData({
      showshequn: true
    });

  },
  //获取鸡蛋总数排行
  getEggAllOrder() {
    wx.request({
      url: app.globalData.url + '/user/get-user-agg-list',
      method: 'GET',
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          friendsNum: res.data.data
        })
      }
    })
  },


  // 签到
  clickSign() {
    var that = this
    wx.showLoading({
      title: '加载中……'
    })
    that.setData({
      isSign: true
    })
    wx.request({
      url: app.globalData.url + '/rules/incentive-feed',
      method: 'GET',
      data: {
        signIn: '50',
        userId: wx.getStorageSync("openid")
      },
      success: function(res) {
        wx.hideLoading()
        that.getFeedAll()
        if (res.data.code == 200) {
          that.getSignStatus()
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
          that.setData({
            show2: false,
            show6: true,
            getWeight: 50
          })
        }
      }
    })
  },
  // 获取签到状态
  getSignStatus() {
    wx.request({
      url: app.globalData.url + '/rules/is-signIn',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          isSign: res.data.data
        })
      }
    })
  },
  //喂食
  feedChick() {
    this.setData({
      showfeed: false//隐藏可以喂食的盆，避免连续点击
    })
    if (this.data.food_number < 100) {
      wx.showToast({
        title: '粮食不足要100g哦 赶快去领取零食吧',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        showfeed: true
      })
      return
    }
    if (this.data.show_pen == true) {//盆里有粮食没有吃完
      this.setData({
        showChicken1: 3
      })
      wx.showToast({
        title: '撑死啦，稍后再来喂我吧',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.request({
      url: app.globalData.url + '/together/put-feed',
      method: 'GET',
      data: {
        togetherId: wx.getStorageSync("openid"),
        togetherTotal: 500,
        togetherPutFeed: 100,
        putTime: Date.now()
      },
      success: res => {
        this.getScrollInfo()
        if (res.data.code == 400) {
          this.setData({
            showfeed: true,
            show5: true
          })
          return
        }
        this.getFeedAll()
        wx.showToast({
          title: res.data.data
        })
        this.setData({
          show_pen: true,
          showChicken1: 3,
          time: 20000, //投食成功后将时间设置成半个小时
        })
      }
    })
  },
  //避免连续点击
  feedChick2() {
    if (this.data.food_number < 100) {
      wx.showToast({
        title: '粮食不足要100g哦 赶快去领取零食吧',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.show_pen == true) {
      this.setData({
        showChicken1: 3
      })
      wx.showToast({
        title: '撑死啦，稍后再来喂我吧',
        icon: 'none',
        duration: 2000
      })
      return
    }
  },
  //获取鸡蛋的进度
  getFoodStatus() {
    console.log("121231:",this.data.creatorId)
    wx.request({
      url: app.globalData.url + '/together/get-put-feed',
      data: {
        userId: this.data.creatorId,
      },
      success: res => {
        if (res.data.code == 200 && res.data.data != null && res.data.data != '') {
          // 获取喂食状态
          var original_time = Date.now() //进来时获取的
          var time = 20000 - (original_time - res.data.data.putTime)
          this.setData({
            time: time,
          })
          if (time > 1000) {
            this.setData({
              show_pen: true,
              showChicken1: 3,
              time: time,
            })
          } else {
            this.setData({
              show_pen: false,
              showChicken1: 1
            })
          }
          this.setData({
            already_input: res.data.data.togetherPutFeed,
            percent: this.data.already_input / 500 * 100,
            userAgg: res.data.data.togetherEgg,
          })
        }
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
  //获取好友排行榜
  showPopup() {
    this.setData({
      show: true
    });
    this.getEggAllOrder()

    wx.request({
      url: app.globalData.url + '/user/invite-friends-list',
      data: {
        openid: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            friends: res.data.data,
            showFriendScroll: true
          })
        } else {
          this.setData({
            showFriendScroll: false,
            friendremain: res.data.message
          })
        }

      }
    })
  },
  showPopup2() {
    this.shareDailyNum()
    this.limitTime2()
    this.setData({
      show2: true
    });
    if (wx.getStorageSync("openid")) {
      this.setData({
        is_get: false
      })
    }
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  onClose2() {
    this.setData({
      show2: false
    });
  },


  onClose3() {
    this.setData({
      close: false
    });
  },

  //倒计时结束
  finished() {
    if (this.data.already_input == 400) {
      this.setData({
        show_pen: false, //进来后获取倒计时和有无粮食的状态
        showChicken1: 2,
        showfeed: true
      })
      setTimeout(() => {
        this.setData({
          showChicken1: 1,
        })
        this.getFoodStatus() //倒计时结束后加载鸡蛋进度
      }, 6000)
    } else {
      this.setData({
        show_pen: false, //进来后获取倒计时和有无粮食的状态
        showChicken1: 1,
        showfeed: true
      })
      this.getFoodStatus()
    }
  },

  onShareAppMessage: function(ops) {
    var that = this
    that.setData({
      uid: wx.getStorageSync("openid"),
    })
   
    var corName = app.globalData.userInfo.nickName
    return {
      title: '快来跟我一起养小鸡吧',
      imageUrl: '../../images/shareimg.jpg', //图片地址
      path: '/pages/index/index?fosterPerson=' + that.data.uid, //用户点击首先进入的当前页面
    }
    // + '&corId=' + corId + '&corName=' + corName
  },
  shareDailyNum() {
    wx.request({
      url: app.globalData.url + '/rules/daily-greetings-number',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
      },
      success: res => {
        if (res.data.total == 3) {
          this.setData({
            isShareDaily: false,
            shareDaily: res.data.total,
          })
        }
        this.setData({
          shareDaily: res.data.total,
        })
      }
    })

  },
  shareDaily() {
    wx.request({
      url: app.globalData.url + '/rules/daily-greetings',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
        dailyGreetings: 10
      },
      success: res => {
        setTimeout(() => {
          this.setData({
            show6: true,
            getWeight: 10
          })
        }, 2000)

        if (res.data.total == 2) {
          this.setData({
            isShareDaily: false,
          })
        }
        this.shareDailyNum()
        this.getFeedAll()
      }
    })
  },
  // 限时打卡
  limitTime() {
    wx.request({
      url: app.globalData.url + '/rules/time-stamping',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
        warmCare: 20
      },
      success: res => {
        this.limitTime2()
        this.getFeedAll()
        if (res.data.code == 200) {
          this.setData({
            show2: false,
            show6: true,
            getWeight: 20,
            isxsdk: false, //目前时间不能打卡
          })
        }
      }
    })
  },
  // 查询是否可以限时打卡
  limitTime2() {
    wx.request({
      url: app.globalData.url + '/rules/time-stamping-number',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
        warmCare: 10
      },
      success: res => {
        this.setData({
          isxsdk: res.data.data
        })
      }
    })
  },

  // 获取当前饲料数
  getFeedAll() {
    var that = this
    wx.request({
      url: app.globalData.url + '/user/getFeed',
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openid")
      },
      success: function(res) {
        wx.hideLoading()
        if (res.data.data == null) {
          res.data.data = 0
        }
        that.setData({
          food_number: res.data.data,
        })
      }
    })
  },


  onPullDownRefresh: function() {
    this.getFeedAll()
    // this.getAgg()
  },
  // 诗句
  getProem() {
    wx.request({
      url: app.globalData.url + '/showconent/list-switch',
      success: res => {
        if (res.data.code == 200) {
          if (res.data.data != '' || res.data.data != null) {
            this.setData({
              showPoem: true,
              poem: res.data.data.conent,
              flag2: true,
            })
            setTimeout(() => {
              this.setData({
                showPoem: false
              })
            }, 5000)
          } else {
            this.setData({
              showPoem: false
            })
            return
          }

        }
      }
    })
  },
 

  onLoad: function(options) {
    this.setData({
      selfImg: app.globalData.userInfo.avatarUrl,
      selfNickName: app.globalData.userInfo.nickName.substring(0,2)+'...'
    })
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        this.setData({
          navTop: menuButtonObject.top
        })
      },
    })
    this.getProem()
    this.getCorList()
    this.getCorInfo()
    this.getCreatcorInfo()
    // this.getScrollInfo()
  
    setInterval(() => {
      this.getProem()
    }, 10000)

    // this.showMovie()

    // this.isFirstLogin()
    // this.getOneHour()
    wx.showLoading({
      title: '加载中'
    })
    if (options != '' && options != undefined) {
      var scene = decodeURIComponent(options.scene)
      options.uid == undefined ? '' : options.uid
      app.globalData.sharedPerson = options.uid
      app.globalData.redPacketSharer = options.redPacketSharer
      //邀请二维码
      if (options.scene) {
        app.globalData.sharedPerson = scene
      }
      this.setData({
        re_uid: options.uid,
        sharedPerson: options.sharedPerson
      })
    }
    if (wx.getStorageSync("openid")) {
      this.getCorListCreate()
      this.setData({
        // hongbao2: false,
        isLogin: true
      })
      this.getFeedAll()
      // this.getOlderUser() //判断当前用户是否获得过首奖励
      // this.getAgg()
      this.getSignStatus()
      this.getFoodStatus() //获取鸡蛋进度
    } else {
      this.setData({
        isLogin: false
      })
    }
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function() {
    wx.showLoading({
      title: '加载中'
    })
    if (wx.getStorageSync("openid")) {
      this.setData({
        isLogin: true,
        is_get: false,
        // hongbao2: false
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
  
    this.getFeedAll()
    this.getSignStatus()
   
    this.getCreatcorInfo()
    this.setData({
      show2: false
    });
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },


  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})