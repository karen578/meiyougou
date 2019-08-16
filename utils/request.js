/**
 * 封装一个发送请求的函数
 * 
 */
//传入的是一个对象，当用户没有传的时候默认给一个空对象
const request=function(config={}){
  if (!config.url){
    //throw new Error抛出错误是原生的
    throw new Error("请输入url")
    return
  }
  //如果请求的路径是不需要进行拼接基准路径的话，就进行判断
  //正则表达的。search（）方法是来判断字符串的，返回的结果-1表示没有符合要求，.test方法是来判断对象 返回true或者false
  if (config.url.search(/^http/)===-1){
    // 等于-1，说明就没有http开头，需要拼接上基准路径
    config.url = request.defaults.baseURL + config.url
  }
  //因为请求成功是返回的是一个promise对象
  return new Promise((resolve, rejuct)=>{
    //发送请求
    wx.request({
      //解构传进来的对象
      ...config,
     //因为调用的时候不会加上成功的回调，所以就要自己加上
     success(res){
       //成功之后出发then的回调函数
       resolve(res)
     },
     fail(){
       //失败的回调
     },
     //不管请求成功还是失败都会进行回调
     complete(res){
       //因为错误的数据是存放在一个数组里面，需要进行遍历，每一项触发在app.js中的错误函数
       request.errors.forEach(fn=>{
         fn(res)
       })
     }

    })
  })
}
request.defaults={
  baseURL:""
};

//保存错误函数
request.errors=[]
 request.onError=function(callback){
   request.errors.push(callback)
 }




export default request