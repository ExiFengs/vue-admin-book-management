import request from '@/utils/request'
export function getList(params) {
  return request({
    url:
      '/bookManagement/book/getBooksPage/1/7',
    method: 'get',
    params,
  })
}

export function getAllReader(params) {
  return request({
    url: '/bookManagement/book/getBooks',
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
      '/bookManagement/book/getBookLikeNameList/' +
      bookName,
    method: 'get',
    params,
  })
}

export function getReaderById(bookId, params) {
  return request({
    url:
      '/bookManagement/book/getBookById/' +
      bookId,
    method: 'get',
    params,
  })
}


export function getListPage(currentPage, params) {
  return request({
    url:
      '/bookManagement/book/getBooksPage/' +
      currentPage +
      '/' +
      '7',
    method: 'get',
    params,
  })
}

export function addReader(params) {
  return request({
    url: '/bookManagement/book/addBook',
    method: 'post',
    params,
  })
}

export function updateReader(params) {
  return request({
    url: '/bookManagement/book/updateBook',
    method: 'put',
    params,
  })
}

export function deleteReader(id, params) {
  return request({
    url:
      '/bookManagement/book/deleteBook/' +
      id,
    method: 'delete',
    params,
  })
}
