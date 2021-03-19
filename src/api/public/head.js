import request from '@/plugins/request'

//消息中心
export function newsCenterMethod() {
    return request({
        url: '/message/api/messages/unread',
        method: 'get'
    })
}

//侧边栏图片
export function imgMethod() {
    return request({
        url: '/base/api/products/skin/fromBusiness',
        method: 'get'
    })
}