/*!
 * w-runqws-client v1.0.27
 * (c) 2018-2021 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("ws")):"function"==typeof define&&define.amd?define(["ws"],e):(t="undefined"!=typeof globalThis?globalThis:t||self)["w-runqws-client"]=e(t.ws)}(this,(function(t){"use strict";function e(t,e){return t===e||t!=t&&e!=e}function n(t,n){for(var r=t.length;r--;)if(e(t[r][0],n))return r;return-1}var r=Array.prototype.splice;function o(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}o.prototype.clear=function(){this.__data__=[],this.size=0},o.prototype.delete=function(t){var e=this.__data__,o=n(e,t);return!(o<0)&&(o==e.length-1?e.pop():r.call(e,o,1),--this.size,!0)},o.prototype.get=function(t){var e=this.__data__,r=n(e,t);return r<0?void 0:e[r][1]},o.prototype.has=function(t){return n(this.__data__,t)>-1},o.prototype.set=function(t,e){var r=this.__data__,o=n(r,t);return o<0?(++this.size,r.push([t,e])):r[o][1]=e,this};var i="object"==typeof global&&global&&global.Object===Object&&global,u="object"==typeof self&&self&&self.Object===Object&&self,c=i||u||Function("return this")(),a=c.Symbol,f=Object.prototype,s=f.hasOwnProperty,l=f.toString,p=a?a.toStringTag:void 0;var y=Object.prototype.toString;var d="[object Null]",h="[object Undefined]",v=a?a.toStringTag:void 0;function b(t){return null==t?void 0===t?h:d:v&&v in Object(t)?function(t){var e=s.call(t,p),n=t[p];try{t[p]=void 0;var r=!0}catch(t){}var o=l.call(t);return r&&(e?t[p]=n:delete t[p]),o}(t):function(t){return y.call(t)}(t)}function g(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}var _="[object AsyncFunction]",j="[object Function]",w="[object GeneratorFunction]",m="[object Proxy]";function A(t){if(!g(t))return!1;var e=b(t);return e==j||e==w||e==_||e==m}var x,O=c["__core-js_shared__"],S=(x=/[^.]+$/.exec(O&&O.keys&&O.keys.IE_PROTO||""))?"Symbol(src)_1."+x:"";var B=Function.prototype.toString;function U(t){if(null!=t){try{return B.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var k=/^\[object .+?Constructor\]$/,I=Function.prototype,M=Object.prototype,P=I.toString,T=M.hasOwnProperty,z=RegExp("^"+P.call(T).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function C(t){return!(!g(t)||(e=t,S&&S in e))&&(A(t)?z:k).test(U(t));var e}function E(t,e){var n=function(t,e){return null==t?void 0:t[e]}(t,e);return C(n)?n:void 0}var F=E(c,"Map"),L=E(Object,"create");var D=Object.prototype.hasOwnProperty;var Q=Object.prototype.hasOwnProperty;function N(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}function $(t,e){var n,r,o=t.__data__;return("string"==(r=typeof(n=e))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof e?"string":"hash"]:o.map}function W(t){var e=-1,n=null==t?0:t.length;for(this.clear();++e<n;){var r=t[e];this.set(r[0],r[1])}}N.prototype.clear=function(){this.__data__=L?L(null):{},this.size=0},N.prototype.delete=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e},N.prototype.get=function(t){var e=this.__data__;if(L){var n=e[t];return"__lodash_hash_undefined__"===n?void 0:n}return D.call(e,t)?e[t]:void 0},N.prototype.has=function(t){var e=this.__data__;return L?void 0!==e[t]:Q.call(e,t)},N.prototype.set=function(t,e){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=L&&void 0===e?"__lodash_hash_undefined__":e,this},W.prototype.clear=function(){this.size=0,this.__data__={hash:new N,map:new(F||o),string:new N}},W.prototype.delete=function(t){var e=$(this,t).delete(t);return this.size-=e?1:0,e},W.prototype.get=function(t){return $(this,t).get(t)},W.prototype.has=function(t){return $(this,t).has(t)},W.prototype.set=function(t,e){var n=$(this,t),r=n.size;return n.set(t,e),this.size+=n.size==r?0:1,this};function R(t){var e=this.__data__=new o(t);this.size=e.size}function V(t,e){for(var n=-1,r=null==t?0:t.length;++n<r&&!1!==e(t[n],n,t););return t}R.prototype.clear=function(){this.__data__=new o,this.size=0},R.prototype.delete=function(t){var e=this.__data__,n=e.delete(t);return this.size=e.size,n},R.prototype.get=function(t){return this.__data__.get(t)},R.prototype.has=function(t){return this.__data__.has(t)},R.prototype.set=function(t,e){var n=this.__data__;if(n instanceof o){var r=n.__data__;if(!F||r.length<199)return r.push([t,e]),this.size=++n.size,this;n=this.__data__=new W(r)}return n.set(t,e),this.size=n.size,this};var H=function(){try{var t=E(Object,"defineProperty");return t({},"",{}),t}catch(t){}}(),q=H;function G(t,e,n){"__proto__"==e&&q?q(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}var J=Object.prototype.hasOwnProperty;function K(t,n,r){var o=t[n];J.call(t,n)&&e(o,r)&&(void 0!==r||n in t)||G(t,n,r)}function X(t,e,n,r){var o=!n;n||(n={});for(var i=-1,u=e.length;++i<u;){var c=e[i],a=r?r(n[c],t[c],c,n,t):void 0;void 0===a&&(a=t[c]),o?G(n,c,a):K(n,c,a)}return n}function Y(t){return null!=t&&"object"==typeof t}function Z(t){return Y(t)&&"[object Arguments]"==b(t)}var tt=Object.prototype,et=tt.hasOwnProperty,nt=tt.propertyIsEnumerable,rt=Z(function(){return arguments}())?Z:function(t){return Y(t)&&et.call(t,"callee")&&!nt.call(t,"callee")},ot=rt,it=Array.isArray;var ut="object"==typeof exports&&exports&&!exports.nodeType&&exports,ct=ut&&"object"==typeof module&&module&&!module.nodeType&&module,at=ct&&ct.exports===ut?c.Buffer:void 0,ft=(at?at.isBuffer:void 0)||function(){return!1},st=9007199254740991,lt=/^(?:0|[1-9]\d*)$/;function pt(t,e){var n=typeof t;return!!(e=null==e?st:e)&&("number"==n||"symbol"!=n&&lt.test(t))&&t>-1&&t%1==0&&t<e}var yt=9007199254740991;function dt(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=yt}var ht={};function vt(t){return function(e){return t(e)}}ht["[object Float32Array]"]=ht["[object Float64Array]"]=ht["[object Int8Array]"]=ht["[object Int16Array]"]=ht["[object Int32Array]"]=ht["[object Uint8Array]"]=ht["[object Uint8ClampedArray]"]=ht["[object Uint16Array]"]=ht["[object Uint32Array]"]=!0,ht["[object Arguments]"]=ht["[object Array]"]=ht["[object ArrayBuffer]"]=ht["[object Boolean]"]=ht["[object DataView]"]=ht["[object Date]"]=ht["[object Error]"]=ht["[object Function]"]=ht["[object Map]"]=ht["[object Number]"]=ht["[object Object]"]=ht["[object RegExp]"]=ht["[object Set]"]=ht["[object String]"]=ht["[object WeakMap]"]=!1;var bt="object"==typeof exports&&exports&&!exports.nodeType&&exports,gt=bt&&"object"==typeof module&&module&&!module.nodeType&&module,_t=gt&&gt.exports===bt&&i.process,jt=function(){try{var t=gt&&gt.require&&gt.require("util").types;return t||_t&&_t.binding&&_t.binding("util")}catch(t){}}(),wt=jt&&jt.isTypedArray,mt=wt?vt(wt):function(t){return Y(t)&&dt(t.length)&&!!ht[b(t)]},At=Object.prototype.hasOwnProperty;function xt(t,e){var n=it(t),r=!n&&ot(t),o=!n&&!r&&ft(t),i=!n&&!r&&!o&&mt(t),u=n||r||o||i,c=u?function(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}(t.length,String):[],a=c.length;for(var f in t)!e&&!At.call(t,f)||u&&("length"==f||o&&("offset"==f||"parent"==f)||i&&("buffer"==f||"byteLength"==f||"byteOffset"==f)||pt(f,a))||c.push(f);return c}var Ot=Object.prototype;function St(t){var e=t&&t.constructor;return t===("function"==typeof e&&e.prototype||Ot)}function Bt(t,e){return function(n){return t(e(n))}}var Ut=Bt(Object.keys,Object),kt=Object.prototype.hasOwnProperty;function It(t){return null!=t&&dt(t.length)&&!A(t)}function Mt(t){return It(t)?xt(t):function(t){if(!St(t))return Ut(t);var e=[];for(var n in Object(t))kt.call(t,n)&&"constructor"!=n&&e.push(n);return e}(t)}var Pt=Object.prototype.hasOwnProperty;function Tt(t){if(!g(t))return function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}(t);var e=St(t),n=[];for(var r in t)("constructor"!=r||!e&&Pt.call(t,r))&&n.push(r);return n}function zt(t){return It(t)?xt(t,!0):Tt(t)}var Ct="object"==typeof exports&&exports&&!exports.nodeType&&exports,Et=Ct&&"object"==typeof module&&module&&!module.nodeType&&module,Ft=Et&&Et.exports===Ct?c.Buffer:void 0,Lt=Ft?Ft.allocUnsafe:void 0;function Dt(){return[]}var Qt=Object.prototype.propertyIsEnumerable,Nt=Object.getOwnPropertySymbols,$t=Nt?function(t){return null==t?[]:(t=Object(t),function(t,e){for(var n=-1,r=null==t?0:t.length,o=0,i=[];++n<r;){var u=t[n];e(u,n,t)&&(i[o++]=u)}return i}(Nt(t),(function(e){return Qt.call(t,e)})))}:Dt,Wt=$t;function Rt(t,e){for(var n=-1,r=e.length,o=t.length;++n<r;)t[o+n]=e[n];return t}var Vt=Bt(Object.getPrototypeOf,Object),Ht=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)Rt(e,Wt(t)),t=Vt(t);return e}:Dt,qt=Ht;function Gt(t,e,n){var r=e(t);return it(t)?r:Rt(r,n(t))}function Jt(t){return Gt(t,Mt,Wt)}function Kt(t){return Gt(t,zt,qt)}var Xt=E(c,"DataView"),Yt=E(c,"Promise"),Zt=E(c,"Set"),te=E(c,"WeakMap"),ee="[object Map]",ne="[object Promise]",re="[object Set]",oe="[object WeakMap]",ie="[object DataView]",ue=U(Xt),ce=U(F),ae=U(Yt),fe=U(Zt),se=U(te),le=b;(Xt&&le(new Xt(new ArrayBuffer(1)))!=ie||F&&le(new F)!=ee||Yt&&le(Yt.resolve())!=ne||Zt&&le(new Zt)!=re||te&&le(new te)!=oe)&&(le=function(t){var e=b(t),n="[object Object]"==e?t.constructor:void 0,r=n?U(n):"";if(r)switch(r){case ue:return ie;case ce:return ee;case ae:return ne;case fe:return re;case se:return oe}return e});var pe=le,ye=Object.prototype.hasOwnProperty;var de=c.Uint8Array;function he(t){var e=new t.constructor(t.byteLength);return new de(e).set(new de(t)),e}var ve=/\w*$/;var be=a?a.prototype:void 0,ge=be?be.valueOf:void 0;var _e="[object Boolean]",je="[object Date]",we="[object Map]",me="[object Number]",Ae="[object RegExp]",xe="[object Set]",Oe="[object String]",Se="[object Symbol]",Be="[object ArrayBuffer]",Ue="[object DataView]",ke="[object Float32Array]",Ie="[object Float64Array]",Me="[object Int8Array]",Pe="[object Int16Array]",Te="[object Int32Array]",ze="[object Uint8Array]",Ce="[object Uint8ClampedArray]",Ee="[object Uint16Array]",Fe="[object Uint32Array]";function Le(t,e,n){var r,o,i,u=t.constructor;switch(e){case Be:return he(t);case _e:case je:return new u(+t);case Ue:return function(t,e){var n=e?he(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.byteLength)}(t,n);case ke:case Ie:case Me:case Pe:case Te:case ze:case Ce:case Ee:case Fe:return function(t,e){var n=e?he(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}(t,n);case we:return new u;case me:case Oe:return new u(t);case Ae:return(i=new(o=t).constructor(o.source,ve.exec(o))).lastIndex=o.lastIndex,i;case xe:return new u;case Se:return r=t,ge?Object(ge.call(r)):{}}}var De=Object.create,Qe=function(){function t(){}return function(e){if(!g(e))return{};if(De)return De(e);t.prototype=e;var n=new t;return t.prototype=void 0,n}}(),Ne=Qe;var $e=jt&&jt.isMap,We=$e?vt($e):function(t){return Y(t)&&"[object Map]"==pe(t)};var Re=jt&&jt.isSet,Ve=Re?vt(Re):function(t){return Y(t)&&"[object Set]"==pe(t)},He=1,qe=2,Ge=4,Je="[object Arguments]",Ke="[object Function]",Xe="[object GeneratorFunction]",Ye="[object Object]",Ze={};function tn(t,e,n,r,o,i){var u,c=e&He,a=e&qe,f=e&Ge;if(n&&(u=o?n(t,r,o,i):n(t)),void 0!==u)return u;if(!g(t))return t;var s=it(t);if(s){if(u=function(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&ye.call(t,"index")&&(n.index=t.index,n.input=t.input),n}(t),!c)return function(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}(t,u)}else{var l=pe(t),p=l==Ke||l==Xe;if(ft(t))return function(t,e){if(e)return t.slice();var n=t.length,r=Lt?Lt(n):new t.constructor(n);return t.copy(r),r}(t,c);if(l==Ye||l==Je||p&&!o){if(u=a||p?{}:function(t){return"function"!=typeof t.constructor||St(t)?{}:Ne(Vt(t))}(t),!c)return a?function(t,e){return X(t,qt(t),e)}(t,function(t,e){return t&&X(e,zt(e),t)}(u,t)):function(t,e){return X(t,Wt(t),e)}(t,function(t,e){return t&&X(e,Mt(e),t)}(u,t))}else{if(!Ze[l])return o?t:{};u=Le(t,l,c)}}i||(i=new R);var y=i.get(t);if(y)return y;i.set(t,u),Ve(t)?t.forEach((function(r){u.add(tn(r,e,n,r,t,i))})):We(t)&&t.forEach((function(r,o){u.set(o,tn(r,e,n,o,t,i))}));var d=s?void 0:(f?a?Kt:Jt:a?zt:Mt)(t);return V(d||t,(function(r,o){d&&(r=t[o=r]),K(u,o,tn(r,e,n,o,t,i))})),u}Ze[Je]=Ze["[object Array]"]=Ze["[object ArrayBuffer]"]=Ze["[object DataView]"]=Ze["[object Boolean]"]=Ze["[object Date]"]=Ze["[object Float32Array]"]=Ze["[object Float64Array]"]=Ze["[object Int8Array]"]=Ze["[object Int16Array]"]=Ze["[object Int32Array]"]=Ze["[object Map]"]=Ze["[object Number]"]=Ze[Ye]=Ze["[object RegExp]"]=Ze["[object Set]"]=Ze["[object String]"]=Ze["[object Symbol]"]=Ze["[object Uint8Array]"]=Ze["[object Uint8ClampedArray]"]=Ze["[object Uint16Array]"]=Ze["[object Uint32Array]"]=!0,Ze["[object Error]"]=Ze[Ke]=Ze["[object WeakMap]"]=!1;var en=1,nn=4;var rn="[object Symbol]";function on(t){return"symbol"==typeof t||Y(t)&&b(t)==rn}var un=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,cn=/^\w*$/;var an="Expected a function";function fn(t,e){if("function"!=typeof t||null!=e&&"function"!=typeof e)throw new TypeError(an);var n=function(){var r=arguments,o=e?e.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var u=t.apply(this,r);return n.cache=i.set(o,u)||i,u};return n.cache=new(fn.Cache||W),n}fn.Cache=W;var sn,ln,pn,yn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,dn=/\\(\\)?/g,hn=(sn=function(t){var e=[];return 46===t.charCodeAt(0)&&e.push(""),t.replace(yn,(function(t,n,r,o){e.push(r?o.replace(dn,"$1"):n||t)})),e},ln=fn(sn,(function(t){return 500===pn.size&&pn.clear(),t})),pn=ln.cache,ln),vn=hn;var bn=1/0,gn=a?a.prototype:void 0,_n=gn?gn.toString:void 0;function jn(t){if("string"==typeof t)return t;if(it(t))return function(t,e){for(var n=-1,r=null==t?0:t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}(t,jn)+"";if(on(t))return _n?_n.call(t):"";var e=t+"";return"0"==e&&1/t==-bn?"-0":e}function wn(t){return null==t?"":jn(t)}function mn(t,e){return it(t)?t:function(t,e){if(it(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!on(t))||cn.test(t)||!un.test(t)||null!=e&&t in Object(e)}(t,e)?[t]:vn(wn(t))}var An=1/0;function xn(t){if("string"==typeof t||on(t))return t;var e=t+"";return"0"==e&&1/t==-An?"-0":e}function On(t,e,n){var r=null==t?void 0:function(t,e){for(var n=0,r=(e=mn(e,t)).length;null!=t&&n<r;)t=t[xn(e[n++])];return n&&n==r?t:void 0}(t,e);return void 0===r?n:r}var Sn="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Bn(t){if(t.__esModule)return t;var e=t.default;if("function"==typeof e){var n=function t(){if(this instanceof t){var n=[null];return n.push.apply(n,arguments),new(Function.bind.apply(e,n))}return e.apply(this,arguments)};n.prototype=e.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach((function(e){var r=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,r.get?r:{enumerable:!0,get:function(){return t[e]}})})),n}var Un={};!function(t){var e=Object.prototype.hasOwnProperty,n="~";function r(){}function o(t,e,n){this.fn=t,this.context=e,this.once=n||!1}function i(t,e,r,i,u){if("function"!=typeof r)throw new TypeError("The listener must be a function");var c=new o(r,i||t,u),a=n?n+e:e;return t._events[a]?t._events[a].fn?t._events[a]=[t._events[a],c]:t._events[a].push(c):(t._events[a]=c,t._eventsCount++),t}function u(t,e){0==--t._eventsCount?t._events=new r:delete t._events[e]}function c(){this._events=new r,this._eventsCount=0}Object.create&&(r.prototype=Object.create(null),(new r).__proto__||(n=!1)),c.prototype.eventNames=function(){var t,r,o=[];if(0===this._eventsCount)return o;for(r in t=this._events)e.call(t,r)&&o.push(n?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(t)):o},c.prototype.listeners=function(t){var e=n?n+t:t,r=this._events[e];if(!r)return[];if(r.fn)return[r.fn];for(var o=0,i=r.length,u=new Array(i);o<i;o++)u[o]=r[o].fn;return u},c.prototype.listenerCount=function(t){var e=n?n+t:t,r=this._events[e];return r?r.fn?1:r.length:0},c.prototype.emit=function(t,e,r,o,i,u){var c=n?n+t:t;if(!this._events[c])return!1;var a,f,s=this._events[c],l=arguments.length;if(s.fn){switch(s.once&&this.removeListener(t,s.fn,void 0,!0),l){case 1:return s.fn.call(s.context),!0;case 2:return s.fn.call(s.context,e),!0;case 3:return s.fn.call(s.context,e,r),!0;case 4:return s.fn.call(s.context,e,r,o),!0;case 5:return s.fn.call(s.context,e,r,o,i),!0;case 6:return s.fn.call(s.context,e,r,o,i,u),!0}for(f=1,a=new Array(l-1);f<l;f++)a[f-1]=arguments[f];s.fn.apply(s.context,a)}else{var p,y=s.length;for(f=0;f<y;f++)switch(s[f].once&&this.removeListener(t,s[f].fn,void 0,!0),l){case 1:s[f].fn.call(s[f].context);break;case 2:s[f].fn.call(s[f].context,e);break;case 3:s[f].fn.call(s[f].context,e,r);break;case 4:s[f].fn.call(s[f].context,e,r,o);break;default:if(!a)for(p=1,a=new Array(l-1);p<l;p++)a[p-1]=arguments[p];s[f].fn.apply(s[f].context,a)}}return!0},c.prototype.on=function(t,e,n){return i(this,t,e,n,!1)},c.prototype.once=function(t,e,n){return i(this,t,e,n,!0)},c.prototype.removeListener=function(t,e,r,o){var i=n?n+t:t;if(!this._events[i])return this;if(!e)return u(this,i),this;var c=this._events[i];if(c.fn)c.fn!==e||o&&!c.once||r&&c.context!==r||u(this,i);else{for(var a=0,f=[],s=c.length;a<s;a++)(c[a].fn!==e||o&&!c[a].once||r&&c[a].context!==r)&&f.push(c[a]);f.length?this._events[i]=1===f.length?f[0]:f:u(this,i)}return this},c.prototype.removeAllListeners=function(t){var e;return t?(e=n?n+t:t,this._events[e]&&u(this,e)):(this._events=new r,this._eventsCount=0),this},c.prototype.off=c.prototype.removeListener,c.prototype.addListener=c.prototype.on,c.prefixed=n,c.EventEmitter=c,t.exports=c}({get exports(){return Un},set exports(t){Un=t}});var kn=Un;function In(){return new kn}var Mn=/\s/;var Pn=/^\s+/;function Tn(t){return t?t.slice(0,function(t){for(var e=t.length;e--&&Mn.test(t.charAt(e)););return e}(t)+1).replace(Pn,""):t}var zn=NaN,Cn=/^[-+]0x[0-9a-f]+$/i,En=/^0b[01]+$/i,Fn=/^0o[0-7]+$/i,Ln=parseInt;function Dn(t){if("number"==typeof t)return t;if(on(t))return zn;if(g(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=g(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=Tn(t);var n=En.test(t);return n||Fn.test(t)?Ln(t.slice(2),n?2:8):Cn.test(t)?zn:+t}var Qn=1/0,Nn=17976931348623157e292;function $n(t){return t?(t=Dn(t))===Qn||t===-Qn?(t<0?-1:1)*Nn:t==t?t:0:0===t?t:0}function Wn(t){var e=$n(t),n=e%1;return e==e?n?e-n:e:0}function Rn(t){return"[object String]"===Object.prototype.toString.call(t)}function Vn(t){return!(!Rn(t)||""===t)}function Hn(t){let e=!1;if(Vn(t))e=!isNaN(Number(t));else if(function(t){return"[object Number]"===Object.prototype.toString.call(t)}(t)){if(function(t){return t!=t}(t))return!1;e=!0}return e}function qn(t){if(!Hn(t))return 0;return $n(t)}function Gn(t){return!!Hn(t)&&(t=qn(t),"number"==typeof(e=t)&&e==Wn(e));var e}var Jn=c.isFinite,Kn=Math.min;var Xn=function(t){var e=Math[t];return function(t,n){if(t=Dn(t),(n=null==n?0:Kn(Wn(n),292))&&Jn(t)){var r=(wn(t)+"e").split("e");return+((r=(wn(e(r[0]+"e"+(+r[1]+n)))+"e").split("e"))[0]+"e"+(+r[1]-n))}return e(t)}}("round"),Yn=Xn;function Zn(t){if(!Hn(t))return 0;t=qn(t);let e=Yn(t);return"0"===String(e)?0:e}function tr(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=0,n=[];var r;Gn(r=t)&&Zn(r)<0&&(t=0),t=Zn(t);let o=In();return o.get=function(){if(n.length>0){return e+=1,n.splice(0,1)[0]}return null},o.cb=function(){e-=1,e<0&&(e=0),n.length>0&&o.emit("message",n)},o.push=function(r){n.push(r),(t<=0||e<t)&&o.emit("message",n)},o.clear=function(){e=0,n=[]},o}function er(){return"undefined"!=typeof window&&void 0!==window.document}function nr(t){let e=Object.prototype.toString.call(t);return"[object Function]"===e||"[object AsyncFunction]"===e}function rr(e){let n=null;e.url||(e.url="ws://localhost:8080"),e.token||(e.token="*");let r,o=function(){let t=er(),e="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope;return t=t||e,{isBrowser:t,isWebWorker:e,isNode:"undefined"!=typeof process&&null!=process.versions&&null!=process.versions.node}}().isBrowser;r=o?("undefined"!=typeof self?self:er()?window:"undefined"!=typeof global?global:null).WebSocket:t;try{n=new r(e.url+"/?token="+e.token)}catch(t){n=null}if(null===n)return{error:"can not new MixWS"};function i(){nr(e.open)&&e.open()}function u(){nr(e.close)&&e.close()}function c(t){nr(e.message)&&e.message(t)}function a(t){nr(e.error)&&e.error(t),n.close()}return o?(n.onopen=i,n.onmessage=function(t){c(t.data)},n.onclose=u,n.onerror=a):(n.on("open",i),n.on("message",c),n.on("close",u),n.on("error",a)),n}let or="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),ir=or.length;function ur(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32,e=[];var n;t=Gn(n=t)&&Zn(n)>0?Zn(t):32;for(let n=0;n<t;n++)e[n]=or[0|Math.random()*ir];return e.join("")}function cr(t,e,n){var r=-1,o=t.length;e<0&&(e=-e>o?0:o+e),(n=n>o?o:n)<0&&(n+=o),o=e>n?0:n-e>>>0,e>>>=0;for(var i=Array(o);++r<o;)i[r]=t[r+e];return i}function ar(t,n,r){if(!g(r))return!1;var o=typeof n;return!!("number"==o?It(r)&&pt(n,r.length):"string"==o&&n in r)&&e(r[n],t)}var fr=Math.ceil,sr=Math.max;var lr=Array.prototype.join;function pr(t,e){return null==t?"":lr.call(t,e)}var yr,dr=function(t,e,n){for(var r=-1,o=Object(t),i=n(t),u=i.length;u--;){var c=i[yr?u:++r];if(!1===e(o[c],c,o))break}return t};var hr=function(t,e){return function(n,r){if(null==n)return n;if(!It(n))return t(n,r);for(var o=n.length,i=e?o:-1,u=Object(n);(e?i--:++i<o)&&!1!==r(u[i],i,u););return n}}((function(t,e){return t&&dr(t,e,Mt)})),vr=hr;function br(t){return t}function gr(t,e){var n;return(it(t)?V:vr)(t,"function"==typeof(n=e)?n:br)}function _r(t){return"[object Uint8Array]"===Object.prototype.toString.call(t)}function jr(t){return"[object Uint16Array]"===Object.prototype.toString.call(t)}function wr(t){if(!Gn(t))return!1;return Zn(t)>=0}function mr(t,e){return Vn(t)&&wr(e)?0===(e=Zn(e))?"":t.substring(0,e):""}function Ar(t,e){return Vn(t)&&wr(e)?0===(e=Zn(e))?t:function(t,e){if(!Vn(t))return"";if(!wr(e))return"";if(0===(e=Zn(e)))return"";let n=t.length-e;return n<0&&(n=0),t.substr(n,e)}(t,t.length-e):""}var xr={},Or={get exports(){return xr},set exports(t){xr=t}};var Sr,Br={},Ur={get exports(){return Br},set exports(t){Br=t}},kr=Bn(Object.freeze({__proto__:null,default:{}}));function Ir(){return Sr||(Sr=1,function(t,e){var n;t.exports=(n=n||function(t,e){var n;if("undefined"!=typeof window&&window.crypto&&(n=window.crypto),"undefined"!=typeof self&&self.crypto&&(n=self.crypto),"undefined"!=typeof globalThis&&globalThis.crypto&&(n=globalThis.crypto),!n&&"undefined"!=typeof window&&window.msCrypto&&(n=window.msCrypto),!n&&void 0!==Sn&&Sn.crypto&&(n=Sn.crypto),!n)try{n=kr}catch(t){}var r=function(){if(n){if("function"==typeof n.getRandomValues)try{return n.getRandomValues(new Uint32Array(1))[0]}catch(t){}if("function"==typeof n.randomBytes)try{return n.randomBytes(4).readInt32LE()}catch(t){}}throw new Error("Native crypto module could not be used to get secure random number.")},o=Object.create||function(){function t(){}return function(e){var n;return t.prototype=e,n=new t,t.prototype=null,n}}(),i={},u=i.lib={},c=u.Base={extend:function(t){var e=o(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),e.init.prototype=e,e.$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},a=u.WordArray=c.extend({init:function(t,n){t=this.words=t||[],this.sigBytes=n!=e?n:4*t.length},toString:function(t){return(t||s).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes,o=t.sigBytes;if(this.clamp(),r%4)for(var i=0;i<o;i++){var u=n[i>>>2]>>>24-i%4*8&255;e[r+i>>>2]|=u<<24-(r+i)%4*8}else for(var c=0;c<o;c+=4)e[r+c>>>2]=n[c>>>2];return this.sigBytes+=o,this},clamp:function(){var e=this.words,n=this.sigBytes;e[n>>>2]&=4294967295<<32-n%4*8,e.length=t.ceil(n/4)},clone:function(){var t=c.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],n=0;n<t;n+=4)e.push(r());return new a.init(e,t)}}),f=i.enc={},s=f.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],o=0;o<n;o++){var i=e[o>>>2]>>>24-o%4*8&255;r.push((i>>>4).toString(16)),r.push((15&i).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new a.init(n,e/2)}},l=f.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],o=0;o<n;o++){var i=e[o>>>2]>>>24-o%4*8&255;r.push(String.fromCharCode(i))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new a.init(n,e)}},p=f.Utf8={stringify:function(t){try{return decodeURIComponent(escape(l.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return l.parse(unescape(encodeURIComponent(t)))}},y=u.BufferedBlockAlgorithm=c.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(e){var n,r=this._data,o=r.words,i=r.sigBytes,u=this.blockSize,c=i/(4*u),f=(c=e?t.ceil(c):t.max((0|c)-this._minBufferSize,0))*u,s=t.min(4*f,i);if(f){for(var l=0;l<f;l+=u)this._doProcessBlock(o,l);n=o.splice(0,f),r.sigBytes-=s}return new a.init(n,s)},clone:function(){var t=c.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});u.Hasher=y.extend({cfg:c.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){y.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(e,n){return new t.init(n).finalize(e)}},_createHmacHelper:function(t){return function(e,n){return new d.HMAC.init(t,n).finalize(e)}}});var d=i.algo={};return i}(Math),n)}(Ur)),Br}!function(t,e){var n;t.exports=(n=Ir(),function(){var t=n,e=t.lib.WordArray;function r(t,n,r){for(var o=[],i=0,u=0;u<n;u++)if(u%4){var c=r[t.charCodeAt(u-1)]<<u%4*2|r[t.charCodeAt(u)]>>>6-u%4*2;o[i>>>2]|=c<<24-i%4*8,i++}return e.create(o,i)}t.enc.Base64={stringify:function(t){var e=t.words,n=t.sigBytes,r=this._map;t.clamp();for(var o=[],i=0;i<n;i+=3)for(var u=(e[i>>>2]>>>24-i%4*8&255)<<16|(e[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|e[i+2>>>2]>>>24-(i+2)%4*8&255,c=0;c<4&&i+.75*c<n;c++)o.push(r.charAt(u>>>6*(3-c)&63));var a=r.charAt(64);if(a)for(;o.length%4;)o.push(a);return o.join("")},parse:function(t){var e=t.length,n=this._map,o=this._reverseMap;if(!o){o=this._reverseMap=[];for(var i=0;i<n.length;i++)o[n.charCodeAt(i)]=i}var u=n.charAt(64);if(u){var c=t.indexOf(u);-1!==c&&(e=c)}return r(t,e,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),n.enc.Base64)}(Or);var Mr=xr,Pr={};!function(t,e){var n;t.exports=(n=Ir(),function(){if("function"==typeof ArrayBuffer){var t=n.lib.WordArray,e=t.init,r=t.init=function(t){if(t instanceof ArrayBuffer&&(t=new Uint8Array(t)),(t instanceof Int8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(t=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)),t instanceof Uint8Array){for(var n=t.byteLength,r=[],o=0;o<n;o++)r[o>>>2]|=t[o]<<24-o%4*8;e.call(this,r,n)}else e.apply(this,arguments)};r.prototype=t}}(),n.lib.WordArray)}({get exports(){return Pr},set exports(t){Pr=t}});var Tr=Pr;function zr(t){if(!_r(t))return"";return Tr.create(t).toString(Mr)}function Cr(t){if(!Rn(t))return new Uint8Array;let e=Mr.parse(t),n=e.words,r=e.sigBytes,o=new Uint8Array(r);for(let t=0;t<r;t++){let e=n[t>>>2]>>>24-t%4*8&255;o[t]=e}return o}function Er(t){return jr(t)?zr(function(t){return jr(t)?new Uint8Array(t):new Uint8Array}(t)):""}function Fr(t){if(!Rn(t))return new Uint16Array;let e=function(t){return _r(t)?new Uint16Array(t):new Uint16Array}(Cr(t));return e}let Lr="[Uint8Array]::";let Dr="[Uint16Array]::";let Qr={tagU8A:Lr,u8arr2b64:function(t){return _r(t)?Lr+zr(t):t},b642u8arr:function(t){return Rn(t)&&mr(t,Lr.length)===Lr?Cr(t=Ar(t,Lr.length)):t},tagU16A:Dr,u16arr2b64:function(t){return jr(t)?Dr+Er(t):t},b642u16arr:function(t){return Rn(t)&&mr(t,Dr.length)===Dr?Fr(t=Ar(t,Dr.length)):t}};function Nr(t){return"[object Array]"===Object.prototype.toString.call(t)}function $r(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Uint8Array";if(n=t,"[object Undefined]"===Object.prototype.toString.call(n))return"";var n;if(Rn(e))e=[e];else if(!Nr(e))return"";let r="";try{r=JSON.stringify(t,(function(t,n){return e.indexOf("Uint8Array")>=0&&(n=Qr.u8arr2b64(n)),e.indexOf("Uint16Array")>=0&&(n=Qr.u16arr2b64(n)),n}))}catch(t){r=""}return r}function Wr(t,e,n,r,o){let i=function(t,e,n){e=(n?ar(t,e,n):void 0===e)?1:sr(Wn(e),0);var r=null==t?0:t.length;if(!r||e<1)return[];for(var o=0,i=0,u=Array(fr(r/e));o<r;)u[i++]=cr(t,o,o+=e);return u}($r(n),e),u=ur(),c=i.length;gr(i,(function(e,n){e=pr(e,"");let i=`${u}|${n}|${c}|${e}`;t.send(i,(function(t){t&&A(o)&&o(t)})),A(r)&&r((n+1)/c*100)}))}var Rr=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");function Vr(t){return Rr.test(t)}var Hr=jt&&jt.isRegExp,qr=Hr?vt(Hr):function(t){return Y(t)&&"[object RegExp]"==b(t)};var Gr="\\ud800-\\udfff",Jr="["+Gr+"]",Kr="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",Xr="\\ud83c[\\udffb-\\udfff]",Yr="[^"+Gr+"]",Zr="(?:\\ud83c[\\udde6-\\uddff]){2}",to="[\\ud800-\\udbff][\\udc00-\\udfff]",eo="(?:"+Kr+"|"+Xr+")"+"?",no="[\\ufe0e\\ufe0f]?",ro=no+eo+("(?:\\u200d(?:"+[Yr,Zr,to].join("|")+")"+no+eo+")*"),oo="(?:"+[Yr+Kr+"?",Kr,Zr,to,Jr].join("|")+")",io=RegExp(Xr+"(?="+Xr+")|"+oo+ro,"g");function uo(t){return Vr(t)?function(t){return t.match(io)||[]}(t):function(t){return t.split("")}(t)}var co=4294967295;function ao(t,e,n){return n&&"number"!=typeof n&&ar(t,e,n)&&(e=n=void 0),(n=void 0===n?co:n>>>0)?(t=wn(t))&&("string"==typeof e||null!=e&&!qr(e))&&!(e=jn(e))&&Vr(t)?(r=uo(t),o=0,i=n,u=r.length,i=void 0===i?u:i,!o&&i>=u?r:cr(r,o,i)):t.split(e,n):[];var r,o,i,u}var fo=Math.ceil,so=Math.max;var lo=function(t){return function(e,n,r){return r&&"number"!=typeof r&&ar(e,n,r)&&(n=r=void 0),e=$n(e),void 0===n?(n=e,e=0):n=$n(n),function(t,e,n,r){for(var o=-1,i=so(fo((e-t)/(n||1)),0),u=Array(i);i--;)u[r?i:++o]=t,t+=n;return u}(e,n,r=void 0===r?e<n?1:-1:$n(r),t)}}(),po=lo;function yo(t,e){return n=t,"[object Object]"===Object.prototype.toString.call(n)&&(!(!Vn(e)&&!Hn(e))&&e in t);var n}let ho={};function vo(t,e){let n=ao(t,"|"),r=n[0],o=Dn(n[1]),i=Dn(n[2]),u=pr((a=3,(s=null==(c=n)?0:c.length)?cr(c,(a=f||void 0===a?1:Wn(a))<0?0:a,s):[]),"|");var c,a,f,s;if(yo(ho,r)||(ho[r]={}),ho[r]["_"+o]=u,o===i-1){let t="";gr(po(i),(function(e){t+=ho[r]["_"+e]})),delete ho[r];let n=function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Uint8Array";if(Rn(e))e=[e];else if(!Nr(e))return{};let n={};try{n=JSON.parse(t,(function(t,n){return e.indexOf("Uint8Array")>=0&&(n=Qr.b642u8arr(n)),e.indexOf("Uint16Array")>=0&&(n=Qr.b642u16arr(n)),n}))}catch(t){n={}}return n}(t);e(n)}}function bo(t){let e=!1,n=null,r=new In,o=new In;function i(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];setTimeout((()=>{r.emit(t,...n)}),1)}function u(){t.url||(t.url="ws://localhost:8080"),t.token||(t.token="*"),t.strSplitLength||(t.strSplitLength=1e6);let u={url:t.url,token:t.token,open:function(){i("open"),e||(i("openOnce"),e=!0)},close:function(){i("close"),c()},message:function(t){!function(t){vo(t,f)}(t)},error:function(t){a(t)}};try{n=new rr(u)}catch(t){return i("error",{msg:"can not create websocket",err:t}),void c()}if(On(n,"error"))return i("error",{msg:"can not create websocket",err:"can not new MixWS in WWebsocketClient"}),void c();function a(t){i("error",{msg:"websocket error",err:t}),n.close()}function f(t){let e=On(t,"_mode","");if("execute"===e)if(On(t,"_id")&&On(t,"output")){let e=On(t,"_id"),n=On(t,"output");o.emit(e,n)}else i("error",{msg:"can not find _id and output in data",err:t});else"broadcast"===e?i("broadcast",On(t,"data")):"deliver"===e?i("deliver",On(t,"data")):a({msg:"can not find _mode in data",err:t})}function s(e,r){n.readyState===n.OPEN&&Wr(n,t.strSplitLength,e,r,(function(t){i("error",{msg:"can not send message",err:t})}))}r.removeAllListeners("triggerExecute"),r.on("triggerExecute",(function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0,i=ur();s({_mode:"execute",_id:i,func:t,input:e},r),o.on(i,(function(t){n(t),o.removeAllListeners(i)}))})),r.removeAllListeners("triggerBroadcast"),r.on("triggerBroadcast",(function(t,e){s({_mode:"broadcast",data:t},e)})),r.removeAllListeners("triggerDeliver"),r.on("triggerDeliver",(function(t,e){s({_mode:"deliver",data:t},e)}))}function c(){setTimeout((function(){i("reconn"),u()}),1e3)}return r.execute=function(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=function(){let t,e,n=new Promise((function(){t=arguments[0],e=arguments[1]}));return n.resolve=t,n.reject=e,n}();return i("triggerExecute",t,e,(function(t){r.resolve(t)}),n),r},r.broadcast=function(t){i("triggerBroadcast",t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){})},r.deliver=function(t){i("triggerDeliver",t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){})},u(),r}return function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t=tn(t,en|nn),t.url||(t.url="ws://localhost:8080"),t.token||(t.token="*"),t.takeNumLimit||(t.takeNumLimit=0);let e=new bo(t),n=tr(t.takeNumLimit);return n.on("message",(function(t){let r=n.get();r&&e.emit("queueChange",On(r,"topic",null),On(r,"id",null),On(r,"input",null),On(r,"output",null),On(r,"state",null),(function(){n.cb()}))})),e.on("deliver",(function(t){On(t,"topic",null)&&n.push(t)})),e.pushQueue=function(t,n){let r={topic:t,input:n,option:arguments.length>2&&void 0!==arguments[2]?arguments[2]:{}};return e.execute("pushQueue",r)},e.modifyQueue=function(t,n,r,o,i){let u={topic:t,id:n,input:r,output:o,state:i};return e.execute("modifyQueue",u)},e.subTopic=function(t){let n={topic:t};return e.execute("subTopic",n)},e.unsubTopic=function(t){let n={topic:t};return e.execute("unsubTopic",n)},e.getQueueByTopic=function(t){let n={topic:t};return e.execute("getQueueByTopic",n)},e.getQueueByID=function(t){let n={id:t};return e.execute("getQueueByID",n)},e.getQueueByIDs=function(t){let n={ids:t};return e.execute("getQueueByIDs",n)},e.getQueueByMatches=function(t){let n={find:t};return e.execute("getQueueByMatches",n)},e.delQueueByTopic=function(t){let n={topic:t};return e.execute("delQueueByTopic",n)},e.delQueueByID=function(t){let n={id:t};return e.execute("delQueueByID",n)},e.delQueueByIDs=function(t){let n={ids:t};return e.execute("delQueueByIDs",n)},e.delQueueByMatches=function(t){let n={find:t};return e.execute("delQueueByMatches",n)},e}}));
//# sourceMappingURL=w-runqws-client.umd.js.map
