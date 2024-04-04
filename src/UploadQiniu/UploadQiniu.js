import Taro from "@tarojs/taro"



export const takePhoto = (maxCount = 1, sizeType = ['original'], sourceType = ['camera']) => {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: maxCount, // 最多可以选择的图片张数，默认1
      sizeType, // original 原图，compressed 压缩图，默认二者都有
      sourceType, // album 从相册选图，camera 使用相机，默认二者都有
      success(res) {
        // success
        const urlPath = res.tempFilePaths[0]
        resolve(urlPath)
      },
      fail(res) {
        // fail
        reject(res)
      },
    })
  })
}

export const uploadFile = (upFile) => {
  return Taro.uploadFile({
    url: "https://up-z2.qiniup.com",
    filePath: upFile,//chooseImage上传的图片,是一个临时路径
    name: "file",
    header: {
      "Content-Type": "multipart/form-data",
      'region': 'up-z2.qiniup.com', // 指定区域为 up-z2
      'bucket': 'muxi-miniproject'
    },
    formData: {
      key:`${Date.now()}.${upFile.split('.')[1]}`,
      token: Taro.getStorageSync('qiniutoken')
    },
    success(res) {
      // 这里返回key 与 hash
      console.log(res)
      return res
    },
  })

}
