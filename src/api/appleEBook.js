import request from '@/utils/request'
export function getList(params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/appleEBook/getBooksPage/1/7' ,
    method: 'get',
    params,
  })
}

export function getListById(readerId, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/appleEBook/getBooksPageById/1/7/' + readerId,
    method: 'get',
    params,
  })
}


export function getAllReader(params) {
  return request({
    url: '/bookManagement/appleEBook/getBooks',
    method: 'get',
    params,
  })
}

export function getAllCategory(params) {
  return request({
    url: '/bookManagement/category/getAllCategory',
    method: 'get',
    params,
  })
}

export function getReaderLikeNameList(bookName, id, params) {
  return request({
    url:
      '/bookManagement/appleEBook/getBookLikeNameListById/' +
      bookName +
      '/' +
      id,
    method: 'get',
    params,
  })
}

export function getReaderById(bookId, params) {
  return request({
    url:
      '/bookManagement/appleEBook/getBookById/' +
      bookId,
    method: 'get',
    params,
  })
}


export function getListPage(currentPage, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/appleEBook/getBooksPage/' +
      currentPage +
      '/' +
      '7/',
    method: 'get',
    params,
  })
}

export function getListPageById(currentPage, readerId, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/appleEBook/getBooksPageById/' +
      currentPage +
      '/' +
      '7/' + + readerId,
    method: 'get',
    params,
  })
}


export function refuse(params) {
  return request({
    url: '/bookManagement/appleEBook/refuse',
    method: 'put',
    params,
  })
}

export function putAway(params) {
  return request({
    url: '/bookManagement/appleEBook/putAway',
    method: 'put',
    params,
  })
}

export function addReader(params) {
  return request({
    url: '/bookManagement/appleEBook/addBook',
    method: 'post',
    params,
  })
}

export function updateReader(params) {
  return request({
    url: '/bookManagement/appleEBook/updateBook',
    method: 'put',
    params,
  })
}

export function deleteReader(id, params) {
  return request({
    url:
      '/bookManagement/appleEBook/deleteBook/' +
      id,
    method: 'delete',
    params,
  })
}
