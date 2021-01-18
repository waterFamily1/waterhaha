import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/transfer/list?queryName='+data.queryName+'&orgId='+data.orgId+'&warehouseOutId='+data.warehouseOutId+'&warehouseInId='+data.warehouseInId+'&auditedFlag='+data.auditedFlag+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

// 获取组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

//出、入库仓库
export function wareMethod() {
    return request({
        url: '/inventory/api/warehouse/comboList',
        method: 'get'
    })
}

//出库人员
export function warePersonMethod(data) {
    return request({
        url: '/inventory/api/users/managinguser?orgIds='+data,
        method: 'get'
    })
}

//出库仓库
export function wareMethod1(data) {
    return request({
        url: '/inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}

//库位
export function wareMethod2(data) {
    console.log(data)
    return request({
        url: '/inventory/api/warehousePosition/move?warehouseId='+data.warehouseId+'&queryName='+data.queryName,
        method: 'get'
    })
}

//新增list
export function listMethod(data) {
    return request({
        url: '/inventory/api/transfer/materiel/list?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&warehouseOutId='+data.warehouseOutId+'&warehouseInId='+data.warehouseInId+'',
        method: 'get'
    })
}

//保存
export function saveMethod(data) {
    return request({
        url: '/inventory/api/transfer/transfer',
        method: 'post',
        data
    })
}

//删除
export function cancleMethod(data) {
    return request({
        url: '/inventory/api/transfer/transfer?id='+data,
        method: 'DELETE'
    })
}

//详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/transfer/transfer?id='+data,
        method: 'get'
    })
}

//详情列表
export function listMethod1(data) {
    return request({
        url: '/inventory/api/transfer/detail/list?id='+data.id+'&queryName'+data.queryName+'=&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//编辑列表
export function editMethod(data) {
    return request({
        url: '/inventory/api/transfer/transfer',
        method: 'put',
        data
    })
}

//审核
export function auditMethod(data) {
    return request({
        url: '/inventory/api/transfer/audited?id='+data,
        method: 'get'
    })
}