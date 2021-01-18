import request from '@/plugins/request'

//区域位置
export function orgMethod() {
    return request({
        url: '/uaa/api/processes/tree?exType=2',
        method: 'get'
    })
}

//table
export function tableMethod(data) {
    return request({
        url: '/loong/api/videos?siteId='+data.siteId+'&queryName='+data.queryName+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//删除
export function deleteMethod(data) {
    return request({
        url: '/loong/api/videos?ids='+data,
        method: 'DELETE'
    })
}

//弹框区域位置
export function orgMethod1() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

//新增弹框table
export function listMethod(data) {
    return request({
        url: '/loong/api/alarm-definitions?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10&siteId='+data.siteId,
        method: 'get'
    })
}

//保存新增
export function saveMethod(data) {
    return request({
        url: '/loong/api/videos',
        method: 'post',
        data
    })
}

//编辑
export function editMethod(data) {
    return request({
        url: '/loong/api/videos/'+data,
        method: 'get'
    })
}

//编辑保存
export function saveMethod1(data) {
    return request({
        url: '/loong/api/videos',
        method: 'put',
        data
    })
}

//查看详情
export function detailMethod(data) {
    return request({
        url: '/loong/api/videos/'+data,
        method: 'get'
    })
}