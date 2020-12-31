import request from '@/plugins/request';

// 获取组织
export function getOrganizations () {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

// 获取统计列表
export function getList (orgId,executorId,executeDateStart,executeDateEnd,executeStatus,page,orgName) {
    return request({
        url: '/patrol/api/tasks/statistics?orgId='+orgId+'&queryName=&executorId='+executorId+'&executeDateStart='+executeDateStart+'&executeDateEnd='+executeDateEnd+'&executeStatus='+executeStatus+'&pageSize=10&currentPage='+page+'&orgName='+orgName,
        method: 'get'
    })
}
//执行人员 
export function getUsers (id) {
    return request({
        url: 'uaa/api/users/select?orgId='+id,
        method:'get'
    })
} 