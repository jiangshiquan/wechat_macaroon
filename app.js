//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    },
    globalData: {
    userInfo: null
    },
    // 登录
    wxlogin:function(){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("code:"+res.code)
          if(res.code){
            wx.request({
              url: 'http://localhost/wxlogin',
              data: {
               code: res.code, 
              },
              success:function(res){
                console.log("session_key:"+res.data.session_key)
                wx.setStorageSync('session_key', res.data.session_key)
                wx.setStorageSync('openid', res.data.openid)
              },
              fail:function(res){
                console.log("errMsg:"+res.errMsg)
              }
            })
          }else{
            console.log("网络错误")
          }
          
        },
        fail : res =>{
          console.log("网络出错");
        }
      })
    }
    
    
  
})