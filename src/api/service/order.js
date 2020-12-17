import request from '@/plugins/request'

//table
export function tableMethod(data) {
    return request({
        url: '/equipment/api/repairs?queryName='+data.queryName+'&processIds='+data.processIds+'&repairTypes=&states=0,1,2,5&startDate='+data.startDate+'&endDate='+data.endDate+'&pageSize=10&currentPage='+data.currentPage+'',
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