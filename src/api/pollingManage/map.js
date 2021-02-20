import request from '@/plugins/request'

//获取组织
export function orgMethod() {
    return request({
        url: '/uaa/api/organizations',
        method: 'get'
    })
}

//列表
export function tableMethod(data) {
    return request({
        url: '/patrol/api/tasks/map-track?orgId='+data.orgId+'&executeDate='+data.executeDate+'&pageSize=1000&currentPage='+data.currentPage+'',
        method: 'get'
    })
}