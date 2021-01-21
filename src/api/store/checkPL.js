import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/inventory-report?orgId='+data.orgId+'&warehouseId='+data.warehouseNo+'&materielInventoryNumber='+data.materielInventoryNumber+'&startTime='+data.startTime+'&endTime='+data.endTime+'&pageSize=10&currentPage='+data.currentPage+'',
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
        url: '/inventory/api/warehouse/comboList?orgIds='+data,
        method: 'get'
    })
}

//盘点单号
export function numMethod(data) {
    return request({
        url: '/inventory/api/materiel-inventory/inventory-report-inventory-number?orgId='+data.orgId+'&warehouseId='+data.warehouseId+'',
        method: 'get'
    })
}