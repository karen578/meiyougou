// pages/goods_details/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    request({
      url:'/goods/detail',
      data:{
        goods_id: id
      }
    }).then(res=>{
     const {message}=res.data
     this.setData({
       details:message
     })
    })
   

  }
})