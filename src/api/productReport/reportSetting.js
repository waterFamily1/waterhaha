import request from '@/plugins/request';

// 获取组织
export function getTree() {
    return request({
        url: 'loong/api/normal-reports/tree',
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
// 获取模板详情  
export function getTempDetail(id) {
    return request({
        url: 'loong/api/report-templates/'+id,
        method: 'GET',

    })
}
// 新增模版保存  
export function tempSave(data) {
    return request({
        url: 'loong/api/report-templates',
        method: 'put',
        data
    })
}

// 获取测点 
export function getMpoint(queryName,siteId,page) {
    return request({
        url: 'loong/api/mpoints/dialog?queryName='+queryName+'&siteId='+siteId+'&currentPage='+page+'&pageSize=10&datasource=INPUT,CALC',
        method: 'GET',

    })
}