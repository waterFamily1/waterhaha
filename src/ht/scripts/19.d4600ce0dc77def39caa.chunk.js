(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{1056:function(t,e,a){"use strict";var n=a(751);a.n(n).a},1057:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.mg-evt-calendar-item {\r\n\tdisplay: inline-block;\r\n\twidth: 100%;\n}\n.mg-evt-calendar-prev .mg-evt-calendar-body{\r\n\tborder-right: 1px solid #CCC;\r\n\theight: 100%;\n}\n.mg-evt-calendar-header {\r\n\ttext-align: center;\n}\n.mg-evt-calendar-body th {\r\n    text-indent: 10px;\r\n    background-color: #f7f7f7;\n}\n.mg-evt-calendar-focus {\r\n\tfont-size: 14px;\r\n\tdisplay: inline-block;\r\n\tvertical-align: top;\r\n\tmargin: 0 7px;\n}\n.mg-evt-calendar-td {\r\n    position: relative;\r\n    height: 40px;\r\n    overflow: hidden;\r\n\tcursor: pointer;\n}\n.mg-evt-cal-day {\r\n    position: absolute;\r\n    right: 5px;\r\n    top: 5px;\r\n    width: 30px;\r\n    height: 30px;\r\n    font-size: 14px ;\r\n    text-align: right;\r\n    font-family: Georgia,Serif;\r\n    color: #b3b3b3;\n}\n.mg-evt-calendar-today .mg-evt-cal-day {\r\n\tfont-weight: 700;\r\n\tcolor: #333;\n}\n.mg-evt-calendar-event {\r\n\tcolor: #333;\r\n    font-weight: 700;\r\n    background-color: #f9f8fd;\n}\n.mg-evt-calendar-td.active {\r\n\tbackground-color: #4b7efe;\r\n\tcolor: #FFF;\n}\n.active .mg-evt-cal-day {\r\n    color: #FFF;\n}\r\n",""]),t.exports=e},1058:function(t,e,a){"use strict";var n=a(752);a.n(n).a},1059:function(t,e,a){var n=a(10),i=a(24),r=a(1060);e=n(!1);var s=i(r);e.push([t.i,"\n.capture-img-item {\r\n    float: left;\r\n    width: 19%;\r\n    height: 130px;\r\n    margin: 10px 1% 0 0;\r\n    cursor: pointer;\n}\n.capture-img-item img {\r\n    width: 100%;\r\n    height: 130px;\n}\n.capture-event-data {\r\n    display: inline-block;\r\n    font-size:12px;\r\n    font-weight: 100;\r\n    margin: 3px 0 0 10px;\n}\n.capture-event-alarm {\r\n    background: #f5a623 url("+s+") no-repeat right top;\r\n    padding-right: 10px;\r\n    text-indent: 4px;\n}\n.capture-event-alarm.isread {\r\n    background-image: none;\n}\n.capture-event-timer {\r\n    padding: 0 10px 0 4px;\r\n    background-color: #56bcf7;\n}\n.capture-event-alarm a, .capture-event-timer a {\r\n    color: #FFF;\r\n    text-decoration: underline;\n}\n.capture-event .mg-evt-calendar-td.active {\r\n    background-color: #ecebf3;\n}\n.capture-event .mg-evt-calendar-td.active .mg-evt-cal-day {\r\n    color: #000;\n}\r\n",""]),t.exports=e},1060:function(t,e,a){t.exports=a.p+"images/4f0223ad910efcd1f0c861bcafeb125f.png"},1128:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"c-tree"},[a("div",{staticClass:"c-tree-left c-scrollbar",attrs:{id:"J_TREE_LEFT"}},[a("h3",[t._v("区域位置")]),t._v(" "),a("div",{staticClass:"padding0-10"},[a("Tree",{attrs:{data:t.treeData,render:t.renderContent}})],1)]),t._v(" "),a("div",{staticClass:"c-main-border c-tree-right"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[t._v("视频抓拍")]),t._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{directives:[{name:"show",rawName:"v-show",value:t.$route.params.id,expression:"$route.params.id"}],staticClass:"c-btn-back",attrs:{type:"primary"},on:{click:t.back}},[t._v("返回")])],1)]),t._v(" "),a("div",{staticClass:"capture-event",staticStyle:{"margin-top":"10px"}},[a("mg-evt-calendar",{ref:"evtCalendar",attrs:{eventsData:t.eventsData},on:{"on-month-click":t.monthClick},scopedSlots:t._u([{key:"default",fn:function(e){return[e.evtData?a("div",{staticClass:"capture-event-data"},[a("div",{directives:[{name:"show",rawName:"v-show",value:e.evtData.timerCount>0,expression:"slotProps.evtData.timerCount > 0"}],staticClass:"capture-event-timer"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.thumbClick("timer",e.evtData)}}},[t._v("定时抓拍"+t._s(e.evtData.timerCount)+"张")])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.evtData.alarmCount>0,expression:"slotProps.evtData.alarmCount > 0"}],staticClass:"capture-event-alarm",class:{isread:e.evtData.read}},[a("a",{attrs:{href:"javascript:;"},on:{click:function(a){return t.thumbClick("alarm",e.evtData)}}},[t._v("报警抓拍"+t._s(e.evtData.alarmCount)+"张")])])]):t._e()]}}])})],1),t._v(" "),a("div",{staticStyle:{margin:"20px 20px 0"}},[a("mg-tab",{attrs:{groups:t.tabs,multiple:!1,entire:!1,underline:!0},on:{"on-click":t.tabChange},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}})],1),t._v(" "),a("div",{staticStyle:{margin:"0 0 0 10px",overflow:"hidden",position:"relative"}},[t.loading?a("Spin",{attrs:{fix:""}}):t._e(),t._v(" "),t._l(t.listData,(function(t){return a("div",{key:t.id,staticClass:"capture-img-item"},[a("img",{directives:[{name:"img",rawName:"v-img",value:{group:"group",src:t.url,title:t.thumbdt},expression:"{group:'group', src: item.url, title: item.thumbdt}"}],attrs:{src:t.thumburl,alt:""}})])})),t._v(" "),t.activeDay?0==t.total?a("div",{staticClass:"c-nodata-tip"},[t._v("该时间段暂无截图")]):t._e():a("div",{staticClass:"c-nodata-tip"},[t._v("请选择日期")])],2),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total > 0"}],staticStyle:{margin:"10px",clear:"both"}},[a("Page",{staticClass:"table-page",attrs:{total:t.total,"page-size":t.params.pageSize,current:t.params.currentPage,"show-total":"","show-elevator":"",size:"small"},on:{"on-change":t.pageChange}})],1)])])};n._withStripped=!0;var i=a(7),r=a(542),s=(a(23),a(524)),o=(a(107),a(11)),c=a(576),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mg-evt-calendar"},[a("div",{staticClass:"mg-evt-calendar-item"},[a("div",{staticClass:"mg-evt-calendar-header"},[a("a",{attrs:{href:"javascript:;"},on:{click:t.prev}},[a("Icon",{attrs:{type:"android-arrow-dropleft-circle",size:"20",color:"#CCC"}})],1),t._v(" "),a("span",{staticClass:"mg-evt-calendar-focus"},[t._v(t._s(t.currentMonth))]),t._v(" "),a("a",{attrs:{href:"javascript:;"},on:{click:t.next}},[a("Icon",{attrs:{type:"android-arrow-dropright-circle",size:"20",color:"#CCC"}})],1)]),t._v(" "),a("div",{staticClass:"mg-evt-calendar-body"},[a("table",{attrs:{width:"100%"}},[a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("colgroup",{attrs:{width:"14%",align:"right"}}),t._v(" "),a("thead",[a("tr",t._l(t.weeks,(function(e){return a("th",{key:e},[t._v(t._s(e))])})),0)]),t._v(" "),a("tbody",t._l(t.rowsCount,(function(e){return a("tr",{key:e},t._l(7,(function(n){return a("td",{key:n},[a("div",{staticClass:"mg-evt-calendar-td",class:{"mg-evt-calendar-today":t.days[n-1+7*(e-1)].today,"mg-evt-calendar-event":t.days[n-1+7*(e-1)].eData,active:t.activeDay&&t.activeDay==t.days[n-1+7*(e-1)].date},on:{click:function(a){t.dayClick(t.days[n-1+7*(e-1)])}}},[a("span",{staticClass:"mg-evt-cal-day"},[t._v(t._s(t.days[n-1+7*(e-1)].day))]),t._v(" "),t._t("default",null,{evtData:t.days[n-1+7*(e-1)].eData})],2)])})),0)})),0)])])])])};l._withStripped=!0;var u=a(517);function d(t){return t.toString().length<2?"0"+t:t}function v(t,e){var a=(t=u.a.str2Date(t)).getFullYear(),n=t.getMonth()+e;return new Date(a,n,1)}var h={name:"mg-evt-calendar",props:{offset:Number,eventsData:{type:Object,default:{month:u.a.F(new Date,"yyyy-MM"),data:[]}}},watch:{eventsData:{handler:function(t){var e=t.month;this.currentMonth=e,this.currentDate=new Date(e),this.days=this.createDays(this.currentDate)},deep:!0}},data:function(){return{weeks:["日","一","二","三","四","五","六"],activeDay:"",currentDate:new Date,days:this.createDays(),currentMonth:u.a.F(new Date,"yyyy-MM")}},computed:{rowsCount:function(){return Math.ceil(this.days.length/7)}},methods:{prev:function(){this.currentDate=v(this.currentDate,-1),this.currentMonth=u.a.F(this.currentDate,"yyyy-MM"),this.days=this.createDays(this.currentDate),this.monthClick()},next:function(){this.currentDate=v(this.currentDate,1),this.currentMonth=u.a.F(this.currentDate,"yyyy-MM"),this.days=this.createDays(this.currentDate),this.monthClick()},createDays:function(t){for(var e=u.a.str2Date(t)||new Date,a=e.getFullYear(),n=e.getMonth(),i=new Date(a,n,1).getDay(),r=new Date(a,n+1,0).getDate(),s=(new Date,[]),o=[],c=this.eventsData.data;i--;)s.push(0);for(var l=1;l<=r;l++)s.push(l);var v=Math.ceil(s.length/7);for(l=0;l<v;l++)for(var h=0;h<=6;h++){var g=s[h+7*l]||"",m=(t=g?a+"-"+d(n+1)+"-"+d(g):"",!1),p="";g&&(m=1*new Date(a,n,g)-u.a.midnightMill()==0),c.length&&c.forEach((function(e){t==e.date&&(p=e.event)})),o.push({day:g,date:t,today:m,eData:p})}return o},dayClick:function(t){this.activeDay=t.date,this.$emit("on-day-click",t)},monthClick:function(){this.activeDay="",this.$emit("on-month-click",this.currentMonth)}},mounted:function(){}},g=(a(1056),a(1)),m=Object(g.a)(h,l,[],!1,null,null,null);m.options.__file="src/components/mg-calendar-event.vue";var p=m.exports;i.default.use(r.a);var f={components:{mgTab:s.a,mgEvtCalendar:p},data:function(){return{eventsData:{month:"",data:[]},activeTreeId:"",treeData:[],tabs:[{label:"定时抓拍",value:"timer"},{label:"报警抓拍",value:"alarm"}],activeTab:["timer"],activeDay:"",activeMonth:o.a.F(new Date,"yyyy-MM"),loading:!1,listData:[],total:0,params:{videoId:"",date:o.a.F(new Date,"yyyy-MM-dd"),type:"timer",currentPage:1,pageSize:10}}},mounted:function(){this.getProcessTree(this.$route.params.id),o.a.setTreeLeftHeight()},methods:{thumbClick:function(t,e){this.noTreeIdTip()||(this.activeDay=this.params.date=e.thumbdt,this.activeTab=[t],this.params.type=t,this.params.currentPage=1,this.params.videoId=this.activeTreeId,this.getThumbData(),"alarm"==t&&this.setAlarmIsRead())},monthClick:function(t){this.noTreeIdTip()||(this.activeMonth=t,this.getAlarmDataMonth())},getProcessTree:function(t){var e=this;this.$http.get(c.a.getVideoTree,{takeThumb:"Y"}).then((function(a){t&&(o.a.setTreeExpand(a.items,t),e.activeTreeId=t,e.getAlarmDataMonth());var n=a.items,i=o.a.getItemAndParentsByTypeId(n,!0);e.treeData=0==a.items.length?[]:o.a.transDataToTree(i.map((function(t){return t.expand=!0,t})))}))},renderContent:function(t,e){var a,n=this,i=(e.root,e.node,e.data);return 9==i.type&&(a=t("Icon",{style:{color:this.activeTreeId==i.id?"#999":"#4b7efe",fontSize:"20px"},props:{type:"camera"}},[])),t("div",{class:{"c-tree-row":!0}},[a||"",t("span",{class:{"ivu-tree-title":"9"==i.type,"ivu-tree-title-selected":this.activeTreeId==i.id.replace("video_","")},attrs:{title:i.name},on:{click:function(){9==i.type&&(n.activeTreeId=i.id.replace("video_",""),n.activeMonth=o.a.F(new Date,"yyyy-MM"),n.$refs.evtCalendar.activeDay="",n.getAlarmDataMonth())}}},[i.title])])},getAlarmDataMonth:function(t){var e=this;this.listData=[],this.total=0,this.activeDay="",this.$http.get(c.a.getAlarmDataMonth,{videoId:this.activeTreeId,month:this.activeMonth}).then((function(t){var a=t.map((function(t){return{date:t.thumbdt,event:t}}));e.eventsData.month=e.activeMonth,e.eventsData.data=a}))},tabChange:function(){this.noTreeIdTip()||(this.params.type=this.activeTab[0],this.params.currentPage=1,this.activeDay&&(this.getThumbData(),"alarm"==this.activeTab[0]&&this.setAlarmIsRead()))},pageChange:function(t){this.params.currentPage=t,this.getThumbData()},getThumbData:function(){var t=this;this.loading=!0,this.$http.get(c.a.getVideoThumbByType,this.params).then((function(e){t.loading=!1,t.listData=e.items||[],t.total=e.total})).catch((function(){t.loading=!1}))},getAlarmIsRead:function(){this.$http.get(c.a.getAlarmThumbIsread,{videoId:this.activeTreeId,date:this.activeDay}).then((function(t){}))},setAlarmIsRead:function(){var t=this;this.$http.patch(c.a.setIsRead,{videoId:Number(this.activeTreeId),date:this.activeDay}).then((function(e){t.eventsData.data.forEach((function(e){e.date==t.activeDay&&(e.event.read=!0)}))}))},noTreeIdTip:function(){if(!this.activeTreeId)return this.$Notice.info({title:"请先选择一个区域位置"}),!0},back:function(){this.$router.back()}}},y=(a(1058),Object(g.a)(f,n,[],!1,null,null,null));y.options.__file="src/views/monitor-screen/capture.vue";e.default=y.exports},516:function(t,e,a){var n=a(526);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("5a7c571a",n,!1,{})},517:function(t,e,a){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i={F:function(t,e){if(!t)return"";"object"!=n(t)&&(t=new Date(t)),e=e||"yyyy-MM-dd";var a=t.getFullYear().toString(),i={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var r in e=e.replace(/(y+)/gi,(function(t,e){return a.substr(4-Math.min(4,e.length))})),i)e=e.replace(new RegExp("("+r+"+)","g"),(function(t,e){return i[r]<10&&e.length>1?"0"+i[r]:i[r]}));return e},str2Date:function(t){if(t)return"object"!=n(t)?new Date(t):t},firstDayByWeek:function(t){var e=i.str2Date(t)||new Date,a=e.getDay(),n=(0==a?7:a)-1;return i.midnight(new Date(e.getTime()-24*n*60*60*1e3))},firstDayByMonth:function(t){var e=i.str2Date(t)||new Date;return i.midnight(new Date(e.getFullYear(),e.getMonth(),1))},firstDayByYear:function(t){var e=i.str2Date(t)||new Date;return i.midnight(new Date(e.getFullYear(),0,1))},countDateByStep:function(t,e,a,n){t=i.formatePolyfill(t);var r,s=i.str2Date(t)||new Date(t),o=s.getTime(),c=(new Date).getTime();switch(a){case"day":r=o+864e5*e;break;case"week":r=o+6048e5*e;break;case"month":r=new Date(s.getFullYear(),s.getMonth()+e,s.getDate()).getTime(),n&&(r=new Date(s.getFullYear(),s.getMonth()+e,s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()).getTime());break;case"year":r=new Date(s.getFullYear()+e,s.getMonth(),s.getDate()).getTime(),n&&(r=new Date(s.getFullYear()+e,s.getMonth(),s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()).getTime())}return r>c&&(r=c),n?r:i.midnight(r)},midnight:function(t){return t?i.F(t)+" 00:00:00":""},beforeMidnight:function(t){return t?i.F(t)+" 23:59:59":""},midnightMill:function(t){var e=i.str2Date(t)||new Date;return new Date(i.midnight(e)).getTime()},chain:function(t,e){return i.countDateByStep(t,-1,e)},yearOFyear:function(t){return i.countDateByStep(t,-1,"year")},getPeriods:function(t){var e,a=t.beginDate,n=new Date(i.formatePolyfill(a)),r=n.getTime();switch(t.cycle){case"day":e=r+864e5;break;case"week":e=r+6048e5;break;case"month":e=new Date(n.getFullYear(),n.getMonth()+1,n.getDate(),0,0,0).getTime();break;case"year":e=new Date(n.getFullYear()+1,n.getMonth(),n.getDate(),0,0,0).getTime()}return{min:r,max:new Date(e).getTime()}},formatePolyfill:function(t){return"string"!=typeof t?t:("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t)},getTerminalsByMonth:function(t,e){var a,n;return 0==e?(a=new Date(t,0,1,0,0,0),n=new Date(t,11,31,23,59,59)):(a=new Date(t,e-1,1,0,0,0),n=new Date(t,e,0,23,59,59)),{start:a,end:n}},transDateFromServer:function(t,e){return t?("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),i.F(t,e||"yyyy-MM-dd hh:mm")):""},transDateFromLocale:function(t){return t?("string"==typeof t&&(0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t=new Date(t)),t.toISOString()):""},strToData:function(t){var e=t.split(" ")[0].split("-"),a=[];return void 0!==t.split(" ")[1]&&(a=t.split(" ")[1].split(":")),new Date(e[0],e[1]-1,e[2],null!==a[0]?a[0]:0,null!==a[1]?a[1]:0,null!==a[2]?a[2]:0)}};e.a=i},524:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-tab",class:{"cmp-tab-underline":t.underline}},t._l(t.items,(function(e){return a("a",{key:e.value,class:{active:t.activeIds.indexOf(e.value)>-1},attrs:{href:"javascript:;"},on:{click:function(a){return t.selectTab(e)}}},[t._v(t._s(e.label))])})),0)};function i(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n._withStripped=!0;var r=null,s={name:"mgTab",props:{groups:Array,value:Array,multiple:{type:Boolean,default:!1},entire:{type:Boolean,default:!1},underline:Boolean},data:function(){return{activeIds:this.value,items:i(this.groups)}},watch:{groups:function(t){this.entire?this.items=[{label:"全部",value:r}].concat(i(t)):this.items=t},value:function(t){this.activeIds=t}},mounted:function(){this.entire&&this.items.unshift({label:"全部",value:r})},methods:{isSelected:function(t){return this.activeIds.indexOf(t)>-1},removeFromSelected:function(t){var e=this;this.activeIds.forEach((function(a,n){a==t&&e.activeIds.splice(n,1)}))},selectTab:function(t){this.entire&&t.value===r?this.activeIds=[r]:this.multiple?this.isSelected(t.value)?this.removeFromSelected(t.value):(this.activeIds.push(t.value),this.entire&&this.removeFromSelected(r)):(this.activeIds=[],this.activeIds.push(t.value)),this.$emit("input",this.activeIds),this.$emit("on-click",this.activeIds)},setValue:function(t){this.activeIds=t,this.$emit("input",this.activeIds)}}},o=(a(525),a(1)),c=Object(o.a)(s,n,[],!1,null,null,null);c.options.__file="src/components/mg-tab.vue";e.a=c.exports},525:function(t,e,a){"use strict";var n=a(516);a.n(n).a},526:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-tab {\r\n\tdisplay: inline-block;\n}\n.cmp-tab a {\r\n\tmargin-right: 20px;\t\r\n\tcolor: #576374;\n}\n.cmp-tab .active{\r\n\tcolor: #4B7EFE;\n}\n.cmp-tab-underline a {\r\n\tpadding: 2px 1px;\r\n\ttext-align: center;\n}\n.cmp-tab-underline .active  {\r\n\tborder-bottom: 2px solid #4B7EFE;\n}\r\n",""]),t.exports=e},542:function(t,e,a){"use strict";!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=" *[data-v-5928e1c7] { -webkit-box-sizing: border-box; box-sizing: border-box; } .fullscreen-v-img[data-v-5928e1c7] { z-index: 9999; height: 100%; width: 100%; position: fixed; top: 0; left: 0; overflow: hidden; background-color: rgba(0, 0, 0, 0.7); -ms-touch-action: none; touch-action: none; } .content-v-img img[data-v-5928e1c7] { width: auto; height: auto; max-width: 100%; max-height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .header-v-img[data-v-5928e1c7], .footer-v-img[data-v-5928e1c7] { position: absolute; width: 100%; background-color: rgba(0, 0, 0, 0.3); height: 50px; z-index: 9999; display: flex; align-items: center; } .header-v-img[data-v-5928e1c7] { justify-content: space-between; } .footer-v-img[data-v-5928e1c7] { bottom: 0; justify-content: center; height: 70px; /* scrolling thumbnails on mobile */ overflow-x: auto; } .footer-v-img img[data-v-5928e1c7] { width: 60px; height: 60px; cursor: pointer; -webkit-transition: transform 0.2s ease-out; transition: transform 0.2s ease-out; object-fit: cover; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .footer-v-img img.is-selected[data-v-5928e1c7] { transform: scale(1.1); } .footer-v-img img[data-v-5928e1c7]:not(:last-child) { margin-right: 7px; } .title-v-img[data-v-5928e1c7] { font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; color: white; text-align: center; max-height: 100%; overflow: auto; } .count-v-img[data-v-5928e1c7], .buttons-v-img[data-v-5928e1c7] { width: 80px; font-family: 'Avenir', Helvetica, Arial, sans-serif; } .count-v-img[data-v-5928e1c7] { font-size: 15px; color: white; margin-left: 10px; } .buttons-v-img[data-v-5928e1c7] { margin-right: 10px; text-align: right; } .buttons-v-img span path[data-v-5928e1c7] { fill: #e5e6eb; -webkit-transition: fill 0.4s ease-in-out; transition: fill 0.4s ease-in-out; } .buttons-v-img span[data-v-5928e1c7] { cursor: pointer; color: #e5e6eb; font-size: 30px; -webkit-transition: color 0.4s ease-in-out; transition: color 0.4s ease-in-out; text-decoration: none; text-align: center; } .buttons-v-img span[data-v-5928e1c7]:not(:last-child) { margin-right: 8px; } .buttons-v-img span svg[data-v-5928e1c7] { height: 20px; width: 15px; } .buttons-v-img span:hover svg path[data-v-5928e1c7] { fill: white; } .buttons-v-img span[data-v-5928e1c7]:hover { color: white; } .prev-v-img svg[data-v-5928e1c7], .next-v-img svg[data-v-5928e1c7] { margin: 5px auto; } .prev-v-img[data-v-5928e1c7], .next-v-img[data-v-5928e1c7] { color: white; width: 35px; height: 35px; position: absolute; top: 50%; margin-top: -12.5px; font-size: 15px; font-family: 'Avenir', Helvetica, Arial, sans-serif; text-align: center; background-color: rgba(0, 0, 0, 0.3); z-index: 1000; opacity: 0.3; -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; cursor: pointer; } .prev-v-img[data-v-5928e1c7]:hover, .next-v-img[data-v-5928e1c7]:hover { opacity: 1; } .prev-v-img[data-v-5928e1c7] { left: 10px; } .next-v-img[data-v-5928e1c7] { right: 10px; } .v-img-fade-enter[data-v-5928e1c7], .v-img-fade-leave-to[data-v-5928e1c7] { opacity: 0; } .v-img-fade-enter-active[data-v-5928e1c7], .v-img-fade-leave-active[data-v-5928e1c7] { -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}}();var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.closed?t._e():a("div",{staticClass:"fullscreen-v-img",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.close(e)}}},[a("div",{staticClass:"header-v-img"},[a("span",{staticClass:"count-v-img"},[t.images.length>1?a("span",[t._v(t._s(t.currentImageIndex+1)+"/"+t._s(t.images.length)+" ")]):t._e()]),a("span",{staticClass:"title-v-img"},[t._v(t._s(t.titles[t.currentImageIndex]))]),a("div",{staticClass:"buttons-v-img"},[t.sourceButtons[t.currentImageIndex]?a("span",[a("a",{attrs:{href:t.images[t.currentImageIndex],target:"_blank"}},[a("svg",{staticStyle:{"enable-background":"new 0 0 475.078 475.077"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",width:"512px",height:"512px",viewBox:"0 0 475.078 475.077","xml:space":"preserve"}},[a("path",{attrs:{d:"M467.083,318.627c-5.324-5.328-11.8-7.994-19.41-7.994H315.195l-38.828,38.827c-11.04,10.657-23.982,15.988-38.828,15.988    c-14.843,0-27.789-5.324-38.828-15.988l-38.543-38.827H27.408c-7.612,0-14.083,2.669-19.414,7.994    C2.664,323.955,0,330.427,0,338.044v91.358c0,7.614,2.664,14.085,7.994,19.414c5.33,5.328,11.801,7.99,19.414,7.99h420.266    c7.61,0,14.086-2.662,19.41-7.99c5.332-5.329,7.994-11.8,7.994-19.414v-91.358C475.078,330.427,472.416,323.955,467.083,318.627z     M360.025,414.841c-3.621,3.617-7.905,5.424-12.854,5.424s-9.227-1.807-12.847-5.424c-3.614-3.617-5.421-7.898-5.421-12.844    c0-4.948,1.807-9.236,5.421-12.847c3.62-3.62,7.898-5.431,12.847-5.431s9.232,1.811,12.854,5.431    c3.613,3.61,5.421,7.898,5.421,12.847C365.446,406.942,363.638,411.224,360.025,414.841z M433.109,414.841    c-3.614,3.617-7.898,5.424-12.848,5.424c-4.948,0-9.229-1.807-12.847-5.424c-3.613-3.617-5.42-7.898-5.42-12.844    c0-4.948,1.807-9.236,5.42-12.847c3.617-3.62,7.898-5.431,12.847-5.431c4.949,0,9.233,1.811,12.848,5.431    c3.617,3.61,5.427,7.898,5.427,12.847C438.536,406.942,436.729,411.224,433.109,414.841z",fill:"#FFFFFF"}}),a("path",{attrs:{d:"M224.692,323.479c3.428,3.613,7.71,5.421,12.847,5.421c5.141,0,9.418-1.808,12.847-5.421l127.907-127.908    c5.899-5.519,7.234-12.182,3.997-19.986c-3.23-7.421-8.847-11.132-16.844-11.136h-73.091V36.543c0-4.948-1.811-9.231-5.421-12.847    c-3.62-3.617-7.901-5.426-12.847-5.426h-73.096c-4.946,0-9.229,1.809-12.847,5.426c-3.615,3.616-5.424,7.898-5.424,12.847V164.45    h-73.089c-7.998,0-13.61,3.715-16.846,11.136c-3.234,7.801-1.903,14.467,3.999,19.986L224.692,323.479z",fill:"#FFFFFF"}})])])]):t._e(),a("span",{on:{click:t.close}},[t._v("×")])])]),a("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.visibleUI&&1!==t.images.length?a("span",{staticClass:"prev-v-img",on:{click:t.prev}},[a("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z",fill:"#fff"}})])]):t._e()]),a("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.visibleUI&&1!==t.images.length?a("span",{staticClass:"next-v-img",on:{click:t.next}},[a("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z",fill:"#fff"}})])]):t._e()]),t.thumbnails&&t.images.length>1?a("div",{staticClass:"footer-v-img"},t._l(t.images,(function(e,n){return a("img",{key:n,class:{"is-selected":t.currentImageIndex==n},attrs:{src:e},on:{click:function(e){t.select(n)}}})}))):t._e(),a("div",{staticClass:"content-v-img"},[a("img",{attrs:{src:t.images[t.currentImageIndex]},on:{click:t.next}})])],1)])},staticRenderFns:[],_scopeId:"data-v-5928e1c7",data:function(){return{images:[],titles:[],sourceButtons:[],visibleUI:!0,currentImageIndex:0,closed:!0,uiTimeout:null,handlers:{},thumbnails:!1}},watch:{closed:function(t){t&&this.handlers.closed&&this.handlers.closed(),!t&&this.handlers.opened&&this.handlers.opened()}},methods:{fireChangeEvent:function(){this.handlers.changed&&this.handlers.changed(this.currentImageIndex)},close:function(){this.closed||(document.querySelector("body").classList.remove("body-fs-v-img"),this.images=[],this.currentImageIndex=0,this.closed=!0)},next:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex+1<this.images.length?this.currentImageIndex++:this.currentImageIndex=0,this.fireChangeEvent())},select:function(t){this.currentImageIndex=t},prev:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex>0?this.currentImageIndex--:this.currentImageIndex=this.images.length-1,this.fireChangeEvent())},showUI:function(){var t=this;this.closed||(clearTimeout(this.uiTimeout),this.visibleUI=!0,this.uiTimeout=setTimeout((function(){t.visibleUI=!1}),3500))}},created:function(){var t=this;window.addEventListener("keyup",(function(e){27!==e.keyCode&&81!==e.keyCode||t.close(),39!==e.keyCode&&76!==e.keyCode||t.next(),37!==e.keyCode&&72!==e.keyCode||t.prev()})),window.addEventListener("scroll",(function(){t.close()})),window.addEventListener("mousemove",(function(){t.showUI()}))}},i=(function(){function t(t){this.value=t}function e(e){function a(i,r){try{var s=e[i](r),o=s.value;o instanceof t?Promise.resolve(o.value).then((function(t){a("next",t)}),(function(t){a("throw",t)})):n(s.done?"return":"normal",s.value)}catch(t){n("throw",t)}}function n(t,e){switch(t){case"return":i.resolve({value:e,done:!0});break;case"throw":i.reject(e);break;default:i.resolve({value:e,done:!1})}(i=i.next)?a(i.key,i.arg):r=null}var i,r;this._invoke=function(t,e){return new Promise((function(n,s){var o={key:t,arg:e,resolve:n,reject:s,next:null};r?r=r.next=o:(i=r=o,a(t,e))}))},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}),r=function(t,e,a){var n="pointer",i=e.arg||null,r=void 0,s=void 0,o=t.src,c=void 0,l=void 0,u={};return a.altAsTitle&&(c=t.alt),r=a.openOn,s=a.sourceButton,l=a.thumbnails,void 0!==e.value&&(n=e.value.cursor||n,i=e.value.group||i,r=e.value.openOn||r,o=e.value.src||o,c=e.value.title||c,u.opened=e.value.opened,u.closed=e.value.closed,u.changed=e.value.changed,void 0!==e.value.sourceButton&&(s=e.value.sourceButton),void 0!==e.value.thumbnails&&(l=e.value.thumbnails)),t.setAttribute("data-vue-img-src",o),i&&t.setAttribute("data-vue-img-group",i),c&&t.setAttribute("data-vue-img-title",c),s&&t.setAttribute("data-vue-img-source-button",s),l&&t.setAttribute("data-vue-img-thumbnails",l),o||console.error("v-img element missing src parameter."),t.style.cursor=n,{cursor:n,src:o,group:i,title:c,events:u,sourceButton:s,openOn:r,thumbnails:l}},s=function(t,e){var a=t.extend(n);e=i({altAsTitle:!1,sourceButton:!1,thumbnails:!1,openOn:"click"},e),t.directive("img",{update:function(t,a,n,i){var s=void 0,o=void 0;i.data.attrs&&n.data.attrs&&(o=i.data.attrs.src!==n.data.attrs.src,e.altAsTitle&&(s=i.data.attrs.alt!==n.data.attrs.alt));var c=a.oldValue!==a.value;(o||s||c)&&r(t,a,e)},bind:function(n,i){var s=r(n,i,e),o=window.vueImg;if(!o){var c=document.createElement("div");c.setAttribute("id","imageScreen"),document.querySelector("body").appendChild(c),o=window.vueImg=(new a).$mount("#imageScreen")}n.addEventListener(s.openOn,(function(){var e=void 0;e=n.dataset.vueImgGroup?[].concat(function(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}(document.querySelectorAll('img[data-vue-img-group="'+n.dataset.vueImgGroup+'"]'))):[n],t.set(o,"images",e.map((function(t){return t.dataset.vueImgSrc}))),t.set(o,"titles",e.map((function(t){return t.dataset.vueImgTitle}))),t.set(o,"sourceButtons",e.map((function(t){return"true"===t.dataset.vueImgSourceButton}))),t.set(o,"thumbnails","true"===n.dataset.vueImgThumbnails),t.set(o,"currentImageIndex",e.indexOf(n)),t.set(o,"handlers",s.events),t.set(o,"closed",!1)}))}})};"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),e.a=s},576:function(t,e,a){"use strict";a(22);e.a={getVideoList:"/loong/api/videos",getVideo:"/loong/api/videos/",saveVideo:"/loong/api/videos",delVideo:"/loong/api/videos",getVideoTree:"/loong/api/videos/tree",getVideoThumbByType:"/loong/api/thumbs",getAlarmThumbIsread:"/loong/api/thumbs/count",setIsRead:"/loong/api/thumbs",getAlarmDataMonth:"/loong/api/thumbs/count"}},751:function(t,e,a){var n=a(1057);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("e2729284",n,!1,{})},752:function(t,e,a){var n=a(1059);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("3ca04320",n,!1,{})}}]);