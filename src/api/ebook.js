import request from '@/utils/request'
export function getList(params) {
  return request({
    url:
      '/bookManagement/eBook/getEbooksPage/1/7',
    method: 'get',
    params,
  })
}

export function getReadList(params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/readBook/getAllReadBooksPage/1/6',
    method: 'get',
    params,
  })
}

export function getReadListPage(currentPage, params) {
  return request({
    url:
      'http://localhost:8888/bookManagement/readBook/getAllReadBooksPage/' +
      currentPage +
      '/' +
      '6',
    method: 'get',
    params,
  })
}

export function getAllReader(params) {
  return request({
    url: '/bookManagement/eBook/getEBooks',
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
      '/bookManagement/eBook/getEBookLikeNameList/' +
      bookName,
    method: 'get',
    params,
  })
}

export function getReaderById(bookId, params) {
  return request({
    url:
      '/bookManagement/eBook/getEBookById/' +
      bookId,
    method: 'get',
    params,
  })
}


export function getListPage(currentPage, params) {
  return request({
    url:
      '/bookManagement/eBook/getEbooksPage/' +
      currentPage +
      '/' +
      '7',
    method: 'get',
    params,
  })
}

export function addReader(params) {
  return request({
    url: '/bookManagement/eBook/addEBook',
    method: 'post',
    params,
  })
}

export function updateReader(params) {
  return request({
    url: '/bookManagement/eBook/updateEBook',
    method: 'put',
    params,
  })
}

export function deleteReader(id, params) {
  return request({
    url:
      '/bookManagement/eBook/deleteEBook/' +
      id,
    method: 'delete',
    params,
  })
}
