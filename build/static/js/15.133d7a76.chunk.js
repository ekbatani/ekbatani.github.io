(this["webpackJsonpamir-ekbatani"]=this["webpackJsonpamir-ekbatani"]||[]).push([[15],{171:function(t,e,i){"use strict";i.r(e);var n=i(0),a=i(1),r=i(4),s=i(18),c=function(t){var e=t.label,i=t.link,a=t.value,r=t.format;return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{width:"70%",children:e}),Object(n.jsx)("td",{children:i?Object(n.jsx)("a",{href:i,children:r(a)}):r(a)})]})};c.defaultProps={format:function(t){return t},link:null,value:null};var u=c,b=function(t){var e=t.data;return Object(n.jsx)("table",{children:Object(n.jsx)("tbody",{children:e.map((function(t){return Object(n.jsx)(u,{format:t.format,label:t.label,link:t.link,value:t.value},t.label)}))})})},l=i(19),o=function(){var t=Object(a.useState)(),e=Object(l.a)(t,2),i=e[0],r=e[1];return Object(a.useEffect)((function(){var t=setInterval((function(){return function(){var t=new Date("1986-08-22T01:24:00");r(((Date.now()-t)/31556925190.079998).toFixed(11))}()}),25);return function(){clearInterval(t)}}),[]),Object(n.jsx)(n.Fragment,{children:i})},j=[{key:"age",label:"Current age",value:Object(n.jsx)(o,{})},{key:"location",label:"Current city",value:"Tehran, Iran"}],h=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("h3",{children:"Some stats about me"}),Object(n.jsx)(b,{data:j})]})},k=i(158),d=i.n(k),f=i(53),O=i(160),m=i(57),p=i.n(m),x=[{label:"Stars this repository has on github",key:"stargazers_count",link:"https://github.com/intereki/intereki.github.io/stargazers"},{label:"Number of people watching this repository",key:"subscribers_count",link:"https://github.com/intereki/intereki.github.io/stargazers"},{label:"Number of forks",key:"forks",link:"https://github.com/intereki/intereki.github.io/network"},{label:"Open github issues",key:"open_issues_count",link:"https://github.com/intereki/intereki.github.io/issues"},{label:"Last updated at",key:"pushed_at",link:"https://github.com/intereki/intereki.github.io/commits",format:function(t){return p()(t).format("MMMM DD, YYYY")}}],g=function(){var t=Object(a.useState)(x),e=Object(l.a)(t,2),i=e[0],r=e[1],s=Object(a.useCallback)(Object(O.a)(d.a.mark((function t(){var e,i;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://api.github.com/repos/intereki/intereki.github.io");case 2:return e=t.sent,t.next=5,e.json();case 5:i=t.sent,r(x.map((function(t){return Object(f.a)(Object(f.a)({},t),{},{value:Object.keys(i).includes(t.key)?i[t.key]:t.value})})));case 7:case"end":return t.stop()}}),t)}))),[]);return Object(a.useEffect)((function(){s()}),[s]),Object(n.jsxs)("div",{children:[Object(n.jsx)("h3",{children:"Some stats about this site"}),Object(n.jsx)(b,{data:i})]})};e.default=function(){return Object(n.jsx)(s.a,{title:"Stats",description:"Some statistics about Amir Ekbatani and ekbatani.github.io",children:Object(n.jsxs)("article",{className:"post",id:"stats",children:[Object(n.jsx)("header",{children:Object(n.jsx)("div",{className:"title",children:Object(n.jsx)("h2",{"data-testid":"heading",children:Object(n.jsx)(r.b,{to:"/stats",children:"Stats"})})})}),Object(n.jsx)(h,{}),Object(n.jsx)(g,{})]})})}}}]);
//# sourceMappingURL=15.133d7a76.chunk.js.map