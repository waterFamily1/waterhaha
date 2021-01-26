import request from '@/plugins/request'

//设备台账
export function method1(data) {
    return request({
        url: '/portal/api/concerns?type=equipment&pageSize=10&currentPage='+data,
        method: 'get'
    })
}

//取消关注
export function cancle1(data) {
    return request({
        url: '/base/api/concerns?concernIds='+data.concernIds+'&type='+data.type+'',
        method: 'DELETE'
    })
}

//巡检任务
export function method2(data) {
    return request({
        url: '/portal/api/concerns?type=patrol&pageSize=10&currentPage='+data,
        method: 'get'
    })
}

//消缺任务
export function method3(data) {
    return request({
        url: '/portal/api/concerns?type=fault&pageSize=10&currentPage='+data,
        method: 'get'
    })
}

//维修工单
export function method4(data) {
    return request({
        url: '/portal/api/concerns?type=repair&pageSize=10&currentPage='+data,
        method: 'get'
    })
}

//保养任务
export function method5(data) {
    return request({
        url: '/portal/api/concerns?type=maintain&pageSize=10&currentPage='+data,
        method: 'get'
    })
}