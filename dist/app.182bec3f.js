(function(t){function a(a){for(var i,c,n=a[0],l=a[1],o=a[2],d=0,u=[];d<n.length;d++)c=n[d],e[c]&&u.push(e[c][0]),e[c]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);_&&_(a);while(u.length)u.shift()();return r.push.apply(r,o||[]),s()}function s(){for(var t,a=0;a<r.length;a++){for(var s=r[a],i=!0,n=1;n<s.length;n++){var l=s[n];0!==e[l]&&(i=!1)}i&&(r.splice(a--,1),t=c(c.s=s[0]))}return t}var i={},e={1:0},r=[];function c(a){if(i[a])return i[a].exports;var s=i[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.m=t,c.c=i,c.d=function(t,a,s){c.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:s})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,a){if(1&a&&(t=c(t)),8&a)return t;if(4&a&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var i in t)c.d(s,i,function(a){return t[a]}.bind(null,i));return s},c.n=function(t){var a=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(a,"a",a),a},c.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},c.p="";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],l=n.push.bind(n);n.push=a,n=n.slice();for(var o=0;o<n.length;o++)a(n[o]);var _=l;r.push([3,0]),s()})({3:function(t,a,s){t.exports=s("Vtdi")},QHM0:function(t,a,s){"use strict";var i=s("Uz51"),e=s.n(i);e.a},Uz51:function(t,a,s){},Vtdi:function(t,a,s){"use strict";s.r(a);s("yt8O"),s("RW0V"),s("rGqo"),s("VRzm"),s("wcMv");var i=s("Kw5r"),e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{attrs:{id:"app"}},[s("navbar"),t._m(0)],1)},r=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"container body"},[s("div",{staticClass:"body__add-task mb-l"},[s("i",{staticClass:"fas fa-plus icon"}),s("input",{staticClass:"input",attrs:{type:"text",placeholder:"Add Task"}})]),s("ul",{staticClass:"body__tasks mb-s"},[s("li",{staticClass:"card card--spacial"},[s("div",{staticClass:"card__checkbox"},[s("div",{staticClass:"checkbox",attrs:{role:"checkbox"}},[s("input",{attrs:{type:"checkbox",id:"task-1"}}),s("label",{attrs:{for:"task-1"}})])]),s("div",{staticClass:"card__content"},[s("h3",{staticClass:"card__title"},[t._v("Type Something Here…")]),s("ul",{staticClass:"card__prompt"},[s("li",{staticClass:"card__prompt__item card__prompt__item--date"},[s("i",{staticClass:"far fa-calendar-alt icon"}),t._v("\n              5/14\n            ")]),s("li",{staticClass:"card__prompt__item"},[s("i",{staticClass:"far fa-file icon"})]),s("li",{staticClass:"card__prompt__item"},[s("i",{staticClass:"far fa-comment-dots icon"})])])]),s("div",{staticClass:"card__end"},[s("button",{staticClass:"card__favorite mr-l is-active"},[s("i",{staticClass:"fas fa-star icon"})]),s("button",{staticClass:"card__edit"},[s("i",{staticClass:"far fa-edit icon"})])])]),s("li",{staticClass:"card"},[s("div",{staticClass:"card__checkbox"},[s("div",{staticClass:"checkbox",attrs:{role:"checkbox"}},[s("input",{attrs:{type:"checkbox",id:"task-2"}}),s("label",{attrs:{for:"task-2"}})])]),s("div",{staticClass:"card__content"},[s("h3",{staticClass:"card__title"},[t._v("Type Something Here…")]),s("ul",{staticClass:"card__prompt"},[s("li",{staticClass:"card__prompt__item card__prompt__item--date"},[s("i",{staticClass:"far fa-calendar-alt icon"}),t._v("\n              2019/06/18\n            ")])])]),s("div",{staticClass:"card__end"},[s("div",{staticClass:"card__favorite mr-l"},[s("i",{staticClass:"far fa-star icon"})]),s("div",{staticClass:"card__edit is-active"},[s("i",{staticClass:"fas fa-edit icon"})])])]),s("li",{staticClass:"card"},[s("div",{staticClass:"card__checkbox"},[s("div",{staticClass:"checkbox",attrs:{role:"checkbox"}},[s("input",{attrs:{type:"checkbox",id:"task-3",checked:""}}),s("label",{attrs:{for:"task-3"}})])]),s("div",{staticClass:"card__content card__content--completed"},[s("h3",{staticClass:"card__title"},[t._v("Type Something Here…")]),s("ul",{staticClass:"card__prompt"},[s("i",{staticClass:"far fa-file icon"})])]),s("div",{staticClass:"card__end"},[s("div",{staticClass:"card__favorite mr-l"},[s("i",{staticClass:"far fa-star icon"})]),s("div",{staticClass:"card__edit"},[s("i",{staticClass:"far fa-edit icon"})])])])]),s("div",{staticClass:"body__status"},[t._v("3 tasks left")])])}],c={name:"App"},n=c,l=(s("nNx0"),s("KHd+")),o=Object(l["a"])(n,e,r,!1,null,null,null),_=o.exports,d=s("L2JU");i["a"].use(d["a"]);var u=new d["a"].Store({state:{},mutations:{},actions:{}}),f=function(){var t=this,a=t.$createElement;t._self._c;return t._m(0)},p=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("header",{staticClass:"navbar"},[s("div",{staticClass:"container navbar__container"},[s("ul",{staticClass:"navbar__tabs"},[s("li",{staticClass:"navbar__tabs__item is-active"},[t._v("My Tasks")]),s("li",{staticClass:"navbar__tabs__item"},[t._v("In Progress")]),s("li",{staticClass:"navbar__tabs__item"},[t._v("Completed")])])])])}],v={name:"Navbar"},C=v,b=(s("QHM0"),Object(l["a"])(C,f,p,!1,null,null,null)),m=b.exports,h={Navbar:m};Object.keys(h).forEach(function(t){i["a"].component(t,h[t])}),new i["a"]({store:u,render:function(t){return t(_)}}).$mount("#app")},nNx0:function(t,a,s){"use strict";var i=s("uWEC"),e=s.n(i);e.a},uWEC:function(t,a,s){},wcMv:function(t,a,s){}});
//# sourceMappingURL=app.182bec3f.js.map