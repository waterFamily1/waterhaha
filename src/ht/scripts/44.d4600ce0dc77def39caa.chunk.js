(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{1099:function(t,e,a){"use strict";var i=a(763);a.n(i).a},1100:function(t,e,a){var i=a(10),n=a(508);(e=i(!1)).i(n),e.push([t.i,"\n",""]),t.exports=e},1220:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"c-main-border point-list"},[a("div",{staticClass:"c-left-border-blue"},[a("div",{staticClass:"c-search-main"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("关键字：")]),t._v(" "),a("Input",{staticStyle:{width:"160px"},attrs:{placeholder:"测点名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.searchParams.queryName,callback:function(e){t.$set(t.searchParams,"queryName",e)},expression:"searchParams.queryName"}})],1),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("区域位置：")]),t._v(" "),a("dropdown-tree",{attrs:{url:t.treeApi.getProcessTreeData,width:200,multiple:!0},model:{value:t.site,callback:function(e){t.site=e},expression:"site"}})],1),t._v(" "),a("div",{staticClass:"c-adv-search-btn"},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){t.advSearch=!t.advSearch}}},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:!t.advSearch,expression:"!advSearch"}],attrs:{type:"ios-arrow-down"}}),t._v(" "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:t.advSearch,expression:"advSearch"}],attrs:{type:"ios-arrow-up"}}),t._v("高级搜索\n                ")],1),t._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("Button",{staticClass:"c-btn-reset",attrs:{type:"primary",shape:"circle"},on:{click:t.searchParamsClean}},[t._v("重置")])],1)]),t._v(" "),a("collapse-transition",[a("div",{directives:[{name:"show",rawName:"v-show",value:t.advSearch,expression:"advSearch"}],staticClass:"c-adv-search"},[a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("信号类型：")]),t._v(" "),a("mg-tab",{attrs:{groups:t.mpointType,multiple:!0,entire:!0},on:{"on-click":t.search},model:{value:t.datype,callback:function(e){t.datype=e},expression:"datype"}})],1)]),t._v(" "),a("div",{staticClass:"c-adv-search-row"},[a("div",{staticClass:"c-form-item c-form-item-tab"},[a("label",[t._v("数据分类：")]),t._v(" "),a("mg-tab",{attrs:{groups:t.mpointCategory,multiple:!0,entire:!0},on:{"on-click":t.search},model:{value:t.categoryId,callback:function(e){t.categoryId=e},expression:"categoryId"}})],1)])])])],1),t._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"c-table-top-btns"},[a("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle"},on:{click:t.addPoint}},[t._v("添加样本")])],1),t._v(" "),a("Table",{ref:"mpointTable",attrs:{columns:t.columns,data:t.listData,loading:t.loading,stripe:""}}),t._v(" "),a("Page",{staticClass:"table-page",attrs:{total:t.total,"page-size":t.searchParams.pageSize,current:t.searchParams.currentPage,"show-total":"","show-elevator":""},on:{"on-change":t.pageChange}})],1),t._v(" "),a("Modal",{attrs:{width:"600",title:"添加样本"},model:{value:t.pointsModalShown,callback:function(e){t.pointsModalShown=e},expression:"pointsModalShown"}},[a("mg-mpoint-table",{ref:"modalTable",attrs:{query:{confDataQuality:1,datasource:"AUTO"}},on:{"on-submit":t.onModalSelect,"on-cancel":t.onModalSelectCancel}}),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};i._withStripped=!0;var n=a(23),o=a(519),s=a(524),r=a(145),l=a(555),c=a(11),d=a(545),p=a(520),h=a(107),u={name:"data-quality-setting",components:{CollapseTransition:o.a,mgTab:s.a,dropdownTree:r.a,mgMpointTable:l.a},data:function(){var t=this;return{treeApi:h.a,advSearch:!1,datype:[],categoryId:[],mpointCategory:[],site:{id:"",title:"请选择"},searchParams:{queryName:"",datype:"",categoryId:"",pageSize:10,currentPage:1},columns:[{title:"测点名称",key:"mpointName"},{title:"区域位置",key:"siteName"},{title:"信号类型",key:"datype",width:90,render:function(t,e){return t("span",{class:["State"==e.row.datype?"mpoint-signal-state":"mpoint-signal-digital"],attrs:{title:"Digtal"==e.row.datype?"数值信号":"状态信号"}},"State"==e.row.datype?"D":"A")}},{title:"数据分类",key:"categoryName",width:100},{title:"推送周期",key:"period",width:100,render:function(t,e){return t("span",{attrs:{title:e.row.period?e.row.period+"s":""}},e.row.period?e.row.period+"s":"")}},{title:"所属设备",key:"equName"},{title:"配置时间",key:"updateTime",width:110,render:function(t,e){return c.a.tableDatetime(t,e.row.updateTime)}},{title:"操作",key:"act",align:"left",width:100,render:function(e,a){return e("div",[c.a.tableBtnStyle(e,(function(){t.$router.push({name:"data-quality-form",params:{id:a.row.id}})}),"配置"),c.a.tableBtnStyle(e,(function(){t.deletePoint(a.row.id)}),"删除")])}}],listData:[],loading:!1,total:0,pointsModalShown:!1}},computed:Object(n.b)({mpointType:function(t){return t.map.mpoint.type}}),created:function(){c.a.initTableColumnTitle(this.columns),this.getCategroyData(),this.getData()},methods:{getCategroyData:function(){var t=this;this.$http.get(p.a.getCategroyData).then((function(e){e&&(e.forEach((function(t){t.label=t.categoryName,t.value=String(t.id)})),t.mpointCategory=e)}))},getData:function(){var t=this;this.$setSearchParams((function(e){t.searchParams=e,t.site.id=t.searchParams.siteId,t.site.title=t.searchParams.siteName,t.datype=t.searchParams.datype?t.searchParams.datype.split(","):[],t.categoryId=t.searchParams.categoryId?t.searchParams.categoryId.split(","):[]})),this.loading=!0,this.$http.get(d.a.getList,this.searchParams).then((function(e){e.items&&(t.listData=e.items,t.total=e.total,t.loading=!1)}))},search:function(){this.searchParams.siteId=this.site.id,this.searchParams.siteName=this.site.title,this.searchParams.datype=this.datype.join(),this.searchParams.categoryId=this.categoryId.join(),this.searchParams.currentPage=1,this.getData(),this.$addRouteFilter({routeName:"data-quality-setting",searchParams:this.searchParams})},searchParamsClean:function(){this.site={id:"",title:"请选择"},this.datype=[],this.categoryId=[],this.searchParams=Object.assign({},this.searchParams,{queryName:"",datype:"",categoryId:"",pageSize:10,currentPage:1}),this.$cleanRouteFilter()},pageChange:function(t){this.searchParams.currentPage=t,this.getData(),this.$addRouteFilter({routeName:"data-quality-setting",searchParams:this.searchParams})},addPoint:function(){this.pointsModalShown=!0},deletePoint:function(t){var e=this;this.$Modal.confirm({title:"删除",content:"您确定要删除吗？",onOk:function(){e.$http.del(d.a.deleteConfig,{ids:t}).then((function(t){t.count&&(e.$Notice.success({title:"成功",desc:"删除成功！",duration:3}),e.getData())}))}})},onModalSelectCancel:function(t,e){this.pointsModalShown=!1},onModalSelect:function(t){var e=this,a=[];t.length?(t.forEach((function(t){a.push({mpointId:t.id})})),this.pointsModalShown=!1,this.$http.post(d.a.addConfig,a).then((function(t){t.id&&(e.$Notice.success({title:"成功",desc:"新增成功！",duration:3}),e.getData(),e.$refs.modalTable.cleanup(),e.$refs.modalTable.search())}))):this.$Notice.info({title:"请选择测点"})}}},m=(a(1099),a(1)),g=Object(m.a)(u,i,[],!1,null,null,null);g.options.__file="src/views/data-quality/list.vue";e.default=g.exports},516:function(t,e,a){var i=a(526);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a(17).default)("5a7c571a",i,!1,{})},518:function(t,e,a){var i=a(530);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a(17).default)("4411afe8",i,!1,{})},519:function(t,e,a){"use strict";function i(t,e){if(!t||!e)return!1;if(-1!==e.indexOf(" "))throw new Error("className should not contain space.");return t.classList?t.classList.contains(e):(" "+t.className+" ").indexOf(" "+e+" ")>-1}function n(t,e){if(t){for(var a=t.className,n=(e||"").split(" "),o=0,s=n.length;o<s;o++){var r=n[o];r&&(t.classList?t.classList.add(r):i(t,r)||(a+=" "+r))}t.classList||(t.className=a)}}function o(t,e){if(t&&e){for(var a=e.split(" "),n=" "+t.className+" ",o=0,s=a.length;o<s;o++){var r=a[o];r&&(t.classList?t.classList.remove(r):i(t,r)&&(n=n.replace(" "+r+" "," ")))}t.classList||(t.className=trim(n))}}var s={beforeEnter:function(t){n(t,"collapse-transition"),t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.style.height="0",t.style.paddingTop=0,t.style.paddingBottom=0},enter:function(t){t.dataset.oldOverflow=t.style.overflow,0!==t.scrollHeight?(t.style.height=t.scrollHeight+"px",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom):(t.style.height="",t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom),t.style.overflow="hidden"},afterEnter:function(t){o(t,"collapse-transition"),t.style.height="",t.style.overflow=t.dataset.oldOverflow},beforeLeave:function(t){t.dataset||(t.dataset={}),t.dataset.oldPaddingTop=t.style.paddingTop,t.dataset.oldPaddingBottom=t.style.paddingBottom,t.dataset.oldOverflow=t.style.overflow,t.style.height=t.scrollHeight+"px",t.style.overflow="hidden"},leave:function(t){0!==t.scrollHeight&&(n(t,"collapse-transition"),t.style.height=0,t.style.paddingTop=0,t.style.paddingBottom=0)},afterLeave:function(t){o(t,"collapse-transition"),t.style.height="",t.style.overflow=t.dataset.oldOverflow,t.style.paddingTop=t.dataset.oldPaddingTop,t.style.paddingBottom=t.dataset.oldPaddingBottom}};e.a={name:"CollapseTransition",functional:!0,render:function(t,e){var a=e.children;return t("transition",{on:s},a)}}},520:function(t,e,a){"use strict";var i=a(22),n={modalMpoints:"/loong/api/mpoints/dialog",alarmChart:"/loong/api/mpoints/alarm-condition",downloadTemplate:i.a+"/loong/api/mpoints/excel-template-download",exportTemplate:i.a+"/loong/api/mpoints/export",importExcel:i.a+"/loong/api/mpoints/import",saveExcelData:"/loong/api/mpoints/import-save",cancelExcelData:"/loong/api/mpoints/import-cancel",getCategroyData:"/loong/api/mpoints-datacategory",getMpointsList:"/loong/api/mpoints",deleteMpoints:"/loong/api/mpoints",deleteAllMpoints:"/loong/api/mpoints/all",batchSave:"/loong/api/mpoints/batch",autoMpoints:"/loong/api/mpoints-auto",datainputMpoints:"/loong/api/mpoints-datainput",taskMpoints:"/loong/api/mpoints-task",getCalcMpointDetail:"/loong/api/mpoints-calc",getCycle:"/loong/api/mpoints-calc-cycle",getAnalysisMpointDetail:"/loong/api/mpoints-analysis",getMpointNumByType:"/loong/api/mpoints/batch/all",getMpointDataImportList:"/loong/api/mpoint-data-imports",deleteMpointDataImport:"/loong/api/mpoint-data-imports",stopMpointDataImport:"/loong/api/mpoint-data-imports",pointDataImportTempleDownload:i.a+"/loong/api/mpoint-data-imports/templeDownload",pointDataImportFileUpload:i.a+"/loong/api/mpoint-data-imports/fileUpload"};e.a=n},524:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-tab",class:{"cmp-tab-underline":t.underline}},t._l(t.items,(function(e){return a("a",{key:e.value,class:{active:t.activeIds.indexOf(e.value)>-1},attrs:{href:"javascript:;"},on:{click:function(a){return t.selectTab(e)}}},[t._v(t._s(e.label))])})),0)};function n(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}i._withStripped=!0;var o=null,s={name:"mgTab",props:{groups:Array,value:Array,multiple:{type:Boolean,default:!1},entire:{type:Boolean,default:!1},underline:Boolean},data:function(){return{activeIds:this.value,items:n(this.groups)}},watch:{groups:function(t){this.entire?this.items=[{label:"全部",value:o}].concat(n(t)):this.items=t},value:function(t){this.activeIds=t}},mounted:function(){this.entire&&this.items.unshift({label:"全部",value:o})},methods:{isSelected:function(t){return this.activeIds.indexOf(t)>-1},removeFromSelected:function(t){var e=this;this.activeIds.forEach((function(a,i){a==t&&e.activeIds.splice(i,1)}))},selectTab:function(t){this.entire&&t.value===o?this.activeIds=[o]:this.multiple?this.isSelected(t.value)?this.removeFromSelected(t.value):(this.activeIds.push(t.value),this.entire&&this.removeFromSelected(o)):(this.activeIds=[],this.activeIds.push(t.value)),this.$emit("input",this.activeIds),this.$emit("on-click",this.activeIds)},setValue:function(t){this.activeIds=t,this.$emit("input",this.activeIds)}}},r=(a(525),a(1)),l=Object(r.a)(s,i,[],!1,null,null,null);l.options.__file="src/components/mg-tab.vue";e.a=l.exports},525:function(t,e,a){"use strict";var i=a(516);a.n(i).a},526:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-tab {\r\n\tdisplay: inline-block;\n}\n.cmp-tab a {\r\n\tmargin-right: 20px;\t\r\n\tcolor: #576374;\n}\n.cmp-tab .active{\r\n\tcolor: #4B7EFE;\n}\n.cmp-tab-underline a {\r\n\tpadding: 2px 1px;\r\n\ttext-align: center;\n}\n.cmp-tab-underline .active  {\r\n\tborder-bottom: 2px solid #4B7EFE;\n}\r\n",""]),t.exports=e},529:function(t,e,a){"use strict";var i=a(518);a.n(i).a},530:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-dropdown-tree {\r\n    display: inline-block;\r\n    position: relative;\r\n    vertical-align: middle;\r\n    line-height: normal;\n}\n.ivu-form-item-error .cmp-dropdown-tree-label {\r\n    border: 1px solid #ed3f14;\n}\n.ivu-form-item-error .cmp-dropdown-tree-arrow {\r\n    border-left: 1px solid #ed3f14;\n}\n.cmp-dropdown-tree-label {\r\n    height: 28px;\r\n    width: 100%;\r\n    border: 1px solid #eaeaea;\r\n    display: flex;\r\n    border-radius: 3px;\r\n    cursor: pointer;\n}\n.cmp-dropdown-tree-text {\r\n    line-height: 28px;\r\n    text-indent: 5px;\r\n    flex: 1;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\n}\n.cmp-dropdown-tree-arrow {\r\n    margin-top: -1px;\r\n    width: 28px;\r\n    height: 28px;\r\n    border-left: 1px solid #eaeaea;\r\n    text-align: center;\r\n    line-height: 28px;\n}\n.cmp-dropdown-tree .ivu-input-group-append {\r\n    width: 25px;\r\n    height: 28px;\r\n    overflow: hidden;\r\n    padding: 0;\n}\n.cmp-dropdown-tree .ivu-btn {\r\n    padding: 5px 10px;\n}\n.cmp-dropdown-tree-tree {\r\n    z-index: 901;\r\n    position: absolute;\r\n    top: 37px;\r\n    left: 0;\r\n    min-width: 300px;\r\n    max-height: 400px;\r\n    overflow: auto;\r\n    padding: 5px 10px;\r\n    background-color: #fff;\r\n    box-shadow: 1px 1px 5px #999;\r\n    border-radius: 3px;\n}\r\n",""]),t.exports=e},531:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.hideTree,expression:"hideTree"}],staticClass:"cmp-dropdown-tree",style:{width:t.width+"px"}},[a("div",{staticClass:"cmp-dropdown-tree-label",on:{click:t.labelClick}},[a("div",{staticClass:"cmp-dropdown-tree-text"},[t._v(t._s(t.value.title))]),t._v(" "),a("div",{staticClass:"cmp-dropdown-tree-arrow"},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:1!=t.isShowTree,expression:"isShowTree != true"}],attrs:{type:"ios-arrow-down"}}),t._v(" "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:1==t.isShowTree,expression:"isShowTree == true"}],attrs:{type:"ios-arrow-up"}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowTree,expression:"isShowTree"}],staticClass:"cmp-dropdown-tree-tree"},[a("Tree",{attrs:{data:t.datas,"show-checkbox":t.showCheckbox,multiple:t.multiple},on:{"on-select-change":t.selectTree}})],1)])};i._withStripped=!0;var n=a(11),o=a(146),s=a(147);function r(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(t){!function t(e){e.forEach((function(e,a){e.childrenIds=function t(e,a){a=a||[];return e.forEach((function(e){e.children.length&&t(e.children,a),a.push(Math.abs(e.id))})),a}(e.children),e.children.length&&t(e.children)}))}(t)}var c={name:"myProcessTreeAuthority",mixins:[o.a],props:{field:String,value:Object,data:Array,url:String,query:Object,showCheckbox:Boolean,multiple:Boolean,width:{type:[Number,String],default:300},type:String},watch:{"value.id":function(t){t?this.flatDatas.length&&(n.a.setTrueTreeExpand(this.datas,t),n.a.setTrueTreeSelected(this.datas,t)):(!function t(e){for(var a,i=e.length,n=0;n<i;n++)1==(a=e[n]).selected&&(a.selected=!1),a.children.length&&t(a.children)}(this.datas),this.$emit("input",{id:"",title:"请选择"}))},data:function(t){this.datas=t}},data:function(){return{datas:this.data,flatDatas:[],isShowTree:!1}},methods:{selectTree:function(t){var e=this,a=[],i=[],n=[],o=this.field||"id",s=[];t.forEach((function(t){a.push(Math.abs(t[o])),i.push(t.key),n.push(t.title),s=s.concat(Math.abs(t[o]),t.childrenIds)})),s=r(new Set(s)),this.$emit("input",{id:a.join(),key:i.join(),title:n.join(),childrenIds:s}),this.$emit("on-change",{id:a.join(),key:i.join(),title:n.join(),childrenIds:s}),this.multiple||(this.isShowTree=!1),setTimeout((function(){e.dispatch("FormItem","on-form-change",{id:a.join(),key:i.join(),title:n.join(),childrenIds:s})}),100)},hideTree:function(){this.isShowTree=!1},labelClick:function(){this.isShowTree=!this.isShowTree}},directives:{clickoutside:s.a},mounted:function(){var t=this;this.url&&this.$http.get(this.url,this.query).then((function(e){e&&e.length&&(e.forEach((function(t){!1===t.authorized&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),"EQUTYPE"==t.type&&e.forEach((function(t){var a=e.filter((function(e){return e.parentId==t.id}));("org"==t.type||a.length>0)&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),"PROCESS"==t.type&&e.forEach((function(t){1==t.type&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),t.flatDatas=e,t.value.id&&(n.a.setTreeExpand(t.flatDatas,t.value.id),n.a.setFlatTreeSelected(t.flatDatas,t.value.id)),t.datas=n.a.transDataToTree(t.flatDatas),l(t.datas))}))}},d=(a(529),a(1)),p=Object(d.a)(c,i,[],!1,null,null,null);p.options.__file="src/components/my-process-tree-authority.vue";e.a=p.exports},536:function(t,e,a){var i=a(551);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a(17).default)("f8fc3b20",i,!1,{})},545:function(t,e,a){"use strict";a(22);e.a={getList:"/loong/api/data-quality/config",addConfig:"/loong/api/data-quality/config",updateConfig:"/loong/api/data-quality/config",deleteConfig:"/loong/api/data-quality/config",getDetal:"/loong/api/data-quality/config",getExceptionProcess:"/loong/api/data-quality/exception-process",recalcData:"/loong/api/data-quality/recalc",getRecalcList:"/loong/api/data-quality/recalc",getStatisticsInfo:"/loong/api/data-quality/statistics",getStatisticsList:"/loong/api/data-quality/statistics-list",getTrend:"/loong/api/data-quality/trend",getCurveData:"/loong/api/data-quality/curve",getCurveAccuracy:"/loong/api/data-quality/curve-accuracy",getCurveAccuracyBefore:"/loong/api/data-quality/curve-before",correctionData:"/loong/api/data-quality/correction",getCorrectionData:"/loong/api/data-quality/correction",getCurveCompleteness:"/loong/api/data-quality/curve-completeness",inputData:"/loong/api/data-quality/input",getCurveConsistency:"/loong/api/data-quality/curve-consistency",getStandard:"/loong/api/data-quality/standard",updateStandard:"/loong/api/data-quality/standard",updateToDefault:"/loong/api/data-quality/standard-to-default",getCompletenessException:"/loong/api/data-quality/completeness-exception",getconfigedMpointIds:"/loong/api/data-quality/configed-mpointIds"}},550:function(t,e,a){"use strict";var i=a(536);a.n(i).a},551:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.mg-mp-table-header {\r\n\tdisplay: flex;\r\n\theight: 40px;\n}\n.mg-mp-table-search {\r\n\twidth: 250px;\n}\n.mg-mp-table-tip {\r\n\ttext-align: right;\r\n\tline-height: 30px;\r\n\tcolor: #999;\n}\n.mg-mp-table-tip strong {\r\n\tcolor: #777;\r\n\tmargin: 0 3px;\n}\n.mg-mp-table-search .ivu-icon {\r\n\tright: 35px;\n}\r\n",""]),t.exports=e},555:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mg-mp-table"},[a("div",[a("div",[a("div",{staticClass:"c-form-item"},[a("label",{staticStyle:{width:"auto"}},[t._v("关键字：")]),t._v(" "),a("Input",{staticStyle:{width:"160px"},attrs:{placeholder:t.searchPlaceholder,clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.searchParams.queryName,callback:function(e){t.$set(t.searchParams,"queryName",e)},expression:"searchParams.queryName"}})],1),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",{staticStyle:{width:"auto"}},[t._v("区域位置：")]),t._v(" "),a("my-process-tree-authority",{ref:"processTree",staticStyle:{width:"160px"},attrs:{url:t.treeApi.getProcessTreeData},on:{"on-change":t.processSelect},model:{value:t.relProcess,callback:function(e){t.relProcess=e},expression:"relProcess"}})],1),t._v(" "),a("div",{staticClass:"c-adv-search-btn"},[a("Button",{staticClass:"c-btn-modal-search",attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("Button",{staticClass:"c-btn-modal-reset",attrs:{type:"primary"},on:{click:t.searchParamsClean}},[t._v("重置")])],1)]),t._v(" "),a("div",{staticClass:"mg-mp-table-tip"},[t._v("已选择"),a("strong",[t._v(t._s(t.selectedTemp.length))]),t._v("个 "),a("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:t.cleanup}},[t._v("[清空]")])])]),t._v(" "),a("div",{attrs:{id:t.TID}},[a("Table",{ref:t.tableRef,attrs:{columns:t.inColumns,data:t.listData,loading:t.loading,stripe:"",size:"small"},on:{"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll}})],1),t._v(" "),a("Page",{staticClass:"table-page",attrs:{total:t.total,"page-size":t.searchParams.pageSize,current:t.searchParams.currentPage,"show-total":"","show-elevator":"",size:"small"},on:{"on-change":t.pageChange}}),t._v(" "),a("div",{staticClass:"c-modal-footer-btns",staticStyle:{margin:"30px auto 0"}},[a("Button",{attrs:{type:"default",shape:"circle"},on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:t.submit}},[t._v("确定")])],1)],1)};i._withStripped=!0;var n=a(11),o=a(107),s=a(520),r={name:"mgMpointTable",components:{myProcessTreeAuthority:a(531).a},props:{columns:Array,disabledRow:Boolean,selected:Array,max:Number,manual:Boolean,field:String,query:Object},watch:{selected:function(t){var e=JSON.stringify(t);this.selectedTemp=JSON.parse(e),this.selectedTruth=JSON.parse(e),this.checkSelection()}},data:function(){return{searchPlaceholder:"输入测点名称以检索",relProcess:{id:"",title:"请选择"},treeApi:o.a,url:s.a.modalMpoints,inColumns:[{type:"selection",width:50},{title:"测点编号",width:120,key:"mpointId"},{title:"区域位置",key:"siteName"},{title:"测点名称",key:"mpointName"}],TID:"",searchParams:{queryName:"",siteId:"",currentPage:1,pageSize:10},listData:[],selectedTemp:[],selectedTruth:[],loading:!1,total:0,tableRef:""}},methods:{searchParamsClean:function(){this.searchParams=Object.assign({},{queryName:"",siteId:"",currentPage:1,pageSize:10},this.query||{}),this.relProcess={id:"",title:"请选择"}},processSelect:function(t){this.searchParams.siteId=t.id},cleanup:function(){this.selectedTemp=[],this.selectedTruth=[],this.checkSelection()},getData:function(){var t=this;this.loading=!0,this.$http.get(this.url,this.searchParams).then((function(e){var a=e.items?e.items:[];t.disabledRow&&a.forEach((function(t){t.disabled&&(t._disabled=!0)})),t.field&&a.forEach((function(e){e.id||(e.id=e[t.field])})),t.listData=a,t.total=e.total,t.loading=!1,t.checkSelection()}))},pageChange:function(t){this.searchParams.currentPage=t,this.getData()},search:function(){this.searchParams.currentPage=1,this.getData()},onSelect:function(t,e){var a=this.selectedTemp;this.max&&a.length>=this.max?(this.$Notice.info({title:"最多选择"+this.max+"个"}),this.cancelChecked(e.id)):this.selectedTemp.push(e)},onSelectCancel:function(t,e){var a=this;this.selectedTemp.forEach((function(t,i){t.id==e.id&&a.selectedTemp.splice(i,1)}))},onSelectAll:function(t){0==t.length?this.removeTableFromTemp(this.listData):this.addTableToTemp(t)},addTableToTemp:function(t){var e=this.selectedTemp;t.forEach((function(t){var a=!1;e.forEach((function(e,i){e.id==t.id&&(a=!0)})),a||e.push(t)}))},removeTableFromTemp:function(t){for(var e=this.selectedTemp,a=e.length;a--;){var i=!1;t.forEach((function(t){t.id==e[a].id&&(i=!0)})),i&&e.splice(a,1)}},cancelChecked:function(t){var e=this;this.checkSelection();var a=this.selectedTemp,i=[];a.forEach((function(a){a.id==t&&e.$set(a,"_checked",!1),i.push(a)})),this.selectedTemp=i},checkSelection:function(){var t=this;this.$nextTick((function(){var e=t.listData,a=t.selectedTemp,i=t.$refs[t.tableRef];e.forEach((function(t,e){var n=i.$refs.tbody.objData[e];n._isChecked=!1,a.forEach((function(e){e.id==t.id&&(n._isChecked=!0)}))}))}))},submit:function(){this.selectedTruth=n.a.copyArray(this.selectedTemp),this.$emit("on-submit",this.selectedTruth)},cancel:function(){this.selectedTemp=n.a.copyArray(this.selectedTruth),this.checkSelection(),this.$emit("on-cancel")}},mounted:function(){this.max&&(document.querySelector("#"+this.TID).querySelector(".ivu-table-header").querySelector(".ivu-table-cell").style.display="none"),this.query&&(this.searchParams=Object.assign({},{queryName:"",siteId:"",currentPage:1,pageSize:10},this.query)),this.getData()},created:function(){var t=n.a.gusid(6);this.TID="J_TABLE_"+t,this.tableRef="mg-select-table-"+t,this.columns&&(this.inColumns=this.columns),n.a.initTableColumnTitle(this.inColumns)}},l=(a(550),a(1)),c=Object(l.a)(r,i,[],!1,null,null,null);c.options.__file="src/components/mg-mpoint-table.vue";e.a=c.exports},763:function(t,e,a){var i=a(1100);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a(17).default)("7de6e3d6",i,!1,{})}}]);