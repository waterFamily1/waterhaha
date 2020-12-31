import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/inbounds?queryName='+data.queryName+'&orgIds='+data.orgIds+'&warehouseNo='+data.warehouseNo+'&audited='+data.audited+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
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

//入库仓库
export function wareMethod() {
    return request({
        url: '/inventory/api/warehouse/comboList',
        method: 'get'
    })
}

//入库仓库 添加
export function wareMethod1(data) {
    return request({
        url: '/inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}

//入库人员
export function warePersonMethod(data) {
    return request({
        url: '/inventory/api/users/managinguser?orgIds='+data,
        method: 'get'
    })
}

//入库明细
export function wareListMethod(data) {
    return request({
        url: '/inventory/api/materiel/getMateriels?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&orgIds='+data.orgIds,
        method: 'get'
    })
}

//选择库位
export function chooseMethod(data) {
    return request({
        url: '/inventory/api/warehousePosition/positionComboxList?warehouseNo='+data,
        method: 'get'
    })
}

//新增保存
export function saveMethod(data) {
    return request({
        url: '/inventory/api/inbound',
        method: 'post',
        data
    })
}

//删除
export function cancleMethod(data) {
    return request({
        url: '/inventory/api/inbounds?ids='+data,
        method: 'DELETE'
    })
}

//入库详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/inbound/'+data,
        method: 'get'
    })
}

//入库详情=>入库信息
export function detailListMethod(data) {
    return request({
        url: '/inventory/api/inbound/inboundDetails?id='+data.id+'&queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//提交
export function editMethod(data) {
    return request({
        url: '/inventory/api/inboundDetail',
        method: 'put',
        data
    })
}

//审核
export function auditMethod(data) {
    return request({
        url: '/inventory/api/inbound/audite',
        method: 'put',
        data
    })
}