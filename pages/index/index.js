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
    showhognbao: false,
    hongbao2: false, //用户刚进来的弹出红包
    showshequn: false,
    money: '', //登录获得的红包
    hongbao_older: false, //老用户获得红包
    current: 'tab1',
    showAggAll: true,
    friendsNum: [],
    shareDaily: 0,
    isShareDaily: 1, //每日问候是否完成
    isxsdk: true, //限时打卡
    getWeight: 0, //弹框上获取的粮食数
    agentId: '',
    showmovie: 0,
    flag: false, //鸡的点击动画
    jinrishici: '',
    poem: '',
    showPoem: false,
    time2: '', //观看广告倒计时
    showvideobtn: 1, //观看视频按钮显示
    time3: '',
    advideoNum: 0, //每天观看视频广告次数
    showcorRemain: false, //没有何养的提示框
    corName: '', //发起合养人的昵称
    showcorRemain2: false, //被邀请通知
    isSignshow: false

  },
  //创建插屏广告
  // createAdScreen() {
  //   // 在页面中定义插屏广告
  //   let interstitialAd = null

  //   // 在页面onLoad回调事件中创建插屏广告实例
  //   if (wx.createInterstitialAd) {
  //     interstitialAd = wx.createInterstitialAd({
  //       adUnitId: 'adunit-d7d47c3cb51118ce'
  //     })
  //     interstitialAd.onLoad(() => {})
  //     interstitialAd.onError((err) => {})
  //     interstitialAd.onClose(() => {})
  //   }

  //   // 在适合的场景显示插屏广告
  //   if (interstitialAd) {
  //     interstitialAd.show().catch((err) => {
  //       console.error(err)
  //     })
  //   }
  // },
  //关闭被邀请弹框
  onClosecor2() {
    this.setData({
      showcorRemain2: false
    })
  },
  // 创建合养
  creatcor() {
    wx.request({
      url: app.globalData.url + '/together/put-feed',
      method: 'GET',
      data: {
        togetherId: wx.getStorageSync("openid"),
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            showcorRemain: false
          })
          wx.navigateTo({
            url: '../cooperation/cor',
          })
        } else {
          wx.showToast({
            title: '创建合养异常，请稍后再试',
          })
        }
      }
    })
  },
  //是否有合养
  getCorInfo() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: app.globalData.url + '/together/is-together',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        wx.hideLoading()
        if (res.data.data == false) { //没有合养
          this.setData({
            showcorRemain: true
          })
        } else {
          wx.navigateTo({
            url: '../cooperation/cor',
          })
        }
      }
    })
  },
  //判断是否有邀请合养信息---弹框
  getCorInviteInfo() {
    wx.request({
      url: app.globalData.url + '/together/invitees-share',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
        fosterPerson: app.globalData.fosterPerson
      },
      success: res => {
        console.log('000:', res.data.data)
        this.setData({
          showcorRemain2: res.data.data,
          corName: res.data.message,

        })
      }
    })
  },
  // 确定加入合养
  indexConfirmCor2() {
    wx.request({
      url: app.globalData.url + '/together/consent-to-foster',
      method: 'GET',
      data: {
        openid: wx.getStorageSync("openid"),
        fosterPerson: app.globalData.fosterPerson
      },
      success: res => {
        if (res.data.code == 200) {
          wx.showToast({
            title: '加入合养成功',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '../cooperation/cor',
            })
          }, 800)
        }
      }
    })
  },
  indexConfirmCor() {
    this.creatcor()
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
  // 确认授权
  getUserInfo3: function(e) {
    wx.showLoading({
      title: '加载中……'
    })
    app.getUserInfo(e)
    setTimeout(() => {
      this.onLoad();
      wx.hideLoading()
      if (app.globalData.islogin) {
        wx.request({
          url: app.globalData.url + '/red/get-user-money',
          method: 'GET',
          data: {
            userId: wx.getStorageSync("openid")
          },
          success: res => {
            this.setData({
              hongbao2: false
            })
            setTimeout(() => {
              this.setData({
                showhognbao: true,
                money: Number(res.data.data).toFixed(2),
                show2: false,
              })
            }, 600)
          }
        })
      }
    }, 1000)
  },
  closehongbao() {
    this.setData({
      showhognbao: false
    })
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
    //获取粮食点击“知道了”后，60%弹广告
    // var x = Math.floor(Math.random() * 10)
    // var y = [1, 2, 3, 4, 5, 6]
    // for (let i of y) {
    //   if (i == x) {
    //     this.createAdScreen()
    //   }
    // }
  },
  onClose7() {
    this.setData({
      showshequn: false
    });
  },
  showHongbao() {
    this.setData({
      showhognbao: false
    });
  },
  onClose10() {
    this.setData({
      hongbao2: false
    });
  },
  onClose12() {
    this.setData({
      hongbao_older: false
    })
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
  onClose4() {
    this.setData({
      show4: false
    });
  },
  // 获取滚动消息
  getOneHour() {
    wx.request({
      url: app.globalData.url + '/user/feedByOneHour',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.data == '') {
          this.setData({
            showscrollMsg: false
          })
        } else {
          var i = 0
          setInterval(() => {
            this.setData({
              scrollData: res.data.data[i],
              showscrollMsg: true
            })
            if (i < res.data.data.length - 1) {
              i++
            } else {
              i = 0
            }
          }, 7000)

        }
      }
    })
  },
  //判断是否是第一次登陆
  isFirstLogin() {
    wx.request({
      url: app.globalData.url + '/user/byOpenId',
      method: 'GET',
      data: {
        openId: wx.getStorageSync("openid")
      },
      success: res => {
        this.setData({
          show3: res.data.data
        })
      }
    })
  },
  // ------------------------------签到看广告逻辑---------------------------------------------------------------
  //签到时确认去看广告
  // signToAd() {
  //   this.show_ad()
  // },
  //签到取消去看广告
  // onClosecSign() {
  //   this.setData({
  //     isSignshow: false
  //   })
  //   wx.showLoading({
  //     title: '加载中……'
  //   })
  //   wx.request({
  //     url: app.globalData.url + '/rules/incentive-feed',
  //     method: 'GET',
  //     data: {
  //       signIn: '20',
  //       userId: wx.getStorageSync("openid")
  //     },
  //     success: res => {
  //       wx.hideLoading()
  //       this.getFeedAll()
  //       if (res.data.code == 200) {
  //         this.getSignStatus()
  //         setTimeout(function() {
  //           wx.hideLoading()
  //         }, 2000)
  //         this.setData({
  //           show2: false,
  //           show6: true,
  //           getWeight: 20
  //         })
  //       }
  //     }
  //   })
  // },
  // // 签到
  // clickSign() {
  //   this.setData({
  //     isSign: true,
  //     isSignshow: true
  //   })
  // },
  // ------------------------------签到看广告逻辑---------------------------------------------------------------
  clickSign() {
    this.setData({
      isSign: true,
      // isSignshow: true
    })
    wx.showLoading({
      title: '加载中……'
    })
    wx.request({
      url: app.globalData.url + '/rules/incentive-feed',
      method: 'GET',
      data: {
        signIn: '50',
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        wx.hideLoading()
        this.getFeedAll()
        if (res.data.code == 200) {
          this.getSignStatus()
          setTimeout(function() {
            wx.hideLoading()
          }, 2000)
          this.setData({
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
      showfeed: false
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
    wx.request({
      url: app.globalData.url + '/raise-chickens/save',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid"),
        putInFeed: 100,
        putTime: Date.now()
      },
      success: res => {
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
    wx.request({
      url: app.globalData.url + '/raise-chickens/get-put-feed',
      data: {
        userId: wx.getStorageSync("openid"),
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
            already_input: res.data.data.putInFeed,
            percent: this.data.already_input / 500 * 100,
          })

        }
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
    // this.getAdVideoNum()
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
        this.getAgg() //倒计时结束后重新获取鸡蛋数
      }, 6000)
    } else {
      this.setData({
        show_pen: false, //进来后获取倒计时和有无粮食的状态
        showChicken1: 1,
        showfeed: true
      })
      this.getFoodStatus()
      this.getAgg() //倒计时结束后重新获取鸡蛋数
    }
  },
  // 视频广告倒计时
  finished2() {
    this.setData({
      showvideobtn: 1
    })
  },
  // 每日问候倒计时
  finished3() {
    this.setData({
      isShareDaily: 1
    })
  },

  onShareAppMessage: function(ops) {
    var that = this
    that.setData({
      uid: wx.getStorageSync("openid"),
    })
    var time = Date.now()
    return {
      title: '快来免费领鸡蛋啦',
      imageUrl: '../../images/shareimg.jpg', //图片地址
      path: '/pages/index/index?uid=' + that.data.uid + '&sharedPerson=' + time, //用户点击首先进入的当前页面
    }

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
            isShareDaily: 3,
            shareDaily: res.data.total,
          })
        }
        this.setData({
          shareDaily: res.data.total,
        })
      }
    })

  },
  //点击每日问候
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
            isShareDaily: 3,
          })
        } else {
          this.setData({
            isShareDaily: 2,
            time3: 20000
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
  //获取当前用户鸡蛋数
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
    this.getAgg()
  },

  // 点击首次进来的‘知道了’
  indexConfirm() {
    if (!wx.getStorageSync("openid")) {
      setTimeout(() => {
        this.setData({
          hongbao2: true
        })
      }, 300)
    }
  },

  // 判断当前用户是否领取首奖励
  getOlderUser() {
    wx.request({
      url: app.globalData.url + '/red/get-the-first-reward',
      method: 'GET',
      data: {
        userId: wx.getStorageSync("openid")
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            hongbao_older: true,
            money: Number(res.data.data).toFixed(2),
          })
        } else {
          return
        }
      }
    })
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
  gethongbao() {
    this.setData({
      hongbao_older: false
    })
    setTimeout(() => {
      this.setData({
        showhognbao: true,
      })
    }, 600)

  },
  //获取观看视频广告次数
  // getAdVideoNum() {
  //   wx.request({
  //     url: app.globalData.url + '/rules/watch-video-number',
  //     method: 'GET',
  //     data: {
  //       userId: wx.getStorageSync("openid")
  //     },
  //     success: res => {
  //       this.setData({
  //         advideoNum: res.data.total
  //       })
  //       if (res.data.total == 3) {
  //         this.setData({
  //           showvideobtn: 3 //明日再来
  //         })
  //       }
  //     }
  //   })
  // },
  // 获取观看视频广告粮食
  // finishAdVideo() {
  //   wx.request({
  //     url: app.globalData.url + '/rules/watch-video-get-feed',
  //     data: {
  //       watchVideo: 50,
  //       userId: wx.getStorageSync("openid")
  //     },
  //     success: res => {
  //       this.getFeedAll()
  //       this.setData({
  //         show6: true,
  //         getWeight: 50
  //       })

  //     }
  //   })
  // },
  // 创建视频广告
  // show_ad(e) {

  //   this.setData({
  //     show2: false
  //   })
  //   let videoAd = null
  //   // 在页面onLoad回调事件中创建激励视频广告实例
  //   if (wx.createRewardedVideoAd) {
  //     videoAd = wx.createRewardedVideoAd({
  //       adUnitId: 'adunit-e778dd4f0bf513e6'
  //     })
  //     videoAd.onLoad(() => {

  //     })
  //     videoAd.onError((err) => {
  //       wx.showToast({
  //         title: '获取粮食异常，请稍后再试',
  //       })
  //     })
  //     videoAd.onClose((res) => {
  //       videoAd.offClose()
  //       if (res && res.isEnded || res === undefined) {
  //         //正常播放结束,可以下发奖励
  //         if (e) { //看广告得粮食
  //           // this.finishAdVideo()
  //           if (this.data.showvideobtn == 3 || this.data.showvideobtn > 3) { //已观看三次
  //             this.setData({
  //               showvideobtn: 3, //显示明日再来
  //               advideoNum: 3, //显示（3/3）
  //             })
  //           } else {
  //             this.setData({
  //               showvideobtn: 2,
  //               time2: 30000,
  //             })
  //           }
  //         } else { //签到看视频
  //           wx.showLoading({
  //             title: '加载中……',
  //           })
  //           wx.request({
  //             url: app.globalData.url + '/rules/incentive-feed',
  //             method: 'GET',
  //             data: {
  //               signIn: '60',
  //               userId: wx.getStorageSync("openid")
  //             },
  //             success: res => {
  //               console.log('看视频签到成功')
  //               wx.hideLoading()
  //               this.getFeedAll()
  //               if (res.data.code == 200) {
  //                 this.getSignStatus()
  //                 setTimeout(function() {
  //                   wx.hideLoading()
  //                 }, 2000)
  //                 this.setData({
  //                   show2: false,
  //                   show6: true,
  //                   getWeight: 60
  //                 })
  //               }
  //             }
  //           })
  //         }
  //       } else { //广告未播放完成,不奖励
  //         if (e) {
  //           return
  //         } else {

  //           wx.request({
  //             url: app.globalData.url + '/rules/incentive-feed',
  //             method: 'GET',
  //             data: {
  //               signIn: '20',
  //               userId: wx.getStorageSync("openid")
  //             },
  //             success: res => {
  //               console.log('未播放完成直接签到成功')
  //               wx.hideLoading()
  //               this.getFeedAll()
  //               if (res.data.code == 200) {
  //                 this.getSignStatus()
  //                 setTimeout(function() {
  //                   wx.hideLoading()
  //                 }, 2000)
  //                 this.setData({
  //                   show2: false,
  //                   show6: true,
  //                   getWeight: 20
  //                 })
  //               }
  //             }
  //           })
  //         }
  //       }
  //     })
  //   }
    // 用户触发广告后，显示激励视频广告
  //   if (videoAd) {
  //     videoAd.show().catch(() => {
  //       // 失败重试
  //       videoAd.load()
  //         .then(() => videoAd.show())
  //         .catch(err => {
  //           console.log('激励视频 广告显示失败')
  //         })
  //     })
  //   }
  // },
  onLoad: function(options) {
    this.getProem()
    setInterval(() => {
      this.getProem()
    }, 10000)

    this.showMovie()

    this.isFirstLogin()
    this.getOneHour()
    wx.showLoading({
      title: '加载中'
    })
    //邀请传回来的参数
    if (options != '' && options != undefined) {
      var scene = decodeURIComponent(options.scene)
      options.uid == undefined ? '' : options.uid
      app.globalData.sharedPerson = options.uid
      app.globalData.redPacketSharer = options.redPacketSharer
      app.globalData.fosterPerson = options.fosterPerson
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
      this.getCorInviteInfo()

      this.setData({
        hongbao2: false,
        isLogin: true
      })
      this.getFeedAll()
      this.getOlderUser() //判断当前用户是否获得过首奖励
      this.getAgg()
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
        hongbao2: false
      })
    } else {
      this.setData({
        isLogin: false
      })
    }
    // 授权得红包


    this.getAgg()
    this.getFeedAll()
    this.getSignStatus()
    // this.getFoodStatus() //获取鸡蛋进度
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