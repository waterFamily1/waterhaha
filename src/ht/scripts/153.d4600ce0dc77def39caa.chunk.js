(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{1200:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"status-detail c-main-border"},[a("div",{staticClass:"c-left-border-blue"},[a("h3",[e._v("消息详情")]),e._v(" "),a("Button",{staticClass:"c-btn-back fr",attrs:{type:"primary",shape:"circle"},on:{click:e.toMessageAll}},[e._v("返回")])],1),e._v(" "),a("div",{staticClass:"c-top-border-gray"},[a("div",{staticClass:"msg-detail-item"},[a("label",[e._v("消息类型:")]),e._v(e._s(e.typeText))]),e._v(" "),a("div",{staticClass:"msg-detail-item"},[a("label",[e._v("主题:")]),e._v(e._s(e.messageDetail.title))]),e._v(" "),a("div",{staticClass:"msg-detail-item"},[a("label",[e._v("发送时间:")]),e._v(e._s(e.messageDetail.realSendTime))]),e._v(" "),a("div",{staticClass:"msg-detail-text",domProps:{innerHTML:e._s(e.messageDetail.content)},on:{click:e.jumpEvent}}),e._v(" "),a("div",[a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:e.preMessage}},[e._v("上一条")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:e.nextMessage}},[e._v("下一条")])],1)])])};s._withStripped=!0;var i=a(23),n=a(11),l=a(60),r={data:function(){return{messageDetail:{},id:this.$route.params.id,type:"",typeText:""}},watch:{"$route.params.id":function(e){this.id=e,this.getDetail()}},computed:Object(i.b)({typeTexts:function(e){return e.map.message.typeTexts},detailMaps:function(e){return e.map.concern.detailPage}}),created:function(){this.getDetail()},methods:{getDetail:function(){var e=this;this.id&&this.$http.get(l.a.getMessageDetail,{id:this.id}).then((function(t){t.id&&(e.messageDetail=t||e.$route.params.messageDetail,e.messageDetail.title=e.messageDetail.title.replace(/(<a>|<\/a>)/g,""),e.messageDetail.realSendTime=n.a.transDateFromServer(e.messageDetail.realSendTime,"yyyy-MM-dd hh:mm"),e.type=t.messageCategory,e.typeText=e.typeTexts[e.type])}))},jumpEvent:function(e){if("A"==e.target.tagName&&this.messageDetail.taskMessageType&&this.messageDetail.url){var t=this.messageDetail.url.toString().split("?"),a={},s=[];t.length>1&&(a[(s=t[1].split("="))[0]]=s[1]),this.$router.push({name:this.detailMaps[this.messageDetail.taskMessageType],params:{id:t[0]},query:a})}},toMessageAll:function(){this.$router.back()},preMessage:function(){var e=this,t={id:this.id,pageTurn:"previous",readFlag:this.$route.params.type};this.$http.get(l.a.getMessageDetail,t).then((function(t){t.id&&(e.messageDetail=t,e.messageDetail.title=e.messageDetail.title.replace(/(<a>|<\/a>)/g,""),e.type=t.type,e.id=t.id,e.messageDetail.realSendTime=n.a.formatDateTime(new Date(e.messageDetail.realSendTime),"yyyy-MM-dd hh:mm"))}))},nextMessage:function(){var e=this,t={id:this.id,pageTurn:"next",readFlag:this.$route.params.type};this.$http.get(l.a.getMessageDetail,t).then((function(t){t.id&&(e.messageDetail=t,e.messageDetail.title=e.messageDetail.title.replace(/(<a>|<\/a>)/g,""),e.type=t.type,e.id=t.id,e.messageDetail.realSendTime=n.a.formatDateTime(new Date(e.messageDetail.realSendTime),"yyyy-MM-dd hh:mm"))}))}}},o=(a(805),a(1)),d=Object(o.a)(r,s,[],!1,null,null,null);d.options.__file="src/views/message/detail.vue";t.default=d.exports},615:function(e,t,a){var s=a(806);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);(0,a(17).default)("72e5c692",s,!1,{})},805:function(e,t,a){"use strict";var s=a(615);a.n(s).a},806:function(e,t,a){(t=a(10)(!1)).push([e.i,".messageDetail {\n  background-color: #FFF;\n  padding: 20px;\n}\n.message-box .el-tabs.el-tabs--left .el-tabs__header.is-left .el-tabs__item.is-active {\n  background-color: #FFF;\n}\n.el-tabs__item.is-active {\n  color: #0bb2df !important;\n}\n.el-tabs--left .el-tabs__active-bar.is-left,\n.el-tabs--left .el-tabs__nav-wrap.is-left:after {\n  display: none;\n}\n.message-box .el-tabs.el-tabs--left .el-tabs__header.is-left {\n  width: 130px;\n}\n.el-tabs__item {\n  font-size: 13px !important;\n}\n.el-tabs__content {\n  background-color: #FFF;\n}\n.mail-icon-unread {\n  color: #a4cbff;\n  font-size: 20px;\n  vertical-align: sub;\n  margin-right: 6px;\n}\n.msg-detail-item {\n  line-height: 40px;\n  font-size: 13px;\n}\n.msg-detail-item label {\n  display: inline-block;\n  width: 100px;\n  text-align: right;\n  margin-right: 10px;\n}\n.msg-detail-text {\n  border-top: 1px solid #e6e6e6;\n  padding-top: 20px;\n  padding-bottom: 30px;\n  font-size: 14px;\n  padding-left: 112px;\n}\n.msg-detail-text a {\n  text-decoration: underline;\n  cursor: pointer;\n  color: #11b3df;\n}\n.message-item-left {\n  text-indent: 10px;\n}\n",""]),e.exports=t}}]);