// pages/category/index.js
import request from '../../utils/request.js'
Page({
data:{
  categories:[],
  current:0
},
onLoad(){
  request({
    url:"/categories"
  }).then(res=>{
    const {message}=res.data
    // console.log(message)
    this.setData({
      categories:message
    })
  })
},
// 点击分类触发的事件
  handleClick(event){
    const { index } = event.currentTarget.dataset
    
    this.setData({
      current:index
    })

  }

})