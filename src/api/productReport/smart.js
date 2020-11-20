import request from '@/plugins/request';

// 获取名称结构数据
export function getTree() {
    return request({
        url: 'loong/api/smart-reports/tree',
        method: 'get'
    })
}
// 新建目录 
export function newCata(data) {
    return request({
        url: 'loong/api/folders',
        method: 'post',
        data
    })
}

// 新建模板  
export function newTemp(data) {
    return request({
        url: 'loong/api/report-templates',
        method: 'post',
        data
    })
}
// 删除模板 loong/api/report-templates?ids=template_11
export function deleteTemp(id) {
    return request({
        url: 'loong/api/report-templates?ids='+id,
        method: 'DELETE'
    })
}
// 获取模板详情  loong/api/report-templates/14
export function getTempDetail(id) {
    return request({
        url: 'loong/api/report-templates/'+id,
        method: 'get'
    })
}
// 修改模板 loong/api/report-templates
export function editTemp(data) {
    return request({
        url: 'loong/api/report-templates',
        method: 'put',
        data
    })
}