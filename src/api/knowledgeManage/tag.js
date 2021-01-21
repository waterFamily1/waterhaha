import request from '@/plugins/request'

//全部 标签
export function labelTree() {
    return request({
        url: 'knowledge/api/labels/tree',
        method: 'get'
    })
}

// 新建类别  
export function createLabel(data) {
    return request({
        url: 'knowledge/api/labels',
        method: 'POST',
        data
    })
}

// 删除类别 
export function deleteLabel(id) {
    return request({
        url: 'knowledge/api/labels/'+id,
        method: 'delete'
    })
}
// 编辑类别 
export function editLabel(data) {
    return request({
        url: 'knowledge/api/labels',
        method: 'PUT',
        data
    })
}

// 搜索 
export function searchWord(queryName) {
    return request({
        url: 'knowledge/api/labels?queryName='+queryName+'&currentPage=1&pageSize=0',
        method: 'get'
    })
}