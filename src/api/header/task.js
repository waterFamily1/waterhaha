import request from '@/plugins/request'

//巡检任务
export function method1(data) {
    return request({
        url: '/portal/api/tasks?queryName='+data.queryName+'&type='+data.type+'&status='+data.status+'&orgIds='+data.orgIds+'&currentPage='+data.currentPage+'&pageSize=10',
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