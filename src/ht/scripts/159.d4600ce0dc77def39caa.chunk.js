(window.webpackJsonp=window.webpackJsonp||[]).push([[159],{1194:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"c-main-border"},[e("div",{staticClass:"c-left-border-blue"},[e("h3",[t._v("简报采集")]),t._v(" "),e("div",{staticClass:"c-btns-right"},[e("Button",{attrs:{type:"primary",shape:"circle"},on:{click:t.edit}},[t._v("编辑")]),t._v(" "),e("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:t.back}},[t._v("返回")])],1)]),t._v(" "),e("div",{staticClass:"c-top-border-gray",staticStyle:{"padding-top":"20px"}},[e("Form",{ref:"form",attrs:{model:t.data,"label-width":100}},[e("Row",{staticStyle:{"padding-left":"20px"}},[e("Col",{attrs:{span:"12"}},[e("FormItem",{attrs:{prop:"siteName",label:"区域位置:"}},[e("span",[t._v(t._s(t.data.siteName))])])],1),t._v(" "),e("Col",{attrs:{span:"12"}},[e("FormItem",{attrs:{prop:"formName",label:"简报名称:"}},[e("span",[t._v(t._s(t.data.formName))])])],1)],1),t._v(" "),e("Row",{staticStyle:{"padding-left":"20px"}},[e("Col",{attrs:{span:"12"}},[e("FormItem",{attrs:{prop:"cycleId",label:"录入周期:"}},[e("span",[t._v(t._s(t.cycleMap[t.data.cycleId]))])])],1),t._v(" "),e("Col",{attrs:{span:"12"}})],1)],1)],1),t._v(" "),e("div",{staticClass:"c-top-border-gray"},[e("Table",{attrs:{columns:t.columns,data:this.data.mpointList,stripe:""}})],1)])};i._withStripped=!0;var o=e(11),n=e(533),r={data:function(){var t=this;return{data:{},textTypeMap:{single:"单行文本",multi:"多行文本"},cycleMap:{D:"天",W:"周",M:"月",Q:"季度",Y:"年"},columns:[{title:"测点名称",key:"mpointName"},{title:"文本类型",key:"textType",align:"center",render:function(a,e){return a("span",t.textTypeMap[e.row.textType])}},{title:"自动填充上次数据",key:"autoComplete",align:"center",render:function(t,a){return t("span",a.row.autoComplete?"是":"否")}},{title:"分组名称",key:"groupName"},{title:"组序号",key:"groupOrder"},{title:"组内序号",key:"mpointOrder"}]}},mounted:function(){var t=this;this.$http.get(n.a.dataInputForm+"/"+this.$route.params.id).then((function(a){a&&(t.data=a)}))},created:function(){o.a.initTableColumnTitle(this.columns)},computed:{},methods:{back:function(){this.$router.back()},edit:function(){"data-input-brief-detail"==this.$route.name&&this.$router.push({name:"data-input-brief-edit",params:{id:this.$route.params.id}})}}},s=e(1),p=Object(s.a)(r,i,[],!1,null,null,null);p.options.__file="src/views/data-input/brief/detail.vue";a.default=p.exports},533:function(t,a,e){"use strict";var i=e(22),o={getListData:"/loong/api/datainput-forms",dataInputForm:"/loong/api/datainput-forms",mpointDataInput:"/loong/api/datainput-records/data",historyDatail:"/loong/api/datainput-records/data",history:"/loong/api/datainput-records",historyDelete:"/loong/api/datainput-records",getExcel:i.a+"/loong/api/datainput-mpoints/excel-temlate-down",importExcel:i.a+"/loong/api/datainput-mpoints/excel-import",saveExcelData:"/loong/api/datainput-mpoints/excel-data-save",cancelExcelData:"/loong/api/datainput-mpoints/excel-data-cancel"};a.a=o}}]);