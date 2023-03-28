(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{gcd9:function(e,t,n){"use strict";n.r(t);var r,a=n("Obii");!function(e){e.RandomWalk="randomWalk",e.LiveMeasurements="measurements"}(r||(r={}));var o,i={refId:"A",queryType:r.RandomWalk};!function(e){e.Dashboard="dashboard",e.Tags="tags"}(o||(o={}));var u=n("t8hP"),l=n("F/XL"),s=n("67Y/"),c=n("9Z1F");function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var h=100,b=function(e){function t(e){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),m(this,y(t).call(this,e))}var n,i,s;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,e),n=t,(i=[{key:"query",value:function(e){var t=[],n=!0,o=!1,i=void 0;try{for(var s,c=e.targets[Symbol.iterator]();!(n=(s=c.next()).done);n=!0){var f=s.value;if(!f.hide)if(f.queryType===r.LiveMeasurements){var p=f.channel,m=f.measurements;p&&t.push(Object(u.getLiveMeasurementsObserver)({scope:a.LiveChannelScope.Grafana,namespace:"measurements",path:p},"".concat(e.requestId,".").concat(h++),m))}else t.push(d(e))}}catch(e){o=!0,i=e}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return 1===t.length?t[0]:t.length>1?t[0]:Object(l.a)()}},{key:"metricFindQuery",value:function(e){return Promise.resolve([])}},{key:"annotationQuery",value:function(e){var t,n=Object(u.getTemplateSrv)(),r=e.annotation,a={from:e.range.from.valueOf(),to:e.range.to.valueOf(),limit:r.limit,tags:r.tags,matchAny:r.matchAny};if(r.type===o.Dashboard){if(!e.dashboard.id)return Promise.resolve([]);a.dashboardId=e.dashboard.id,delete a.tags}else{var i=function(){if(!Array.isArray(r.tags)||0===r.tags.length)return{v:Promise.resolve([])};var e=[],t=!0,o=!1,i=void 0;try{for(var u,l=a.tags[Symbol.iterator]();!(t=(u=l.next()).done);t=!0){var s=u.value,c=n.replace(s,{},(function(e){return"string"==typeof e?e:e.join("__delimiter__")})),f=!0,p=!1,m=void 0;try{for(var y,v=c.split("__delimiter__")[Symbol.iterator]();!(f=(y=v.next()).done);f=!0){var h=y.value;e.push(h)}}catch(e){p=!0,m=e}finally{try{f||null==v.return||v.return()}finally{if(p)throw m}}}}catch(e){o=!0,i=e}finally{try{t||null==l.return||l.return()}finally{if(o)throw i}}a.tags=e}();if("object"===f(i))return i.v}return Object(u.getBackendSrv)().get("/api/annotations",a,"grafana-data-source-annotations-".concat(r.name,"-").concat(null===(t=e.dashboard)||void 0===t?void 0:t.id))}},{key:"testDatasource",value:function(){return Promise.resolve()}}])&&p(n.prototype,i),s&&p(n,s),t}(a.DataSourceApi);function d(e){var t=e.intervalMs,n=e.maxDataPoints,r=e.range,a=e.requestId,o={intervalMs:t,maxDataPoints:n,from:r.from.valueOf(),to:r.to.valueOf()};return Object(u.getBackendSrv)().fetch({url:"/api/tsdb/testdata/random-walk",method:"GET",params:o,requestId:a}).pipe(Object(s.a)((function(e){return Object(u.toDataQueryResponse)(e)})),Object(c.a)((function(e){return Object(l.a)(Object(u.toDataQueryResponse)(e))})))}var g=n("la6v"),O=n.n(g),w=n("q1tI"),j=n.n(w),S=n("kDLi");function C(e){return(C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){T(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function q(e,t){return!t||"object"!==C(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function M(e,t){return(M=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var F=function(e){function t(){var e,n;_(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=q(this,(e=D(t)).call.apply(e,[this].concat(o)))).queryTypes=[{label:"Random Walk",value:r.RandomWalk,description:"Random signal within the selected time rage"},{label:"Live Measurements",value:r.LiveMeasurements,description:"Stream real-time measurements from Grafana"}],n.onQueryTypeChange=function(e){var t=n.props,r=t.onChange,a=t.query,o=t.onRunQuery;r(E({},a,{queryType:e.value})),o()},n.onChannelChange=function(e){var t=n.props,r=t.onChange,a=t.query,o=t.onRunQuery;r(E({},a,{channel:null==e?void 0:e.value})),o()},n.onMeasurementNameChanged=function(e){var t=n.props,r=t.onChange,a=t.query,o=t.onRunQuery;r(E({},a,{measurements:E({},a.measurements,{name:null==e?void 0:e.value})})),o()},n}var n,o,l;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&M(e,t)}(t,e),n=t,(o=[{key:"renderMeasurementsQuery",value:function(){var e=this.props.query,t=e.channel,n=e.measurements,r=[],o=r.find((function(e){return e.value===t}));t&&!o&&(o={value:t,label:t,description:"Connected to ".concat(t)},r.push(o)),n||(n={});var i=[{value:"",label:"All measurements",description:"Show every measurement streamed to this channel"}],l=void 0;if(t){var s=!1;if(l=Object(u.getLiveMeasurements)({scope:a.LiveChannelScope.Grafana,namespace:"measurements",path:t})){var c=!0,f=!1,p=void 0;try{for(var m,y=l.getDistinctNames()[Symbol.iterator]();!(c=(m=y.next()).done);c=!0){var v=m.value;i.push({value:v,label:v}),v===n.name&&(s=!0)}}catch(e){f=!0,p=e}finally{try{c||null==y.return||y.return()}finally{if(f)throw p}}}else console.log("NO INFO for",t);n.name&&!s&&i.push({label:n.name,value:n.name,description:"Frames with name ".concat(n.name)})}return j.a.createElement(j.a.Fragment,null,j.a.createElement("div",{className:"gf-form"},j.a.createElement(S.InlineField,{label:"Channel",grow:!0,labelWidth:12},j.a.createElement(S.Select,{options:r,value:o||"",onChange:this.onChannelChange,allowCustomValue:!0,backspaceRemovesValue:!0,placeholder:"Select measurements channel",isClearable:!0,noOptionsMessage:"Enter channel name",formatCreateLabel:function(e){return"Connect to: ".concat(e)}}))),t&&j.a.createElement("div",{className:"gf-form"},j.a.createElement(S.InlineField,{label:"Measurement",grow:!0,labelWidth:12},j.a.createElement(S.Select,{options:i,value:i.find((function(e){var t;return e.value===(null===(t=n)||void 0===t?void 0:t.name)}))||i[0],onChange:this.onMeasurementNameChanged,allowCustomValue:!0,backspaceRemovesValue:!0,placeholder:"Filter by name",isClearable:!0,noOptionsMessage:"Filter by name",formatCreateLabel:function(e){return"Show: ".concat(e)},isSearchable:!0}))),j.a.createElement(S.FeatureInfoBox,{title:"Grafana Live - Measurements",featureState:a.FeatureState.alpha},j.a.createElement("p",null,"This supports real-time event streams in Grafana core. This feature is under heavy development. Expect the interfaces and structures to change as this becomes more production ready.")))}},{key:"render",value:function(){var e=O()(this.props.query,i);return j.a.createElement(j.a.Fragment,null,j.a.createElement("div",{className:"gf-form"},j.a.createElement(S.InlineField,{label:"Query type",grow:!0,labelWidth:12},j.a.createElement(S.Select,{options:this.queryTypes,value:this.queryTypes.find((function(t){return t.value===e.queryType}))||this.queryTypes[0],onChange:this.onQueryTypeChange}))),e.queryType===r.LiveMeasurements&&this.renderMeasurementsQuery())}}])&&k(n.prototype,o),l&&k(n,l),t}(w.PureComponent);var L=[{text:"Dashboard",value:o.Dashboard},{text:"Tags",value:o.Tags}],Q=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.types=L,this.annotation.type=this.annotation.type||o.Tags,this.annotation.limit=this.annotation.limit||100};Q.templateUrl="partials/annotations.editor.html",n.d(t,"plugin",(function(){return R}));var R=new a.DataSourcePlugin(b).setQueryEditor(F).setAnnotationQueryCtrl(Q)}}]);
//# sourceMappingURL=grafanaPlugin.8aa1bea5238f34f995d5.js.map