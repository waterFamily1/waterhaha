import request from '@/plugins/request'

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//设备类型
export function equTypeMethod(data){
    return request({
        url: '/equipment/api/equ-types?queryName=&level=2',
        method: 'get'
    })
}

//列表
export function listMethod(data) {
    return request({
        url: '/equipment/api/equipments?typeIds=&pageSize=10&abcs='+data.abcs+'&currentPage='+data.currentPage+'&queryName='+data.queryName+'&processIds='+data.processIds,
        method: 'get'
    })
}

//删除
export function deleteMethod(data) {
    return request({
        url: '/equipment/api/equipments?all='+data.all+'&ids='+data.id+'&queryName=&processIds=',
        method: 'DELETE'
    })
}

//import
export function saveMethod(data) {
    return request({
        url: '/equipment/api/excel-data-save?excelDataCacheKey='+data,
        method: 'get'
    })
}