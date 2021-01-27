import request from '@/utils/request'

export function getAllAd(params) {
    return request({
        url: '/bookManagement/adManagement/getAds',
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

export function getOneCategoryByBookCategoryId(categoryId, params) {
    return request({
      url:
        '/bookManagement/category/getOneCategoryByBookCategoryId/' +
        categoryId,
      method: 'get',
      params,
    })
  }

  export function getBookById(bookId, params) {
    return request({
      url:
        '/bookManagement/book/getBookById/' +
        bookId,
      method: 'get',
      params,
    })
  }

  export function updateReadEbookReadHis(readerId, eBookId, params) {
    return request({
      url:
        'http://localhost:8888/bookManagement/readBook/updateReadEbookReadHis/' +
        readerId + '/' +
        eBookId,
      method: 'get',
      params,
    })
  }


  export function getEBookById(bookId, params) {
    return request({
      url:
        '/bookManagement/eBook/getEBookById/' +
        bookId,
      method: 'get',
      params,
    })
  }
  