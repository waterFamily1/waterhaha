import request from '@/plugins/request'

//库存查询table
export function tabelMethod(data) {
    return request({
        url: '/inventory/api/stock/getstock-info?queryName='+data.queryName+'&orgId='+data.orgId+'&materielCategoryId='+data.materielCategoryId+'&startTime='+data.startTime+'&endTime='+data.endTime+'&warehouseNo='+data.warehouseNo+'&abc='+data.abc+'&outFlag='+data.outFlag+'&pageSize=10&currentPage='+data.currentPage+'',
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
export function typeMethod(data) {
    return request({
        url: '/inventory/api/materiel-category/tree/external?orgId='+data,
        method: 'get'
    })
}

//仓库名称
export function wareMethod(data) {
    return request({
        url: 'inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}