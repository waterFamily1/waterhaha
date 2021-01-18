import request from '@/plugins/request'

//区域位置
export function siteMethod() {
    return request({
        url: '/loong/api/videos/tree?takeThumb=Y',
        method: 'get'
    })
}

//点击区域位置获取日历信息
export function thumbsMethod(data) {
    return request({
        url: '/loong/api/thumbs/count?videoId='+data.videoId+'&month='+data.month+'',
        method: 'get'
    })
}

//定时抓拍
export function snapMethod(data) {
    return request({
        url: '/loong/api/thumbs?videoId='+data.videoId+'&date='+data.date+'&type=timer&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}

//报警抓拍
export function alarmMethod(data) {
    return request({
        url: '/loong/api/thumbs?videoId='+data.videoId+'&date='+data.date+'&type=alarm&currentPage='+data.currentPage+'&pageSize=10',
        method: 'get'
    })
}