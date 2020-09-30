import request from '@/plugins/request';

//查询组织
export function getOrg (data) {
    return request({
        url: '/uaa/api/organizations?exType='+data
    })
}

// 查询设备
export function getEqu (data) {
    return request({
        url: '/equipment/api/equ-types?orgId='+data
    })
}

// 保存设备

export function saveEqu (data) {
    return request({
        url: '/equipment/api/equ-types',
        method :'PUT',
        data: data
    })
}
// 新建设备
export function createEqu (data) {
    return request({
        url: '/equipment/api/equ-types',
        method :'post',
        data: data
    })
}

// 删除设备

export function deleteEqu (data) {
    return request({
        url: '/equipment/api/equ-types?ids='+data,
        method :'DELETE'
    })
}
// 搜索设备

export function searchEqu (data) {
    return request({
        url: '/equipment/api/equ-types?queryName='+data
    })
}

// 上传图片
export function uploadImg (data) {
    return request({
        url: '/zuul/base/api/files/upload',
        method : 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:data
    })
}