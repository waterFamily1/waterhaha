import request from '@/plugins/request';

//区域位置结构
export function regionalCon () {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}
// 管理列表  
export function manageList (queryName,ids,page,names) {
    return request({
        url: '/patrol/api/points?queryName='+queryName+'&processIds='+ids+'&pageSize=10&currentPage='+page+'&processNames='+names,
        method: 'get'
    })
}
//巡检点新增 
export function addPoint (data) {
    return request({
        url: 'patrol/api/points',
        method: 'post',
        data
    })
}
//测点列表 
export function siteList (queryName,page,siteId) {
    return request({
        url: 'loong/api/mpoints/dialog?queryName='+queryName+'&currentPage='+page+'&pageSize=10&datasource=INPUT&siteId='+siteId,
        method: 'get'
    })
}

// 删除巡检点  

export function deletePoint (ids) {
    return request({
        url: 'patrol/api/points?ids='+ids,
        method: 'delete'
    })
}

// 巡检点详情  
export function pointDetail (id) {
    return request({
        url: '/patrol/api/points/'+id,
        method: 'get'
    })
}

// 巡检点编辑 patrol/api/points
export function editPoint (data) {
    return request({
        url: 'patrol/api/points',
        method: 'put',
        data
    })
}