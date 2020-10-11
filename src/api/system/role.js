import request from '@/plugins/request';

//获取用户
export function getUser (queryName,page,orgId) {
    return request({
        url: '/uaa/api/users?queryName='+queryName+'&currentPage='+page+'&pageSize=10&orgId='+orgId
    })
}

// 获取角色树
export function getTree () {
    return request({
        url: '/uaa/api/roles/tree'
    })
}
// 获取角色用户

export function getRole (roleId) {
    return request({
        url: '/uaa/api/users?roleId='+roleId+'&pageSize=0'
    })
}

//获取角色权限

export function getJurisdiction (roleId) {
    return request({
        url: '/uaa/api/roles/detail/'+roleId
    })
}

// 修改角色名称

export function modifyName (data) {
    return request({
        url: '/uaa/api/roles',
        method: 'put',
        data
    })
}
// 获取组织

export function getOrg () {
    return request({
        url: '/uaa/api/organizations'
    })
}
// 新建角色

export function createyName (data) {
    return request({
        url: '/uaa/api/roles',
        method: 'post',
        data
    })
}
// 删除角色

export function deleteName (data) {
    return request({
        url: '/uaa/api/roles?ids='+data,
        method: 'delete',
    })
}
// 操作权限
// app选中
export function appCheck (menuIds,roleId) {
    return request({
        url: '/uaa/api/roles/app-menu-and-oper?menuIds='+menuIds+'&roleId='+roleId
    })
}
// 平台选中
export function webCheck (menuIds,roleId) {
    return request({
        url: '/uaa/api/roles/web-menu-and-oper?menuIds='+menuIds+'&roleId='+roleId
    })
}
// 提交

export function submitRole (data) {
    return request({
        url: '/uaa/api/roles/detail',
        method:'post',
        data
    })
}