(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{1286:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-item home-data-quality-statistics"},[a("h3",[t._v("\n        数据质量统计\n        "),t.isEdit?a("a",{staticClass:"home-del-btn",attrs:{href:"javascript:;"},on:{click:t.del}},[t._v("删除")]):t._e()]),t._v(" "),a("div",{staticStyle:{margin:"0 10px"}},[a("mg-date-step",{ref:"dateStep",attrs:{editable:t.dateEditable,clearable:t.dateClearable},on:{"on-change":t.dateStepChange,"on-timeRangeChange":t.timeRangeChange},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),t._v(" "),a("div",{staticStyle:{margin:"6px 10px","font-size":"0px"}},[a("div",{staticClass:"main-box"},[a("div",{staticClass:"box"},[a("div",{staticClass:"title"},[t._v("总体评价")]),t._v(" "),a("div",{class:t.evaluateMap[t.statisticsInfo.overall]+" content"},[a("span",{staticClass:"evaluate-result"},[t._v(t._s(t.statisticsInfo.overallLevel))]),t._v(" "),a("div",{staticClass:"tip"},[a("div",{staticStyle:{display:"table",height:"36px"}},[a("p",[t._v(t._s(t.statisticsInfo.overallRemark))])])]),t._v(" "),a("div",{staticClass:"trend-chart",attrs:{id:"totalEvaluateChart"}})])]),t._v(" "),a("div",{staticClass:"box"},[a("div",{staticClass:"title"},[t._v("样本占比")]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"sample-chart-wrap",attrs:{id:"sampleChart"}}),t._v(" "),a("ul",{staticClass:"right-content"},[a("li",{staticClass:"first"},[a("i"),t._v(" "),a("span",{staticClass:"label"},[t._v("总数")]),t._v(" "),a("span",{staticClass:"num",attrs:{title:t.statisticsInfo.totalSample}},[t._v(t._s(t.statisticsInfo.totalSample))])]),t._v(" "),a("li",{staticClass:"second"},[a("i"),t._v(" "),a("span",{staticClass:"label"},[t._v("样本数")]),t._v(" "),a("span",{staticClass:"num",attrs:{title:t.statisticsInfo.calcedSample}},[t._v(t._s(t.statisticsInfo.calcedSample))])])])])])]),t._v(" "),a("ul",{staticClass:"evaluate-list"},[a("li",{staticClass:"first"},[a("div",{class:t.evaluateMap[t.statisticsInfo.accuracyLevelNum]+" content"},[a("span",{staticClass:"evaluate-result",attrs:{title:"准确数据量/实际总数据量"}},[t._v(t._s(t.statisticsInfo.accuracyLevel))]),t._v(" "),a("div",{staticClass:"right-content"},[a("span",{staticClass:"title"},[t._v("准确性")]),t._v(" "),a("div",{staticClass:"evaluate-index ell",attrs:{title:(t.statisticsInfo.overallAccuracy||"")+"%"}},[t._v(t._s(t.statisticsInfo.overallAccuracy)+"%")])])])]),t._v(" "),a("li",{staticClass:"second"},[a("div",{class:t.evaluateMap[t.statisticsInfo.completenessLevelNum]+" content"},[a("span",{staticClass:"evaluate-result",attrs:{title:"实际数据量/理论数据量"}},[t._v(t._s(t.statisticsInfo.completenessLevel))]),t._v(" "),a("div",{staticClass:"right-content"},[a("span",{staticClass:"title"},[t._v("完整性")]),t._v(" "),a("div",{staticClass:"evaluate-index ell",attrs:{title:(t.statisticsInfo.overallCompleteness||"")+"%"}},[t._v(t._s(t.statisticsInfo.overallCompleteness)+"%")])])])]),t._v(" "),a("li",{staticClass:"third"},[a("div",{class:t.evaluateMap[t.statisticsInfo.timelinessLevelNum]+" content"},[a("span",{staticClass:"evaluate-result",attrs:{title:"平均采集延时"}},[t._v(t._s(t.statisticsInfo.timelinessLevel))]),t._v(" "),a("div",{staticClass:"right-content"},[a("span",{staticClass:"title"},[t._v("及时性")]),t._v(" "),a("div",{staticClass:"evaluate-index ell",attrs:{title:(t.statisticsInfo.overallTimeliness||"")+"s"}},[t._v(t._s(t.statisticsInfo.overallTimeliness)+"s")])])])]),t._v(" "),a("li",{staticClass:"fourth"},[a("div",{class:t.evaluateMap[t.statisticsInfo.consistencyLevelNum]+" content"},[a("span",{staticClass:"evaluate-result",attrs:{title:"一致数据量/实际总数据量"}},[t._v(t._s(t.statisticsInfo.consistencyLevel))]),t._v(" "),a("div",{staticClass:"right-content"},[a("span",{staticClass:"title"},[t._v("一致性")]),t._v(" "),a("div",{staticClass:"evaluate-index ell",attrs:{title:(t.statisticsInfo.overallConsistency||"")+"%"}},[t._v(t._s(t.statisticsInfo.overallConsistency)+"%")])])])])])])])};n._withStripped=!0;var i=a(556),s=a.n(i),l=a(572),o=a.n(l),r=a(579),c=a(517),d=a(145),p=a(11),u=a(545),g=a(107);o()(s.a);var h={props:{isEdit:Boolean,itemData:Object,siteId:{type:[String,Number],default:-1}},name:"dataQualityStatistics",components:{mgDateStep:r.a,dropdownTree:d.a},watch:{siteId:function(){this.searchParams.siteId=this.siteId,this.getStatisticsInfo(),this.renderTrendChart()}},data:function(){return{dateEditable:!1,dateClearable:!1,evaluateMap:{4:"excellent",3:"good",2:"medium",1:"bad"},date:c.a.midnight((new Date).getTime()-864e5)+"#day",treeApi:g.a,searchParams:{siteId:null,beginDate:p.a.transDateFromLocale(c.a.midnight((new Date).getTime()-864e5)),endDate:p.a.transDateFromLocale(c.a.midnight(new Date))},statisticsInfo:{}}},methods:{del:function(){this.$emit("on-delete",this.itemData)},getStatisticsInfo:function(){var t=this;this.$http.get(u.a.getStatisticsInfo,this.searchParams).then((function(e){if(e){t.statisticsInfo=e;s.a.chart("sampleChart",{chart:{backgroundColor:"#F8F9FB",spacing:[0,0,0,0]},credits:{enabled:!1},title:{floating:!0,text:"",style:{color:"#F0A33F",fontWeight:"bold",fontSize:"12px"}},tooltip:{enabled:!1},plotOptions:{series:{enableMouseTracking:!1},pie:{allowPointSelect:!0,slicedOffset:2,cursor:"pointer",colors:["#4B7EFE","#F0A33F"],dataLabels:{enabled:!1}}},series:[{type:"pie",size:"90%",innerSize:"80%",name:"",states:{hover:{enabled:!1}},data:[["样本总数",e.totalSample-e.calcedSample],["样本数",e.calcedSample]]}]},(function(t){var a=t.series[0].center[1],n=parseInt(t.title.styles.fontSize);t.setTitle({y:a+n/2,text:(Number(e.samplePercentage).toFixed(2)||"")+"%"})}))}}))},renderTrendChart:function(){this.$http.get(u.a.getTrend,{siteId:this.searchParams.siteId}).then((function(t){if(t&&t.length)s.a.chart("totalEvaluateChart",{lang:{noData:"暂无数据"},chart:{type:"line",backgroundColor:"#F8F9FB",spacing:[0,0,0,0],margin:[0,0,0,0]},title:{text:""},yAxis:{visible:!1,min:0},xAxis:{visible:!1},credits:{enabled:!1},plotOptions:{series:{enableMouseTracking:!1,connectNulls:!0},area:{fillColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"rgba(218,231,255,1)"],[1,"rgba(218,231,255,0)"]]},lineWidth:1,states:{hover:{lineWidth:1}},threshold:null,marker:{enabled:!1}}},tooltip:{enabled:!1},legend:{enabled:!1},series:[{type:"area",name:"",data:t}]})}))},timeRangeChange:function(t){"day"==t.step&&(this.$refs.dateStep.startDate=c.a.midnight((new Date).getTime()-864e5))},dateStepChange:function(t){var e={beginDate:p.a.transDateFromLocale(t.date),endDate:null},a=new Date(t.date);"day"==t.step&&(e.endDate=p.a.transDateFromLocale(new Date(a.setDate(a.getDate()+1)))),"week"==t.step&&(e.endDate=p.a.transDateFromLocale(new Date(a.getTime()+6048e5))),"month"==t.step&&(e.endDate=p.a.transDateFromLocale(new Date(a.setMonth(a.getMonth()+1)))),"year"==t.step&&(e.endDate=p.a.transDateFromLocale(new Date(a.setFullYear(a.getFullYear()+1)))),this.searchParams=Object.assign({},this.searchParams,e),this.getStatisticsInfo()}},created:function(){},mounted:function(){this.searchParams.siteId=this.siteId,this.getStatisticsInfo(),this.renderTrendChart()}},v=(a(856),a(1)),f=Object(v.a)(h,n,[],!1,null,null,null);f.options.__file="src/views/home/components/6/data-quality-statistics.vue";e.default=f.exports},517:function(t,e,a){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i={F:function(t,e){if(!t)return"";"object"!=n(t)&&(t=new Date(t)),e=e||"yyyy-MM-dd";var a=t.getFullYear().toString(),i={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var s in e=e.replace(/(y+)/gi,(function(t,e){return a.substr(4-Math.min(4,e.length))})),i)e=e.replace(new RegExp("("+s+"+)","g"),(function(t,e){return i[s]<10&&e.length>1?"0"+i[s]:i[s]}));return e},str2Date:function(t){if(t)return"object"!=n(t)?new Date(t):t},firstDayByWeek:function(t){var e=i.str2Date(t)||new Date,a=e.getDay(),n=(0==a?7:a)-1;return i.midnight(new Date(e.getTime()-24*n*60*60*1e3))},firstDayByMonth:function(t){var e=i.str2Date(t)||new Date;return i.midnight(new Date(e.getFullYear(),e.getMonth(),1))},firstDayByYear:function(t){var e=i.str2Date(t)||new Date;return i.midnight(new Date(e.getFullYear(),0,1))},countDateByStep:function(t,e,a,n){t=i.formatePolyfill(t);var s,l=i.str2Date(t)||new Date(t),o=l.getTime(),r=(new Date).getTime();switch(a){case"day":s=o+864e5*e;break;case"week":s=o+6048e5*e;break;case"month":s=new Date(l.getFullYear(),l.getMonth()+e,l.getDate()).getTime(),n&&(s=new Date(l.getFullYear(),l.getMonth()+e,l.getDate(),l.getHours(),l.getMinutes(),l.getSeconds()).getTime());break;case"year":s=new Date(l.getFullYear()+e,l.getMonth(),l.getDate()).getTime(),n&&(s=new Date(l.getFullYear()+e,l.getMonth(),l.getDate(),l.getHours(),l.getMinutes(),l.getSeconds()).getTime())}return s>r&&(s=r),n?s:i.midnight(s)},midnight:function(t){return t?i.F(t)+" 00:00:00":""},beforeMidnight:function(t){return t?i.F(t)+" 23:59:59":""},midnightMill:function(t){var e=i.str2Date(t)||new Date;return new Date(i.midnight(e)).getTime()},chain:function(t,e){return i.countDateByStep(t,-1,e)},yearOFyear:function(t){return i.countDateByStep(t,-1,"year")},getPeriods:function(t){var e,a=t.beginDate,n=new Date(i.formatePolyfill(a)),s=n.getTime();switch(t.cycle){case"day":e=s+864e5;break;case"week":e=s+6048e5;break;case"month":e=new Date(n.getFullYear(),n.getMonth()+1,n.getDate(),0,0,0).getTime();break;case"year":e=new Date(n.getFullYear()+1,n.getMonth(),n.getDate(),0,0,0).getTime()}return{min:s,max:new Date(e).getTime()}},formatePolyfill:function(t){return"string"!=typeof t?t:("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t)},getTerminalsByMonth:function(t,e){var a,n;return 0==e?(a=new Date(t,0,1,0,0,0),n=new Date(t,11,31,23,59,59)):(a=new Date(t,e-1,1,0,0,0),n=new Date(t,e,0,23,59,59)),{start:a,end:n}},transDateFromServer:function(t,e){return t?("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),i.F(t,e||"yyyy-MM-dd hh:mm")):""},transDateFromLocale:function(t){return t?("string"==typeof t&&(0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t=new Date(t)),t.toISOString()):""},strToData:function(t){var e=t.split(" ")[0].split("-"),a=[];return void 0!==t.split(" ")[1]&&(a=t.split(" ")[1].split(":")),new Date(e[0],e[1]-1,e[2],null!==a[0]?a[0]:0,null!==a[1]?a[1]:0,null!==a[2]?a[2]:0)}};e.a=i},540:function(t,e,a){var n=a(571);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("4f138dda",n,!1,{})},545:function(t,e,a){"use strict";a(22);e.a={getList:"/loong/api/data-quality/config",addConfig:"/loong/api/data-quality/config",updateConfig:"/loong/api/data-quality/config",deleteConfig:"/loong/api/data-quality/config",getDetal:"/loong/api/data-quality/config",getExceptionProcess:"/loong/api/data-quality/exception-process",recalcData:"/loong/api/data-quality/recalc",getRecalcList:"/loong/api/data-quality/recalc",getStatisticsInfo:"/loong/api/data-quality/statistics",getStatisticsList:"/loong/api/data-quality/statistics-list",getTrend:"/loong/api/data-quality/trend",getCurveData:"/loong/api/data-quality/curve",getCurveAccuracy:"/loong/api/data-quality/curve-accuracy",getCurveAccuracyBefore:"/loong/api/data-quality/curve-before",correctionData:"/loong/api/data-quality/correction",getCorrectionData:"/loong/api/data-quality/correction",getCurveCompleteness:"/loong/api/data-quality/curve-completeness",inputData:"/loong/api/data-quality/input",getCurveConsistency:"/loong/api/data-quality/curve-consistency",getStandard:"/loong/api/data-quality/standard",updateStandard:"/loong/api/data-quality/standard",updateToDefault:"/loong/api/data-quality/standard-to-default",getCompletenessException:"/loong/api/data-quality/completeness-exception",getconfigedMpointIds:"/loong/api/data-quality/configed-mpointIds"}},570:function(t,e,a){"use strict";var n=a(540);a.n(n).a},571:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-date-step-icon {\r\n    display: inline-block;\r\n    vertical-align: bottom;\r\n    /* margin-left: ; */\n}\n.cmp-date-step-icon a {\r\n    display: inline-block;\r\n    margin: 0 5px;\n}\r\n",""]),t.exports=e},579:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-date-step"},[a("label",{attrs:{for:""}},[t._v("起始时间：")]),t._v(" "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"date",format:"yyyy-MM-dd HH:mm:ss",placeholder:"选择时间",size:"small",editable:t.editable,clearable:t.clearable},on:{"on-change":t.dateChange},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v(" "),a("div",{staticClass:"cmp-date-step-icon"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.dateRelaChange(-1)}}},[a("Icon",{attrs:{type:"arrow-left-b",size:"22",color:"#4B7EFE"}})],1),t._v(" "),a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.dateRelaChange(1)}}},[a("Icon",{attrs:{type:"arrow-right-b",size:"22",color:"#4B7EFE"}})],1),t._v(" "),a("a",{attrs:{href:"javascript:;"},on:{click:t.dateRelaLastest}},[a("Icon",{attrs:{type:"ios-skipforward",size:"22",color:"#4B7EFE"}})],1)]),t._v(" "),a("label",{attrs:{for:""}},[t._v("时间跨度：")]),t._v(" "),a("Select",{staticStyle:{width:"70px"},attrs:{size:"small"},on:{"on-change":t.dateStepChange},model:{value:t.step,callback:function(e){t.step=e},expression:"step"}},[a("Option",{attrs:{value:"day"}},[t._v("天")]),t._v(" "),a("Option",{attrs:{value:"week"}},[t._v("周")]),t._v(" "),a("Option",{attrs:{value:"month"}},[t._v("月")]),t._v(" "),a("Option",{attrs:{value:"year"}},[t._v("年")])],1),t._v(" "),t._t("default")],2)};n._withStripped=!0;var i=a(517),s={name:"mgDateStep",props:{editable:!1,clearable:!1,value:{type:String,default:""}},data:function(){return{startDate:this.value.split("#")[0]||i.a.midnight(new Date),step:this.value.split("#")[1]||"day"}},methods:{dateChange:function(){this.$emit("on-change",{date:i.a.midnight(this.startDate),step:this.step})},dateStepChange:function(){switch(this.step){case"day":this.startDate=i.a.midnight(new Date);break;case"week":this.startDate=i.a.firstDayByWeek();break;case"month":this.startDate=i.a.firstDayByMonth();break;case"year":this.startDate=i.a.firstDayByYear()}this.$emit("on-timeRangeChange",{date:this.startDate,step:this.step}),this.$emit("on-change",{date:this.startDate,step:this.step})},dateRelaChange:function(t){var e=this.startDate,a=this.step;this.startDate=i.a.countDateByStep(e,t,a),this.$emit("on-change",{date:this.startDate,step:this.step})},dateRelaLastest:function(){this.dateStepChange()},resetDate:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.value;this.startDate=t.split("#")[0]||i.a.midnight(new Date),this.step=t.split("#")[1]||"day"}},mounted:function(){}},l=(a(570),a(1)),o=Object(l.a)(s,n,[],!1,null,null,null);o.options.__file="src/components/mg-date-step.vue";e.a=o.exports},637:function(t,e,a){var n=a(857);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("ded5f2d8",n,!1,{})},856:function(t,e,a){"use strict";var n=a(637);a.n(n).a},857:function(t,e,a){(e=a(10)(!1)).push([t.i,'.home-data-quality-statistics .main-box {\n  width: 46%;\n  margin-right: 1%;\n  display: inline-block;\n}\n.home-data-quality-statistics .box {\n  width: 100%;\n  color: #576374;\n  background-color: #F8F9FB;\n  display: inline-block;\n  vertical-align: top;\n  font-size: 13px;\n  margin-bottom: 10px;\n  position: relative;\n}\n.home-data-quality-statistics .box .title {\n  height: 55px;\n  width: 40px;\n  word-break: break-all;\n  line-height: 14px;\n  padding-left: 15px;\n  padding-right: 10px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n  font-size: 12px;\n  color: #394553;\n  border-right: 1px solid #e4e9f1;\n}\n.home-data-quality-statistics .box .content {\n  position: absolute;\n  height: 75px;\n  left: 50px;\n  right: 0;\n  top: 0;\n}\n.home-data-quality-statistics .box .content .sample-chart-wrap {\n  display: inline-block;\n  width: 66px;\n  height: 66px;\n  margin-top: 5px;\n}\n.home-data-quality-statistics .box .content .right-content {\n  height: 40px;\n  position: absolute;\n  left: 72px;\n  right: 0;\n  top: 20px;\n}\n.home-data-quality-statistics .box .content .trend-chart {\n  height: 26px;\n  position: absolute;\n  right: 12px;\n  left: 46px;\n  bottom: 2px;\n}\n.home-data-quality-statistics .box .content .tip {\n  position: absolute;\n  left: 46px;\n  right: 12px;\n  top: 10px;\n}\n.home-data-quality-statistics .box .content p {\n  display: table-cell;\n  width: 100%;\n  font-size: 12px;\n  vertical-align: middle;\n  margin-top: 18px;\n}\n.home-data-quality-statistics .box .content li {\n  list-style: none;\n  font-size: 14px;\n}\n.home-data-quality-statistics .box .content i {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n}\n.home-data-quality-statistics .box .content .label {\n  display: inline-block;\n  width: 40px;\n  margin: 0 5px;\n  font-size: 12px;\n}\n.home-data-quality-statistics .box .content .first {\n  position: relative;\n  color: #4b7efe;\n}\n.home-data-quality-statistics .box .content .first i {\n  background-color: #4b7efe;\n}\n.home-data-quality-statistics .box .content .first .num {\n  position: absolute;\n  left: 65px;\n  right: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.home-data-quality-statistics .box .content .second {\n  position: relative;\n  color: #f0a33f;\n}\n.home-data-quality-statistics .box .content .second i {\n  background-color: #f0a33f;\n}\n.home-data-quality-statistics .box .content .second .num {\n  position: absolute;\n  left: 65px;\n  right: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.home-data-quality-statistics .evaluate-result {\n  display: inline-block;\n  width: 36px;\n  height: 36px;\n  border-radius: 18px;\n  text-align: center;\n  line-height: 36px;\n  font-size: 16px;\n  margin: 20px 10px 0 5px;\n}\n.home-data-quality-statistics .evaluate-index {\n  font-family: verdana,arail;\n  font-size: 20px;\n  color: #394553;\n  position: absolute;\n  left: 0;\n  right: 0;\n}\n.home-data-quality-statistics .excellent .evaluate-result {\n  background-color: #dfe8e4;\n  color: #00AB01;\n}\n.home-data-quality-statistics .good .evaluate-result {\n  background-color: #e7eaf0;\n  color: #4B7EFE;\n}\n.home-data-quality-statistics .medium .evaluate-result {\n  background-color: #f0eee9;\n  color: #F5C758;\n}\n.home-data-quality-statistics .bad .evaluate-result {\n  background-color: #eee6e6;\n  color: #CD1C1A;\n}\n.home-data-quality-statistics .evaluate-list {\n  display: inline-block;\n  width: 53%;\n  background-color: #fff;\n  overflow: hidden;\n  vertical-align: top;\n  color: #8190A5;\n}\n.home-data-quality-statistics .evaluate-list li {\n  list-style: none;\n  display: inline-block;\n  vertical-align: top;\n  width: 50%;\n  position: relative;\n  text-align: left;\n  background-color: #F8F9FB;\n  height: 75px;\n  font-size: 13px;\n  margin-bottom: 10px;\n}\n.home-data-quality-statistics .evaluate-list li .content {\n  margin: 0 10px;\n  height: 75px;\n  position: relative;\n}\n.home-data-quality-statistics .evaluate-list li .title {\n  display: block;\n  height: 20px;\n  margin: 12px 0 6px 0;\n  color: #8190A5;\n  font-size: 12px;\n}\n.home-data-quality-statistics .evaluate-list li .right-content {\n  text-align: left;\n  height: 75px;\n  position: absolute;\n  top: 0;\n  left: 54px;\n  right: 0;\n}\n.home-data-quality-statistics .evaluate-list li p {\n  font-size: 10px;\n  color: #686F7B;\n  padding-left: 15px;\n}\n.home-data-quality-statistics .evaluate-list li.second:before,\n.home-data-quality-statistics .evaluate-list li.fourth:before {\n  content: "";\n  position: absolute;\n  left: 0;\n  top: 8px;\n  height: 60px;\n  width: 1px;\n  background-color: #e4e9f1;\n}\n',""]),t.exports=e}}]);