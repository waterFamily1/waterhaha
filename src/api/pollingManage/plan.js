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

// 删除计划  
export function deletePlan (id) {
    return request({
        url: '/patrol/api/plans/'+id,
        method: 'DELETE'
    })
}

// uaa/api/processes/tree
export function getTree() {
    return request({
        url: 'uaa/api/processes/tree',
        method: 'get'
    })
}

//巡检列表 
export function siteList (queryName,processIds,page) {
    return request({
        url: 'patrol/api/points?queryName='+queryName+'&currentPage='+page+'&pageSize=10&processIds='+processIds,
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

// 计划详情 
export function planDetail (id) {
    return request({
        url: 'patrol/api/plans/'+id,
        method:'get'
    })
}
// 终止计划  
export function endPlan (id) {
    return request({
        url: 'patrol/api/plans/interrupt/'+id,
        method:'PUT'
    })
}
// 下达任务 patrol/api/plans/release/26
export function  releasePlan(id) {
    return request({
        url: 'patrol/api/plans/release/'+id,
        method:'PUT'
    })
}

// 新增计划 
export function  addPlan(data) {
    return request({
        url: 'patrol/api/plans',
        method:'post',
        data
    })
}
// 编辑计划 patrol/api/plans
export function  editPlan(data) {
    return request({
        url: 'patrol/api/plans',
        method:'put',
        data
    })
}