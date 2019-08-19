// pages/search/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当input输入框有值得时候判断取消是否存在
    inputValue:'',
    searchList:[],
    //储存历史搜索的数据
    history:[]
  },
  //输入框按确认的时候触发，进行路由的跳转，用导航wx.navigateTo
  handleEnter(){
    wx.navigateTo({
      url: '../../pages/search_list/index?keyword=' + this.data.inputValue
    })
   // 保存新的搜索关键字前，要把关键字添加到已有的列表
    const arr = [this.data.inputValue, ...this.data.history]
    //数组去重
    this.setData({
      history: [...new Set(arr)]
    })
    //把数据保存到本地需要设置两个参数，键和值
    wx.setStorageSync('history',this.data.history)
  },
  //输入框输入触发的事件
  handleInput(event){
    
    const { value } = event.detail
    this.setData({
      inputValue:value
    })
    // console.log(this.data.inputValue)
    //获取到了值就发送搜索请求
    request({
      url:'/goods/qsearch',
      data:{
        query:value
      }
    }).then(res=>{
      console.log(res)
      const{message}=res.data
      this.setData({
        searchList:message
      })
    })

  },
  // 点击清除图标的时候触发事件
  handleClearAll(){
    wx.removeStorageSync('history')
    this.setData({
      history:[]
    })
  },
  //点击取消的时候触发事件
  handleCancel(){
    this.setData({
      inputValue: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //小程序的本地可以储存任何数据类型，获取到的本地数据存储到一个变量里面，然后再赋值给展示的数据
    const history = wx.getStorageSync('history')||[]
    this.setData({
      history
    })

  }
})