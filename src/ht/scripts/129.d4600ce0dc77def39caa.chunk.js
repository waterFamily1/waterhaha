(window.webpackJsonp=window.webpackJsonp||[]).push([[129],{1192:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"data-input-form c-main-border"},[a("Form",{ref:"form1",attrs:{model:t.data,"label-width":250}},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[t._v("简报数据采集")]),t._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:function(e){return t.submit("form1")}}},[t._v("保存")]),t._v(" "),a("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:t.back}},[t._v("取消")])],1)]),t._v(" "),a("div",{staticClass:"c-top-border-gray",staticStyle:{padding:"20px"}},[a("Row",[a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{prop:"data.record.recordDate",label:"业务时间："}},[a("DatePicker",{ref:"date1",staticStyle:{width:"250px"},attrs:{type:t.dateType,rules:{required:!0,message:"请选择业务时间",trigger:"blur"},placeholder:"业务时间"},on:{"on-change":t.showPointValues},model:{value:t.data.record.recordDate,callback:function(e){t.$set(t.data.record,"recordDate",e)},expression:"data.record.recordDate"}})],1)],1),t._v(" "),a("Col",{attrs:{span:"12"}},[a("FormItem",{attrs:{prop:"formName",label:"简报名称："}},[a("span",[t._v(t._s(t.data.record.formName))])])],1)],1),t._v(" "),t._l(t.data.items.groups,(function(e,r){return a("div",[a("h3",{staticStyle:{clear:"both",background:"#e5e8e9",padding:"10px","margin-bottom":"10px"}},[t._v(t._s(r.substr(r.indexOf(",")+1)))]),t._v(" "),t._l(e,(function(e,r){return a("Col",{attrs:{span:"single"==e.textType?12:24}},[a("FormItem",{style:{width:"single"==e.textType?"":"100%"},attrs:{label:e.mpointName,title:e.mpointName}},[a("Input",{style:{width:"single"==e.textType?"250px":""},attrs:{type:"single"==e.textType?"text":"textarea"},model:{value:e.datas[0].value,callback:function(a){t.$set(e.datas[0],"value",a)},expression:"item.datas[0].value"}})],1)],1)}))],2)}))],2)])],1)};r._withStripped=!0;var o=a(11),i=a(533),s={data:function(){return{data:{record:{recordDate:"",formName:""},items:{groups:[]}},cycleId:this.$route.params.cycleId,cycleTime:""}},mounted:function(){var t=this;this.$refs.date1.options.disabledDate=function(e){return e>new Date||("W"==t.cycleId?1!=e.getDay():void 0)},null!=this.cycleId&&(this.cycleTime=this.transforTime(this.cycleId)),this.showPointValues()},methods:{transforTime:function(t){var e="";switch(t){case"D":e="86400";break;case"W":e="604800";break;case"M":e="2592000";break;case"Q":e="7776000";break;case"Y":e="31536000"}return e},showPointValues:function(){var t=this,e={};e.formId=this.$route.params.formId;var a=new Date;this.data.record.recordDate?a=this.data.record.recordDate:this.$route.params.recordDate?a=this.$route.params.recordDate:"W"==this.cycleId?a=this.getFirstDayOfWeek(new Date):"M"==this.cycleId&&(a=this.getFirstDayOfMonth(new Date)),e.recordDate=a,e.cycleId=this.$route.params.cycleId,this.$http.get(i.a.historyDatail,e).then((function(e){for(var r in e.record||(e.record={recordDate:o.a.F(a,"yyyy-MM-dd")+" 00:00:00",formName:""}),e.items.groups)for(var i=e.items.groups[r],s=0;s<i.length;s++)i[s].mpointName+=" ";void 0===e.record.recordDate&&(e.record.recordDate=e.items.recordDate),e.record.recordDate=o.a.F(e.record.recordDate,"yyyy-MM-dd hh:mm"),t.data=e}))},getFirstDayOfWeek:function(t){var e=t.getDay()||7;return new Date(t.getFullYear(),t.getMonth(),t.getDate()+1-e).toISOString()},getFirstDayOfMonth:function(t){return t.setDate(1),t.toISOString()},submit:function(t){var e=this;this.$refs[t].validate((function(t){if(0!=e.data.items.groups.length)if(t){var a={mpoints:[]};for(var r in a.recordDate=o.a.transDateFromLocale(e.data.record.recordDate),e.data.items.groups)for(var s=e.data.items.groups[r],n=0;n<s.length;n++){var c={};c.mpointId=s[n].mpointId,c.time=a.recordDate,c.value=s[n].datas[0].value,c.status="",c.textType=s[n].textType,a.mpoints.push(c)}a.formId=Number(e.$route.params.formId),e.$http.post(i.a.mpointDataInput,a).then((function(t){e.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}),e.$router.back()}))}else e.$Notice.warning({title:"警告",desc:"验证失败 ! 请正确填写相关信息",duration:3});else e.$Notice.warning({title:"警告",desc:"验证失败 ! 请选择测点",duration:3})}))},back:function(){this.$router.back()}},computed:{dateType:function(){var t="date";switch(this.$route.params.cycleId){case"D":case"W":t="date";break;case"M":case"Q":t="month";break;case"Y":t="year"}return t}}},n=(a(914),a(1)),c=Object(n.a)(s,r,[],!1,null,null,null);c.options.__file="src/views/data-input/brief/input.vue";e.default=c.exports},533:function(t,e,a){"use strict";var r=a(22),o={getListData:"/loong/api/datainput-forms",dataInputForm:"/loong/api/datainput-forms",mpointDataInput:"/loong/api/datainput-records/data",historyDatail:"/loong/api/datainput-records/data",history:"/loong/api/datainput-records",historyDelete:"/loong/api/datainput-records",getExcel:r.a+"/loong/api/datainput-mpoints/excel-temlate-down",importExcel:r.a+"/loong/api/datainput-mpoints/excel-import",saveExcelData:"/loong/api/datainput-mpoints/excel-data-save",cancelExcelData:"/loong/api/datainput-mpoints/excel-data-cancel"};e.a=o},689:function(t,e,a){var r=a(915);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,a(17).default)("0458e713",r,!1,{})},914:function(t,e,a){"use strict";var r=a(689);a.n(r).a},915:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.data-input-form {\r\n    overflow: hidden;\n}\n.data-input-form .ivu-form-item-label {\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\n}\r\n",""]),t.exports=e}}]);