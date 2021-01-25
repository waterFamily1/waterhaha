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
// 收藏 
export function collectAction(id,type) {
    return request({
        url: 'knowledge/api/documents/collect?id='+id+'&type='+type,
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
// 获取角色 
export function roles(orgIds) {
    return request({
        url: 'uaa/api/roles?visibleProcessFill=false&orgIds='+orgIds+'&processId=1&currentPage=1&pageSize=0',
        method: 'get'
    })
}

// 获取组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}
// 编辑文档 
export function editDoc(data) {
    return request({
        url: 'knowledge/api/documents',
        method: 'put',
        data
    })
}
// 删除文档
export function deleteDoc(id) {
    return request({
        url: 'knowledge/api/documents?ids='+id,
        method: 'delete'
    })
}
