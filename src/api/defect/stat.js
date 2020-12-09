import request from '@/plugins/request';

//查询组织
export function getOrg () {
    return request({
        url: 'uaa/api/organizations'
    })
}

//区域位置结构
export function regionalCon () {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}

// 统计列表  
export function statList (severityTypes,processIds,orgIds,faultTypes,states,begin,end,page) {
    return request({
        url: '/equipment/api/faults/statistics?severityTypes='+severityTypes+'&processIds='+processIds+'&orgIds='+orgIds+'&faultTypes='+faultTypes+'&states='+states+'&startDate='+begin+'&endDate='+end+'&pageSize=10&currentPage='+page,
        method: 'get'
    })
}