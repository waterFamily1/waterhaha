import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/list?queryName='+data.queryName+'&orgId='+data.orgId+'&warehouseId='+data.warehouseId+'&auditedFlag='+data.auditedFlag+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
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

//盘点仓库
export function wareMethod() {
    return request({
        url: '/inventory/api/warehouse/comboList',
        method: 'get'
    })
}

//盘点人员
export function personMethod(data) {
    return request({
        url: '/inventory/api/users/managinguser?orgIds='+data,
        method: 'get'
    })
}

//盘点仓库
export function wareMethod1(data) {
    return request({
        url: '/inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}

//盘点新增
export function addMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/inventory',
        method: 'post',
        data
    })
}

//盘点详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/inventory?id='+data,
        method: 'get'
    })
}

//盘点明细列表
export function listMethod(data) {
    return request({
        url: 'inventory/api/materiel-inventory/detail/list?id='+data.id+'&queryName='+data.queryName+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//删除
export function deleteMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/inventory?id='+data,
        method: 'DELETE'
    })
}

export function takeStock(data) {
    return request({
        url: '/inventory/api/materiel-inventory/inventory',
        method: 'put',
        data
    })
}

//审核
export function auditMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/audited'+data,
        method: 'get'
    })
}
