function getDataByMpoint(data, optionObj, params) {

    window.axios.get(envApi("/loong/api/curves/data"), { params: params }).then(function (result) {
        var res = result.data || {};
        if (res.items && res.items.length) {
            var seriesNameObj = {}, legend = [];
            // 获取配置项，确认是否配置了series，根据用户的配置来对应渲染图表的数据
            if (optionObj.series) {
                optionObj.series.forEach(function (ele, index) {
                    if (ele.name) {
                        seriesNameObj[ele.name] = index
                        // legend.push(ele.name)
                    }
                })

                res.items.forEach(function (ele, index) {
                    var currentIndex = seriesNameObj[ele.mpointName]
                    if (currentIndex == 0 || currentIndex) {
                        if (!optionObj.series[currentIndex].type) {
                            optionObj.series[currentIndex].type = "line"
                        }
                        if (!optionObj.series[currentIndex].showSymbol) {
                            optionObj.series[currentIndex].showSymbol = false
                        }
                        optionObj.series[currentIndex].name = ele.mpointName
                        optionObj.series[currentIndex].data = util.getXYItem(ele.data || [])
                    }
                });
                // if (!optionObj.legend) {
                //     optionObj.legend = {}
                // }
                // optionObj.legend.data = legend
                if (Object.prototype.toString.call(optionObj.xAxis) == '[object Object]') {
                    delete optionObj.xAxis.data
                    optionObj.xAxis.type = "time";
                    optionObj.xAxis.min = new Date(params.beginDate).getTime();
                    optionObj.xAxis.max = new Date(params.endDate).getTime();
                }
                if (Object.prototype.toString.call(optionObj.legend) == '[object Object]') {
                    delete optionObj.legend.data
                }
                data.a("chart.option", JSON.stringify(optionObj, function (key, val) {
                    if (typeof val === 'function') {
                        return val + '';
                    }
                    return val;
                }))
            } else {
                return
            }
        }else{
            if (optionObj.series){
                optionObj.series.forEach(function (ele, index) {
                    if (ele.name){
                        ele.data = [];
                    }
                })
                data.a("chart.option", JSON.stringify(optionObj, function (key, val) {
                    if (typeof val === 'function') {
                        return val + '';
                    }
                    return val;
                }))
            }
        }
    }).catch(function (err) {
        messageTip(err)
    });
}

function handleDataSource(res, data, chartDataMap, optionObj, filterFunc) {
    if (typeof (filterFunc) == "function") {
        res = filterFunc(res, data, optionObj)
    }
    data.a("dataSource",res);
    if (res && res.length) {
        var seriesNameObj = {}, legend = [];
        var x = chartDataMap.x, y = chartDataMap.y, s = chartDataMap.s;
        // 获取配置项，确认是否配置了series，根据用户的配置来对应渲染图表的数据
        if (x && y && s && optionObj.series) {
            // if (!optionObj.legend) {
            //     optionObj.legend = {}
            // }
            optionObj.series.forEach(function (ele, index) {
                if (ele.name) {
                    seriesNameObj[ele.name] = { type: ele.type, index: index, data: [] }
                }
            })
            // 设置series属性时，需要指定name属性值，否则相应设置将被忽略
            res.forEach(function (ele, i) {
                // 将配置的s字段与series中的name进行匹配
                if (seriesNameObj[ele[s]]) {
                    if (seriesNameObj[ele[s]].type == "radar") {
                        // 雷达图
                        if (optionObj.radar && optionObj.radar.indicator) {
                            var indicator = optionObj.radar.indicator
                            indicator.forEach(function (v, i) {
                                if (ele[x] == v.name) {
                                    if (!seriesNameObj[ele[s]].data[0]){
                                        seriesNameObj[ele[s]].data[0]={};
                                        seriesNameObj[ele[s]].data[0].value=[]
                                    }
                                    seriesNameObj[ele[s]].data[0].value[i] = ele[y]
                                }
                            })
                        }
                    } else {
                        seriesNameObj[ele[s]].data.push({
                            name: ele[y],
                            value: [ele[x], ele[y]]
                        })
                    }
                }
            });
           
            for (var key in seriesNameObj) {
                if (seriesNameObj.hasOwnProperty(key)) {
                    var element = seriesNameObj[key];
                    optionObj.series[element.index].data = element.data
                }
            }
            if (Object.prototype.toString.call(optionObj.xAxis) == '[object Object]') {
                delete optionObj.xAxis.data
            }
            // if (Object.prototype.toString.call(optionObj.legend) == '[object Object]') {
            //     delete optionObj.legend.data
            // }
            // optionObj.legend.data = legend
            data.a("chart.option", JSON.stringify(optionObj, function (key, val) {
                if (typeof val === 'function') {
                    return val + '';
                }
                return val;
            }))

            
        } else {
            return
        }
    }else{
        if (optionObj.series){
            optionObj.series.forEach(function (ele, index) {
                if (ele.name) {
                    ele.data = [];
                }
            })
            data.a("chart.option", JSON.stringify(optionObj, function (key, val) {
                if (typeof val === 'function') {
                    return val + '';
                }
                return val;
            }))
        }
    }
}
function initDateSource(data) {
    // 参数
    var dataSourceParams = data.a("dataSourceParams") || {};
    // 过滤器
    var filterFunc = data.a("filterFunc");
    if (filterFunc){
        filterFunc = util.looseJsonParse(filterFunc)
    }
    // 刷新频率
    // var refreshFrequency = data.a("refreshFrequency");
    // 字段映射
    var chartDataMap = data.a("chartDataMap") || {};
    // echarts配置项
    var chartOption = data.a("chart.option") || "{}";
    var optionObj = util.looseJsonParse(chartOption)||{}
    // 根据不同数据源类型，渲染动态数据
    if (data.a("dataSourceType") == "mpointDataSource") {
        // 测点数据源
        if (dataSourceParams["timeRangeType"] && dataSourceParams["mpointId"]) {
            var startDate = "",
                endDate = "",
                _now = new Date();
            var year = _now.getFullYear(),
                month = _now.getMonth(),
                day = _now.getDate();
            switch (dataSourceParams["timeRangeType"]) {
                case "day":
                    startDate = util.midnight(_now);
                    endDate = util.midnight(new Date(year, month, day + 1));
                    break;
                case "week":
                    startDate = util.firstDayByWeek();
                    endDate = util.midnight(new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                case "month":
                    startDate = util.firstDayByMonth();
                    endDate = util.midnight(new Date(year, month + 1, 1));
                    break;
                case "season":
                    var currentMonth = month + 1
                    if ('1,2,3'.indexOf(currentMonth) != -1) {
                        startDate = util.midnight(new Date(year, 0, 1))
                        endDate = util.midnight(new Date(year, 3, 1))
                    }
                    if ('4,5,6'.indexOf(currentMonth) != -1) {
                        startDate = util.midnight(new Date(year, 3, 1))
                        endDate = util.midnight(new Date(year, 6, 1))
                    }
                    if ('7,8,9'.indexOf(currentMonth) != -1) {
                        startDate = util.midnight(new Date(year, 6, 1))
                        endDate = util.midnight(new Date(year, 9, 1))
                    }
                    if ('10,11,12'.indexOf(currentMonth) != -1) {
                        startDate = util.midnight(new Date(year, 9, 1))
                        endDate = util.midnight(new Date(year, 12, 1))
                    }
                    break;
                case "year":
                    startDate = util.firstDayByYear();
                    endDate = util.midnight(new Date(year + 1, 0, 1));
                    break;
                default:
                    break;
            }
            if (Object.prototype.toString.call(optionObj) == '[object Object]') {
                getDataByMpoint(data, optionObj, {
                    ids: dataSourceParams["mpointId"],
                    beginDate: util.transDateFromLocale(startDate),
                    endDate: util.transDateFromLocale(endDate),
                    cycle: dataSourceParams["timeRangeType"],
                    ring: 0,
                    year: 0
                })
            }
        }
    }
    if (data.a("dataSourceType") == "API") {
        var url = dataSourceParams["url"]
        if (url) {
            var params={}
            if (dataSourceParams["jqueryParameter"]){
                params = util.looseJsonParse(dataSourceParams["jqueryParameter"], data)||{}
            }
            window.axios.get(envApi(url), { params: params }).then(function (result) {
                var res = result.data.items || [];
                handleDataSource(res, data, chartDataMap, optionObj, filterFunc)
            }).catch(function (err) {
                messageTip(err)
            });
        }
    }
    if (data.a("dataSourceType") == "SQL") {
        var sqlStatement = dataSourceParams["sqlStatement"]
        if (!sqlStatement) {
            return
        }
        sqlStatement = sqlStatement.replace(/\$\{(.*?)\}/g, function (word) {
            var expression = word.slice(2, -1);
            return util.looseJsonParse(expression, data);
        });
        window.axios.post(envApi("/data-analysis/api/dynamic-sql"), {
            sql: sqlStatement
        }).then(function (result) {
            var res = result.data || [];
            handleDataSource(res, data, chartDataMap, optionObj, filterFunc)
        }).catch(function (err) {
            messageTip(err)
        });
    }
} 