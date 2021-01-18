import request from '@/plugins/request'

//区域位置
export function siteMethod() {
    return request({
        url: '/loong/api/videos/tree',
        method: 'get'
    })
}