import request from '@/plugins/request';

// 获取组织
export function getOrganizations () {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

// 任务列表 
export function getList (queryName,orgId,start,end,status,type,page) {
    return request({
        url: '/patrol/api/tasks?queryName='+queryName+'&orgId='+orgId+'&executeDateStart='+start+'&executeDateEnd='+end+'&executeStatus='+status+'&type='+type+'&currentPage='+page+'&pageSize=10',
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

// 删除任务 
export function deleteTask (id) {
    return request({
        url: 'patrol/api/tasks?ids='+id,
        method:'delete'
    })
} 