import request from '@/utils/request'
export function getList(params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/adManagement/getAdsPage/1/7',
    method: 'get',
    params,
  })
}

export function getAllReader(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/adManagement/getAds',
    method: 'get',
    params,
  })
}

export function getReaderLikeNameList(adName, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/adManagement/getAdLikeNameList/' +
      adName,
    method: 'get',
    params,
  })
}

export function getReaderById(adId, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/adManagement/getAdById/' +
      adId,
    method: 'get',
    params,
  })
}

export function getListPage(currentPage, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/adManagement/getAdsPage/' +
      currentPage +
      '/' +
      '7',
    method: 'get',
    params,
  })
}

export function addReader(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/adManagement/addAd',
    method: 'post',
    params,
  })
}

export function updateReader(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/adManagement/updateAd',
    method: 'put',
    params,
  })
}

export function deleteReader(id, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/adManagement/deleteAd/' +
      id,
    method: 'delete',
    params,
  })
}

export function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var blank = ' '
  var sep = ':'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mf = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate =
    year +
    seperator1 +
    month +
    seperator1 +
    strDate +
    blank +
    hour +
    sep +
    mf +
    sep +
    ss
  return currentdate
}
