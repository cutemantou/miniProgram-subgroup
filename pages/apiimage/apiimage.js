var pageObject = {
  data: {
    imgalist: [
      'https://pic.qbaobei.com/Uploads/Picture/2018-01-22/5a654febacfb7.png',
      'https://pic.qbaobei.com/Uploads/Picture/2017-11-02/59fadae53198b.jpg',
      'https://pic.qbaobei.com/Uploads/Picture/2017-11-02/59fa8d164c1d8.png',
    ]
  }, 
  /**   
   * 预览图片  
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  },
  /**   
   * 选择图片
  */
  choseImage: function (e) {
    //选择相册图片存入本地
    wx.chooseImage({
      count: 1,// 默认9 
      sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        console.log("choose image")
        console.log(res)
        var tempFilePath = res.tempFilePaths[0]
        //获取图片信息
        wx.getImageInfo({
          src: tempFilePath,
          success: function (res) {
            console.log("get image info")
            console.log(res)
            //保存图片到系统相册。
            wx.saveImageToPhotosAlbum({
              filePath: res.path, success(res) {
                console.log("保存图片成功")
                console.log(res)
                wx.showToast({ title: '保存成功', icon: 'success', duration: 2000 })
              }, fail(err) {
                console.log('失败')
                console.log(err)
                if (err.errMsg == "saveImageToPhotosAlbum:fail cancel") {
                  //打开设置界面，引导用户开启授权
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                        console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                      } else {
                        console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                      }
                    }
                  })

                }
              }
            })
          }
        })
      }
    })
  }
}
Page(pageObject)