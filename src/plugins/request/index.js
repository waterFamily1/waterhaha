import Vue from "vue";
import store from '@/store';
import axios from 'axios';
import util from '@/libs/util';
import Setting from '@/setting';
// import ERROR_CN from "@/plugins/requset/zh_cn";

import { Message, Notice } from 'view-design';

const VUEINS = new Vue();

// 创建一个 axios 实例
const service = axios.create({
    // baseURL: Setting.apiBaseURL,
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = util.cookies.get('token');
        // // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['token'] = token;
        return config;
    },
    error => {
        // 发送失败
        console.log(error);
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response;
        // console.log(JSON.stringify(response))
        // 这个状态码是和后端约定的
        const { status } = dataAxios;
        // 根据 code 进行判断
        if (status === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口
            return dataAxios;
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (status) {
            case 200:
                // [ 示例 ] code === 0 代表没有错误
                return dataAxios;
            case 'xxx':
                // [ 示例 ] 其它和后台约定的 code
                errorCreate(`[ status: xxx ] ${dataAxios.msg}: ${response.config.url}`);
                break;
            default:
                // 不是正确的 code
                errorCreate(`${dataAxios.msg}: ${response.config.url}`);
                break;
            }
        }
        if (response.headers["x-error"]) {
            if (ERROR_CN[response.headers["x-error"]])
                VUEINS.$Message.error(
                    ERROR_CN[response.headers["x-error"]] || response.headers["x-error"]
                );
        } else {
            if (response.status == 200) {
                return response.data;
            } else {
                return response;
            }
        }
    },
    error => {
        console.log(error)
        // if (error && error.response) {
        //     switch (error.response.status) {
        //     case 400: error.message = '请求错误'; break;
        //     case 401: error.message = '未授权，请登录'; break;
        //     case 403: error.message = '拒绝访问'; break;
        //     case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
        //     case 408: error.message = '请求超时'; break;
        //     case 500: error.message = '服务器内部错误'; break;
        //     case 501: error.message = '服务未实现'; break;
        //     case 502: error.message = '网关错误'; break;
        //     case 503: error.message = '服务不可用'; break;
        //     case 504: error.message = '网关超时'; break;
        //     case 505: error.message = 'HTTP版本不受支持'; break;
        //     default: break;
        //     }
        // }
        // errorLog(error);
        // return Promise.reject(error);
        // if (error) {
        //     const errorKey = error.response.data.errorKey,
        //       title = error.response.data.title; // 巡检错误提示
        //     if (errorKey) {
        //       (ERROR_CN[errorKey] || title) &&
        //         VUEINS.$Message.error(ERROR_CN[errorKey] || title);
        //     }
        //     if (error.response.status == 401) {
        //       //if(sessionStorage.getItem('__MANGO_U_'))
        //       if (error.response.headers["x-error"] == "uaa_auth_sessionExpired") {
        //         VUEINS.$Modal.confirm({
        //           title: "提示",
        //           content: "<p>登录超时,请重新登录.</p>",
        //           okText: "重新登录",
        //           cancelText: "",
        //           onOk: () => {
        //             location.href = "/login.html";
        //           }
        //         });
        //       } else if (
        //         error.response.headers["x-error"] == "uaa_auth_tokenExpired"
        //       ) {
        //         VUEINS.$Modal.confirm({
        //           title: "提示",
        //           content: "<p>您的角色权限被修改,请重新登录.</p>",
        //           okText: "重新登录",
        //           cancelText: "",
        //           onOk: () => {
        //             location.href = "/login.html";
        //           }
        //         });
        //       } else {
        //         location.href = "/login.html";
        //       }
      
        //       //
        //     }
        //     if (error.response.status == 403) {
        //       VUEINS.$Message.error("无权限操作");
        //     }
        //   }
          return Promise.reject(error);
    }
);

export default service;
