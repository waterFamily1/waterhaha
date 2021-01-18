import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/warehouses?queryName='+data.queryName+'&orgIds='+data.orgIds+'&pageSize=10&currentPage='+data.currentPage+'',
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

//仓库名称
export function wareMethod(data) {
    return request({
        url: '/inventory/api/warehouse/check-warehousename-isexist?warehouseName='+data,
        method: 'get'
    })
}

//负责人
export function personMethod(data) {
    return request({
        url: '/inventory/api/users/managinguser?orgIds='+data,
        method: 'get'
    })
}

//新增保存
export function saveMethod(data) {
    return request({
        url: '/inventory/api/warehouse',
        method: 'post',
        data
    })
}

//详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/warehouse/'+data,
        method: 'get'
    })
}

//详情=> 库存信息list
export function listMethod(data) {
    return request({
        url: '/inventory/api/warehouse/getWarehouseInfo?warehouseNo='+data.warehouseNo+'&queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//库位
export function listMethod1(data) {
    return request({
        url: '/inventory/api/warehousePosition/positionList?warehouseNo='+data.warehouseNo+'&locationNo='+data.locationNo+'&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//库位编辑=>删除
export function listDeleteMethod(data) {
    return request({
        url: '/inventory/api/warehousePositions?ids='+data,
        method: 'DELETE'
    })
}

//编辑保存
export function saveMethod1(data) {
    return request({
        url: '/inventory/api/warehouse',
        method: 'put',
        data
    })
}

//删除
export function deleteMethod(data) {
    return request({
        url: '/inventory/api/warehouses?ids='+data,
        method: 'DELETE'
    })
}