var COLOR = ['#2d73c5', '#285c5c', '#f5967d', '#41e741', '#b8860b', '#12b4ab', '#fae919', '#00bfff'];
// 曲线配置
var chartOption = {
    chart: {
        zoomType: 'x',
        resetZoomButton: {
            position: {
                x: -35,
                y: 5
            },
            relativeTo: 'chart'
        },
        alignTicks: false,
        panning: true,
        panKey: 'ctrl',
        type: 'spline'
    },
    title: {
        text: '',
        style: {
            fontSize: '13px',
            color: '#545454'
        }
    },
    xAxis: {
        type: 'datetime',
        maxPadding: 0,
        minPadding: 0,
        labels: {},
        dateTimeLabelFormats: {
            millisecond: '%H:%M:%S',
            second: '%H:%M:%S',
            minute: '%H:%M',
            hour: '%H:%M',
            day: '%b-%e',
            week: '%b-%e',
            month: '%Y-%b',
            year: '%Y'
        }
    },
    tooltip: { // 数据提示框
        xDateFormat: '%Y-%m-%d %H:%M:%S',
        useHTML: true,
        hideDelay: 0,
        crosshairs: true,
        shared: true,
        nearShared: true,
        followTouchMove: true,
        valueSuffix: '第一个单位'
    },
    legend: { // 图例
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom'
    },
    plotOptions: {
        series: {
            lineWidth: 3,
            marker: {
                radius: 2
            },
            turboThreshold: 100000,
            events: {
                // 数据列对应的图例项被点击时触发的事件回调函数
                legendItemClick: legendItemClick
            }
        }
    },
    credits: {
        enabled: false //隐藏版权标签
    }
}
var timer = null;
var chartIns = null;

function getData(){
    $.getJSON(SHAR_CTX + '/loong/api/curves-share/' + GetQueryString('id'), function (json) {
        if (json.items) {
            renderHtml(json);
            renderChart(json);
        }
    })
}

function countDown(json){
    // 获取倒计时时间戳，并转换成天时分秒
    var intDiff = 99999;
    intDiff = (getDateTimestamp(json.items.expireDate) - getDateTimestamp(dateFtt("yyyy-MM-dd HH:mm:ss", new Date()))) / 1000;
    if (intDiff > 0) {
        timer = setInterval(function () {
            var day = 0,
                hour = 0,
                minute = 0,
                second = 0;//时间默认值  
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            intDiff--;
            if (minute <= 9)
                minute = '0' + minute;
            if (second <= 9)
                second = '0' + second;
    
            var spanlength = $(".redspan").length;
            var spans = $(".redspan");
            if (spanlength == 4) {
                spans.eq(0).text(day);
                spans.eq(1).text(hour);
                spans.eq(2).text(minute);
                spans.eq(3).text(second);
    
            }
        }, 1000);
    }else{
        clearInterval(timer);
        timer = null;
    }
}

function renderHtml(json){
    // 设置测点名称及站点名称
    $('#mpoint-name').text(json.items.mpointName);
    $('#site-name').text(json.items.siteName);

    // 判断是否过期
    if (json.isExpire) {
        $('#main').css('display', 'none');
        $('#main-error').css('display', 'block');
        return;
    }

    $('#share-time').text(transDateFromServer(json.items.beginDate));
    $('#expire-time').text(transDateFromServer(countDateByStep(json.items.beginDate, json.items.cycle, 1)));

    countDown(json);

    $('#main').css('display', 'block');
    $('#main-error').css('display', 'none');
}

function renderChart(json){
    for(var i = 0; i < (json.list||[]).length; i++){
        addYAxis(getXYItem(json.list[i].data), json.list[i].unit, json.list[i].mpointName);
    }
    chartIns.redraw();
}

function legendItemClick(event){
    let current_order = 0;
    let series_show_num = 0;
    let series_num = chartIns.yAxis.length;
    for (var i = 0; i < chartIns.yAxis.length; i++) {
        if (chartIns.yAxis[i].showAxis) {
            series_show_num++;
        }
    }
    var curLegend = this;
    if (curLegend.visible === true) {
        // 隐藏
        if (series_show_num >= 1) {
            series_show_num--;
            // 设置每个曲线的高度及top
            let arrHAndT = getyAxisHeightTop(chartIns.plotHeight, 24, series_show_num);
            let current_order = 0;
            for (let i = 0; i < series_num; i++) {
                if (chartIns.yAxis[i].showAxis && curLegend.yAxis.options.id.split('_')[1] != i) {
                    chartIns.yAxis[i].update({
                        height: arrHAndT[current_order].height + "%",
                        top: arrHAndT[current_order].top + "%",
                    }, true);
                    current_order++;
                }
            }
        }
        let selfMin = chartIns.yAxis[curLegend.index].options.min;
        let selfMax = chartIns.yAxis[curLegend.index].options.max;
        chartIns.yAxis[curLegend.index].update({
            min: null,
            max: null,
            selfMin: selfMin,
            selfMax: selfMax
        }, false);
        chartIns.series[curLegend.index].setVisible(false);
    } else if (curLegend.visible === false) {
        // 显示
        series_show_num++;
        let arrHAndT = getyAxisHeightTop(chartIns.plotHeight, 24, series_show_num);
        let current_order = 0;
        for (let i = 0; i < series_num; i++) {
            if (chartIns.yAxis[i].showAxis || curLegend.yAxis.options.id.split('_')[1] == i) {
                // 循环 设置已有的曲线
                chartIns.yAxis[i].update({
                    height: arrHAndT[current_order].height + "%",
                    top: arrHAndT[current_order].top + "%"
                }, true);
                current_order++;
            }
        }

        let selfMin = chartIns.yAxis[curLegend.index].options.selfMin;
        let selfMax = chartIns.yAxis[curLegend.index].options.selfMax;
        chartIns.yAxis[curLegend.index].update({
            min: selfMin == undefined ? null : selfMin,
            max: selfMax == undefined ? null : selfMax
        }, false);
        chartIns.series[curLegend.index].setVisible(true);
    }
    curLegend._flagList.forEach(function(item){
        if(curLegend.visible){
            item.show().toFront();
        }else{
            item.hide();
        }
    })

    return false;
}

function getXYItem(data) {
    var r = [];
    if(!data) return r;
    data.forEach((item)=>{
        r.push({
            x: item.dataDate, 
            y: Number(item.dataValue),
            mark: item.remark,
            marked: !!(item.remark),
            mkid: item.id,
            timestamp : new Date(item.dataDate)
        });
    })   
    return r;
}

// 计算每个曲线高度和间距
function getyAxisHeightTop(plotHeight, intval, num) {
    let arr = [];
    let h = (plotHeight - (num - 1) * intval) / num;
    let hPercentege = h / plotHeight * 100;
    for (let i = 0; i < num; i++) {
        let obj = {};
        let t = (h + intval) * i;
        let tPercentege = t / plotHeight * 100;
        obj.height = hPercentege;
        obj.top = tPercentege;
        arr.push(obj);
    }
    return arr;
}

// 添加Y轴
function addYAxis(data, unit, name) {
    let num = chartIns.series.length;
    let show_num = 0;
    for (let i = 0; i < num; i++) {
        if (chartIns.series[i].visible) {
            show_num++;
        }
    }
    num++;
    show_num++;

    var options = {
        title: {
            align: 'high',
            text: unit,
            margin: 10,
            rotation: 360
        },
        maxPadding: 0,
        minPadding: 0,
        gridLineWidth: 1,
        lineWidth: 1,
        lineColor: this.COLOR[num - 1],
        showEmpty: false,
        opposite: false // 是否反向（默认显示在左边，是否显示都右边）
    };
    var seriesOptions = {
        name: name,
        data: data,
        color: this.COLOR[num - 1],
        shadow: false,
        lineWidth: 1,
        tooltip: { valueSuffix: unit },
        yAxis: 'mulitXY_' + (num - 1)
    };

    let arrHAndT = getyAxisHeightTop(chartIns.plotHeight, 24, show_num);
    $.extend(options, {
        id: 'mulitXY_' + (num - 1),
        height: arrHAndT[show_num - 1].height + '%',
        top: arrHAndT[show_num - 1].top + '%',
        offset: 0
    });
    chartIns.addAxis(options, false, false);
    chartIns.addSeries(seriesOptions, false);

    // 设置每个曲线的高度及top
    let current_order = 0;
    for (let j = 0; j < num; j++) {
        if (chartIns.yAxis[j].showAxis) {
            // 循环 设置已有的曲线
            chartIns.yAxis[j].update({
                height: arrHAndT[current_order].height + "%",
                top: arrHAndT[current_order].top + "%"
            }, false);
            current_order++;
        }
    }
}

function refresh(){
    while (chartIns.yAxis.length > 0) {
        chartIns.yAxis[0].remove();  // 删除本身创建的highcharts,否则会出现两个
    }
    getData();
}

$(function () {
    $('#chart-wrap').highcharts(chartOption);
    chartIns = $('#chart-wrap').highcharts();
    refresh();
})