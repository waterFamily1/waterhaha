// 
import request from '@/plugins/request';
//查询组织
export function getOrg () {
    return request({
        url: 'uaa/api/organizations'
    })
}
// 任务列表
export function taskList (planName,dateRange,start,end,state,executeUserId,page,orgId) {
    return request({
        url: 'equipment/api/maintains/tasks?keyWord='+planName+'&dateRange='+dateRange+'&state='+state+'&executeUserId='+executeUserId+'&pageSize=10&currentPage='+page+'&startDate='+start+'&endDate='+end+"&orgId="+orgId,
        method: 'get'
    })
}
// 删除任务  
export function deleteTask (id) {
    return request({
        url: 'equipment/api/maintains/task?ids='+id,
        method: 'delete'
    })
}
// 任务详情 
export function taskDetail (id) {
    return request({
        url: 'equipment/api/maintain/task/'+id,
        method: 'get'
    })
}
// 详情列表 
export function detailList (taskId,page) {
    return request({
        url: 'equipment/api/maintain/task/detail/?taskId='+taskId+'&pageFlag=0&currentPage='+page+'&pageSize=10',
        method: 'get'
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
        url: 'base/api/concerns?concernIds='+id+'&type=maintain',
        method:'DELETE'
    })
}
//相关人员 
export function getUsers (id) {
    return request({
        url: 'uaa/api/users/select?orgId='+id,
        method:'get'
    })
}
//分配任务 
export function assign (taskId,transferToId) {
    return request({
        url: 'equipment/api/maintains/task/transfer?taskId='+taskId+'&transferToId='+transferToId,
        method:'get'
    })
}