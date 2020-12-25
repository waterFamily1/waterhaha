import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/store-adjustment/list?queryName='+data.queryName+'&orgId='+data.orgId+'&warehouseId='+data.warehouseId+'&auditedFlag='+data.auditedFlag+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
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

//调整仓库
export function wareMethod() {
    return request({
        url: '/inventory/api/warehouse/comboList',
        method: 'get'
    })
}

//关键字
export function keywordMethod(data) {
    return request({
        url: '/inventory/api/stock/materiel?queryName='+data+'&currentPage=1&pageSize=5',
        method: 'get'
    })
}

//当前仓库
export function wareMethod1(data) {
    return request({
        url: '/inventory/api/stock/warehous?materielId='+data+'&currentPage=1&pageSize=10',
        method: 'get'
    })
}

//当前库位
export function locatMethod(data) {
    return request({
        url: '/inventory/api/stock/position?materielId='+data.materielId+'&warehouseId='+data.warehouseId+'&currentPage=1&pageSize=0',
        method: 'get'
    })
}

//目标库位
export function targetMethod(data) {
    return request({
        url: '/inventory/api/warehousePosition/move?queryName='+data.queryName+'&warehouseId='+data.warehouseId+'&warehousePositionId='+data.warehousePositionId+'&currentPage=1&pageSize=0',
        method: 'get'
    })
}

//提交
export function inventMethod(data) {
    return request({
        url: '/inventory/api/store-adjustment/move',
        method: 'post',
        data
    })
}

//创建人员
export function personMethod(data) {
    return request({
        url: '/inventory/api/users/managinguser?orgIds='+data,
        method: 'get'
    })
}

//调整仓库
export function wareMethod2(data) {
    return request({
        url: '/inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}

//库存调整增加
export function addMethod(data) {
    return request({
        url: '/inventory/api/materiel/external?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&warehouseId='+data.warehouseId,
        method: 'get'
    })
}

//增加
export function addMethod1(data) {
    return request({
        url: '/inventory/api/store-adjustment/materiel/list?materielIds='+data.materielIds+'&warehouseId='+data.warehouseId,
        method: 'get'
    })
}

//保存库存调整新增
export function saveAddMethod(data) {
    return request({
        url: '/inventory/api/store-adjustment/adjusment',
        method: 'post',
        data
    })
}

//查看详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/store-adjustment/adjusment?id='+data,
        method: 'get'
    })
}

//查看详情表格
export function detailTableMethod(data) {
    return request({
        url: '/inventory/api/store-adjustment/detail/list?id=4&queryName=&pageSize=10&currentPage=1',
        method: 'get'
    })
}