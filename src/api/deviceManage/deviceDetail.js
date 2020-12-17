import request from '@/plugins/request'

//详情
export function detailMethod(data) {
    return request({
        url: '/equipment/api/equipments/state/'+data,
        method: 'get'
    })
}

//相关测点
export function mpointMethod(data) {
    return request({
        url: '/equipment/api/equipments/mpoint?equId='+data.equId+'&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}

//相关报警
export function alarmMethod(data) {
    return request({
        url: '/equipment/api/alarm-records?equId='+data.equId+'&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}

//缺陷历史
export function faultMethod(data) {
    return request({
        url: '/equipment/api/faults/equ?equId='+data.equId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//维修历史
export function repairMethod(data) {
    return request({
        url: '/equipment/api/repairs/equ?equId='+data.equId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//保养历史
export function mainMethod(data) {
    return request({
        url: '/equipment/api/maintains/tasks/equ?equId='+data.equId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//备注历史
export function hisMethod(data) {
    return request({
        url: '/equipment/api/equ-comments?equId='+data.equId+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//相关人员
export function personMethod() {
    return request({
        url: '/uaa/api/users/select',
        method: 'get'
    })
}

//新增备注历史
export function newHisMethod(data) {
    return request({
        url: '/equipment/api/equ-comments',
        method: 'post',
        data
    })
}