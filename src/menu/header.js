// 菜单，顶栏

export default [
    {
        path: '/',
        title: '首页',
        icon: 'md-home',
        hideSider: false,
        name: 'home'
    },
    {
        path: '/myAttention',
        title: '我的关注',
        icon: 'ios-star',
        hideSider: true,
        name: 'myAttention'
    },
    {
        path: '/taskBoard',
        title: '任务看板',
        icon: 'clipboard',
        hideSider: true,
        name: 'taskBoard'
    },
    {
        path: '/newsCenter',
        title: '消息中心',
        icon: 'ios-bell',
        hideSider: true,
        name: 'newsCenter'
    }
];
