import request from '@/plugins/request'

//树状列表
export function treeMethod() {
    return request({
        url: '/uaa/api/processes/tree?exType=2&sort=true&fullFill=false',
        method: 'get'
    })
}

//模板名称
export function temNameMethod(data) {
    return request({
        url: '/portal/api/modules?queryName='+data.queryName+'&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}

//模板名称=> 删除
export function temNameDelete(data) {
    return request({
        url: '/portal/api/modules?id='+data,
        method: 'DELETE'
    })
}

//模板名称=> 选择
export function temChoose(data) {
    return request({
        url: '/portal/api/modules/copy',
        method: 'post',
        data
    })
}

//保存模板
export function temSaveMethod(data) {
    return request({
        url: '/portal/api/modules',
        method: 'post',
        data
    })
}

//添加 全部组件
export function addModule() {
    return request({
        url: '/portal/api/homepages/system',
        method: 'get'
    })
}

//添加 已选择组件
export function getHomeMods() {
    return request({
        url: '/portal/api/homepages',
        method: 'get'
    })
}

//公告
export function bullet() {
    return request({
        url: '/message/api/bulletins',
        method: 'get'
    })
}

//关闭公告dialog
export function closeDialog(data) {
    return request({
        url: '/message/api/bulletins/close',
        method: 'put',
        data
    })
}