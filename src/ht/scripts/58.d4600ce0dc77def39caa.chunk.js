(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{1178:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[t._v("巡检任务")]),t._v(" "),a("a",{directives:[{name:"show",rawName:"v-show",value:!t.detailData.concerned&&"interrupt"!==t.detailData.executeStatus,expression:"!detailData.concerned&&detailData.executeStatus!=='interrupt'"}],staticClass:"c-btn-attention",attrs:{href:"javascript:;"},on:{click:t.concern}},[t._v("添加关注")]),t._v(" "),a("a",{directives:[{name:"show",rawName:"v-show",value:t.detailData.concerned,expression:"detailData.concerned"}],staticClass:"c-btn-attention",attrs:{href:"javascript:;"},on:{click:t.cancelConcern}},[t._v("取消关注")]),t._v(" "),a("div",{staticClass:"c-btns-right"},[a("Button",{directives:[{name:"show",rawName:"v-show",value:"unallocated"==t.detailData.executeStatus||"toBeExecuted"==t.detailData.executeStatus,expression:"detailData.executeStatus=='unallocated'||detailData.executeStatus=='toBeExecuted'"},{name:"role",rawName:"v-role",value:"task-assign",expression:"'task-assign'"}],attrs:{type:"primary",shape:"circle"},on:{click:function(e){t.isShowAssignDialog=!0}}},[t._v("任务分派")]),t._v(" "),a("Button",{directives:[{name:"show",rawName:"v-show",value:"unallocated"==t.detailData.executeStatus||"toBeExecuted"==t.detailData.executeStatus,expression:"detailData.executeStatus=='unallocated'||detailData.executeStatus=='toBeExecuted'"},{name:"role",rawName:"v-role",value:"task-term",expression:"'task-term'"}],staticClass:"c-btn-other",attrs:{type:"primary",shape:"circle"},on:{click:t.interruptTask}},[t._v("终止任务")]),t._v(" "),a("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:t.handleCancle}},[t._v("返回")])],1)]),t._v(" "),a("div",{staticClass:"c-top-border-gray c-form-data-show"},[a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("巡检任务名称：")]),t._v("\n                "+t._s(t.detailData.name)+"\n            ")]),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("任务状态：")]),t._v("\n                "+t._s(t.detailData.executeStatusText)+"\n            ")])]),t._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("所属组织：")]),t._v("\n                "+t._s(t.detailData.orgName)+"\n            ")]),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("执行时间：")]),t._v("\n                "+t._s(t.detailData.executeTime)+"\n            ")])]),t._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("执行人员：")]),t._v("\n                "+t._s(t.detailData.executorName)+"\n            ")]),t._v(" "),a("div",{staticClass:"c-form-item"},[a("label",[t._v("实际耗时：")]),t._v("\n                "+t._s(t.detailData.actualTimeCost)+"\n            ")])]),t._v(" "),a("div",{staticClass:"c-form-row-2col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("任务持续时间：")]),t._v("\n                "+t._s(t.detailData.duration)+"\n            ")]),t._v(" "),"abnormal"==t.detailData.executeStatus?a("div",{staticClass:"c-form-item"},[a("label",[t._v("备注：")]),t._v("\n                "+t._s(t.detailData.comment)+"\n            ")]):t._e()])]),t._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("Tabs",{attrs:{animated:!1,value:"map"==t.taskType?"path":"info"}},[a("TabPane",{attrs:{label:"巡检点信息",name:"info"}},[a("div",{staticClass:"common-table-c"},[a("Table",{staticClass:"common-table",attrs:{size:"small",columns:t.columns,data:t.detailData.patrolPointDetailDTOs,stripe:""}})],1)]),t._v(" "),"map"==t.taskType?[a("TabPane",{attrs:{label:"巡检路线",name:"path"}},[a("div",{staticStyle:{position:"relative"}},[a("div",{staticStyle:{width:"100%"},style:{height:t.H+"px"},attrs:{id:"patrol-task-map"}}),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.mapLoading,expression:"mapLoading"}],staticStyle:{position:"absolute",left:"20px",top:"10px",color:"#999"}},[t._v("正在加载地图...")]),t._v(" "),a("div",{staticClass:"bdmap-search"},[a("Icon",{attrs:{type:"ios-search",size:"20",color:"#CCCCCC"}}),t._v(" "),a("input",{staticClass:"bdmap-search-key",attrs:{type:"text",id:"patrol-task-bdmap-search-key"}})],1),t._v(" "),a("div",{staticClass:"bdmap-location"},[a("a",{attrs:{href:"javascript:;",title:"定位您的位置"},on:{click:t.myLocation}},[a("Icon",{attrs:{type:"android-locate",size:"20",color:"#388bff"}})],1)])])])]:t._e()],2)],1),t._v(" "),a("Modal",{attrs:{width:"300",title:"任务派发"},model:{value:t.isShowAssignDialog,callback:function(e){t.isShowAssignDialog=e},expression:"isShowAssignDialog"}},[a("p",{staticStyle:{height:"40px","font-size":"13px"}},[t._v("选择相应的执行人员进行派发：")]),t._v(" "),a("div",[a("label",[t._v("选择人员：")]),t._v(" "),a("Select",{staticStyle:{width:"200px"},model:{value:t.assignTo,callback:function(e){t.assignTo=e},expression:"assignTo"}},t._l(t.executorNames,(function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])})),1)],1),t._v(" "),a("div",{staticStyle:{"margin-top":"30px"}},[a("Button",{attrs:{type:"primary",size:"large",long:""},on:{click:t.taskAssignTo}},[t._v("派发")])],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})]),t._v(" "),a("Modal",{attrs:{width:"580","mask-closable":!1,title:"巡检点"},model:{value:t.isShowPointDialog,callback:function(e){t.isShowPointDialog=e},expression:"isShowPointDialog"}},[a("div",{staticClass:"c-form-data-show"},[a("div",{staticClass:"c-form-row-1col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("巡检点名称：")]),t._v("\n                    "+t._s(t.pointData.patrolPoint)+"\n                ")])]),t._v(" "),a("div",{staticClass:"c-form-row-1col"},[a("div",{staticClass:"c-form-item",staticStyle:{"max-height":"80px",overflow:"hidden"}},[a("label",[t._v("描述：")]),t._v(" "),a("span",{attrs:{title:t.pointData.description}},[t._v(t._s(t.pointData.description))])])]),t._v(" "),a("div",{staticClass:"c-form-row-1col"},[a("div",{staticClass:"c-form-item"},[a("label",[t._v("区域位置：")]),t._v("\n                    "+t._s(t.pointData.relatedProcessNames)+"\n                ")])])]),t._v(" "),a("div",[a("Table",{attrs:{size:"small",columns:t.pointColumns,data:t.pointData.patrolTaskPointSteps,stripe:""}})],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[t.isEditPoint?a("div",{staticClass:"c-modal-footer-btns"},[a("Button",{attrs:{type:"default"},on:{click:t.cancelHandler}},[t._v("取消")]),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:t.releaseSubmit}},[t._v("确定")])],1):t._e()])]),t._v(" "),a("Modal",{staticClass:"patrol-task-images-dialog",attrs:{width:"580",title:"照片"},model:{value:t.lookImagesModal,callback:function(e){t.lookImagesModal=e},expression:"lookImagesModal"}},[a("div",{staticClass:"point-img-box"},[t._l(t.pointImages,(function(e,i){return a("div",{staticClass:"point-img-item",on:{click:function(a){return t.playVideo(e)}}},[1==e.type?[a("Icon",{attrs:{type:"social-youtube-outline"}}),t._v(" "),a("img",{attrs:{src:e.imgThumbnailUrl,alt:""}})]:a("img",{directives:[{name:"img",rawName:"v-img:handleImg(item)",arg:"handleImg(item)"}],attrs:{src:e.imgUrl,alt:""}})],2)})),t._v(" "),t.pointImages.length?t._e():a("div",{staticClass:"no-data"},[t._v("暂无数据")])],2),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})]),t._v(" "),a("Modal",{class:"play-dialog",attrs:{width:"600",closable:!0},model:{value:t.isShowPlayDialog,callback:function(e){t.isShowPlayDialog=e},expression:"isShowPlayDialog"}},[a("div",{attrs:{slot:"header"},slot:"header"}),t._v(" "),a("div",{staticStyle:{height:"400px"},attrs:{id:"player"}},[a("video",{attrs:{id:"patrol_task_video",width:"100%",height:"400",controls:"controls"}})]),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"})])],1)};i._withStripped=!0;var n,o=a(23),s=(a(107),a(539)),r=a(16),l=a(148),c=a(11),d=a(558),u=a(7),p=a(542);u.default.use(p.a);var v={data:function(){var t=this,e=this;return{taskType:"",assignTo:"",executorNames:[],isShowAssignDialog:!1,isShowPointDialog:!1,isEditPoint:!1,detailData:{},currentPonitIndex:"",pointData:{},columns:[{title:"序号",type:"index"},{title:"巡检点名称",key:"patrolPoint"},{title:"描述",key:"description"},{title:"巡检步骤",key:"step",render:function(t,e){return t("span",e.row.recordCount+"/"+e.row.stepCount)}},{title:"发现缺陷",key:"faultCount"},{title:"区域位置",key:"relatedProcessNames"},{title:"操作",key:"action",align:"left",render:function(a,i){var n=[c.a.tableBtnStyle(a,(function(){t.setPointDataById(i.row.id),t.isShowPointDialog=!0,t.isEditPoint=!1}),"查看")];return"finished"!=e.detailData.executeStatus&&"abnormal"!=e.detailData.executeStatus||n.push(c.a.tableBtnStyle(a,(function(){t.setPointDataById(i.row.id,"edit"),t.isShowPointDialog=!0,t.isEditPoint=!0}),"编辑","task-inspection-points-edit")),a("div",n)}}],lookImagesModal:!1,pointColumns:[{title:"序号",type:"index",width:50},{title:"步骤",key:"stepName"},{title:"结果记录",key:"stepResult",width:100,render:function(t,a){if(e.isEditPoint)return 1==a.row.stepResultType?t("Select",{props:{placeholder:"请选择",value:a.row.stepResult,"label-in-value":!0,size:"small"},on:{"on-change":function(t){a.row.stepResult=t.value,e.pointData.patrolTaskPointSteps[a.index]=a.row}}},[{value:"normal",label:"正常"},{value:"abnormal",label:"异常"}].map((function(e,a){return t("Option",{props:{value:e.value,label:e.label}})}))):t("div",[t("Input",{props:{value:a.row.stepResult,size:"small"},on:{input:function(t){a.row.stepResult=t,e.pointData.patrolTaskPointSteps[a.index]=a.row}}})]);var i=a.row.stepResult;return 1==a.row.stepResultType&&(""==a.row.stepResult?i="":"normal"==a.row.stepResult?i="正常":"abnormal"==a.row.stepResult&&(i="异常")),t("span",{attrs:{title:i}},i)}},{title:"备注",key:"stepComment",width:100,render:function(t,a){return e.isEditPoint?t("div",[t("Input",{props:{value:a.row.stepComment,size:"small"},on:{input:function(t){a.row.stepComment=t,e.pointData.patrolTaskPointSteps[a.index]=a.row}}})]):t("span",{attrs:{title:a.row.stepComment}},a.row.stepComment)}},{title:"照片",key:"action",width:60,render:function(e,a){return e("div",[c.a.tableBtnStyle(e,(function(){t.pointImages=(a.row.stepImgList||[]).slice(0,6),t.lookImagesModal=!0}),"查看")])}}],pointImages:[],H:300,mapLoading:!0,isShowPlayDialog:!1}},computed:Object(o.b)({statesMap:function(t){return t.map.patrol.task.state}}),methods:{concern:function(){var t=this;this.$http.post(l.a.addConcern,{concernId:this.$route.params.id,type:"patrol"}).then((function(e){e.id&&(t.$Notice.success({title:"关注成功！"}),t.detailData.concerned=!0)}))},cancelConcern:function(){var t=this;this.$Modal.confirm({title:"提示",content:"是否要取消关注此条数据？",onOk:function(){t.$http.del(l.a.cancelConcern,{concernIds:t.$route.params.id,type:"patrol"}).then((function(e){e.count&&(t.$Notice.success({title:"成功",desc:"取消关注成功！",duration:3}),t.detailData.concerned=!1)}))},onCancel:function(){}})},interruptTask:function(){var t=this;this.$Modal.confirm({title:"任务终止",content:"是否要终止当前任务？",onOk:function(){t.$http.put(s.a.stop,{taskId:t.detailData.id,isInterupted:"1"}).then((function(e){e.count&&(t.$Notice.success({title:"成功",desc:"操作成功",duration:3}),t.$router.back())})).catch((function(t){}))}})},setPointDataById:function(t){var e=this,a=this.detailData.patrolPointDetailDTOs,i=!1;a.forEach((function(a,n){a.id==t&&(e.currentPonitIndex=n,e.pointData=Object.assign({},a),e.pointData.patrolTaskPointSteps=[],a.patrolTaskPointSteps.forEach((function(t){e.pointData.patrolTaskPointSteps.push(Object.assign({},t))})),i=!0)})),i||this.$Message.error("巡检点数据异常")},taskAssignTo:function(){var t=this;this.assignTo?this.$http.put(s.a.modifyTask,{executorId:this.assignTo,taskId:this.detailData.id}).then((function(e){e.count&&(t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}),t.isShowAssignDialog=!1,t.init())})).catch((function(t){})):this.$Notice.success({title:"成功",desc:"请选择执行人",duration:3})},handleCancle:function(){this.$router.back()},init:function(t){var e=this;this.$http.get(s.a.getTaskDetail+"/"+this.$route.params.id).then((function(a){a.id&&(a.executeStatusText=e.statesMap[a.executeStatus],c.a.transDateFromServer(a.startTime,"yyyy-MM-dd")==c.a.transDateFromServer(a.endTime,"yyyy-MM-dd")?a.executeTime=c.a.transDateFromServer(a.startTime,"yyyy-MM-dd hh:mm:ss"):a.executeTime=c.a.transDateFromServer(a.startTime,"yyyy-MM-dd hh:mm:ss")+" - "+c.a.transDateFromServer(a.endTime,"yyyy-MM-dd hh:mm:ss"),e.detailData=a,e.setPeriodAndUnit(),t&&t(a))}))},myLocation:function(){d.a.placePoint(n)},releaseSubmit:function(){var t=this;this.isShowPointDialog=!1,this.pointData.patrolTaskId=this.detailData.id;var e=Object.assign({},this.pointData);this.$http.put(s.a.updatePatrolTaskPoint,e).then((function(e){t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}),t.init()}))},cancelHandler:function(){this.isShowPointDialog=!1},setPeriodAndUnit:function(){var t=this.detailData.periodUnit,e=this.detailData.period;isNaN(e)||(this.detailData.period=e,"Minute"==t&&(this.detailData.duration=e+"分钟"),"Hour"==t&&(this.detailData.duration=e+"小时"),"Day"==t&&(this.detailData.duration=e+"天"),"Week"==t&&(this.detailData.duration=e+"周"))},handleImg:function(t){return 0===t.type?"handleImg":"handleVideo"},playVideo:function(t){1==t.type&&(this.isShowPlayDialog=!0,document.querySelector("#patrol_task_video").src=t.imgUrl)}},created:function(){var t=this.$route.params.id,e=this.$route.query;t?(e&&"map"==e.type&&(this.taskType="map"),c.a.initTableColumnTitle(this.pointColumns)):this.$Message.error("查询参数错误")},mounted:function(){var t=this;if("map"==this.taskType){var e=document.querySelector(".lay").offsetHeight-310;this.H=e>400?e:400,d.a.create((function(){(n=new BMap.Map("patrol-task-map",{enableMapClick:!1})).enableScrollWheelZoom(),d.a.addSearch(n,"patrol-task-bdmap-search-key"),d.a.setStyle(n),t.init((function(t){d.a.drawPatrolTask(n,t)})),t.mapLoading=!1}))}else this.init();this.$http.get(r.a.getOperators).then((function(e){t.executorNames=e}))}},m=(a(963),a(1)),h=Object(m.a)(v,i,[],!1,null,null,null);h.options.__file="src/views/patrol/task/detail.vue";e.default=h.exports},539:function(t,e,a){"use strict";var i=a(22),n={getTasks:"/patrol/api/tasks",getTaskDetail:"/patrol/api/tasks",delTasks:"/patrol/api/tasks",modifyTask:"/patrol/api/tasks",stop:"/patrol/api/tasks",updatePatrolTaskPoint:"/patrol/api/task-point-step",plan:"/patrol/api/plans",getPlan:"/patrol/api/plans",updatePlan:"/patrol/api/plans",deletePlan:"/patrol/api/plans",planPath:"/patrol/api/plan-path",releasePlan:"/patrol/api/plans/release",interruptPlan:"/patrol/api/plans/interrupt",statistics:"/patrol/api/tasks/statistics",export:i.a+"/patrol/api/tasks/statistics-export",point:"/patrol/api/points",getQrcode:i.a+"/patrol/api/points/qrcode-export",trace:"/patrol/api/tasks/map-track"};e.a=n},542:function(t,e,a){"use strict";!function(){if("undefined"!=typeof document){var t=document.head||document.getElementsByTagName("head")[0],e=document.createElement("style"),a=" *[data-v-5928e1c7] { -webkit-box-sizing: border-box; box-sizing: border-box; } .fullscreen-v-img[data-v-5928e1c7] { z-index: 9999; height: 100%; width: 100%; position: fixed; top: 0; left: 0; overflow: hidden; background-color: rgba(0, 0, 0, 0.7); -ms-touch-action: none; touch-action: none; } .content-v-img img[data-v-5928e1c7] { width: auto; height: auto; max-width: 100%; max-height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .header-v-img[data-v-5928e1c7], .footer-v-img[data-v-5928e1c7] { position: absolute; width: 100%; background-color: rgba(0, 0, 0, 0.3); height: 50px; z-index: 9999; display: flex; align-items: center; } .header-v-img[data-v-5928e1c7] { justify-content: space-between; } .footer-v-img[data-v-5928e1c7] { bottom: 0; justify-content: center; height: 70px; /* scrolling thumbnails on mobile */ overflow-x: auto; } .footer-v-img img[data-v-5928e1c7] { width: 60px; height: 60px; cursor: pointer; -webkit-transition: transform 0.2s ease-out; transition: transform 0.2s ease-out; object-fit: cover; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .footer-v-img img.is-selected[data-v-5928e1c7] { transform: scale(1.1); } .footer-v-img img[data-v-5928e1c7]:not(:last-child) { margin-right: 7px; } .title-v-img[data-v-5928e1c7] { font-family: 'Avenir', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; color: white; text-align: center; max-height: 100%; overflow: auto; } .count-v-img[data-v-5928e1c7], .buttons-v-img[data-v-5928e1c7] { width: 80px; font-family: 'Avenir', Helvetica, Arial, sans-serif; } .count-v-img[data-v-5928e1c7] { font-size: 15px; color: white; margin-left: 10px; } .buttons-v-img[data-v-5928e1c7] { margin-right: 10px; text-align: right; } .buttons-v-img span path[data-v-5928e1c7] { fill: #e5e6eb; -webkit-transition: fill 0.4s ease-in-out; transition: fill 0.4s ease-in-out; } .buttons-v-img span[data-v-5928e1c7] { cursor: pointer; color: #e5e6eb; font-size: 30px; -webkit-transition: color 0.4s ease-in-out; transition: color 0.4s ease-in-out; text-decoration: none; text-align: center; } .buttons-v-img span[data-v-5928e1c7]:not(:last-child) { margin-right: 8px; } .buttons-v-img span svg[data-v-5928e1c7] { height: 20px; width: 15px; } .buttons-v-img span:hover svg path[data-v-5928e1c7] { fill: white; } .buttons-v-img span[data-v-5928e1c7]:hover { color: white; } .prev-v-img svg[data-v-5928e1c7], .next-v-img svg[data-v-5928e1c7] { margin: 5px auto; } .prev-v-img[data-v-5928e1c7], .next-v-img[data-v-5928e1c7] { color: white; width: 35px; height: 35px; position: absolute; top: 50%; margin-top: -12.5px; font-size: 15px; font-family: 'Avenir', Helvetica, Arial, sans-serif; text-align: center; background-color: rgba(0, 0, 0, 0.3); z-index: 1000; opacity: 0.3; -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; cursor: pointer; } .prev-v-img[data-v-5928e1c7]:hover, .next-v-img[data-v-5928e1c7]:hover { opacity: 1; } .prev-v-img[data-v-5928e1c7] { left: 10px; } .next-v-img[data-v-5928e1c7] { right: 10px; } .v-img-fade-enter[data-v-5928e1c7], .v-img-fade-leave-to[data-v-5928e1c7] { opacity: 0; } .v-img-fade-enter-active[data-v-5928e1c7], .v-img-fade-leave-active[data-v-5928e1c7] { -webkit-transition: opacity 0.3s ease-in-out; transition: opacity 0.3s ease-in-out; } ";e.type="text/css",e.styleSheet?e.styleSheet.cssText=a:e.appendChild(document.createTextNode(a)),t.appendChild(e)}}();var i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.closed?t._e():a("div",{staticClass:"fullscreen-v-img",on:{click:function(e){if(e.target!==e.currentTarget)return null;t.close(e)}}},[a("div",{staticClass:"header-v-img"},[a("span",{staticClass:"count-v-img"},[t.images.length>1?a("span",[t._v(t._s(t.currentImageIndex+1)+"/"+t._s(t.images.length)+" ")]):t._e()]),a("span",{staticClass:"title-v-img"},[t._v(t._s(t.titles[t.currentImageIndex]))]),a("div",{staticClass:"buttons-v-img"},[t.sourceButtons[t.currentImageIndex]?a("span",[a("a",{attrs:{href:t.images[t.currentImageIndex],target:"_blank"}},[a("svg",{staticStyle:{"enable-background":"new 0 0 475.078 475.077"},attrs:{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",version:"1.1",id:"Capa_1",x:"0px",y:"0px",width:"512px",height:"512px",viewBox:"0 0 475.078 475.077","xml:space":"preserve"}},[a("path",{attrs:{d:"M467.083,318.627c-5.324-5.328-11.8-7.994-19.41-7.994H315.195l-38.828,38.827c-11.04,10.657-23.982,15.988-38.828,15.988    c-14.843,0-27.789-5.324-38.828-15.988l-38.543-38.827H27.408c-7.612,0-14.083,2.669-19.414,7.994    C2.664,323.955,0,330.427,0,338.044v91.358c0,7.614,2.664,14.085,7.994,19.414c5.33,5.328,11.801,7.99,19.414,7.99h420.266    c7.61,0,14.086-2.662,19.41-7.99c5.332-5.329,7.994-11.8,7.994-19.414v-91.358C475.078,330.427,472.416,323.955,467.083,318.627z     M360.025,414.841c-3.621,3.617-7.905,5.424-12.854,5.424s-9.227-1.807-12.847-5.424c-3.614-3.617-5.421-7.898-5.421-12.844    c0-4.948,1.807-9.236,5.421-12.847c3.62-3.62,7.898-5.431,12.847-5.431s9.232,1.811,12.854,5.431    c3.613,3.61,5.421,7.898,5.421,12.847C365.446,406.942,363.638,411.224,360.025,414.841z M433.109,414.841    c-3.614,3.617-7.898,5.424-12.848,5.424c-4.948,0-9.229-1.807-12.847-5.424c-3.613-3.617-5.42-7.898-5.42-12.844    c0-4.948,1.807-9.236,5.42-12.847c3.617-3.62,7.898-5.431,12.847-5.431c4.949,0,9.233,1.811,12.848,5.431    c3.617,3.61,5.427,7.898,5.427,12.847C438.536,406.942,436.729,411.224,433.109,414.841z",fill:"#FFFFFF"}}),a("path",{attrs:{d:"M224.692,323.479c3.428,3.613,7.71,5.421,12.847,5.421c5.141,0,9.418-1.808,12.847-5.421l127.907-127.908    c5.899-5.519,7.234-12.182,3.997-19.986c-3.23-7.421-8.847-11.132-16.844-11.136h-73.091V36.543c0-4.948-1.811-9.231-5.421-12.847    c-3.62-3.617-7.901-5.426-12.847-5.426h-73.096c-4.946,0-9.229,1.809-12.847,5.426c-3.615,3.616-5.424,7.898-5.424,12.847V164.45    h-73.089c-7.998,0-13.61,3.715-16.846,11.136c-3.234,7.801-1.903,14.467,3.999,19.986L224.692,323.479z",fill:"#FFFFFF"}})])])]):t._e(),a("span",{on:{click:t.close}},[t._v("×")])])]),a("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.visibleUI&&1!==t.images.length?a("span",{staticClass:"prev-v-img",on:{click:t.prev}},[a("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M1664 896v128q0 53-32.5 90.5t-84.5 37.5h-704l293 294q38 36 38 90t-38 90l-75 76q-37 37-90 37-52 0-91-37l-651-652q-37-37-37-90 0-52 37-91l651-650q38-38 91-38 52 0 90 38l75 74q38 38 38 91t-38 91l-293 293h704q52 0 84.5 37.5t32.5 90.5z",fill:"#fff"}})])]):t._e()]),a("transition",{attrs:{appear:"",name:"v-img-fade"}},[t.visibleUI&&1!==t.images.length?a("span",{staticClass:"next-v-img",on:{click:t.next}},[a("svg",{attrs:{width:"25",height:"25",viewBox:"0 0 1792 1915",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293h-704q-52 0-84.5-37.5t-32.5-90.5v-128q0-53 32.5-90.5t84.5-37.5h704l-293-294q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z",fill:"#fff"}})])]):t._e()]),t.thumbnails&&t.images.length>1?a("div",{staticClass:"footer-v-img"},t._l(t.images,(function(e,i){return a("img",{key:i,class:{"is-selected":t.currentImageIndex==i},attrs:{src:e},on:{click:function(e){t.select(i)}}})}))):t._e(),a("div",{staticClass:"content-v-img"},[a("img",{attrs:{src:t.images[t.currentImageIndex]},on:{click:t.next}})])],1)])},staticRenderFns:[],_scopeId:"data-v-5928e1c7",data:function(){return{images:[],titles:[],sourceButtons:[],visibleUI:!0,currentImageIndex:0,closed:!0,uiTimeout:null,handlers:{},thumbnails:!1}},watch:{closed:function(t){t&&this.handlers.closed&&this.handlers.closed(),!t&&this.handlers.opened&&this.handlers.opened()}},methods:{fireChangeEvent:function(){this.handlers.changed&&this.handlers.changed(this.currentImageIndex)},close:function(){this.closed||(document.querySelector("body").classList.remove("body-fs-v-img"),this.images=[],this.currentImageIndex=0,this.closed=!0)},next:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex+1<this.images.length?this.currentImageIndex++:this.currentImageIndex=0,this.fireChangeEvent())},select:function(t){this.currentImageIndex=t},prev:function(){!this.closed&&this.images.length>1&&(this.currentImageIndex>0?this.currentImageIndex--:this.currentImageIndex=this.images.length-1,this.fireChangeEvent())},showUI:function(){var t=this;this.closed||(clearTimeout(this.uiTimeout),this.visibleUI=!0,this.uiTimeout=setTimeout((function(){t.visibleUI=!1}),3500))}},created:function(){var t=this;window.addEventListener("keyup",(function(e){27!==e.keyCode&&81!==e.keyCode||t.close(),39!==e.keyCode&&76!==e.keyCode||t.next(),37!==e.keyCode&&72!==e.keyCode||t.prev()})),window.addEventListener("scroll",(function(){t.close()})),window.addEventListener("mousemove",(function(){t.showUI()}))}},n=(function(){function t(t){this.value=t}function e(e){function a(n,o){try{var s=e[n](o),r=s.value;r instanceof t?Promise.resolve(r.value).then((function(t){a("next",t)}),(function(t){a("throw",t)})):i(s.done?"return":"normal",s.value)}catch(t){i("throw",t)}}function i(t,e){switch(t){case"return":n.resolve({value:e,done:!0});break;case"throw":n.reject(e);break;default:n.resolve({value:e,done:!1})}(n=n.next)?a(n.key,n.arg):o=null}var n,o;this._invoke=function(t,e){return new Promise((function(i,s){var r={key:t,arg:e,resolve:i,reject:s,next:null};o?o=o.next=r:(n=o=r,a(t,e))}))},"function"!=typeof e.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(e.prototype[Symbol.asyncIterator]=function(){return this}),e.prototype.next=function(t){return this._invoke("next",t)},e.prototype.throw=function(t){return this._invoke("throw",t)},e.prototype.return=function(t){return this._invoke("return",t)}}(),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t}),o=function(t,e,a){var i="pointer",n=e.arg||null,o=void 0,s=void 0,r=t.src,l=void 0,c=void 0,d={};return a.altAsTitle&&(l=t.alt),o=a.openOn,s=a.sourceButton,c=a.thumbnails,void 0!==e.value&&(i=e.value.cursor||i,n=e.value.group||n,o=e.value.openOn||o,r=e.value.src||r,l=e.value.title||l,d.opened=e.value.opened,d.closed=e.value.closed,d.changed=e.value.changed,void 0!==e.value.sourceButton&&(s=e.value.sourceButton),void 0!==e.value.thumbnails&&(c=e.value.thumbnails)),t.setAttribute("data-vue-img-src",r),n&&t.setAttribute("data-vue-img-group",n),l&&t.setAttribute("data-vue-img-title",l),s&&t.setAttribute("data-vue-img-source-button",s),c&&t.setAttribute("data-vue-img-thumbnails",c),r||console.error("v-img element missing src parameter."),t.style.cursor=i,{cursor:i,src:r,group:n,title:l,events:d,sourceButton:s,openOn:o,thumbnails:c}},s=function(t,e){var a=t.extend(i);e=n({altAsTitle:!1,sourceButton:!1,thumbnails:!1,openOn:"click"},e),t.directive("img",{update:function(t,a,i,n){var s=void 0,r=void 0;n.data.attrs&&i.data.attrs&&(r=n.data.attrs.src!==i.data.attrs.src,e.altAsTitle&&(s=n.data.attrs.alt!==i.data.attrs.alt));var l=a.oldValue!==a.value;(r||s||l)&&o(t,a,e)},bind:function(i,n){var s=o(i,n,e),r=window.vueImg;if(!r){var l=document.createElement("div");l.setAttribute("id","imageScreen"),document.querySelector("body").appendChild(l),r=window.vueImg=(new a).$mount("#imageScreen")}i.addEventListener(s.openOn,(function(){var e=void 0;e=i.dataset.vueImgGroup?[].concat(function(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}(document.querySelectorAll('img[data-vue-img-group="'+i.dataset.vueImgGroup+'"]'))):[i],t.set(r,"images",e.map((function(t){return t.dataset.vueImgSrc}))),t.set(r,"titles",e.map((function(t){return t.dataset.vueImgTitle}))),t.set(r,"sourceButtons",e.map((function(t){return"true"===t.dataset.vueImgSourceButton}))),t.set(r,"thumbnails","true"===i.dataset.vueImgThumbnails),t.set(r,"currentImageIndex",e.indexOf(i)),t.set(r,"handlers",s.events),t.set(r,"closed",!1)}))}})};"undefined"!=typeof window&&window.Vue&&window.Vue.use(s),e.a=s},558:function(t,e,a){"use strict";var i=a(7),n=a(11);function o(t,e){return{lng:(t.lng+e.lng)/2,lat:(t.lat+e.lat)/2}}var s=a(559),r=a(560),l=a(561),c=a(562),d=a(563),u=a(564),p=a(565),v=a(566),m=(new i.default,[{featureType:"all",elementType:"all",stylers:{lightness:10,saturation:-100}}]);e.a={create:function(t){if("undefined"==typeof BMap){var e=document.createElement("script");e.src="https://api.map.baidu.com/api?v=2.0&ak=0lPULNZ5PmrFVg76kFuRjezF&callback=MG__MAP__CALLBACK",document.body.appendChild(e),window.MG__MAP__CALLBACK=function(){t&&t()}}else t&&t()},addTiles:function(t){if(t){var e=new BMap.TileLayer({isTransparentPng:!0});e.getTilesUrl=function(t,e){return"/images/tiles/"+e+"/"+t.x+"/"+t.y+".png"},t.addTileLayer(e)}},placePoint:function(t,e){t&&(new BMap.Geolocation).getCurrentPosition((function(a){var i={lng:121.480576,lat:31.235906};this.getStatus()==BMAP_STATUS_SUCCESS&&(i.lng=a.point.lng,i.lat=a.point.lat),t.centerAndZoom(new BMap.Point(i.lng,i.lat),15),e&&e(i)}),{enableHighAccuracy:!0})},setStyle:function(t){t&&t.setMapStyle({styleJson:m})},setZoom:function(t,e,a){var i=t.getViewport(e.map((function(t){return{lng:t.longitude,lat:t.latitude}}))),n=i.zoom,o=i.center;t.centerAndZoom(o,a||n)},drawPatrolTask:function(t,e){var a,i=e.patrolPointDetailDTOs||[],n=e.patrolTaskPlanPaths||[];if(t&&i.length&&n.length&&(this.setZoom(t,i),i.forEach((function(e){var i=new BMap.Point(e.longitude,e.latitude);switch(e.status){case"正常":a=new BMap.Icon(r,new BMap.Size(16,21));break;case"异常":a=new BMap.Icon(c,new BMap.Size(16,21));break;case"未检":a=new BMap.Icon(l,new BMap.Size(16,21),{anchor:new BMap.Size(8,21)});break;default:a=new BMap.Icon(s,new BMap.Size(16,21))}var n=new BMap.Marker(i,{icon:a});t.addOverlay(n);var o=new BMap.Label(e.patrolPoint,{position:i,offset:new BMap.Size(10,-15)});o.setStyle({borderColor:"#0093ff",color:"#0093ff"}),t.addOverlay(o);var d="",u="";e.uninspectedStep&&e.uninspectedStep.length?e.uninspectedStep.forEach((function(t){u+="<li>"+t+"</li>"})):u="<li>无</li>","异常"==e.status&&(d="<div ><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>漏检结果</div><ul style='padding-top:2px;clear:both;color:gray;'>"+u+"</ul></div>");var p=new BMap.InfoWindow("<div style='overflow:auto;'><div style='font-size:large;font-weight:bold;'>"+e.patrolPoint+"</div><div><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>报缺数</div>"+e.faultCount+"</div>"+d+"</div>",{width:0,height:0,title:"",enableMessage:!1});n.addEventListener("click",(function(){t.openInfoWindow(p,i)}))})),!(n.length<2)))for(var o=[],d=0,u=n.length;d<=u;d++){var p,v,m;d!=u&&(p=n[d],v=new BMap.Point(p.longitude,p.latitude)),o.length<2?o.push(v):(m=new BMap.Polyline(o,{strokeColor:"valid"==p.validate?"#3a6bdb":"#9b9b9b",strokeWeight:4}),t.addOverlay(m),d!=u&&(o=[o[1],v]))}},drawPatrol:function(t,e,a){var i,s=e.patrolTaskPointTrackDTOs||[],d=e.patrolTaskPlanPaths||[];if(t&&s.length&&d.length&&(this.setZoom(t,s),s.forEach((function(e){var a=new BMap.Point(e.longitude,e.latitude);switch(e.status){case"正常":i=new BMap.Icon(r,new BMap.Size(16,21));break;case"异常":i=new BMap.Icon(c,new BMap.Size(16,21));break;case"未检":i=new BMap.Icon(l,new BMap.Size(16,21),{anchor:new BMap.Size(8,21)})}var n=new BMap.Marker(a,{icon:i});t.addOverlay(n);var o=new BMap.Label(e.patrolPointName,{position:a,offset:new BMap.Size(10,-15)});o.setStyle({borderColor:"#0093ff",color:"#0093ff"}),t.addOverlay(o);var s="",d="";e.uninspectedStep&&e.uninspectedStep.length?e.uninspectedStep.forEach((function(t){d+="<li>"+t+"</li>"})):d="<li>无</li>","异常"==e.status&&(s="<div ><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>漏检结果</div><ul style='padding-top:2px;clear:both;color:gray;'>"+d+"</ul></div>");var u=new BMap.InfoWindow("<div style='overflow:auto;'><div style='font-size:large;font-weight:bold;'>"+e.patrolPointName+"</div><div><div style='padding:2px 0 2px 0;font-weight:bold;border-bottom:solid 1px #eee;'>报缺数</div>"+e.faultCount+"</div>"+s+"</div>",{width:0,height:0,title:"",enableMessage:!1});n.addEventListener("click",(function(){t.openInfoWindow(u,a)}))})),!(d.length<2)))for(var u=new BMap.InfoWindow("<h5>"+e.name+"</h5><div>"+e.executeStatus+"</div><div>时间："+n.a.transDateFromServer(e.startTime,"hh:mm")+" - "+n.a.transDateFromServer(e.endTime,"hh:mm")+"</div><div>发现缺陷："+e.faultCount+"</div><div>巡检点："+e.inspectedCount+"/"+e.patrolPointCount+"</div><div>计划距离："+e.planPathLength+"米</div><div>有效距离："+e.validPathLength+"米</div>",{width:270,height:140,title:"",enableMessage:!1}),p=[],v=0,m=d.length;v<=m;v++){var h,g,f;v!=m&&(h=d[v],g=new BMap.Point(h.longitude,h.latitude)),p.length<2?p.push(g):((f=new BMap.Polyline(p,{strokeColor:"valid"==h.validate?"#3a6bdb":"#9b9b9b",strokeWeight:4})).addEventListener("mouseover",(function(){this.setStrokeStyle("dashed")})),f.addEventListener("mouseout",(function(){this.setStrokeStyle("solid")})),f.addEventListener("click",(function(e){var a=e.target.getPath()[0],i=e.target.getPath()[1];t.openInfoWindow(u,new BMap.Point(o(a,i).lng,o(a,i).lat))})),t.addOverlay(f),v!=m&&(p=[p[1],g]))}},addSearch:function(t,e,a){new BMap.Autocomplete({input:e||"bdmap-search-key",location:t}).addEventListener("onconfirm",(function(e){var i=e.item.value,n=i.province+i.city+i.district+i.street+i.business,o=new BMap.LocalSearch(t,{onSearchComplete:function(){var e=o.getResults().getPoi(0).point;t.centerAndZoom(e,18),a&&a(e)}});o.search(n)}))},getBDPoints:function(t){if(!t)return[];var e=[];return t.forEach((function(t){t.longitude&&t.latitude&&e.push(new BMap.Point(t.longitude,t.latitude))})),e},hitPoint:function(t,e,a){"[object Array]"!==Object.prototype.toString.call(e)&&(e=[e]),e.forEach((function(e){if(e.longitude&&e.latitude){var i=new BMap.Point(e.longitude,e.latitude),n=new BMap.Marker(i,{icon:new BMap.Icon(s,new BMap.Size(16,21))});a&&"boolean"==typeof a?n.disableDragging():"function"==typeof a&&(n.enableDragging(),n.addEventListener("dragend",(function(t){a(t)})));var o=new BMap.Label(e.patrolPoint,{offset:new BMap.Size(20,-10)});o.setStyle({borderColor:"#0093ff",color:"#0093ff"}),n.setLabel(o),n.setTitle(e.id),t.addOverlay(n)}}))},renderLine:function(t,e,a){var i=new BMap.Polyline(e,Object.assign({enableEditing:!1,enableClicking:!0,strokeWeight:"5",strokeOpacity:.65},a||{}));return t.addOverlay(i),i},hitProcess:function(t,e,a,i){var n=[],o=[];return e.forEach((function(e,i){if(e.longitude&&e.latitude){var s=e.handleStatus?d:u,r=new BMap.Point(e.longitude,e.latitude),l=new BMap.Marker(r,{icon:new BMap.Icon(s,new BMap.Size(36,30))}),c=(12*e.name.length+20)/2,p=new BMap.Label(e.name,{offset:new BMap.Size(18-c,-26)});p.setStyle({backgroundColor:"#FFFFFF",borderColor:"#FFFFFF",color:"#4A4A4A",borderRadius:"2px",boxShadow:"2px 2px 4px 0px rgba(0,0,0,0.13)",padding:"3px 10px",cursor:"pointer"}),l.setLabel(p),l.setZIndex(2e3+i),t.addOverlay(l),o.push(l),p.addEventListener("click",(function(){a&&a(this,r,e)})),l.addEventListener("click",(function(){a&&a(this,r,e)})),n.push(r)}})),i&&i(o),n},hitStaff:function(t,e,a,i){var n=[],o=[];return e.forEach((function(e,i){if(e.longitude&&e.latitude){var s=1==e.haveTask?p:v,r=new BMap.Point(e.longitude,e.latitude),l=new BMap.Marker(r,{icon:new BMap.Icon(s,new BMap.Size(23,32))}),c=(12*e.userName.length+20)/2,d=new BMap.Label(e.userName,{offset:new BMap.Size(12-c,-26)});d.setStyle({backgroundColor:"#FFFFFF",borderColor:"#FFFFFF",color:"#4A4A4A",borderRadius:"2px",boxShadow:"2px 2px 4px 0px rgba(0,0,0,0.13)",padding:"3px 10px"}),l.setLabel(d),l.setZIndex(1e3+i),t.addOverlay(l),o.push(l),l.addEventListener("click",(function(){a&&a(this,r,e)})),n.push(r)}})),i&&i(o),n}}},559:function(t,e,a){t.exports=a.p+"images/f2b760922921a7f0fd4d402145d6dbd5.png"},560:function(t,e,a){t.exports=a.p+"images/5a97737f8744e4f0a37e9eadcaae7469.png"},561:function(t,e,a){t.exports=a.p+"images/e91e0c308e4bdfa03605696ce3358b1b.png"},562:function(t,e,a){t.exports=a.p+"images/bd4523e3b67968731b5d77d0a89dcb9f.png"},563:function(t,e,a){t.exports=a.p+"images/6cc09be5e8a6202e732126b57d5d92da.png"},564:function(t,e,a){t.exports=a.p+"images/96e02f4efb20c9a13722cc8ae3fd59d8.png"},565:function(t,e,a){t.exports=a.p+"images/5980ed2516736ab58921267e07915b43.png"},566:function(t,e,a){t.exports=a.p+"images/1316c96a11c16e1faf98fa712e4b33c8.png"},713:function(t,e,a){var i=a(964);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,a(17).default)("74e09a42",i,!1,{})},963:function(t,e,a){"use strict";var i=a(713);a.n(i).a},964:function(t,e,a){(e=a(10)(!1)).push([t.i,".patrol-task-images-dialog .ivu-modal-footer {\n  padding: 0;\n}\n.patrol-task-images-dialog .point-img-box {\n  display: flex;\n  flex-wrap: wrap;\n  min-height: 280px;\n  margin-right: -18px;\n}\n.patrol-task-images-dialog .point-img-box .point-img-item {\n  position: relative;\n  width: 30%;\n  height: 120px;\n  margin-bottom: 18px;\n  margin-right: 18px;\n}\n.patrol-task-images-dialog .point-img-box .point-img-item img {\n  width: 100%;\n  height: 100%;\n  object-fit: contain;\n}\n.patrol-task-images-dialog .point-img-box .point-img-item i {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  font-size: 40px;\n  color: #fff;\n}\n.patrol-task-images-dialog .point-img-box .no-data {\n  align-self: center;\n  margin: 0 auto;\n}\n.play-dialog .ivu-modal-header {\n  padding: 0;\n  border: none;\n  background: #fff;\n}\n.play-dialog .ivu-modal {\n  top: 50%;\n  margin-top: -240px;\n  height: 400px;\n}\n.play-dialog .ivu-modal-body {\n  padding: 0;\n  height: 400px;\n}\n.play-dialog video {\n  object-fit: contain;\n}\n.play-dialog .ivu-modal-footer {\n  padding: 0;\n}\n.play-dialog .dplayer {\n  height: 400px;\n}\n.play-dialog .ivu-modal-close {\n  top: -20px;\n  right: -15px;\n}\n.play-dialog .ivu-icon-ios-close-empty {\n  color: #FFF;\n}\n",""]),t.exports=e}}]);