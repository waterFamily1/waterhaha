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
export function getUsers () {
    return request({
        url: 'uaa/api/user/allocate-patrol',
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
// 任务详情 
export function taskDetail (id) {
    return request({
        url: 'patrol/api/tasks/'+id,
        method:'get'
    })
} 
// 添加关注  
export function addCon (data) {
    return request({
        url: 'base/api/concerns',
        method:'post',
        data
    })
}
// 取消关注  
export function cancelCon (id) {
    return request({
        url: 'base/api/concerns?concernIds='+id+'&type=patrol',
        method:'DELETE'
    })
}

// 分配任务  
export function assign (data) {
    return request({
        url: 'patrol/api/tasks',
        method:'put',
        data
    })
}
// 终止任务  
export function suspend (data) {
    return request({
        url: 'patrol/api/tasks',
        method:'put',
        data
    })
}