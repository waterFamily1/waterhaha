(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1269:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"c-main-border"},[s("Form",{ref:"subscribeForm",attrs:{model:e.subscribe,"label-width":120}},[s("div",{staticClass:"c-left-border-blue"},[s("h3",[e._v("报警订阅")]),e._v(" "),s("div",{staticClass:"c-btns-right"},[s("Button",{attrs:{type:"primary",shape:"circle"},on:{click:e.submit}},[e._v("保存")]),e._v(" "),s("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:e.back}},[e._v("取消")])],1)]),e._v(" "),s("div",{staticClass:"c-top-border-gray padding20-0"},[s("div",{staticClass:"c-form-row-1col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{prop:"defineName",label:"报警名称："}},[e._v("\r\n                        "+e._s(e.subscribe.defineName)),s("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:function(t){e.modalShown=!0}}},[e._v("[选择]")])])],1)]),e._v(" "),s("div",{staticClass:"c-form-row-1col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"区域位置："}},[e._v("\r\n                        "+e._s(e.subscribe.siteName)+"\r\n                    ")])],1)]),e._v(" "),s("div",{staticClass:"c-form-row-2col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"推送频率："}},[s("Select",{staticStyle:{width:"200px"},model:{value:e.subscribe.pushFrequency,callback:function(t){e.$set(e.subscribe,"pushFrequency",t)},expression:"subscribe.pushFrequency"}},e._l(e.pushMap,(function(t,a){return s("Option",{key:a,attrs:{value:a}},[e._v(e._s(t))])})),1)],1)],1),e._v(" "),s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"延迟推送时间："}},[s("Select",{staticStyle:{width:"200px"},model:{value:e.subscribe.delayPushTime,callback:function(t){e.$set(e.subscribe,"delayPushTime",t)},expression:"subscribe.delayPushTime"}},e._l(e.delayMap,(function(t,a){return s("Option",{key:a,attrs:{value:a}},[e._v(e._s(t))])})),1)],1)],1)]),e._v(" "),s("div",{staticClass:"c-form-row-1col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"推送方式："}},[s("Select",{staticStyle:{width:"200px"},attrs:{multiple:!0},model:{value:e.subscribeModeArr,callback:function(t){e.subscribeModeArr=t},expression:"subscribeModeArr"}},e._l(e.recieverMap,(function(t,a){return s("Option",{key:a,attrs:{value:a}},[e._v(e._s(t))])})),1)],1)],1)])]),e._v(" "),s("div",{staticClass:"c-top-border-gray"},[s("div",{staticClass:"c-plain-bg-h"},[s("h3",[e._v("新增接收对象")]),e._v(" "),s("Checkbox",{staticStyle:{float:"right"},model:{value:e.subscribe.pushReleaseMessage,callback:function(t){e.$set(e.subscribe,"pushReleaseMessage",t)},expression:"subscribe.pushReleaseMessage"}},[e._v("同步接收报警确认消息")])],1),e._v(" "),s("div",{staticClass:"padding20-0"},[s("div",{staticClass:"c-form-row-2col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"所属组织：",required:""}},[s("dropdown-tree",{attrs:{url:e.orgTreeApi,query:e.query},on:{"on-change":e.orgSelect},model:{value:e.org,callback:function(t){e.org=t},expression:"org"}})],1)],1),e._v(" "),s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"用户：",prop:"userIds"}},[s("Select",{staticStyle:{width:"400px"},attrs:{multiple:""},on:{"on-change":e.changeStaffs},model:{value:e.selectedStaffs,callback:function(t){e.selectedStaffs=t},expression:"selectedStaffs"}},e._l(e.staffs,(function(t){return s("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])})),1)],1)],1)]),e._v(" "),s("div",{staticClass:"c-form-row-1col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"已选接收对象："}},e._l(e.selectedStaffsInfo,(function(t){return s("div",{key:t.orgId},[t.receiver.length>0?s("div",{staticStyle:{"margin-bottom":"10px"}},[t.orgName?s("h4",[e._v(e._s(t.orgName))]):e._e(),e._v(" "),e._l(t.receiver,(function(t){return s("Tag",{key:t.id,attrs:{color:"#2d8cf0",closable:""},on:{"on-close":function(s){return e.removeStaff(t)}}},[e._v(e._s(t.name))])}))],2):e._e()])})),0)],1)])])])]),e._v(" "),s("Modal",{attrs:{width:"600",title:"报警定义列表选择"},model:{value:e.modalShown,callback:function(t){e.modalShown=t},expression:"modalShown"}},[s("mg-select-table",{ref:"modalTable",attrs:{columns:e.modalColumns,url:e.modalUrl,manual:!0},on:{"on-submit":e.modalSubmit,"on-cancel":e.modalCancel}},[s("div",{},[s("label",[e._v("关键字：")]),e._v(" "),s("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"编号/报警名称",clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.searchParams.queryName,callback:function(t){e.$set(e.searchParams,"queryName",t)},expression:"searchParams.queryName"}}),e._v(" "),s("label",[e._v("区域位置：")]),e._v(" "),s("dropdown-tree",{attrs:{url:e.processTreeApi,width:180,multiple:!0},on:{"on-change":e.changeProcess},model:{value:e.relProcess,callback:function(t){e.relProcess=t},expression:"relProcess"}}),e._v(" "),s("Button",{staticClass:"c-btn-modal-search",attrs:{type:"primary"},on:{click:e.search}},[e._v("搜索")]),e._v(" "),s("Button",{staticClass:"c-btn-modal-reset",attrs:{type:"primary"},on:{click:e.searchParamsClean}},[e._v("重置")])],1)]),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};a._withStripped=!0;s(11);var i=s(543),r=s(107),c=s(148),n=s(39),l=s(145),o=s(537),u=[];var d={components:{mgSelectTable:o.a,dropdownTree:l.a},data:function(){var e=this;return{pageStatus:"add",org:{id:"",title:"请选择"},subscribeModeArr:["SysMsg"],recieverMap:{SysMsg:"在线消息",SMS:"短信"},statesMap:{"":"不限",ON:"启用",OFF:"停用"},pushMap:{1:"5分钟",2:"10分钟",3:"15分钟",4:"30分钟",5:"1小时",6:"2小时",7:"12小时",8:"24小时",9:"仅推送1次"},delayMap:{1:"5分钟",2:"10分钟",3:"15分钟",4:"30分钟",5:"1小时",6:"2小时",7:"12小时",8:"24小时",9:"立即推送",10:"不推送"},subscribe:{id:"",siteIds:"",siteName:"请选择",defineIds:"",defineName:"请选择",delayPushTime:"9",pushFrequency:"9",pushReleaseMessage:!0,userIds:""},subscribeListArray:[],subscribeListModalShow:!1,processTreeApi:r.a.getProcessTreeData,orgTreeApi:r.a.getOrgTreeData,query:{exNoAuth:!0},selectedOrgId:"",selectedStaffs:[],staffs:[],selectedStaffsInfo:[],modalShown:!1,modalColumns:[{type:"selection",width:50},{title:"报警名称",key:"alarmName"},{title:"报警等级",key:"alarmLevel",width:80,render:function(e,t){return e("span",{class:["alarm-lev-"+t.row.alarmLevel]},t.row.alarmLevel+"级")}},{title:"使用状态",key:"enabledStatus",width:80,render:function(t,s){return t("span",e.statesMap[s.row.enabledStatus])}},{title:"区域位置",key:"siteName"}],modalUrl:i.a.modalDefines,relProcess:{id:null,title:"请选择"},searchParams:{queryName:"",executeStatus:"",telantId:"",siteId:""},tenantList:[]}},mounted:function(){var e=this;this.$http.get(n.a.getTenantsAuth).then((function(t){e.tenantList=t})),this.$refs.modalTable.getData(this.searchParams),"alarm-subscribe-edit"==this.$route.name&&this.$route.params.id&&(this.pageStatus="edit",this.getData())},methods:{getData:function(){var e=this,t=this.$route.params.id;this.$http.get(i.a.subscribe+"/"+t).then((function(t){e.subscribe=t,e.subscribe.id=e.$route.params.id,e.subscribe.defineIds=t.defineId,e.subscribe.siteIds=t.siteId;var s=t.subscribeList[0];e.subscribe.pushReleaseMessage="Y"==s.pushReleaseMessage,e.subscribe.pushFrequency=s.pushFrequency,e.subscribe.delayPushTime=s.delayPushTime,s.subscribeMode?e.subscribeModeArr=s.subscribeMode.split(","):e.subscribeModeArr=[],e.selectedStaffsInfo=[{orgId:"",orgName:"",receiver:[{id:s.userId,name:s.userName}]}]}))},back:function(){this.$router.back()},checkIsExistOrg:function(e){var t=this.selectedStaffsInfo,s=!1;return t.forEach((function(t){t.orgId==e&&(s=!0)})),s},setOrgReceiver:function(e,t){var s=[],a=this.staffs;t.forEach((function(e){a.forEach((function(t){e==t.id&&s.push(t)}))})),this.selectedStaffsInfo.forEach((function(t){t.orgId==e&&(t.receiver=s)}))},getOrgReceiver:function(e){var t=this.selectedStaffsInfo,s=[];return t.forEach((function(t){t.orgId==e&&(s=t.receiver)})),s},orgSelect:function(e){var t=this;e.id&&(this.selectedOrgId=e.id,this.$http.get(c.a.getUsers,{orgId:this.selectedOrgId,pageSize:0}).then((function(s){if(t.staffs=s.items,t.checkIsExistOrg(t.selectedOrgId)){var a=t.getOrgReceiver(t.selectedOrgId);t.selectedStaffs=a.map((function(e){return e.id}))}else t.selectedStaffsInfo.push({orgId:e.id,orgName:e.title,receiver:[]})})))},changeStaffs:function(e){this.setOrgReceiver(this.selectedOrgId,e)},removeStaff:function(e){var t,s=this,a=this.selectedStaffsInfo;t=e.orgChain?e.orgChain.map((function(e){return Number(e.id)})):[e.orgId],a.forEach((function(a){if(t.indexOf(Number(a.orgId))>-1){(r=a.receiver).forEach((function(t,s){e.id==t.id&&r.splice(s,1)}));var i=s.getOrgReceiver(a.orgId);s.selectedOrgId==a.orgId&&(s.selectedStaffs=i.map((function(e){return e.id})))}else{var r;(r=a.receiver).forEach((function(t,s){e.id==t.id&&r.splice(s,1)}))}}))},getUserIds:function(){var e=this.selectedStaffsInfo,t=[];return e.forEach((function(e){e.receiver.forEach((function(e){t.indexOf(e.id)<0&&t.push(e.id)}))})),t},submit:function(){var e=this,t="post";"edit"==this.pageStatus&&(t="put");var s=this.getUserIds();this.subscribe.defineIds?0!=s.length?0!=this.subscribeModeArr.length?(this.subscribe.userIds=s.join(","),this.subscribe.pushReleaseMessage=this.subscribe.pushReleaseMessage?"Y":"N",this.subscribe.subscribeMode=this.subscribeModeArr.join(","),this.$http[t](i.a.subscribe,this.subscribe).then((function(t){e.$Notice.success({title:"数据保存成功"}),e.$routeBack()}))):this.$Notice.warning({title:"请选择推送方式"}):this.$Notice.warning({title:"请选择报警订阅接收对象"}):this.$Notice.warning({title:"请选择报警名称"})},modalSubmit:function(e){var t=[],s=[],a=[],i=[];e.forEach((function(e){t.push(e.alarmName),s.push(e.id),a.push(e.siteName),i.push(e.siteId)})),this.subscribe.defineName=t.join(","),this.subscribe.defineIds=s.join(","),this.subscribe.siteName=a.join(","),this.subscribe.siteIds=i.join(","),this.modalShown=!1},modalCancel:function(){this.modalShown=!1},changeProcess:function(e){this.searchParams.siteId=e.id},search:function(){this.$refs.modalTable.getData(this.searchParams)},searchParamsClean:function(){this.relProcess.id="",this.relProcess.title="请选择",this.searchParams={queryName:"",executeStatus:"",telantId:"",siteId:""}}},filters:{getName:function(e){return function(e){for(var t,s=u.length,a=0;a<s;a++)if(e==u[a].id){t=u[a].title;break}return t}(e)}}},h=(s(864),s(1)),f=Object(h.a)(d,a,[],!1,null,null,null);f.options.__file="src/views/alarm/subscribe/form.vue";t.default=f.exports},507:function(e,t,s){e.exports=s.p+"images/3a23524e9c2a6dd02c2c02fb7847102e.png"},528:function(e,t,s){var a=s(535);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,s(17).default)("ad278fbc",a,!1,{})},534:function(e,t,s){"use strict";var a=s(528);s.n(a).a},535:function(e,t,s){(t=s(10)(!1)).push([e.i,"\n.mg-select-table-tip {\r\n\ttext-align: right;\r\n\tline-height: 30px;\r\n\tcolor: #999;\n}\n.mg-select-table-tip strong {\r\n\tcolor: #777;\r\n\tmargin: 0 3px;\n}\n.mg-select-table-search .ivu-icon {\r\n\tright: 35px;\n}\r\n",""]),e.exports=t},537:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"mg-select-table"},[e._t("top"),e._v(" "),s("div",{staticClass:"mg-select-table-header"},[e._t("default",[s("div",{staticClass:"mg-select-table-search"},[s("Input",{staticStyle:{width:"200px"},attrs:{placeholder:e.searchPlaceholder,clearable:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search(t)}},model:{value:e.searchParams.queryName,callback:function(t){e.$set(e.searchParams,"queryName",t)},expression:"searchParams.queryName"}},[s("Button",{attrs:{slot:"append",icon:"ios-search"},on:{click:e.search},slot:"append"})],1)],1)]),e._v(" "),s("div",{staticClass:"mg-select-table-tip"},[e._v("已选择"),s("strong",[e._v(e._s(e.selectedTemp.length))]),e._v("个 "),s("a",{staticClass:"c-btn-text",attrs:{href:"javascript:;"},on:{click:e.cleanup}},[e._v("[清空]")])])],2),e._v(" "),s("div",{attrs:{id:e.TID}},[s("Table",{ref:e.tableRef,attrs:{columns:e.columns,data:e.listData,loading:e.loading,stripe:"",size:e.size},on:{"on-select":e.onSelect,"on-select-cancel":e.onSelectCancel,"on-select-all":e.onSelectAll}})],1),e._v(" "),s("Page",{staticClass:"table-page",attrs:{total:e.total,"page-size":e.searchParams.pageSize,current:e.searchParams.currentPage,"show-total":"","show-elevator":"",size:e.size},on:{"on-change":e.pageChange}}),e._v(" "),s("div",{staticClass:"c-modal-footer-btns",staticStyle:{margin:"30px auto 0"}},[s("Button",{attrs:{type:"default",shape:"circle"},on:{click:e.cancel}},[e._v("取消")]),e._v(" "),s("Button",{attrs:{type:"primary",shape:"circle"},on:{click:e.submit}},[e._v("确定")])],1)],2)};a._withStripped=!0;var i=s(11),r={name:"mgSelectTable",props:{disabledRow:Boolean,selected:Array,searchPlaceholder:String,columns:{type:Array,default:[]},url:String,size:{type:String,default:"small"},max:Number,manual:Boolean,field:String},watch:{selected:function(e){var t=JSON.stringify(e);this.selectedTemp=JSON.parse(t),this.selectedTruth=JSON.parse(t),this.checkSelection()}},data:function(){return{TID:"",searchParams:{queryName:"",currentPage:1,pageSize:10},listData:[],selectedTemp:[],selectedTruth:[],loading:!1,total:0,tableRef:""}},methods:{cleanup:function(){this.selectedTemp=[],this.selectedTruth=[],this.checkSelection()},getData:function(e){var t=this;e&&(this.searchParams=Object.assign({},{queryName:"",currentPage:1,pageSize:10},e)),this.loading=!0,this.$http.get(this.url,this.searchParams).then((function(e){var s=e.items?e.items:[];t.disabledRow&&s.forEach((function(e){e.disabled&&(e._disabled=!0)})),t.field&&s.forEach((function(e){e.id||(e.id=e[t.field])})),t.listData=s,t.total=e.total,t.loading=!1,t.checkSelection()}))},pageChange:function(e){this.searchParams.currentPage=e,this.getData()},search:function(){this.searchParams.currentPage=1,this.getData()},onSelect:function(e,t){var s=this.selectedTemp;this.max&&s.length>=this.max?(this.$Notice.info({title:"最多选择"+this.max+"个"}),this.cancelChecked(t.id)):this.selectedTemp.push(t)},onSelectCancel:function(e,t){var s=this;this.selectedTemp.forEach((function(e,a){e.id==t.id&&s.selectedTemp.splice(a,1)}))},onSelectAll:function(e){0==e.length?this.removeTableFromTemp(this.listData):this.addTableToTemp(e)},addTableToTemp:function(e){var t=this.selectedTemp;e.forEach((function(e){var s=!1;t.forEach((function(t,a){t.id==e.id&&(s=!0)})),s||t.push(e)}))},removeTableFromTemp:function(e){for(var t=this.selectedTemp,s=t.length;s--;){var a=!1;e.forEach((function(e){e.id==t[s].id&&(a=!0)})),a&&t.splice(s,1)}},cancelChecked:function(e){var t=this;this.checkSelection();var s=this.selectedTemp,a=[];s.forEach((function(s){s.id==e&&t.$set(s,"_checked",!1),a.push(s)})),this.selectedTemp=a},checkSelection:function(){var e=this;this.$nextTick((function(){var t=e.listData,s=e.selectedTemp,a=e.$refs[e.tableRef];t.forEach((function(e,t){var i=a.$refs.tbody.objData[t];i._isChecked=!1,s.forEach((function(t){t.id==e.id&&(i._isChecked=!0)}))}))}))},submit:function(){this.selectedTruth=i.a.copyArray(this.selectedTemp),this.$emit("on-submit",this.selectedTruth)},cancel:function(){this.selectedTemp=i.a.copyArray(this.selectedTruth),this.checkSelection(),this.$emit("on-cancel")}},mounted:function(){this.max&&(document.querySelector("#"+this.TID).querySelector(".ivu-table-header").querySelector(".ivu-table-cell").style.display="none"),this.manual||this.getData()},created:function(){var e=i.a.gusid(6);this.TID="J_TABLE_"+e,this.tableRef="mg-select-table-"+e,i.a.initTableColumnTitle(this.columns)}},c=(s(534),s(1)),n=Object(c.a)(r,a,[],!1,null,null,null);n.options.__file="src/components/mg-select-table.vue";t.a=n.exports},543:function(e,t,s){"use strict";s(22);t.a={updateDefineStatus:"/loong/api/alarm-definitions/status",defines:"/loong/api/alarm-definitions",modalDefines:"/loong/api/alarm-definitions",history:"/loong/api/alarm-records",history_detail:"/loong/api/alarm-records/detail",release:"/loong/api/alarm-records/confirm",getAlarmData:"/loong/api/alarm-records",subscribe:"/loong/api/alarm-subscriptions"}},641:function(e,t,s){var a=s(865);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);(0,s(17).default)("c81ca08a",a,!1,{})},864:function(e,t,s){"use strict";var a=s(641);s.n(a).a},865:function(e,t,s){var a=s(10),i=s(506);(t=a(!1)).i(i),t.push([e.i,"\r\n",""]),e.exports=t}}]);