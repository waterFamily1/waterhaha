import request from '@/plugins/request'

//全部 标签
export function labelTree() {
    return request({
        url: 'knowledge/api/labels/tree',
        method: 'get'
    })
}

// 我的下载 
export function myDownload(page,queryName) {
    return request({
        url: 'knowledge/api/personal/download?pageSize=10&currentPage='+page+'&queryName='+queryName,
        method: 'get'
    })
}

// 我的上传 knowledge/api/personal/upload?pageSize=10&currentPage=1&queryName=
export function myUpload(page,queryName) {
    return request({
        url: 'knowledge/api/personal/upload?pageSize=10&currentPage='+page+'&queryName='+queryName,
        method: 'get'
    })
}

// 我的收藏 knowledge/api/personal/collection?pageSize=10&currentPage=1&queryName=
export function myCollect(page,queryName) {
    return request({
        url: 'knowledge/api/personal/collection?pageSize=10&currentPage='+page+'&queryName='+queryName,
        method: 'get'
    })
}

// 推荐我的 knowledge/api/personal/recommend?pageSize=10&currentPage=1&queryName=
export function recommendMe(page,queryName) {
    return request({
        url: 'knowledge/api/personal/recommend?pageSize=10&currentPage='+page+'&queryName='+queryName,
        method: 'get'
    })
}

// 用户标签  
export function userLabel() {
    return request({
        url: 'knowledge/api/user-labels',
        method: 'get'
    })
}
// 删除标签 
export function deleteLabel(label) {
    return request({
        url: 'knowledge/api/user-labels?userLabel='+label,
        method: 'delete'
    })
}
// 添加标签 
export function addLabel(data) {
    return request({
        url: 'knowledge/api/user-labels',
        method: 'post',
        data
    })
}