window.htconfig = {
    Default: {
        // zoomMin: 0.1,
        protocol: 'http:',
        // protocol: 'https:',
        // 生产环境
        // host: '122.114.164.162',
        // port: 10006,
        // 测试环境
        // host: 'csht.hc-yun.com',
        // port: 443,
        // 内网开发环境
        host: 'web.tjdeht.cn',
        port: 9001,
        // 外网开发环境
        // host: '117.50.70.211',
        // port: 29025,
        // 本地开发环境
        // host: 'localhost',
        // port: '5566',
        toolTipDelay: 100,
        toolTipContinual: true,
        convertURL: function (url) {
            var storagePrefix = '';
            if (storagePrefix && url && !/^data:image/.test(url) && !/^http/.test(url) && !/^https/.test(url)) {
                url = storagePrefix + '/' + url
            }
            // append timestamp
            url += (url.indexOf('?') >= 0 ? '&' : '?') + 'ts=' + Date.now();
            // append sid
            var sid = sessionStorage.getItem('htEditor.sid');
            if (sid) {
                url += '&sid=' + sid;
            }
            return /^(assets|components|displays|models|previews|symbols|scenes)/.test(url) ? (this.protocol + '//' + this.host + ':' + this.port + '/' + url) : url;
        }
    }
};
if (localStorage && localStorage.getItem("screenTouchKey") == "open") {
    window.htconfig.Default.isTouchable = true;
}