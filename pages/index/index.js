import request from '../../utils/request.js'
//index.js
//获取应用实

Page({
  data:{
   imgUrls:[],
   menus:[],
   floorData:[]
  },
  onLoad(){
    //请求轮播图的数据
    request({
      url:'/home/swiperdata'
    }).then(res=>{
      this.setData({
        imgUrls:res.data.message
      })
    })
    //请求导航的数据
    request({
      url:'/home/catitems'
    }).then(res=>{
      this.setData({
        menus:res.data.message
      })
      
    })
    //楼层的数据
    request({
      url:'/home/floordata'
    }).then(res=>{
     const {message}=res.data
      // console.log(message)
     this.setData({
       floorData:message
     })

    })
  }
 
})
