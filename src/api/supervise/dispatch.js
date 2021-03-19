import request from '@/plugins/request'

export function treeMethod() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

export function treeMethod2() {
    return request({
        url: '/portal/api/dispatch-processes/tree',
        method: 'get'
    })
}

export function coorMethod() {
    return request({
        url: '/portal/api/dispatch-collections',
        method: 'get'
    })
}

export function promptMethod() {
    return request({
        url: '/portal/api/dispatch-statistics',
        method: 'get'
    })
}

export function setMethod() {
    return request({
        url: '/portal/api/dispatch-collections',
        method: 'post',
        data
    })
}

export function searchProcess(data) {
    return request({
        url: '/uaa/api/processes/list?queryName='+data.queryName+'&location=true&exType=2',
        method: 'get'
    })
}

export function alarmsData(data) {
    return request({
        url: '/portal/api/dispatch-alarms?queryName='+data.queryName+'&handleStatus='+data.handleStatus+'&siteId='+data.siteId+'&currentPage='+data.currentPage+'&pageSize=8',
        method: 'get'
    })
}

export function staffsData(data) {
    return request({
        url: '/portal/api/dispatch-users?queryName='+data.queryName+'&haveTask='+data.haveTask+'&currentPage='+data.currentPage+'&pageSize=8',
        method: 'get'
    })
}

export function mapMethod(data) {
    return request({
        url: '/portal/api/dispatch-processes/'+data,
        method: 'get'
    })
}

export function keyMethod(data) {
    return request({
        url: '/loong/api/indexes/value?processId='+data,
        method: 'get'
    })
}

export function staffDetail(data) {
    return request({
        url: '/portal/api/dispatch-users/'+data,
        method: 'get'
    })
}