var api = require('../../config/api.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    frontImg: [],
    backImg: [],
    catchImg: [],
    phone_name: ''
  },

  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    if (this.data.frontImg.length == 0) {
      wx.showToast({
        title: '请上传身份证正面照片',
        icon: 'none'
      });
      return false;
    } else if (this.data.backImg.length == 0) {
      wx.showToast({
        title: '请上传身份证背面照片',
        icon: 'none'
      });
      return false;
    } else if (this.data.catchImg.length == 0) {
      wx.showToast({
        title: '请上传手持身份证照片',
        icon: 'none'
      });
      return false;
    }
    wx.showLoading({
      title: '提交中',
    })
    util.request(api.CartCheckPhone, {
      name: that.data.phone_name
    }, "POST")
    .then(function(res) {
      let _res = res;
      if (_res.errno == 0) {
        let that = this
        var img1 = that.data.frontImg[0]["src"]
        var img2 = that.data.backImg[0]["src"]
        var img3 = that.data.catchImg[0]["src"]
        var photos = [img1,img2,img3]
        wx.navigateTo({
          url: '/pages/shopping/checkout/checkout?photos=' + photos
        })
      } else {
        wx.showToast({
          image: '/static/images/icon_error.png',
          title: _res.errmsg,
          mask: true
        });
      }
    });

    
  },
  /**
   * 上传正面图片
   */
  chooseFrontImage: function () {
    var that = this;
    var items = that.data.frontImg;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        for (var i = 0; i < tempFilePaths.length; i++) {
          items.push({
            src: tempFilePaths[i]
          });
        }
        that.setData({
          frontImg: items
        });
      }
    })
  },
  /**
   * 上传背面图片
   */
  chooseBackImage: function () {
    var that = this;
    var items = that.data.backImg;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        for (var i = 0; i < tempFilePaths.length; i++) {
          items.push({
            src: tempFilePaths[i]
          });
        }

        that.setData({
          backImg: items
        });
      }
    })
  },
  /**
   * 上传手持图片
   */
  chooseCatchImage: function () {
    var that = this;
    var items = that.data.catchImg;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        for (var i = 0; i < tempFilePaths.length; i++) {
          items.push({
            src: tempFilePaths[i]
          });
        }

        that.setData({
          catchImg: items
        });
      }
    })
  },

  previewFrontImage: function (e) {
    var current = e.target.dataset.src
    var imgList = [];
    imgList.push(this.data.frontImg[0].src)
    wx.previewImage({
      current: current,
      urls: imgList
    })
  },
  previewBackImage: function (e) {
    var current = e.target.dataset.src
    var imgList = [];
    imgList.push(this.data.backImg[0].src)
    wx.previewImage({
      current: current,
      urls: this.data.backImg
    })
  },
  previewCatchImage: function (e) {
    var current = e.target.dataset.src
    var imgList = [];
    imgList.push(this.data.catchImg[0].src)
    wx.previewImage({
      current: current,
      urls: this.data.catchImg
    })
  },

  deleteFrontImage: function (e) {
    var that = this;
    var images = that.data.frontImg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          images.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          frontImg: images
        });
      }
    })
  },
  deleteBackImage: function (e) {
    var that = this;
    var images = that.data.backImg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          images.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          backImg: images
        });
      }
    })
  },
  deleteCatchImage: function (e) {
    var that = this;
    var images = that.data.catchImg;
    var index = e.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          images.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({
          catchImg: images
        });
      }
    })
  },
  goUrl: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone_name: options.name
    })
    console.log(this.data.phone_name)
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