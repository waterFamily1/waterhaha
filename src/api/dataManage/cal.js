import request from '@/plugins/request'

//区域位置
export function areaMethod() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//数据分类
export function dataMethod(data) {
    return request({
        url: '/loong/api/mpoints-datacategory?mpointType='+data,
        method: 'get'
    })
}

//所属设备
export function fromEqu(data) {
    return request({
        url: '/equipment/api/equipments?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&processIds='+data.processIds+'',
        method: 'get'
    })
}

//计算方法
export function countMethod(data) {
    return request({
        url: 'loong/api/calc-formulas?type='+data,
        method: 'get'
    })
}

//计算周期
export function countCycleMethod() {
    return request({
        url: 'loong/api/mpoints-calc-cycle',
        method: 'get'
    })
}

//数据源测点
export function dataMethod1(data) {
    return request({
        url: 'loong/api/mpoints/dialog?filterId=&queryName='+data.queryName+'&executeStatus=&siteId=1&datasource=&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//保存
export function saveMethod(data) {
    return request({
        url: '/loong/api/mpoints-task',
        method: 'post',
        data
    })
}

//单测点编辑
export function editMethod(data) {
    return request({
        url: '/loong/api/mpoints-calc/'+data,
        method: 'get'
    })
}

export function editMethod1(data) {
    return request({
        url: '/loong/api/calc-tasks/target-mpoint?mpointId='+data,
        method: 'get'
    })
}

export function editMethod2(data) {
    return request({
        url: '/loong/api/calc-parms?taskId='+data,
        method: 'get'
    })
}

//编辑保存
export function saveMethod1(data) {
    return request({
        url: '/loong/api/mpoints-task',
        method: 'put',
        data
    })
}

//公式说明
export function gongshiMethod(data) {
    return request({
        url: '/loong/api/calc-tasks/formula?formulaId='+data,
        method: 'get'
    })
}

export function method1(data) {
    return request({
        url: '/loong/api/calc-formulas?type='+data,
        method: 'get'
    })
}