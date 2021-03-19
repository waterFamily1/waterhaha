var SHAR_CTX = '' ;
var _origin = window.location.origin;
if(_origin.indexOf('localhost') > -1 || _origin.indexOf('127.0.0.1') > -1){
    window.SHAR_CTX = SHAR_CTX = '/mango';
} 

// highchart 全局配置
HighchartsPluginMark(Highcharts);
Highcharts.setOptions({
    global: {
        useUTC: false
    },
    lang: {
        contextButtonTitle: '导出图片',
        downloadJPEG: "保存JPEG图片",
        downloadPDF: "保存PDF文档",
        downloadPNG: "保存PNG图片",
        downloadSVG: "保存SVG矢量图",
        loading: "载入中...",
        printChart: "打印曲线",
        resetZoom: "取消放大",
        resetZoomTitle: "取消放大",
        shortMonths: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        noData: '暂无数据'
    },
    noData: {
        position: {
            verticalAlign: 'middle'
        },
        attr: {
            stroke: '#cccccc'
        },
        style: {
            color: '#202030',
            fontSize: '15px'
        }
    }
});

// 获取URL多参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

// 日期格式化方法
function dateFtt(fmt, date) {
    var o = {
        'M+': date.getMonth() + 1,                   // 月份
        'd+': date.getDate(),                        // 日
        'H+': date.getHours(),                       // 小时
        'm+': date.getMinutes(),                     // 分
        's+': date.getSeconds(),                     // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds()                 // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

// 开始时间
function getBeginDate(beginDate, timeSpan) {
    let res = { truth: false };
    let arr = beginDate.split('-');
    let year = parseInt(arr[0]);
    let month = parseInt(arr[1]);
    let day = parseInt(arr[2]);
    if (day === 1 && parseInt(timeSpan) === 2592000) {
        month--;
        if (month < 1) {
            month = 12;
            year--;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var str = year + '-' + month + '-01' + beginDate.substring(beginDate.indexOf(' '));
        res.truth = true;
        res.str = str;
    }
    return res;
}

// 结束时间
function getEndDate(beginDate, timeSpan) {
    let res = { truth: false };
    let arr = beginDate.split('-');
    let year = parseInt(arr[0]);
    let month = parseInt(arr[1]);
    let day = parseInt(arr[2]);
    if (day === 1 && parseInt(timeSpan) === 2592000) {
        month++;
        if (month > 12) {
            month = 1;
            year++;
        }
        if (month < 10) {
            month = '0' + month;
        }
        var str = year + '-' + month + '-01' + beginDate.substring(beginDate.indexOf(' '));
        res.truth = true;
        res.str = str;
    }
    return res;
}

// 字符串转时间（yyyy-MM-dd HH:mm:ss)
function strToData(fDate) {
    var fullDate = fDate.split(' ')[0].split('-');
    var fullTime = [];
    if (fDate.split(' ')[1] !== undefined) {
        fullTime = fDate.split(' ')[1].split(':');
    }
    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], (fullTime[0] !== null ? fullTime[0] : 0), (fullTime[1] !== null ? fullTime[1] : 0), (fullTime[2] !== null ? fullTime[2] : 0));
}

// 时间转换成时间戳
function getDateTimestamp(dateStr) {
    let date = daxDate(dateStr);
    return Date.parse(date);
}

// 获取统一的时间格式,避免 IE 和 Google 浏览器获取时间的差异
function daxDate(datadt) {
    return transDateFromLocale(datadt);
}

function transDateFromLocale(localeDate) {
    if (!localeDate) return '';
    if (typeof localeDate == "string") {
        if (/[TZ]/.test(localeDate) == false) localeDate = localeDate.replace(/-/g, '/');
        localeDate = new Date(localeDate);
    } else if (!Number.isNaN(Number(localeDate))) {
        localeDate = new Date(localeDate);
    }
    return localeDate.toISOString();
}
function formatDateTime(d, pattern) {
    if (!d) return "";
    if (typeof d != "object") {
        if (/[TZ]/.test(d) == false && /[-]/.test(d)) {
            // 考虑到浏览器兼容性问题，将yyyy-MM-dd转换成yyyy/MM/dd的格式再进行new Date
            d = d.replace(/-/g, '/');
        }
        d = new Date(d);
    }
    pattern = pattern || 'yyyy-MM-dd';
    var y = d.getFullYear().toString(),
        o = {
            M: d.getMonth() + 1,
            d: d.getDate(),
            h: d.getHours(),
            m: d.getMinutes(),
            s: d.getSeconds()
        };
    pattern = pattern.replace(/(y+)/ig, function (a, b) {
        return y.substr(4 - Math.min(4, b.length));
    });
    for (var i in o) {
        pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
            return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
        });
    }
    return pattern;
}
function F(d, pattern) {
    return formatDateTime(d, pattern);
}
function transDateFromServer(serverDate, pattern) {
    if (!serverDate) return '';
    if (typeof serverDate == "string" && /[TZ]/.test(serverDate) == false) {
        serverDate = serverDate.replace(/-/g, '/');
    }
    return F(serverDate, pattern || "yyyy-MM-dd hh:mm");
}

function formatePolyfill(dateStr) {
    if(typeof dateStr !== 'string') return dateStr;
    if(typeof dateStr == "string" && /[TZ]/.test(dateStr) == false) {
        dateStr = dateStr.replace(/-/g,'/');
    } 
    return dateStr;
}

function str2Date(d) {
    if(!d) return ;
    if(typeof d != 'object') return new Date(d);
    return d;
}

function midnight(d) {
    return d ? F(d)+' 00:00:00' : '';
}
function beforeMidnight(d) {
    return d ? F(d)+' 23:59:59' : '';
}

function countDateByStep(base, step, flag, realTime) {
    base = formatePolyfill(base);
    var newMills, 
        baseDate = str2Date(base) || new Date(base),
        baseMills = baseDate.getTime(),
        _nowMills = new Date().getTime();
    switch (step) {
        case 'day' :
            newMills = baseMills + 24*60*60*1000*flag;
        break;
        case 'week' :
            newMills = baseMills + 7*24*60*60*1000*flag;
        break;
        case 'month' :
            newMills = new Date(baseDate.getFullYear(), baseDate.getMonth()+flag, baseDate.getDate()).getTime();
            if(realTime)
                newMills = new Date(baseDate.getFullYear(), baseDate.getMonth()+flag, baseDate.getDate(), baseDate.getHours(), baseDate.getMinutes(), baseDate.getSeconds()).getTime();
        break;
        case 'year' :
            newMills = new Date(baseDate.getFullYear()+flag, baseDate.getMonth(), baseDate.getDate()).getTime();
            if(realTime)
                newMills = new Date(baseDate.getFullYear()+flag, baseDate.getMonth(), baseDate.getDate(), baseDate.getHours(), baseDate.getMinutes(), baseDate.getSeconds()).getTime();
        break;
    }

    if(newMills > _nowMills) newMills = _nowMills;
    return (realTime ? newMills : midnight(newMills));
}