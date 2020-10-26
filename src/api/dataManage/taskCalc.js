import request from '@/plugins/request';

//获取列表
export function getListMethod(data) {
    return request({
        url: '/loong/api/calc-tasks?pageSize=10&currentPage='+data.currentPage+'&queryName='+data.queryName+'&siteId='+data.siteId+'&status='+data.status+'&execute=',
        method: 'get'
    })
}

//删除
export function removeMethod(data) {
    return request({
        url: '/loong/api/calc-tasks?ids='+data,
        method: 'DELETE'
    })
}

//启用 or 停用
export function invokeMethod(data) {
    return request({
        url: '/loong/api/calc-tasks/status',
        method: 'post',
        data
    })
}

//重新计算
export function recountMethod(data) {
    return request({
        url: '/loong/api/calc-tasks/batch-complements',
        method: 'post',
        data
    })
}

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//查看详情 => 基本信息
export function detailBasicMethod(data) {
    return request({
        url: '/loong/api/mpoints-calc/'+data,
        method: 'get'
    })
}

//查看详情 => 计算任务
export function detailCountMethod1(data) {
    return request({
        url: '/loong/api/calc-tasks/target-mpoint?mpointId='+data,
        method: 'get'
    })
}