(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"1Xqh":function(e,t,r){"use strict";var n=r("q1tI"),a=r.n(n),u=r("Y/nG"),c=r("kDLi");function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,u=void 0;try{for(var c,o=e[Symbol.iterator]();!(n=(c=o.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){a=!0,u=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw u}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}t.a=function(e){var t=e.users,r=e.onRoleChange,i=e.onRemoveUser,l=o(Object(n.useState)(!1),2),s=l[0],m=l[1];return a.a.createElement("table",{className:"filter-table form-inline"},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null),a.a.createElement("th",null,"Login"),a.a.createElement("th",null,"Email"),a.a.createElement("th",null,"Name"),a.a.createElement("th",null,"Seen"),a.a.createElement("th",null,"Role"),a.a.createElement("th",{style:{width:"34px"}}))),a.a.createElement("tbody",null,t.map((function(e,t){return a.a.createElement("tr",{key:"".concat(e.userId,"-").concat(t)},a.a.createElement("td",{className:"width-2 text-center"},a.a.createElement("img",{className:"filter-table__avatar",src:e.avatarUrl})),a.a.createElement("td",{className:"max-width-6"},a.a.createElement("span",{className:"ellipsis",title:e.login},e.login)),a.a.createElement("td",{className:"max-width-5"},a.a.createElement("span",{className:"ellipsis",title:e.email},e.email)),a.a.createElement("td",{className:"max-width-5"},a.a.createElement("span",{className:"ellipsis",title:e.name},e.name)),a.a.createElement("td",{className:"width-1"},e.lastSeenAtAge),a.a.createElement("td",{className:"width-8"},a.a.createElement(u.a,{value:e.role,onChange:function(t){return r(t,e)}})),a.a.createElement("td",null,a.a.createElement(c.Button,{size:"sm",variant:"destructive",onClick:function(){return m(e.login)},icon:"times"}),a.a.createElement(c.ConfirmModal,{body:"Are you sure you want to delete user ".concat(e.login,"?"),confirmText:"Delete",title:"Delete",onDismiss:function(){return m(!1)},isOpen:e.login===s,onConfirm:function(){i(e)}})))}))))}},vWlM:function(e,t,r){"use strict";r.r(t),r.d(t,"AdminEditOrgPage",(function(){return x}));var n=r("q1tI"),a=r.n(n),u=r("ZGyg"),c=r("/MKj"),o=r("lzJ5"),i=r("1Xqh"),l=r("Kwub"),s=r("t8hP"),m=r("kDLi"),f=r("kDDq");function p(){var e=function(e,t){t||(t=e.slice(0));return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}(["\n              margin-top: 20px;\n            "]);return p=function(){return e},e}function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function g(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var r=[],n=!0,a=!1,u=void 0;try{for(var c,o=e[Symbol.iterator]();!(n=(c=o.next()).done)&&(r.push(c.value),!t||r.length!==t);n=!0);}catch(e){a=!0,u=e}finally{try{n||null==o.return||o.return()}finally{if(a)throw u}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function h(e,t,r,n,a,u,c){try{var o=e[u](c),i=o.value}catch(e){return void r(e)}o.done?t(i):Promise.resolve(i).then(n,a)}function y(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var u=e.apply(t,r);function c(e){h(u,n,a,c,o,"next",e)}function o(e){h(u,n,a,c,o,"throw",e)}c(void 0)}))}}var E=function(){var e=y(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.getBackendSrv)().get("/api/orgs/"+t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),w=function(){var e=y(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.getBackendSrv)().get("/api/orgs/"+t+"/users");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=y(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.getBackendSrv)().patch("/api/orgs/"+r+"/users/"+t.userId,t);case 2:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),j=function(){var e=y(regeneratorRuntime.mark((function e(t,r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.getBackendSrv)().delete("/api/orgs/"+r+"/users/"+t.userId);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),x=function(){var e=Object(c.useSelector)((function(e){return e.navIndex})),t=Object(o.a)(e,"global-orgs"),r=Object(c.useSelector)((function(e){return e.location.routeParams.id})),d=v(Object(n.useState)([]),2),b=d[0],h=d[1],x=v(Object(l.a)((function(){return E(r)}),[]),2),S=x[0],k=x[1],N=v(Object(l.a)((function(){return w(r)}),[]),2)[1];Object(n.useEffect)((function(){k(),N().then((function(e){return h(e)}))}),[]);var R=function(){var e=y(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.getBackendSrv)().put("/api/orgs/"+r,g({},S.value,{name:t}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return a.a.createElement(u.a,{navModel:t},a.a.createElement(u.a.Contents,null,a.a.createElement(a.a.Fragment,null,a.a.createElement(m.Legend,null,"Edit Organization"),S.value&&a.a.createElement(m.Form,{defaultValues:{orgName:S.value.name},onSubmit:function(){var e=y(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(t.orgName);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},(function(e){var t=e.register,r=e.errors;return a.a.createElement(a.a.Fragment,null,a.a.createElement(m.Field,{label:"Name",invalid:!!r.orgName,error:"Name is required"},a.a.createElement(m.Input,{name:"orgName",ref:t({required:!0})})),a.a.createElement(m.Button,null,"Update"))})),a.a.createElement("div",{className:Object(f.css)(p())},a.a.createElement(m.Legend,null,"Organization Users"),!!b.length&&a.a.createElement(i.a,{users:b,onRoleChange:function(e,t){O(g({},t,{role:e}),r),h(b.map((function(r){return t.userId===r.userId?g({},t,{role:e}):r}))),N()},onRemoveUser:function(e){j(e,r),h(b.filter((function(t){return e.userId!==t.userId}))),N()}})))))};t.default=x}}]);
//# sourceMappingURL=AdminEditOrgPage.8aa1bea5238f34f995d5.js.map