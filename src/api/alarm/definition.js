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