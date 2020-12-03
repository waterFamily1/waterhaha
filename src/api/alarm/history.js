import request from '@/plugins/request';

// 获取名称结构数据
export function getTree() {
    return request({
        url: 'uaa/api/processes/tree',
        method: 'get'
    })
}
//获取历史列表  

export function getList(siteId,queryName,begin,end,alarmStatus,methods,level,page,siteName) {
    return request({
        url: 'loong/api/alarm-records?siteId='+siteId+'&queryName='+queryName+'&telantId=&beginDate='+begin+'&endDate='+end+'&alarmStatus='+alarmStatus+'&disarmMethod='+methods+'&alarmLevel='+level+'&handleStatus=&pageSize=10&currentPage='+page+'&siteName='+siteName,
        method: 'get'
    })
}
// 获取详情  
export function getDetail(id) {
    return request({
        url: 'loong/api/alarm-records/detail/'+id,
        method: 'get'
    })
}
//确认报警 loong/api/alarm-records/confirm
export function confirmAlarm(data) {
    return request({
        url: 'loong/api/alarm-records/confirm',
        method: 'put',
        data
    })
}