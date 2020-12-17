import request from '@/plugins/request';

// 获取组织
export function getOrganizations () {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}
//计划列表 
export function planList (queryName,orgId,start,end,status,page) {
    return request({
        url: '/patrol/api/plans?queryName='+queryName+'&orgId='+orgId+'&startTime='+start+'&endTime='+end+'&status='+status+'&pageSize=100&currentPage='+page,
        method: 'get'
    })
}