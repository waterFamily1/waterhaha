import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'view-design';

import util from '@/libs/util'

import Setting from '@/setting';

import store from '@/store/index';

// 路由数据
import routes from './routes';
import { getHeaderName, getMenuSider, getSiderSubmenu } from '@/libs/system';

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
    routes,
    mode: Setting.routerMode,
    base: Setting.routerBase
});

/**
 * 路由拦截
 * 权限验证
 */

import { getRouter } from '@api/router';
import menuSider from '@/menu/sider'
import createRoutes from '@/libs/router-util'

let hasMenus = false

router.beforeEach(async (to, from, next) => {
    if (Setting.showProgressBar) iView.LoadingBar.start();
    // next();
    // 判断是否需要登录才可以进入
    if (to.matched.some(_ => _.meta.auth)) {
        // 这里依据 token 判断是否登录，可视情况修改
        const token = util.cookies.get('access_token');

        if (token && token !== 'undefined') {
            // next();
            if(hasMenus) {
                console.log('有menu')
                next();
            } else {
                console.log('无menu')
                let routeList = []
                const data = await getRouter()
                var menu = data.data;
                menuSider.length = 0;

                for(var i = 0; i < menu.length; i ++) {
                    if(menu[i].name == '实时监管') {
                        menu[i].path = '/process-view'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-jianguan'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '数据管理') {
                        menu[i].path = '/data'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-wulumuqishigongandashujuguanlipingtai-ico-'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '数据质量') {
                        menu[i].path = '/data-quality'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-zhiliang'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '生产报表') {
                        menu[i].path = '/reportR'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-icon'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '视频管理') {
                        menu[i].path = '/monitor'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-shipinzixun'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '报警管理') {
                        menu[i].path = '/alarm'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-zuoyebaojing'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '设备管理') {
                        menu[i].path = '/equU'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-shebeiguanli'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '巡检管理') {
                        menu[i].path = '/patrol'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-ditu'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '缺陷管理') {
                        menu[i].path = '/faultD'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-zhuyi'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '维修管理') {
                        menu[i].path = '/repaiR'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-weixiu'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '保养管理') {
                        menu[i].path = '/maintain'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-gongren'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '库存管理'){
                        menu[i].path = '/storage'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-fangzi01-copy'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '知识管理') {
                        menu[i].path = '/knowledge'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-zhishi'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '基础管理') {
                        menu[i].path = '/basic'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-jichuxinxi'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else if (menu[i].name == '系统管理') {
                        menu[i].path = '/system'
                        menu[i].icon = 'icon iconfont i-icon-demo icon-xitong'
                        menu[i].custom = menu[i].icon
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    } else {
                        menu[i].path = menu[i].url
                        menu[i].title = menu[i].name
                        menu[i].name = menu[i].key
                        menu[i].header = menu[i].title
                    }
                    routeList.push(menu[i])
                }
                let routePush = createRoutes(routeList)
                for(i = 0; i < routePush.length; i ++) {
                    menuSider.push(routePush[i])
                }

                let path = to.matched[to.matched.length - 1].path
                let headerName = await getHeaderName(path, menuSider)
                if (headerName === null) {
                    path = to.path;
                    headerName = await getHeaderName(path, menuSider)
                }

                localStorage.setItem('headerName', JSON.stringify(headerName))
                localStorage.setItem('menuSider', JSON.stringify(menuSider))

                next();
            }
        } else {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        // 不需要身份校验 直接通过
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     if (Setting.showProgressBar) iView.LoadingBar.start();
//     // next();
//     // 判断是否需要登录才可以进入
//     if (to.matched.some(_ => _.meta.auth)) {
//         // 这里依据 token 判断是否登录，可视情况修改
//         const token = util.cookies.get('token');

//         if (token && token !== 'undefined') {
//             next();
//         } else {
//             // 没有登录的时候跳转到登录界面
//             // 携带上登陆成功之后需要跳转的页面完整路径
//             next({
//                 name: 'login',
//                 query: {
//                     redirect: to.fullPath
//                 }
//             });
//         }
//     } else {
//         // 不需要身份校验 直接通过
//         next();
//     }
// });

router.afterEach(to => {
    if (Setting.showProgressBar) iView.LoadingBar.finish();
    // 多页控制 打开新的页面
    store.dispatch('admin/page/open', to);
    // 更改标题
    util.title({
        title: to.meta.title
    });
    // 返回页面顶端
    window.scrollTo(0, 0);
});

export default router;
