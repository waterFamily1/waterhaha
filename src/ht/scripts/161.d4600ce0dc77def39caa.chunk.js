(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{1181:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"c-main-border"},[e("div",{staticClass:"c-top-border-gray"},[e("div",{staticClass:"c-table-top-btns"},[e("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle"},domProps:{textContent:t._s(t.isEdit?"保存":"编辑")},on:{click:t.editData}}),t._v(" "),e("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle"},on:{click:t.updateToDefault}},[t._v("恢复默认")])],1),t._v(" "),e("Table",{attrs:{columns:t.columns,data:t.listData,loading:t.loading,stripe:""}})],1)])};i._withStripped=!0;var n=e(11),s=e(545),o={name:"data-quality-standard",data:function(){var t=this;return{isEdit:!1,evaluateMap:{4:"优",3:"良",2:"中",1:"差"},columns:[{title:" ",key:"level",width:60,render:function(a,e){return a("span",t.evaluateMap[e.row.level])}},{title:"准确性",key:"accuracy",render:function(a,e){var i=[];return 1!=e.row.level?i.push(a("span",">=")):i.push(a("span"," < ")),t.isEdit?i.push(a("InputNumber",{style:{width:"70px"},props:{max:100,min:0,value:e.row.accuracy},on:{"on-change":function(a){e.row.accuracy=a,t.listData[e.index]=e.row}}}),a("span","  %")):i.push(a("span",e.row.accuracy+"%")),i}},{title:"完整性",key:"completeness",render:function(a,e){var i=[];return 1!=e.row.level?i.push(a("span",">=")):i.push(a("span"," < ")),t.isEdit?i.push(a("InputNumber",{style:{width:"70px"},props:{max:100,min:0,value:e.row.completeness},on:{"on-change":function(a){e.row.completeness=a,t.listData[e.index]=e.row}}}),a("span","  %")):i.push(a("span",e.row.completeness+"%")),i}},{title:"及时性",key:"timeliness",render:function(a,e){var i=[];return 1!=e.row.level?i.push(a("span","<=")):i.push(a("span"," > ")),t.isEdit?i.push(a("InputNumber",{style:{width:"70px"},props:{min:0,value:e.row.timeliness},on:{"on-change":function(a){e.row.timeliness=a,t.listData[e.index]=e.row}}}),a("span","  s")):i.push(a("span",e.row.timeliness+"s")),i}},{title:"一致性",key:"consistency",render:function(a,e){var i=[];return 1!=e.row.level?i.push(a("span",">=")):i.push(a("span"," < ")),t.isEdit?i.push(a("InputNumber",{style:{width:"70px"},props:{max:100,min:0,value:e.row.consistency},on:{"on-change":function(a){e.row.consistency=a,t.listData[e.index]=e.row}}}),a("span","  %")):i.push(a("span",e.row.consistency+"%")),i}}],listData:[],loading:!1}},created:function(){n.a.initTableColumnTitle(this.columns),this.getData()},methods:{getData:function(){var t=this;this.loading=!0,this.$http.get(s.a.getStandard).then((function(a){a&&(t.listData=a,t.loading=!1)}))},editData:function(){var t=this;if(this.isEdit){var a={};if(this.listData.forEach((function(t){a[t.level]=t})),a[1].accuracy!=a[2].accuracy||a[2].accuracy>=a[3].accuracy||a[3].accuracy>=a[4].accuracy)return this.$Notice.warning({title:"提示",desc:"准确性标准填写有误",duration:3}),!1;if(a[1].completeness!=a[2].completeness||a[2].completeness>=a[3].completeness||a[3].completeness>=a[4].completeness)return this.$Notice.warning({title:"提示",desc:"完整性标准填写有误",duration:3}),!1;if(a[1].timeliness!=a[2].timeliness||a[2].timeliness<=a[3].timeliness||a[3].timeliness<=a[4].timeliness)return this.$Notice.warning({title:"提示",desc:"及时性标准填写有误",duration:3}),!1;if(a[1].consistency!=a[2].consistency||a[2].consistency>=a[3].consistency||a[3].consistency>=a[4].consistency)return this.$Notice.warning({title:"提示",desc:"一致性标准填写有误",duration:3}),!1;this.$http.put(s.a.updateStandard,this.listData).then((function(a){a&&(t.isEdit=!1,t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}))}))}else this.isEdit=!0},updateToDefault:function(){var t=this;this.$http.put(s.a.updateToDefault).then((function(a){t.isEdit=!1,t.getData(),t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3})}))}}},c=e(1),l=Object(c.a)(o,i,[],!1,null,null,null);l.options.__file="src/views/data-quality/standard.vue";a.default=l.exports},545:function(t,a,e){"use strict";e(22);a.a={getList:"/loong/api/data-quality/config",addConfig:"/loong/api/data-quality/config",updateConfig:"/loong/api/data-quality/config",deleteConfig:"/loong/api/data-quality/config",getDetal:"/loong/api/data-quality/config",getExceptionProcess:"/loong/api/data-quality/exception-process",recalcData:"/loong/api/data-quality/recalc",getRecalcList:"/loong/api/data-quality/recalc",getStatisticsInfo:"/loong/api/data-quality/statistics",getStatisticsList:"/loong/api/data-quality/statistics-list",getTrend:"/loong/api/data-quality/trend",getCurveData:"/loong/api/data-quality/curve",getCurveAccuracy:"/loong/api/data-quality/curve-accuracy",getCurveAccuracyBefore:"/loong/api/data-quality/curve-before",correctionData:"/loong/api/data-quality/correction",getCorrectionData:"/loong/api/data-quality/correction",getCurveCompleteness:"/loong/api/data-quality/curve-completeness",inputData:"/loong/api/data-quality/input",getCurveConsistency:"/loong/api/data-quality/curve-consistency",getStandard:"/loong/api/data-quality/standard",updateStandard:"/loong/api/data-quality/standard",updateToDefault:"/loong/api/data-quality/standard-to-default",getCompletenessException:"/loong/api/data-quality/completeness-exception",getconfigedMpointIds:"/loong/api/data-quality/configed-mpointIds"}}}]);