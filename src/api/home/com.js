import request from '@/plugins/request'

//设备利用分析
export function equAvail(data) {
    return request({
        url: '/equipment/api/equipments/analysis?siteId='+data.siteId+'&cycle='+data.cycle,
        method: 'get'
    })
}

//设备情况
export function equ(data) {
    return request({
        url: '/equipment/api/equipments/abc?siteId='+data,
        method: 'get'
    })
}

//设备kpi
export function equKPI(data) {
    return request({
        url: '/loong/api/kpi?siteId='+data.siteId+'&date='+data.date,
        method: 'get'
    })
}

//地图巡检跟踪
export function patrol(data) {
    return request({
        url: '/patrol/api/tasks/map-track?orgId='+data.orgId+'&executeDate='+data.executeDate+'&home=1',
        method: 'get'
    })
}

//我的任务
export function task(data) {
    return request({
        url: '/portal/api/tasks?type='+data+'&status=1&pageSize=8',
        method: 'get'
    })
}