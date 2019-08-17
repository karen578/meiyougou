// pages/search_list/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    goods: [],
    pagenum: 1,
    pagesize: 10,
    keyword: '',
    //需要先声明一个变量，看是否要加载更多
    hasMore:true
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      keyword: options.keyword
    })
    this.getData()
  },
  // 页面触底的时候要加载下一页的数据
  onReachBottom(){
//要重新给pagenum
   this.setData({
     pagenum:this.data.pagenum+1
   })
    this.getData()

   
  },
  // 发送请求的封装
  getData(){
    //把数据从data中解构出来
   const { keyword, pagenum, pagesize } = this.data
    request({
      url: '/goods/search',
      //发送请求的参数
      data: {
        query: keyword,
        pagenum,
        pagesize
      }
    }).then(res => {
      // console.log(res)
      const {
        goods
      } = res.data.message
      //因为价格是带有小数点的，所以需要用数组map的方法过滤，然后用number（).toFixed(2)保留2位小数，返回每一项
      const newgoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v
      })
      // console.log(newgoods)
      // 把新数组重新赋值给data定义的goods
      this.setData({
        //合并新旧数据
        goods: [...this.data.goods, ...newgoods]
      })
      // 如果显示的页面条数小于页面本来要显示的条数就说明已经所有的数据已经加载完成了，说明hasMore要关闭
      if (goods.length<this.data.pagesize){
        this.setData({
          hasMore:false
        })
        return
      }
    })
  },
  //点击tab栏触发事件
  handleClick(event) {
    const {
      index
    } = event.currentTarget.dataset
    this.setData({
      current: index
    })


  }


})