(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{1188:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"100%"}},[a("div",{staticClass:"c-main-border"},[a("Form",{ref:"searchParams",attrs:{model:t.searchParams},nativeOn:{submit:function(t){t.preventDefault()}}},[a("div",{staticClass:"c-left-border-blue"},[a("div",{staticClass:"c-search-main"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("关键字：")]),t._v(" "),a("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"录入名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.searchParams.queryName,callback:function(e){t.$set(t.searchParams,"queryName",e)},expression:"searchParams.queryName"}})],1),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("区域位置：")]),t._v(" "),a("dropdown-tree",{attrs:{url:t.treeApi.getProcessTreeData,width:200,multiple:!0},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}})],1),t._v(" "),a("div",{staticClass:"c-adv-search-btn"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.advSearch=!t.advSearch}}},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:!t.advSearch,expression:"!advSearch"}],attrs:{type:"ios-arrow-down"}}),t._v(" "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:t.advSearch,expression:"advSearch"}],attrs:{type:"ios-arrow-up"}}),t._v("高级搜索\n                        ")],1),t._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("Button",{staticClass:"c-btn-reset",attrs:{type:"primary",shape:"circle"},on:{click:function(e){return t.searchParamsClean("searchParams")}}},[t._v("重置")])],1)]),t._v(" "),a("collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.advSearch,expression:"advSearch"}],staticClass:"c-adv-search"},[a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("业务时间：")]),t._v(" "),a("datepicker-ranger",{model:{value:t.dateRange,callback:function(e){t.dateRange=e},expression:"dateRange"}})],1)])])])],1)]),t._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"c-table-top-btns"},[a("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle"},on:{click:t.add}},[t._v("新增")]),t._v(" "),a("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle"},on:{click:t.deleteConfirm}},[t._v("删除")])],1),t._v(" "),a("Table",{attrs:{columns:t.columns,data:t.listData,loading:t.loading,stripe:""},on:{"on-select-all":t.onSelect,"on-select":t.onSelect,"on-selection-change":t.onSelect}}),t._v(" "),a("Page",{staticClass:"table-page",attrs:{total:t.total,"page-size":t.searchParams.pageSize,current:t.searchParams.currentPage,"show-total":"","show-elevator":""},on:{"on-change":t.pageChange}})],1)],1)])};n._withStripped=!0;a(23);var i=a(519),r=a(524),s=a(11),o=a(533),l=a(107),c=a(145),d=a(523),u={name:"data-input-hour",data:function(){var t=this;return{treeApi:l.a,site:{id:"",title:"请选择"},advSearch:!1,cycleMap:[{label:"天",value:"D"},{label:"周",value:"W"},{label:"月",value:"M"},{label:"季度",value:"Q"},{label:"年",value:"Y"}],cycleId:[],dateRange:{start:"",end:""},searchParams:{siteId:null,queryName:"",beginDate:"",endDate:"",pageSize:10,currentPage:1},columns:[{type:"selection",width:50},{title:"区域位置",key:"siteName"},{title:"录入名称",key:"formName",render:function(t,e){return t("span",{attrs:{title:e.row.formName}},e.row.formName)}},{title:"录入周期",key:"cycleName"},{title:"最近业务时间",key:"formLatestdate",width:110,render:function(t,e){return s.a.tableDatetime(t,e.row.formLatestdate)}},{title:"最近录入时间",key:"updateTime",width:110,render:function(t,e){return s.a.tableDatetime(t,e.row.updateTime)}},{title:"操作",key:"action",width:230,render:function(e,a){return e("div",[s.a.tableBtnStyle(e,(function(){var e={};e.formId=a.row.id,e.cycleId=a.row.cycleId,e.recordDate=s.a.transDateFromLocale(s.a.F(new Date,"yyyy-MM-dd")+" 00:00:00"),t.$router.push({name:"data-input-hour-input",params:e})}),"录入数据"),s.a.tableBtnStyle(e,(function(){t.$router.push({name:"data-input-hour-history",params:{id:a.row.id,cycleId:a.row.cycleId}})}),"查看记录"),s.a.tableBtnStyle(e,(function(){t.$router.push({name:"data-input-hour-detail",params:{id:a.row.id}})}),"查看表单")])}}],listData:[],total:0,selected:[],loading:!1}},methods:{changeSelect:function(t){this.searchParams.siteId=t.map((function(t){return t.id})).join(),this.search()},getData:function(){var t=this;this.loading=!0;var e=o.a.getListData;e+="?type=hour",this.$http.get(e,this.searchParams).then((function(e){t.loading=!1,e&&e.total>=0&&(t.total=e.total,t.listData=e.items?e.items:[])}))},search:function(){this.searchParams.siteId=this.site.id,this.searchParams.siteName=this.site.title,this.searchParams.currentPage=1,this.searchParams.cycleId=this.cycleId.join(),this.searchParams.beginDate=this.dateRange.start,this.searchParams.endDate=this.dateRange.end,this.getData()},searchParamsClean:function(t){this.site.id="",this.site.title="",this.dateRange={start:"",end:""},this.searchParams={siteId:"",queryName:"",beginDate:"",endDate:"",pageSize:10,currentPage:1},this.$refs[t].resetFields()},pageChange:function(t){this.searchParams.currentPage=t,this.getData()},add:function(){this.$router.push({name:"data-input-hour-add"})},onSelect:function(t,e){this.selected=t},deleteConfirm:function(){if(0!=this.selected.length){for(var t=[],e=0;e<this.selected.length;e++)t.push(this.selected[e].id);this.deleteByIds(t.join(","))}else this.$Notice.warning({title:"警告",desc:"请选中后删除",duration:3})},deleteByIds:function(t){var e=this;this.$Modal.confirm({title:"提示",content:"<p>确定要删除？</p>",onOk:function(){e.$http.del(o.a.dataInputForm+"?ids="+t).then((function(t){t.count&&(e.$Notice.success({title:"成功",desc:"删除成功！",duration:3}),e.selected=[],e.search())}))},onCancel:function(){}})}},components:{CollapseTransition:i.a,dropdownTree:c.a,datepickerRanger:d.a,mgTab:r.a},watch:{dateRange:{handler:function(){this.search()},deep:!0}},created:function(){s.a.initTableColumnTitle(this.columns),this.search()}},h=a(1),p=Object(h.a)(u,n,[],!1,null,null,null);p.options.__file="src/views/data-input/hour/list.vue";e.default=p.exports},515:function(t,e,a){var n=a(522);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("43cd0b0e",n,!1,{})},516:function(t,e,a){var n=a(526);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("5a7c571a",n,!1,{})},517:function(t,e,a){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i={F:function(t,e){if(!t)return"";"object"!=n(t)&&(t=new Date(t)),e=e||"yyyy-MM-dd";var a=t.getFullYear().toString(),i={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var r in e=e.replace(/(y+)/gi,(function(t,e){return a.substr(4-Math.min(4,e.length))})),i)e=e.replace(new RegExp("("+r+"+)","g"),(function(t,e){return i[r]<10&&e.length>1?"0"+i[r]:i[r]}));return e},str2Date:function(t){if(t)return"object"!=n(t)?new Date(t):t},firstDayByWeek:function(t){var e=i.str2Date(t)||new Date,a=e.getDay(),n=(0==a?7:a)-1;return i.midnight(new Date(e.getTime()-24*n*60*60*1e3))},firstDayByMonth:function(t){var e=i.str2Date(t)||new Date;return i.midnight(new Date(e.getFullYear(),e.getMonth(),1))},firstDayByYear:function(t){var e=i.str2Date(t)||new Date;return i.midnight(new Date(e.getFullYear(),0,1))},countDateByStep:function(t,e,a,n){t=i.formatePolyfill(t);var r,s=i.str2Date(t)||new Date(t),o=s.getTime(),l=(new Date).getTime();switch(a){case"day":r=o+864e5*e;break;case"week":r=o+6048e5*e;break;case"month":r=new Date(s.getFullYear(),s.getMonth()+e,s.getDate()).getTime(),n&&(r=new Date(s.getFullYear(),s.getMonth()+e,s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()).getTime());break;case"year":r=new Date(s.getFullYear()+e,s.getMonth(),s.getDate()).getTime(),n&&(r=new Date(s.getFullYear()+e,s.getMonth(),s.getDate(),s.getHours(),s.getMinutes(),s.getSeconds()).getTime())}return r>l&&(r=l),n?r:i.midnight(r)},midnight:function(t){return t?i.F(t)+" 00:00:00":""},beforeMidnight:function(t){return t?i.F(t)+" 23:59:59":""},midnightMill:function(t){var e=i.str2Date(t)||new Date;return new Date(i.midnight(e)).getTime()},chain:function(t,e){return i.countDateByStep(t,-1,e)},yearOFyear:function(t){return i.countDateByStep(t,-1,"year")},getPeriods:function(t){var e,a=t.beginDate,n=new Date(i.formatePolyfill(a)),r=n.getTime();switch(t.cycle){case"day":e=r+864e5;break;case"week":e=r+6048e5;break;case"month":e=new Date(n.getFullYear(),n.getMonth()+1,n.getDate(),0,0,0).getTime();break;case"year":e=new Date(n.getFullYear()+1,n.getMonth(),n.getDate(),0,0,0).getTime()}return{min:r,max:new Date(e).getTime()}},formatePolyfill:function(t){return"string"!=typeof t?t:("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t)},getTerminalsByMonth:function(t,e){var a,n;return 0==e?(a=new Date(t,0,1,0,0,0),n=new Date(t,11,31,23,59,59)):(a=new Date(t,e-1,1,0,0,0),n=new Date(t,e,0,23,59,59)),{start:a,end:n}},transDateFromServer:function(t,e){return t?("string"==typeof t&&0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),i.F(t,e||"yyyy-MM-dd hh:mm")):""},transDateFromLocale:function(t){return t?("string"==typeof t&&(0==/[TZ]/.test(t)&&(t=t.replace(/-/g,"/")),t=new Date(t)),t.toISOString()):""},strToData:function(t){var e=t.split(" ")[0].split("-"),a=[];return void 0!==t.split(" ")[1]&&(a=t.split(" ")[1].split(":")),new Date(e[0],e[1]-1,e[2],null!==a[0]?a[0]:0,null!==a[1]?a[1]:0,null!==a[2]?a[2]:0)}};e.a=i},519:function(t,e,a){"use strict";function n(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function i(t,e){if(t){for(var a=t.className,i=(e||"").split(" "),r=0,s=i.length;r<s;r++){var o=i[r];o&&(t.classList?t.classList.add(o):n(t,o)||(a+=" "+o))}t.classList||(t.className=a)}}function r(t,e){if(t&&e){for(var a=e.split(" "),i=" "+t.className+" ",r=0,s=a.length;r<s;r++){var o=a[r];o&&(t.classList?t.classList.remove(o):n(t,o)&&(i=i.replace(" "+o+" "," ")))}t.classList||(t.className=trim(i))}}var s={beforeEnter:function(t){i(t,"collapse-transition"),t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0",t.style.paddingTop=0,t.style.paddingBottom=0},enter:function(t){t.dataset.oldOverflow=t.style.overflow,0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){r(t,"collapse-transition"),t.style.height="",t.style.overflow=t.dataset.oldOverflow},beforeLeave:function(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.height=t.scrollHeight+"px",t.style.overflow="hidden"},leave:function(t){0!==t.scrollHeight&&(i(t,"collapse-transition"),t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave:function(t){r(t,"collapse-transition"),t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}};e.a={name:"CollapseTransition",functional:!0,render:function(t,e){var a=e.children;return t("transition",{on:s},a)}}},521:function(t,e,a){"use strict";var n=a(515);a.n(n).a},522:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-datepicker {\r\n\tdisplay: inline-block;\n}\r\n",""]),t.exports=e},523:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-datepicker"},[a("DatePicker",{style:{width:t.width},attrs:{type:"date",placeholder:"开始日期",value:t.dateRange.start,disabled:t.disabled,options:t.startDateOptions},on:{"on-change":t.startDateChange}}),t._v(" "),a("span",[t._v(" - ")]),t._v(" "),a("DatePicker",{style:{width:t.width},attrs:{type:"date",placeholder:"结束日期",value:t.dateRange.end,disabled:t.disabled,options:t.endDateOptions},on:{"on-change":t.endDateChange}})],1)};n._withStripped=!0;var i=a(11),r=a(517),s={name:"datepickerRanger",props:{value:Object,width:String,disabled:{type:Boolean,default:!1},enabled:String},watch:{"value.start":function(t){this.dateRange.start=i.a.transDateFromServer(t,"yyyy-MM-dd")},"value.end":function(t){this.dateRange.end=i.a.transDateFromServer(t,"yyyy-MM-dd")}},data:function(){var t=this,e=r.a.midnightMill();return{dateRange:{start:i.a.transDateFromServer(this.value.start,"yyyy-MM-dd"),end:i.a.transDateFromServer(this.value.end,"yyyy-MM-dd")},startDateOptions:{disabledDate:function(a){return"coming"==t.enabled?a&&a.valueOf()<e:"halfYear"===t.enabled?a&&a.valueOf()<e-15552e6:t.dateRange.end&&a&&a.valueOf()>1*new Date(t.dateRange.end+" 23:59:59")}},endDateOptions:{disabledDate:function(a){var n=1*new Date(t.dateRange.start+" 00:00:00"),i=a&&a.valueOf();return"past"==t.enabled?a&&i>e:t.dateRange.start&&a&&i<n}}}},methods:{startDateChange:function(t){this.dateRange.start=t;var e=this.dateRange.start?i.a.transDateFromLocale(this.dateRange.start+" 00:00:00"):"",a=this.dateRange.end?i.a.transDateFromLocale(this.dateRange.end+" 23:59:59"):"";this.$emit("input",{start:e,end:a}),this.$emit("on-change",{start:e,end:a})},endDateChange:function(t){this.dateRange.end=t;var e=this.dateRange.start?i.a.transDateFromLocale(this.dateRange.start+" 00:00:00"):"",a=this.dateRange.end?i.a.transDateFromLocale(this.dateRange.end+" 23:59:59"):"";this.$emit("input",{start:e,end:a}),this.$emit("on-change",{start:e,end:a})}}},o=(a(521),a(1)),l=Object(o.a)(s,n,[],!1,null,null,null);l.options.__file="src/components/datepicker-ranger.vue";e.a=l.exports},524:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-tab",class:{"cmp-tab-underline":t.underline}},t._l(t.items,(function(e){return a("a",{key:e.value,class:{active:t.activeIds.indexOf(e.value)>-1},attrs:{href:"javascript:;"},on:{click:function(a){return t.selectTab(e)}}},[t._v(t._s(e.label))])})),0)};function i(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n._withStripped=!0;var r=null,s={name:"mgTab",props:{groups:Array,value:Array,multiple:{type:Boolean,default:!1},entire:{type:Boolean,default:!1},underline:Boolean},data:function(){return{activeIds:this.value,items:i(this.groups)}},watch:{groups:function(t){this.entire?this.items=[{label:"全部",value:r}].concat(i(t)):this.items=t},value:function(t){this.activeIds=t}},mounted:function(){this.entire&&this.items.unshift({label:"全部",value:r})},methods:{isSelected:function(t){return this.activeIds.indexOf(t)>-1},removeFromSelected:function(t){var e=this;this.activeIds.forEach((function(a,n){a==t&&e.activeIds.splice(n,1)}))},selectTab:function(t){this.entire&&t.value===r?this.activeIds=[r]:this.multiple?this.isSelected(t.value)?this.removeFromSelected(t.value):(this.activeIds.push(t.value),this.entire&&this.removeFromSelected(r)):(this.activeIds=[],this.activeIds.push(t.value)),this.$emit("input",this.activeIds),this.$emit("on-click",this.activeIds)},setValue:function(t){this.activeIds=t,this.$emit("input",this.activeIds)}}},o=(a(525),a(1)),l=Object(o.a)(s,n,[],!1,null,null,null);l.options.__file="src/components/mg-tab.vue";e.a=l.exports},525:function(t,e,a){"use strict";var n=a(516);a.n(n).a},526:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-tab {\r\n\tdisplay: inline-block;\n}\n.cmp-tab a {\r\n\tmargin-right: 20px;\t\r\n\tcolor: #576374;\n}\n.cmp-tab .active{\r\n\tcolor: #4B7EFE;\n}\n.cmp-tab-underline a {\r\n\tpadding: 2px 1px;\r\n\ttext-align: center;\n}\n.cmp-tab-underline .active  {\r\n\tborder-bottom: 2px solid #4B7EFE;\n}\r\n",""]),t.exports=e},533:function(t,e,a){"use strict";var n=a(22),i={getListData:"/loong/api/datainput-forms",dataInputForm:"/loong/api/datainput-forms",mpointDataInput:"/loong/api/datainput-records/data",historyDatail:"/loong/api/datainput-records/data",history:"/loong/api/datainput-records",historyDelete:"/loong/api/datainput-records",getExcel:n.a+"/loong/api/datainput-mpoints/excel-temlate-down",importExcel:n.a+"/loong/api/datainput-mpoints/excel-import",saveExcelData:"/loong/api/datainput-mpoints/excel-data-save",cancelExcelData:"/loong/api/datainput-mpoints/excel-data-cancel"};e.a=i}}]);