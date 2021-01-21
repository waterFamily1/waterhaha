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