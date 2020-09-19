const pre = '/deviceManage/';

export default {
    path: '/equU',
    title: '设备管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-shebeiguanli',
    children: [
        {
            path: `/equ`,
            title: '设备台账'
        }, {
            path: `/equ/status/list`,
            title: '设备状态'
        },
        {
            path: `/addBook`,
            title: '添加设备',
            auth: ['hidden']
        }
    ]
}
