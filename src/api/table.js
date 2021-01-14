import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReadersPage/1/6',
    method: 'get',
    params
  })
}

export function getListPage(currentPage, params) {
  return request({
    url: 'http://localhost:8888/bookManagement/reader/getReadersPage/' + currentPage + '/' + '6',
    // url: '/bookManagement/reader/getReadersPage/' + currentPage + '/' + '6',
    method: 'get',
    params
  })
}