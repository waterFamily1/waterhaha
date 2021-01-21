import request from '@/plugins/request'

//tree
export function treeMethod(data) {
    return request({
        url: '/inventory/api/materiel-category/tree',
        method: 'get'
    })
}

//新增保存
export function saveMethod(data) {
    return request({
        url: '/inventory/api/materiel-category/materiel',
        method: 'post',
        data
    })
}

//删除
export function removeMethod(data) {
    return request({
        url: '/inventory/api/materiel-category/materiel?id='+data,
        method: 'DELETE'
    })
} 