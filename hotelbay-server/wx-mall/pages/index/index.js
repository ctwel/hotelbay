const Promise = require('../../utils/promise.js');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    address: {
      id: 0,
      province_id: 0,
      city_id: 0,
      address: '',
      full_region: '',
      is_default: 0
    },
    categoryName: '',
    attributeName: '',
    categoryId: 0,
    attributeId: 0,
    category: {
      id: '',
      name: ''
    },
    attribute: {
      id: '',
      name: ''
    },
    all: {
      id: 0,
      name: "全部"
    },
    addressId: 0,
    openSelectRegion: false,
    openSelectCategory: false,
    openSelectAttribute: false,
    selectRegionList: [{
        id: 0,
        name: '省份',
        parent_id: 1,
        type: 1
      },
      {
        id: 0,
        name: '城市',
        parent_id: 1,
        type: 2
      }
    ],
    regionType: 1,
    regionList: [],
    categoryList: [],
    attributeList: [],
    selectRegionDone: false,
    selectCategoryDone: false,
    selectAttributeDone: false,
    isDisabled: false,
    newGoods: [],
    hotGoods: [],
    goodsList: [],
    // topics1: {},
    // topics2: {},
    // topics3: {},
    skill: [],
    group: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: [],
    goodsCount: 0,
    page: 1,
    size: 20,
    totalPages: 1,
    loadmoreText: '正在加载更多数据',
    nomoreText: '全部加载完成',
    nomore: false,
    keywords: ''
  },
  onShareAppMessage: function() {
    return {
      title: 'Lucky Cat',
      desc: '幸运猫',
      path: '/pages/index/index'
    }
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
  getIndexData: function() {
    let that = this;
    var data = new Object();
    // util.request(api.IndexUrlNewGoods).then(function(res) {
    //   if (res.errno === 0) {
    //     data.newGoods = res.data.newGoodsList
    //     that.setData(data);
    //   }
    // });
    // util.request(api.IndexUrlHotGoods).then(function(res) {
    //   if (res.errno === 0) {
    //     data.hotGoods = res.data.hotGoodsList
    //     that.setData(data);
    //   }
    // });
    // util.request(api.IndexUrlTopic).then(function(res) {
    //   //
    // });
    //秒杀产品
    // util.request(api.KillList, {
    //   page: 1,
    //   size: 3
    // }).then(function(res) {
    //   if (res.errno === 0) {
    //     data.skill = res.data.data
    //     that.setData(data);
    //   }
    // });
    //团购产品
    // util.request(api.GroupList, {
    //   page: 1,
    //   size: 3
    // }).then(function(res) {
    //   if (res.errno === 0) {
    //     data.group = res.data.data
    //     that.setData(data);
    //   }
    // });
    // util.request(api.IndexUrlCategory).then(function(res) {
    //   if (res.errno === 0) {
    //     data.floorGoods = res.data.categoryList
    //     that.setData(data);
    //   }
    // });
    // util.request(api.IndexUrlBanner).then(function(res) {

    //   if (res.errno === 0) {
    //     data.banner = res.data.banner
    //     that.setData(data);
    //   }
    // });
    // util.request(api.IndexUrlChannel).then(function(res) {
    //   if (res.errno === 0) {
    //     data.channel = res.data.channel
    //     that.setData(data);
    //   }
    // });
    util.request(api.GoodsCount).then(function(res) {
      that.setData({
        goodsCount: res.data.goodsCount
      });
    });
  },
  chooseCategory() {
    if (this.data.openSelectAttribute) {
      this.setData({
        openSelectAttribute: !this.data.openSelectAttribute
      });
    }

    if (this.data.openSelectRegion) {
      this.setData({
        openSelectRegion: !this.data.openSelectRegion
      });
    }
    this.setData({
      openSelectCategory: !this.data.openSelectCategory
    });
    //请求数据
    let that = this;
    util.request(api.GoodsAllCategory).then(function(res) {
      if (res.errno === 0) {
        var list = res.data.allCategory
        list.push(that.data.all)
        that.setData({
          categoryList: list.reverse()
        })
      }
    });
  },
  chooseAttribute() {
    
    if (this.data.openSelectRegion) {
      this.setData({
        openSelectRegion: !this.data.openSelectRegion
      });
    }

    if (this.data.openSelectCategory) {
      this.setData({
        openSelectCategory: !this.data.openSelectCategory
      });
    }
    this.setData({
      openSelectAttribute: !this.data.openSelectAttribute
    });
    let that = this;
    //请求数据
    util.request(api.BrandAllList).then(function(res) {
     
      if (res.errno === 0) {
        var list = res.data
        list.push(that.data.all)
        that.setData({
          attributeList: list.reverse()
        })
      }
    });
  },
  chooseRegion() {
    let that = this;
    if (this.data.openSelectCategory) {
      this.setData({
        openSelectCategory: !this.data.openSelectCategory
      });
    }

    if (this.data.openSelectAttribute) {
      this.setData({
        openSelectAttribute: !this.data.openSelectAttribute
      });
    }
    this.setData({
      openSelectRegion: !this.data.openSelectRegion
    });

    //设置区域选择数据
    let address = this.data.address;
    if (address.province_id > 0 && address.city_id > 0) {
      let selectRegionList = this.data.selectRegionList;
      selectRegionList[0].id = address.province_id;
      selectRegionList[0].name = address.province_name;
      selectRegionList[0].parent_id = 1;

      selectRegionList[1].id = address.city_id;
      selectRegionList[1].name = address.city_name;
      selectRegionList[1].parent_id = address.province_id;
      this.setData({
        selectRegionList: selectRegionList,
        regionType: 1
      });
      this.getRegionList(1);
      // this.getRegionList(address.city_id);
    } else {
      this.setData({
        selectRegionList: [{
            id: 0,
            name: '省份',
            parent_id: 1,
            type: 1
          },
          {
            id: 0,
            name: '城市',
            parent_id: 1,
            type: 2
          }
        ],
        regionType: 1
      })
      this.getRegionList(1);
    }

    this.setRegionDoneStatus();

  },
  getRegionList(regionId) {
    let that = this;
    let regionType = that.data.regionType;
    util.request(api.RegionList, {
      parentId: regionId
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          regionList: res.data.map(item => {
           
            return item;
          })
        });
        if(that.data.regionList.length === 1 || that.data.regionList.length === 2){
          that.setData({
            regionList: res.data.map(item => {
             item.name = that.data.selectRegionList[0].name
              return item;
            })
          });
        }
        if(that.data.regionList.length === 2){
          var city = that.data.regionList.pop()
          var cityList = [];
          cityList.push(city)
          that.setData({
            regionList: cityList
             
          });
        }
      }
    });
  },

  setRegionDoneStatus() {
    let that = this;
    let doneStatus = that.data.selectRegionList.every(item => {
      return item.id != 0;
    });

    that.setData({
      selectRegionDone: doneStatus
    })

  },
  selectRegionType(event) {
    let that = this;
    let regionTypeIndex = event.target.dataset.regionTypeIndex;
    let selectRegionList = that.data.selectRegionList;

    //判断是否可点击
    if (regionTypeIndex + 1 == this.data.regionType || (regionTypeIndex - 1 >= 0 && selectRegionList[regionTypeIndex - 1].id <= 0)) {
      return false;
    }

    this.setData({
      regionType: regionTypeIndex + 1
    })

    let selectRegionItem = selectRegionList[regionTypeIndex];

    this.getRegionList(selectRegionItem.parent_id);

    this.setRegionDoneStatus();
  },
  selectCategory(event) {
    var that = this;
    var categoryItem;
    let categoryIndex = event.target.dataset.categoryIndex;
    for (let i = 0; i < this.data.categoryList.length; i++) {
      if (this.data.categoryList[i].id == categoryIndex) {
        categoryItem = this.data.categoryList[i];
        break;
      }
    }
    let category = this.data.category;
    category = categoryItem;
    that.setData({
      category: category,
      selectCategoryDone: true,
      categoryId: categoryIndex
    })
    that.setData({
      categoryList: that.data.categoryList.map(item => {
        //标记已选择的
        if (categoryIndex == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      })
    });

  },
  selectAttribute(event) {
    var that = this;
    var attributeItem;
    let attributeIndex = event.target.dataset.attributeIndex;
    // console.log(attributeIndex)
    for (let i = 0; i < this.data.attributeList.length; i++) {
      if (this.data.attributeList[i].id == attributeIndex) {
        attributeItem = this.data.attributeList[i];
        break;
      }
    }
    let attribute = this.data.attribute;
    attribute = attributeItem;
    that.setData({
      attribute: attribute,
      selectAttributeDone: true,
      attributeId: attributeIndex
    })
    that.setData({
      attributeList: that.data.attributeList.map(item => {
        //标记已选择的
        if (attributeIndex == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      })
    });
  },
  selectRegion(event) {
    let that = this;
    let regionIndex = event.target.dataset.regionIndex;
    let regionItem = this.data.regionList[regionIndex];
    let regionType = regionItem.type;
    let selectRegionList = this.data.selectRegionList;
    selectRegionList[regionType - 1] = regionItem;
    // if (regionType != 3) {
    if (regionType != 2) {
      this.setData({
        selectRegionList: selectRegionList,
        regionType: regionType + 1
      })
      this.getRegionList(regionItem.id);
    } else {
      this.setData({
        selectRegionList: selectRegionList,
      })
    }

    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 1) {
        item.id = 0;
        if (index == 1) {
          item.name = '城市'
        }
        item.parent_id = 0;
      }
      return item;
    });

    this.setData({
      selectRegionList: selectRegionList,
    })


    that.setData({
      regionList: that.data.regionList.map(item => {

        //标记已选择的
        if (that.data.regionType == item.type && that.data.selectRegionList[that.data.regionType - 1].id == item.id) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    });
    this.setRegionDoneStatus();
  },
  doneSelectCategory() {
    var that = this;
    if (this.data.selectCategoryDone === false) {
      return false;
    }
    let category = this.data.category;
    let categoryName = this.data.categoryName;
    categoryName = category.name
    this.setData({
      categoryName: categoryName,
      openSelectCategory: false
    })
    that.setData({
      goodsList: [],
      page: 1,
      totalPages: 1
    });
    that.getGoodsList();
  },
  doneSelectAttribute() {
    var that = this;
    if (this.data.selectAttributeDone === false) {
      return false;
    }
    let attribute = this.data.attribute;
    let attributeName = this.data.attributeName;
    attributeName = attribute.name
    this.setData({
      attributeName: attributeName,
      openSelectAttribute: false
    })
    that.setData({
      goodsList: [],
      page: 1,
      totalPages: 1
    });
    that.getGoodsList();
  },
  doneSelectRegion() {
    var that = this;
    if (this.data.selectRegionDone === false) {
      return false;
    }

    let address = this.data.address;
    let selectRegionList = this.data.selectRegionList;
    address.province_id = selectRegionList[0].id;
    address.city_id = selectRegionList[1].id;
    address.province_name = selectRegionList[0].name;
    address.city_name = selectRegionList[1].name;
    app.globalData.province = address.province_name
    app.globalData.city = address.city_name
    if (address.city_name != '上海市' && address.city_name != '重庆市' && address.city_name != '北京市' && address.city_name != '天津市') {
      address.full_region = address.city_name
    } else {
      address.full_region = address.province_name
    }
    if( app.globalData.province == app.globalData.city){
      app.globalData.province = address.province_name
      app.globalData.city = '市辖区'
    }
    
    this.setData({
      address: address,
      openSelectRegion: false,
    });
    that.setData({
      goodsList: [],
      page: 1,
      totalPages: 1
    });
    that.getGoodsList();
  },
  onLoad: function(options) {
    if (options.keywords != undefined) {
      this.setData({
        keywords: options.keywords
      })
    }
    this.getIndexData();
    this.getRegionList(1);
    var that = this

    new Promise(function(resolve, reject) {
      var qqmapsdk;
      // 获取当前经纬度
      wx.getSetting({
        success: (res) => {
          // console.log(res.authSetting["scope.userLocation"])
            if (res.authSetting["scope.userLocation"]) {////如果用户重新同意了授权登录
              // console.log("-----------")
              wx.getLocation({
                type: 'gcj02',
                success(res) {
                  var latitude = res.latitude
                  var longitude = res.longitude
                  that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                  })
                  qqmapsdk = new QQMapWX({
                      key: 'YOUBZ-JLSW2-4MFU7-CRHQG-NAZJT-QVB34'
                    }),
                    qqmapsdk.reverseGeocoder({
                      location: {
                        latitude: latitude,
                        longitude: longitude,
                      },
                      success: function(addressRes) {
                        var province = addressRes.result.address_component.province;
                        var city = addressRes.result.address_component.city;
                        app.globalData.province = province
                        app.globalData.city = city
        
                        let address = that.data.address;
                        address.full_region = app.globalData.city
                        that.setData({
                          address: address,
                        });
                        that.getGoodsList();
                      }
                    })
                }
              });
            }else{
              wx.showModal({
                title: '请求授权当前位置',
                content: '需要获取您的地理位置，请确认授权',
                success: function (res) {
                  if (res.cancel) {
                    wx.showToast({
                      title: '拒绝授权',
                      icon: 'none',
                      duration: 1000
                    })
                  } else if (res.confirm) {
                    wx.getLocation({
                      type: 'gcj02',
                      success(res) {
                        var latitude = res.latitude
                        var longitude = res.longitude
                        that.setData({
                          latitude: res.latitude,
                          longitude: res.longitude
                        })
                        qqmapsdk = new QQMapWX({
                            key: 'YOUBZ-JLSW2-4MFU7-CRHQG-NAZJT-QVB34'
                          }),
                          qqmapsdk.reverseGeocoder({
                            location: {
                              latitude: latitude,
                              longitude: longitude,
                            },
                            success: function(addressRes) {
                              var province = addressRes.result.address_component.province;
                              var city = addressRes.result.address_component.city;
                              app.globalData.province = province
                              app.globalData.city = city
                              let address = that.data.address;
                              address.full_region = app.globalData.city
                              that.setData({
                                address: address,
                              });
                              that.getGoodsList();
                            },
                            fail:function(){
                              // wx.showToast({
                              //   title: '决绝1',
                              //   icon: 'none',
                              //   duration: 1000
                              // })
                            }
                          })
                      },
                      fail:function(){
                        // wx.showToast({
                        //   title: '决绝',
                        //   icon: 'none',
                        //   duration: 1000
                        // })
                      }
                    });
                  }
                }
              })
            }
        }
    })
      

    }).then(function() {

    })
    let categoryName = that.data.categoryName;
    let attributeName = that.data.attributeName;
    // categoryName = '电信'
    categoryName = '全部'
    attributeName = '全部',
      that.setData({
        categoryName: categoryName,
        attributeName: attributeName,
      })
  },

  getGoodsList() {
    let that = this;
    if (that.data.totalPages <= that.data.page - 1) {
      that.setData({
        nomore: true
      })
      return;
    }
    util.request(api.IndexUrlGoodsList, {
      page: that.data.page,
      size: that.data.size,
      category_id: that.data.categoryId,
      brand_id: that.data.attributeId,
      attribute_category: app.globalData.province + app.globalData.city,
      keywords: that.data.keywords
    }).then(function(res) {
      if (res.errno === 0) {
        that.setData({
          goodsList: that.data.goodsList.concat(res.data.data),
          page: res.data.currentPage + 1,
          totalPages: res.data.totalPages
        });
        wx.hideLoading();
      }
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
  },
  cancelSelectRegion() {
    this.setData({
      openSelectRegion: false,
      openSelectCategory: false,
      openSelectAttribute: false,
      regionType: this.data.regionDoneStatus ? 2 : 1
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})