(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{1284:function(e,n,a){"use strict";a.r(n);var t=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"home-item"},[a("h3",[e._v(e._s(e.maintainDefault.orgName)+" "),e.isEdit?a("a",{staticClass:"home-edit-btn",attrs:{href:"javascript:;"},on:{click:e.edit}},[e._v("编辑")]):e._e(),e.isEdit?a("a",{staticClass:"home-del-btn",attrs:{href:"javascript:;"},on:{click:e.del}},[e._v("删除")]):e._e()]),e._v(" "),a("div",{staticClass:"home-maintenance-group-flex"},[e.itemData.data?a("div",{staticClass:"home-maintenance-group"},[e.maintenanceLoading?a("Spin",{attrs:{fix:""}}):e._e(),e._v(" "),a("ul",{staticClass:"maintenance-group-member"},[e._l(e.maintainDefault.users,(function(n,t){return[a("li",{key:t},[a("div",{directives:[{name:"show",rawName:"v-show",value:""==n.imgUrl,expression:"item.imgUrl == ''"}],staticClass:"member_img_default"}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:n.imgUrl||null==n.imgUrl,expression:"item.imgUrl || item.imgUrl == null"}],staticClass:"member_img_span",on:{click:function(a){return e.toRouterRepair(n)}}},[a("img",{directives:[{name:"show",rawName:"v-show",value:null!=n.imgUrl,expression:"item.imgUrl != null"}],attrs:{src:n.imgUrl,width:"50",height:"50"}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:null==n.imgUrl,expression:"item.imgUrl == null"}],staticClass:"imgUrl-default"})]),e._v(" "),a("span",{staticClass:"member_name",attrs:{title:n.executeUserName?n.executeUserName:"无"}},[e._v(e._s(n.executeUserName?n.executeUserName:"无"))]),e._v(" "),a("span",{class:n.kpiValue?"member_count":"member_count member_count_default"},[e._v(e._s(n.kpiValue?n.kpiValue:"暂无"))])])]}))],2),e._v(" "),a("div",{staticClass:"maintenance-group-circle"},[a("div",{staticClass:"maintenance-group-circle-div"},[a("p",[e._v("维修应答率")]),e._v(" "),a("p",{class:["maintenance-group-circle",e.maintainDefault.repairTimelyRate<"60%"?"color-middle":"color-good"]},[e._v(e._s(e._f("E")(e.maintainDefault.repairTimelyRate))),e.maintainDefault.repairTimelyRate&&e.maintainDefault.repairTimelyRate>="60%"?a("i",{staticClass:"icon-like"}):e._e()])]),e._v(" "),a("div",{staticClass:"maintenance-group-circle-div"},[a("p",[e._v("维保完成率")]),e._v(" "),a("p",{staticClass:"task-circle"},[a("a",{class:["task-link",e.maintainDefault.maintainCompletionRate<"60%"?"color-middle":"color-good"],on:{click:function(n){return e.toRouterTaskPanel(e.maintainDefault)}}},[e._v(e._s(e._f("E")(e.maintainDefault.maintainCompletionRate)))])])])])],1):a("div",{staticClass:"home-mod-empty"},[e._v("请点击编辑进行配置")])]),e._v(" "),a("Modal",{attrs:{width:433,title:"选择所属组织","class-name":"dax-home-org-modal"},model:{value:e.orgModalShown,callback:function(n){e.orgModalShown=n},expression:"orgModalShown"}},[a("div",{staticClass:"c-form-item"},[a("label",[e._v("所属组织：")]),a("dropdown-tree",{attrs:{url:e.treeApi.getOrgTreeData,width:250},model:{value:e.org,callback:function(n){e.org=n},expression:"org"}})],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("div",{staticClass:"c-modal-footer-btns"},[a("Button",{attrs:{type:"default",shape:"circle"},on:{click:function(n){e.orgModalShown=!1}}},[e._v("取消")]),e._v(" "),a("Button",{attrs:{type:"primary",shape:"circle"},on:{click:e.add}},[e._v("确定")])],1)])])],1)};t._withStripped=!0;a(23);var i=a(145),o=(a(11),a(107)),r=a(31),m={components:{dropdownTree:i.a},props:{isEdit:Boolean,itemData:Object},data:function(){return{maintenanceLoading:!1,maintainDefault:{},orgModalShown:!1,treeApi:o.a,org:{id:"",title:"请选择"}}},methods:{del:function(){this.$emit("on-delete",this.itemData)},edit:function(){this.orgModalShown=!0,this.org.id=this.maintainDefault.orgId,this.org.title=this.maintainDefault.orgName},getData:function(){var e=this;this.itemData.data&&this.itemData.data.orgId&&(this.maintenanceLoading=!0,this.$http.get(r.a.hayWebMaintainDefault,{orgId:this.itemData.data.orgId}).then((function(n){if(e.maintenanceLoading=!1,e.maintainDefault=n,n)if(e.maintainDefault.users.length<=8){var a=new Array(10-n.users.length).fill({executeUserName:"",imgUrl:"",kpiValue:""});e.maintainDefault.users=e.maintainDefault.users.concat(a)}else e.maintainDefault.users=e.maintainDefault.users.slice(0,8)})))},add:function(){var e=this;this.$http.post(r.a.modSave,{i:this.itemData.i,data:JSON.stringify({orgId:this.org.id})}).then((function(n){e.orgModalShown=!1,e.$Notice.success({title:"编辑成功"}),e.itemData.data={orgId:e.org.id},e.getData()}))},toRouterTaskPanel:function(e){this.$router.push({name:"maintain-task",params:{org:e}})},toRouterRepair:function(e){this.$router.push({name:"maintain-task",params:{data:e}})}},mounted:function(){this.getData()}},l=(a(844),a(1)),c=Object(l.a)(m,t,[],!1,null,null,null);c.options.__file="src/views/home/components/6/organization.vue";n.default=c.exports},635:function(e,n,a){var t=a(845);"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);(0,a(17).default)("2fbc1a68",t,!1,{})},844:function(e,n,a){"use strict";var t=a(635);a.n(t).a},845:function(e,n,a){var t=a(10),i=a(24),o=a(846),r=a(847),m=a(848);n=t(!1);var l=i(o),c=i(r),s=i(m);n.push([e.i,".home-maintenance-group-flex {\n  padding: 0 0 0 10px;\n  overflow: hidden;\n  position: relative;\n}\n.home-maintenance-group {\n  padding: 15px 0 20px 60px;\n}\n.home-maintenance-group .maintenance-group-member {\n  float: left;\n  margin-right: 40px;\n  width: 310px;\n  height: 160px;\n  list-style-type: none;\n  padding-top: 5px;\n}\n.home-maintenance-group .maintenance-group-member li {\n  float: left;\n  width: 24%;\n  margin-right: 1%;\n  margin-bottom: 20px;\n  position: relative;\n}\n.home-maintenance-group .maintenance-group-member span {\n  width: 50px;\n  display: block;\n  text-align: center;\n  font-size: 10px;\n  color: #9B9B9B;\n}\n.home-maintenance-group .maintenance-group-member .member_img_span {\n  width: 50px;\n  height: 50px;\n  border-radius: 50px;\n  overflow: hidden;\n  cursor: pointer;\n}\n.home-maintenance-group .maintenance-group-member .member_img_span img {\n  width: 100%;\n  height: 100%;\n}\n.home-maintenance-group .maintenance-group-member .member_img_default {\n  width: 50px;\n  height: 50px;\n  background: url("+l+") no-repeat left top;\n  border-radius: 50px;\n}\n.home-maintenance-group .maintenance-group-member .imgUrl-default {\n  width: 50px;\n  height: 50px;\n  border-radius: 50px;\n  background: url("+c+") no-repeat left top;\n}\n.home-maintenance-group .maintenance-group-member .member_name {\n  margin-top: 4px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.home-maintenance-group .maintenance-group-member .member_count {\n  position: absolute;\n  top: -5px;\n  right: 3px;\n  width: 38px;\n  height: 18px;\n  line-height: 20px;\n  background: #4b7efe;\n  color: #fff;\n  border-radius: 20px;\n}\n.home-maintenance-group .maintenance-group-member .member_count_default {\n  background: #eceef4;\n  color: #9B9B9B;\n}\n.home-maintenance-group .maintenance-group-circle {\n  float: left;\n}\n.home-maintenance-group .maintenance-group-circle .maintenance-group-circle-div {\n  margin: 25px 0;\n  color: #333;\n  overflow: hidden;\n}\n.home-maintenance-group .maintenance-group-circle .maintenance-group-circle-div .icon-like {\n  background: url("+s+") no-repeat center center;\n  width: 20px;\n  height: 19px;\n  display: inline-block;\n  margin-left: 12px;\n  position: relative;\n  top: 2px;\n}\n.home-maintenance-group .maintenance-group-circle .maintenance-group-circle-div .maintenance-group-circle {\n  font-size: 20px;\n  color: #4b7efe;\n}\n.home-maintenance-group .maintenance-group-circle .maintenance-group-circle-div .task-circle {\n  font-size: 20px;\n}\n.home-maintenance-group .maintenance-group-circle .maintenance-group-circle-div .task-circle .task-link {\n  color: #F5A623;\n}\n.color-good {\n  color: #4b7efe !important;\n}\n.color-middle {\n  color: #F5A623 !important;\n}\n.color-bad {\n  color: #e03e3c !important;\n}\n",""]),e.exports=n},846:function(e,n,a){e.exports=a.p+"images/6b7c71b191a0c8a36ac62b176b90d16b.png"},847:function(e,n,a){e.exports=a.p+"images/5ba5b0954d99f1f6308d5b15d18a3971.png"},848:function(e,n,a){e.exports=a.p+"images/cde670abdd7f2c22b95e4d9082d9097b.png"}}]);