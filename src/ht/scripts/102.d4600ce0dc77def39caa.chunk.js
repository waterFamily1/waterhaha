(window.webpackJsonp=window.webpackJsonp||[]).push([[102],{1273:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home-item home-task"},[a("h3",[t._v("我的任务 "),t.isEdit?a("a",{staticClass:"home-del-btn",attrs:{href:"javascript:;"},on:{click:t.del}},[t._v("删除")]):t._e()]),t._v(" "),a("div",{staticClass:"home-task-tab"},[a("mg-tab",{attrs:{groups:t.tabs,multiple:!1,entire:!1,underline:""},on:{"on-click":t.loadTask},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}})],1),t._v(" "),a("div",{staticClass:"home-task-table"},[0==t.taskList.length?a("div",{staticClass:"home-task-empty"},[a("Icon",{attrs:{type:"coffee",size:"60",color:"#DDD"}}),t._v(" "),a("div",[t._v("暂无任务")])],1):a("div",[a("Table",{attrs:{columns:t.columns,data:t.taskList,loading:t.loading,"show-header":!1,"no-data-text":"",size:"small",stripe:""}})],1)])])};n._withStripped=!0;var i=a(11),s=a(31),r=a(524),o={props:{isEdit:Boolean,itemData:Object},components:{mgTab:r.a},data:function(){var t=this;return{tabs:[{label:"巡检任务",value:1},{label:"消缺任务",value:2},{label:"维修工单",value:3},{label:"保养任务",value:4}],activeTab:[1],taskList:[],columns:[{key:"name",render:function(e,a){return e("a",{on:{click:function(){var e;switch(a.row.type){case 1:e="patrol-task-detail";break;case 2:e="fault-detail";break;case 3:e="repair-detail";break;case 4:e="maintain-task-detail"}t.$router.push({name:e,params:{id:a.row.id}})}}},a.row.name)}},{key:"no",width:150,render:function(t,e){return t("span",{attrs:{title:e.row.no||""}},e.row.no||"")}},{key:"property",width:80,render:function(t,e){return t("span",{style:{color:"执行"===e.row.statusName?"#4b7efe":"#E03E3E"}},e.row.statusName)}},{key:"showTime",width:140,render:function(t,e){return t("span",1==e.row.type?i.a.transDateFromServer(e.row.showTime,"yyyy-MM-dd")+i.a.transDateFromServer(e.row.startTime," hh:mm"):2==e.row.type?i.a.transDateFromServer(e.row.showTime,"yyyy-MM-dd"):i.a.transDateFromServer(e.row.showTime,"yyyy-MM-dd hh:mm"))}}],loading:!1}},methods:{del:function(){this.$emit("on-delete",this.itemData)},loadTask:function(t){var e=this,a=t[0];this.loading=!0,this.$http.get(s.a.task,{type:a,status:1,pageSize:8}).then((function(t){t.items&&(e.taskList=t.items),e.loading=!1}))}},mounted:function(){this.loadTask(this.activeTab)}},l=(a(828),a(1)),c=Object(l.a)(o,n,[],!1,null,null,null);c.options.__file="src/views/home/components/4/task.vue";e.default=c.exports},516:function(t,e,a){var n=a(526);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("5a7c571a",n,!1,{})},524:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"cmp-tab",class:{"cmp-tab-underline":t.underline}},t._l(t.items,(function(e){return a("a",{key:e.value,class:{active:t.activeIds.indexOf(e.value)>-1},attrs:{href:"javascript:;"},on:{click:function(a){return t.selectTab(e)}}},[t._v(t._s(e.label))])})),0)};function i(t){return function(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}n._withStripped=!0;var s=null,r={name:"mgTab",props:{groups:Array,value:Array,multiple:{type:Boolean,default:!1},entire:{type:Boolean,default:!1},underline:Boolean},data:function(){return{activeIds:this.value,items:i(this.groups)}},watch:{groups:function(t){this.entire?this.items=[{label:"全部",value:s}].concat(i(t)):this.items=t},value:function(t){this.activeIds=t}},mounted:function(){this.entire&&this.items.unshift({label:"全部",value:s})},methods:{isSelected:function(t){return this.activeIds.indexOf(t)>-1},removeFromSelected:function(t){var e=this;this.activeIds.forEach((function(a,n){a==t&&e.activeIds.splice(n,1)}))},selectTab:function(t){this.entire&&t.value===s?this.activeIds=[s]:this.multiple?this.isSelected(t.value)?this.removeFromSelected(t.value):(this.activeIds.push(t.value),this.entire&&this.removeFromSelected(s)):(this.activeIds=[],this.activeIds.push(t.value)),this.$emit("input",this.activeIds),this.$emit("on-click",this.activeIds)},setValue:function(t){this.activeIds=t,this.$emit("input",this.activeIds)}}},o=(a(525),a(1)),l=Object(o.a)(r,n,[],!1,null,null,null);l.options.__file="src/components/mg-tab.vue";e.a=l.exports},525:function(t,e,a){"use strict";var n=a(516);a.n(n).a},526:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.cmp-tab {\r\n\tdisplay: inline-block;\n}\n.cmp-tab a {\r\n\tmargin-right: 20px;\t\r\n\tcolor: #576374;\n}\n.cmp-tab .active{\r\n\tcolor: #4B7EFE;\n}\n.cmp-tab-underline a {\r\n\tpadding: 2px 1px;\r\n\ttext-align: center;\n}\n.cmp-tab-underline .active  {\r\n\tborder-bottom: 2px solid #4B7EFE;\n}\r\n",""]),t.exports=e},626:function(t,e,a){var n=a(829);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,a(17).default)("6f178046",n,!1,{})},828:function(t,e,a){"use strict";var n=a(626);a.n(n).a},829:function(t,e,a){(e=a(10)(!1)).push([t.i,"\n.home-task-empty {\r\n\ttext-align: center;\r\n\tcolor: #666;\n}\n.home-task-tab {\r\n\theight: 30px;\r\n\tmargin: 0 10px;\n}\n.home-task-table {\r\n\theight:160px;\r\n\toverflow:auto;\r\n\tmargin: 0 10px;\n}\r\n",""]),t.exports=e}}]);