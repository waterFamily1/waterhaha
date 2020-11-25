import request from '@/plugins/request';

// 获取名称结构数据
export function getTree() {
    return request({
        url: 'uaa/api/processes/tree',
        method: 'get'
    })
}
// 订阅列表 
export function getList(siteId,queryName,mode,frequency,time,page) {
    return request({
        url: 'loong/api/alarm-subscriptions?siteId='+siteId+'&queryName='+queryName+'&subscribeMode='+mode+'&pushFrequency='+frequency+'&delayPushTime='+time+'&pageSize=10&currentPage='+page,
        method: 'get'
    })
}
// 报警列表 
export function alarmList(queryName,page,executeStatus,telantId,siteId) {
    return request({
        url:'loong/api/alarm-definitions?queryName='+queryName+'&currentPage='+page+'&pageSize=10&executeStatus='+executeStatus+'&telantId='+telantId+'&siteId='+siteId,
        method: 'get'
    })
}
// 获取所有组织

export function getOrg() {
    return request({
        url: 'uaa/api/organizations?exNoAuth=true',
        method: 'get'
    })
}

// 根据组织查询用户  uaa/api/users?orgId=2&pageSize=0
export function getUsers(orgId) {
    return request({
        url: 'uaa/api/users?orgId='+orgId+'&pageSize=0',
        method: 'get'
    })
}

// 新增订阅 http://web.tjdeht.cn:8801/
export function addSub(data) {
    return request({
        url: 'loong/api/alarm-subscriptions',
        method: 'post',
        data
    })
}