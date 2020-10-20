import request from '@/plugins/request';

//获取列表
export function getTable(begin,end,page) {
    return request({
        // url: loong/api/mpoint-data-imports?beginDT=2020-10-08T16:00:00.000Z&endDT=2020-10-16T15:59:59.000Z&pageSize=10&currentPage=1
        url: '/loong/api/mpoint-data-imports?beginDT='+begin+'T16:00:00.000Z&endDT='+end+'T15:59:59.000Z&pageSize=10&currentPage='+page,
        method: 'get'
    })
}
// 搜索列表
export function searchTable(begin,end,page,status) {
    return request({
        // url: loong/api/mpoint-data-imports?beginDT=2020-10-08T16:00:00.000Z&endDT=2020-10-16T15:59:59.000Z&pageSize=10&currentPage=1
        url: '/loong/api/mpoint-data-imports?beginDT='+begin+'T16:00:00.000Z&endDT='+end+'T15:59:59.000Z&pageSize=10&currentPage='+page+"&status="+status,
        method: 'get'
    })
    
}
//上传文件
export function uploadFun(data) {
    return request({
        url: '/loong/api/mpoint-data-imports/fileUpload',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data
    })
}