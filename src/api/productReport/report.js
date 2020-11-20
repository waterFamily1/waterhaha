import request from '@/plugins/request';

// 获取名称结构数据
export function getTree() {
    return request({
        url: 'loong/api/reports/tree',
        method: 'get'
    })
}
// 获取详情  
export function getDetail(id,time) {
    return request({
        url: 'loong/api/reports/data?id='+id+'&date='+time,
        method: 'get'
    })
}
// 导出   loong/api/reports/export?id=5&date=2020-11-17T16%3A00%3A00.000Z

export function exportT(id,time) {
    return request({
        url: 'loong/api/reports/export?id='+id+'&date='+time,
        method: 'get'
    })
}