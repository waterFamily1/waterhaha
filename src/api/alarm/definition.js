import request from '@/plugins/request';
// 获取名称结构数据
export function getTree() {
    return request({
        url: 'uaa/api/processes/tree',
        method: 'get'
    })
}
//定义列表 
export function getList(siteId,queryName,enabledStatus,disarmMethod,alarmLevel,page) {
    return request({
        url: 'loong/api/alarm-definitions?siteId='+siteId+'&queryName='+queryName+'&enabledStatus='+enabledStatus+'&disarmMethod='+disarmMethod+'&alarmLevel='+alarmLevel+'&pageSize=10&currentPage='+page,
        method: 'get'
    })
}

// 接受对象 uaa/api/users/select
export function getUsers() {
    return request({
        url: 'uaa/api/users/select',
        method: 'get'
    })
}

// 模态数据列表  
export function getModalList(queryName,page,siteId) {
    return request({
        url: 'loong/api/mpoints/dialog?queryName='+queryName+'&currentPage='+page+'&pageSize=10&datasource=AUTO&fire=true&siteId='+siteId,
        method: 'get'
    })
}
// 新增定义  
export function addDefinition(data) {
    return request({
        url: 'loong/api/alarm-definitions',
        method: 'post',
        data
  
    })
}
//删除定义  
export function deletDefine(id) {
    return request({
        url: 'loong/api/alarm-definitions?ids='+id,
        method: 'delete'
    })
}

// 启用 停用
export function changeState(data) {
    return request({
        url: 'loong/api/alarm-definitions/status',
        method: 'PATCH',
        data
    })
}
// 获取详情  loong/api/alarm-definitions/11
export function getDetail(id) {
    return request({
        url: 'loong/api/alarm-definitions/'+id,
        method: 'get'
    })
}

// 编辑定义 
export function editDefinition(data) {
    return request({
        url: 'loong/api/alarm-definitions',
        method: 'put',
        data
  
    })
}
