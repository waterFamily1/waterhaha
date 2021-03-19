(window.webpackJsonp=window.webpackJsonp||[]).push([[72],{1151:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"repair c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("div",{staticClass:"c-search-main"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("关键字：")]),a("Input",{staticStyle:{width:"250px"},attrs:{placeholder:"故障设备"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.searchParams.queryName,callback:function(e){t.$set(t.searchParams,"queryName",e)},expression:"searchParams.queryName"}})],1),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("区域位置：")]),t._v(" "),a("dropdown-tree",{attrs:{url:t.processTreeApi,multiple:!0,width:200},model:{value:t.relProcess,callback:function(e){t.relProcess=e},expression:"relProcess"}})],1),t._v(" "),a("div",{staticClass:"c-adv-search-btn"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.advSearch=!t.advSearch}}},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:!t.advSearch,expression:"!advSearch"}],attrs:{type:"ios-arrow-down"}}),a("Icon",{directives:[{name:"show",rawName:"v-show",value:t.advSearch,expression:"advSearch"}],attrs:{type:"ios-arrow-up"}}),t._v("高级搜索")],1),t._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("Button",{staticClass:"c-btn-reset",attrs:{type:"primary",shape:"circle"},on:{click:t.searchParamsClean}},[t._v("重置")])],1)]),t._v(" "),a("collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.advSearch,expression:"advSearch"}],staticClass:"c-adv-search"},[a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("报修时间：")]),t._v(" "),a("datepicker-ranger",{model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1)]),t._v(" "),a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item c-form-item-tab"},[a("label",[t._v("状态：")]),t._v(" "),a("mg-tab",{attrs:{groups:t.maintainState,multiple:!0,entire:!0},on:{"on-click":t.search},model:{value:t.states,callback:function(e){t.states=e},expression:"states"}})],1)])])])],1),t._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("Table",{attrs:{columns:t.columns,data:t.listData,loading:t.loading,stripe:""}}),t._v(" "),a("Page",{staticClass:"table-page",attrs:{total:t.total,"page-size":t.searchParams.pageSize,current:t.searchParams.currentPage,"show-total":"","show-elevator":""},on:{"on-change":t.pageChange}})],1)])};n._withStripped=!0;var s=a(23),r=a(519),i=a(145),o=a(523),l=a(524),c=a(11),d=a(592),u=a(107),p={name:"repair",data:function(){var t=this;return{advSearch:!1,dateRange:{start:"",end:""},relProcess:{id:"",title:"请选择"},type:[],states:["0","1","2","5"],searchParams:{queryName:"",processIds:"",repairTypes:"",states:"0,1,2,5",startDate:"",endDate:"",pageSize:10,currentPage:1},columns:[{title:"故障设备",key:"equName"},{title:"维修编号",key:"repairNumber"},{title:"报修人",key:"createUserName"},{title:"报修时间",key:"createDate",width:110,render:function(t,e){return c.a.tableDatetime(t,e.row.createDate)}},{title:"完成时间",key:"finishTime",width:110,render:function(t,e){return c.a.tableDatetime(t,e.row.finishTime)}},{title:"区域位置",key:"processName"},{title:"当前状态",key:"stateName"},{title:"当前处理人",key:"processingPersonName"},{title:"操作",key:"act",render:function(e,a){return e("div",[c.a.tableBtnStyle(e,(function(){t.$router.push({name:"repair-detail",params:{id:a.row.id}})}),"查看")])}}],listData:[],loading:!1,total:0,processTreeApi:u.a.getProcessTreeData}},computed:Object(s.b)({maintainState:function(t){return t.map.maintain.state},maintainType:function(t){return t.map.maintain.type}}),methods:{getData:function(){var t=this;this.$setSearchParams((function(e){t.searchParams=e,t.states=t.searchParams.states?t.searchParams.states.split(","):[],t.dateRange.start=t.searchParams.startDate,t.dateRange.end=t.searchParams.endDate})),this.loading=!0,this.$http.get(d.a.getData,this.searchParams).then((function(e){t.listData=e.items,t.total=e.total,t.loading=!1}))},search:function(){this.searchParams.processIds=this.relProcess.id,this.searchParams.states=this.states.length?this.states.join():"",this.searchParams.startDate=this.dateRange.start,this.searchParams.endDate=this.dateRange.end,this.searchParams.currentPage=1,this.getData(),this.$addRouteFilter({routeName:"repair",searchParams:this.searchParams})},searchParamsClean:function(){this.relProcess={id:"",title:""},this.states=[],this.dateRange={start:"",end:""};this.searchParams=Object.assign({},this.searchParams,{queryName:"",processIds:"",repairTypes:"",states:"",startDate:"",endDate:"",pageSize:10,currentPage:1}),this.$cleanRouteFilter()},pageChange:function(t){this.searchParams.currentPage=t,this.getData(),this.$addRouteFilter({routeName:"repair",searchParams:this.searchParams})}},components:{dropdownTree:i.a,datepickerRanger:o.a,CollapseTransition:r.a,mgTab:l.a},created:function(){c.a.initTableColumnTitle(this.columns)},mounted:function(){this.getData()}},h=a(1),m=Object(h.a)(p,n,[],!1,null,null,null);m.options.__file="src/views/repair/list.vue";e.default=m.exports},515:function(t,e,a){var n=a(522);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("43cd0b0e",n,!1,{})},516:function(t,e,a){var n=a(526);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("5a7c571a",n,!1,{})},517:function(t,e,a){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s={F:function(t,e){if(!t)return"";"object"!=n(t)&&(t=new Date(t)),e=e||"yyyy-MM-dd";var a=t.getFullYear().toString(),s={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var r in e=e.replace(/(y+)/gi,(function(t,e){return a.substr(4-Math.min(4,e.length))})),s)e=e.replace(new RegExp("("+r+"+)","g"),(function(t,e){return s[r]<10&&e.length>1?"0"+s[r]:s[r]}));return e},str2Date:function(t){if(t)return"object"!=n(t)?new Date(t):t},firstDayByWeek:function(t){var e=s.str2Date(t)||new Date,a=e.getDay(),n=(0==a?7:a)-1;return s.midnight(new Date(e.getTime()-24*n*60*60*1e3))},firstDayByMonth:function(t){var e=s.str2Date(t)||new Date;return s.midnight(new Date(e.getFullYear(),e.getMonth(),1))},firstDayByYear:function(t){var e=s.str2Date(t)||new Date;return s.midnight(new Date(e.getFullYear(),0,1))},countDateByStep:function(t,e,a,n){t=s.formatePolyfill(t);var r,i=s.str2Date(t)||new Date(t),o=i.getTime(),l=(new Date).getTime();switch(a){case"day":r=o+864e5*e;break;case"week":r=o+6048e5*e;break;case"month":r=new Date(i.getFullYear(),i.getMonth()+e,i.getDate()).getTime(),n&&(r=new Date(i.getFullYear(),i.getMonth()+e,i.getDate(),i.getHours(),i.getMinutes(),i.getSeconds()).getTime());break;case"year":r=new Date(i.getFullYear()+e,i.getMonth(),i.getDate()).getTime(),n&&(r=new Date(i.getFullYear()+e,i.getMonth(),i.getDate(),i.getHours(),i.getMinutes(),i.getSeconds()).getTime())}return r>l&&(r=l),n?r:s.midnight(r)},midnight:function(t){return t?s.F(t)+" 00:00:00":""},beforeMidnight:function(t){return t?s.F(t)+" 23:59:59":""},midnightMill:function(t){var e=s.str2Date(t)||new Date;return new Date(s.midnight(e)).getTime()},chain:function(t,e){return s.countDateByStep(t,-1,e)},yearOFyear:function(t){return s.countDateByStep(t,-1,"year")},getPeriods:function(t){var e,a=t.beginDate,n=new Date(s.formatePolyfill(a)),r=n.getTime();switch(t.cycle){case"day":e=r+864e5;break;case"week":e=r+6048e5;break;case"month":e=new Date(n.getFullYear(),n.getMonth()+1,n.getDate(),0,0,0).getTime();break;case"year":e=new Date(n.getFullYear()+1,n.getMonth(),n.getDate(),0,0,0).getTime()}return{min:r,max:new Date(e).getTime()}},formatePolyfill:function(t){return"string"!=typeof t?t:("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t)},getTerminalsByMonth:function(t,e){var a,n;return 0==e?(a=new Date(t,0,1,0,0,0),n=new Date(t,11,31,23,59,59)):(a=new Date(t,e-1,1,0,0,0),n=new Date(t,e,0,23,59,59)),{start:a,end:n}},transDateFromServer:function(t,e){return t?("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),s.F(t,e||"yyyy-MM-dd hh:mm")):""},transDateFromLocale:function(t){return t?("string"==typeof t&&(0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t=new Date(t)),t.toISOString()):""},strToData:function(t){var e=t.split(" ")[0].split("-"),a=[];return void 0!==t.split(" ")[1]&&(a=t.split(" ")[1].split(":")),new Date(e[0],e[1]-1,e[2],null!==a[0]?a[0]:0,null!==a[1]?a[1]:0,null!==a[2]?a[2]:0)}};e.a=s},519:function(t,e,a){"use strict";function n(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function s(t,e){if(t){for(var a=t.className,s=(e||"").split(" "),r=0,i=s.length;r<i;r++){var o=s[r];o&&(t.classList?t.classList.add(o):n(t,o)||(a+=" "+o))}t.classList||(t.className=a)}}function r(t,e){if(t&&e){for(var a=e.split(" "),s=" "+t.className+" ",r=0,i=a.length;r<i;r++){var o=a[r];o&&(t.classList?t.classList.remove(o):n(t,o)&&(s=s.replace(" "+o+" "," ")))}t.classList||(t.className=trim(s))}}var i={beforeEnter:function(t){s(t,"collapse-transition"),t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0",t.style.paddingTop=0,t.style.paddingBottom=0},enter:function(t){t.dataset.oldOverflow=t.style.overflow,0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){r(t,"collapse-transition"),t.style.height="",t.style.overflow=t.dataset.oldOverflow},beforeLeave:function(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.height=t.scrollHeight+"px",t.style.overflow="hidden"},leave:function(t){0!==t.scrollHeight&&(s(t,"collapse-transition"),t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave:function(t){r(t,"collapse-transition"),t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}};e.a={name:"CollapseTransition",functional:!0,render:function(t,e){var a=e.children;return t("transition",{on:i},a)}}},521:function(t,e,a){"use strict";var n=a(515);a.n(n).a},522:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-datepicker {\r\n\tdisplay: inline-block;\n}\r\n",""]),t.exports=e},523:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-datepicker"},[a("DatePicker",{style:{width:t.width},attrs:{type:"date",placeholder:"开始日期",value:t.dateRange.start,disabled:t.disabled,options:t.startDateOptions},on:{"on-change":t.startDateChange}}),t._v(" "),a("span",[t._v(" - ")]),t._v(" "),a("DatePicker",{style:{width:t.width},attrs:{type:"date",placeholder:"结束日期",value:t.dateRange.end,disabled:t.disabled,options:t.endDateOptions},on:{"on-change":t.endDateChange}})],1)};n._withStripped=!0;var s=a(11),r=a(517),i={name:"datepickerRanger",props:{value:Object,width:String,disabled:{type:Boolean,default:!1},enabled:String},watch:{"value.start":function(t){this.dateRange.start=s.a.transDateFromServer(t,"yyyy-MM-dd")},"value.end":function(t){this.dateRange.end=s.a.transDateFromServer(t,"yyyy-MM-dd")}},data:function(){var t=this,e=r.a.midnightMill();return{dateRange:{start:s.a.transDateFromServer(this.value.start,"yyyy-MM-dd"),end:s.a.transDateFromServer(this.value.end,"yyyy-MM-dd")},startDateOptions:{disabledDate:function(a){return"coming"==t.enabled?a&&a.valueOf()<e:"halfYear"===t.enabled?a&&a.valueOf()<e-15552e6:t.dateRange.end&&a&&a.valueOf()>1*new Date(t.dateRange.end+" 23:59:59")}},endDateOptions:{disabledDate:function(a){var n=1*new Date(t.dateRange.start+" 00:00:00"),s=a&&a.valueOf();return"past"==t.enabled?a&&s>e:t.dateRange.start&&a&&s<n}}}},methods:{startDateChange:function(t){this.dateRange.start=t;var e=this.dateRange.start?s.a.transDateFromLocale(this.dateRange.start+" 00:00:00"):"",a=this.dateRange.end?s.a.transDateFromLocale(this.dateRange.end+" 23:59:59"):"";this.$emit("input",{start:e,end:a}),this.$emit("on-change",{start:e,end:a})},endDateChange:function(t){this.dateRange.end=t;var e=this.dateRange.start?s.a.transDateFromLocale(this.dateRange.start+" 00:00:00"):"",a=this.dateRange.end?s.a.transDateFromLocale(this.dateRange.end+" 23:59:59"):"";this.$emit("input",{start:e,end:a}),this.$emit("on-change",{start:e,end:a})}}},o=(a(521),a(1)),l=Object(o.a)(i,n,[],!1,null,null,null);l.options.__file="src/components/datepicker-ranger.vue";e.a=l.exports},524:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-tab",class:{"cmp-tab-underline":t.underline}},t._l(t.items,(function(e){return a("a",{key:e.value,class:{active:t.activeIds.indexOf(e.value)>-1},attrs:{href:"javascript:;"},on:{click:function(a){return t.selectTab(e)}}},[t._v(t._s(e.label))])})),0)};function s(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n._withStripped=!0;var r=null,i={name:"mgTab",props:{groups:Array,value:Array,multiple:{type:Boolean,default:!1},entire:{type:Boolean,default:!1},underline:Boolean},data:function(){return{activeIds:this.value,items:s(this.groups)}},watch:{groups:function(t){this.entire?this.items=[{label:"全部",value:r}].concat(s(t)):this.items=t},value:function(t){this.activeIds=t}},mounted:function(){this.entire&&this.items.unshift({label:"全部",value:r})},methods:{isSelected:function(t){return this.activeIds.indexOf(t)>-1},removeFromSelected:function(t){var e=this;this.activeIds.forEach((function(a,n){a==t&&e.activeIds.splice(n,1)}))},selectTab:function(t){this.entire&&t.value===r?this.activeIds=[r]:this.multiple?this.isSelected(t.value)?this.removeFromSelected(t.value):(this.activeIds.push(t.value),this.entire&&this.removeFromSelected(r)):(this.activeIds=[],this.activeIds.push(t.value)),this.$emit("input",this.activeIds),this.$emit("on-click",this.activeIds)},setValue:function(t){this.activeIds=t,this.$emit("input",this.activeIds)}}},o=(a(525),a(1)),l=Object(o.a)(i,n,[],!1,null,null,null);l.options.__file="src/components/mg-tab.vue";e.a=l.exports},525:function(t,e,a){"use strict";var n=a(516);a.n(n).a},526:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-tab {\r\n\tdisplay: inline-block;\n}\n.cmp-tab a {\r\n\tmargin-right: 20px;\t\r\n\tcolor: #576374;\n}\n.cmp-tab .active{\r\n\tcolor: #4B7EFE;\n}\n.cmp-tab-underline a {\r\n\tpadding: 2px 1px;\r\n\ttext-align: center;\n}\n.cmp-tab-underline .active  {\r\n\tborder-bottom: 2px solid #4B7EFE;\n}\r\n",""]),t.exports=e},592:function(t,e,a){"use strict";var n={getData:"/equipment/api/repairs",getMaintainDetail:"/equipment/api/repairs",taskAssign:"/equipment/api/repairs/assign",taskHandle:"/equipment/api/repairs/process",getRepairStatistics:"/equipment/api/repairs/statistics",export:a(22).a+"/equipment/api/repairs/statistics-export",getDataEqu:"/equipment/api/repairs/equ",getSpare:"/inventory/api/outbounds/web"};e.a=n}}]);