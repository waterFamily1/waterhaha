(window.webpackJsonp=window.webpackJsonp||[]).push([[113],{1071:function(e,t,i){"use strict";var a=i(758);i.n(a).a},1072:function(e,t,i){var a=i(10),r=i(24),o=i(1073),n=i(546);t=a(!1);var s=r(o),l=r(n);t.push([e.i,"\n.import-mod-process {\n    margin: 20px auto;\n    width: 567px;\n    height: 107px;\n    background: url("+s+") no-repeat 0 0;\n}\n.import-mod-process-1 {\n    background-position: 0 0 !important;\n}\n.import-mod-process-2 {\n    background-position: 0 -107px !important;\n}\n.import-mod-process-3 {\n    background-position: 0 -214px !important;\n}\n.import-mod-upload {\n    height: 40px;\n    margin: 40px auto;\n    text-align: center;\n}\n.import-mod-download {\n    margin: 20px auto;\n    text-align: center;\n}\n.import-mod-info {\n    width: 600px;\n    height: 40px;\n    margin: 0 auto 20px;\n}\n.import-mod-info li {\n    float: left;\n    width: 200px;\n    height: 40px;\n    line-height: 40px;            \n    list-style: none;\n    text-align: center;\n}\n.import-mod-info li em {\n    margin: 0 20px;\n    font-size: 26px;\n    font-weight: 700;\n    font-style: normal;\n    color: #000;\n}\n.import-mod-info li:before{\n    content:'';\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin-right: 10px;\n    border-radius: 50%;\n}\n.import-mod-info-all:before {\n    background-color: #4b7efe;\n}\n.import-mod-info-true:before {\n    background-color: #55d43f;\n}\n.import-mod-info-false:before {\n    background-color: #e03d3e;\n}\n.import-mod-valid-tip {\n    border-top: 1px solid #dddee1;\n    margin: 30px auto;\n    padding: 30px 0 0;\n    text-align: center;\n}\n.import-mod-valid-img {\n    margin: 0 auto;\n    width: 80px;\n    height: 80px;\n    background:url("+l+") no-repeat;\n    background-size: 100%;\n}\n.import-mod-btn-back{\n    width:100px;\n    border:solid 1px #4b7efe;\n    color:#4b7efe;\n    background:#fff;\n}\n\n",""]),e.exports=t},1073:function(e,t,i){e.exports=i.p+"images/13bed65d5a5d76fa16728288be1c317b.png"},1137:function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"import-mod c-main-border"},[i("div",{staticClass:"c-left-border-blue"},[i("h3",[e._v(e._s(e.config.name))]),e._v(" "),i("div",{staticClass:"c-btns-right"},[i("Button",{directives:[{name:"show",rawName:"v-show",value:2==e.activeProcess,expression:"activeProcess == 2"}],attrs:{type:"primary",shape:"circle"},on:{click:e.redo}},[e._v("重新整理")]),e._v(" "),i("Button",{directives:[{name:"show",rawName:"v-show",value:2!=e.activeProcess,expression:"activeProcess != 2"}],staticClass:"c-btn-back",attrs:{type:"default",shape:"circle"},on:{click:e.back}},[e._v("返回")])],1)]),e._v(" "),i("div",{staticClass:"c-top-border-gray"},[i("div",{staticClass:"import-mod-process",class:"import-mod-process-"+e.activeProcess}),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:1==e.activeProcess,expression:"activeProcess == 1"}]},[i("div",{staticClass:"import-mod-upload"},[i("Upload",{attrs:{name:"file",data:{type:e.config.type},accept:e.config.accept,"show-upload-list":!1,format:e.config.format,"before-upload":e.beforeUpload,"on-success":e.uploadSucess,"on-error":e.uploadError,action:e.config.importUrl}},[i("Button",{staticStyle:{width:"120px","font-size":"14px"},attrs:{type:"primary",shape:"circle",loading:e.loading}},[e._v("文件上传")])],1)],1),e._v(" "),i("div",{staticClass:"import-mod-download"},[i("a",{staticStyle:{color:"#4b7efe"},attrs:{href:e.config.downloadUrl,download:""}},[e._v("导入模版下载 "),i("Icon",{attrs:{type:"android-download",color:"#4b7efe",size:"18"}})],1),e._v(" "),i("div",{staticStyle:{"margin-top":"20px",color:"#666"}},[e._v("(上传文件数量不超过"+e._s(e.config.max)+"条)")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2==e.activeProcess,expression:"activeProcess == 2"}]},[i("ul",{staticClass:"import-mod-info"},[i("li",{staticClass:"import-mod-info-all"},[e._v("\n                    共"),i("em",[e._v(e._s(e.totalNum))]),e._v("行\n                ")]),e._v(" "),i("li",{staticClass:"import-mod-info-true"},[e._v("\n                    验证通过"),i("em",[e._v(e._s(e.passNum))]),e._v("行\n                ")]),e._v(" "),i("li",{staticClass:"import-mod-info-false"},[e._v("\n                    错误"),i("em",[e._v(e._s(e.errNum))]),e._v("行\n                ")])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.errNum>0,expression:"errNum > 0"}]},[i("Table",{attrs:{columns:e.config.columns,data:e.tableDatas,stripe:""}})],1),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0==e.errNum,expression:"errNum == 0"}]},[i("div",{staticClass:"import-mod-valid-tip"},[i("div",{staticClass:"import-mod-valid-img"}),e._v(" "),i("div",{staticStyle:{"line-height":"50px"}},[e._v("文件确认通过")]),e._v(" "),i("div",[i("Button",{staticStyle:{margin:"20px auto",width:"100px"},attrs:{type:"primary",shape:"circle",loading:e.submitLoading},on:{click:e.submit}},[e._v("确定导入")])],1)])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:3==e.activeProcess,expression:"activeProcess == 3"}]},[i("div",{staticStyle:{"text-align":"center",margin:"0 auto"}},[i("Icon",{attrs:{type:"checkmark-circled",color:"#56D43F",size:"60"}}),e._v(" "),i("h4",{staticStyle:{"line-height":"50px"}},[e._v("本次成功导入"+e._s(e.totalNum)+"行数据")]),e._v(" "),i("Button",{staticClass:"import-mod-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:e.back}},[e._v("返回上一级")])],1)])])])};a._withStripped=!0;i(527),i(11),i(39);var r=i(22),o={cancel:"/uaa/api/excel/cancel",import:"/uaa/api/excel/import",template:r.a+"/uaa/api/excel/template",validate:r.a+"/uaa/api/excel/validate"},n={cancel:"/equipment/api/excel/cancel",import:"/equipment/api/excel/import",template:r.a+"/equipment/api/excel/template",validate:r.a+"/equipment/api/excel/validate"},s={cancel:"/loong/api/alarm-definitions/excel/cancel",import:"/loong/api/alarm-definitions/excel/import",template:r.a+"/loong/api/alarm-definitions/excel/template",validate:r.a+"/loong/api/alarm-definitions/excel/validate"},l={cancel:"/patrol/api/excel/cancel",import:"/patrol/api/excel/import",template:r.a+"/patrol/api/excel/template?type=point",validate:r.a+"/patrol/api/excel/validate?type=point"};function p(e,t){var i=t.row[t.column.key].toString().split("Error:");return i.length>1?e("span",{style:{color:"#e03d3e"},attrs:{title:i[1]}},i[1]):e("span",{attrs:{title:i[0]}},i[0])}var c={user:{name:"用户导入",type:"user",importUrl:o.validate,downloadUrl:o.template+"?type=user",saveUrl:o.import,cancelUrl:o.cancel,accept:".xls,.xlsx",format:["xls","xlsx"],max:500,columns:[{title:"行号",key:"index",render:p},{title:"用户姓名",key:"name",render:p},{title:"所属组织 ",key:"orgName",render:p},{title:"手机号",key:"tel",render:p},{title:"邮箱",key:"email",render:p},{title:"其他错误",key:"otherError",render:p}]},process:{name:"区域位置导入",type:"process",importUrl:o.validate,downloadUrl:o.template+"?type=process",saveUrl:o.import,cancelUrl:o.cancel,accept:".xls,.xlsx",format:["xls","xlsx"],max:500,columns:[{title:"行号",key:"index",render:p},{title:"区域位置名称",key:"name",render:p},{title:"位置类型 ",key:"type",render:p},{title:"备注",key:"remarks",render:p},{title:"经度",key:"longitude",render:p},{title:"纬度",key:"latitude",render:p},{title:"上级区域位置路径",key:"parentNamePath",render:p},{title:"其他错误",key:"otherError",render:p}]},"equ-type":{name:"设备类型导入",type:"equtype",importUrl:n.validate,downloadUrl:n.template+"?type=equtype",saveUrl:n.import,cancelUrl:n.cancel,accept:".xls,.xlsx",format:["xls","xlsx"],max:500,columns:[{title:"行号",key:"index",render:p},{title:"设备类型名称",key:"name",render:p},{title:"所属组织",key:"orgName",render:p},{title:"上级组织/类型路径",key:"parentNamePath",render:p},{title:"备注",key:"remarks",render:p},{title:"其他错误",key:"otherError",render:p}]},"alarm-definition":{name:"报警定义导入",type:"alarmDefinition",importUrl:s.validate,downloadUrl:s.template,saveUrl:s.import,cancelUrl:s.cancel,accept:".xls,.xlsx",format:["xls","xlsx"],max:500,columns:[{title:"行号",key:"index",render:p},{title:"区域位置",key:"siteName",render:p},{title:"报警名称",key:"alarmName",render:p},{title:"确认方法",key:"disarmMethod",render:p},{title:"报警等级",key:"alarmLevel",render:p},{title:"触发时间",key:"alarmWaitTime",render:p},{title:"使用状态",key:"enabledStatus",render:p},{title:"报警条件",key:"alarmCondition",render:p},{title:"测点名称",key:"mpointName",render:p},{title:"条件",key:"symbol",render:p},{title:"阀值",key:"threshold",render:p},{title:"预案内容",key:"processingPlan",render:p},{title:"联系人",key:"contactPersonName",render:p},{title:"其他错误",key:"otherError",render:p}]},"patrol-point":{name:"巡检点导入",type:"patrolPoint",importUrl:l.validate,downloadUrl:l.template,saveUrl:l.import,cancelUrl:l.cancel,accept:".xls,.xlsx",format:["xls","xlsx"],max:500,columns:[{title:"行号",key:"index",render:p},{title:"区域位置",key:"processName",render:p},{title:"名称",key:"pointName",render:p},{title:"描述",key:"description",render:p},{title:"步骤名称",key:"stepName",render:p},{title:"结果类型",key:"resultType",render:p},{title:"绑定测点",key:"mpointName",render:p},{title:"其他错误",key:"otherError",render:p}]}},d={data:function(){return{activeProcess:1,config:{},totalNum:0,passNum:0,errNum:0,tableDatas:[],excelDataCachekey:"",loading:!1,submitLoading:!1}},created:function(){this.$route.params.id&&(this.config=c[this.$route.params.id]),this.config||this.$Message.error("错误 ： 导入模块未配置")},methods:{back:function(){this.$router.back()},beforeUpload:function(){this.loading=!0},uploadSucess:function(e,t,i){if(this.loading=!1,e){if(this.activeProcess=2,this.totalNum=e.totalNum,this.passNum=e.passNum,this.errNum=e.errNum,e.outLimitNum)return this.$Notice.error({title:"上传失败",desc:"上传数据已超过500行，请重新整理后上传！",duration:5}),!1;if(null!==e.allowCreateNum)return this.$Notice.error({title:"上传失败",desc:"剩余可创建量："+e.allowCreateNum+"，此次导入将达到购买上限，请重新整理后上传！",duration:5}),!1;if(this.errNum>0){var a=e.sheetValidateResults[0].rowValidateResults,r=[];a.forEach((function(e){for(var t in e.validateResult)null!==e.validateResult[t]&&(e.originalData[t]="Error:"+e.validateResult[t]);r.push(e.originalData)})),this.tableDatas=r}else this.excelDataCachekey=e.excelDataCachekey}},uploadError:function(e,t,i){var a=t.title||"文件上传失败！";this.loading=!1,this.$Notice.error({title:"上传失败",desc:a,duration:5})},submit:function(){var e=this;this.submitLoading=!0,this.$http.post(this.config.saveUrl,{excelDataCacheKey:this.excelDataCachekey}).then((function(t){e.submitLoading=!1,t&&(e.$Notice.success({title:"成功！",desc:"数据保存成功",duration:3}),e.activeProcess=3)})).catch((function(){e.submitLoading=!1}))},redo:function(){this.excelDataCachekey&&this.$http.del(this.config.cancelUrl,{excelDataCacheKey:this.excelDataCachekey}),this.activeProcess=1}}},m=(i(1071),i(1)),u=Object(m.a)(d,a,[],!1,null,null,null);u.options.__file="src/views/import/import.vue";t.default=u.exports},527:function(e,t,i){"use strict";var a=i(22),r={getWarehouseComboList:"/inventory/api/warehouse/comboList",getManaginguser:"/inventory/api/users/managinguser",category:{getTree:"/inventory/api/materiel-category/tree",getInfo:"/inventory/api/materiel-category/materiel",add:"/inventory/api/materiel-category/materiel",edit:"/inventory/api/materiel-category/materiel",del:"/inventory/api/materiel-category/materiel",search:"/inventory/api/materiel-category/list"},inventory:{audit:"/inventory/api/store-adjustment/audited",export:a.a+"/inventory/api/store-adjustment/export",url:"/inventory/api/store-adjustment/adjusment",list:"/inventory/api/store-adjustment/list",detailList:"/inventory/api/store-adjustment/detail/list",itemList:"/inventory/api/store-adjustment/materiel/list",move:"/inventory/api/store-adjustment/move",materielSearch:"/inventory/api/stock/materiel",materielPosition:"/inventory/api/stock/position",materielDepot:"/inventory/api/stock/warehous"},takeStock:{audit:"/inventory/api/materiel-inventory/audited",export:a.a+"/inventory/api/materiel-inventory/export",import:a.a+"/inventory/api/materiel-inventory/import",url:"/inventory/api/materiel-inventory/inventory",detailList:"/inventory/api/materiel-inventory/detail/list",list:"/inventory/api/materiel-inventory/list"},storage:{comboList:"/inventory/api/warehouse/comboList"},material:{getMaterielCategoryTree:"/inventory/api/materiel-category/tree/external",getMateriel:"/inventory/api/materiels",delMateriel:"/inventory/api/materiels",exportMateriel:a.a+"/inventory/api/materiels/excel-export",addMateriel:"/inventory/api/materiel",changeMateriel:"/inventory/api/materiel",getMaterielDetail:"/inventory/api/materiel",getDistribution:"/inventory/api/materielStocks/distribution",getMaterielStockLimits:"/inventory/api/materielStockLimits",bacthAddMaterielStockLimit:"/inventory/api/materielStockLimit/batch-save",updateMaterielStockLimit:"/inventory/api/materielStockLimit",delMaterielStockLimit:"/inventory/api/materielStockLimits",getUnitList:"/inventory/api/materiel/unit",modalMateriel:"/inventory/api/materiel/external",getExcel:a.a+"/inventory/api/excel-temlate-down",importExcel:a.a+"/inventory/api/excel-import",cancelExcelData:"/inventory/api/excel-data-cancel",saveExcelData:"/inventory/api/excel-data-save"},repertory:{getWarehouses:"/inventory/api/warehouses",exportWarehouse:a.a+"/inventory/api/warehouse/excel-export",delWarehouses:"/inventory/api/warehouses",changeWarehouses:"/inventory/api/warehouse",addWarehouse:"/inventory/api/warehouse",getWarehouseDetail:"/inventory/api/warehouse",getWarehouseInfo:"/inventory/api/warehouse/getWarehouseInfo",getPositionOfWarehouse:"/inventory/api/warehousePosition/positionList",bacthAddWarehouseposition:"/inventory/api/warehouseposition/batch-save",updateWarehousePosition:"/inventory/api/warehousePosition",delWarehousePosition:"/inventory/api/warehousePositions",positionByWarehouse:"/inventory/api/warehousePosition/move",checkWarehousenameIsExist:"/inventory/api/warehouse/check-warehousename-isexist",getExcel:a.a+"/inventory/api/warehousePosition/excel-temlate-down",importExcel:a.a+"/inventory/api/warehousePosition/excel-import",cancelExcelData:"/inventory/api/warehousePosition/excel-data-cancel",saveExcelData:"/inventory/api/warehousePosition/excel-data-save"},checkin:{getInbond:"/inventory/api/inbounds",delInbond:"/inventory/api/inbounds",addInbond:"/inventory/api/inbound",getInbondDetail:"/inventory/api/inbound",getInbondRecordList:"/inventory/api/inbound/inboundDetails",getPositionComboxList:"/inventory/api/warehousePosition/positionComboxList",auditeInbound:"/inventory/api/inbound/audite",getMaterielsByWareHouseNo:"/inventory/api/materiel/getMaterielsByWareHouseNo",getMateriels:"/inventory/api/materiel/getMateriels",updateInboundDetail:"/inventory/api/inboundDetail"},checkout:{getApplicantMember:"/uaa/api/users/select",getOutbond:"/inventory/api/outbounds",delOutbond:"/inventory/api/outbounds",addOutbond:"/inventory/api/outbound",getOutbondDetail:"/inventory/api/outbound",getOutbondRecordList:"/inventory/api/outboundDetail",auditeOutbound:"/inventory/api/outbound/audite",updateOutboundDetail:"/inventory/api/outboundDetail",getstock:"/inventory/api/stock/getstock",getMaterielsOutBound:"/inventory/api/materiel/getMaterielsOutBound"},allot:{getTransfer:"/inventory/api/transfer/list",delTransfer:"/inventory/api/transfer/transfer",addTransfer:"/inventory/api/transfer/transfer",getTransferDetail:"/inventory/api/transfer/transfer",getTransferDetailList:"/inventory/api/transfer/detail/list",auditTransfer:"/inventory/api/transfer/audited",updateTransfer:"/inventory/api/transfer/transfer",getMaterielList:"/inventory/api/transfer/materiel/list",getStockPosiComboList:"/inventory/api/stock/position",getWarehousePosition:"/inventory/api/warehousePosition/move"},reporting:{getStockInfo:"/inventory/api/stock/getstock-info",exportStockInfo:a.a+"/inventory/api/stock/getstock-info-excel-export",getStockInoutbound:"/inventory/api/stock/getstock-info-inoutbound",exportStockInoutbound:a.a+"/inventory/api/stock/getstock-info-inoutbound-excel-export",getStockMove:"/inventory/api/stock/get-inventory-mobility-report",exportStockMove:a.a+"/inventory/api/stock/get-inventory-mobility-report-excel-export",getInventoryProfitLossList:"/inventory/api/materiel-inventory/inventory-report",exportInventoryProfitLoss:a.a+"/inventory/api/materiel-inventory/inventory-report-export",getInventoryNumberList:"/inventory/api/materiel-inventory/inventory-report-inventory-number"}};t.a=r},546:function(e,t,i){e.exports=i.p+"images/f9339ba968ba75b06c552a91fbe42722.jpg"},758:function(e,t,i){var a=i(1072);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,i(17).default)("b516303c",a,!1,{})}}]);