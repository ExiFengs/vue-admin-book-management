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
