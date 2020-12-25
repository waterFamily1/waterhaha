import request from '@/plugins/request';

// 计划列表
export function planList (planName,dateRange,start,end,state,page) {
    return request({
        url: 'equipment/api/maintains/plans?planName='+planName+'&dateRange='+dateRange+'&state='+state+'&pageSize=10&currentPage='+page+'&startDate='+start+'&endDate='+end,
        method: 'get'
    })
}
//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//设备类型
export function typeMethod() {
    return request({
        url: '/equipment/api/maintain/plan/empTypeTree',
        method: 'get'
    })
}

// 保养列表 
export function maintainList (equipmentTypeId,areaId) {
    return request({
        url: 'equipment/api/maintains/initGenerate?pageFlag=1&equipmentTypeId='+equipmentTypeId+'&areaId='+areaId,
        method: 'get'
    })
}

// 新增保养计划 
export function addPlan (data) {
    return request({
        url: 'equipment/api/maintains/plan',
        method: 'post',
        data
    })
}
// 删除保养计划  
export function deletePlan (id) {
    return request({
        url: 'equipment/api/maintains/plan?ids='+id,
        method: 'DELETE',
    })
}
// 获取执行人员  
export function patrolList() {
    return request({
        url: '/uaa/api/user/allocate-patrol',
        method: 'get'
    })
}
// 获取保养内容  
export function remainCon(id) {
    return request({
        url: '/equipment/api/maintain/plan/contents/'+id,
        method: 'get'
    })
}
// 保养详情  
export function remainDetail(id) {
    return request({
        url: '/equipment/api/maintain/plan/'+id,
        method: 'get'
    })
}
// 详情列表 
export function detailList(page,planId,equipmentTypeId,areaId,contents) {
    return request({
        url: '/equipment/api/maintain/plan/detail?pageSize=10&currentPage='+page+'&total=0&pageFlag=1&planId='+planId+'&equipmentTypeId='+equipmentTypeId+'&areaId='+areaId+'&contents='+contents,
        method: 'get'
    })
}
// 分配任务  
export function assignTask (data) {
    return request({
        url: 'equipment/api/maintains/plan/assign',
        method: 'post',
        data
    })
}

// 下达任务  
export function distributeTask (data) {
    return request({
        url: 'equipment/api/maintains/plan/distributeTask',
        method: 'post',
        data
    })
}

//编辑获取列表  
export function editDetail(planId,equipmentTypeId,areaId) {
    return request({
        url: '/equipment/api/maintain/plan/detail?pageFlag=1&planId='+planId+'&equipmentTypeId='+equipmentTypeId+'&areaId='+areaId,
        method: 'get'
    })
}