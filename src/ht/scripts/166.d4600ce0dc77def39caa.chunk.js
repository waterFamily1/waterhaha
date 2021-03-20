(window.webpackJsonp=window.webpackJsonp||[]).push([[166],{1197:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[e._v("物料新增")]),e._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{directives:[{name:"role",rawName:"v-role",value:"material-add",expression:"'material-add'"}],attrs:{type:"primary",shape:"circle",loading:e.submitLoading},on:{click:e.submit}},[e._v("保存")]),e._v(" "),a("Button",{staticClass:"c-btn-back",attrs:{type:"default",shape:"circle"},on:{click:e.backClick}},[e._v("取消")])],1)]),e._v(" "),a("Form",{ref:"materialAddForm",attrs:{model:e.params,rules:e.formRules,"label-width":100}},[a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"orgId",label:"组织信息："}},[a("dropdown-tree",{attrs:{url:e.orgTreeApi},on:{input:e.chooseOrg},model:{value:e.org,callback:function(t){e.org=t},expression:"org"}})],1)],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"materielName",label:"物料名称："}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"text"},model:{value:e.params.materielName,callback:function(t){e.$set(e.params,"materielName",t)},expression:"params.materielName"}})],1)],1)]),e._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"materielCategoryId",label:"物料类别："}},[a("dropdown-tree",{attrs:{data:e.materielCategoryArr},on:{input:e.chooseMaterialCategory},model:{value:e.materielCategory,callback:function(t){e.materielCategory=t},expression:"materielCategory"}})],1)],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"abc",label:"ABC分类："}},[a("Select",{staticStyle:{width:"300px"},model:{value:e.params.abc,callback:function(t){e.$set(e.params,"abc",t)},expression:"params.abc"}},e._l(e.ABCClassify,(function(t,i){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1)]),e._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"measurementUnit",label:"计量单位："}},[a("Select",{staticStyle:{width:"300px"},model:{value:e.params.measurementUnit,callback:function(t){e.$set(e.params,"measurementUnit",t)},expression:"params.measurementUnit"}},e._l(e.unit,(function(t,i){return a("Option",{key:t.id,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"standard",label:"规格："}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"text"},model:{value:e.params.standard,callback:function(t){e.$set(e.params,"standard",t)},expression:"params.standard"}})],1)],1)]),e._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{label:"品牌："}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"text"},model:{value:e.params.brand,callback:function(t){e.$set(e.params,"brand",t)},expression:"params.brand"}})],1)],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{label:"型号："}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"text"},model:{value:e.params.model,callback:function(t){e.$set(e.params,"model",t)},expression:"params.model"}})],1)],1)]),e._v(" "),a("div",{staticClass:"c-form-row-1col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{label:"备注："}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea"},model:{value:e.params.remark,callback:function(t){e.$set(e.params,"remark",t)},expression:"params.remark"}})],1)],1)])]),e._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"c-plain-bg-h"},[a("h3",[e._v("存储上下限")]),e._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle",size:"small"},on:{click:e.addRow}},[e._v("新增")])],1)]),e._v(" "),a("Table",{attrs:{columns:e.columns,data:e.params.materielStockLimits,loading:e.loading,stripe:""}})],1)])],1)};i._withStripped=!0;var r=a(23),o=a(11),n=a(145),s=a(527),l=a(107),m=[],c={data:function(){var e=this;return{ABCClassify:[{label:"A",value:"A"},{label:"B",value:"B"},{label:"C",value:"C"}],unit:[],materielCategoryArr:[],org:{id:"",title:"请选择"},materielCategory:{id:"",title:"请选择"},params:{orgId:"",orgName:"",materielName:"",materielCategoryId:"",abc:"",measurementUnit:"",standard:"",brand:"",model:"",remark:"",materielStockLimits:[]},submitLoading:!1,formRules:{orgId:[{required:!0,validator:function(e,t,a){t?a():a(new Error("请选择组织"))}}],materielName:[{required:!0,message:"物料名称不能为空",trigger:"blur"}],materielCategoryId:[{required:!0,validator:function(e,t,a){t?a():a(new Error)},message:"请选择物科类别",trigger:"change"}],abc:[{required:!0,message:"请选择ABC分类",trigger:"change"}],measurementUnit:[{required:!0,message:"请选择计量单位",trigger:"change"}],standard:[{required:!0,message:"规格不能为空",trigger:"blur"}]},orgTreeApi:l.a.getOrgTreeData,columns:[{title:"仓库名称",key:"warehouseName",render:function(t,a){return t("Select",{props:{placeholder:"请选择",value:a.row.warehouseNo,"label-in-value":!0},on:{"on-change":function(t){a.row.warehouseNo=t.value,a.row.warehouseName=t.label,e.params.materielStockLimits[a.index]=a.row}}},m.map((function(e,a){return t("Option",{props:{value:e.warehouseNo,label:e.warehouseName}})})))}},{title:"下限",key:"lower",render:function(t,a){return t("div",[t("InputNumber",{props:{min:0,precision:2,value:a.row.lower},on:{input:function(t){a.row.lower=t,e.params.materielStockLimits[a.index]=a.row}}})])}},{title:"上限",key:"upper",render:function(t,a){return t("div",[t("InputNumber",{props:{min:0,precision:2,value:a.row.upper},on:{input:function(t){a.row.upper=t,e.params.materielStockLimits[a.index]=a.row}}})])}},{title:"操作",key:"act",render:function(t,a){return t("div",[t("a",{attrs:{href:"javascript:;"},style:{color:"#4b7efe",margin:"0 10px 0 0"},on:{click:function(){e.params.materielStockLimits.splice(a.index,1)}}},"删除")])}}],loading:!1}},computed:Object(r.b)({account:function(e){return e.user.account}}),methods:{initData:function(){var e="",t="";this.account.orgChain.reverse().some((function(a){return 2==a.type&&(e=a.id,t=a.name,!0)})),e&&t&&(this.org.id=e,this.org.title=t,this.params.orgId=e,this.params.orgName=t,this.getMaterielCategoryTree(this.org.id))},submit:function(){var e=this,t=this;this.params.orgId=this.org.id,this.params.orgName=this.org.title,this.params.materielCategoryId=this.materielCategory.id,this.$refs.materialAddForm.validate((function(a){if(a)if(0==e.params.materielStockLimits.length)e.$Modal.confirm({title:"提示",content:"尚未增加存储上下限，确认提交吗？",onOk:function(){e.submitLoading=!0,e.$http.post(s.a.material.addMateriel,e.params).then((function(a){e.submitLoading=!1,a.id&&(e.$Notice.success({title:"保存成功！"}),t.$router.push({name:"storage-material-detail",params:{id:a.id}}))})).catch((function(){e.submitLoading=!1}))},onCancel:function(){}});else{if(t.params.materielStockLimits.some((function(e,a){return e.warehouseName?e.lower?e.upper?e.upper<e.lower&&(t.$Notice.warning({title:"第"+(a+1)+"行中输入的上限不应该小于下限"}),!0):(t.$Notice.warning({title:"请输入第"+(a+1)+"行中的上限"}),!0):(t.$Notice.warning({title:"请输入第"+(a+1)+"行中的下限"}),!0):(t.$Notice.warning({title:"请选择第"+(a+1)+"行中的仓库名称"}),!0)})))return!1;e.submitLoading=!0,e.$http.post(s.a.material.addMateriel,e.params).then((function(t){e.submitLoading=!1,t.id&&(e.$Notice.success({title:"保存成功！"}),e.$router.push({name:"storage-material-detail",params:{id:t.id}}))})).catch((function(){e.submitLoading=!1}))}}))},backClick:function(){this.$router.back()},chooseOrg:function(e){this.params.orgId=this.org.id,this.materielCategoryArr=[],this.params.materielCategoryId="",e.id&&this.getMaterielCategoryTree(e.id)},getMaterielCategoryTree:function(e){var t=this;this.$http.get(s.a.material.getMaterielCategoryTree,{orgId:e}).then((function(e){e.forEach((function(e){e.name=e.categoryName})),t.materielCategoryArr=o.a.transDataToTree(e)}))},chooseMaterialCategory:function(){this.params.materielCategoryId=this.materielCategory.id},addRow:function(){this.params.materielStockLimits.push({warehouseName:"",warehouseNo:"",upper:0,lower:0})}},created:function(){var e=this;o.a.initTableColumnTitle(this.columns),this.$http.get(s.a.material.getUnitList).then((function(t){e.unit=t})),this.$http.get(s.a.getWarehouseComboList).then((function(e){m=e})),this.initData()},components:{dropdownTree:n.a}},p=a(1),u=Object(p.a)(c,i,[],!1,null,null,null);u.options.__file="src/views/storage/material/add.vue";t.default=u.exports},527:function(e,t,a){"use strict";var i=a(22),r={getWarehouseComboList:"/inventory/api/warehouse/comboList",getManaginguser:"/inventory/api/users/managinguser",category:{getTree:"/inventory/api/materiel-category/tree",getInfo:"/inventory/api/materiel-category/materiel",add:"/inventory/api/materiel-category/materiel",edit:"/inventory/api/materiel-category/materiel",del:"/inventory/api/materiel-category/materiel",search:"/inventory/api/materiel-category/list"},inventory:{audit:"/inventory/api/store-adjustment/audited",export:i.a+"/inventory/api/store-adjustment/export",url:"/inventory/api/store-adjustment/adjusment",list:"/inventory/api/store-adjustment/list",detailList:"/inventory/api/store-adjustment/detail/list",itemList:"/inventory/api/store-adjustment/materiel/list",move:"/inventory/api/store-adjustment/move",materielSearch:"/inventory/api/stock/materiel",materielPosition:"/inventory/api/stock/position",materielDepot:"/inventory/api/stock/warehous"},takeStock:{audit:"/inventory/api/materiel-inventory/audited",export:i.a+"/inventory/api/materiel-inventory/export",import:i.a+"/inventory/api/materiel-inventory/import",url:"/inventory/api/materiel-inventory/inventory",detailList:"/inventory/api/materiel-inventory/detail/list",list:"/inventory/api/materiel-inventory/list"},storage:{comboList:"/inventory/api/warehouse/comboList"},material:{getMaterielCategoryTree:"/inventory/api/materiel-category/tree/external",getMateriel:"/inventory/api/materiels",delMateriel:"/inventory/api/materiels",exportMateriel:i.a+"/inventory/api/materiels/excel-export",addMateriel:"/inventory/api/materiel",changeMateriel:"/inventory/api/materiel",getMaterielDetail:"/inventory/api/materiel",getDistribution:"/inventory/api/materielStocks/distribution",getMaterielStockLimits:"/inventory/api/materielStockLimits",bacthAddMaterielStockLimit:"/inventory/api/materielStockLimit/batch-save",updateMaterielStockLimit:"/inventory/api/materielStockLimit",delMaterielStockLimit:"/inventory/api/materielStockLimits",getUnitList:"/inventory/api/materiel/unit",modalMateriel:"/inventory/api/materiel/external",getExcel:i.a+"/inventory/api/excel-temlate-down",importExcel:i.a+"/inventory/api/excel-import",cancelExcelData:"/inventory/api/excel-data-cancel",saveExcelData:"/inventory/api/excel-data-save"},repertory:{getWarehouses:"/inventory/api/warehouses",exportWarehouse:i.a+"/inventory/api/warehouse/excel-export",delWarehouses:"/inventory/api/warehouses",changeWarehouses:"/inventory/api/warehouse",addWarehouse:"/inventory/api/warehouse",getWarehouseDetail:"/inventory/api/warehouse",getWarehouseInfo:"/inventory/api/warehouse/getWarehouseInfo",getPositionOfWarehouse:"/inventory/api/warehousePosition/positionList",bacthAddWarehouseposition:"/inventory/api/warehouseposition/batch-save",updateWarehousePosition:"/inventory/api/warehousePosition",delWarehousePosition:"/inventory/api/warehousePositions",positionByWarehouse:"/inventory/api/warehousePosition/move",checkWarehousenameIsExist:"/inventory/api/warehouse/check-warehousename-isexist",getExcel:i.a+"/inventory/api/warehousePosition/excel-temlate-down",importExcel:i.a+"/inventory/api/warehousePosition/excel-import",cancelExcelData:"/inventory/api/warehousePosition/excel-data-cancel",saveExcelData:"/inventory/api/warehousePosition/excel-data-save"},checkin:{getInbond:"/inventory/api/inbounds",delInbond:"/inventory/api/inbounds",addInbond:"/inventory/api/inbound",getInbondDetail:"/inventory/api/inbound",getInbondRecordList:"/inventory/api/inbound/inboundDetails",getPositionComboxList:"/inventory/api/warehousePosition/positionComboxList",auditeInbound:"/inventory/api/inbound/audite",getMaterielsByWareHouseNo:"/inventory/api/materiel/getMaterielsByWareHouseNo",getMateriels:"/inventory/api/materiel/getMateriels",updateInboundDetail:"/inventory/api/inboundDetail"},checkout:{getApplicantMember:"/uaa/api/users/select",getOutbond:"/inventory/api/outbounds",delOutbond:"/inventory/api/outbounds",addOutbond:"/inventory/api/outbound",getOutbondDetail:"/inventory/api/outbound",getOutbondRecordList:"/inventory/api/outboundDetail",auditeOutbound:"/inventory/api/outbound/audite",updateOutboundDetail:"/inventory/api/outboundDetail",getstock:"/inventory/api/stock/getstock",getMaterielsOutBound:"/inventory/api/materiel/getMaterielsOutBound"},allot:{getTransfer:"/inventory/api/transfer/list",delTransfer:"/inventory/api/transfer/transfer",addTransfer:"/inventory/api/transfer/transfer",getTransferDetail:"/inventory/api/transfer/transfer",getTransferDetailList:"/inventory/api/transfer/detail/list",auditTransfer:"/inventory/api/transfer/audited",updateTransfer:"/inventory/api/transfer/transfer",getMaterielList:"/inventory/api/transfer/materiel/list",getStockPosiComboList:"/inventory/api/stock/position",getWarehousePosition:"/inventory/api/warehousePosition/move"},reporting:{getStockInfo:"/inventory/api/stock/getstock-info",exportStockInfo:i.a+"/inventory/api/stock/getstock-info-excel-export",getStockInoutbound:"/inventory/api/stock/getstock-info-inoutbound",exportStockInoutbound:i.a+"/inventory/api/stock/getstock-info-inoutbound-excel-export",getStockMove:"/inventory/api/stock/get-inventory-mobility-report",exportStockMove:i.a+"/inventory/api/stock/get-inventory-mobility-report-excel-export",getInventoryProfitLossList:"/inventory/api/materiel-inventory/inventory-report",exportInventoryProfitLoss:i.a+"/inventory/api/materiel-inventory/inventory-report-export",getInventoryNumberList:"/inventory/api/materiel-inventory/inventory-report-inventory-number"}};t.a=r}}]);