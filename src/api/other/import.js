import request from '@/plugins/request'

//保存
export function saveMethod(data) {
    return request({
        url: '/uaa/api/excel/import',
        method: 'post',
        data
    })
}

export function saveMethod1(data) {
    return request({
        url: '/inventory/api/excel-data-save?excelDataCacheKey='+data,
        method: 'get'
    })
}

//导入区域位置
export function saveMethod2(data) {
    return request({
        url: '/uaa/api/excel/validate',
        method: 'post',
        data
    })
}

//巡检点导入
export function saveMethod3(data) {
    return request({
        url: '/patrol/api/excel/import',
        method: 'post',
        data
    })
}
