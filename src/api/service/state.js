import request from '@/plugins/request'

//列表
export function tableMethod(data) {
    console.log('lksdjk')
    return requset({
        url: '/equipment/api/repairs/statistics?processIds=&states=&startDate=2020-12-20T16:00:00.000Z&endDate=2020-12-21T15:59:59.000Z&pageSize=10&currentPage=1',
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