import request from '@/plugins/request';

//查询所有组织
export function getAllOrg (data) {
    return request({
        url: '/uaa/api/organizations?exNoAuth='+data,
        method: 'get'
    })
}

//删除组织
export function cancelOrg (data) {
    return request({
        url: '/uaa/api/organizations/'+data,
        method: 'DELETE'
    })
}

//新建组织
export function appendOrg (data) {
    return request({
        url: '/uaa/api/organizations',
        method: 'post',
        data
    })
}

//编辑组织
export function editOrg (data) {
    return request({
        url: '/uaa/api/organizations',
        method: 'put',
        data
    })
}