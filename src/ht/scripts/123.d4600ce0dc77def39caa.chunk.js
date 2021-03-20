(window.webpackJsonp=window.webpackJsonp||[]).push([[123],{1134:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fault c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[e._v("库存调整信息")]),e._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{directives:[{name:"role",rawName:"v-role",value:"inventory-add",expression:"'inventory-add'"}],attrs:{type:"primary",shape:"circle",loading:e.submitLoading},on:{click:e.submit}},[e._v("保存")]),e._v(" "),a("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:e.back}},[e._v("取消")])],1)]),e._v(" "),a("div",{staticClass:"c-top-border-gray padding20-0"},[a("Form",{ref:"addForm",attrs:{model:e.params,rules:e.formRules,"label-width":100}},[a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"orgId",label:"组织信息："}},[a("dropdown-tree",{attrs:{url:e.orgTreeApi},on:{"on-change":e.orgSelect},model:{value:e.org,callback:function(t){e.org=t},expression:"org"}})],1)],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"userId",label:"创建人员："}},[a("Select",{staticStyle:{width:"300px"},model:{value:e.params.userId,callback:function(t){e.$set(e.params,"userId",t)},expression:"params.userId"}},e._l(e.operators,(function(t){return a("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])})),1)],1)],1)]),e._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{prop:"warehouseId",label:"调整仓库："}},[a("Select",{staticStyle:{width:"300px"},on:{"on-change":e.onChangeDepot},model:{value:e.params.warehouseId,callback:function(t){e.$set(e.params,"warehouseId",t)},expression:"params.warehouseId"}},e._l(e.depots,(function(t){return a("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.warehouseName))])})),1)],1)],1),e._v(" "),a("div",{staticClass:"c-form-item"},[a("FormItem",{attrs:{label:"备注："}},[a("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea"},model:{value:e.params.remark,callback:function(t){e.$set(e.params,"remark",t)},expression:"params.remark"}})],1)],1)])])],1),e._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"c-plain-bg-h"},[a("h3",[e._v("库存调整明细")]),e._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{directives:[{name:"role",rawName:"v-role",value:"inventory-add",expression:"'inventory-add'"}],staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle",size:"small"},on:{click:e.addBtn}},[e._v("新增")])],1)]),e._v(" "),a("mg-static-table",{ref:"staticTable",attrs:{columns:e.columns,datas:e.listData,pageSize:6},on:{"on-page-change":e.onItemsPageChange}})],1),e._v(" "),a("Modal",{attrs:{width:"600",title:"选择物料"},model:{value:e.modalShown,callback:function(t){e.modalShown=t},expression:"modalShown"}},[a("mg-select-table",{ref:"modalTable",attrs:{columns:e.modalColumns,url:e.modalUrl,manual:!0,searchPlaceholder:"物料编号或物料名称"},on:{"on-submit":e.modalSubmit,"on-cancel":e.modalCancel}}),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};i._withStripped=!0;var n=a(23),r=a(145),o=a(537),s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"cmp-static-table"},[a("Table",{ref:"sTable",attrs:{columns:e.columns,data:e.pageData,stripe:"",size:e.size}}),e._v(" "),a("Page",{staticClass:"table-page",attrs:{total:e.total,"page-size":e.pageSize,current:e.currentPage,"show-total":"","show-elevator":"",size:e.size},on:{"on-change":e.pageChange}})],1)};s._withStripped=!0;var l=a(11),c={name:"mgStaticTable",props:{columns:{type:Array,default:[]},datas:{type:Array,default:[]},size:{type:String,required:!1,default:"small"},pageSize:{type:Number,required:!1,default:10}},watch:{datas:function(){this.init()}},data:function(){return{total:0,currentPage:1,pageData:[]}},mounted:function(){this.init()},created:function(){l.a.initTableColumnTitle(this.columns)},methods:{init:function(){this.currentPage=1,this.pageData=this.datas.slice(0,this.pageSize),this.total=this.datas.length},pageChange:function(e){this.$emit("on-page-change",this.pageData);var t=this.pageSize;this.pageData=this.datas.slice((e-1)*t,e*t),this.currentPage=e},triggerCurrentPage:function(){this.$emit("on-page-change",this.pageData)}}},u=a(1),d=Object(u.a)(c,s,[],!1,null,null,null);d.options.__file="src/components/mg-static-table.vue";var p=d.exports,m=a(527),h=a(107),v={components:{dropdownTree:r.a,mgSelectTable:o.a,mgStaticTable:p},computed:Object(n.b)({account:function(e){return e.user.account}}),data:function(){return{org:{title:"请选择",id:""},depots:[],operators:[],depotTemp:"",params:{orgId:"",orgName:"",userId:"",warehouseId:"",remark:"",details:[]},formRules:{orgId:[{required:!0,validator:function(e,t,a){t?a():a(new Error("请选择组织"))}}],userId:[{required:!0,type:"number",message:"请选择人员",trigger:"change"}],warehouseId:[{required:!0,type:"number",message:"请选择仓库",trigger:"change"}]},orgTreeApi:h.a.getOrgTreeData,submitLoading:!1,searchParams:{pageSize:10,currentPage:1},columns:[{title:"物料编号",key:"materielNumber"},{title:"物料名称",key:"materielName"},{title:"型号",key:"model"},{title:"规格",key:"standard"},{title:"库位",key:"warehousePositionName"},{title:"调前数量",key:"beforeAmount"},{title:"调整数量",key:"adjustAmount",render:function(e,t){var a=Number(t.row.afterAmount)-Number(t.row.beforeAmount),i="#333";return a>0?i="#b32f2f":a<0&&(i="#2f7b34"),e("span",{style:{color:i}},a)}},{title:"调后数量",key:"",render:function(e,t){return e("input",{style:{width:"50px"},attrs:{type:"text",maxlength:"5",id:"storage_invertory_item_"+t.row.id},domProps:{value:t.row.afterAmount||0},on:{input:function(e){var a=e.target.value;isNaN(a)&&(a=e.target.value=0),t.row.afterAmount=a}}})}},{title:"计量单位",key:"measurementUnit"}],listData:[],loading:!1,total:0,modalShown:!1,modalColumns:[{type:"selection",width:50},{title:"物料编号",key:"materielNumber"},{title:"物料名称",key:"materielName"},{title:"型号",key:"model"},{title:"规格",key:"standard"},{title:"计量单位",key:"measurementUnit"}],modalUrl:m.a.material.modalMateriel}},methods:{getDepotsList:function(e){var t=this;this.$http.get(m.a.storage.comboList,{orgIds:e}).then((function(e){t.depots=e}))},getUnderOrganizationUsers:function(e,t){var a=this;this.$http.get(m.a.getManaginguser,{orgIds:e.id}).then((function(e){e&&e.items&&(a.operators=e.items,t&&t(a))})),this.getDepotsList(e.id)},orgSelect:function(e){this.params.orgId=e.id,this.params.orgName=e.title,this.params.warehouseId="",this.params.userId="",this.depots=[],this.operators=[],this.getUnderOrganizationUsers(e)},onChangeDepot:function(e){var t=this,a=this;this.listData.length?this.$Modal.confirm({title:"仓库改变",content:"<p>改变仓库后您的库存调整明细会被清空<br />您确定要改变仓库吗？</p>",onOk:function(){t.listData=[],t.$refs.modalTable.getData({warehouseId:e})},onCancel:function(){a.params.warehouseId=Number(a.depotTemp)}}):e&&this.$refs.modalTable.getData({warehouseId:e})},onItemsPageChange:function(e){e.forEach((function(e){e.afterAmount=document.querySelector("#storage_invertory_item_"+e.id).value}))},modalSubmit:function(e){var t=this;if(e.length){var a=[];e.forEach((function(e){a.push(e.id)})),this.modalShown=!1,this.$Spin.show(),this.$http.get(m.a.inventory.itemList,{materielIds:a.join(),warehouseId:this.params.warehouseId}).then((function(e){t.$Spin.hide(),t.listData=e,t.depotTemp=t.params.warehouseId}))}else this.$Notice.warning({title:"请选择调整明细"})},modalCancel:function(e){this.modalShown=!1},checkAmount:function(){var e=this.listData,t=!0;return e.forEach((function(e){""===e.afterAmount&&(t=!1)})),t},addBtn:function(){this.params.warehouseId?this.modalShown=!0:this.$Notice.warning({title:"请先选择调整仓库"})},submit:function(){var e=this;this.$refs.staticTable.triggerCurrentPage();var t=this.listData;this.params.details=t,this.$refs.addForm.validate((function(a){t.length?e.checkAmount()?a&&(e.submitLoading=!0,e.$http.post(m.a.inventory.url,e.params).then((function(t){e.$Notice.success({title:"添加成功！"}),e.submitLoading=!1,e.$router.push({name:"inventory-detail",params:{id:t.id}})})).catch((function(){e.submitLoading=!1}))):e.$Notice.warning({title:"您有库存数量为空"}):e.$Notice.warning({title:"请新增库存调整明细"})}))},back:function(){this.$router.back()}},mounted:function(){var e="",t="",a=(this.account.name,this.account.id);this.account.orgChain.reverse().some((function(a){return 2==a.type&&(e=a.id,t=a.name,!0)})),e&&t&&(this.org.id=e,this.org.title=t,this.params.orgId=e,this.params.orgName=t,this.getUnderOrganizationUsers({id:e},(function(e){e.operators.forEach((function(t){t.id==a&&(e.params.userId=a)}))})))},created:function(){}},g=Object(u.a)(v,i,[],!1,null,null,null);g.options.__file="src/views/storage/inventory/add.vue";t.default=g.exports},527:function(e,t,a){"use strict";var i=a(22),n={getWarehouseComboList:"/inventory/api/warehouse/comboList",getManaginguser:"/inventory/api/users/managinguser",category:{getTree:"/inventory/api/materiel-category/tree",getInfo:"/inventory/api/materiel-category/materiel",add:"/inventory/api/materiel-category/materiel",edit:"/inventory/api/materiel-category/materiel",del:"/inventory/api/materiel-category/materiel",search:"/inventory/api/materiel-category/list"},inventory:{audit:"/inventory/api/store-adjustment/audited",export:i.a+"/inventory/api/store-adjustment/export",url:"/inventory/api/store-adjustment/adjusment",list:"/inventory/api/store-adjustment/list",detailList:"/inventory/api/store-adjustment/detail/list",itemList:"/inventory/api/store-adjustment/materiel/list",move:"/inventory/api/store-adjustment/move",materielSearch:"/inventory/api/stock/materiel",materielPosition:"/inventory/api/stock/position",materielDepot:"/inventory/api/stock/warehous"},takeStock:{audit:"/inventory/api/materiel-inventory/audited",export:i.a+"/inventory/api/materiel-inventory/export",import:i.a+"/inventory/api/materiel-inventory/import",url:"/inventory/api/materiel-inventory/inventory",detailList:"/inventory/api/materiel-inventory/detail/list",list:"/inventory/api/materiel-inventory/list"},storage:{comboList:"/inventory/api/warehouse/comboList"},material:{getMaterielCategoryTree:"/inventory/api/materiel-category/tree/external",getMateriel:"/inventory/api/materiels",delMateriel:"/inventory/api/materiels",exportMateriel:i.a+"/inventory/api/materiels/excel-export",addMateriel:"/inventory/api/materiel",changeMateriel:"/inventory/api/materiel",getMaterielDetail:"/inventory/api/materiel",getDistribution:"/inventory/api/materielStocks/distribution",getMaterielStockLimits:"/inventory/api/materielStockLimits",bacthAddMaterielStockLimit:"/inventory/api/materielStockLimit/batch-save",updateMaterielStockLimit:"/inventory/api/materielStockLimit",delMaterielStockLimit:"/inventory/api/materielStockLimits",getUnitList:"/inventory/api/materiel/unit",modalMateriel:"/inventory/api/materiel/external",getExcel:i.a+"/inventory/api/excel-temlate-down",importExcel:i.a+"/inventory/api/excel-import",cancelExcelData:"/inventory/api/excel-data-cancel",saveExcelData:"/inventory/api/excel-data-save"},repertory:{getWarehouses:"/inventory/api/warehouses",exportWarehouse:i.a+"/inventory/api/warehouse/excel-export",delWarehouses:"/inventory/api/warehouses",changeWarehouses:"/inventory/api/warehouse",addWarehouse:"/inventory/api/warehouse",getWarehouseDetail:"/inventory/api/warehouse",getWarehouseInfo:"/inventory/api/warehouse/getWarehouseInfo",getPositionOfWarehouse:"/inventory/api/warehousePosition/positionList",bacthAddWarehouseposition:"/inventory/api/warehouseposition/batch-save",updateWarehousePosition:"/inventory/api/warehousePosition",delWarehousePosition:"/inventory/api/warehousePositions",positionByWarehouse:"/inventory/api/warehousePosition/move",checkWarehousenameIsExist:"/inventory/api/warehouse/check-warehousename-isexist",getExcel:i.a+"/inventory/api/warehousePosition/excel-temlate-down",importExcel:i.a+"/inventory/api/warehousePosition/excel-import",cancelExcelData:"/inventory/api/warehousePosition/excel-data-cancel",saveExcelData:"/inventory/api/warehousePosition/excel-data-save"},checkin:{getInbond:"/inventory/api/inbounds",delInbond:"/inventory/api/inbounds",addInbond:"/inventory/api/inbound",getInbondDetail:"/inventory/api/inbound",getInbondRecordList:"/inventory/api/inbound/inboundDetails",getPositionComboxList:"/inventory/api/warehousePosition/positionComboxList",auditeInbound:"/inventory/api/inbound/audite",getMaterielsByWareHouseNo:"/inventory/api/materiel/getMaterielsByWareHouseNo",getMateriels:"/inventory/api/materiel/getMateriels",updateInboundDetail:"/inventory/api/inboundDetail"},checkout:{getApplicantMember:"/uaa/api/users/select",getOutbond:"/inventory/api/outbounds",delOutbond:"/inventory/api/outbounds",addOutbond:"/inventory/api/outbound",getOutbondDetail:"/inventory/api/outbound",getOutbondRecordList:"/inventory/api/outboundDetail",auditeOutbound:"/inventory/api/outbound/audite",updateOutboundDetail:"/inventory/api/outboundDetail",getstock:"/inventory/api/stock/getstock",getMaterielsOutBound:"/inventory/api/materiel/getMaterielsOutBound"},allot:{getTransfer:"/inventory/api/transfer/list",delTransfer:"/inventory/api/transfer/transfer",addTransfer:"/inventory/api/transfer/transfer",getTransferDetail:"/inventory/api/transfer/transfer",getTransferDetailList:"/inventory/api/transfer/detail/list",auditTransfer:"/inventory/api/transfer/audited",updateTransfer:"/inventory/api/transfer/transfer",getMaterielList:"/inventory/api/transfer/materiel/list",getStockPosiComboList:"/inventory/api/stock/position",getWarehousePosition:"/inventory/api/warehousePosition/move"},reporting:{getStockInfo:"/inventory/api/stock/getstock-info",exportStockInfo:i.a+"/inventory/api/stock/getstock-info-excel-export",getStockInoutbound:"/inventory/api/stock/getstock-info-inoutbound",exportStockInoutbound:i.a+"/inventory/api/stock/getstock-info-inoutbound-excel-export",getStockMove:"/inventory/api/stock/get-inventory-mobility-report",exportStockMove:i.a+"/inventory/api/stock/get-inventory-mobility-report-excel-export",getInventoryProfitLossList:"/inventory/api/materiel-inventory/inventory-report",exportInventoryProfitLoss:i.a+"/inventory/api/materiel-inventory/inventory-report-export",getInventoryNumberList:"/inventory/api/materiel-inventory/inventory-report-inventory-number"}};t.a=n},528:function(e,t,a){var i=a(535);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,a(17).default)("ad278fbc",i,!1,{})},534:function(e,t,a){"use strict";var i=a(528);a.n(i).a},535:function(e,t,a){(t=a(10)(!1)).push([e.i,"\n.mg-select-table-tip {\r\n\ttext-align: right;\r\n\tline-height: 30px;\r\n\tcolor: #999;\n}\n.mg-select-table-tip strong {\r\n\tcolor: #777;\r\n\tmargin: 0 3px;\n}\n.mg-select-table-search .ivu-icon {\r\n\tright: 35px;\n}\r\n",""]),e.exports=t},537:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mg-select-table"},[e._t("top"),e._v(" "),a("div",{staticClass:"mg-select-table-header"},[e._t("default",[a("div",{staticClass:"mg-select-table-search"},[a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:e.searchPlaceholder,clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.searchParams.queryName,callback:function(t){e.$set(e.searchParams,"queryName",t)},expression:"searchParams.queryName"}},[a("Button",{attrs:{slot:"append",icon:"ios-search"},on:{click:e.search},slot:"append"})],1)],1)]),e._v(" "),a("div",{staticClass:"mg-select-table-tip"},[e._v("已选择"),a("strong",[e._v(e._s(e.selectedTemp.length))]),e._v("个 "),a("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:e.cleanup}},[e._v("[清空]")])])],2),e._v(" "),a("div",{attrs:{id:e.TID}},[a("Table",{ref:e.tableRef,attrs:{columns:e.columns,data:e.listData,loading:e.loading,stripe:"",size:e.size},on:{"on-select":e.onSelect,"on-select-cancel":e.onSelectCancel,"on-select-all":e.onSelectAll}})],1),e._v(" "),a("Page",{staticClass:"table-page",attrs:{total:e.total,"page-size":e.searchParams.pageSize,current:e.searchParams.currentPage,"show-total":"","show-elevator":"",size:e.size},on:{"on-change":e.pageChange}}),e._v(" "),a("div",{staticClass:"c-modal-footer-btns",staticStyle:{margin:"30px auto 0"}},[a("Button",{attrs:{type:"default",shape:"circle"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:e.submit}},[e._v("确定")])],1)],2)};i._withStripped=!0;var n=a(11),r={name:"mgSelectTable",props:{disabledRow:Boolean,selected:Array,searchPlaceholder:String,columns:{type:Array,default:[]},url:String,size:{type:String,default:"small"},max:Number,manual:Boolean,field:String},watch:{selected:function(e){var t=JSON.stringify(e);this.selectedTemp=JSON.parse(t),this.selectedTruth=JSON.parse(t),this.checkSelection()}},data:function(){return{TID:"",searchParams:{queryName:"",currentPage:1,pageSize:10},listData:[],selectedTemp:[],selectedTruth:[],loading:!1,total:0,tableRef:""}},methods:{cleanup:function(){this.selectedTemp=[],this.selectedTruth=[],this.checkSelection()},getData:function(e){var t=this;e&&(this.searchParams=Object.assign({},{queryName:"",currentPage:1,pageSize:10},e)),this.loading=!0,this.$http.get(this.url,this.searchParams).then((function(e){var a=e.items?e.items:[];t.disabledRow&&a.forEach((function(e){e.disabled&&(e._disabled=!0)})),t.field&&a.forEach((function(e){e.id||(e.id=e[t.field])})),t.listData=a,t.total=e.total,t.loading=!1,t.checkSelection()}))},pageChange:function(e){this.searchParams.currentPage=e,this.getData()},search:function(){this.searchParams.currentPage=1,this.getData()},onSelect:function(e,t){var a=this.selectedTemp;this.max&&a.length>=this.max?(this.$Notice.info({title:"最多选择"+this.max+"个"}),this.cancelChecked(t.id)):this.selectedTemp.push(t)},onSelectCancel:function(e,t){var a=this;this.selectedTemp.forEach((function(e,i){e.id==t.id&&a.selectedTemp.splice(i,1)}))},onSelectAll:function(e){0==e.length?this.removeTableFromTemp(this.listData):this.addTableToTemp(e)},addTableToTemp:function(e){var t=this.selectedTemp;e.forEach((function(e){var a=!1;t.forEach((function(t,i){t.id==e.id&&(a=!0)})),a||t.push(e)}))},removeTableFromTemp:function(e){for(var t=this.selectedTemp,a=t.length;a--;){var i=!1;e.forEach((function(e){e.id==t[a].id&&(i=!0)})),i&&t.splice(a,1)}},cancelChecked:function(e){var t=this;this.checkSelection();var a=this.selectedTemp,i=[];a.forEach((function(a){a.id==e&&t.$set(a,"_checked",!1),i.push(a)})),this.selectedTemp=i},checkSelection:function(){var e=this;this.$nextTick((function(){var t=e.listData,a=e.selectedTemp,i=e.$refs[e.tableRef];t.forEach((function(e,t){var n=i.$refs.tbody.objData[t];n._isChecked=!1,a.forEach((function(t){t.id==e.id&&(n._isChecked=!0)}))}))}))},submit:function(){this.selectedTruth=n.a.copyArray(this.selectedTemp),this.$emit("on-submit",this.selectedTruth)},cancel:function(){this.selectedTemp=n.a.copyArray(this.selectedTruth),this.checkSelection(),this.$emit("on-cancel")}},mounted:function(){this.max&&(document.querySelector("#"+this.TID).querySelector(".ivu-table-header").querySelector(".ivu-table-cell").style.display="none"),this.manual||this.getData()},created:function(){var e=n.a.gusid(6);this.TID="J_TABLE_"+e,this.tableRef="mg-select-table-"+e,n.a.initTableColumnTitle(this.columns)}},o=(a(534),a(1)),s=Object(o.a)(r,i,[],!1,null,null,null);s.options.__file="src/components/mg-select-table.vue";t.a=s.exports}}]);