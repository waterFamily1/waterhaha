(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{1165:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"process-view c-tree"},[n("div",{staticClass:"c-tree-left",staticStyle:{width:"250px"}},[n("Row",{staticStyle:{height:"65%",overflow:"auto","border-bottom":"8px solid #f0f0f0"}},[n("div",{staticClass:"padding10"},[n("Tree",{attrs:{data:e.treeData},on:{"on-select-change":e.nodeSelected}})],1)]),e._v(" "),n("Row",{staticClass:"display-images"},[n("ul",e._l(e.displayImages,(function(t){return n("li",[n("div",{staticClass:"img-box",class:{active:t.active},on:{click:function(n){return e.showImgDisplay(t)}}},[n("img",{attrs:{src:t.src,alt:t.name}})]),e._v(" "),n("span",{attrs:{title:t.fileName}},[e._v(e._s(t.fileName))])])})),0)])],1),e._v(" "),n("div",{staticClass:"c-main-border c-tree-right"},[n("div",{staticStyle:{height:"100%","text-align":"center",display:"flex","align-items":"center","justify-content":"center"}},[e.imgDisplayPath?n("fullscreen",{ref:"fullscreen",staticStyle:{height:"100%",width:"100%",background:"white","overflow-y":"hidden"},attrs:{fullscreen:e.fullscreen,warp:!1},on:{change:e.fullscreenChange,"update:fullscreen":function(t){e.fullscreen=t}}},[e.imgDisplayPath?n("iframe",{staticStyle:{background:"#FFF"},attrs:{src:e.imgDisplayPath,frameborder:"0",name:"showHere",scrolling:"auto",width:"100%",height:"100%"}}):e._e(),e._v(" "),n("Button",{staticClass:"btn-map-fullscreen",attrs:{type:"ghost",icon:e.fullscreen?"arrow-shrink":"arrow-expand"},on:{click:e.toggleFullScreen}})],1):e._e(),e._v(" "),e.imgDisplayPath?e._e():n("p",{staticStyle:{"text-align":"center"}},[e._v("请先在工艺位置下选择图纸")])],1)])])};i._withStripped=!0;var r=n(11),s=n(107),l=n(714),a=n(538),c=n.n(a);function o(e){e.$http.get(l.a.getHTSid).then((function(e){sessionStorage.setItem("htEditor.sid",e)}))}n(7).default.use(c.a);var u=["/custom/configs/htconfig.js"],d={data:function(){return{timer:null,treeData:[],screenList:{},displayImages:[],imgDisplayPath:"",fullscreen:!1}},components:{},methods:{init:function(){var e=this,t=this,n=this.$route.params.id,i=null;t.$http.get(l.a.getHTSid).then((function(l){(function(e,t){return function(n){t.timer=setTimeout((function i(){t.timer&&(t.timer=clearTimeout(t.timer)),e(t),t.timer=setTimeout(i,n)}),n)}})(o,t)(3e5),sessionStorage.setItem("htEditor.sid",l),t.$http.get(s.a.getMonitorTree).then((function(s){var l=s.items,a=[],c=[];n&&function e(t,r){for(var s=0,a=l.length;s<a;s++)l[s].id==t&&t==n&&(-1==n.toString().indexOf("screen")?(l[s].selected=r,l[s].expand=!0,n=l[s].parentId,r&&(i=l[s].id),e(l[s].parentId,!1)):(l[s].active=!0,n=l[s].parentId,i=l[s].id,e(l[s].parentId,!0)))}(n,!0);for(var o=0,u=l.length;o<u;o++)9==l[o].type&&(a.push(Object.assign({},l[o])),d(l[o].parentId)),l[o].indexNum=o;function d(e){for(var t=!1,n=0,i=a.length;n<i;n++)if(a[n].id==e){t=!0;break}if(!t)for(n=0,i=l.length;n<i;n++)if(l[n].id==e){a.push(Object.assign({},l[n])),c.push(l[n]),d(l[n].parentId);break}}t.treeData=r.a.transDataToTree(c.sort((function(e,t){return e.indexNum-t.indexNum}))),function(e,t){!function e(n){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";n.forEach((function(n,r){var s="";9==n.type?(s=i+"/"+n.name,t.screenList[n.parentId]||(t.screenList[n.parentId]=[]),t.screenList[n.parentId].push(n)):s=i+"/"+n.id,n.fullPath=s,n.hasOwnProperty("children")&&n.children.length&&e(n.children,s)}))}(e)}(r.a.transDataToTree(a.sort((function(e,t){return e.indexNum-t.indexNum}))),t);var f=e.$route.params.id;f&&t.$nextTick((function(e){console.log(i),-1!=f.toString().indexOf("screen")?t.nodeSelected([{id:i}],f):t.nodeSelected([{id:i}])}))}))}))},nodeSelected:function(e,t){var n=e[0];if(n){var i=this;i.displayImages=[],i.screenList[n.id]&&i.screenList[n.id].forEach((function(e){i.displayImages.push(Object.assign({},e))})),0!=i.displayImages.length&&i.displayImages.forEach((function(e,n){var r="";r="1"==e.screenType?"/displays"+e.fullPath:"/scenes"+e.fullPath,Object.assign(e,{fullPath:r,fileName:e.name,name:e.name+".png",src:"".concat(htconfig.Default.protocol,"//").concat(htconfig.Default.host,":").concat(htconfig.Default.port)+r+".png?ts="+Date.now()+"&sid="+sessionStorage.getItem("htEditor.sid")});var s="/display.html";2==e.screenType&&(s="/scene.html"),e.url=s+"?tag="+e.fullPath+".json",e.uploadPath&&(e.url=e.uploadPath),0!=e.url.indexOf("/")&&(e.url="/"+e.url),t?t==e.id&&i.showImgDisplay(e):0==n&&(e.active=!0,i.showImgDisplay(e))}))}},showImgDisplay:function(e){this.imgDisplayPath=e.url+"&ts="+Date.now(),this.displayImages.forEach((function(e){e.active=!1})),e.active=!0},toggleFullScreen:function(){this.$refs.fullscreen.toggle()},fullscreenChange:function(e){this.fullscreen=e}},created:function(){var e=this,t=0;!function n(i){t!==u.length?(function(e){var t=document.createElement("script");t.type="text/javascript",t.src=e;var n=document.getElementsByTagName("head");return n.length?n[0].appendChild(t):document.documentElement.appendChild(t),t}(u[t++])).onload=n:e.init()}()},destroyed:function(){clearTimeout(this.timer)}},f=(n(965),n(1)),p=Object(f.a)(d,i,[],!1,null,"304f06a8",null);p.options.__file="src/views/process-view/monitor.vue";t.default=p.exports},538:function(e,t,n){e.exports=function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";t.b=function(){var e=document.documentElement;return"requestFullscreen"in e||"mozRequestFullScreen"in e&&document.mozFullScreenEnabled||"msRequestFullscreen"in e&&document.msFullscreenEnabled||"webkitRequestFullScreen"in e},t.c=function(){return!!(document.fullscreen||document.mozFullScreen||document.fullscreenElement||document.msFullscreenElement||document.webkitIsFullScreen)},t.g=function(e){e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen?e.msRequestFullscreen():console.log("Fullscreen API is not supported.")},t.d=function(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen?document.msExitFullscreen():console.log("Fullscreen API is not supported.")},t.f=function(e){document.addEventListener("fullscreenchange",e),document.addEventListener("mozfullscreenchange",e),document.addEventListener("MSFullscreenChange",e),document.addEventListener("webkitfullscreenchange",e)},t.e=function(e){document.removeEventListener("fullscreenchange",e),document.removeEventListener("mozfullscreenchange",e),document.removeEventListener("MSFullscreenChange",e),document.removeEventListener("webkitfullscreenchange",e)},t.a=function e(){var t={},n=!1,i=0,r=arguments.length;for("[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(n=arguments[0],i++);i<r;i++)!function(i){for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(n&&"[object Object]"===Object.prototype.toString.call(i[r])?t[r]=e(!0,t[r],i[r]):t[r]=i[r])}(arguments[i]);return t}},function(e,t,n){"use strict";function i(){return n.i(l.c)()}function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document.body,t=arguments[1];if(c&&!i()){t=n.i(l.a)(!0,{},a,t);var r=e,s=void 0;t.wrap&&((s=document.createElement("div")).style["overflow-y"]="auto",s.style.background=t.background,s.style.width="100%",s.style.height="100%",r.parentNode.insertBefore(s,r),s.appendChild(r),s.addEventListener("click",(function(e){e.target===this&&n.i(l.d)()}))),r.classList.add(t.fullscreenClass),n.i(l.f)((function e(){var a=i();a||(n.i(l.e)(e),r.classList.remove(t.fullscreenClass),t.wrap&&(s.parentNode.insertBefore(r,s),s.parentNode.removeChild(s))),t.callback&&t.callback(a)})),n.i(l.g)(t.wrap?s:r)}}function s(){c&&i()&&n.i(l.d)()}var l=n(0),a={wrap:!0,background:"#333",callback:function(){},fullscreenClass:"fullscreen"},c=n.i(l.b)();t.a={getState:i,toggle:function(e,t,n){c&&(void 0===n?i()?s():r(e,t):n?r(e,t):s())},enter:r,exit:s}},function(e,t,n){var i=n(5)(n(4),n(6),null,null);e.exports=i.exports},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(2),r=n.n(i),s=n(1),l=n(0);t.default={install:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=t.name||"fullscreen";e.component(i,n.i(l.a)(r.a,{name:i})),e.prototype["$"+i]=s.a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0);t.default={props:{background:{type:String,default:"#333"},fullscreenClass:{type:String,default:"fullscreen"},fullscreen:{type:Boolean,default:!1}},data:function(){return{supportFullScreen:!1,isFullscreen:!1}},computed:{wrapperStyle:function(){return{background:this.background,"overflow-y":"auto",width:"100%",height:"100%"}}},methods:{toggle:function(e){void 0===e?n.i(i.c)()?this.exit():this.enter():e?this.enter():this.exit()},enter:function(){this.supportFullScreen&&(n.i(i.f)(this.fullScreenCallback),n.i(i.g)(this.$el))},exit:function(){this.supportFullScreen&&this.getState()&&n.i(i.d)()},getState:function(){return n.i(i.c)()},shadeClick:function(e){e.target===this.$el&&this.exit()},fullScreenCallback:function(){this.isFullscreen=n.i(i.c)(),this.isFullscreen||n.i(i.e)(this.fullScreenCallback),this.$emit("change",this.isFullscreen),this.$emit("update:fullscreen",this.isFullscreen)}},watch:{fullscreen:function(e){e!==n.i(i.c)()&&(e?this.enter():this.exit())}},created:function(){this.supportFullScreen=n.i(i.b)()}}},function(e,t){e.exports=function(e,t,n,i){var r,s=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(r=e,s=e.default);var a="function"==typeof s?s.options:s;if(t&&(a.render=t.render,a.staticRenderFns=t.staticRenderFns),n&&(a._scopeId=n),i){var c=Object.create(a.computed||null);Object.keys(i).forEach((function(e){var t=i[e];c[e]=function(){return t}})),a.computed=c}return{esModule:r,exports:s,options:a}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div",{class:e.isFullscreen?[e.fullscreenClass]:[],style:e.isFullscreen?[e.wrapperStyle]:[],on:{click:function(t){e.shadeClick(t)}}},[e._t("default")],2)},staticRenderFns:[]}}])},714:function(e,t,n){"use strict";t.a={getHTSid:"/uaa/api/ht/sid"}},715:function(e,t,n){var i=n(966);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(17).default)("09ed9bbf",i,!1,{})},965:function(e,t,n){"use strict";var i=n(715);n.n(i).a},966:function(e,t,n){(t=n(10)(!1)).push([e.i,"\n.c-tree[data-v-304f06a8] {\r\n    height: 100%;\n}\n.display-images[data-v-304f06a8] {\r\n    height: 35%;\r\n    overflow-y: scroll;\n}\n.display-images[data-v-304f06a8]::-webkit-scrollbar {\r\n    display: none;\n}\n.display-images li[data-v-304f06a8] {\r\n    list-style: none;\r\n    display: inline-block;\n}\n.display-images .img-box[data-v-304f06a8] {\r\n    margin: 5px;\r\n    width: 50px;\r\n    height: 50px;\r\n    line-height: 50px;\r\n    text-align: center;\r\n    font-size: 0;\r\n    border: 1px solid transparent;\r\n    box-sizing: content-box;\n}\n.display-images .img-box[data-v-304f06a8]:hover,\r\n.display-images .img-box.active[data-v-304f06a8] {\r\n    border: 1px solid #32d3eb;\n}\n.display-images .img-box img[data-v-304f06a8] {\r\n    max-width: 50px;\r\n    max-height: 50px;\r\n    vertical-align: middle;\n}\n.display-images span[data-v-304f06a8] {\r\n    display: inline-block;\r\n    width: 50px;\r\n    text-align: center;\r\n    margin: 0 6px;\r\n    white-space: nowrap;\r\n    text-overflow: ellipsis;\r\n    overflow: hidden;\n}\n.c-tree-left[data-v-304f06a8]::-webkit-scrollbar-thumb {\r\n    border-radius: 6px;\r\n    -webkit-box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);\n}\n.btn-map-fullscreen[data-v-304f06a8] {\r\n    position: absolute;\r\n    right: 10px;\r\n    top: 10px;\r\n    width: 36px;\r\n    height: 36px;\r\n    padding: 0;\r\n    font-size: 36px;\r\n    line-height: 36px;\r\n    text-align: center;\r\n    outline: none;\n}\r\n",""]),e.exports=t}}]);