(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{1168:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"c-main-border c-mpoint-form"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[e._v("人工录入型测点详情")]),e._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{attrs:{type:"primary",shape:"circle",loading:e.submitLoading},on:{click:function(t){return e.handleSubmit("pointForm")}}},[e._v("保存")]),e._v(" "),a("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:e.back}},[e._v("取消")])],1)]),e._v(" "),a("div",{staticClass:"c-top-border-gray padding20-14"},[a("Form",{ref:"pointForm",attrs:{model:e.point,rules:e.ruleValidate,"label-width":130}},[a("form-common",{ref:"formCommon",model:{value:e.point,callback:function(t){e.point=t},expression:"point"}})],1)],1)])};n._withStripped=!0;var i=a(577),o=a(520),r={components:{formCommon:i.a},data:function(){return{submitLoading:!1,point:{site:{id:null,title:"请选择"},siteId:null,mpointName:"",equipment:"",equipmentName:"",categoryId:null,datype:"",enumvalue:"0,关;1,开;",enumvalueInput:"0,关;1,开;",unit:"",numtail:2,remarks:""},ruleValidate:{siteId:[{validator:function(e,t,a){t?a():a(new Error("请选择区域位置"))}}],mpointName:[{required:!0,message:"请输入测点名称",trigger:"blur"},{max:50,message:"测点名称不能超过50个字符",trigger:"change"}],mpointType:[{required:!0,type:"number",message:"请选择测点类别",trigger:"change"}],datype:[{required:!0,message:"请选择信号类型"}],enumvalue:[{required:!0,message:"请选择状态值"}],enumvalueInput:[{required:!0,message:"自定义状态值不能为空",trigger:"blur"},{validator:function(e,t,a){if(t){/^((\d+)(,{1})([\u4e00-\u9fa5]+)(;{1}))*$/.test(t)?a():a(new Error("自定义格式不对"))}else a()}}],unitInput:[{required:!0,message:"自定义单位不能为空",trigger:"blur"}],remarks:[{type:"string",max:100,message:"备注不能超过100个字符",trigger:"blur"}]}}},mounted:function(){var e=this;this.$route.params.id?this.$http.get(o.a.datainputMpoints+"/"+this.$route.params.id).then((function(t){t&&(e.point.site.id=t.siteId,e.point.site.title=t.siteName,e.point=Object.assign({},e.point,t),e.point.mpointType=Number(e.point.mpointType),e.$refs.formCommon.changePointType(e.point.mpointType,(function(){e.$refs.formCommon.changeSetUnit(e.point.categoryId)})),-1==e.$refs.formCommon.statusMap.map((function(e){return e.id})).join().indexOf(e.point.enumvalue)&&(e.point.enumvalueInput=e.point.enumvalue,e.point.enumvalue="-1"),""==e.point.unit||null==e.point.unit?e.point.unit="":-1==Object.keys(e.$refs.formCommon.unitMap).indexOf(e.point.unit)&&(e.point.unitInput=e.point.unit,e.point.unit="-1"))})):this.$route.params.ids&&this.$nextTick((function(){e.$refs.formCommon.disabledBatch=!0,e.point.site.id=-1,e.point.siteId=-1,e.point.mpointName="-1"}))},methods:{handleSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(e){t.submitLoading=!0;var a=JSON.parse(JSON.stringify(t.point));if(delete a.site,a.datasource="INPUT","-2"==a.unit?a.unit="":"-1"==a.unit&&(a.unit=a.unitInput),a.enumvalue="-1"==a.enumvalue?a.enumvalueInput:a.enumvalue,"State"==a.datype&&(a.unit="",delete a.unitInput,delete a.enumvalueInput),"Digtal"==a.datype&&(a.enumvalue="",delete a.enumvalueInput,delete a.unitInput),t.$route.params.ids){delete a.siteId,delete a.mpointName;var n={};n.bmpoint=a,n.ids="all"==t.$route.params.ids?sessionStorage.getItem("batchMpointIds"):t.$route.params.ids,n.type="COMPLEX",t.$http.put(o.a.batchSave,n).then((function(e){e.count?(t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}),t.$routeBack()):t.submitLoading=!1}))}else(t.$route.params.id?t.$http.put:t.$http.post)(o.a.datainputMpoints,a).then((function(e){e.count||e.id?(t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}),t.$routeBack()):t.submitLoading=!1})).catch((function(){t.submitLoading=!1}))}}))},back:function(){this.$router.back()}}},s=a(1),l=Object(s.a)(r,n,[],!1,null,null,null);l.options.__file="src/views/mpoint/mpoint/components/input-form.vue";t.default=l.exports},518:function(e,t,a){var n=a(530);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(17).default)("4411afe8",n,!1,{})},520:function(e,t,a){"use strict";var n=a(22),i={modalMpoints:"/loong/api/mpoints/dialog",alarmChart:"/loong/api/mpoints/alarm-condition",downloadTemplate:n.a+"/loong/api/mpoints/excel-template-download",exportTemplate:n.a+"/loong/api/mpoints/export",importExcel:n.a+"/loong/api/mpoints/import",saveExcelData:"/loong/api/mpoints/import-save",cancelExcelData:"/loong/api/mpoints/import-cancel",getCategroyData:"/loong/api/mpoints-datacategory",getMpointsList:"/loong/api/mpoints",deleteMpoints:"/loong/api/mpoints",deleteAllMpoints:"/loong/api/mpoints/all",batchSave:"/loong/api/mpoints/batch",autoMpoints:"/loong/api/mpoints-auto",datainputMpoints:"/loong/api/mpoints-datainput",taskMpoints:"/loong/api/mpoints-task",getCalcMpointDetail:"/loong/api/mpoints-calc",getCycle:"/loong/api/mpoints-calc-cycle",getAnalysisMpointDetail:"/loong/api/mpoints-analysis",getMpointNumByType:"/loong/api/mpoints/batch/all",getMpointDataImportList:"/loong/api/mpoint-data-imports",deleteMpointDataImport:"/loong/api/mpoint-data-imports",stopMpointDataImport:"/loong/api/mpoint-data-imports",pointDataImportTempleDownload:n.a+"/loong/api/mpoint-data-imports/templeDownload",pointDataImportFileUpload:n.a+"/loong/api/mpoint-data-imports/fileUpload"};t.a=i},529:function(e,t,a){"use strict";var n=a(518);a.n(n).a},530:function(e,t,a){(t=a(10)(!1)).push([e.i,"\n.cmp-dropdown-tree {\r\n    display: inline-block;\r\n    position: relative;\r\n    vertical-align: middle;\r\n    line-height: normal;\n}\n.ivu-form-item-error .cmp-dropdown-tree-label {\r\n    border: 1px solid #ed3f14;\n}\n.ivu-form-item-error .cmp-dropdown-tree-arrow {\r\n    border-left: 1px solid #ed3f14;\n}\n.cmp-dropdown-tree-label {\r\n    height: 28px;\r\n    width: 100%;\r\n    border: 1px solid #eaeaea;\r\n    display: flex;\r\n    border-radius: 3px;\r\n    cursor: pointer;\n}\n.cmp-dropdown-tree-text {\r\n    line-height: 28px;\r\n    text-indent: 5px;\r\n    flex: 1;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\n}\n.cmp-dropdown-tree-arrow {\r\n    margin-top: -1px;\r\n    width: 28px;\r\n    height: 28px;\r\n    border-left: 1px solid #eaeaea;\r\n    text-align: center;\r\n    line-height: 28px;\n}\n.cmp-dropdown-tree .ivu-input-group-append {\r\n    width: 25px;\r\n    height: 28px;\r\n    overflow: hidden;\r\n    padding: 0;\n}\n.cmp-dropdown-tree .ivu-btn {\r\n    padding: 5px 10px;\n}\n.cmp-dropdown-tree-tree {\r\n    z-index: 901;\r\n    position: absolute;\r\n    top: 37px;\r\n    left: 0;\r\n    min-width: 300px;\r\n    max-height: 400px;\r\n    overflow: auto;\r\n    padding: 5px 10px;\r\n    background-color: #fff;\r\n    box-shadow: 1px 1px 5px #999;\r\n    border-radius: 3px;\n}\r\n",""]),e.exports=t},531:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:e.hideTree,expression:"hideTree"}],staticClass:"cmp-dropdown-tree",style:{width:e.width+"px"}},[a("div",{staticClass:"cmp-dropdown-tree-label",on:{click:e.labelClick}},[a("div",{staticClass:"cmp-dropdown-tree-text"},[e._v(e._s(e.value.title))]),e._v(" "),a("div",{staticClass:"cmp-dropdown-tree-arrow"},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:1!=e.isShowTree,expression:"isShowTree != true"}],attrs:{type:"ios-arrow-down"}}),e._v(" "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:1==e.isShowTree,expression:"isShowTree == true"}],attrs:{type:"ios-arrow-up"}})],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowTree,expression:"isShowTree"}],staticClass:"cmp-dropdown-tree-tree"},[a("Tree",{attrs:{data:e.datas,"show-checkbox":e.showCheckbox,multiple:e.multiple},on:{"on-select-change":e.selectTree}})],1)])};n._withStripped=!0;var i=a(11),o=a(146),r=a(147);function s(e){return function(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(e){!function e(t){t.forEach((function(t,a){t.childrenIds=function e(t,a){a=a||[];return t.forEach((function(t){t.children.length&&e(t.children,a),a.push(Math.abs(t.id))})),a}(t.children),t.children.length&&e(t.children)}))}(e)}var u={name:"myProcessTreeAuthority",mixins:[o.a],props:{field:String,value:Object,data:Array,url:String,query:Object,showCheckbox:Boolean,multiple:Boolean,width:{type:[Number,String],default:300},type:String},watch:{"value.id":function(e){e?this.flatDatas.length&&(i.a.setTrueTreeExpand(this.datas,e),i.a.setTrueTreeSelected(this.datas,e)):(!function e(t){for(var a,n=t.length,i=0;i<n;i++)1==(a=t[i]).selected&&(a.selected=!1),a.children.length&&e(a.children)}(this.datas),this.$emit("input",{id:"",title:"请选择"}))},data:function(e){this.datas=e}},data:function(){return{datas:this.data,flatDatas:[],isShowTree:!1}},methods:{selectTree:function(e){var t=this,a=[],n=[],i=[],o=this.field||"id",r=[];e.forEach((function(e){a.push(Math.abs(e[o])),n.push(e.key),i.push(e.title),r=r.concat(Math.abs(e[o]),e.childrenIds)})),r=s(new Set(r)),this.$emit("input",{id:a.join(),key:n.join(),title:i.join(),childrenIds:r}),this.$emit("on-change",{id:a.join(),key:n.join(),title:i.join(),childrenIds:r}),this.multiple||(this.isShowTree=!1),setTimeout((function(){t.dispatch("FormItem","on-form-change",{id:a.join(),key:n.join(),title:i.join(),childrenIds:r})}),100)},hideTree:function(){this.isShowTree=!1},labelClick:function(){this.isShowTree=!this.isShowTree}},directives:{clickoutside:r.a},mounted:function(){var e=this;this.url&&this.$http.get(this.url,this.query).then((function(t){t&&t.length&&(t.forEach((function(e){!1===e.authorized&&(e.render=function(e,t){t.root,t.node;return e("span",[t.data.name])})})),"EQUTYPE"==e.type&&t.forEach((function(e){var a=t.filter((function(t){return t.parentId==e.id}));("org"==e.type||a.length>0)&&(e.render=function(e,t){t.root,t.node;return e("span",[t.data.name])})})),"PROCESS"==e.type&&t.forEach((function(e){1==e.type&&(e.render=function(e,t){t.root,t.node;return e("span",[t.data.name])})})),e.flatDatas=t,e.value.id&&(i.a.setTreeExpand(e.flatDatas,e.value.id),i.a.setFlatTreeSelected(e.flatDatas,e.value.id)),e.datas=i.a.transDataToTree(e.flatDatas),l(e.datas))}))}},p=(a(529),a(1)),c=Object(p.a)(u,n,[],!1,null,null,null);c.options.__file="src/components/my-process-tree-authority.vue";t.a=c.exports},532:function(e,t,a){"use strict";var n=a(22),i={getAllEqu:"/equipment/api/equipments",deleteEqu:"/equipment/api/equipments",getEquDetail:"/equipment/api/equipments/detail/",saveEqu:"/equipment/api/equipments/detail",delAttachment:"/equipment/api/equ-attachs",getSingleEqu:"/equipment/api/equipments/",getParentEqu:"/equipment/api/equipments/parent/",getEquState:"/equipment/api/equipments/state/",getRemarkByEqu:"/equipment/api/equ-comments",addRemarkByEqu:"/equipment/api/equ-comments",pointsByEqu:"/equipment/api/equipments/mpoint",alarmByEqu:"/equipment/api/alarm-records",equRelPoints:"/equipment/api/mpoints/dropdown-box",getQrcode:n.a+"/equipment/api/equipments/qrcode-export",import:"/equipment/api/excel-import",saveExcelData:"/equipment/api/excel-data-save",cancelExcelData:"/equipment/api/excel-data-cancel",getExcel:n.a+"/equipment/api/excel-temlate-down",importExcel:n.a+"/equipment/api/excel-import",qrcodeExportStart:"/equipment/api/equipments/qrcode-export",qrcodeExportProgress:"/equipment/api/equipments/qrcode-export/progress",qrcodeExportDownload:n.a+"/equipment/api/equipments/qrcode-export/download",equTypeTree:"/equipment/api/equ-types/tree",equTypes:"/equipment/api/equ-types",equType:"/equipment/api/equ-types",gatewayParseMethod:"/box/api/terminals/parse-method",getTerminalList:"/box/api/terminals",terminalDetail:"/box/api/terminals/",addTerminal:"/box/api/terminals",delTerminal:"/box/api/terminals",simSelect:"/box/api/sim-manager/cards/select"};t.a=i},541:function(e,t,a){var n=a(575);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,a(17).default)("273e46e9",n,!1,{})},574:function(e,t,a){"use strict";var n=a(541);a.n(n).a},575:function(e,t,a){(t=a(10)(!1)).push([e.i,".c-form-common .siteTreeHight .cmp-dropdown-tree {\n  width: 100% !important;\n}\n.c-form-common .form-custom .ivu-form-item-content {\n  margin-left: 0 !important;\n}\n.c-form-common .c-custom-left {\n  float: left;\n}\n.c-form-common .c-custom-right {\n  float: right;\n  padding-left: 10px;\n}\n.c-form-common .w0 {\n  width: 0;\n}\n.c-form-common .w35 {\n  width: 35%;\n}\n.c-form-common .w65 {\n  width: 65%;\n}\n.c-form-common .w100 {\n  width: 100%;\n}\n",""]),e.exports=t},577:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"c-form-common"},[a("div",{staticClass:"c-title-css"},[e._v("基本信息")]),e._v(" "),a("div",{staticStyle:{"padding-top":"20px"}},[a("Row",{staticStyle:{"padding-left":"20px"},style:{display:e.disabledBatch?"none":"block"}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{staticClass:"siteTreeHight",attrs:{label:"区域位置:",prop:"siteId",required:""}},[a("my-process-tree-authority",{ref:"dropdownTree",attrs:{url:e.treeApi.getProcessTreeData},on:{"on-change":e.changeSite},model:{value:e.value.site,callback:function(t){e.$set(e.value,"site",t)},expression:"value.site"}})],1)],1),e._v(" "),a("Col",{attrs:{span:"8",offset:"3"}},[a("FormItem",{attrs:{label:"测点名称:",prop:"mpointName"}},[a("Input",{attrs:{placeholder:"请输入测点名称"},model:{value:e.value.mpointName,callback:function(t){e.$set(e.value,"mpointName",t)},expression:"value.mpointName"}})],1)],1)],1),e._v(" "),a("Row",{staticStyle:{"padding-left":"20px"}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"测点类别:",prop:"mpointType"}},[a("Select",{on:{"on-change":e.changePointType},model:{value:e.value.mpointType,callback:function(t){e.$set(e.value,"mpointType",t)},expression:"value.mpointType"}},e._l(e.mpointType,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1),e._v(" "),a("Col",{attrs:{span:"8",offset:"3"}},[a("FormItem",{attrs:{label:"数据分类:",prop:"categoryId"}},[a("Select",{on:{"on-change":e.changeSetUnit},model:{value:e.value.categoryId,callback:function(t){e.$set(e.value,"categoryId",t)},expression:"value.categoryId"}},e._l(e.categoryList,(function(t){return a("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.categoryName))])})),1)],1)],1)],1),e._v(" "),a("Row",{staticStyle:{"padding-left":"20px"}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"信号类型:",prop:"datype"}},[a("Select",{on:{"on-change":e.datypeChange},model:{value:e.value.datype,callback:function(t){e.$set(e.value,"datype",t)},expression:"value.datype"}},e._l(e.datypeMap,(function(t,n){return a("Option",{key:n,attrs:{value:n}},[e._v(e._s(t))])})),1)],1)],1),e._v(" "),a("Col",{attrs:{span:"8",offset:"3"}},[a("FormItem",{attrs:{label:"显示小数位:",prop:"numtail"}},[a("Select",{attrs:{disabled:"State"==e.value.datype},model:{value:e.value.numtail,callback:function(t){e.$set(e.value,"numtail",t)},expression:"value.numtail"}},e._l(e.numtailMap,(function(t){return a("Option",{key:t.numtailName,attrs:{value:t.id}},[e._v(e._s(t.numtailName))])})),1)],1)],1)],1),e._v(" "),a("Row",{staticStyle:{"padding-left":"20px"}},[a("Col",{attrs:{span:"8"}},["State"==e.value.datype?a("FormItem",{class:["c-custom-left","-1"==e.value.enumvalue?"w65":"w100"],attrs:{label:"状态值:",prop:"enumvalue"}},[a("Select",{model:{value:e.value.enumvalue,callback:function(t){e.$set(e.value,"enumvalue",t)},expression:"value.enumvalue"}},e._l(e.statusMap,(function(t){return a("Option",{key:t.statusName,attrs:{value:t.id}},[e._v(e._s(t.statusName))])})),1)],1):e._e(),e._v(" "),"-1"==e.value.enumvalue&&"State"==e.value.datype?a("FormItem",{staticClass:"form-custom",class:["c-custom-right","-1"==e.value.enumvalue?"w35":"w0"],attrs:{prop:"enumvalueInput"}},[a("Input",{model:{value:e.value.enumvalueInput,callback:function(t){e.$set(e.value,"enumvalueInput",t)},expression:"value.enumvalueInput"}})],1):e._e()],1),e._v(" "),a("Col",{attrs:{span:"8"}},["State"!=e.value.datype?a("FormItem",{class:["c-custom-left","-1"==e.value.unit?"w65":"w100"],attrs:{label:"单位:",prop:"unit"}},[a("Select",{model:{value:e.value.unit,callback:function(t){e.$set(e.value,"unit",t)},expression:"value.unit"}},e._l(e.unitMap,(function(t,n){return a("Option",{key:n,attrs:{value:n}},[e._v(e._s(t))])})),1)],1):e._e(),e._v(" "),"-1"==e.value.unit&&"State"!=e.value.datype?a("FormItem",{staticClass:"form-custom",class:["c-custom-right","-1"==e.value.unit?"w35":"w0"],attrs:{prop:"unitInput"}},[a("Input",{model:{value:e.value.unitInput,callback:function(t){e.$set(e.value,"unitInput",t)},expression:"value.unitInput"}})],1):e._e()],1),e._v(" "),e.showPoint?a("Col",{attrs:{span:"8",offset:"3"}},[a("FormItem",{attrs:{label:"点位:",prop:"point"}},[a("Input",{attrs:{placeholder:"请输入点位"},model:{value:e.value.point,callback:function(t){e.$set(e.value,"point",t)},expression:"value.point"}})],1)],1):e._e()],1),e._v(" "),a("Row",{staticStyle:{"padding-left":"20px"}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"所属设备:"}},[e._v("\n                    "+e._s(e.value.equipmentName)+"\n                    "),a("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:e.openEquList}},[e._v("[选择设备]")]),e._v(" "),a("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:e.clearEquBind}},[e._v("[清除]")])])],1),e._v(" "),a("Col",{attrs:{span:"8",offset:"3"}},[a("FormItem",{attrs:{label:"曲线Y轴量程:"}},[a("Input",{staticStyle:{width:"80px"},attrs:{placeholder:"最小值"},on:{"on-blur":function(t){return e.checkCurve("curveYaxisLowerRange")}},model:{value:e.value.curveYaxisLowerRange,callback:function(t){e.$set(e.value,"curveYaxisLowerRange",t)},expression:"value.curveYaxisLowerRange"}}),e._v("-\n                    "),a("Input",{staticStyle:{width:"80px"},attrs:{placeholder:"最大值"},on:{"on-blur":function(t){return e.checkCurve("curveYaxisUpperRange")}},model:{value:e.value.curveYaxisUpperRange,callback:function(t){e.$set(e.value,"curveYaxisUpperRange",t)},expression:"value.curveYaxisUpperRange"}})],1)],1)],1),e._v(" "),a("Row",{staticStyle:{"padding-left":"20px"}},[a("Col",{attrs:{span:"8"}},[a("FormItem",{attrs:{label:"备注:",prop:"remarks"}},[a("Input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:5}},model:{value:e.value.remarks,callback:function(t){e.$set(e.value,"remarks",t)},expression:"value.remarks"}})],1)],1)],1)],1),e._v(" "),a("Modal",{attrs:{width:"600",title:"选择所属设备"},model:{value:e.isShowEqu,callback:function(t){e.isShowEqu=t},expression:"isShowEqu"}},[a("mg-single-select-table",{ref:"modalTable",attrs:{columns:e.modalColumns,url:e.modalUrl,manual:!0},on:{"on-select":e.equSelect}}),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};n._withStripped=!0;var i=a(23),o=a(531),r=a(107),s=a(520),l=(a(11),a(149)),u=a(532),p={props:{value:Object},watch:{"value.curveYaxisLowerRange":function(e){this.checkCurve("curveYaxisLowerRange")},"value.curveYaxisUpperRange":function(e){this.checkCurve("curveYaxisUpperRange")}},components:{myProcessTreeAuthority:o.a,mgSingleSelectTable:l.a},data:function(){return{showPoint:!1,disabledBatch:!1,treeApi:r.a,categoryList:[],unitDefalutMap:{"-2":"无","-1":"自定义"},mpointType:[{label:"工艺测点",value:1},{label:"设备测点",value:2}],modalColumns:[{title:"设备编号",key:"code"},{title:"设备类型",key:"typeName"},{title:"设备名称",key:"name"}],modalUrl:u.a.getAllEqu,isShowEqu:!1}},created:function(){this.unitMap=this.unitDefalutMap},computed:Object(i.b)({datypeMap:function(e){return e.map.mpoint.datypeText},numtailMap:function(e){return e.map.mpoint.numtail},statusMap:function(e){return e.map.mpoint.status}}),methods:{changeSite:function(e){this.value.siteId=e.id,this.value.siteName=e.title,this.value.equipment="",this.value.equipmentName=""},changeSetUnit:function(e){var t=(this.categoryList.filter((function(t){return t.id==e}))[0]||{}).unit,a=null==t?[]:t.split(";"),n={};a.forEach((function(e){return n[e]=e})),this.unitMap=Object.assign({},n,this.unitDefalutMap)},datypeChange:function(e){if("State"==e){if(this.value.enumvalue||(this.value.enumvalue="0,关;1,开;"),this.value.tabs){var t=[];this.value.tabs.forEach((function(e){"pretreatment"!=e.type&&t.push(e)})),this.value.tabs=t}}else{var a=!1;this.value.tabs&&this.value.tabs.forEach((function(e){"pretreatment"==e.type&&(a=!0)})),a||this.value.tabs&&this.value.tabs.unshift({type:"pretreatment"})}},openEquList:function(){this.isShowEqu=!0,this.$refs.modalTable.getData({processIds:this.value.siteId})},equSelect:function(e){this.value.equipment=e.id,this.value.equipmentName=e.name,this.isShowEqu=!1},changePointType:function(e,t){var a=this;this.$http.get(s.a.getCategroyData,{mpointType:e}).then((function(e){a.categoryList=e,t?t():a.value.categoryId=""}))},checkCurve:function(e){var t=this.value[e];Number.isNaN(Number(t))&&(this.value[e]=null)},clearEquBind:function(){this.value.equipment="",this.value.equipmentName=""}}},c=(a(574),a(1)),m=Object(c.a)(p,n,[],!1,null,null,null);m.options.__file="src/views/mpoint/mpoint/components/form-common.vue";t.a=m.exports}}]);