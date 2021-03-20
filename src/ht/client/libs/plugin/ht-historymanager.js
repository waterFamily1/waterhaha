!function(d,T,D){"use strict";var z="ht",g=d[z],B=g.Default,Q=B.def,P=B.getInternal();g.HistoryManager=function(r){this._histories=[],this.setDataModel(r)},Q(g.HistoryManager,T,{ms_ac:["dataModel","histories","historyIndex","maxHistoryCount","disabled"],ms_fire:1,_historyIndex:-1,_betweenTransaction:0,_maxHistoryCount:200,_disabled:!1,ignoredPropertyMap:{imageLoaded:!0,children:!0,attaches:!0,shape:!0,childChange:!0,agentChange:!0,sourceAgent:!0,targetAgent:!0,edgeGroup:!0,"*":!0},ignoreDataModelPropertyMap:{},beginInteraction:function(){this.beginTransaction()},endInteraction:function(){this.endTransaction()},beginTransaction:function(){if(!this._disabled){var w=this;w._betweenTransaction++,1===w._betweenTransaction&&(w._transactionHistories=[])}},endTransaction:function(){if(!this._disabled){var U=this,o=U._histories;U._betweenTransaction>0&&U._betweenTransaction--,0===U._betweenTransaction&&(U._transactionHistories&&U._transactionHistories.length&&(o=o.slice(0,U._historyIndex+1),o.push(U._transactionHistories),o.length>U._maxHistoryCount&&(o=o.slice(o.length-U._maxHistoryCount)),U.setHistories(o),U.setHistoryIndex(o.length-1,!0)),delete U._transactionHistories)}},setDataModel:function(f){var i=this,E=i._dataModel;E!==f&&(E&&(delete E._historyManager,E.ump(i.handleDataModelPropertyChange,i),E.umm(i.$5p,i),E.umd(i.$6p,i),E.removeHierarchyChangeListener(i.handleHierarchyChange,i),E.removeIndexChangeListener(i.handleIndexChange,i)),i._dataModel=f,f&&(f._historyManager=i,f.mp(i.handleDataModelPropertyChange,i),f.mm(i.$5p,i),f.md(i.$6p,i),f.addHierarchyChangeListener(i.handleHierarchyChange,i),f.addIndexChangeListener(i.handleIndexChange,i)),i.fp("dataModel",E,f),i.clear())},setHistoryIndex:function($,V){var J=this,W=J._historyIndex,C=J._histories.length;if(-1>$?$=-1:$>=C&&($=C-1),W!==$){if(!V){var z=$-W;z>0?J.$2p(z):0>z&&J.$1p(-z)}J._historyIndex=$,J.fp("historyIndex",W,$),J.dataModel&&J.dataModel.onHistoryManagerChanged()}},setMaxHistoryCount:function(K){var g=this,v=g._histories,I=g._maxHistoryCount;(!K||0>=K)&&(K=10),I!==K&&(g._maxHistoryCount=K,g.fp("maxHistoryCount",I,K),v.length>K&&g.clear())},cloneValue:function(Z){return g.Default.clone(Z)},isPropertyUndoable:function(I){return I&&!this.ignoredPropertyMap[I]},isDataModelPropertyUndoable:function(o){return o&&!this.ignoreDataModelPropertyMap[o]},$5p:function(H){this.handleChange(H,H.kind)},$6p:function(a){this.handleChange(a,"property")},handleHierarchyChange:function(x){this.handleChange(x,"hierarchy")},handleIndexChange:function(R){this.handleChange(R,"index")},handleDataModelPropertyChange:function(q){this.handleChange(q,"dataModelProperty")},toChildrenInfo:function(U){var i={};return i.data=U,i.children=[],U.eachChild(function(U){i.children.push(this.toChildrenInfo(U))},this),i},restoreChildren:function(Q){var s=Q.data;Q.children.forEach(function(P){var g=P.data;g.getParent()!==s&&s.addChild(g),this._dataModel.contains(g)||this._dataModel.add(g),this.restoreChildren(P)},this)},handleChange:function(M,C){var n=this;if(!(n._disabled||n._isUndoRedoing||B.loadingRefGraph)){var I,Y=(n._histories,M.data),E=M.property;if(!Y||!(Y._refGraph||Y instanceof g.RefGraph)){if("property"===C)n.isPropertyUndoable(E,Y)&&(I={kind:C,data:Y,property:E,oldValue:n.cloneValue(M.oldValue,Y,E),newValue:n.cloneValue(M.newValue,Y,E),event:M});else if("hierarchy"===C||"index"===C)I={kind:C,data:Y,oldIndex:M.oldIndex,newIndex:M.newIndex,event:M};else if("clear"===C)I={kind:C,json:M.json,event:M};else if("add"===C){if(I={kind:C,data:Y,event:M,childrenInfo:this.toChildrenInfo(Y),parent:Y.getParent()},I.parent){var R=n._dataModel.getSiblings(Y);I.siblingsIndex=R.indexOf(Y)}Y instanceof g.Node&&(I.host=Y.getHost(),I.attaches=Y.getAttaches()?Y.getAttaches().toArray():D),Y instanceof g.Edge&&(I.source=Y.getSource(),I.target=Y.getTarget())}else"remove"===C?I={kind:C,data:Y,event:M}:"dataModelProperty"===C&&n.isDataModelPropertyUndoable(E,Y)&&(I={kind:C,property:E,oldValue:n.cloneValue(M.oldValue,Y,E),newValue:n.cloneValue(M.newValue,Y,E),event:M});n.addHistory(I)}}},addHistory:function(O){var s=this;if(O)if(s._betweenTransaction){var R=!1;if("property"===O.kind||"dataModelProperty"===O.kind)for(var Y=s._transactionHistories.length-1;Y>=0;Y--){var m=s._transactionHistories[Y];if(O.kind===m.kind&&O.property===m.property&&O.data===m.data){O.oldValue=m.oldValue,s._transactionHistories[Y]=O,R=!0;break}}R||s._transactionHistories.push(O)}else{var S=s._histories;S=S.slice(0,s._historyIndex+1),S.push([O]),S.length>s._maxHistoryCount&&(S=S.slice(S.length-s._maxHistoryCount)),s.setHistories(S),s.setHistoryIndex(S.length-1,!0)}},canUndo:function(){return!this._disabled&&this._historyIndex>=0&&this._historyIndex<this._histories.length},canRedo:function(){return!this._disabled&&this._historyIndex>=-1&&this._historyIndex<this._histories.length-1},undo:function(L){(!L||0>=L)&&(L=1),this.setHistoryIndex(this._historyIndex-L)},$1p:function(v){if(this.canUndo()){var d,I=this,J=I._dataModel,S=I._histories,y=I._historyIndex,w=0;for(I._isUndoRedoing=!0,B.setIsolating(!0);v>0;){if(y>=0&&y<S.length){w++,d=S[y],y--;for(var O=d.length-1;O>=0;O--){var V=d[O],p=V.kind,m=V.data,t=V.property,u=V.event,h=this.cloneValue(V.oldValue,m,t);if(V.undo)V.undo();else if("add"===p)J.remove(m,{keepChildren:!0});else if("remove"===p)J.contains(m)||J.add(m,u.rootsIndex,u.datasIndex);else if("clear"===p)J.deserialize(B.clone(V.json));else if("property"===p)if("parent"===t)h?h.addChild(m,u.oldIndex):(m.setParent(h),u.oldIndex>=0&&J.moveTo(m,u.oldIndex));else{var j=null;0===t.indexOf("a:")?(j="attr",t=t.replace("a:","")):0===t.indexOf("s:")?(j="style",t=t.replace("s:","")):0===t.indexOf("f:")&&(j="field",t=t.replace("f:","")),P.setPropertyValue(m,j,t,h)}else if("dataModelProperty"===p){var j=null;0===t.indexOf("a:")?(j="attr",t=t.replace("a:","")):0===t.indexOf("s:")?(j="style",t=t.replace("s:","")):0===t.indexOf("f:")&&(j="field",t=t.replace("f:","")),P.setPropertyValue(J,j,t,h)}else"hierarchy"===p?J.moveTo(m,V.oldIndex):"index"===p&&J.moveToIndex(m,V.oldIndex)}}v--}B.setIsolating(!1),delete I._isUndoRedoing,I.afterUndo(w)}},afterUndo:function(){},redo:function(Y){(!Y||0>=Y)&&(Y=1),this.setHistoryIndex(this._historyIndex+Y)},$2p:function(p){if(this.canRedo()){var J,o=this,d=o._dataModel,j=o._histories,U=o._historyIndex,q=0;for(o._isUndoRedoing=!0,B.setIsolating(!0);p>0;){if(U>=-1&&U<j.length-1){q++,U++,J=j[U];for(var R=0;R<J.length;R++){var X=J[R],f=X.kind,c=X.data,_=X.property,t=X.event,F=this.cloneValue(X.newValue,c,_);if(X.redo)X.redo();else if("add"===f)X.parent&&!c.getParent()&&X.parent.addChild(c,X.siblingsIndex),d.contains(c)||d.add(c,t.rootsIndex,t.datasIndex),this.restoreChildren(X.childrenInfo),c instanceof g.Node&&(c.setHost(X.host),X.attaches&&X.attaches.forEach(function(j){j.setHost(c)})),c instanceof g.Edge&&(c.setSource(X.source),c.setTarget(X.target));else if("remove"===f)d.remove(c);else if("clear"===f)d.clear();else if("property"===f)if("parent"===_)F?F.addChild(c,t.newIndex):(c.setParent(F),t.newIndex>=0&&d.moveTo(c,t.newIndex));else{var v=null;0===_.indexOf("a:")?(v="attr",_=_.replace("a:","")):0===_.indexOf("s:")?(v="style",_=_.replace("s:","")):0===_.indexOf("f:")&&(v="field",_=_.replace("f:","")),P.setPropertyValue(c,v,_,F)}else if("dataModelProperty"===f){var v=null;0===_.indexOf("a:")?(v="attr",_=_.replace("a:","")):0===_.indexOf("s:")?(v="style",_=_.replace("s:","")):0===_.indexOf("f:")&&(v="field",_=_.replace("f:","")),P.setPropertyValue(d,v,_,F)}else"hierarchy"===f?d.moveTo(c,X.newIndex):"index"===f&&d.moveToIndex(c,X.newIndex)}}p--}B.setIsolating(!1),delete o._isUndoRedoing,this.afterRedo(q)}},afterRedo:function(){},clear:function(){this.setHistories([]),this.setHistoryIndex(-1,!0),this._betweenTransaction=0,delete this._transactionHistories}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);