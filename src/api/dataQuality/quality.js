import request from '@/plugins/request';

//区域位置结构
export function regionalCon () {
    return request({
        url: '/uaa/api/processes/tree',
        method: 'get'
    })
}
// loong/api/data-quality/statistics-list?beginDate=2020-10-15T16:00:00.000Z&endDate=2020-10-16T16:00:00.000Z
// 获取数据
export function getTable (begin,end) {
    return request({
        url: '/loong/api/data-quality/statistics-list?beginDate='+begin+'T16:00:00.000Z&endDate='+end+'T16:00:00.000Z',
        method: 'get'
    })
}
// loong/api/data-quality/statistics?beginDate=2020-10-15T16:00:00.000Z&endDate=2020-10-16T16:00:00.000Z
// 统计数据
export function getStat (begin,end) {
    return request({
        url: '/loong/api/data-quality/statistics?beginDate='+begin+'T16:00:00.000Z&endDate='+end+'T16:00:00.000Z',
        method: 'get'
    })
}
// loong/api/data-quality/recalc?state=&pageSize=10&currentPage=1
// 重算日志
export function recalc (state,page) {
    return request({
        url: '/loong/api/data-quality/recalc?state='+state+'&pageSize=10&currentPage='+page,
        method: 'get'
    })
}
