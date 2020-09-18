import { getRouter } from '@api/router';
import {  backendMenusToRouters } from '@/libs/util';

export default {
    state: {
        routers: [], //拿到的路由数据
        hasGetRouter: false //是否已经获取过路由
    },
    mutations: {
        //设置路由数据
        setRouters(state, routers) {
            state.routers = routers
        },
        //设置是否已经获取过路由
        setHasGetRouter(state, staus) {
            state.hasGetRouter = staus
        }
    },
    actions: {
        getRouters({ commit }) {
            return new Promise((resolve, reject) => {
                getRouter().then(async res => {
                    console.log(JSON.stringify(res))
                    let routers = backendMenusToRouters(res.data)
                    commit('setRouters', routers)
                    commit('setHasGetRouter', true)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}