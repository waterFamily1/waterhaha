(window.webpackJsonp=window.webpackJsonp||[]).push([[138],{1013:function(t,e,i){"use strict";var a=i(731);i.n(a).a},1014:function(t,e,i){(e=i(10)(!1)).push([t.i,"\n.material .ivu-tabs-bar {\r\n  margin-bottom: 0;\n}\n.ivu-modal-confirm-body {\r\n  padding-right: 48px;\n}\r\n",""]),t.exports=e},1242:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"material  c-main-border"},[i("div",{staticClass:"c-left-border-blue"},[i("h3",[t._v("调拨信息")]),t._v(" "),i("div",{staticClass:"c-btns-right"},[0==t.detailInfo.auditedFlag?i("Button",{attrs:{type:"primary",shape:"circle"},on:{click:t.audit}},[t._v("审核")]):t._e(),t._v(" "),i("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:t.back}},[t._v("返回")])],1)]),t._v(" "),i("div",{staticClass:"c-top-border-gray c-form-data-show"},[i("div",{staticClass:"c-form-row-2col"},[i("div",{staticClass:"c-form-item"},[i("label",[t._v("调拨记录单：")]),t._v("\n                    "+t._s(t.detailInfo.transferNumber)+"\n                ")]),t._v(" "),i("div",{staticClass:"c-form-item"},[i("label",[t._v("组织信息：")]),t._v("\n                    "+t._s(t.detailInfo.orgName)+"\n                ")])]),t._v(" "),i("div",{staticClass:"c-form-row-2col"},[i("div",{staticClass:"c-form-item"},[i("label",[t._v("创建人员：")]),t._v("\n                    "+t._s(t.detailInfo.userName)+"\n                ")]),t._v(" "),i("div",{staticClass:"c-form-item"},[i("label",[t._v("创建时间：")]),t._v("\n                    "+t._s(t.detailInfo.createDate)+"\n                ")])]),t._v(" "),i("div",{staticClass:"c-form-row-2col"},[i("div",{staticClass:"c-form-item"},[i("label",[t._v("出库仓库：")]),t._v("\n                    "+t._s(t.detailInfo.warehouseOutName)+"\n                ")]),t._v(" "),i("div",{staticClass:"c-form-item"},[i("label",[t._v("入库仓库：")]),t._v("\n                    "+t._s(t.detailInfo.warehouseInName)+"\n                ")])]),t._v(" "),i("div",{staticClass:"c-form-row-2col"},[i("div",{staticClass:"c-form-item"},[i("label",[t._v("审核状态：")]),t._v("\n                    "+t._s(t.auditStateText[t.detailInfo.auditedFlag])+"\n                ")]),t._v(" "),i("div",{staticClass:"c-form-item"},[i("label",[t._v("备注：")]),t._v("\n                    "+t._s(t.detailInfo.remark)+"\n                ")])])]),t._v(" "),i("div",{staticClass:"c-top-border-gray"},[i("div",{staticClass:"c-plain-bg-h"},[i("h3",[t._v("调拨明细")]),t._v(" "),i("div",{staticClass:"c-btns-right"},[0!=t.detailInfo.auditedFlag||t.isEdit||0==t.listData?t._e():i("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle",size:"small"},on:{click:t.edit}},[t._v("编辑")]),t._v(" "),t.isEdit?i("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle",size:"small"},on:{click:t.submit}},[t._v("提交")]):t._e(),t._v(" "),t.isEdit?i("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle",size:"small"},on:{click:t.cancel}},[t._v("取消")]):t._e()],1)]),t._v(" "),i("div",{staticClass:"padding10-0"},[i("Input",{staticStyle:{width:"180px"},attrs:{placeholder:"物料编号或物料名称",clearable:""},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)}},model:{value:t.searchParams.queryName,callback:function(e){t.$set(t.searchParams,"queryName",e)},expression:"searchParams.queryName"}}),t._v(" "),i("Button",{staticClass:"c-btn-add",attrs:{type:"primary"},on:{click:t.search}},[t._v("搜索")])],1),t._v(" "),i("Table",{attrs:{columns:t.columns,data:t.listData,loading:t.loading,stripe:""}}),t._v(" "),i("Page",{staticClass:"table-page",attrs:{total:t.total,"page-size":t.searchParams.pageSize,current:t.searchParams.currentPage,"show-total":"","show-elevator":""},on:{"on-change":t.pageChange}})],1)])};a._withStripped=!0;var n=i(23),o=i(11),r=i(527),s=[],l={data:function(){var t=this;return{isEdit:!1,detailInfo:{},searchParams:{id:"",queryName:"",currentPage:1,pageSize:5},total:0,loading:!1,loadingByIn:!1,storagePosByIn:[],columns:[{title:"物料编号",key:"materielNumber"},{title:"物料名称",key:"materielName"},{title:"型号",key:"model"},{title:"规格",key:"standard"},{title:"出库库位",key:"warehousePositionOutName"},{title:"出库库存数量",key:"storageAmount"},{title:"入库库位",key:"warehousePositionInName",render:function(e,i){var a=t;return a.isEdit?e("div",[e("Select",{props:{"label-in-value":!0,value:i.row.warehousePositionInName||"",filterable:!0,remote:!0,"remote-method":a.remoteMethodByPositionIn,loading:a.loadingByIn},on:{"on-change":function(t){Object.assign(a.listData[i.index],{warehousePositionInName:t.label,warehousePositionInId:t.value})},"on-open-change":function(t){t&&(a.storagePosByIn=[],a.remoteMethodByPositionIn(a.listData[i.index].warehousePositionInName))}}},a.storagePosByIn.map((function(t){return e("Option",{props:{value:t.id,label:t.locationNo}})})))]):e("div",i.row.warehousePositionInName)}},{title:"调拨数量",key:"amount",render:function(e,i){var a=t;return a.isEdit?e("div",[e("InputNumber",{props:{value:i.row.amount||0,disabled:!a.isEdit},on:{input:function(t){a.listData[i.index].amount=t}}})]):e("div",i.row.amount)}},{title:"计量单位",key:"measurementUnit"}],listData:[]}},computed:Object(n.b)({auditState:function(t){return t.map.storage.inventory.auditState},auditStateText:function(t){return t.map.storage.inventory.auditStateText}}),methods:{back:function(){this.$router.back()},getList:function(){var t=this;this.loading=!0,this.$http.get(r.a.allot.getTransferDetailList,this.searchParams).then((function(e){s=[],t.listData=[],e.items.forEach((function(e){e.amount||(e.amount=0),s.push(Object.assign({},e)),t.listData.push(Object.assign({},e))})),t.listData.forEach((function(t){var e=t.amount;delete t.amount,t.amount=e})),t.total=e.total,t.loading=!1}))},search:function(){this.searchParams.currentPage=1,this.getList()},pageChange:function(t){this.searchParams.currentPage=t,this.getList()},edit:function(){this.isEdit=!0},audit:function(){var t=this;this.$Modal.confirm({title:"审核提示",content:"请确认该调拨单所有物料已完成出库，审核后将对物料库存数量调整",onOk:function(){t.$http.get(r.a.allot.auditTransfer,{id:t.$route.params.id}).then((function(e){t.$Notice.success({title:"成功",desc:"审核成功！"}),t.$router.back()}))}})},remoteMethodByPositionIn:function(t){var e=this;this.loadingByIn=!0,this.getPositionComboxListByIn({warehouseId:this.detailInfo.warehouseInId,queryName:t},(function(t){e.loadingByIn=!1,e.storagePosByIn=t}))},getPositionComboxListByIn:function(t,e){this.$http.get(r.a.allot.getWarehousePosition,t).then((function(t){e&&e(t)}))},submit:function(){var t=this,e=this;if(!this.listData.every((function(t,i){return!!t.warehousePositionInId||(e.$Notice.warning({title:"请选择第"+(i+1)+"行中入库库位"}),!1)})))return!1;this.$http.put(r.a.allot.updateTransfer,{id:this.detailInfo.id,details:this.listData}).then((function(e){t.isEdit=!1,t.$Notice.success({title:"保存成功！"}),t.getList()}))},cancel:function(){var t=this;this.isEdit=!1,this.listData=[],s.forEach((function(e){t.listData.push(Object.assign({},e))})),this.listData.forEach((function(t){var e=t.amount;delete t.amount,t.amount=e}))}},created:function(){var t=this,e=this,i=this.$route.params.id;o.a.initTableColumnTitle(this.columns),this.$http.get(r.a.allot.getTransferDetail,{id:i}).then((function(a){t.detailInfo=a,t.detailInfo.createDate=o.a.transDateFromServer(a.createDate),t.searchParams.id=i,t.getList();var n={warehouseId:a.warehouseInId};t.getPositionComboxListByIn(n,(function(t){e.loadingByIn=!1,e.storagePosByIn=t}))}))}},c=(i(1013),i(1)),u=Object(c.a)(l,a,[],!1,null,null,null);u.options.__file="src/views/storage/allot/detail.vue";e.default=u.exports},527:function(t,e,i){"use strict";var a=i(22),n={getWarehouseComboList:"/inventory/api/warehouse/comboList",getManaginguser:"/inventory/api/users/managinguser",category:{getTree:"/inventory/api/materiel-category/tree",getInfo:"/inventory/api/materiel-category/materiel",add:"/inventory/api/materiel-category/materiel",edit:"/inventory/api/materiel-category/materiel",del:"/inventory/api/materiel-category/materiel",search:"/inventory/api/materiel-category/list"},inventory:{audit:"/inventory/api/store-adjustment/audited",export:a.a+"/inventory/api/store-adjustment/export",url:"/inventory/api/store-adjustment/adjusment",list:"/inventory/api/store-adjustment/list",detailList:"/inventory/api/store-adjustment/detail/list",itemList:"/inventory/api/store-adjustment/materiel/list",move:"/inventory/api/store-adjustment/move",materielSearch:"/inventory/api/stock/materiel",materielPosition:"/inventory/api/stock/position",materielDepot:"/inventory/api/stock/warehous"},takeStock:{audit:"/inventory/api/materiel-inventory/audited",export:a.a+"/inventory/api/materiel-inventory/export",import:a.a+"/inventory/api/materiel-inventory/import",url:"/inventory/api/materiel-inventory/inventory",detailList:"/inventory/api/materiel-inventory/detail/list",list:"/inventory/api/materiel-inventory/list"},storage:{comboList:"/inventory/api/warehouse/comboList"},material:{getMaterielCategoryTree:"/inventory/api/materiel-category/tree/external",getMateriel:"/inventory/api/materiels",delMateriel:"/inventory/api/materiels",exportMateriel:a.a+"/inventory/api/materiels/excel-export",addMateriel:"/inventory/api/materiel",changeMateriel:"/inventory/api/materiel",getMaterielDetail:"/inventory/api/materiel",getDistribution:"/inventory/api/materielStocks/distribution",getMaterielStockLimits:"/inventory/api/materielStockLimits",bacthAddMaterielStockLimit:"/inventory/api/materielStockLimit/batch-save",updateMaterielStockLimit:"/inventory/api/materielStockLimit",delMaterielStockLimit:"/inventory/api/materielStockLimits",getUnitList:"/inventory/api/materiel/unit",modalMateriel:"/inventory/api/materiel/external",getExcel:a.a+"/inventory/api/excel-temlate-down",importExcel:a.a+"/inventory/api/excel-import",cancelExcelData:"/inventory/api/excel-data-cancel",saveExcelData:"/inventory/api/excel-data-save"},repertory:{getWarehouses:"/inventory/api/warehouses",exportWarehouse:a.a+"/inventory/api/warehouse/excel-export",delWarehouses:"/inventory/api/warehouses",changeWarehouses:"/inventory/api/warehouse",addWarehouse:"/inventory/api/warehouse",getWarehouseDetail:"/inventory/api/warehouse",getWarehouseInfo:"/inventory/api/warehouse/getWarehouseInfo",getPositionOfWarehouse:"/inventory/api/warehousePosition/positionList",bacthAddWarehouseposition:"/inventory/api/warehouseposition/batch-save",updateWarehousePosition:"/inventory/api/warehousePosition",delWarehousePosition:"/inventory/api/warehousePositions",positionByWarehouse:"/inventory/api/warehousePosition/move",checkWarehousenameIsExist:"/inventory/api/warehouse/check-warehousename-isexist",getExcel:a.a+"/inventory/api/warehousePosition/excel-temlate-down",importExcel:a.a+"/inventory/api/warehousePosition/excel-import",cancelExcelData:"/inventory/api/warehousePosition/excel-data-cancel",saveExcelData:"/inventory/api/warehousePosition/excel-data-save"},checkin:{getInbond:"/inventory/api/inbounds",delInbond:"/inventory/api/inbounds",addInbond:"/inventory/api/inbound",getInbondDetail:"/inventory/api/inbound",getInbondRecordList:"/inventory/api/inbound/inboundDetails",getPositionComboxList:"/inventory/api/warehousePosition/positionComboxList",auditeInbound:"/inventory/api/inbound/audite",getMaterielsByWareHouseNo:"/inventory/api/materiel/getMaterielsByWareHouseNo",getMateriels:"/inventory/api/materiel/getMateriels",updateInboundDetail:"/inventory/api/inboundDetail"},checkout:{getApplicantMember:"/uaa/api/users/select",getOutbond:"/inventory/api/outbounds",delOutbond:"/inventory/api/outbounds",addOutbond:"/inventory/api/outbound",getOutbondDetail:"/inventory/api/outbound",getOutbondRecordList:"/inventory/api/outboundDetail",auditeOutbound:"/inventory/api/outbound/audite",updateOutboundDetail:"/inventory/api/outboundDetail",getstock:"/inventory/api/stock/getstock",getMaterielsOutBound:"/inventory/api/materiel/getMaterielsOutBound"},allot:{getTransfer:"/inventory/api/transfer/list",delTransfer:"/inventory/api/transfer/transfer",addTransfer:"/inventory/api/transfer/transfer",getTransferDetail:"/inventory/api/transfer/transfer",getTransferDetailList:"/inventory/api/transfer/detail/list",auditTransfer:"/inventory/api/transfer/audited",updateTransfer:"/inventory/api/transfer/transfer",getMaterielList:"/inventory/api/transfer/materiel/list",getStockPosiComboList:"/inventory/api/stock/position",getWarehousePosition:"/inventory/api/warehousePosition/move"},reporting:{getStockInfo:"/inventory/api/stock/getstock-info",exportStockInfo:a.a+"/inventory/api/stock/getstock-info-excel-export",getStockInoutbound:"/inventory/api/stock/getstock-info-inoutbound",exportStockInoutbound:a.a+"/inventory/api/stock/getstock-info-inoutbound-excel-export",getStockMove:"/inventory/api/stock/get-inventory-mobility-report",exportStockMove:a.a+"/inventory/api/stock/get-inventory-mobility-report-excel-export",getInventoryProfitLossList:"/inventory/api/materiel-inventory/inventory-report",exportInventoryProfitLoss:a.a+"/inventory/api/materiel-inventory/inventory-report-export",getInventoryNumberList:"/inventory/api/materiel-inventory/inventory-report-inventory-number"}};e.a=n},731:function(t,e,i){var a=i(1014);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,i(17).default)("7f6d8aef",a,!1,{})}}]);