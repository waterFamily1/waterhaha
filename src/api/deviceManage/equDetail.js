import request from '@/plugins/request'

//关注
export function attentionMethod(data) {
    return request({
        url: '/base/api/concerns',
        method: 'post',
        data
    })
}

//取消关注
export function attentionMethod1(data) {
    return request({
        url: '/base/api/concerns?concernIds='+data.concernIds+'&type=equipment',
        method: 'DELETE'
    })
}

//获取详情
export function detailMethod(data) {
    return request({
        url: '/equipment/api/equipments/detail/'+data,
        method: 'get'
    })
}

//上级设备
export function parentMethod(data) {
    return request({
        url: 'equipment/api/equipments/parent/'+data,
        method: 'get'
    })
}
