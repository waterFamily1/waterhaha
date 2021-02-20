import request from '@/plugins/request'

//列表
export function tableMethod(data) {
    return request({
        url: '/equipment/api/equipments?typeIds='+data.typeIds+'&queryName='+data.queryName+'&processIds='+data.processIds+'&maintainState='+data.maintainState+'&abcs='+data.abcs+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//区域位置结构
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//设备类型
export function typeMethod() {
    return request({
        url: '/equipment/api/equ-types?queryName=&level=2',
        method: 'get'
    })
}

//导出二维码
export function codeMethod(data) {
    return request({
        url: '/equipment/api/equipments/qrcode-export?all='+data.isAll+'&ids='+data.ids+'&queryName='+data.queryName+'&processIds='+data.processIds+'&typeIds='+data.typeIds+'',
        method: 'get'
    })
}

//导出进度
export function exportMethod(data) {
    return request({
        url: '/equipment/api/equipments/qrcode-export/progress?key='+data,
        method: 'get'
    })
}