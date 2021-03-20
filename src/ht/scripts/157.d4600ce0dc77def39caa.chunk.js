(window.webpackJsonp=window.webpackJsonp||[]).push([[157],{1167:function(t,a,o){"use strict";o.r(a);var i=function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[this._v("查看人工录入测点")]),this._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:this.back}},[this._v("返回")])],1)]),this._v(" "),a("div",{staticClass:"c-top-border-gray padding20-14"},[a("Form",{ref:"pointForm",attrs:{model:this.point,"label-width":120}},[a("form-detail",{ref:"formDetail"})],1)],1)])};i._withStripped=!0;var n=o(568),p=o(520),e={components:{formDetail:n.a},data:function(){return{point:{}}},created:function(){this.$route.params.id&&this.handleDetail(this.$route.params.id)},methods:{handleDetail:function(t){var a=this;this.$http.get(p.a.datainputMpoints+"/"+t).then((function(t){t&&(a.$refs.formDetail.point=t)}))},back:function(){this.$router.back()}}},s=o(1),l=Object(s.a)(e,i,[],!1,null,null,null);l.options.__file="src/views/mpoint/mpoint/detail/input-detail.vue";a.default=l.exports},520:function(t,a,o){"use strict";var i=o(22),n={modalMpoints:"/loong/api/mpoints/dialog",alarmChart:"/loong/api/mpoints/alarm-condition",downloadTemplate:i.a+"/loong/api/mpoints/excel-template-download",exportTemplate:i.a+"/loong/api/mpoints/export",importExcel:i.a+"/loong/api/mpoints/import",saveExcelData:"/loong/api/mpoints/import-save",cancelExcelData:"/loong/api/mpoints/import-cancel",getCategroyData:"/loong/api/mpoints-datacategory",getMpointsList:"/loong/api/mpoints",deleteMpoints:"/loong/api/mpoints",deleteAllMpoints:"/loong/api/mpoints/all",batchSave:"/loong/api/mpoints/batch",autoMpoints:"/loong/api/mpoints-auto",datainputMpoints:"/loong/api/mpoints-datainput",taskMpoints:"/loong/api/mpoints-task",getCalcMpointDetail:"/loong/api/mpoints-calc",getCycle:"/loong/api/mpoints-calc-cycle",getAnalysisMpointDetail:"/loong/api/mpoints-analysis",getMpointNumByType:"/loong/api/mpoints/batch/all",getMpointDataImportList:"/loong/api/mpoint-data-imports",deleteMpointDataImport:"/loong/api/mpoint-data-imports",stopMpointDataImport:"/loong/api/mpoint-data-imports",pointDataImportTempleDownload:i.a+"/loong/api/mpoint-data-imports/templeDownload",pointDataImportFileUpload:i.a+"/loong/api/mpoint-data-imports/fileUpload"};a.a=n},568:function(t,a,o){"use strict";var i=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("div",[o("div",{staticClass:"c-title-css"},[t._v("基本信息")]),t._v(" "),o("Form",{ref:"pointForm",attrs:{model:t.point,"label-width":120}},[o("Row",{staticStyle:{"padding-left":"20px","padding-top":"20px"}},[o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"区域位置:"}},[o("span",[t._v(t._s(t.point.siteName))])])],1),t._v(" "),o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"测点名称:"}},[o("span",[t._v(t._s(t.point.mpointName))])])],1)],1),t._v(" "),o("Row",{staticStyle:{"padding-left":"20px"}},[o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"测点类别:"}},[o("span",[t._v(t._s(1==t.point.mpointType?"工艺测点":2==t.point.mpointType?"设备测点":"系统测点"))])])],1),t._v(" "),o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"数据分类:"}},[o("span",[t._v(t._s(t.point.categoryName))])])],1)],1),t._v(" "),o("Row",{staticStyle:{"padding-left":"20px"}},[o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"信号类型:"}},[o("span",[t._v(t._s("State"===t.point.datype?"状态信号":"数值信号"))])])],1),t._v(" "),o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"显示小数位:"}},[o("span",[t._v(t._s(t.point.numtail))])])],1),t._v(" "),"State"===t.point.datype?o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"状态值:"}},[o("span",[t._v(t._s(t.enumvalueChange(t.point.enumvalue)))])])],1):o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"单位:"}},[o("span",[t._v(t._s(t.point.unit))])])],1),t._v(" "),t.showPoint?o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"点位:"}},[o("span",[t._v(t._s(t.point.point))])])],1):t._e()],1),t._v(" "),o("Row",{staticStyle:{"padding-left":"20px"}},[o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"所属设备:"}},[o("span",[t._v(t._s(t.point.equipmentName))])])],1),t._v(" "),o("Col",{attrs:{span:"10"}},[o("FormItem",{attrs:{label:"备注:"}},[o("span",[t._v(t._s(t.point.remarks))])])],1)],1)],1)],1)};i._withStripped=!0;var n={data:function(){return{showPoint:!1,point:{}}},methods:{enumvalueChange:function(t){return"0,关;1,开;"==t?"0,关;1,开;":"0,关;1,开;2:自动;"==t?"0,关;1,开;2:自动;":t}}},p=o(1),e=Object(p.a)(n,i,[],!1,null,null,null);e.options.__file="src/views/mpoint/mpoint/detail/form-detail.vue";a.a=e.exports}}]);