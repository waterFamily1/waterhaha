import request from '@/plugins/request';

//获取列表
export function getList(data) {
    return request({
        url: '/base/api/operation-logs?platform='+data.platform+'&businessName='+data.operationName+'&operationName='+data.handleName+'&startDate='+data.startTime+'&endDate='+data.endTime+'&pageSize=10&currentPage='+data.pageNum+'',
        method: 'get'
    })
}

//业务名称
export function getBusinessName(data) {
    return request({
        url: '/base/api/operation-log-menus?platform='+data,
        method: 'get'
    })
}

//操作名称搜索
export function searchHandleName(data) {
    return request({
        url: '/base/api/operation-log-configs?operationName='+data+'&currentPage=1&pageSize=0',
        method: 'get'
    })
}