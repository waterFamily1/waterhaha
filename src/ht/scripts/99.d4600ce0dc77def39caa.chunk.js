(window.webpackJsonp=window.webpackJsonp||[]).push([[99],{1037:function(e,t,a){"use strict";var i=a(743);a.n(i).a},1038:function(e,t,a){var i=a(10),r=a(24),n=a(552),o=a(553),s=a(546);t=i(!1);var l=r(n),c=r(o),p=r(s);t.push([e.i,".import-detail .equ-import-process {\n  width: 620px;\n  height: 110px;\n  background: #FFF url("+l+") repeat-x 0 -9px;\n  margin: 0 auto 20px;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n.import-detail .equ-import-process span {\n  font-size: 13px;\n  display: inline-block;\n  width: 74px;\n  height: 70px;\n  background: #fff url("+c+") no-repeat 15px -48px;\n  background-size: 60%;\n  text-align: center;\n  color: #666;\n  padding-top: 65px;\n}\n.import-detail .equ-import-process span.active {\n  font-size: 16px;\n  color: #4b7efe;\n  font-weight: 700;\n  background: #fff url("+c+") no-repeat 10px 10px;\n  background-size: 70%;\n}\n.import-detail .equ-import-upload {\n  height: 40px;\n  margin: 100px auto 20px;\n  text-align: center;\n}\n.import-detail .equ-import-upload .ivu-btn {\n  width: 110px;\n  border-radius: 15px;\n  font-size: 13px;\n  color: #FFF;\n}\n.import-detail .equ-import-download {\n  text-align: center;\n  height: 40px;\n  margin: 0 auto;\n}\n.import-detail .equ-import-download a {\n  color: #4b7efe;\n  font-size: 13px;\n}\n.import-detail .equ-import-download .ivu-icon {\n  font-size: 14px;\n  margin-left: 7px;\n}\n.import-detail .equ-import-download div {\n  margin-top: 10px;\n}\n.import-detail .ivu-upload-list {\n  margin-top: -80px;\n}\n.import-detail .validate-box {\n  width: 600px;\n  height: 40px;\n  margin: 0 auto 20px;\n}\n.import-detail .validate-box li {\n  float: left;\n  width: 200px;\n  height: 40px;\n  line-height: 40px;\n  list-style: none;\n  text-align: center;\n}\n.import-detail .validate-box li:before {\n  content: '';\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin-right: 10px;\n  border-radius: 50%;\n}\n.import-detail .validate-box li.all-validate:before {\n  background-color: #4b7efe;\n}\n.import-detail .validate-box li.all-pass:before {\n  background-color: #55d43f;\n}\n.import-detail .validate-box li.all-error:before {\n  background-color: #e03d3e;\n}\n.import-detail .validate-box li em {\n  margin: 0 20px;\n  font-size: 26px;\n  font-weight: 700;\n  font-style: normal;\n  color: #000;\n}\n.import-detail .ivu-tabs {\n  width: 100%;\n}\n.import-detail .ivu-tabs-bar {\n  border-bottom: none;\n}\n.import-detail .ivu-tabs-nav-wrap {\n  border-top: 1px solid #dddee1;\n}\n.import-detail .ivu-icon-information-circled {\n  float: right;\n  margin-right: 0;\n  margin-left: 8px;\n  margin-top: 2px;\n  color: #e03e3c;\n}\n.import-detail .validate-list li {\n  float: left;\n  width: 300px;\n  margin: 20px 30px;\n  list-style: none;\n}\n.import-detail .no-data {\n  height: 50px;\n  line-height: 50px;\n  text-align: center;\n}\n.import-detail .validate-pass-box {\n  border-top: 1px solid #dddee1;\n  text-align: center;\n}\n.import-detail .validate-pass-box > span {\n  display: block;\n  margin-bottom: 15px;\n}\n.import-detail .validate-pass-box .complete-icon {\n  display: inline-block;\n  width: 80px;\n  height: 80px;\n  margin-top: 30px;\n  background: url("+p+") no-repeat;\n  background-size: 100%;\n}\n.import-detail .submit-btn {\n  display: block;\n  width: 120px;\n  margin: 0 auto;\n}\n.import-detail .ivu-tabs-content .validate-pass-box {\n  border-top: none;\n}\n.import-detail .complete-box {\n  margin: 30px auto 0;\n  text-align: center;\n}\n.import-detail .complete-box > h3 {\n  margin: 15px 0;\n}\n.import-detail .complete-box .btn-back {\n  width: 100px;\n  border: solid 1px #4b7efe;\n  color: #4b7efe;\n  background: #fff;\n}\n.import-modal {\n  text-align: center;\n  padding: 30px 0 0;\n}\n",""]),e.exports=t},1223:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"import-detail c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[e._v("批量导入SIM卡")]),e._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{directives:[{name:"show",rawName:"v-show",value:"validate"==e.processActive,expression:"processActive == 'validate'"}],attrs:{type:"primary",shape:"circle"},on:{click:e.cancelClick}},[e._v("重新整理")]),e._v(" "),a("Button",{directives:[{name:"show",rawName:"v-show",value:"complete"!==e.processActive,expression:"processActive !== 'complete'"}],staticClass:"c-btn-back",attrs:{type:"default",shape:"circle"},on:{click:e.backClick}},[e._v("返回")])],1)]),e._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"equ-import-process"},[a("span",{class:{active:"upload"==e.processActive}},[e._v("数据上传")]),e._v(" "),a("span",{class:{active:"validate"==e.processActive}},[e._v("数据验证")]),e._v(" "),a("span",{class:{active:"complete"==e.processActive}},[e._v("完成")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"upload"==e.processActive,expression:"processActive == 'upload'"}]},[a("div",{staticClass:"equ-import-upload"},[a("Upload",{ref:"upload",attrs:{name:"file",accept:".xls,.xlsx",format:["xls","xlsx"],"on-success":e.uploadSucess,"on-error":e.uploadError,action:e.importUrl}},[a("Button",{attrs:{type:"primary",shape:"circle"}},[e._v("文件上传")])],1)],1),e._v(" "),a("div",{staticClass:"equ-import-download"},[a("a",{attrs:{href:e.downExcel,download:""}},[e._v("导入模版下载"),a("Icon",{attrs:{type:"android-download"}})],1),e._v(" "),a("div",[e._v("上传文件数量不超过500条")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"validate"==e.processActive,expression:"processActive == 'validate'"}]},[a("ul",{staticClass:"validate-box clearfix"},[a("li",{staticClass:"all-validate"},[e._v("\r\n                    共"),a("em",[e._v(e._s(e.totalNum))]),e._v("行\r\n                ")]),e._v(" "),a("li",{staticClass:"all-pass"},[e._v("\r\n                    验证通过"),a("em",[e._v(e._s(e.passNum))]),e._v("行\r\n                ")]),e._v(" "),a("li",{staticClass:"all-error"},[e._v("\r\n                    错误"),a("em",[e._v(e._s(e.errNum))]),e._v("行\r\n                ")])]),e._v(" "),a("Tabs",{directives:[{name:"show",rawName:"v-show",value:!!e.errNum,expression:"!!errNum"}],attrs:{animated:!1}},[a("TabPane",{attrs:{label:"ICCID",icon:e.iccidImportResults.length?"information-circled":""}},[a("Table",{directives:[{name:"show",rawName:"v-show",value:e.iccidImportResults.length,expression:"iccidImportResults.length"}],attrs:{columns:e.iccidImportResultsColumns,data:e.iccidImportResults,loading:e.loading,stripe:""}}),e._v(" "),a("validate-pass",{attrs:{flag:!!e.iccidImportResults.length}})],1)],1),e._v(" "),a("validate-pass",{attrs:{flag:!!e.errNum}}),e._v(" "),a("Button",{directives:[{name:"show",rawName:"v-show",value:!e.errNum,expression:"!errNum"}],staticClass:"submit-btn",attrs:{type:"primary",shape:"circle"},on:{click:e.saveExcelData}},[e._v("确定导入")])],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"complete"==e.processActive,expression:"processActive == 'complete'"}],staticClass:"complete-box"},[a("Icon",{staticStyle:{color:"#56D43F"},attrs:{type:"checkmark-circled",size:"60"}}),e._v(" "),a("h3",[e._v("本次成功导入"+e._s(e.totalNum)+"行数据")]),e._v(" "),a("Button",{staticClass:"c-btn-back btn-back",attrs:{type:"primary",shape:"circle"},on:{click:e.backClick}},[e._v("返回上一级")])],1)])])};i._withStripped=!0;var r=a(569),n=a(11),o=(a(39),["upload","validate","complete"]),s={components:{"validate-pass":{props:{flag:Boolean},data:function(){return{}},template:'<div v-show="!flag" class="validate-pass-box"><span class="complete-icon"></span><span>文件确认通过</span></div>'}},data:function(){var e=this;return{downExcel:r.a.getExcel,importUrl:r.a.importExcel,processActive:o[0],totalNum:0,passNum:0,errNum:0,iccidImportResults:[],iccidImportResultsColumns:[{title:"行序号",key:"sim.index",minWidth:80,render:function(e,t){return e("span",t.row.sim.index)}},{title:"ICCID",key:"sim.iccid",render:function(t,a){return e.renderHandle(t,a,"sim","iccid")}},{title:"租户名称",key:"sim.userName",render:function(t,a){return e.renderHandle(t,a,"sim","userName")}},{title:"备注",key:"sim.remark",render:function(t,a){return e.renderHandle(t,a,"sim","remark")}},{title:"其他错误",key:"sim.otherError",minWidth:200,render:function(t,a){return e.renderHandle(t,a,"sim","otherError")}}],excelDataCachekey:"",loading:!1}},computed:{},methods:{backClick:function(){this.$router.back()},uploadSucess:function(e,t,a){if(e){if(e.outnumber)return this.$refs.upload.clearFiles(),this.$Modal.warning({title:"上传警告",render:function(e){return e("div",{class:{"import-modal":!0}},"上传数据已超过500行，请重新整理后上传！")}}),!1;this.processActive=o[1],this.iccidImportResults=this.dataHandle(e.importResults),this.excelDataCachekey=e.excelDataCachekey,this.totalNum=e.totalNum,this.passNum=e.passNum,this.errNum=e.errNum}},uploadError:function(e,t,a){this.$Message.error("文件上传失败！")},saveExcelData:function(){var e=this;this.errNum?this.$Message.error("Excel表格校验不通过！"):this.$http.get(r.a.saveExcelData,{excelDataCacheKey:this.excelDataCachekey}).then((function(t){t&&(e.$Notice.success({title:"成功！",desc:"数据保存成功",duration:3}),e.processActive=o[2])}))},cancelClick:function(){var e=this;this.processActive=o[0],this.$refs.upload.clearFiles(),this.excelDataCachekey&&this.$http.get(r.a.cancelExcelData,{excelDataCacheKey:this.excelDataCachekey}).then((function(t){e.$Notice.success({title:"取消导入",desc:"取消导入成功！",duration:3})}))},dataHandle:function(e){return e.forEach((function(e,t){e.validateResult.otherError="无",e.validateResult.iccidFormatError&&(e.validateResult.otherError="ICCID格式不正确"),e.validateResult.iccidNotExist&&(e.validateResult.otherError="ICCID不存在"),e.validateResult.userNameNotExist&&(e.validateResult.otherError="租户名称不存在"),e.validateResult.dbExistFlag&&(e.validateResult.otherError="数据库中已存在ICCID"),e.validateResult.excelRepeat&&(e.validateResult.otherError="Excel表中ICCID重复"),e.validateResult.remarkFormatError&&(e.validateResult.otherError="备注不可超过50字符")})),e},renderHandle:function(e,t,a,i,r){var o=t.row.validateResult[i],s=!o||"otherError"==i&&"无"==o?"#333":"red",l=o||t.row[a][i];return r&&(l=n.a.transDateFromServer(l)),e("span",{style:{color:s},attrs:{title:l}},l)}}},l=(a(1037),a(1)),c=Object(l.a)(s,i,[],!1,null,null,null);c.options.__file="src/views/sim/sim-manager/import.vue";t.default=c.exports},546:function(e,t,a){e.exports=a.p+"images/f9339ba968ba75b06c552a91fbe42722.jpg"},552:function(e,t,a){e.exports=a.p+"images/dcd735d5f12eb9b839b5bfcc73fbe386.png"},553:function(e,t,a){e.exports=a.p+"images/fbf666a5531edaf663783cc3a955a010.png"},569:function(e,t,a){"use strict";var i=a(22),r={sims:"/box/api/sim-manager/cards",updateData:"/box/api/sim-manager/cards/update",addCard:"/box/api/sim-manager/cards",getDetail:"/box/api/sim-manager/cards/detail",getChartData:"/box/api/sim-manager/card/flow",deleteCards:"/box/api/sim-manager/cards",getExcel:i.a+"/box/api/sim-manager/excel-temlate-down",importExcel:i.a+"/box/api/sim-manager/excel-import",saveExcelData:"/box/api/sim-manager/excel-data-save",cancelExcelData:"/box/api/sim-manager/excel-data-cancel",alarms:"/box/api/sim-alarm/alarms",addAlarm:"/box/api/sim-alarm/alarms",getAlarm:"/box/api/sim-alarm/alarm",updateAlarm:"/box/api/sim-alarm/alarm",deleteAlarms:"/box/api/sim-alarm/alarms"};t.a=r},743:function(e,t,a){var i=a(1038);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,a(17).default)("4096214b",i,!1,{})}}]);