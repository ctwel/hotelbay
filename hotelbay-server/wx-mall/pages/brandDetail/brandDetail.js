var util = require('../../utils/util.js');
var api = require('../../config/api.js');


var app = getApp();

Page({
  data: {
    id: 0,
    brand: {},
    goodsList: [],
    page: 1,
    size: 1000
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      id: parseInt(options.id)
    });
    this.getBrand();
  },
  getBrand: function () {
    let that = this;
    util.request(api.BrandDetail, { id: that.data.id }).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          brand: res.data.brand
        });

        that.getGoodsList();
      }
    });
  },
  getGoodsList() {
    var that = this;

    util.request(api.GoodsList, { brandId: that.data.id, page: that.data.page, size: that.data.size})
      .then(function (res) {
        if (res.errno === 0) {
          that.setData({
            goodsList: res.data.goodsList
          });
          wx.hideLoading();
        }
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      });
  },

   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    // 增加下拉刷新数据的功能
     wx.showNavigationBarLoading();
    var self = this;
    // self.getIndexData();
    self.getGoodsList();
  },

  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})