import request from '@/plugins/request';

//查询所有用户
export function searchUser (queryName,orgIds,page) {
    return request({
        url: '/uaa/api/users?queryName='+queryName+'&orgIds='+orgIds+'&pageSize=10&currentPage='+page
    })
}

// 删除用户
export function deleteUser (id) {
    return request({
        url: '/uaa/api/users?ids='+id,
        method:'DELETE'
    })
}

export function getUser (method,data) {
    return request({
        url: '/uaa/api/users',
        method: method,
        data
    })
}

export function putUser (data) {
    return request({
        url: '/uaa/api/users/'+data,
        method: 'get'
    })
}

// 获取组织

export function getOrganizations (data) {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}