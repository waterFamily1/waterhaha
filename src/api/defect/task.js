import request from '@/plugins/request';

//查询组织
export function getOrg () {
    return request({
        url: 'uaa/api/organizations'
    })
}
//区域位置结构
export function regionalCon () {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//缺陷列表 
export function defectList (queryName,orgIds,faultTypes,states,start,end,severityTypes,page) {
    return request({
        url: 'equipment/api/faults?queryName='+queryName+'&orgIds='+orgIds+'&faultTypes='+faultTypes+'&states='+states+'&startDate='+start+'&endDate='+end+'&severityTypes='+severityTypes+'&pageSize=10&currentPage='+page,
        method: 'get'
    })
}
// 缺陷详情 equipment/api/faults/4
export function getDetail (id) {
    return request({
        url: 'equipment/api/faults/'+id,
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
        url: 'base/api/concerns?concernIds='+id+'&type=fault',
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

// 保存申请 
export function saveDefect (data) {
    return request({
        url: 'equipment/api/faults',
        method:'post',
        data
    })
}
// 上传图片   fullPath  thumbFullPath
// 上传图片
export function uploadImg (data) {
    return request({
        url: '/base/api/files/upload-ex',
        method : 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:data
    })
}

//任务分配 
export function assign (data) {
    return request({
        url: 'equipment/api/faults/assign',
        method:'put',
        data
    })
}
// 挂起  
export function hangUp (data) {
    return request({
        url: 'equipment/api/faults/process',
        method:'put',
        data
    })
}