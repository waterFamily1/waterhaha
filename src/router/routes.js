import BasicLayout from '@/layouts/basic-layout'
import dashboard from './modules/dashboard'
import supervise from './modules/supervise'              //实时监管
import dataManage from './modules/dataManage'            //数据管理
import dataQuality from './modules/dataQuality'          //数据质量
import productReport from './modules/productReport'      //生产报表
import videoManage from './modules/videoManage'          //视频管理
import alarmManage from './modules/alarmManage'          //报警管理
import deviceManage from './modules/deviceManage'        //设备管理
import pollingManage from './modules/pollingManage'      //巡检管理
import defectManage from './modules/defectManage'        //缺陷管理
import serviceManage from './modules/serviceManage'      //维修管理
import upkeepManage from './modules/upkeepManage'        //保养管理
import storeManage from './modules/storeManage'          //库存管理
import knowledgeManage from './modules/knowledgeManage'  //知识管理
import basicsManage from './modules/basicsManage'        //基础管理 
import systemManage from './modules/systemManage'        //系统管理
/**
 * 在主框架内显示
 */

const frameIn = [
    {
        path: '/',
        redirect: {
            name: 'dashboard-console'
        },
        component: BasicLayout,
        children: [
            {
                path: 'index',
                name: 'index',
                redirect: {
                    name: 'dashboard-console'
                }
            },
            {
                path: 'log',
                name: 'log',
                meta: {
                    title: '前端日志',
                    auth: true
                },
                component: () => import('@/pages/system/log')
            },
            // 刷新页面 必须保留
            {
                path: 'refresh',
                name: 'refresh',
                hidden: true,
                component: {
                    beforeRouteEnter (to, from, next) {
                        next(instance => instance.$router.replace(from.fullPath));
                    },
                    render: h => h()
                }
            },
            // 页面重定向 必须保留
            {
                path: 'redirect/:route*',
                name: 'redirect',
                hidden: true,
                component: {
                    beforeRouteEnter (to, from, next) {
                        next(instance => instance.$router.replace(JSON.parse(from.params.route)));
                    },
                    render: h => h()
                }
            }
        ]
    },
    // 我的关注
    {
        path: '/myAttention',
        name: 'myAttention',
        meta: {
            title: '我的关注'
        },
        component: () => import('@/pages/header/myAttention')
    },
    //任务看板
    {
        path: '/taskBoard',
        name: 'taskBoard',
        meta: {
            title: '任务看板'
        },
        component: () => import('@/pages/header/taskBoard')
    },
    //消息中心
    {
        path: '/newsCenter',
        name: 'newsCenter',
        meta: {
            title: '消息中心'
        },
        component: () => import('@/pages/header/newsCenter')
    },
    dashboard,
    supervise,
    dataManage,
    dataQuality,
    productReport,
    videoManage,
    alarmManage,
    deviceManage,
    pollingManage,
    defectManage,
    serviceManage,
    upkeepManage,
    storeManage,
    knowledgeManage,
    basicsManage,
    systemManage
];

/**
 * 在主框架之外显示
 */

const frameOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '$t:page.login.title'
        },
        component: () => import('@/pages/account/login')
    },
    // 忘记密码
    {
        path: '/forgetPwd',
        name: 'forgetPwd',
        meta: {
            title: '$t:page.register.title'
        },
        component: () => import('@/pages/account/register')
    },
    // 注册结果
    {
        path: '/register/result',
        name: 'register-result',
        meta: {
            auth: true,
            title: '注册结果'
        },
        component: () => import('@/pages/account/register/result')
    }
];

/**
 * 错误页面
 */

const errorPage = [
    {
        path: '/403',
        name: '403',
        meta: {
            title: '403'
        },
        component: () => import('@/pages/system/error/403')
    },
    {
        path: '/500',
        name: '500',
        meta: {
            title: '500'
        },
        component: () => import('@/pages/system/error/500')
    },
    {
        path: '*',
        name: '404',
        meta: {
            title: '404'
        },
        component: () => import('@/pages/system/error/404')
    }
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [
    ...frameIn,
    ...frameOut,
    ...errorPage
];
