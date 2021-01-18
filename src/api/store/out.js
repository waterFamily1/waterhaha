import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/outbounds?queryName='+data.queryName+'&orgIds'+data.orgIds+'&warehouseNo='+data.warehouseNo+'&audited='+data.audited+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
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

//出库仓库
export function wareMethod() {
    return request({
        url: '/inventory/api/warehouse/comboList',
        method: 'get'
    })
}

//删除
export function cancleMethod(data) {
    return request({
        url: 'inventory/api/outbounds?ids='+data,
        method: 'DELETE'
    })
}

//详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/outbound/'+data,
        method: 'get'
    })
}

//出库信息
export function listMethod(data) {
    return request({
        url: '/inventory/api/outboundDetail?id='+data.id+'&queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//出库仓库 添加
export function wareMethod1(data) {
    return request({
        url: '/inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}

//申请人员
export function applyMethod(data) {
    return request({
        url: '/uaa/api/users/select?orgId='+data,
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

//弹框list
export function listMethod1(data) {
    return request({
        url: '/inventory/api/materiel/getMaterielsOutBound?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&warehouseNo='+data.warehouseNo,
        method: 'get'
    })
}

//保存
export function saveMethod(data) {
    return request({
        url: '/inventory/api/outbound',
        method: 'post',
        data
    })
}

//修改list
export function editMethod(data) {
    return request({
        url: '/inventory/api/outboundDetail',
        method: 'put',
        data
    })
}

//审核
export function auditMethod(data) {
    return request({
        url: '/inventory/api/outbound/audite',
        method: 'put',
        data
    })
}

export function method(data) {
    return request({
        url: '/inventory/api/warehousePosition/positionComboxList?warehouseNo='+data,
        method: 'get'
    })
}