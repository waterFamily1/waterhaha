const pre = '/videoManage/';

export default {
    path: '/monitor',
    title: '视频管理',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-shipinzixun',
    children: [
        {
            path: `/monitor-screen/monitor`,
            title: '实时视频'
        }, {
            path: `/monitor-screen/capture`,
            title: '视频抓拍'
        }, {
            path: `/video`,
            title: '视频配置'
        }, {
            path: `/videoD/addVideo`,
            title: '视频添加',
            auth: ['hidden']
        }, {
            path: `/videoD/editVideo`,
            title: '视频编辑',
            auth: ['hidden']
        }, {
            path: `/videoD/checkVideo`,
            title: '视频详情',
            auth: ['hidden']
        }
    ]
}
