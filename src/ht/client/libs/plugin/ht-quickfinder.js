!function(c,b){"use strict";var N="ht",O=c[N],w=function(f){return(/ble$/.test(f)||/ed$/.test(f)||O.IsGetter[f]?"is":"get")+f.charAt(0).toUpperCase()+f.slice(1)};O.QuickFinder=function(r,n,L,z,h){var N=this;N.$9j={},N.$1j=r,N.$2j=n,N.$3j=L,N.$4j=z||N.getValue,N.$5j=h||N.$5j,r.each(N.$7j,N),r.mm(N.$11j,N,!0),r.md(N.$12j,N,!0)},O.Default.def(O.QuickFinder,b,{$6j:"__ht__null__",getValueFunc:function(){return this.$4j},getFilterFunc:function(){return this.$5j},$11j:function(P){"add"===P.kind?this.$7j(P.data):"remove"===P.kind?this.$8j(P.data):"clear"===P.kind&&(this.$9j={})},$12j:function(B){var I=this,g=I.$3j,Y=I.$2j;if(I.$5j(B.data)){if(null==g&&Y===B.property);else if("style"===g&&"s:"+Y===B.property);else if("attr"!==g||"a:"+Y!==B.property)return;var G=I.$10j(B.oldValue);G&&G.remove(B.data),I.$7j(B.data)}},$10j:function(K){return K=null==K?this.$6j:K,this.$9j[K]},find:function(p){var x=this.$10j(p);return x?x.toList():new O.List},findFirst:function(n){var h=this.$10j(n);return!h||h.isEmpty()?null:h.get(0)},$7j:function(e){var m=this;if(m.$5j(e)){var E=m.$4j(e),D=m.$10j(E);D||(D=new O.List,E=null==E?m.$6j:E,m.$9j[E]=D),D.add(e)}},$8j:function(e){var d=this;if(d.$5j(e)){var O=d.$4j(e),y=d.$10j(O);y&&(y.remove(e),y.isEmpty()&&(O=null==O?d.$6j:O,delete d.$9j[O]))}},dispose:function(){this.$1j.umm(this.$11j,this),this.$1j.umd(this.$12j,this),delete this.$1j},getDataModel:function(){return this.$1j},getAccessType:function(){return this.$3j},getPropertyName:function(){return this.$2j},$5j:function(M){return null!=this.$3j||this.$4j!==this.getValue||M[w(this.$2j)]?!0:!1},getValue:function(o){var x=this,R=x.$3j,X=x.$2j;return null==R?o[w(X)]():"style"===R?o.s(X):"attr"===R?o.a(X):void 0}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);