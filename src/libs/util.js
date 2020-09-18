import cookies from './util.cookies';
import log from './util.log';
import db from './util.db';

import Setting from '@/setting';
import { forEach } from 'lodash';

const util = {
    cookies,
    log,
    db
};

function tTitle (title = '') {
    if (window && window.$t) {
        if (title.indexOf('$t:') === 0) {
            return window.$t(title.split('$t:')[1]);
        } else {
            return title;
        }
    } else {
        return title;
    }
}

/**
 * @description 更改标题
 * @param {Object} title 标题
 * @param {Object} count 未读消息数提示（可视情况选择使用或不使用）
 */
util.title = function ({ title, count }) {
    title = tTitle(title);
    let fullTitle = title ? `${title} - ${Setting.titleSuffix}` : Setting.titleSuffix;

    if (count) fullTitle = `(${count}条消息)${fullTitle}`;
    window.document.title = fullTitle;
};

function requestAnimation (task) {
    if ('requestAnimationFrame' in window) {
        return window.requestAnimationFrame(task);
    }

    setTimeout(task, 16);
}

export { requestAnimation };

export const createRouters = (menus) => {
    let arr = []
    const parent = arr.filter(item => item.parentId == 0)
    const len = parent.length
    arr.forEach(item => {
        if (item.parentId == 0) return
        for (let i = 0; i < len; i++) {
            if (item.parentId == parent[i].id) {
                if (!parent[i].children) parent[i].children = []
                parent[i].children.push(item)
                break
            }
        }
    })
}

export default util;
