import request from '@/utils/request'
export function getList(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReadersPage/1/7',
    method: 'get',
    params
  })
}

export function getAllReader(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReaders',
    method: 'get',
    params
  })
}

export function getReaderLikeNameList(readerName, params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReaderLikeNameList/' + readerName,
    method: 'get',
    params
  })
}

export function getReaderById(readerId, params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReaderById/' + readerId,
    method: 'get',
    params
  })
}

export function getListPage(currentPage, params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReadersPage/' + currentPage + '/' + '7',
    // url: '/bookManagement/reader/getReadersPage/' + currentPage + '/' + '6',
    method: 'get',
    params
  })
}

export function addReader(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/addReader',
    method: 'post',
    params
  })
}

export function updateReader(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/updateReader',
    method: 'put',
    params
  })
}

export function deleteReader(id, params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/deleteReader/' + id,
    method: 'delete',
    params
  })
}

export function getNowFormatDate () {
  var date =  new  Date();
  var seperator1 =  "-" ; 
  var blank = " ";
  var sep = ":"
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var hour = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
  var mf = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
  var ss = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
  if (month >= 1 && month <= 9) {
    month =  "0"  + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate =  "0"  + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + blank + hour + sep + mf + sep +ss;
  return currentdate;
};