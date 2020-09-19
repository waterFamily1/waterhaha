const pre = '/supervise/';

export default {
    path: '/process-view',
    title: '实时监管',
    header: 'home',
    custom: 'icon iconfont i-icon-demo icon-jianguan',
    children: [
        {
            path: `/dispatch/map`,
            title: '调度中心'
        }, {
            path: `/process-view/monitor`,
            title: '监视画面'
        }, {
            path: `/process-view/setting/2d`,
            title: '监视画面配置'
        }, {
            path: `/process-view/setting/3d`,
            title: '监视画面配置3D'
        }
    ]
}
