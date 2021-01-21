import request from '@/plugins/request'


// 获取组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

// 最新上传 
export function newUpload(page) {
    return request({
        url: '/knowledge/api/home/documents?type=3&currentPage='+page+'&pageSize=10',
        method: 'get'
    })
}
// 我的知道 
export function myKnow() {
    return request({
        url: 'knowledge/api/home/mine',
        method: 'get'
    })
}
// 知识统计 
export function knowStat() {
    return request({
        url: 'knowledge/api/home/statistics',
        method: 'get'
    })
}
//全部 标签
export function labelTree() {
    return request({
        url: 'knowledge/api/labels/tree',
        method: 'get'
    })
}
//内容展示 
export function mainCon(type,page) {
    return request({
        url: 'knowledge/api/home/documents?type='+type+'&currentPage='+page+'&pageSize=10',
        method: 'get'
    })
}
// 内容3 展示 
export function mainContent(type,page,queryName,labelName) {
    return request({
        url: 'knowledge/api/home/documents?type='+type+'&queryName='+queryName+'&labelName='+labelName+'&currentPage='+page+'&pageSize=10',
        method: 'get'
    })
}
// 收藏和取消收藏 
export function collect(id,type) {
    return request({
        url: 'knowledge/api/documents/collect?id='+id+'&type='+type,
        method: 'get'
    })
}
// 获取角色 
export function roles(orgIds) {
    return request({
        url: 'uaa/api/roles?visibleProcessFill=false&orgIds='+orgIds+'&processId=1&currentPage=1&pageSize=0',
        method: 'get'
    })
}
// 文档推荐 
export function recommend(data) {
    return request({
        url: 'knowledge/api/documents/recommend',
        method: 'put',
        data
    })
}