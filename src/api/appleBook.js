import request from '@/utils/request'
export function getList(params) {
  return request({
    url:
      '/bookManagement/appleBook/getBooksPage/1/7',
    method: 'get',
    params,
  })
}

export function getAllReader(params) {
  return request({
    url: '/bookManagement/appleBook/getBooks',
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

export function getReaderLikeNameList(bookName, params) {
  return request({
    url:
      '/bookManagement/appleBook/getBookLikeNameList/' +
      bookName,
    method: 'get',
    params,
  })
}

export function getReaderById(bookId, params) {
  return request({
    url:
      '/bookManagement/appleBook/getBookById/' +
      bookId,
    method: 'get',
    params,
  })
}


export function getListPage(currentPage, params) {
  return request({
    url:
      '/bookManagement/appleBook/getBooksPage/' +
      currentPage +
      '/' +
      '7',
    method: 'get',
    params,
  })
}

export function refuse(params) {
  return request({
    url: '/bookManagement/appleBook/refuse',
    method: 'put',
    params,
  })
}

export function putAway(params) {
  return request({
    url: '/bookManagement/appleBook/putAway',
    method: 'put',
    params,
  })
}

export function addReader(params) {
  return request({
    url: '/bookManagement/appleBook/addBook',
    method: 'post',
    params,
  })
}

export function updateReader(params) {
  return request({
    url: '/bookManagement/appleBook/updateBook',
    method: 'put',
    params,
  })
}

export function deleteReader(id, params) {
  return request({
    url:
      '/bookManagement/appleBook/deleteBook/' +
      id,
    method: 'delete',
    params,
  })
}
