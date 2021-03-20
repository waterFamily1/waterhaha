!function(B,P,k){"use strict";var f=ht.LiveNode=function(){f.superClass.constructor.apply(this)};ht.Default.def("ht.LiveNode",ht.Node,{_width:100,_height:35,_image:null,_enabled:!0,_editable:!0,_hover:!1,_pressed:!1,isEnabled:function(){return this._enabled},setEnabled:function(c){var Q=this._enabled;this._enabled=c,this.fp("enabled",Q,c)},isEditable:function(){return this._enabled},setEditable:function(T){var k=this._editable;this._editable=T,this.fp("editable",k,T)},isHover:function(){return this._hover},setHover:function(D){var W=this._hover;this._hover=D,this.fp("hover",W,D)},isPressed:function(){return this._pressed},setPressed:function(b){var x=this._pressed;this._pressed=b,this.fp("pressed",x,b)},getBackground:function(){var c,W,D=this;return c=D._enabled?D._pressed?"live.background.active":D._hover?"live.background.hover":"live.background":"live.background.disabled",W=D.s(c),W?W:D.s("live.background")},getForeground:function(){var X,O,v=this;return X=v._enabled?v._pressed?"live.label.active":v._hover?"live.label.hover":"live.label.color":"live.label.disabled",O=v.s(X),O?O:v.s("live.label.color")},setRotation:null,getUIClass:function(){return ht.graph.LiveNodeUI}});var T=ht.graph.LiveNodeUI=function(){T.superClass.constructor.apply(this,arguments)};ht.Default.def("ht.graph.LiveNodeUI",ht.Default.getInternal().ui().NodeUI,{freeDraw:function(I,z){var y=this,N=y._data,K=ht.Default.getImage(N._image);ht.Default.drawImage(I,K,z.x,z.y,z.width,z.height,N,y.gv)},onKeyDown:function(D){var Q=this,A=Q._data;return 32===D.keyCode||13===D.keyCode?(A.setPressed(!0),!0):void 0},onKeyUp:function(g){var h=this._data;(32===g.keyCode||13===g.keyCode)&&(h.setPressed(!1),h.onClicked&&h.onClicked(g))},onMouseOver:function(){this._data.setHover(!0)},onMouseOut:function(){this._data.setHover(!1)},onMouseDown:function(){this._data.setPressed(!0)},onMouseMove:function(){},onMouseUp:function(Z){var H=this._data;H.setPressed(!1),H.onClicked&&H.onClicked(Z)}});var c=ht.ButtonNode=function(){c.superClass.constructor.apply(this)};ht.Default.def("ht.ButtonNode",ht.LiveNode,{_image:"button_image"}),ht.Default.setImage("button_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:{func:"style@live.shape"},borderWidth:{func:"style@live.border.width"},borderColor:{func:"style@live.border.color"},gradient:{func:"style@live.gradient"},gradientColor:{func:"style@live.gradient.color"},background:{func:"getBackground"},rect:[0,0,1,1],relative:!0},{type:"text",text:{func:"style@live.label"},align:{func:"style@live.label.align"},color:{func:"getForeground"},font:{func:"style@live.label.font"},rect:[0,0,1,1],relative:!0,offsetX:{func:"style@live.label.offset.x"},offsetY:{func:"style@live.label.offset.y"}}]});var Z=ht.ToggleButtonNode=function(){Z.superClass.constructor.apply(this)};ht.Default.def("ht.ToggleButtonNode",ht.ButtonNode,{_selected:!1,getUIClass:function(){return ht.graph.ToggleButtonNodeUI},getBackground:function(){var W,p,Q=this;return Q._enabled?(Q._hover&&(W="live.background.hover"),Q.s(W)||(W=Q._selected?"live.background.active":"live.background")):W="live.background.disabled",p=Q.s(W),p?p:Q.s("live.background")},getForeground:function(){var E,d,O=this;return O._enabled?(O._hover&&(E="live.label.hover"),O.s(E)||(E=O._selected?"live.label.active":"live.label.color")):E="live.label.disabled",d=O.s(E),d?d:O.s("live.label.color")},isSelected:function(){return this._selected},setSelected:function(r){var c=this,h=c._selected,y=c._buttonGroup;c._selected=r,c.fp("selected",h,r)&&(y&&r&&y._selected!==c&&(y._selected&&y._selected.setSelected(!1),y._selected=c,y.onChanged(c)),c.onChanged(r))},onChanged:function(){}});var a=ht.graph.ToggleButtonNodeUI=function(){a.superClass.constructor.apply(this,arguments)};ht.Default.def("ht.graph.ToggleButtonNodeUI",ht.graph.LiveNodeUI,{rectIntersects:function(){return!0},onKeyDown:function(s){var T=this;return a.superClass.onKeyDown.call(T,s)?(T.toggleSelect(),!0):void 0},onMouseDown:function(q){var j=this;a.superClass.onMouseDown.call(j,q),j.toggleSelect()},toggleSelect:function(){var p=this,r=p._data;r._buttonGroup?r._selected||r.setSelected(!0):r.setSelected(!r._selected),r.setHover(!1)}});var V=ht.CheckboxNode=function(){var P=this;V.superClass.constructor.apply(P),P.s("live.label.align","left"),P.s("live.background",ht.Color.widgetIconBackground),P.s("live.background.active",ht.Color.widgetIconHighlight)};ht.Default.def("ht.CheckboxNode",ht.ToggleButtonNode,{_image:"checkbox_image",getBackground:function(){var O,M=this;return O=M._enabled?M._selected?"live.background.active":"live.background":"live.background.disabled",M.s(O)},getForeground:function(){var W,r=this;return W=r._enabled?r._selected?"live.background.active":"live.background":"live.background.disabled",r.s(W)}}),ht.Default.setImage("checkbox_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:{func:"style@live.shape"},background:{func:"getBackground"},rect:{func:function(Z){var b=(Z._width,Z._height);return{x:.1*b,y:.2*b,width:.6*b,height:.6*b}}}},{type:"shape",points:{func:function(E){var x=(E._width,E._height);return[.3*x,.5*x,.4*x,.6*x,.55*x,.35*x]}},borderWidth:{func:function(t){return.05*t._height}},borderColor:"#FFFFFF",visible:{func:function(J){return J._selected||J._hover}}},{type:"text",text:{func:"style@live.label"},align:{func:"style@live.label.align"},color:{func:"getForeground"},font:{func:"style@live.label.font"},rect:{func:function(h){var S=h._width,g=h._height;return{x:.8*g,y:0,width:S-.8*g,height:g}}},offsetX:{func:"style@live.label.offset.x"},offsetY:{func:"style@live.label.offset.y"}}]});var o=ht.RadioButtonNode=function(){var c=this;o.superClass.constructor.apply(c),c.s("live.label.align","left"),c.s("live.background",ht.Color.widgetIconBackground),c.s("live.background.active",ht.Color.widgetIconHighlight)};ht.Default.def("ht.RadioButtonNode",ht.ToggleButtonNode,{_image:"radioButton_image",getUIClass:function(){return ht.graph.RadioButtonNodeUI},getBackground:function(){var D,J=this;return D=J._enabled?J._selected?"live.background.active":"live.background":"live.background.disabled",J.s(D)},getForeground:function(){var r,t=this;return r=t._enabled?t._selected?"live.background.active":"live.background":"live.background.disabled",t.s(r)}}),ht.Default.setImage("radioButton_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:"circle",borderWidth:{func:function(s){return.1*s._height}},borderColor:{func:"getBackground"},rect:{func:function(M){var d=(M._width,M._height);return{x:.1*d,y:.2*d,width:.6*d,height:.6*d}}}},{type:"circle",background:{func:"getBackground"},rect:{func:function(V){var G=(V._width,V._height);return{x:.3*G,y:.4*G,width:.2*G,height:.2*G}}},visible:{func:function(J){return J._selected||J._hover}}},{type:"text",text:{func:"style@live.label"},align:{func:"style@live.label.align"},color:{func:"getBackground"},font:{func:"style@live.label.font"},rect:{func:function(d){var T=d._width,X=d._height;return{x:.8*X,y:0,width:T-.8*X,height:X}}},offsetX:{func:"style@live.label.offset.x"},offsetY:{func:"style@live.label.offset.y"}}]});var O=ht.graph.RadioButtonNodeUI=function(){O.superClass.constructor.apply(this,arguments)};ht.Default.def("ht.graph.RadioButtonNodeUI",ht.graph.ToggleButtonNodeUI,{toggleSelect:function(){this._data._selected||this._data.setSelected(!0)}});var b=ht.SwitchNode=function(){var M=this;b.superClass.constructor.apply(M),M.s("live.background",ht.Color.widgetIconBackground),M.s("live.background.active",ht.Color.widgetIconHighlight),M.s("live.label.color",ht.Color.widgetIconBackground),M.s("live.label.active",ht.Color.widgetIconHighlight)};ht.Default.def("ht.SwitchNode",ht.ToggleButtonNode,{_image:"switch_image",getBackground:function(){return this.s(this._selected?"live.background.active":"live.background")},getForeground:function(){return this.s(this._selected?"live.label.active":"live.label.color")}}),ht.Default.setImage("switch_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:{func:"style@live.shape"},borderWidth:{func:"style@live.border.width"},borderColor:{func:"style@live.border.color"},background:{func:"style@switch.background"},opacity:{func:function(y){return y._enabled?1:.5}},rect:[0,0,1,1],relative:!0},{type:"circle",background:{func:"getBackground"},opacity:{func:function(k){return k._enabled?1:.5}},rect:{func:function(M){var L=30,O=10,r=M._selected;return{x:r?M._width-O-L:O,y:(M._height-L)/2,width:L,height:L}}}},{type:"text",text:{func:function(u){return u.s(u._selected?"switch.text.on":"switch.text.off")}},rect:[17,1,1],relative:!0,offsetX:{func:function(w){return w._selected?-10:10}},color:{func:"getForeground"},font:{func:"style@live.label.font"},align:{func:"style@live.label.align"}}]});var s=ht.ComboboxNode=function(){var O=this;s.superClass.constructor.apply(O),O.s("live.label.align","left")};ht.Default.def("ht.ComboboxNode",ht.LiveNode,{_image:"combobox_image",_buttonWidth:20,_maxHeight:200,_selectedIndex:-1,getUIClass:function(){return ht.graph.ComboboxNodeUI},getItems:function(){return this._items},setItems:function(g){var h=this._items;this._items=g,this.fp("items",h,g)},getSelectedItem:function(){return this._selectedItem},setSelectedItem:function(q){var c,P=this,r=P._items,X=P._selectedItem;!r||(c=r.indexOf(q))<0||(P._selectedItem=q,P._selectedIndex=c,P.s("live.label",q?P.getItemName(q):""),P.fp("selectedItem",X,q)&&P.onChanged(q))},getSelectedIndex:function(){return this._selectedIndex},setSelectedIndex:function(z){var D=this,t=D._items;!t||0>z||z>=t.length||(D._selectedIndex=z,D.setSelectedItem(t[z]))},getItemName:function(Z){return Z.label||Z},onChanged:function(){}}),ht.Default.setImage("combobox_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:{func:"style@live.shape"},borderWidth:{func:"style@live.border.width"},borderColor:{func:"style@live.border.color"},gradient:{func:"style@live.gradient"},gradientColor:{func:"style@live.gradient.color"},background:{func:"getBackground"},rect:[0,0,1,1],relative:!0},{type:"shape",points:{func:function(c){var Z=c._buttonWidth,S=c._width,K=c._height;return[S-Z+.5*Z,.6*K,S-Z+.75*Z,.4*K,S-Z+.25*Z,.4*K]}},background:{func:function(O){return O._pressed?"#000000":"#FFFFFF"}}},{type:"text",text:{func:"style@live.label"},align:{func:"style@live.label.align"},color:{func:"getForeground"},font:{func:"style@live.label.font"},rect:[0,0,1,1],relative:!0,offsetX:{func:"style@live.label.offset.x"},offsetY:{func:"style@live.label.offset.y"}}]});var G=ht.graph.ComboboxNodeUI=function(){G.superClass.constructor.apply(this,arguments)};ht.Default.def("ht.graph.ComboboxNodeUI",ht.graph.LiveNodeUI,{rectIntersects:function(){return!0},onKeyDown:function(Q){var f,I=this._data,u=0;return(37===Q.keyCode||38===Q.keyCode)&&(u=-1),(39===Q.keyCode||40===Q.keyCode)&&(u=1),u?(I._selectedIndex>=0?f=I._selectedIndex+u:I._items&&I._items.length>0&&(f=1===u?0:I.items.length-1),I.setSelectedIndex(f),this._ignore=!0,!0):27===Q.keyCode||13===Q.keyCode?(this._hidePopup(),!0):void 0},onMouseMove:function(){this._data._pressed&&(this._moved=!0)},onMouseUp:function(u){var d=this;G.superClass.onMouseUp.call(d,u),d._moved||(d._list?d._hidePopup():d._showPopup()),delete d._moved},_42:function(n){if(G.superClass._42.call(this,n),this._list&&this._data._selectedIndex>=0){var W=this._list.getDataModel().getDatas().get(this._data._selectedIndex);this._list.sm().ld()!==W&&this._list.sm().setSelection(W)}},_showPopup:function(){var P,V,F,b,m,C,v,U,N,h,t=this,X=t._data,R=X._items,K=t.gv._view.getBoundingClientRect(),w=(X._position.x-X._width/2)*t.gv._zoom+t.gv.tx()+K.left-t.gv._view.scrollLeft,M=(X._position.y+X._height/2)*t.gv._zoom+t.gv.ty()+K.top-t.gv._view.scrollTop;if(R&&0!==R.length){for(P=new ht.DataModel,V=this._list=new ht.widget.ListView(P),V.getIcon=function(){return null},V.drawRow=function(v,$,h,P,q,n,J){V._focusData===$&&(v.fillStyle=ht.Default.darker($.s("live.background")),v.beginPath(),v.rect(P,q,n,J),v.fill()),ht.widget.ListView.prototype.drawRow.apply(V,arguments)},F=0;F<R.length;F++)b=new ht.Data,b.setName(X.getItemName(R[F])),b._index=F,P.add(b),X._selectedIndex===F&&V.sm().setSelection(b);V.onSelectionChanged=function(){var O=V.sm().ld();O&&!t._ignore&&(X.setSelectedIndex(O._index),t._hidePopup(),delete t._ignore)},V.getSelectBackground=function(b){var F=b.s("live.background");return b===V._focusData?ht.Default.darker(F):F},V.getView().addEventListener("mousemove",function(J){V.setFocusData(V.getDataAt(J)),V.invalidateModel()},ht.Default.eventListenerOptionFalse),U=ht.Default.getWindowInfo(),C=X._width,v=Math.min(V.getRowHeight()*R.length,X._maxHeight,U.height),N=U.width-C-10,h=U.height-v-10,w=w>N?N:w,M=M>h?h:M,w=0>w?0:w,M=0>M?0:M,m=V.getView().style,m.left=w+U.left+"px",m.top=M+U.top+"px",m.width=C+"px",m.height=v+"px",m.zIndex=1e4,m.background="white",m.borderWidth="1px",m.borderColor="#DDDDE0",m.borderStyle="solid",m.borderRadius="5px",ht.Default.appendToScreen(V.getView()),A(function(){t._hidePopup()})}},_hidePopup:function(){this._list&&(ht.Default.removeHTML(this._list.getView()),delete this._list)}});var y=ht.ProgressBarNode=function(){var K=this;y.superClass.constructor.apply(K),K.s("label.position",17),K.s("live.background",ht.Color.widgetIconBackground),K.s("live.background.active",ht.Color.widgetIconHighlight)};ht.Default.def("ht.ProgressBarNode",ht.LiveNode,{_image:"progressBar_image",_value:0,getValue:function(){return this._value},setValue:function(Z){var R=this._value;this._value=Z,this.fp("value",R,Z)},getName:function(){return this._value+"%"}}),ht.Default.setImage("progressBar_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:"rect",background:{func:"style@live.background"},rect:[0,0,1,1],relative:!0},{type:"rect",background:{func:"style@live.background.active"},rect:{func:function(U){return[0,0,U._value/100,.5]}},relative:!0},{type:"rect",background:{func:function(h){return ht.Default.darker(h.s("live.background.active"))}},rect:{func:function(G){return[0,.5,G._value/100,.5]}},relative:!0}]});var R=ht.SliderNode=function(){var z=this;R.superClass.constructor.apply(z),z.s("label.position",17),z.s("live.background",ht.Color.widgetIconBackground),z.s("live.background.active",ht.Color.widgetIconHighlight)};ht.Default.def("ht.SliderNode",ht.LiveNode,{_image:"slider_image",_orientation:"horizontal",_value:0,_min:0,_max:100,_step:1,getUIClass:function(){return ht.graph.SliderNodeUI},getOrientation:function(){return this._orientation},setOrientation:function(Z){var G=this._orientation;this._orientation=Z,this.fp("orientation",G,Z)},isHorizontal:function(){var X=this._orientation;return"h"===X||"horizontal"===X},getValue:function(){return this._value},setValue:function(x){var C=this,z=C._min,v=C._max,Y=C._step;z>x&&(x=z),x>v&&(x=v),x=Math.floor(x/Y)*Y;var H=C._value;C._value=x,C.fp("value",H,x)&&C.onChanged(x)},getMin:function(){return this._min},setMin:function(g){var w=this._min;this._min=g,this.fp("min",w,g),this.setValue(this._value)},getMax:function(){return this._max},setMax:function(t){var h=this._max;this._max=t,this.fp("max",h,t),this.setValue(this._value)},getStep:function(){return this._step},setStep:function(G){var F=this._step;this._step=G,this.fp("step",F,G),this.setValue(this._value)},getName:function(){return this._value+""},onChanged:function(){}}),ht.Default.setImage("slider_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:"rect",background:{func:"style@live.background.active"},rect:{func:function(j){var u=j.s("slider.bar.size"),p=j.s("slider.thumb.size")+j.s("live.border.width"),W=j._value/(j._max-j._min),m=j.isHorizontal(),z=j._width,N=j._height;return{x:m?p:(z-u)/2,y:m?(N-u)/2:N-p-(N-2*p)*W,width:m?(z-2*p)*W:u,height:m?u:(N-2*p)*W}}}},{type:"rect",background:{func:"style@live.background"},rect:{func:function(o){var V=o.s("slider.bar.size"),E=o.s("slider.thumb.size")+o.s("live.border.width"),f=o._value/(o._max-o._min),i=o.isHorizontal(),D=o._width,q=o._height;return{x:i?E+(D-2*E)*f:(D-V)/2,y:i?(q-V)/2:E,width:i?(D-2*E)*(1-f):V,height:i?V:(q-2*E)*(1-f)}}}},{type:"circle",borderWidth:{func:"style@live.border.width"},borderColor:{func:"style@live.border.color"},background:{func:"style@slider.thumb.background"},rect:{func:function(q){var O=q.s("slider.thumb.size"),a=q._value/(q._max-q._min),X=q.isHorizontal(),k=q._width,c=q._height;return{x:X?a*(k-2*O):k/2-O,y:X?c/2-O:(1-a)*(c-2*O),width:2*O,height:2*O}}}}]});var D=ht.graph.SliderNodeUI=function(){D.superClass.constructor.apply(this,arguments)};ht.Default.def("ht.graph.SliderNodeUI",ht.graph.LiveNodeUI,{rectIntersects:function(){return!0},onKeyDown:function(n){var M=this._data,v=M.isHorizontal(),W=0;return(v&&37===n.keyCode||!v&&40===n.keyCode)&&(W=-1),(v&&39===n.keyCode||!v&&38===n.keyCode)&&(W=1),W?(M.setValue(M._value+M._step*W),!0):void 0},onMouseDown:function(h){var K=this,X=K._data,p=ht.Default.getClientPoint(h);K._start=X.isHorizontal()?p.x:p.y,K._startValue=X._value},onDrag:function(I){var c=this;if(c._start===k)return!1;var y=c._data,F=y.isHorizontal(),q=y._step,Z=ht.Default.getClientPoint(I),K=F?Z.x:Z.y,i=y.s("slider.thumb.size")+y.s("live.border.width"),D=F?y._width:y._height-2*i,H=(K-c._start)*(F?1:-1),z=(y._max-y._min)*H/D/c.gv._zoom;return y.setValue(c._startValue+Math.floor(z/q)*q),!0},onMouseUp:function(){delete this._start,delete this._startValue}});var v=ht.SpinnerNode=function(){v.superClass.constructor.apply(this),this._styleMap={},this._styleMap["label.position"]=16};ht.Default.def("ht.SpinnerNode",ht.LiveNode,{_image:"spinner_image",_value:0,_min:0,_max:100,_step:1,getUIClass:function(){return ht.graph.SpinnerNodeUI},getValue:function(){return this._value},setValue:function(i){i<this._min&&(i=this._min),i>this._max&&(i=this._max),i=Math.floor(i/this._step)*this._step;var $=this._value;this._value=i,this.fp("value",$,i)&&this.onChanged(i)},getMin:function(){return this._min},setMin:function(L){var D=this._min;this._min=L,this.fp("min",D,L),this.setValue(this._value)},getMax:function(){return this._max},setMax:function(E){var I=this._max;this._max=E,this.fp("max",I,E),this.setValue(this._value)},getStep:function(){return this._step},setStep:function(v){var Y=this._step;this._step=v,this.fp("step",Y,v),this.setValue(this._value)},getName:function(){return this._value+""},onChanged:function(){},getForeground:function(){return this.s(this._enabled?"live.label.active":"live.label.color")}}),ht.Default.setImage("spinner_image",{width:{func:"getWidth"},height:{func:"getHeight"},comps:[{type:{func:"style@live.shape"},borderWidth:{func:"style@live.border.width"},borderColor:{func:"style@live.border.color"},gradient:{func:"style@live.gradient"},gradientColor:{func:"style@live.gradient.color"},background:{func:function(s){return s.s(s._enabled?"spinner.background":"live.background.disabled")}},rect:[0,0,1,1],relative:!0},{type:"rect",background:{func:function(Y){var u;return u=Y._topPressed?"live.background.active":Y._topHover?"live.background.hover":"live.background",Y.s(u)}},rect:{func:function(f){var F=f.s("spinner.button.width"),N=f.s("live.border.width");return{x:f._width-F,y:N,width:F-N,height:f._height/2-N}}}},{type:"shape",points:{func:function(Z){var p=Z.s("spinner.button.width"),$=Z._width,b=Z._height;return[$-p+.5*p,.15*b,$-p+.75*p,.4*b,$-p+.25*p,.4*b]}},background:{func:function(o){return o._topHover?"#000000":"#FFFFFF"}}},{type:"rect",background:{func:function(Q){var r;return r=Q._bottomPressed?"live.background.active":Q._bottomHover?"live.background.hover":"live.background",Q.s(r)}},rect:{func:function(I){var J=I.s("spinner.button.width"),Q=I.s("live.border.width"),b=I._width,o=I._height;return{x:b-J,y:o/2,width:J-Q,height:o/2-Q}}}},{type:"shape",points:{func:function(m){var h=m.s("spinner.button.width"),D=m._width,o=m._height;return[D-h+.5*h,.9*o,D-h+.75*h,.65*o,D-h+.25*h,.65*o]}},background:{func:function(P){return P._bottomHover?"#000000":"#FFFFFF"}}}]});var j=ht.graph.SpinnerNodeUI=function(){j.superClass.constructor.apply(this,arguments)};ht.Default.def("ht.graph.SpinnerNodeUI",ht.graph.LiveNodeUI,{_refresh:function(y){var n=this._data,$=n.s("spinner.button.width"),P=this.gv.getLogicalPoint(y),l={x:n._position.x+n._width/2-$,y:n._position.y-n._height/2,width:$,height:n._height/2},R={x:n._position.x+n._width/2-$,y:n._position.y,width:$,height:n._height/2};n._topHover=ht.Default.containsPoint(l,P),n._bottomHover=ht.Default.containsPoint(R,P)},onKeyDown:function(g){var Q=this._data,U=0;return 38===g.keyCode&&(U=1),40===g.keyCode&&(U=-1),U?(Q.setValue(Q._value+Q._step*U),!0):void 0},onMouseOut:function(){var R=this._data;R._topHover=!1,R._bottomHover=!1,this.gv.invalidateData(R)},onMouseDown:function(b){var a=this,$=a._data,f=0;a._refresh(b),$._topPressed=$._topHover,$._bottomPressed=$._bottomHover,$._topPressed&&(f=1),$._bottomPressed&&(f=-1),f&&($.setValue($._value+$._step*f),a._timer&&clearTimeout(a._timer),a._interval&&clearInterval(a._interval),a._timer=setTimeout(function(){a._interval=setInterval(function(){$.setValue($._value+$._step*f)},100)},1e3))},onMouseMove:function(r){this._refresh(r),this.gv.invalidateData(this._data)},onMouseUp:function(){var F=this,G=F._data;G._topHover=!1,G._bottomHover=!1,G._topPressed=!1,G._bottomPressed=!1,F.gv.invalidateData(G),F._timer&&(clearTimeout(F._timer),delete F._timer),F._interval&&(clearInterval(F._interval),delete F._interval)}}),ht.ButtonGroup=function(H){var g=this;g._items=new ht.List,g.addAll(H)},ht.Default.def("ht.ButtonGroup",P,{add:function(G){var m=this;m._items.contains(G)||(m._items.add(G),G._buttonGroup=m,m._selected&&G._selected&&m._selected.setSelected(!1),G._selected&&(m._selected=G))},addAll:function($){$&&new ht.List($).each(self.add,self)},remove:function(a){var $=this;$._items.contains(a)&&($._items.remove(a),delete a._buttonGroup,$._selected===a&&delete $._selected)},getItems:function(){return this._items},clear:function(){var T=this;T._items.each(T.remove,T)},getSelected:function(){return this._selected},onChanged:function(){}});var p=ht.Style,$=ht.Color,I=$.widgetBackground,H=$.widgetIconHighlight,t=ht.Default.labelSelectColor;p["live.shape"]="rect",p["live.border.width"]=1,p["live.border.color"]=$.widgetBorder,p["live.gradient"]="",p["live.gradient.color"]="#FFF",p["live.background"]=H,p["live.background.disabled"]=I,p["live.background.hover"]=ht.Default.brighter(H),p["live.background.active"]=ht.Default.darker(H),p["live.label"]="",p["live.label.offset.x"]=0,p["live.label.offset.y"]=0,p["live.label.align"]="center",p["live.label.font"]=k,p["live.label.color"]=t,p["live.label.disabled"]=$.widgetIconBackground,p["live.label.hover"]=t,p["live.label.active"]=t,p["switch.background"]=I,p["switch.text.on"]="ON",p["switch.text.off"]="OFF",p["slider.bar.size"]=6,p["slider.thumb.size"]=8,p["slider.thumb.background"]=H,p["spinner.background"]="#FFFFFF",p["spinner.button.width"]=20;var W=ht.graph.GraphView.prototype;W.getFocusData=function(){return this._focusData},W.handleKeyUp=function(t){var F=this._focusData,q=F&&this._25I[F._id];F&&F._enabled&&F._editable&&q&&q.onKeyUp&&q.onKeyUp(t)},W.handleMouseDown=function(Q,d){this._focusData=d;var i=d&&this._25I[d._id];d&&d._enabled&&d._editable&&i&&i.onMouseDown&&i.onMouseDown(Q)},W.handleMouseUp=function(q,f){var y=f&&this._25I[f._id];f&&f._enabled&&f._editable&&y&&y.onMouseUp&&y.onMouseUp(q)},W.handleMouseMove=function(u){var e=this._lastHoverData,C=e&&this._25I[e._id],$=this.getDataAt(u),V=$&&this._25I[$._id];e&&C&&e._enabled&&e._editable&&(e===$?C.onMouseMove&&C.onMouseMove(u):C.onMouseOut&&C.onMouseOut(u)),$&&e!==$&&$._enabled&&$._editable&&V&&V.onMouseOver&&V.onMouseOver(u),this._lastHoverData=$},W._93O=function(B,s){var y=s&&this._25I[s._id];return s&&s._enabled&&s._editable&&y&&y.onDrag&&y.onDrag(B)},W=ht.graph.DefaultInteractor.prototype,W.handle_keyup=function(M){this.gv.handleKeyUp&&this.gv.handleKeyUp(M)},W.handle_mousemove=function(h){this.gv.handleMouseMove&&this.gv.handleMouseMove(h)};var F=new ht.List,A=function(E){setTimeout(function(){F.add(E)},0)};B.addEventListener(ht.Default.isTouchable?"touchend":"mouseup",function(){F.size()>0&&setTimeout(function(){F.each(function(c){c()}),F.clear()},0)},ht.Default.eventListenerOptionFalse)}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);