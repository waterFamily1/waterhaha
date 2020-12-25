import request from '@/plugins/request'

//列表
export function tableMethod(data) {
    return request({
        url: '/equipment/api/repairs/statistics?processIds='+data.processIds+'&states='+data.states+'&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
        method: 'get'
    })
}

//区域位置
export function regionalCon() {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}