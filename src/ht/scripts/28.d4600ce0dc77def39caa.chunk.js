(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1272:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"c-main-border"},[i("Form",{ref:"pointForm",attrs:{model:t.point,rules:t.formRules,"label-width":100}},[i("div",{staticClass:"c-left-border-blue"},[i("h3",[t._v("\n                巡检点\n                "),"edit"==t.pageStatus?i("span",{staticStyle:{"font-size":"12px",color:"#999","margin-left":"20px","font-weight":"100"}},[t._v("(编号： "+t._s(t.point.no)+")")]):t._e()]),t._v(" "),i("div",{staticClass:"c-btns-right"},[i("Button",{attrs:{type:"primary",shape:"circle",loading:t.btnLoading},on:{click:t.submit}},[t._v("保存")]),t._v(" "),i("Button",{staticClass:"c-btn-back",attrs:{type:"primary",shape:"circle"},on:{click:t.back}},[t._v("取消")])],1)]),t._v(" "),i("div",{staticClass:"c-top-border-gray",staticStyle:{padding:"20px 0 0"}},[i("div",{staticClass:"c-form-row-2col"},[i("div",{staticClass:"c-form-item"},[i("FormItem",{attrs:{prop:"patrolPoint",label:"名称："}},[i("Input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入名称"},model:{value:t.point.patrolPoint,callback:function(e){t.$set(t.point,"patrolPoint",e)},expression:"point.patrolPoint"}})],1)],1),t._v(" "),i("div",{staticClass:"c-form-item"},[i("FormItem",{attrs:{prop:"pointProcesses",label:"区域位置："}},[i("my-process-tree-authority",{attrs:{url:t.treeApi.getProcessTreeData,type:"PROCESS"},on:{"on-change":t.processSelect},model:{value:t.pointProcesses,callback:function(e){t.pointProcesses=e},expression:"pointProcesses"}})],1)],1)]),t._v(" "),i("div",{staticClass:"c-form-row-1col"},[i("div",{staticClass:"c-form-item"},[i("FormItem",{attrs:{label:"描述："}},[i("Input",{staticStyle:{width:"300px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入描述"},model:{value:t.point.description,callback:function(e){t.$set(t.point,"description",e)},expression:"point.description"}})],1)],1)])]),t._v(" "),i("div",{staticClass:"c-top-border-gray"},[i("div",{staticClass:"c-plain-bg-h"},[i("h3",[t._v("巡检步骤")]),t._v(" "),i("div",{staticClass:"c-btns-right"},[i("Button",{staticClass:"c-btn-add",attrs:{type:"primary",shape:"circle",size:"small"},on:{click:t.addStep}},[t._v("新增")])],1)]),t._v(" "),i("Table",{attrs:{columns:t.columns,data:t.point.patrolSteps,stripe:""}})],1)]),t._v(" "),i("Modal",{attrs:{width:"600",title:"选择人工录入测点"},model:{value:t.modalShown,callback:function(e){t.modalShown=e},expression:"modalShown"}},[i("mg-single-select-table",{ref:"modalTable",attrs:{columns:t.modalColumns,url:t.modalUrl,manual:!0,searchPlaceholder:"测点编号/名称"},on:{"on-select":t.selectMpoint}}),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};n._withStripped=!0;var a=i(11),r=i(539),o=i(107),s=i(39),l=i(531),p=i(149),c=[{label:"状态",value:1},{label:"数据",value:2}];var d={components:{myProcessTreeAuthority:l.a,mgSingleSelectTable:p.a},data:function(){var t=this;return{pageStatus:"add",treeApi:o.a,point:{id:null,patrolSteps:[]},pointProcesses:{id:null,title:"请选择"},formRules:{patrolPoint:[{required:!0,message:"请输入名称",trigger:"blur"},{max:20,message:"名称不能超过20个字符",trigger:"change"}],pointProcesses:[{required:!0,trigger:"change",message:"请选择区域位置"}]},btnLoading:!1,columns:[{title:"序号",type:"index",width:60},{title:"步骤",key:"step",width:500,render:function(e,i){var n=e("Input",{style:{width:"450px"},props:{size:"small",value:t.point.patrolSteps[i.index].step,placeholder:"步骤名称",maxlength:200},on:{input:function(e){t.point.patrolSteps[i.index]=Object.assign({},t.point.patrolSteps[i.index],{step:e})}}});return e("FormItem",{props:{labelWidth:1,showMessage:!1,prop:"patrolSteps."+[i.index]+".step",rules:{required:!0,trigger:"blur"}},style:{margin:0}},[n])}},{title:"结果类型",key:"resultType",width:120,render:function(e,i){var n=c.map((function(t){return e("Option",{props:{value:t.value,key:t.key,label:t.label}})}));return e("Select",{style:{width:"80px"},props:{size:"small",transfer:!0,value:i.row.resultType},on:{"on-change":function(e){t.point.patrolSteps[i.index].resultType=i.row.resultType=e}}},n)}},{title:"绑定测点",key:"mpointName",render:function(e,i){if(2==i.row.resultType){var n=e("a",{class:"c-btn-text",style:{margin:"0 0 0 10px"},on:{click:function(){t.modalShown=!0,t.tableActiveIndex=i.row.tempId}}},"[选择测点]"),a=e("span",t.point.patrolSteps[i.index].mpointName||"未选择"),r=e("a",{class:"c-btn-text",style:{margin:"0 0 0 10px"},on:{click:function(){var e=i.row.tempId,n=t.point.patrolSteps;n.forEach((function(t,i){if(t.tempId==e){var a=Object.assign({},n[i],{mpointId:"",mpointName:""});n.splice(i,1,a)}}))}}},"[清除]");return e("div",[a,n,r])}if(1==i.row.resultType)return e("span","--")}},{title:"操作",key:"",width:100,render:function(e,i){return e("div",[a.a.tableBtnStyle(e,(function(){t.delStep(i.index)}),"删除")])}}],tableActiveIndex:"",modalShown:!1,modalColumns:[{title:"测点编号",key:"mpointId"},{title:"区域位置",key:"siteName"},{title:"测点名称",key:"mpointName"}],modalUrl:s.a.point}},watch:{pointProcesses:function(t,e){this.$refs.modalTable.getData({datasource:"INPUT",siteId:t.id})}},methods:{getData:function(){var t=this;this.$http.get(r.a.point+"/"+this.$route.params.id).then((function(e){e.id&&(e.patrolSteps.forEach((function(t){t.tempId=a.a.gusid(8),t.mpointName||t.mpointId||(t.mpointName="",t.mpointId="")})),t.point=e,t.pointProcesses.id=e.relatedProcess,t.pointProcesses.title=e.relatedProcessNames,t.point.pointProcesses=e.relatedProcess)}))},processSelect:function(){this.point.pointProcesses=this.pointProcesses.id},addStep:function(){this.point.patrolSteps.push({mpointId:"",mpointName:"",patrolPointId:"",resultType:1,state:"",step:"",tempId:a.a.gusid(8)})},delStep:function(t){this.point.patrolSteps.splice(t,1)},submit:function(){var t=this;this.$refs.pointForm.validate((function(e){if(e){t.point.relatedProcess=t.pointProcesses.id;var i=t.point.patrolSteps;if(0==i.length)return void t.$Notice.warning({title:"请新增巡检步骤"});i.forEach((function(t){})),t.btnLoading=!0,(t.point.id?t.$http.put:t.$http.post)(r.a.point,t.point).then((function(e){t.btnLoading=!1,(e.id||e.count)&&(t.$Notice.success({title:"成功",desc:"数据保存成功",duration:3}),t.$router.push({name:"patrol-point",params:{topId:t.point.id||e.id}}))})).catch((function(){t.btnLoading=!1}))}}))},back:function(){this.$router.back()},selectMpoint:function(t){var e=this.tableActiveIndex,i=this.point.patrolSteps;i.forEach((function(n,a){if(n.tempId==e){var r=Object.assign({},i[a],{mpointId:t.id,mpointName:t.mpointName});i.splice(a,1,r)}})),this.modalShown=!1}},mounted:function(){"patrol-point-edit"==this.$route.name&&this.$route.params.id?(this.pageStatus="edit",this.getData()):this.addStep(),this.$refs.modalTable.getData({datasource:"INPUT"})}},u=i(1),h=Object(u.a)(d,n,[],!1,null,null,null);h.options.__file="src/views/patrol/point/form.vue";e.default=h.exports},518:function(t,e,i){var n=i(530);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(17).default)("4411afe8",n,!1,{})},529:function(t,e,i){"use strict";var n=i(518);i.n(n).a},530:function(t,e,i){(e=i(10)(!1)).push([t.i,"\n.cmp-dropdown-tree {\r\n    display: inline-block;\r\n    position: relative;\r\n    vertical-align: middle;\r\n    line-height: normal;\n}\n.ivu-form-item-error .cmp-dropdown-tree-label {\r\n    border: 1px solid #ed3f14;\n}\n.ivu-form-item-error .cmp-dropdown-tree-arrow {\r\n    border-left: 1px solid #ed3f14;\n}\n.cmp-dropdown-tree-label {\r\n    height: 28px;\r\n    width: 100%;\r\n    border: 1px solid #eaeaea;\r\n    display: flex;\r\n    border-radius: 3px;\r\n    cursor: pointer;\n}\n.cmp-dropdown-tree-text {\r\n    line-height: 28px;\r\n    text-indent: 5px;\r\n    flex: 1;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\n}\n.cmp-dropdown-tree-arrow {\r\n    margin-top: -1px;\r\n    width: 28px;\r\n    height: 28px;\r\n    border-left: 1px solid #eaeaea;\r\n    text-align: center;\r\n    line-height: 28px;\n}\n.cmp-dropdown-tree .ivu-input-group-append {\r\n    width: 25px;\r\n    height: 28px;\r\n    overflow: hidden;\r\n    padding: 0;\n}\n.cmp-dropdown-tree .ivu-btn {\r\n    padding: 5px 10px;\n}\n.cmp-dropdown-tree-tree {\r\n    z-index: 901;\r\n    position: absolute;\r\n    top: 37px;\r\n    left: 0;\r\n    min-width: 300px;\r\n    max-height: 400px;\r\n    overflow: auto;\r\n    padding: 5px 10px;\r\n    background-color: #fff;\r\n    box-shadow: 1px 1px 5px #999;\r\n    border-radius: 3px;\n}\r\n",""]),t.exports=e},531:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:t.hideTree,expression:"hideTree"}],staticClass:"cmp-dropdown-tree",style:{width:t.width+"px"}},[i("div",{staticClass:"cmp-dropdown-tree-label",on:{click:t.labelClick}},[i("div",{staticClass:"cmp-dropdown-tree-text"},[t._v(t._s(t.value.title))]),t._v(" "),i("div",{staticClass:"cmp-dropdown-tree-arrow"},[i("Icon",{directives:[{name:"show",rawName:"v-show",value:1!=t.isShowTree,expression:"isShowTree != true"}],attrs:{type:"ios-arrow-down"}}),t._v(" "),i("Icon",{directives:[{name:"show",rawName:"v-show",value:1==t.isShowTree,expression:"isShowTree == true"}],attrs:{type:"ios-arrow-up"}})],1)]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.isShowTree,expression:"isShowTree"}],staticClass:"cmp-dropdown-tree-tree"},[i("Tree",{attrs:{data:t.datas,"show-checkbox":t.showCheckbox,multiple:t.multiple},on:{"on-select-change":t.selectTree}})],1)])};n._withStripped=!0;var a=i(11),r=i(146),o=i(147);function s(t){return function(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function l(t){!function t(e){e.forEach((function(e,i){e.childrenIds=function t(e,i){i=i||[];return e.forEach((function(e){e.children.length&&t(e.children,i),i.push(Math.abs(e.id))})),i}(e.children),e.children.length&&t(e.children)}))}(t)}var p={name:"myProcessTreeAuthority",mixins:[r.a],props:{field:String,value:Object,data:Array,url:String,query:Object,showCheckbox:Boolean,multiple:Boolean,width:{type:[Number,String],default:300},type:String},watch:{"value.id":function(t){t?this.flatDatas.length&&(a.a.setTrueTreeExpand(this.datas,t),a.a.setTrueTreeSelected(this.datas,t)):(!function t(e){for(var i,n=e.length,a=0;a<n;a++)1==(i=e[a]).selected&&(i.selected=!1),i.children.length&&t(i.children)}(this.datas),this.$emit("input",{id:"",title:"请选择"}))},data:function(t){this.datas=t}},data:function(){return{datas:this.data,flatDatas:[],isShowTree:!1}},methods:{selectTree:function(t){var e=this,i=[],n=[],a=[],r=this.field||"id",o=[];t.forEach((function(t){i.push(Math.abs(t[r])),n.push(t.key),a.push(t.title),o=o.concat(Math.abs(t[r]),t.childrenIds)})),o=s(new Set(o)),this.$emit("input",{id:i.join(),key:n.join(),title:a.join(),childrenIds:o}),this.$emit("on-change",{id:i.join(),key:n.join(),title:a.join(),childrenIds:o}),this.multiple||(this.isShowTree=!1),setTimeout((function(){e.dispatch("FormItem","on-form-change",{id:i.join(),key:n.join(),title:a.join(),childrenIds:o})}),100)},hideTree:function(){this.isShowTree=!1},labelClick:function(){this.isShowTree=!this.isShowTree}},directives:{clickoutside:o.a},mounted:function(){var t=this;this.url&&this.$http.get(this.url,this.query).then((function(e){e&&e.length&&(e.forEach((function(t){!1===t.authorized&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),"EQUTYPE"==t.type&&e.forEach((function(t){var i=e.filter((function(e){return e.parentId==t.id}));("org"==t.type||i.length>0)&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),"PROCESS"==t.type&&e.forEach((function(t){1==t.type&&(t.render=function(t,e){e.root,e.node;return t("span",[e.data.name])})})),t.flatDatas=e,t.value.id&&(a.a.setTreeExpand(t.flatDatas,t.value.id),a.a.setFlatTreeSelected(t.flatDatas,t.value.id)),t.datas=a.a.transDataToTree(t.flatDatas),l(t.datas))}))}},c=(i(529),i(1)),d=Object(c.a)(p,n,[],!1,null,null,null);d.options.__file="src/components/my-process-tree-authority.vue";e.a=d.exports},539:function(t,e,i){"use strict";var n=i(22),a={getTasks:"/patrol/api/tasks",getTaskDetail:"/patrol/api/tasks",delTasks:"/patrol/api/tasks",modifyTask:"/patrol/api/tasks",stop:"/patrol/api/tasks",updatePatrolTaskPoint:"/patrol/api/task-point-step",plan:"/patrol/api/plans",getPlan:"/patrol/api/plans",updatePlan:"/patrol/api/plans",deletePlan:"/patrol/api/plans",planPath:"/patrol/api/plan-path",releasePlan:"/patrol/api/plans/release",interruptPlan:"/patrol/api/plans/interrupt",statistics:"/patrol/api/tasks/statistics",export:n.a+"/patrol/api/tasks/statistics-export",point:"/patrol/api/points",getQrcode:n.a+"/patrol/api/points/qrcode-export",trace:"/patrol/api/tasks/map-track"};e.a=a}}]);