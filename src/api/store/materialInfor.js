import request from '@/plugins/request'
import { eq } from 'lodash'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/materiels?queryName='+data.queryName+'&orgIds='+data.orgIds+'&materielCategoryId='+data.materielCategoryId+'&pageSize=10&currentPage='+data.currentPage+'',
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

//物料类别
export function materielMethod(data) {
    return request({
        url: '/inventory/api/materiel-category/tree/external?orgId='+data,
        method: 'get'
    })
}

//删除
export function deleteMethod(data) {
    return request({
        url: '/inventory/api/materiels?ids='+data,
        method: 'DELETE'
    })
}

//计量单位
export function unitMethod() {
    return request({
        url: '/inventory/api/materiel/unit',
        method: 'get'
    })
}

//仓库名称
export function wareMethod() {
    return request({
        url: '/inventory/api/warehouse/comboList',
        method: 'get'
    })
}

//新增提交
export function saveMethod(data) {
    return request({
        url: '/inventory/api/materiel',
        method: 'post',
        data
    })
}

//详情
export function detailMethod(data) {
    return request({
        url: '/inventory/api/materiel/'+data,
        method: 'get'
    })
}

//仓库分布
export function wareMethod1(data) {
    return request({
        url: '/inventory/api/materielStocks/distribution?materielNumber='+data.materielNumber+'&warehouseName='+data.warehouseName+'&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//存储上下限
export function storeMethod(data) {
    return request({
        url: '/inventory/api/materielStockLimits?materielNumber='+data.materielNumber+'&warehouseName='+data.warehouseName+'&currentPage='+data.currentPage+'&pageSize=5',
        method: 'get'
    })
}

//存储上下限删除
export function deleteMethod1(data) {
    return request({
        url: '/inventory/api/materielStockLimits?ids='+data,
        method: 'DELETE'
    })
}

//编辑保存
export function editMethod(data) {
    return request({
        url: '/inventory/api/materiel',
        method: 'put',
        data
    })
}