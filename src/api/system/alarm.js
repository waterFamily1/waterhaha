import request from '@/plugins/request';

//获取列表
export function getListMethod(data) {
    return request({
        url: '/box/api/sim-alarm/alarms?queryName='+data.queryName+'&pageSize=10&currentPage='+data.currentPage+'&iccidstart=&iccidend=&alarmType='+data.alarmType+'&subscribeMode='+data.subscribeMode+'',
        method: 'get'
    })
}

//查询组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations?exNoAuth=true',
        method: 'get'
    })
}

//根据组织获取用户
export function userMethod(data) {
    return request({
        url: '/uaa/api/users?orgId='+data+'&pageSize=0',
        method: 'get'
    })
}

//删除
export function deleteMethod(data) {
    return request({
        url: '/box/api/sim-alarm/alarms?ids='+data,
        method: 'DELETE'
    })
}

//选择报警对象
export function alarmMethod(data) {
    return request({
        url: '/box/api/sim-manager/cards?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}

//保存(新增)
export function saveMethod(data) {
    return request({
        url: '/box/api/sim-alarm/alarms',
        method: 'post',
        data
    })
}

//编辑
export function editMethod(data) {
    return request({
        url: '/box/api/sim-alarm/alarm?id='+data,
        method: 'get'
    })
}

//编辑保存
export function editSaveMethod(data) {
    return request({
        url: '/box/api/sim-alarm/alarm',
        method: 'put',
        data
    })
}