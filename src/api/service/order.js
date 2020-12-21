import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/equipment/api/repairs?queryName='+data.queryName+'&processIds='+data.processIds+'&repairTypes=&states=0,1,2,5&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//区域位置
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//获取详情
export function detailMethod(data) {
    return request({
        url: '/equipment/api/repairs/'+data,
        method: 'get'
    })
}

//备件申请
export function partMethod(data) {
    return request({
        url: '/inventory/api/outbounds/web?associationId='+data.associationId+'&associationNo='+data.associationNo,
        method: 'get'
    })
}

//添加关注
export function attentionMethod(data) {
    return request({
        url: '/base/api/concerns',
        method: 'post',
        data
    })
}

//取消关注
export function cancleAttenMethod(data) {
    return request({
        url: '/base/api/concerns?concernIds='+data+'&type=repair',
        method: 'get'
    })
}

// 获取组织
export function getOrganizations() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

//获取人员
export function personMethod(data) {
    return request({
        url: '/uaa/api/users/select?orgId='+data,
        method: 'get'
    })
}

//分派
export function dispatchMethod(data) {
    return request({
        url: '/equipment/api/repairs/assign',
        method: 'put',
        data
    })
}

//挂起 / 关闭
export function hangMethod(data) {
    return request({
        url: '/equipment/api/repairs/process',
        method: 'put',
        data
    })
}