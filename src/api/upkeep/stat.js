import request from '@/plugins/request';

//查询组织
export function getOrg () {
    return request({
        url: 'uaa/api/organizations'
    })
}

//执行人员 
export function getUsers (id) {
    return request({
        url: 'uaa/api/users/select?orgId='+id,
        method:'get'
    })
}

// 统计列表  
export function statList (start,end,state,executeUserId,orgId,page) {
    return request({
        url: 'equipment/api/maintains/statistics?startDate='+start+'&endDate='+end+'&state='+state+'&executeUserId='+executeUserId+'&orgId='+orgId+'&currentPage='+page+'&pageSize=10',
        method:'get'
    })
}