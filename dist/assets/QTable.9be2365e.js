import{g as $,h as u,i as n,j as A,p as z,n as ct,E as Me,v as be,y as me,r as H,w as E,aM as dt,$ as vt,U as ft,S as gt,m as bt,ao as mt,an as xe,V as Ve,aN as St,aO as yt,aP as ge,aQ as Be,aR as ht,a0 as $e,aS as _t,ax as fe,aT as N,Q as Z,B as wt}from"./index.5b2acc78.js";import{Q as qt}from"./QList.3973144f.js";import{u as Pt,c as Ct,d as De,b as kt}from"./QSelect.fbaf293c.js";import{u as Rt,a as Tt,b as xt}from"./use-fullscreen.6b3ff2b1.js";var nl=$({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(e,{slots:l}){const a=z(),g=u(()=>"q-td"+(e.autoWidth===!0?" q-table--col-auto-width":"")+(e.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(e.props===void 0)return n("td",{class:g.value},A(l.default));const i=a.vnode.key,f=(e.props.colsMap!==void 0?e.props.colsMap[i]:null)||e.props.col;if(f===void 0)return;const{row:s}=e.props;return n("td",{class:g.value+f.__tdClass(s),style:f.__tdStyle(s)},A(l.default))}}}),rl=$({name:"QTr",props:{props:Object,noHover:Boolean},setup(e,{slots:l}){const a=u(()=>"q-tr"+(e.props===void 0||e.props.header===!0?"":" "+e.props.__trClass)+(e.noHover===!0?" q-tr--no-hover":""));return()=>n("tr",{class:a.value},A(l.default))}}),Bt=$({name:"QTh",props:{props:Object,autoWidth:Boolean},emits:["click"],setup(e,{slots:l,emit:a}){const g=z(),{proxy:{$q:i}}=g,f=s=>{a("click",s)};return()=>{if(e.props===void 0)return n("th",{class:e.autoWidth===!0?"q-table--col-auto-width":"",onClick:f},A(l.default));let s,d;const c=g.vnode.key;if(c){if(s=e.props.colsMap[c],s===void 0)return}else s=e.props.col;if(s.sortable===!0){const r=s.align==="right"?"unshift":"push";d=ct(l.default,[]),d[r](n(Me,{class:s.__iconClass,name:i.iconSet.table.arrowUp}))}else d=A(l.default);const h={class:s.__thClass+(e.autoWidth===!0?" q-table--col-auto-width":""),style:s.headerStyle,onClick:r=>{s.sortable===!0&&e.props.sort(s),f(r)}};return n("th",h,d)}}});const Ot=["horizontal","vertical","cell","none"];var Ft=$({name:"QMarkupTable",props:{...be,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,wrapCells:Boolean,separator:{type:String,default:"horizontal",validator:e=>Ot.includes(e)}},setup(e,{slots:l}){const a=z(),g=me(e,a.proxy.$q),i=u(()=>`q-markup-table q-table__container q-table__card q-table--${e.separator}-separator`+(g.value===!0?" q-table--dark q-table__card--dark q-dark":"")+(e.dense===!0?" q-table--dense":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")+(e.square===!0?" q-table--square":"")+(e.wrapCells===!1?" q-table--no-wrap":""));return()=>n("div",{class:i.value},[n("table",{class:"q-table"},A(l.default))])}});function je(e,l){return n("div",e,[n("table",{class:"q-table"},l)])}const Lt={list:qt,table:Ft},Mt=["list","table","__qtable"];var Vt=$({name:"QVirtualScroll",props:{...Pt,type:{type:String,default:"list",validator:e=>Mt.includes(e)},items:{type:Array,default:()=>[]},itemsFn:Function,itemsSize:Number,scrollTarget:{default:void 0}},setup(e,{slots:l,attrs:a}){let g;const i=H(null),f=u(()=>e.itemsSize>=0&&e.itemsFn!==void 0?parseInt(e.itemsSize,10):Array.isArray(e.items)?e.items.length:0),{virtualScrollSliceRange:s,localResetVirtualScroll:d,padVirtualScroll:c,onVirtualScrollEvt:h}=Ct({virtualScrollLength:f,getVirtualScrollTarget:P,getVirtualScrollEl:q}),r=u(()=>{if(f.value===0)return[];const O=(F,R)=>({index:s.value.from+R,item:F});return e.itemsFn===void 0?e.items.slice(s.value.from,s.value.to).map(O):e.itemsFn(s.value.from,s.value.to-s.value.from).map(O)}),S=u(()=>"q-virtual-scroll q-virtual-scroll"+(e.virtualScrollHorizontal===!0?"--horizontal":"--vertical")+(e.scrollTarget!==void 0?"":" scroll")),w=u(()=>e.scrollTarget!==void 0?{}:{tabindex:0});E(f,()=>{d()}),E(()=>e.scrollTarget,()=>{y(),_()});function q(){return i.value.$el||i.value}function P(){return g}function _(){g=mt(q(),e.scrollTarget),g.addEventListener("scroll",h,xe.passive)}function y(){g!==void 0&&(g.removeEventListener("scroll",h,xe.passive),g=void 0)}function B(){let O=c(e.type==="list"?"div":"tbody",r.value.map(l.default));return l.before!==void 0&&(O=l.before().concat(O)),Ve(l.after,O)}return dt(()=>{d()}),vt(()=>{_()}),ft(()=>{_()}),gt(()=>{y()}),bt(()=>{y()}),()=>{if(l.default===void 0){console.error("QVirtualScroll: default scoped slot is required for rendering");return}return e.type==="__qtable"?je({ref:i,class:"q-table__middle "+S.value},B()):n(Lt[e.type],{...a,ref:i,class:[a.class,S.value],...w.value},B)}}});const $t={xs:2,sm:4,md:6,lg:10,xl:14};function Oe(e,l,a){return{transform:l===!0?`translateX(${a.lang.rtl===!0?"-":""}100%) scale3d(${-e},1,1)`:`scale3d(${e},1,1)`}}var Dt=$({name:"QLinearProgress",props:{...be,...St,value:{type:Number,default:0},buffer:Number,color:String,trackColor:String,reverse:Boolean,stripe:Boolean,indeterminate:Boolean,query:Boolean,rounded:Boolean,animationSpeed:{type:[String,Number],default:2100},instantFeedback:Boolean},setup(e,{slots:l}){const{proxy:a}=z(),g=me(e,a.$q),i=yt(e,$t),f=u(()=>e.indeterminate===!0||e.query===!0),s=u(()=>e.reverse!==e.query),d=u(()=>({...i.value!==null?i.value:{},"--q-linear-progress-speed":`${e.animationSpeed}ms`})),c=u(()=>"q-linear-progress"+(e.color!==void 0?` text-${e.color}`:"")+(e.reverse===!0||e.query===!0?" q-linear-progress--reverse":"")+(e.rounded===!0?" rounded-borders":"")),h=u(()=>Oe(e.buffer!==void 0?e.buffer:1,s.value,a.$q)),r=u(()=>`with${e.instantFeedback===!0?"out":""}-transition`),S=u(()=>`q-linear-progress__track absolute-full q-linear-progress__track--${r.value} q-linear-progress__track--${g.value===!0?"dark":"light"}`+(e.trackColor!==void 0?` bg-${e.trackColor}`:"")),w=u(()=>Oe(f.value===!0?1:e.value,s.value,a.$q)),q=u(()=>`q-linear-progress__model absolute-full q-linear-progress__model--${r.value} q-linear-progress__model--${f.value===!0?"in":""}determinate`),P=u(()=>({width:`${e.value*100}%`})),_=u(()=>`q-linear-progress__stripe absolute-${e.reverse===!0?"right":"left"} q-linear-progress__stripe--${r.value}`);return()=>{const y=[n("div",{class:S.value,style:h.value}),n("div",{class:q.value,style:w.value})];return e.stripe===!0&&f.value===!1&&y.push(n("div",{class:_.value,style:P.value})),n("div",{class:c.value,style:d.value,role:"progressbar","aria-valuemin":0,"aria-valuemax":1,"aria-valuenow":e.indeterminate===!0?void 0:e.value},Ve(l.default,y))}}});function jt(e,l){return new Date(e)-new Date(l)}const Qt={sortMethod:Function,binaryStateSort:Boolean,columnSortOrder:{type:String,validator:e=>e==="ad"||e==="da",default:"ad"}};function At(e,l,a,g){const i=u(()=>{const{sortBy:d}=l.value;return d&&a.value.find(c=>c.name===d)||null}),f=u(()=>e.sortMethod!==void 0?e.sortMethod:(d,c,h)=>{const r=a.value.find(q=>q.name===c);if(r===void 0||r.field===void 0)return d;const S=h===!0?-1:1,w=typeof r.field=="function"?q=>r.field(q):q=>q[r.field];return d.sort((q,P)=>{let _=w(q),y=w(P);return _==null?-1*S:y==null?1*S:r.sort!==void 0?r.sort(_,y,q,P)*S:ge(_)===!0&&ge(y)===!0?(_-y)*S:Be(_)===!0&&Be(y)===!0?jt(_,y)*S:typeof _=="boolean"&&typeof y=="boolean"?(_-y)*S:([_,y]=[_,y].map(B=>(B+"").toLocaleString().toLowerCase()),_<y?-1*S:_===y?0:S)})});function s(d){let c=e.columnSortOrder;if(ht(d)===!0)d.sortOrder&&(c=d.sortOrder),d=d.name;else{const S=a.value.find(w=>w.name===d);S!==void 0&&S.sortOrder&&(c=S.sortOrder)}let{sortBy:h,descending:r}=l.value;h!==d?(h=d,r=c==="da"):e.binaryStateSort===!0?r=!r:r===!0?c==="ad"?h=null:r=!1:c==="ad"?r=!0:h=null,g({sortBy:h,descending:r,page:1})}return{columnToSort:i,computedSortMethod:f,sort:s}}const Et={filter:[String,Object],filterMethod:Function};function Nt(e,l){const a=u(()=>e.filterMethod!==void 0?e.filterMethod:(g,i,f,s)=>{const d=i?i.toLowerCase():"";return g.filter(c=>f.some(h=>{const r=s(h,c)+"";return(r==="undefined"||r==="null"?"":r.toLowerCase()).indexOf(d)!==-1}))});return E(()=>e.filter,()=>{$e(()=>{l({page:1},!0)})},{deep:!0}),{computedFilterMethod:a}}function Ht(e,l){for(const a in l)if(l[a]!==e[a])return!1;return!0}function Fe(e){return e.page<1&&(e.page=1),e.rowsPerPage!==void 0&&e.rowsPerPage<1&&(e.rowsPerPage=0),e}const zt={pagination:Object,rowsPerPageOptions:{type:Array,default:()=>[5,7,10,15,20,25,50,0]},"onUpdate:pagination":[Function,Array]};function Ut(e,l){const{props:a,emit:g}=e,i=H(Object.assign({sortBy:null,descending:!1,page:1,rowsPerPage:a.rowsPerPageOptions.length>0?a.rowsPerPageOptions[0]:5},a.pagination)),f=u(()=>{const r=a["onUpdate:pagination"]!==void 0?{...i.value,...a.pagination}:i.value;return Fe(r)}),s=u(()=>f.value.rowsNumber!==void 0);function d(r){c({pagination:r,filter:a.filter})}function c(r={}){$e(()=>{g("request",{pagination:r.pagination||f.value,filter:r.filter||a.filter,getCellValue:l})})}function h(r,S){const w=Fe({...f.value,...r});if(Ht(f.value,w)===!0){s.value===!0&&S===!0&&d(w);return}if(s.value===!0){d(w);return}a.pagination!==void 0&&a["onUpdate:pagination"]!==void 0?g("update:pagination",w):i.value=w}return{innerPagination:i,computedPagination:f,isServerSide:s,requestServerInteraction:c,setPagination:h}}function pt(e,l,a,g,i,f){const{props:s,emit:d,proxy:{$q:c}}=e,h=u(()=>g.value===!0?a.value.rowsNumber||0:f.value),r=u(()=>{const{page:R,rowsPerPage:T}=a.value;return(R-1)*T}),S=u(()=>{const{page:R,rowsPerPage:T}=a.value;return R*T}),w=u(()=>a.value.page===1),q=u(()=>a.value.rowsPerPage===0?1:Math.max(1,Math.ceil(h.value/a.value.rowsPerPage))),P=u(()=>S.value===0?!0:a.value.page>=q.value),_=u(()=>(s.rowsPerPageOptions.includes(l.value.rowsPerPage)?s.rowsPerPageOptions:[l.value.rowsPerPage].concat(s.rowsPerPageOptions)).map(T=>({label:T===0?c.lang.table.allRows:""+T,value:T})));E(q,(R,T)=>{if(R===T)return;const U=a.value.page;R&&!U?i({page:1}):R<U&&i({page:R})});function y(){i({page:1})}function B(){const{page:R}=a.value;R>1&&i({page:R-1})}function O(){const{page:R,rowsPerPage:T}=a.value;S.value>0&&R*T<h.value&&i({page:R+1})}function F(){i({page:q.value})}return s["onUpdate:pagination"]!==void 0&&d("update:pagination",{...a.value}),{firstRowIndex:r,lastRowIndex:S,isFirstPage:w,isLastPage:P,pagesNumber:q,computedRowsPerPageOptions:_,computedRowsNumber:h,firstPage:y,prevPage:B,nextPage:O,lastPage:F}}const It={selection:{type:String,default:"none",validator:e=>["single","multiple","none"].includes(e)},selected:{type:Array,default:()=>[]}},Wt=["update:selected","selection"];function Kt(e,l,a,g){const i=u(()=>{const P={};return e.selected.map(g.value).forEach(_=>{P[_]=!0}),P}),f=u(()=>e.selection!=="none"),s=u(()=>e.selection==="single"),d=u(()=>e.selection==="multiple"),c=u(()=>a.value.length>0&&a.value.every(P=>i.value[g.value(P)]===!0)),h=u(()=>c.value!==!0&&a.value.some(P=>i.value[g.value(P)]===!0)),r=u(()=>e.selected.length);function S(P){return i.value[P]===!0}function w(){l("update:selected",[])}function q(P,_,y,B){l("selection",{rows:_,added:y,keys:P,evt:B});const O=s.value===!0?y===!0?_:[]:y===!0?e.selected.concat(_):e.selected.filter(F=>P.includes(g.value(F))===!1);l("update:selected",O)}return{hasSelectionMode:f,singleSelection:s,multipleSelection:d,allRowsSelected:c,someRowsSelected:h,rowsSelectedNumber:r,isRowSelected:S,clearSelection:w,updateSelection:q}}function Le(e){return Array.isArray(e)?e.slice():[]}const Gt={expanded:Array},Xt=["update:expanded"];function Jt(e,l){const a=H(Le(e.expanded));E(()=>e.expanded,s=>{a.value=Le(s)});function g(s){return a.value.includes(s)}function i(s){e.expanded!==void 0?l("update:expanded",s):a.value=s}function f(s,d){const c=a.value.slice(),h=c.indexOf(s);d===!0?h===-1&&(c.push(s),i(c)):h!==-1&&(c.splice(h,1),i(c))}return{isRowExpanded:g,setExpanded:i,updateExpanded:f}}const Yt={visibleColumns:Array};function Zt(e,l,a){const g=u(()=>{if(e.columns!==void 0)return e.columns;const d=e.rows[0];return d!==void 0?Object.keys(d).map(c=>({name:c,label:c.toUpperCase(),field:c,align:ge(d[c])?"right":"left",sortable:!0})):[]}),i=u(()=>{const{sortBy:d,descending:c}=l.value;return(e.visibleColumns!==void 0?g.value.filter(r=>r.required===!0||e.visibleColumns.includes(r.name)===!0):g.value).map(r=>{const S=r.align||"right",w=`text-${S}`;return{...r,align:S,__iconClass:`q-table__sort-icon q-table__sort-icon--${S}`,__thClass:w+(r.headerClasses!==void 0?" "+r.headerClasses:"")+(r.sortable===!0?" sortable":"")+(r.name===d?` sorted ${c===!0?"sort-desc":""}`:""),__tdStyle:r.style!==void 0?typeof r.style!="function"?()=>r.style:r.style:()=>null,__tdClass:r.classes!==void 0?typeof r.classes!="function"?()=>w+" "+r.classes:q=>w+" "+r.classes(q):()=>w}})}),f=u(()=>{const d={};return i.value.forEach(c=>{d[c.name]=c}),d}),s=u(()=>e.tableColspan!==void 0?e.tableColspan:i.value.length+(a.value===!0?1:0));return{colList:g,computedCols:i,computedColsMap:f,computedColspan:s}}const ee="q-table__bottom row items-center",Qe={};De.forEach(e=>{Qe[e]={}});var ol=$({name:"QTable",props:{rows:{type:Array,default:()=>[]},rowKey:{type:[String,Function],default:"id"},columns:Array,loading:Boolean,iconFirstPage:String,iconPrevPage:String,iconNextPage:String,iconLastPage:String,title:String,hideHeader:Boolean,grid:Boolean,gridHeader:Boolean,dense:Boolean,flat:Boolean,bordered:Boolean,square:Boolean,separator:{type:String,default:"horizontal",validator:e=>["horizontal","vertical","cell","none"].includes(e)},wrapCells:Boolean,virtualScroll:Boolean,virtualScrollTarget:{default:void 0},...Qe,noDataLabel:String,noResultsLabel:String,loadingLabel:String,selectedRowsLabel:Function,rowsPerPageLabel:String,paginationLabel:Function,color:{type:String,default:"grey-8"},titleClass:[String,Array,Object],tableStyle:[String,Array,Object],tableClass:[String,Array,Object],tableHeaderStyle:[String,Array,Object],tableHeaderClass:[String,Array,Object],cardContainerClass:[String,Array,Object],cardContainerStyle:[String,Array,Object],cardStyle:[String,Array,Object],cardClass:[String,Array,Object],hideBottom:Boolean,hideSelectedBanner:Boolean,hideNoData:Boolean,hidePagination:Boolean,onRowClick:Function,onRowDblclick:Function,onRowContextmenu:Function,...be,...Rt,...Yt,...Et,...zt,...Gt,...It,...Qt},emits:["request","virtualScroll",...Tt,...Xt,...Wt],setup(e,{slots:l,emit:a}){const g=z(),{proxy:{$q:i}}=g,f=me(e,i),{inFullscreen:s,toggleFullscreen:d}=xt(),c=u(()=>typeof e.rowKey=="function"?e.rowKey:t=>t[e.rowKey]),h=H(null),r=H(null),S=u(()=>e.grid!==!0&&e.virtualScroll===!0),w=u(()=>" q-table__card"+(f.value===!0?" q-table__card--dark q-dark":"")+(e.square===!0?" q-table--square":"")+(e.flat===!0?" q-table--flat":"")+(e.bordered===!0?" q-table--bordered":"")),q=u(()=>`q-table__container q-table--${e.separator}-separator column no-wrap`+(e.grid===!0?" q-table--grid":w.value)+(f.value===!0?" q-table--dark":"")+(e.dense===!0?" q-table--dense":"")+(e.wrapCells===!1?" q-table--no-wrap":"")+(s.value===!0?" fullscreen scroll":"")),P=u(()=>q.value+(e.loading===!0?" q-table--loading":""));E(()=>e.tableStyle+e.tableClass+e.tableHeaderStyle+e.tableHeaderClass+q.value,()=>{S.value===!0&&r.value!==null&&r.value.reset()});const{innerPagination:_,computedPagination:y,isServerSide:B,requestServerInteraction:O,setPagination:F}=Ut(g,j),{computedFilterMethod:R}=Nt(e,F),{isRowExpanded:T,setExpanded:U,updateExpanded:Ae}=Jt(e,a),te=u(()=>{let t=e.rows;if(B.value===!0||t.length===0)return t;const{sortBy:o,descending:v}=y.value;return e.filter&&(t=R.value(t,e.filter,L.value,j)),Ue.value!==null&&(t=pe.value(e.rows===t?t.slice():t,o,v)),t}),Se=u(()=>te.value.length),V=u(()=>{let t=te.value;if(B.value===!0)return t;const{rowsPerPage:o}=y.value;return o!==0&&(I.value===0&&e.rows!==t?t.length>W.value&&(t=t.slice(0,W.value)):t=t.slice(I.value,W.value)),t}),{hasSelectionMode:D,singleSelection:Ee,multipleSelection:ye,allRowsSelected:Ne,someRowsSelected:he,rowsSelectedNumber:le,isRowSelected:ae,clearSelection:He,updateSelection:p}=Kt(e,a,V,c),{colList:ze,computedCols:L,computedColsMap:_e,computedColspan:we}=Zt(e,y,D),{columnToSort:Ue,computedSortMethod:pe,sort:ne}=At(e,y,ze,F),{firstRowIndex:I,lastRowIndex:W,isFirstPage:re,isLastPage:oe,pagesNumber:K,computedRowsPerPageOptions:Ie,computedRowsNumber:G,firstPage:ie,prevPage:se,nextPage:ue,lastPage:ce}=pt(g,_,y,B,F,Se),We=u(()=>V.value.length===0),Ke=u(()=>{const t={};return De.forEach(o=>{t[o]=e[o]}),t.virtualScrollItemSize===void 0&&(t.virtualScrollItemSize=e.dense===!0?28:48),t});function Ge(){S.value===!0&&r.value.reset()}function Xe(){if(e.grid===!0)return st();const t=e.hideHeader!==!0?Re:null;if(S.value===!0){const v=l["top-row"],b=l["bottom-row"],m={default:k=>Pe(k.item,l.body,k.index)};if(v!==void 0){const k=n("tbody",v({cols:L.value}));m.before=t===null?()=>k:()=>[t()].concat(k)}else t!==null&&(m.before=t);return b!==void 0&&(m.after=()=>n("tbody",b({cols:L.value}))),n(Vt,{ref:r,class:e.tableClass,style:e.tableStyle,...Ke.value,scrollTarget:e.virtualScrollTarget,items:V.value,type:"__qtable",tableColspan:we.value,onVirtualScroll:Ye},m)}const o=[Ze()];return t!==null&&o.unshift(t()),je({class:["q-table__middle scroll",e.tableClass],style:e.tableStyle},o)}function Je(t,o){if(r.value!==null){r.value.scrollTo(t,o);return}t=parseInt(t,10);const v=h.value.querySelector(`tbody tr:nth-of-type(${t+1})`);if(v!==null){const b=h.value.querySelector(".q-table__middle.scroll"),m=v.offsetTop-e.virtualScrollStickySizeStart,k=m<b.scrollTop?"decrease":"increase";b.scrollTop=m,a("virtualScroll",{index:t,from:0,to:_.value.rowsPerPage-1,direction:k})}}function Ye(t){a("virtualScroll",t)}function qe(){return[n(Dt,{class:"q-table__linear-progress",color:e.color,dark:f.value,indeterminate:!0,trackColor:"transparent"})]}function Pe(t,o,v){const b=c.value(t),m=ae(b);if(o!==void 0)return o(Ce({key:b,row:t,pageIndex:v,__trClass:m?"selected":""}));const k=l["body-cell"],C=L.value.map(x=>{const J=l[`body-cell-${x.name}`],Y=J!==void 0?J:k;return Y!==void 0?Y(et({key:b,row:t,pageIndex:v,col:x})):n("td",{class:x.__tdClass(t),style:x.__tdStyle(t)},j(x,t))});if(D.value===!0){const x=l["body-selection"],J=x!==void 0?x(tt({key:b,row:t,pageIndex:v})):[n(fe,{modelValue:m,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(Y,ut)=>{p([b],[t],Y,ut)}})];C.unshift(n("td",{class:"q-table--col-auto-width"},J))}const M={key:b,class:{selected:m}};return e.onRowClick!==void 0&&(M.class["cursor-pointer"]=!0,M.onClick=x=>{a("RowClick",x,t,v)}),e.onRowDblclick!==void 0&&(M.class["cursor-pointer"]=!0,M.onDblclick=x=>{a("RowDblclick",x,t,v)}),e.onRowContextmenu!==void 0&&(M.class["cursor-pointer"]=!0,M.onContextmenu=x=>{a("RowContextmenu",x,t,v)}),n("tr",M,C)}function Ze(){const t=l.body,o=l["top-row"],v=l["bottom-row"];let b=V.value.map((m,k)=>Pe(m,t,k));return o!==void 0&&(b=o({cols:L.value}).concat(b)),v!==void 0&&(b=b.concat(v({cols:L.value}))),n("tbody",b)}function Ce(t){return de(t),t.cols=t.cols.map(o=>N({...o},"value",()=>j(o,t.row))),t}function et(t){return de(t),N(t,"value",()=>j(t.col,t.row)),t}function tt(t){return de(t),t}function de(t){Object.assign(t,{cols:L.value,colsMap:_e.value,sort:ne,rowIndex:I.value+t.pageIndex,color:e.color,dark:f.value,dense:e.dense}),D.value===!0&&N(t,"selected",()=>ae(t.key),(o,v)=>{p([t.key],[t.row],o,v)}),N(t,"expand",()=>T(t.key),o=>{Ae(t.key,o)})}function j(t,o){const v=typeof t.field=="function"?t.field(o):o[t.field];return t.format!==void 0?t.format(v,o):v}const Q=u(()=>({pagination:y.value,pagesNumber:K.value,isFirstPage:re.value,isLastPage:oe.value,firstPage:ie,prevPage:se,nextPage:ue,lastPage:ce,inFullscreen:s.value,toggleFullscreen:d}));function lt(){const t=l.top,o=l["top-left"],v=l["top-right"],b=l["top-selection"],m=D.value===!0&&b!==void 0&&le.value>0,k="q-table__top relative-position row items-center";if(t!==void 0)return n("div",{class:k},[t(Q.value)]);let C;if(m===!0?C=b(Q.value).slice():(C=[],o!==void 0?C.push(n("div",{class:"q-table__control"},[o(Q.value)])):e.title&&C.push(n("div",{class:"q-table__control"},[n("div",{class:["q-table__title",e.titleClass]},e.title)]))),v!==void 0&&(C.push(n("div",{class:"q-table__separator col"})),C.push(n("div",{class:"q-table__control"},[v(Q.value)]))),C.length!==0)return n("div",{class:k},C)}const ke=u(()=>he.value===!0?null:Ne.value);function Re(){const t=at();return e.loading===!0&&l.loading===void 0&&t.push(n("tr",{class:"q-table__progress"},[n("th",{class:"relative-position",colspan:we.value},qe())])),n("thead",t)}function at(){const t=l.header,o=l["header-cell"];if(t!==void 0)return t(ve({header:!0})).slice();const v=L.value.map(b=>{const m=l[`header-cell-${b.name}`],k=m!==void 0?m:o,C=ve({col:b});return k!==void 0?k(C):n(Bt,{key:b.name,props:C},()=>b.label)});if(Ee.value===!0&&e.grid!==!0)v.unshift(n("th",{class:"q-table--col-auto-width"}," "));else if(ye.value===!0){const b=l["header-selection"],m=b!==void 0?b(ve({})):[n(fe,{color:e.color,modelValue:ke.value,dark:f.value,dense:e.dense,"onUpdate:modelValue":Te})];v.unshift(n("th",{class:"q-table--col-auto-width"},m))}return[n("tr",{class:e.tableHeaderClass,style:e.tableHeaderStyle},v)]}function ve(t){return Object.assign(t,{cols:L.value,sort:ne,colsMap:_e.value,color:e.color,dark:f.value,dense:e.dense}),ye.value===!0&&N(t,"selected",()=>ke.value,Te),t}function Te(t){he.value===!0&&(t=!1),p(V.value.map(c.value),V.value,t)}const X=u(()=>{const t=[e.iconFirstPage||i.iconSet.table.firstPage,e.iconPrevPage||i.iconSet.table.prevPage,e.iconNextPage||i.iconSet.table.nextPage,e.iconLastPage||i.iconSet.table.lastPage];return i.lang.rtl===!0?t.reverse():t});function nt(){if(e.hideBottom===!0)return;if(We.value===!0){if(e.hideNoData===!0)return;const v=e.loading===!0?e.loadingLabel||i.lang.table.loading:e.filter?e.noResultsLabel||i.lang.table.noResults:e.noDataLabel||i.lang.table.noData,b=l["no-data"],m=b!==void 0?[b({message:v,icon:i.iconSet.table.warning,filter:e.filter})]:[n(Me,{class:"q-table__bottom-nodata-icon",name:i.iconSet.table.warning}),v];return n("div",{class:ee+" q-table__bottom--nodata"},m)}const t=l.bottom;if(t!==void 0)return n("div",{class:ee},[t(Q.value)]);const o=e.hideSelectedBanner!==!0&&D.value===!0&&le.value>0?[n("div",{class:"q-table__control"},[n("div",[(e.selectedRowsLabel||i.lang.table.selectedRecords)(le.value)])])]:[];if(e.hidePagination!==!0)return n("div",{class:ee+" justify-end"},ot(o));if(o.length>0)return n("div",{class:ee},o)}function rt(t){F({page:1,rowsPerPage:t.value})}function ot(t){let o;const{rowsPerPage:v}=y.value,b=e.paginationLabel||i.lang.table.pagination,m=l.pagination,k=e.rowsPerPageOptions.length>1;if(t.push(n("div",{class:"q-table__separator col"})),k===!0&&t.push(n("div",{class:"q-table__control"},[n("span",{class:"q-table__bottom-item"},[e.rowsPerPageLabel||i.lang.table.recordsPerPage]),n(kt,{class:"q-table__select inline q-table__bottom-item",color:e.color,modelValue:v,options:Ie.value,displayValue:v===0?i.lang.table.allRows:v,dark:f.value,borderless:!0,dense:!0,optionsDense:!0,optionsCover:!0,"onUpdate:modelValue":rt})])),m!==void 0)o=m(Q.value);else if(o=[n("span",v!==0?{class:"q-table__bottom-item"}:{},[v?b(I.value+1,Math.min(W.value,G.value),G.value):b(1,Se.value,G.value)])],v!==0&&K.value>1){const C={color:e.color,round:!0,dense:!0,flat:!0};e.dense===!0&&(C.size="sm"),K.value>2&&o.push(n(Z,{key:"pgFirst",...C,icon:X.value[0],disable:re.value,onClick:ie})),o.push(n(Z,{key:"pgPrev",...C,icon:X.value[1],disable:re.value,onClick:se}),n(Z,{key:"pgNext",...C,icon:X.value[2],disable:oe.value,onClick:ue})),K.value>2&&o.push(n(Z,{key:"pgLast",...C,icon:X.value[3],disable:oe.value,onClick:ce}))}return t.push(n("div",{class:"q-table__control"},o)),t}function it(){const t=e.gridHeader===!0?[n("table",{class:"q-table"},[Re()])]:e.loading===!0&&l.loading===void 0?qe():void 0;return n("div",{class:"q-table__middle"},t)}function st(){const t=l.item!==void 0?l.item:o=>{const v=o.cols.map(m=>n("div",{class:"q-table__grid-item-row"},[n("div",{class:"q-table__grid-item-title"},[m.label]),n("div",{class:"q-table__grid-item-value"},[m.value])]));if(D.value===!0){const m=l["body-selection"],k=m!==void 0?m(o):[n(fe,{modelValue:o.selected,color:e.color,dark:f.value,dense:e.dense,"onUpdate:modelValue":(C,M)=>{p([o.key],[o.row],C,M)}})];v.unshift(n("div",{class:"q-table__grid-item-row"},k),n(wt,{dark:f.value}))}const b={class:["q-table__grid-item-card"+w.value,e.cardClass],style:e.cardStyle};return(e.onRowClick!==void 0||e.onRowDblclick!==void 0)&&(b.class[0]+=" cursor-pointer",e.onRowClick!==void 0&&(b.onClick=m=>{a("RowClick",m,o.row,o.pageIndex)}),e.onRowDblclick!==void 0&&(b.onDblclick=m=>{a("RowDblclick",m,o.row,o.pageIndex)})),n("div",{class:"q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3"+(o.selected===!0?" q-table__grid-item--selected":"")},[n("div",b,v)])};return n("div",{class:["q-table__grid-content row",e.cardContainerClass],style:e.cardContainerStyle},V.value.map((o,v)=>t(Ce({key:c.value(o),row:o,pageIndex:v}))))}return Object.assign(g.proxy,{requestServerInteraction:O,setPagination:F,firstPage:ie,prevPage:se,nextPage:ue,lastPage:ce,isRowSelected:ae,clearSelection:He,isRowExpanded:T,setExpanded:U,sort:ne,resetVirtualScroll:Ge,scrollTo:Je,getCellValue:j}),_t(g.proxy,{filteredSortedRows:()=>te.value,computedRows:()=>V.value,computedRowsNumber:()=>G.value}),()=>{const t=[lt()],o={ref:h,class:P.value};return e.grid===!0?t.push(it()):Object.assign(o,{class:[o.class,e.cardClass],style:e.cardStyle}),t.push(Xe(),nt()),e.loading===!0&&l.loading!==void 0&&t.push(l.loading()),n("div",o,t)}}});export{ol as Q,rl as a,nl as b};
