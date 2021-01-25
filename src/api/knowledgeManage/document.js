import request from '@/plugins/request'

//全部 标签
export function labelTree() {
    return request({
        url: 'knowledge/api/labels/tree',
        method: 'get'
    })
}
//所属组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

//文档树 
export function documentTree() {
    return request({
        url: 'knowledge/api/directorys/tree',
        method: 'get'
    })
}

// 表格列表 
export function tableList(page,queryName,processId,directoryId,start,end) {
    return request({
        url: 'knowledge/api/documents?pageSize=10&currentPage='+page+'&queryName='+queryName+'&processId='+processId+'&directoryId='+directoryId+'&startDate='+start+'&endDate='+end,
        method: 'get'
    })
}

// 删除文件 
export function deleteDoc(id) {
    return request({
        url: 'knowledge/api/documents?ids='+id,
        method: 'delete'
    })
}
// 移动文件  knowledge/api/documents/move
export function moveDoc(data) {
    return request({
        url: 'knowledge/api/documents/move',
        method: 'put',
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

// 编辑文档 
export function editDoc(data) {
    return request({
        url: 'knowledge/api/documents',
        method: 'put',
        data
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

// 新建目录 
export function createCate(data) {
    return request({
        url: 'knowledge/api/directorys',
        method: 'post',
        data
    })
}
// 删除目录 
export function deleteCate(id) {
    return request({
        url: 'knowledge/api/directorys/'+id,
        method: 'delete',
    })
}
//编辑目录 knowledge/api/directorys
export function editCate(data) {
    return request({
        url: 'knowledge/api/directorys',
        method: 'put',
        data
    })
}
//上传文件
export function uploadFun(data) {
    return request({
        url: '/zuul/base/api/files/upload',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}

// 上传到区域下面  
export function areaUpload(data) {
    return request({
        url: 'knowledge/api/documents',
        method: 'post',
        data
    })
}

// 文档搜索 
export function docSearch(queryName) {
    return request({
        url: 'knowledge/api/directorys?queryName='+queryName+'&currentPage=1&pageSize=0',
        method: 'get'
    })
}