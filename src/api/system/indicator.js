import request from '@/plugins/request';

//获取列表
export function getListMethod(data) {
    return request({
        url: '/loong/api/indexes?queryName='+data.queryName+'&processId='+data.processId+'&indexType='+data.indexType+'&pageSize=10&currentPage='+data.pageNum+'',
        method: 'get'
    })
}

//删除 
export function deleteMethod(data) {
    return request({
        url: '/loong/api/indexes?ids='+data,
        method: 'DELETE'
    })
}

//查看详情
export function detailMethod(data) {
    return request({
        url: '/loong/api/indexes/'+data,
        method: 'get'
    })
}

//区域位置
export function areaMethod() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//测点名称
export function pointMethod(data) {
    return request({
        url: 'loong/api/mpoints/dialog?queryName='+data.queryName+'&currentPage='+data.pageNum+'&pageSize=10&siteId='+data.siteId,
        method: 'get'
    })
}

//保存(编辑)
export function saveMethod(data) {
    return request({
        url: '/loong/api/indexes',
        method: 'put',
        data
    })
}

//保存(新增)
export function saveAddMethod(data) {
    return request({
        url: '/loong/api/indexes',
        method: 'post',
        data
    })
}
