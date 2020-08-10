(this.webpackJsonpproject=this.webpackJsonpproject||[]).push([[0],[,,,,,function(e,t,a){e.exports=a(12)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(4),o=a.n(r),l=(a(10),a(1));a(11);function s(){return c.a.createElement("div",{className:"header"},c.a.createElement("h2",null,"Welcome"))}function i(e){var t=e.onExplore;return c.a.createElement("div",{className:"body"},c.a.createElement("h1",{onClick:t},"Explore Parks in Seattle"))}function m(e){var t=e.onLogin,a=Object(n.useState)(""),r=Object(l.a)(a,2),o=r[0],s=r[1],i=Object(n.useState)(!1),m=Object(l.a)(i,2),u=m[0],d=m[1],p=Object(n.useState)(""),E=Object(l.a)(p,2),f=E[0],h=E[1];return c.a.createElement("div",{className:"footer"},c.a.createElement("p",{className:"error"},o),u?c.a.createElement("span",null,"Loading..."):c.a.createElement("div",{className:"login-form"},c.a.createElement("h3",null,"Sign in to explore"),c.a.createElement("input",{className:"login-input",placeholder:"Username",onChange:function(e){return h(e.target.value)}}),c.a.createElement("input",{className:"login-input",placeholder:"Password"}),c.a.createElement("button",{className:"login-input",onClick:function(){f?(s(""),d(!0),function(e){return fetch("/login",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({username:e})}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}(f).then((function(){return t(f)})).catch((function(e){s("Login failed, please try again."),d(!1)}))):s("Please input username.")}},"Get started")))}function u(e){var t=e.onLogout;return c.a.createElement("div",{className:"logout"},c.a.createElement("span",{onClick:function(){fetch("/logout",{method:"POST"}).then((function(e){e.ok})).then((function(){return t()}))}},"Logout"))}var d=a(2);function p(e){var t=e.clickedParkId,a=Object(n.useState)(""),r=Object(l.a)(a,2),o=r[0],s=r[1];return Object(n.useEffect)((function(){s("/photo/"+t)}),[]),c.a.createElement("div",null,c.a.createElement("img",{width:"500",height:"300",src:o}))}function E(e){var t=e.backToParksList,a=e.clickedParkId,r=e.user,o=Object(n.useState)({}),s=Object(l.a)(o,2),i=s[0],m=s[1],u=Object(n.useState)({}),E=Object(l.a)(u,2),f=E[0],h=E[1],k=Object(n.useState)(""),v=Object(l.a)(k,2),j=v[0],b=v[1],N=Object(n.useState)(""),g=Object(l.a)(N,2),O=g[0],w=g[1];Object(n.useEffect)((function(){var e;(e=a,fetch("/parks/".concat(e),{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():Promise.reject({code:"error"})}))).then((function(e){m(e),h(e.comments)}))}),[]);var P=Object.values(f).slice().reverse().map((function(e){return c.a.createElement("li",{className:"review-list",key:e.commentId},c.a.createElement("span",{className:"review-text"},e.text),c.a.createElement("br",null),c.a.createElement("span",{className:"reviewer"},e.reviewer),c.a.createElement("span",{className:"review-time"},e.timestamp))}));return c.a.createElement("div",null,r.isLoggedIn?c.a.createElement("div",null,c.a.createElement("div",{className:"details-panel"},c.a.createElement("div",{className:"detail-back"},c.a.createElement("span",{onClick:t},"Back")),c.a.createElement("h2",null,i.parkName),c.a.createElement("div",{className:"park-info"},c.a.createElement("div",{className:"photo"},c.a.createElement(p,{clickedParkId:a})),c.a.createElement("div",{className:"park-words"},c.a.createElement("p",{className:"park-introduction"},i.introduction),c.a.createElement("label",{className:"location-title"},"Location: "),c.a.createElement("span",{className:"park-location"},i.location)))),c.a.createElement("div",{className:"review-title"},c.a.createElement("span",null,"Reviews")),c.a.createElement("div",{className:"reviews"},P),c.a.createElement("div",null,c.a.createElement("div",{className:"review-panel"},c.a.createElement("textarea",{className:"input-review",value:j,placeholder:"Share your experience to help others.",onChange:function(e){return b(e.target.value)}}),c.a.createElement("span",null,O),c.a.createElement("br",null),c.a.createElement("button",{onClick:function(){var e,t;(e=j,t=a,fetch("/comment/".concat(t),{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({text:e})}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(e){var t=Object(d.a)({},f);t[e.commentId]=e,h(t),b("")})).catch((function(e){w("Can't send empty comment.")}))}},"Comment")))):c.a.createElement("div",null,c.a.createElement("div",{className:"details-panel"},c.a.createElement("div",{className:"detail-back"},c.a.createElement("span",{onClick:t},"Back")),c.a.createElement("h2",null,i.parkName),c.a.createElement("div",{className:"park-info"},c.a.createElement("div",{className:"photo"},c.a.createElement(p,{clickedParkId:a})),c.a.createElement("div",{className:"park-words"},c.a.createElement("p",{className:"park-introduction"},i.introduction),c.a.createElement("label",{className:"location-title"},"Location: "),c.a.createElement("span",{className:"park-location"},i.location)))),c.a.createElement("div",{className:"review-title"},c.a.createElement("span",null,"Reviews")),c.a.createElement("div",{className:"reviews"},P)))}function f(e){var t=e.changeParksList,a=e.offCreate,r=Object(n.useState)(""),o=Object(l.a)(r,2),s=o[0],i=o[1],m=Object(n.useState)(""),u=Object(l.a)(m,2),d=u[0],p=u[1],E=Object(n.useState)(""),f=Object(l.a)(E,2),h=f[0],k=f[1],v=Object(n.useState)(""),j=Object(l.a)(v,2),b=j[0],N=j[1],g=Object(n.useState)(""),O=Object(l.a)(g,2),w=O[0],P=O[1];return c.a.createElement("div",{className:"create-page"},c.a.createElement("input",{className:"input-name",value:s,placeholder:"Input park name.",onChange:function(e){return i(e.target.value)}}),c.a.createElement("br",null),c.a.createElement("textarea",{className:"input-park",value:d,placeholder:"Input detailed information to introduce this park.",onChange:function(e){return p(e.target.value)}}),c.a.createElement("br",null),c.a.createElement("textarea",{className:"input-park",value:h,placeholder:"Input the park location",onChange:function(e){return k(e.target.value)}}),c.a.createElement("br",null),c.a.createElement("input",{className:"input-file",type:"file",name:"name",onChange:function(e){return P(e.target.files[0])}}),c.a.createElement("span",{className:"create-action",onClick:function(){s&&d&&h&&w?function(e,t,a){return fetch("/park",{method:"POST",headers:new Headers({"content-type":"application/json"}),body:JSON.stringify({parkName:e,introduction:t,location:a})}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}(s,d,h).then((function(e){(function(e,t){var a=new FormData;return a.append("file",t),fetch("/photo/".concat(e),{method:"POST",body:a}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})(e.parkId,w).then((function(){t(e),a()})).catch((function(){N("Failed to upload park photo.")}))})).catch((function(e){N("Failed to create park.")})):N("All fields are required, including park photo.")}},"Post now"),c.a.createElement("span",{className:"create-action",onClick:a},"Back"),c.a.createElement("p",null,b))}function h(e){var t=e.onBack,a=e.user,r=Object(n.useState)({}),o=Object(l.a)(r,2),s=o[0],i=o[1],m=Object(n.useState)(!1),u=Object(l.a)(m,2),p=u[0],h=u[1],k=Object(n.useState)(""),v=Object(l.a)(k,2),j=v[0],b=v[1],N=Object(n.useState)(!1),g=Object(l.a)(N,2),O=g[0],w=g[1];Object(n.useEffect)((function(){fetch("/parks",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){i(e)}))}),[]);var P=Object.values(s).map((function(e){return c.a.createElement("li",{className:"parks-list",key:e.parkId},c.a.createElement("span",{className:"park-name",onClick:function(){return t=e.parkId,h(!0),void b(t);var t}},e.parkName),c.a.createElement("br",null),c.a.createElement("span",{className:"poster"}," Post by ",e.author),c.a.createElement("span",{className:"post-time"}," ",e.timestamp))})),S=function(e){var t=Object(d.a)({},s);t[e.parkId]=e,i(t)};return c.a.createElement("div",{className:"list-page"},a.isLoggedIn&&O?c.a.createElement(f,{offCreate:function(){w(!1)},changeParksList:S}):p?c.a.createElement(E,{backToParksList:function(){h(!1)},clickedParkId:j,showDetails:p,user:a,changeParksList:S}):a.isLoggedIn?c.a.createElement("div",{className:"parks-panel"},c.a.createElement("div",{className:"home-button"},c.a.createElement("span",{onClick:t},"Home")),c.a.createElement("div",{className:"create-button"},c.a.createElement("span",{onClick:function(){w(!0)}},"Create")),c.a.createElement("div",{className:"list-head"},c.a.createElement("h1",null,"Parks")),c.a.createElement("div",{className:"list-panel"},P)):c.a.createElement("div",{className:"parks-panel"},c.a.createElement("div",{className:"home-button"},c.a.createElement("span",{onClick:t},"Home")),c.a.createElement("div",{className:"list-head"},c.a.createElement("h1",null,"Parks")),c.a.createElement("div",{className:"list-panel"},P)))}function k(){return c.a.createElement("div",{className:"welcome"},c.a.createElement("span",null,"Start your journey!"))}var v=function(){var e=Object(n.useState)({isLoggedIn:!1,username:""}),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(!1),d=Object(l.a)(o,2),p=d[0],E=d[1];Object(n.useEffect)((function(){fetch("/session",{method:"GET"}).catch((function(){return Promise.reject({code:"network-error"})})).then((function(e){return e.ok?e.json():Promise.reject({code:"login-invalid"})})).then((function(e){r({isLoggedIn:!0,username:e.username})}))}),[]);var f=function(){E(!0)};return c.a.createElement("div",{className:"App"},p?c.a.createElement(h,{onBack:function(){E(!1)},user:a}):a.isLoggedIn?c.a.createElement("div",{className:"home-page"},c.a.createElement(s,null),c.a.createElement(i,{onExplore:f}),c.a.createElement(u,{onLogout:function(){r({isLoggedIn:!1,username:""})}}),c.a.createElement(k,null)):c.a.createElement("div",{className:"home-page"},c.a.createElement(s,null),c.a.createElement(i,{onExplore:f}),c.a.createElement(m,{user:a,onLogin:function(e){r({isLoggedIn:!0,username:e})}})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.9695df17.chunk.js.map