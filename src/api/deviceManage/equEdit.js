import request from '@/plugins/request'

//区域位置
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//所属组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

//责任人
export function dutyMethod(data) {
    return request({
        url: 'uaa/api/users/select?orgId='+data,
        method: 'get'
    })
}

// 上传图片
export function uploadImg(data) {
    return request({
        url: '/zuul/base/api/files/upload',
        method : 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:data
    })
}

//设备类型
export function typeMethod() {
    return request({
        url: '/equipment/api/equ-types/tree',
        method: 'get'
    })
}

//设备类型新建
export function typeNewMethod(data) {
    return request({
        url: '/equipment/api/equ-types',
        method: 'post',
        data
    })
}

//添加上级设备
export function addOrgMethod(data) {
    return request({
        url: '/equipment/api/equipments?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&orgIds='+data.orgIds+'&processIds='+data.processIds+'&typeIds='+data.typeIds+'',
        method: 'get'
    })
}

//选择测点
export function siteIdMethod(data) {
    return request({
        url: '/equipment/api/mpoints/dropdown-box?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&siteId='+data.siteId+'',
        method: 'get'
    })
}

//添加设备
export function addEquMethod(data) {
    return request({
        url: '/equipment/api/equipments/detail',
        method: 'post',
        data
    })
}