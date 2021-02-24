import request from '@/utils/request'

export function getList(readerId, params) {
    return request({
      url:
        '/bookManagement/readBook/getReadBooksPage/1/6/' +
        readerId,
      method: 'get',
      params,
    })
  }

  export function getListPage(currentPage, readerId, params) {
    return request({
      url:
        '/bookManagement/readBook/getReadBooksPage/' +
        currentPage +
        '/' +
        '6/' +
        readerId,
      method: 'get',
      params,
    })
  }

  export function cancelBorrowBook(borBookId, params) {
    return request({
      url:
        '/bookManagement/borrowBook/cancelBorrowBook/' +
        borBookId,
      method: 'get',
      params,
    })
  }

  export function getBorrowBook(borBookId, params) {
    return request({
      url:
        '/bookManagement/borrowBook/borrowBook/' +
        borBookId,
      method: 'get',
      params,
    })
  }

  export function getBackBook(borBookId, params) {
    return request({
      url:
        '/bookManagement/borrowBook/getBackBook/' +
        borBookId,
      method: 'get',
      params,
    })
  }

  export function getBorrowList(readerId, params) {
    return request({
      url:
        '/bookManagement/borrowBook/getReadBooksPage/1/6/' +
        readerId,
      method: 'get',
      params,
    })
  }

  export function getBorrowListPage(currentPage, readerId, params) {
    return request({
      url:
        '/bookManagement/borrowBook/getReadBooksPage/' +
        currentPage +
        '/' +
        '6/' +
        readerId,
      method: 'get',
      params,
    })
  }

  export function updateBorrowBookReadHis(readerId, bookId, expectGetBackTime, borBookNum, params) {
    return request({
      url:
        '/bookManagement/borrowBook/updateBorrowBookReadHis/' +
        readerId + '/' +
        bookId + '/' +
        expectGetBackTime + '/' +
        borBookNum,
      method: 'get',
      params,
    })
  }


  export function getEBookLikeNameList(bookName, params) {
    return request({
      url:
        '/bookManagement/eBook/getEBookLikeNameList/' +
        bookName,
      method: 'get',
      params,
    })
  }

  export function getBookLikeNameList(bookName, params) {
    return request({
      url:
        '/bookManagement/book/getBookLikeNameList/' +
        bookName,
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
  