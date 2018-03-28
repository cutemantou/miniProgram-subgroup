var pageObject = {
  /**   
   * 预览图片  
   */
  record: function (e) {
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath
      },
      fail: function (res) {
        //录音失败
      }
    })
    setTimeout(function () {
      //结束录音  
      wx.stopRecord()
    }, 10000)
  }
}
Page(pageObject)