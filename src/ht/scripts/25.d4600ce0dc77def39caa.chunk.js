(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{1232:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",["add"==t.pageStatus?a("span",[t._v("新增")]):a("span",[t._v("编辑")]),t._v("指标\n        ")]),t._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{attrs:{type:"primary",shape:"circle",loading:t.submitLoading},on:{click:t.submit}},[t._v("保存")]),t._v(" "),a("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:t.back}},[t._v("取消")])],1)]),t._v(" "),a("div",{staticClass:"c-top-border-gray padding20-0"},[a("Form",{ref:"addForm",attrs:{model:t.params,rules:t.formRules}},[a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("指标名称：")]),t._v(" "),a("FormItem",{attrs:{prop:"indexName"}},[a("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"指标名称"},model:{value:t.params.indexName,callback:function(e){t.$set(t.params,"indexName",e)},expression:"params.indexName"}})],1)],1),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("指标类型：")]),t._v(" "),a("FormItem",{attrs:{prop:"indexType"}},[a("Select",{staticStyle:{width:"300px"},model:{value:t.params.indexType,callback:function(e){t.$set(t.params,"indexType",e)},expression:"params.indexType"}},t._l(t.types,(function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1)],1)]),t._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("区域位置：")]),t._v(" "),a("FormItem",{attrs:{prop:"processId"}},[a("my-process-tree-authority",{attrs:{url:t.processTreeApi},on:{"on-change":t.processSelect},model:{value:t.relProcess,callback:function(e){t.relProcess=e},expression:"relProcess"}})],1)],1),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("测点名称：")]),t._v(" "),a("FormItem",{attrs:{prop:"mpointName"}},[a("Input",{staticStyle:{width:"300px"},attrs:{disabled:""},model:{value:t.params.mpointName,callback:function(e){t.$set(t.params,"mpointName",e)},expression:"params.mpointName"}})],1),t._v(" "),a("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:t.showPointsModal}},[t._v("添加")])],1)])])],1),t._v(" "),a("Modal",{attrs:{title:"添加测点",width:"650"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[a("mg-single-select-table",{ref:"mpointTable",attrs:{columns:t.modalColumns,url:t.modalUrl,manual:!0,searchPlaceholder:"测点编号/名称"},on:{"on-select":t.selectMpoint}}),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};i._withStripped=!0;var o=a(23),n=a(531),r=a(149),s=(a(11),a(594)),l=a(520),p=a(107),d={components:{myProcessTreeAuthority:n.a,mgSingleSelectTable:r.a},data:function(){return{params:{indexName:"",indexType:"",mpointId:"",mpointName:"",processId:0,processName:""},submitLoading:!1,formRules:{processId:[{validator:function(t,e,a){e?a():a(new Error)},message:"请选择区域位置",trigger:"change"}],indexName:[{required:!0,type:null,message:"请输入指标名称",trigger:"blur"}],mpointName:[{required:!0,type:null,message:"请选择测点",trigger:"change"}],indexType:[{required:!0,type:null,message:"请选择指标类型",trigger:"change"}]},relProcess:{id:"",title:"请选择"},processTreeApi:p.a.getProcessTreeData,pageStatus:"add",showModal:!1,modalColumns:[{title:"区域位置",key:"siteName"},{title:"测点名称",key:"mpointName"}],modalUrl:l.a.modalMpoints}},computed:Object(o.b)({types:function(t){return t.map.indicator.types},typesText:function(t){return t.map.indicator.typesText}}),methods:{getData:function(t){var e=this;this.loading=!0,this.$http.get(s.a.indicatorData+"/"+t).then((function(t){e.params=Object.assign({},e.params,t),e.params.indexType=t.indexType.toString(),e.relProcess.id=t.processId,e.relProcess.title=t.processName,e.$refs.mpointTable.getData({siteId:t.processId})}))},processSelect:function(t){this.params.processId=t.id,this.params.processName=t.title,this.params.mpointName="",this.params.mpointId="",this.$refs.mpointTable.getData({siteId:t.id})},submit:function(){var t=this,e="post";"edit"==this.pageStatus&&(e="put"),this.$refs.addForm.validate((function(a){a&&!t.submitLoading&&(t.submitLoading=!0,t.$http[e](s.a.indicatorAdd,t.params).then((function(e){t.$Notice.success({title:"添加成功"}),t.submitLoading=!1,t.$router.push({name:"indicator-list"})})).catch((function(){t.submitLoading=!1})))}))},back:function(){this.$router.back()},showPointsModal:function(){this.showModal=!0},selectMpoint:function(t){this.params.mpointId=t.id,this.params.mpointName=t.mpointName,this.showModal=!1}},mounted:function(){"indicator-edit"==this.$route.name&&(this.pageStatus="edit",this.getData(this.$route.params.id))}},c=a(1),m=Object(c.a)(d,i,[],!1,null,null,null);m.options.__file="src/views/system/indicator/add.vue";e.default=m.exports},518:function(t,e,a){var i=a(530);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a(17).default)("4411afe8",i,!1,{})},520:function(t,e,a){"use strict";var i=a(22),o={modalMpoints:"/loong/api/mpoints/dialog",alarmChart:"/loong/api/mpoints/alarm-condition",downloadTemplate:i.a+"/loong/api/mpoints/excel-template-download",exportTemplate:i.a+"/loong/api/mpoints/export",importExcel:i.a+"/loong/api/mpoints/import",saveExcelData:"/loong/api/mpoints/import-save",cancelExcelData:"/loong/api/mpoints/import-cancel",getCategroyData:"/loong/api/mpoints-datacategory",getMpointsList:"/loong/api/mpoints",deleteMpoints:"/loong/api/mpoints",deleteAllMpoints:"/loong/api/mpoints/all",batchSave:"/loong/api/mpoints/batch",autoMpoints:"/loong/api/mpoints-auto",datainputMpoints:"/loong/api/mpoints-datainput",taskMpoints:"/loong/api/mpoints-task",getCalcMpointDetail:"/loong/api/mpoints-calc",getCycle:"/loong/api/mpoints-calc-cycle",getAnalysisMpointDetail:"/loong/api/mpoints-analysis",getMpointNumByType:"/loong/api/mpoints/batch/all",getMpointDataImportList:"/loong/api/mpoint-data-imports",deleteMpointDataImport:"/loong/api/mpoint-data-imports",stopMpointDataImport:"/loong/api/mpoint-data-imports",pointDataImportTempleDownload:i.a+"/loong/api/mpoint-data-imports/templeDownload",pointDataImportFileUpload:i.a+"/loong/api/mpoint-data-imports/fileUpload"};e.a=o},529:function(t,e,a){"use strict";var i=a(518);a.n(i).a},530:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-dropdown-tree {\r\n    display: inline-block;\r\n    position: relative;\r\n    vertical-align: middle;\r\n    line-height: normal;\n}\n.ivu-form-item-error .cmp-dropdown-tree-label {\r\n    border: 1px solid #ed3f14;\n}\n.ivu-form-item-error .cmp-dropdown-tree-arrow {\r\n    border-left: 1px solid #ed3f14;\n}\n.cmp-dropdown-tree-label {\r\n    height: 28px;\r\n    width: 100%;\r\n    border: 1px solid #eaeaea;\r\n    display: flex;\r\n    border-radius: 3px;\r\n    cursor: pointer;\n}\n.cmp-dropdown-tree-text {\r\n    line-height: 28px;\r\n    text-indent: 5px;\r\n    flex: 1;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\n}\n.cmp-dropdown-tree-arrow {\r\n    margin-top: -1px;\r\n    width: 28px;\r\n    height: 28px;\r\n    border-left: 1px solid #eaeaea;\r\n    text-align: center;\r\n    line-height: 28px;\n}\n.cmp-dropdown-tree .ivu-input-group-append {\r\n    width: 25px;\r\n    height: 28px;\r\n    overflow: hidden;\r\n    padding: 0;\n}\n.cmp-dropdown-tree .ivu-btn {\r\n    padding: 5px 10px;\n}\n.cmp-dropdown-tree-tree {\r\n    z-index: 901;\r\n    position: absolute;\r\n    top: 37px;\r\n    left: 0;\r\n    min-width: 300px;\r\n    max-height: 400px;\r\n    overflow: auto;\r\n    padding: 5px 10px;\r\n    background-color: #fff;\r\n    box-shadow: 1px 1px 5px #999;\r\n    border-radius: 3px;\n}\r\n",""]),t.exports=e},531:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.hideTree,expression:"hideTree"}],staticClass:"cmp-dropdown-tree",style:{width:t.width+"px"}},[a("div",{staticClass:"cmp-dropdown-tree-label",on:{click:t.labelClick}},[a("div",{staticClass:"cmp-dropdown-tree-text"},[t._v(t._s(t.value.title))]),t._v(" "),a("div",{staticClass:"cmp-dropdown-tree-arrow"},[a("Icon",{directives:[{name:"show",rawName:"v-show",value:1!=t.isShowTree,expression:"isShowTree != true"}],attrs:{type:"ios-arrow-down"}}),t._v(" "),a("Icon",{directives:[{name:"show",rawName:"v-show",value:1==t.isShowTree,expression:"isShowTree == true"}],attrs:{type:"ios-arrow-up"}})],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowTree,expression:"isShowTree"}],staticClass:"cmp-dropdown-tree-tree"},[a("Tree",{attrs:{data:t.datas,"show-checkbox":t.showCheckbox,multiple:t.multiple},on:{"on-select-change":t.selectTree}})],1)])};i._withStripped=!0;var o=a(11),n=a(146),r=a(147);function s(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(t){!function t(e){e.forEach((function(e,a){e.childrenIds=function t(e,a){a=a||[];return e.forEach((function(e){e.children.length&&t(e.children,a),a.push(Math.abs(e.id))})),a}(e.children),e.children.length&&t(e.children)}))}(t)}var p={name:"myProcessTreeAuthority",mixins:[n.a],props:{field:String,value:Object,data:Array,url:String,query:Object,showCheckbox:Boolean,multiple:Boolean,width:{type:[Number,String],default:300},type:String},watch:{"value.id":function(t){t?this.flatDatas.length&&(o.a.setTrueTreeExpand(this.datas,t),o.a.setTrueTreeSelected(this.datas,t)):(!function t(e){for(var a,i=e.length,o=0;o<i;o++)1==(a=e[o]).selected&&(a.selected=!1),a.children.length&&t(a.children)}(this.datas),this.$emit("input",{id:"",title:"请选择"}))},data:function(t){this.datas=t}},data:function(){return{datas:this.data,flatDatas:[],isShowTree:!1}},methods:{selectTree:function(t){var e=this,a=[],i=[],o=[],n=this.field||"id",r=[];t.forEach((function(t){a.push(Math.abs(t[n])),i.push(t.key),o.push(t.title),r=r.concat(Math.abs(t[n]),t.childrenIds)})),r=s(new Set(r)),this.$emit("input",{id:a.join(),key:i.join(),title:o.join(),childrenIds:r}),this.$emit("on-change",{id:a.join(),key:i.join(),title:o.join(),childrenIds:r}),this.multiple||(this.isShowTree=!1),setTimeout((function(){e.dispatch("FormItem","on-form-change",{id:a.join(),key:i.join(),title:o.join(),childrenIds:r})}),100)},hideTree:function(){this.isShowTree=!1},labelClick:function(){this.isShowTree=!this.isShowTree}},directives:{clickoutside:r.a},mounted:function(){var t=this;this.url&&this.$http.get(this.url,this.query).then((function(e){e&&e.length&&(e.forEach((function(t){!1===t.authorized&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),"EQUTYPE"==t.type&&e.forEach((function(t){var a=e.filter((function(e){return e.parentId==t.id}));("org"==t.type||a.length>0)&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),"PROCESS"==t.type&&e.forEach((function(t){1==t.type&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),t.flatDatas=e,t.value.id&&(o.a.setTreeExpand(t.flatDatas,t.value.id),o.a.setFlatTreeSelected(t.flatDatas,t.value.id)),t.datas=o.a.transDataToTree(t.flatDatas),l(t.datas))}))}},d=(a(529),a(1)),c=Object(d.a)(p,i,[],!1,null,null,null);c.options.__file="src/components/my-process-tree-authority.vue";e.a=c.exports},594:function(t,e,a){"use strict";e.a={indicatorDatas:"/loong/api/indexes",indicatorData:"/loong/api/indexes",indicatorAdd:"/loong/api/indexes",indicatorEdit:"/loong/api/indexes",indicatorDel:"/loong/api/indexes",indicatorDataByProcess:"/loong/api/indexes/value"}}}]);