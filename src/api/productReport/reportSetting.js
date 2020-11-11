import request from '@/plugins/request';

// 获取组织
export function getTree() {
    return request({
        url: 'loong/api/normal-reports/tree',
        method: 'get'
    })
}
// 新增目录 
export function newCate(data) {
    return request({
        url: 'loong/api/folders',
        method: 'post',
        data
    })
}
// 删除目录 
export function deleteCate(id) {
    return request({
        url: 'loong/api/folders?ids='+id,
        method: 'DELETE',

    })
}
// 修改目录  
export function editCate(data) {
    return request({
        url: 'loong/api/folders',
        method: 'PUT',
        data
    })
}
// 删除模板  
export function deleteTemp(id) {
    return request({
        url: 'loong/api/report-templates?ids='+id,
        method: 'DELETE',

    })
}
// 获取测点 loong/api/mpoints/dialog?queryName=&siteId=&currentPage=1&pageSize=10&datasource=INPUT,CALC