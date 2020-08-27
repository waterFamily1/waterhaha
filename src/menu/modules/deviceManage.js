const pre = '/deviceManage/';

export default {
    path: '/deviceManage',
    title: '设备管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-shebeiguanli',
    children: [
        {
            path: `${pre}deviceBook`,
            title: '设备台账'
        }, {
            path: `${pre}deviceState`,
            title: '设备状态'
        },
        {
            path: `${pre}addBook`,
            title: '添加设备',
            auth: ['hidden']
        }
    ]
}
