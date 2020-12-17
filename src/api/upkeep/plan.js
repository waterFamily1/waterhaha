import request from '@/plugins/request';

// 
export function planList (planName,dateRange,start,end,state,page) {
    return request({
        url: 'equipment/api/maintains/plans?planName='+planName+'&dateRange='+dateRange+'&state='+state+'&pageSize=10&currentPage='+page+'&startDate='+start+'&endDate='+end,
        method: 'get'
    })
}