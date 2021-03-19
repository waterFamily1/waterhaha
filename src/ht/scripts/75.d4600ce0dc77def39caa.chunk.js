(window.webpackJsonp=window.webpackJsonp||[]).push([[75],{1207:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fault c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("div",{staticClass:"c-search-main"},[a("div",{staticClass:"c-form-item"},[a("label",[e._v("关键字：")]),e._v(" "),a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"入库单号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.searchParams.queryName,callback:function(t){e.$set(e.searchParams,"queryName",t)},expression:"searchParams.queryName"}})],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[e._v("所属组织：")]),e._v(" "),a("dropdown-tree",{attrs:{url:e.orgTreeApi,multiple:!0,width:300},model:{value:e.org,callback:function(t){e.org=t},expression:"org"}})],1),e._v(" "),a("div",{staticClass:"c-adv-search-btn"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){e.advSearch=!e.advSearch}}},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:!e.advSearch,expression:"!advSearch"}],attrs:{type:"ios-arrow-down"}}),a("Icon",{directives:[{name:"show",rawName:"v-show",value:e.advSearch,expression:"advSearch"}],attrs:{type:"ios-arrow-up"}}),e._v("高级搜索")],1),e._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),a("Button",{staticClass:"c-btn-reset",attrs:{type:"primary",shape:"circle"},on:{click:e.searchParamsClean}},[e._v("重置")])],1)]),e._v(" "),a("collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:e.advSearch,expression:"advSearch"}],staticClass:"c-adv-search"},[a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item c-form-item-tab"},[a("label",[e._v("审核状态：")]),e._v(" "),a("mg-tab",{attrs:{groups:e.auditState,multiple:!0,entire:!0},on:{"on-click":e.search},model:{value:e.states,callback:function(t){e.states=t},expression:"states"}})],1)]),e._v(" "),a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item c-form-item-tab"},[a("label",[e._v("入库仓库：")]),e._v(" "),a("Select",{staticStyle:{width:"200px"},model:{value:e.searchParams.warehouseNo,callback:function(t){e.$set(e.searchParams,"warehouseNo",t)},expression:"searchParams.warehouseNo"}},e._l(e.warehouseCombo,(function(t,n){return a("Option",{key:t.warehouseNo,attrs:{value:t.warehouseNo}},[e._v(e._s(t.warehouseName))])})),1)],1)]),e._v(" "),a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item"},[a("label",[e._v("入库时间：")]),e._v(" "),a("datepicker-ranger",{model:{value:e.dateRange,callback:function(t){e.dateRange=t},expression:"dateRange"}})],1)])])])],1),e._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{directives:[{name:"role",rawName:"v-role:multiple",value:"checkin-add",expression:"'checkin-add'",arg:"multiple"}],staticClass:"c-table-top-btns"},[a("Button",{directives:[{name:"role",rawName:"v-role",value:"checkin-add",expression:"'checkin-add'"}],staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle"},on:{click:e.toAddCheckIn}},[e._v("入库新增")])],1),e._v(" "),a("Table",{attrs:{columns:e.columns,data:e.listData,loading:e.loading,stripe:""}}),e._v(" "),a("Page",{staticClass:"table-page",attrs:{total:e.total,"page-size":e.searchParams.pageSize,current:e.searchParams.currentPage,"show-total":"","show-elevator":""},on:{"on-change":e.pageChange}})],1)])};n._withStripped=!0;var i=a(23),r=a(519),o=a(145),s=a(523),l=a(524),c=a(11),d=a(527),u=a(107),p={name:"storage-checkin",data:function(){var e=this;return{warehouseCombo:[],advSearch:!1,dateRange:{start:"",end:""},org:{id:"",title:"请选择"},states:[],searchParams:{queryName:"",orgIds:"",warehouseNo:"",audited:"",startDate:"",endDate:"",pageSize:10,currentPage:1},columns:[{title:"入库单号",key:"no"},{title:"所属组织",key:"orgName"},{title:"入库时间",key:"createDate",width:110,render:function(e,t){return c.a.tableDatetime(e,t.row.createDate)}},{title:"入库仓库",key:"warehouseName"},{title:"审核状态",key:"auditedFlag",render:function(t,a){return t("span",e.auditStateText[a.row.auditedFlag])}},{title:"操作",key:"act",width:200,render:function(t,a){var n=[c.a.tableBtnStyle(t,(function(){e.$router.push({name:"storage-checkin-detail",params:{id:a.row.id}})}),"查看")];return 0==a.row.auditedFlag&&n.push(c.a.tableBtnStyle(t,(function(){e.del(a.row.id)}),"删除","checkin-del")),t("div",n)}}],listData:[],loading:!1,total:0,orgTreeApi:u.a.getOrgTreeData}},computed:Object(i.b)({auditState:function(e){return e.map.storage.inventory.auditState},auditStateText:function(e){return e.map.storage.inventory.auditStateText}}),methods:{getList:function(){var e=this;this.loading=!0,this.$http.get(d.a.checkin.getInbond,this.searchParams).then((function(t){e.listData=t.items,e.total=t.total,e.loading=!1}))},search:function(){this.searchParams.audited=this.states.join()||"0,1",this.searchParams.startDate=this.dateRange.start,this.searchParams.endDate=this.dateRange.end,this.searchParams.orgIds=this.org.id,this.searchParams.currentPage=1,this.getList()},searchParamsClean:function(){this.org={id:"",title:"请选择"},this.dateRange={start:"",end:""},this.states=[];this.searchParams=Object.assign({},this.searchParams,{queryName:"",orgIds:"",warehouseNo:"",audited:"",startDate:"",endDate:"",pageSize:10,currentPage:1})},pageChange:function(e){this.searchParams.currentPage=e,this.getList()},del:function(e){var t=this;this.$Modal.confirm({title:"确认删除",content:"是否确认删除入库信息",onOk:function(){t.$http.del(d.a.checkin.delInbond,{ids:e}).then((function(e){t.$Notice.success({title:"成功",desc:"删除入库信息成功！"}),t.getList()}))}})},toAddCheckIn:function(){this.$router.push({name:"storage-checkin-add"})}},components:{dropdownTree:o.a,datepickerRanger:s.a,CollapseTransition:r.a,mgTab:l.a},created:function(){var e=this;c.a.initTableColumnTitle(this.columns),this.getList(),this.$http.get(d.a.getWarehouseComboList).then((function(t){e.warehouseCombo=t}))}},v=a(1),h=Object(v.a)(p,n,[],!1,null,null,null);h.options.__file="src/views/storage/checkin/list.vue";t.default=h.exports},515:function(e,t,a){var n=a(522);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(17).default)("43cd0b0e",n,!1,{})},516:function(e,t,a){var n=a(526);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(17).default)("5a7c571a",n,!1,{})},517:function(e,t,a){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i={F:function(e,t){if(!e)return"";"object"!=n(e)&&(e=new Date(e)),t=t||"yyyy-MM-dd";var a=e.getFullYear().toString(),i={M:e.getMonth()+1,d:e.getDate(),h:e.getHours(),m:e.getMinutes(),s:e.getSeconds()};for(var r in t=t.replace(/(y+)/gi,(function(e,t){return a.substr(4-Math.min(4,t.length))})),i)t=t.replace(new RegExp("("+r+"+)","g"),(function(e,t){return i[r]<10&&t.length>1?"0"+i[r]:i[r]}));return t},str2Date:function(e){if(e)return"object"!=n(e)?new Date(e):e},firstDayByWeek:function(e){var t=i.str2Date(e)||new Date,a=t.getDay(),n=(0==a?7:a)-1;return i.midnight(new Date(t.getTime()-24*n*60*60*1e3))},firstDayByMonth:function(e){var t=i.str2Date(e)||new Date;return i.midnight(new Date(t.getFullYear(),t.getMonth(),1))},firstDayByYear:function(e){var t=i.str2Date(e)||new Date;return i.midnight(new Date(t.getFullYear(),0,1))},countDateByStep:function(e,t,a,n){e=i.formatePolyfill(e);var r,o=i.str2Date(e)||new Date(e),s=o.getTime(),l=(new Date).getTime();switch(a){case"day":r=s+864e5*t;break;case"week":r=s+6048e5*t;break;case"month":r=new Date(o.getFullYear(),o.getMonth()+t,o.getDate()).getTime(),n&&(r=new Date(o.getFullYear(),o.getMonth()+t,o.getDate(),o.getHours(),o.getMinutes(),o.getSeconds()).getTime());break;case"year":r=new Date(o.getFullYear()+t,o.getMonth(),o.getDate()).getTime(),n&&(r=new Date(o.getFullYear()+t,o.getMonth(),o.getDate(),o.getHours(),o.getMinutes(),o.getSeconds()).getTime())}return r>l&&(r=l),n?r:i.midnight(r)},midnight:function(e){return e?i.F(e)+" 00:00:00":""},beforeMidnight:function(e){return e?i.F(e)+" 23:59:59":""},midnightMill:function(e){var t=i.str2Date(e)||new Date;return new Date(i.midnight(t)).getTime()},chain:function(e,t){return i.countDateByStep(e,-1,t)},yearOFyear:function(e){return i.countDateByStep(e,-1,"year")},getPeriods:function(e){var t,a=e.beginDate,n=new Date(i.formatePolyfill(a)),r=n.getTime();switch(e.cycle){case"day":t=r+864e5;break;case"week":t=r+6048e5;break;case"month":t=new Date(n.getFullYear(),n.getMonth()+1,n.getDate(),0,0,0).getTime();break;case"year":t=new Date(n.getFullYear()+1,n.getMonth(),n.getDate(),0,0,0).getTime()}return{min:r,max:new Date(t).getTime()}},formatePolyfill:function(e){return"string"!=typeof e?e:("string"==typeof e&&0==/[TZ]/.test(e)&&(e=e.replace(/-/g,"/")),e)},getTerminalsByMonth:function(e,t){var a,n;return 0==t?(a=new Date(e,0,1,0,0,0),n=new Date(e,11,31,23,59,59)):(a=new Date(e,t-1,1,0,0,0),n=new Date(e,t,0,23,59,59)),{start:a,end:n}},transDateFromServer:function(e,t){return e?("string"==typeof e&&0==/[TZ]/.test(e)&&(e=e.replace(/-/g,"/")),i.F(e,t||"yyyy-MM-dd hh:mm")):""},transDateFromLocale:function(e){return e?("string"==typeof e&&(0==/[TZ]/.test(e)&&(e=e.replace(/-/g,"/")),e=new Date(e)),e.toISOString()):""},strToData:function(e){var t=e.split(" ")[0].split("-"),a=[];return void 0!==e.split(" ")[1]&&(a=e.split(" ")[1].split(":")),new Date(t[0],t[1]-1,t[2],null!==a[0]?a[0]:0,null!==a[1]?a[1]:0,null!==a[2]?a[2]:0)}};t.a=i},519:function(e,t,a){"use strict";function n(e,t){if(!e||!t)return!1;if(-1!==t.indexOf(" "))throw new Error("className should not contain space.");return e.classList?e.classList.contains(t):(" "+e.className+" ").indexOf(" "+t+" ")>-1}function i(e,t){if(e){for(var a=e.className,i=(t||"").split(" "),r=0,o=i.length;r<o;r++){var s=i[r];s&&(e.classList?e.classList.add(s):n(e,s)||(a+=" "+s))}e.classList||(e.className=a)}}function r(e,t){if(e&&t){for(var a=t.split(" "),i=" "+e.className+" ",r=0,o=a.length;r<o;r++){var s=a[r];s&&(e.classList?e.classList.remove(s):n(e,s)&&(i=i.replace(" "+s+" "," ")))}e.classList||(e.className=trim(i))}}var o={beforeEnter:function(e){i(e,"collapse-transition"),e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.style.height="0",e.style.paddingTop=0,e.style.paddingBottom=0},enter:function(e){e.dataset.oldOverflow=e.style.overflow,0!==e.scrollHeight?(e.style.height=e.scrollHeight+"px",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom):(e.style.height="",e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom),e.style.overflow="hidden"},afterEnter:function(e){r(e,"collapse-transition"),e.style.height="",e.style.overflow=e.dataset.oldOverflow},beforeLeave:function(e){e.dataset||(e.dataset={}),e.dataset.oldPaddingTop=e.style.paddingTop,e.dataset.oldPaddingBottom=e.style.paddingBottom,e.dataset.oldOverflow=e.style.overflow,e.style.height=e.scrollHeight+"px",e.style.overflow="hidden"},leave:function(e){0!==e.scrollHeight&&(i(e,"collapse-transition"),e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0)},afterLeave:function(e){r(e,"collapse-transition"),e.style.height="",e.style.overflow=e.dataset.oldOverflow,e.style.paddingTop=e.dataset.oldPaddingTop,e.style.paddingBottom=e.dataset.oldPaddingBottom}};t.a={name:"CollapseTransition",functional:!0,render:function(e,t){var a=t.children;return e("transition",{on:o},a)}}},521:function(e,t,a){"use strict";var n=a(515);a.n(n).a},522:function(e,t,a){(t=a(10)(!1)).push([e.i,"\n.cmp-datepicker {\r\n\tdisplay: inline-block;\n}\r\n",""]),e.exports=t},523:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cmp-datepicker"},[a("DatePicker",{style:{width:e.width},attrs:{type:"date",placeholder:"开始日期",value:e.dateRange.start,disabled:e.disabled,options:e.startDateOptions},on:{"on-change":e.startDateChange}}),e._v(" "),a("span",[e._v(" - ")]),e._v(" "),a("DatePicker",{style:{width:e.width},attrs:{type:"date",placeholder:"结束日期",value:e.dateRange.end,disabled:e.disabled,options:e.endDateOptions},on:{"on-change":e.endDateChange}})],1)};n._withStripped=!0;var i=a(11),r=a(517),o={name:"datepickerRanger",props:{value:Object,width:String,disabled:{type:Boolean,default:!1},enabled:String},watch:{"value.start":function(e){this.dateRange.start=i.a.transDateFromServer(e,"yyyy-MM-dd")},"value.end":function(e){this.dateRange.end=i.a.transDateFromServer(e,"yyyy-MM-dd")}},data:function(){var e=this,t=r.a.midnightMill();return{dateRange:{start:i.a.transDateFromServer(this.value.start,"yyyy-MM-dd"),end:i.a.transDateFromServer(this.value.end,"yyyy-MM-dd")},startDateOptions:{disabledDate:function(a){return"coming"==e.enabled?a&&a.valueOf()<t:"halfYear"===e.enabled?a&&a.valueOf()<t-15552e6:e.dateRange.end&&a&&a.valueOf()>1*new Date(e.dateRange.end+" 23:59:59")}},endDateOptions:{disabledDate:function(a){var n=1*new Date(e.dateRange.start+" 00:00:00"),i=a&&a.valueOf();return"past"==e.enabled?a&&i>t:e.dateRange.start&&a&&i<n}}}},methods:{startDateChange:function(e){this.dateRange.start=e;var t=this.dateRange.start?i.a.transDateFromLocale(this.dateRange.start+" 00:00:00"):"",a=this.dateRange.end?i.a.transDateFromLocale(this.dateRange.end+" 23:59:59"):"";this.$emit("input",{start:t,end:a}),this.$emit("on-change",{start:t,end:a})},endDateChange:function(e){this.dateRange.end=e;var t=this.dateRange.start?i.a.transDateFromLocale(this.dateRange.start+" 00:00:00"):"",a=this.dateRange.end?i.a.transDateFromLocale(this.dateRange.end+" 23:59:59"):"";this.$emit("input",{start:t,end:a}),this.$emit("on-change",{start:t,end:a})}}},s=(a(521),a(1)),l=Object(s.a)(o,n,[],!1,null,null,null);l.options.__file="src/components/datepicker-ranger.vue";t.a=l.exports},524:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cmp-tab",class:{"cmp-tab-underline":e.underline}},e._l(e.items,(function(t){return a("a",{key:t.value,class:{active:e.activeIds.indexOf(t.value)>-1},attrs:{href:"javascript:;"},on:{click:function(a){return e.selectTab(t)}}},[e._v(e._s(t.label))])})),0)};function i(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n._withStripped=!0;var r=null,o={name:"mgTab",props:{groups:Array,value:Array,multiple:{type:Boolean,default:!1},entire:{type:Boolean,default:!1},underline:Boolean},data:function(){return{activeIds:this.value,items:i(this.groups)}},watch:{groups:function(e){this.entire?this.items=[{label:"全部",value:r}].concat(i(e)):this.items=e},value:function(e){this.activeIds=e}},mounted:function(){this.entire&&this.items.unshift({label:"全部",value:r})},methods:{isSelected:function(e){return this.activeIds.indexOf(e)>-1},removeFromSelected:function(e){var t=this;this.activeIds.forEach((function(a,n){a==e&&t.activeIds.splice(n,1)}))},selectTab:function(e){this.entire&&e.value===r?this.activeIds=[r]:this.multiple?this.isSelected(e.value)?this.removeFromSelected(e.value):(this.activeIds.push(e.value),this.entire&&this.removeFromSelected(r)):(this.activeIds=[],this.activeIds.push(e.value)),this.$emit("input",this.activeIds),this.$emit("on-click",this.activeIds)},setValue:function(e){this.activeIds=e,this.$emit("input",this.activeIds)}}},s=(a(525),a(1)),l=Object(s.a)(o,n,[],!1,null,null,null);l.options.__file="src/components/mg-tab.vue";t.a=l.exports},525:function(e,t,a){"use strict";var n=a(516);a.n(n).a},526:function(e,t,a){(t=a(10)(!1)).push([e.i,"\n.cmp-tab {\r\n\tdisplay: inline-block;\n}\n.cmp-tab a {\r\n\tmargin-right: 20px;\t\r\n\tcolor: #576374;\n}\n.cmp-tab .active{\r\n\tcolor: #4B7EFE;\n}\n.cmp-tab-underline a {\r\n\tpadding: 2px 1px;\r\n\ttext-align: center;\n}\n.cmp-tab-underline .active  {\r\n\tborder-bottom: 2px solid #4B7EFE;\n}\r\n",""]),e.exports=t},527:function(e,t,a){"use strict";var n=a(22),i={getWarehouseComboList:"/inventory/api/warehouse/comboList",getManaginguser:"/inventory/api/users/managinguser",category:{getTree:"/inventory/api/materiel-category/tree",getInfo:"/inventory/api/materiel-category/materiel",add:"/inventory/api/materiel-category/materiel",edit:"/inventory/api/materiel-category/materiel",del:"/inventory/api/materiel-category/materiel",search:"/inventory/api/materiel-category/list"},inventory:{audit:"/inventory/api/store-adjustment/audited",export:n.a+"/inventory/api/store-adjustment/export",url:"/inventory/api/store-adjustment/adjusment",list:"/inventory/api/store-adjustment/list",detailList:"/inventory/api/store-adjustment/detail/list",itemList:"/inventory/api/store-adjustment/materiel/list",move:"/inventory/api/store-adjustment/move",materielSearch:"/inventory/api/stock/materiel",materielPosition:"/inventory/api/stock/position",materielDepot:"/inventory/api/stock/warehous"},takeStock:{audit:"/inventory/api/materiel-inventory/audited",export:n.a+"/inventory/api/materiel-inventory/export",import:n.a+"/inventory/api/materiel-inventory/import",url:"/inventory/api/materiel-inventory/inventory",detailList:"/inventory/api/materiel-inventory/detail/list",list:"/inventory/api/materiel-inventory/list"},storage:{comboList:"/inventory/api/warehouse/comboList"},material:{getMaterielCategoryTree:"/inventory/api/materiel-category/tree/external",getMateriel:"/inventory/api/materiels",delMateriel:"/inventory/api/materiels",exportMateriel:n.a+"/inventory/api/materiels/excel-export",addMateriel:"/inventory/api/materiel",changeMateriel:"/inventory/api/materiel",getMaterielDetail:"/inventory/api/materiel",getDistribution:"/inventory/api/materielStocks/distribution",getMaterielStockLimits:"/inventory/api/materielStockLimits",bacthAddMaterielStockLimit:"/inventory/api/materielStockLimit/batch-save",updateMaterielStockLimit:"/inventory/api/materielStockLimit",delMaterielStockLimit:"/inventory/api/materielStockLimits",getUnitList:"/inventory/api/materiel/unit",modalMateriel:"/inventory/api/materiel/external",getExcel:n.a+"/inventory/api/excel-temlate-down",importExcel:n.a+"/inventory/api/excel-import",cancelExcelData:"/inventory/api/excel-data-cancel",saveExcelData:"/inventory/api/excel-data-save"},repertory:{getWarehouses:"/inventory/api/warehouses",exportWarehouse:n.a+"/inventory/api/warehouse/excel-export",delWarehouses:"/inventory/api/warehouses",changeWarehouses:"/inventory/api/warehouse",addWarehouse:"/inventory/api/warehouse",getWarehouseDetail:"/inventory/api/warehouse",getWarehouseInfo:"/inventory/api/warehouse/getWarehouseInfo",getPositionOfWarehouse:"/inventory/api/warehousePosition/positionList",bacthAddWarehouseposition:"/inventory/api/warehouseposition/batch-save",updateWarehousePosition:"/inventory/api/warehousePosition",delWarehousePosition:"/inventory/api/warehousePositions",positionByWarehouse:"/inventory/api/warehousePosition/move",checkWarehousenameIsExist:"/inventory/api/warehouse/check-warehousename-isexist",getExcel:n.a+"/inventory/api/warehousePosition/excel-temlate-down",importExcel:n.a+"/inventory/api/warehousePosition/excel-import",cancelExcelData:"/inventory/api/warehousePosition/excel-data-cancel",saveExcelData:"/inventory/api/warehousePosition/excel-data-save"},checkin:{getInbond:"/inventory/api/inbounds",delInbond:"/inventory/api/inbounds",addInbond:"/inventory/api/inbound",getInbondDetail:"/inventory/api/inbound",getInbondRecordList:"/inventory/api/inbound/inboundDetails",getPositionComboxList:"/inventory/api/warehousePosition/positionComboxList",auditeInbound:"/inventory/api/inbound/audite",getMaterielsByWareHouseNo:"/inventory/api/materiel/getMaterielsByWareHouseNo",getMateriels:"/inventory/api/materiel/getMateriels",updateInboundDetail:"/inventory/api/inboundDetail"},checkout:{getApplicantMember:"/uaa/api/users/select",getOutbond:"/inventory/api/outbounds",delOutbond:"/inventory/api/outbounds",addOutbond:"/inventory/api/outbound",getOutbondDetail:"/inventory/api/outbound",getOutbondRecordList:"/inventory/api/outboundDetail",auditeOutbound:"/inventory/api/outbound/audite",updateOutboundDetail:"/inventory/api/outboundDetail",getstock:"/inventory/api/stock/getstock",getMaterielsOutBound:"/inventory/api/materiel/getMaterielsOutBound"},allot:{getTransfer:"/inventory/api/transfer/list",delTransfer:"/inventory/api/transfer/transfer",addTransfer:"/inventory/api/transfer/transfer",getTransferDetail:"/inventory/api/transfer/transfer",getTransferDetailList:"/inventory/api/transfer/detail/list",auditTransfer:"/inventory/api/transfer/audited",updateTransfer:"/inventory/api/transfer/transfer",getMaterielList:"/inventory/api/transfer/materiel/list",getStockPosiComboList:"/inventory/api/stock/position",getWarehousePosition:"/inventory/api/warehousePosition/move"},reporting:{getStockInfo:"/inventory/api/stock/getstock-info",exportStockInfo:n.a+"/inventory/api/stock/getstock-info-excel-export",getStockInoutbound:"/inventory/api/stock/getstock-info-inoutbound",exportStockInoutbound:n.a+"/inventory/api/stock/getstock-info-inoutbound-excel-export",getStockMove:"/inventory/api/stock/get-inventory-mobility-report",exportStockMove:n.a+"/inventory/api/stock/get-inventory-mobility-report-excel-export",getInventoryProfitLossList:"/inventory/api/materiel-inventory/inventory-report",exportInventoryProfitLoss:n.a+"/inventory/api/materiel-inventory/inventory-report-export",getInventoryNumberList:"/inventory/api/materiel-inventory/inventory-report-inventory-number"}};t.a=i}}]);