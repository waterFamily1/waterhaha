(window.webpackJsonp=window.webpackJsonp||[]).push([[104],{1164:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"c-main-border"},[s("div",{staticClass:"c-left-border-blue"},[s("h3",[e._v("用户设置")]),e._v(" "),s("div",{staticClass:"c-btns-right"},[s("Button",{attrs:{type:"primary",loading:e.loading},on:{click:e.submit}},[e._v("保存")])],1)]),e._v(" "),s("div",{staticClass:"c-top-border-gray profile"},[s("Form",{ref:"profile-form",attrs:{model:e.profile,rules:e.ruleValidate,"label-width":100}},[s("h3",{staticClass:"c-gray-bg-h"},[e._v("基本信息")]),e._v(" "),s("div",{staticStyle:{display:"inline-block",width:"200px"}},[s("div",{staticClass:"profile_icon"},[e.profile.imageUrl?s("img",{attrs:{src:e.profile.imageUrl}}):s("div",[e._v("您还没有上传头像")])]),e._v(" "),s("div",{staticClass:"profile_btns"},[s("Button",{staticClass:"c-btn-add",staticStyle:{"margin-right":"10px"},attrs:{type:"primary"},on:{click:function(t){e.editPassword=!0}}},[e._v("修改密码")]),e._v(" "),s("Upload",{attrs:{action:e.uploadUrl,"on-success":e.successUpload,"before-upload":e.beforeUpload,"show-upload-list":!1,"max-size":2048,accept:"image/*"}},[s("Button",{staticClass:"c-btn-add",attrs:{type:"primary"}},[e._v(e._s(e.profile.imageUrl?"更改头像":"上传头像"))])],1)],1)]),e._v(" "),s("div",{staticStyle:{display:"inline-block",width:"80%"}},[s("div",{staticClass:"c-form-row-2col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"用户姓名:"}},[s("span",[e._v(e._s(e.profile.name))])])],1),e._v(" "),s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"组织结构:"}},[s("span",[e._v(e._s(e.profile.orgName))])])],1)]),e._v(" "),s("div",{staticClass:"c-form-row-2col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{prop:"tel",label:"手机号:"}},[s("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入你的手机号"},model:{value:e.profile.tel,callback:function(t){e.$set(e.profile,"tel",t)},expression:"profile.tel"}})],1)],1),e._v(" "),s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{prop:"email",label:"邮箱地址:"}},[s("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入你的邮箱地址"},model:{value:e.profile.email,callback:function(t){e.$set(e.profile,"email",t)},expression:"profile.email"}})],1)],1)]),e._v(" "),s("div",{staticClass:"c-form-row-1col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"智能终端:"}},[s("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"",maxlength:50},model:{value:e.profile.deviceNo,callback:function(t){e.$set(e.profile,"deviceNo",t)},expression:"profile.deviceNo"}})],1)],1)])]),e._v(" "),s("h3",{staticClass:"c-gray-bg-h"},[e._v("系统设置")]),e._v(" "),s("div",{staticClass:"padding20"},[s("div",{staticClass:"c-form-row-2col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{prop:"langKey",label:"系统语言:"}},[s("Select",{staticStyle:{width:"200px"},model:{value:e.profile.langKey,callback:function(t){e.$set(e.profile,"langKey",t)},expression:"profile.langKey"}},e._l(e.languages,(function(t){return s("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1),e._v(" "),s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{prop:"msgMode",label:"消息提醒方式:"}},[s("Select",{staticStyle:{width:"200px"},model:{value:e.profile.msgMode,callback:function(t){e.$set(e.profile,"msgMode",t)},expression:"profile.msgMode"}},e._l(e.messageTypes,(function(t){return s("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1)],1)],1)]),e._v(" "),s("div",{staticClass:"c-form-row-2col"},[s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"画面触屏:"}},[s("i-switch",{attrs:{size:"large","true-value":"open","false-value":"close"},on:{"on-change":e.changeScreenTouch},model:{value:e.screenTouchKey,callback:function(t){e.screenTouchKey=t},expression:"screenTouchKey"}},[s("span",{attrs:{slot:"open"},slot:"open"},[e._v("开启")]),e._v(" "),s("span",{attrs:{slot:"close"},slot:"close"},[e._v("关闭")])]),e._v(" "),s("Tooltip",{staticStyle:{"vertical-align":"middle"},attrs:{placement:"right"}},[s("Icon",{attrs:{type:"help-circled",size:"18",color:"#adadad"}}),e._v(" "),s("div",{attrs:{slot:"content"},slot:"content"},[e._v("开启后只可以触屏使用大屏功能")])],1)],1)],1),e._v(" "),s("div",{staticClass:"c-form-item"},[s("FormItem",{attrs:{label:"开启音箱控制:"}},[s("i-switch",{attrs:{size:"large","true-value":"open","false-value":"close"},on:{"on-change":e.speakerSetting},model:{value:e.openSpeaker,callback:function(t){e.openSpeaker=t},expression:"openSpeaker"}},[s("span",{attrs:{slot:"open"},slot:"open"},[e._v("开启")]),e._v(" "),s("span",{attrs:{slot:"close"},slot:"close"},[e._v("关闭")])])],1)],1)])])])],1),e._v(" "),s("Modal",{attrs:{title:"修改密码",width:"350"},model:{value:e.editPassword,callback:function(t){e.editPassword=t},expression:"editPassword"}},[s("mg-change-pwd-code",{attrs:{tel:e.account.tel},on:{"on-success":function(t){e.editPassword=!1}}}),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};o._withStripped=!0;var r=s(23),a=(s(16),s(148)),i=s(151),n=s(39),l={components:{mgChangePwdCode:i.a},data:function(){return{loading:!1,screenTouchKey:null,openSpeaker:null,uploadUrl:a.a.uploadUrl,profile:{version:0,orgId:"",name:"",tel:"",email:"",orgName:"",imageUrl:"",thumbPath:"",langKey:"",msgMode:"",deviceNo:""},editPassword:!1,ruleValidate:{tel:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:function(e,t,s){/\d{11}/.test(t)?s():s(new Error("请输入有效的手机号"))},trigger:"change"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"},{type:"email",message:"请输入正确的邮箱格式",trigger:"blur"},{max:50,message:"邮箱不能超过50个字符",trigger:"change"}]}}},computed:Object(r.b)({account:function(e){return e.user.account},languages:function(e){return e.map.user.languages},screenTouch:function(e){return e.map.user.screenTouch},messageTypes:function(e){return e.map.user.messageTypes},speakerId:function(e){return e.user.account.deviceNo}}),methods:{beforeUpload:function(e){var t=e.size/1024/1024<2;return t||this.$Message.error("上传图片大小不能超过 2MB!"),t},successUpload:function(e,t){var s=this;this.profile.imageUrl=e.thumbFullPath;var o=Object.assign({},this.profile);this.$http.put(a.a.updateUser,o).then((function(e){e.count&&(s.$Notice.success({title:"更换图片成功"}),s.updateUserInfo())}))},submit:function(){var e,t=this;this.$refs["profile-form"].validate((function(s){s&&(t.speakerId!=t.profile.deviceNo&&(e=!0),t.loading=!0,t.$http.put(a.a.updateUser,t.profile).then((function(s){t.$Notice.success({title:"用户设置成功"}),t.updateUserInfo(),t.loading=!1,e&&t.reconnect()})).catch((function(){t.loading=!1})))}))},updateUserInfo:function(){var e=JSON.parse(sessionStorage.getItem("__MANGO_U_"));e=Object.assign({},e,this.profile),this.$store.commit("user/setUserAccount",e),sessionStorage.setItem("__MANGO_U_",JSON.stringify(e))},back:function(){this.$router.back()},changeScreenTouch:function(){localStorage.setItem("screenTouchKey",this.screenTouchKey)},speakerSetting:function(){localStorage.setItem("speakerControl",this.openSpeaker);var e="open"==this.openSpeaker;if(this.$store.commit("user/setSpeakerState",e),this.account.deviceNo)if(e)this.subsTopic();else{var t=this.$store.getters["sockets/getIdByName"]("speaker");this.$unsubsTopic(t)}},reconnect:function(){if(this.account.deviceNo&&"open"==this.openSpeaker){var e=this.$store.getters["sockets/getIdByName"]("speaker");e&&this.$unsubsTopic(e),this.subsTopic()}},subsTopic:function(){var e=this,t=this.account.deviceNo;this.$subsTopic(n.a.speakers+t,(function(t){if(t&&t.body){var s=JSON.parse(t.body);e.$router.push({name:"redirect",params:s})}}),"speaker")}},mounted:function(){var e=this.profile;for(var t in e)e[t]=this.account[t];e.id=this.account.id,this.screenTouchKey=localStorage.getItem("screenTouchKey")||"close",this.openSpeaker=localStorage.getItem("speakerControl")}},c=(s(796),s(1)),p=Object(c.a)(l,o,[],!1,null,null,null);p.options.__file="src/views/basic/profile.vue";t.default=p.exports},151:function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticStyle:{"font-size":"14px",height:"40px"}},[e._v("手机号："+e._s(this.tel))]),e._v(" "),s("Form",{ref:"pwdForm",staticClass:"pwd-form",attrs:{model:e.pwdForms,rules:e.pwdRuleValidate}},[s("FormItem",{attrs:{prop:"verifyCode"}},[s("Input",{staticStyle:{width:"150px"},attrs:{placeholder:"请输入验证码",autocomplete:"off"},model:{value:e.pwdForms.verifyCode,callback:function(t){e.$set(e.pwdForms,"verifyCode",t)},expression:"pwdForms.verifyCode"}}),e._v(" "),e.verifying?s("span",[e._v(e._s(e.countdown)+"秒后重新获取")]):s("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:e.sendCode}},[e._v("获取验证码")])],1),e._v(" "),s("FormItem",{staticStyle:{position:"relative"},attrs:{prop:"newPassword"}},[s("Input",{attrs:{placeholder:"请输入新密码",type:"password",autocomplete:"new-password"},model:{value:e.pwdForms.newPassword,callback:function(t){e.$set(e.pwdForms,"newPassword",t)},expression:"pwdForms.newPassword"}}),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.pwdLevShown,expression:"pwdLevShown"}],class:["pwd-lev-"+e.pwdLev]})],1),e._v(" "),s("FormItem",[s("Input",{attrs:{placeholder:"请确认新密码",type:"password",autocomplete:"off"},model:{value:e.password2,callback:function(t){e.password2=t},expression:"password2"}})],1)],1),e._v(" "),s("div",[s("Button",{attrs:{type:"primary",long:"",loading:e.loading},on:{click:e.submit}},[e._v("确认")])],1)],1)};o._withStripped=!0;var r=s(16);var a=null,i={name:"mgChangePwdCode",props:{tel:String},watch:{tel:function(e){this.pwdForms.tel=e}},data:function(){var e=this;return{loading:!1,verifying:!1,countdown:60,password2:"",pwdForms:{verifyCode:"",newPassword:"",tel:e.tel},pwdRuleValidate:{verifyCode:{required:!0,message:"请输入验证码",trigger:"blur"},newPassword:[{validator:function(t,s,o){return s.length<6||s.length>20?(e.pwdLevShown=!0,e.pwdLev=0,void o(new Error("6-20个字符"))):/[a-z]/.test(s)&&function(e){return/[A-Z]/.test(e)}(s)&&function(e){return/[0-9]/.test(e)}(s)?void e.$http.get(r.a.valPassword,{password:e.pwdForms.newPassword}).then((function(t){e.pwdLevShown=!0,e.pwdLev=t.level,t.level?o():o(new Error(t.msg))})):(e.pwdLevShown=!0,e.pwdLev=0,void o(new Error("至少包含大小写字母+数字")))}}]},pwdLevShown:!1,pwdLev:0}},methods:{sendCode:function(){var e=this;this.verifying=!0,this.countdown=60,this.$http.post(r.a.verifycationCode,{tel:this.tel}).then((function(t){a=setInterval((function(){e.countdown<=0?(clearInterval(a),e.verifying=!1):e.countdown-=1}),1e3)}))},submit:function(){var e=this;this.$refs.pwdForm.validate((function(t){t&&(e.pwdForms.newPassword===e.password2?(e.loading=!0,e.$http.put(r.a.updatePassword,e.pwdForms).then((function(t){e.$Notice.success({title:"密码设置成功"}),e.$emit("on-success"),e.loading=!1})).catch((function(){e.loading=!1}))):e.$Notice.error({title:"两次密码不一致，请重新输入"}))}))}}},n=(s(213),s(1)),l=Object(n.a)(i,o,[],!1,null,null,null);l.options.__file="src/views/basic/change-pwd-code.vue";t.a=l.exports},213:function(e,t,s){"use strict";var o=s(76);s.n(o).a},214:function(e,t,s){var o=s(10),r=s(24),a=s(108);t=o(!1);var i=r(a);t.push([e.i,"\n.pwd-lev-0, .pwd-lev-1, .pwd-lev-2 {\r\n    position: absolute;\r\n    top: 35px;\r\n    right: 0;\r\n    width: 150px;\r\n    height: 15px;\r\n    background-image: url("+i+");\r\n    background-repeat: no-repeat;\n}\n.pwd-lev-0 {\r\n    background-position: 0 0;\n}\n.pwd-lev-1 {\r\n    background-position: 0 -15px;\n}\n.pwd-lev-2 {\r\n    background-position: 0 -30px;\n}\r\n",""]),e.exports=t},611:function(e,t,s){var o=s(797);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,s(17).default)("5d04b00a",o,!1,{})},76:function(e,t,s){var o=s(214);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,s(17).default)("6deee75b",o,!1,{})},796:function(e,t,s){"use strict";var o=s(611);s.n(o).a},797:function(e,t,s){(t=s(10)(!1)).push([e.i,"\n.profile .ivu-form-item-label {\r\n    font-weight: bold;\n}\n.profile .ivu-switch-inner {\r\n    font-size: 12px;\n}\n.profile_icon {\r\n    display: flex;\r\n    justify-content: center;\r\n    align-items: Center;\r\n    width: 120px;\r\n    height: 140px;\r\n    margin: 10px auto 0;\n}\n.profile_icon img {\r\n    max-width: 120px;\r\n    max-height: 140px;\n}\n.profile_btns {\r\n    margin-top: 10px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\n}\r\n",""]),e.exports=t}}]);