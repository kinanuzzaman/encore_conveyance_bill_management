import{b as n,a as _,Q as i}from"./selection.9088e168.js";import{Q as p}from"./QList.3973144f.js";import{Q as V}from"./QBtnDropdown.5205e719.js";import{_ as x,r as A,o as m,a as k,e as t,f as e,a6 as l,Q as g,aa as w,C as v,a5 as b,ad as d,E as S,ax as C,ae as r,aK as U,ay as M,aL as B,aw as I,B as q,a9 as D,a7 as L}from"./index.5b2acc78.js";import{b as P,a as Q}from"./QSelect.fbaf293c.js";import{Q as y,a as z,b as u}from"./QTable.9be2365e.js";import{C as h}from"./ClosePopup.a91d546e.js";import"./format.2a3572e1.js";import"./use-fullscreen.6b3ff2b1.js";const N={setup(){return{columns:[{name:"user",required:!0,label:"Vendor",align:"left",field:o=>o.name,format:o=>`${o}`,sortable:!0},{name:"email",align:"left",label:"Amount",field:"email",sortable:!0},{name:"phone",align:"left",label:"Paid By",field:"phone",sortable:!0},{name:"created",align:"left",label:"Created On",field:"created",sortable:!0},{name:"location",align:"left",label:"Location",field:"location",sortable:!0},{name:"status",align:"left",label:"Status",field:"status",sortable:!0},{name:"role",align:"left",label:"Approvals",field:"role"},{name:"action",label:"Action",field:"action"}],rows:[{name:"Frozen Yogurt",designation:"Manager",email:"demo@email.com",phone:"1234567890",created:"12 March 2023",role:"Manager Author Connect",status:"Active"},{name:"Frozen ",designation:"Manager",email:"demo@email.com",phone:"1234567890",created:"12 March 2023",role:"Manager Author Connect",status:"Active"},{name:"Yogurt",designation:"Manager",email:"demo@email.com",phone:"1234567890",created:"12 March 2023",role:"Manager Author Connect",status:"Active"}],selected:A([])}}},T={class:"mx-4 my-6 flex justify-between"},j=t("div",{class:"text-2xl font-semibold"},"Vendor Payment",-1),F={class:"flex md:gap-x-5 gap-1 justify-items-end"},E={class:"md:w-[200px]"},Y={class:"q-px-md gt-sm"},K={class:"text-xs"},O={class:"text-xs"},G={class:"text-xs"},H={class:"text-xs"},J={class:"bg-blue-200 inline p-2 text-blue-800"},R={class:"column items-end"},W={class:"q-pa-md lt-md"},X={class:"column items-end"};function Z(o,f,$,c,ee,le){return m(),k(w,null,[t("section",T,[j,t("div",F,[t("div",null,[e(V,{outline:"",rounded:"",label:"Action",icon:"edit"},{default:l(()=>[e(p,null,{default:l(()=>[v((m(),b(i,{clickable:"",onClick:o.onItemClick},{default:l(()=>[e(n,null,{default:l(()=>[e(_,null,{default:l(()=>[d("Photos")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[h]]),v((m(),b(i,{clickable:"",onClick:o.onItemClick},{default:l(()=>[e(n,null,{default:l(()=>[e(_,null,{default:l(()=>[d("Videos")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[h]]),v((m(),b(i,{clickable:"",onClick:o.onItemClick},{default:l(()=>[e(n,null,{default:l(()=>[e(_,null,{default:l(()=>[d("Articles")]),_:1})]),_:1})]),_:1},8,["onClick"])),[[h]])]),_:1})]),_:1})]),t("div",E,[e(P,{rounded:"",outlined:"",dense:"",modelValue:o.model,"onUpdate:modelValue":f[0]||(f[0]=a=>o.model=a),options:o.options,label:"Select"},{prepend:l(()=>[e(S,{name:"filter_alt_off"})]),_:1},8,["modelValue","options"])]),t("div",null,[e(g,{outline:"",rounded:"",to:"/vendor/add-vendor",label:"Add vendor","no-caps":""})])])]),t("section",null,[t("div",Y,[e(y,{flat:"",class:"h-[85vh]",rows:c.rows,columns:c.columns,style:{background:"rgba(244, 244, 244, 0.8)"},"selected-rows-label":o.getSelectedString,selection:"multiple",selected:c.selected,"onUpdate:selected":f[1]||(f[1]=a=>c.selected=a),"row-key":"name"},{body:l(a=>[e(z,{props:a},{default:l(()=>[e(u,null,{default:l(()=>[e(C,{modelValue:a.selected,"onUpdate:modelValue":s=>a.selected=s},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),e(u,null,{default:l(()=>[t("div",null,[t("div",K,r(a.row.name),1)])]),_:2},1024),e(u,null,{default:l(()=>[t("div",null,[t("div",O,r(a.row.email),1)])]),_:2},1024),e(u,null,{default:l(()=>[t("div",null,[t("div",G,r(a.row.phone),1)])]),_:2},1024),e(u,null,{default:l(()=>[t("div",null,[t("div",H,r(a.row.created),1)])]),_:2},1024),e(u,null,{default:l(()=>[d(r(a.row.status),1)]),_:2},1024),e(u,null,{default:l(()=>[d(r(a.row.status),1)]),_:2},1024),e(u,null,{default:l(()=>[t("div",J,r(a.row.role),1)]),_:2},1024),e(u,null,{default:l(()=>[t("div",R,[e(g,{flat:"",icon:"more_vert"},{default:l(()=>[e(Q,{anchor:"top middle",self:"top right"},{default:l(()=>[e(i,{clickable:""},{default:l(()=>[e(n,null,{default:l(()=>[d("Update")]),_:1})]),_:1}),e(i,{clickable:""},{default:l(()=>[e(n,null,{default:l(()=>[d("Delete")]),_:1})]),_:1}),e(i,{clickable:""},{default:l(()=>[e(n,null,{default:l(()=>[d("Update Status")]),_:1})]),_:1})]),_:1})]),_:1})])]),_:1})]),_:2},1032,["props"])]),_:1},8,["rows","columns","selected-rows-label","selected"])]),t("div",W,[e(y,{rows:c.rows,columns:c.columns,"row-key":"name",selection:"multiple",selected:c.selected,"onUpdate:selected":f[2]||(f[2]=a=>c.selected=a),filter:o.filter,grid:"","hide-header":""},{item:l(a=>[t("div",{class:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition",style:U(a.selected?"transform: scale(0.95);":"")},[e(M,{bordered:"",flat:"",class:B(a.selected?o.$q.dark.isActive?"bg-grey-9":"bg-grey-2":"")},{default:l(()=>[e(I,{class:"flex justify-between"},{default:l(()=>[e(C,{dense:"",modelValue:a.selected,"onUpdate:modelValue":s=>a.selected=s,label:a.row.name},null,8,["modelValue","onUpdate:modelValue","label"]),t("div",X,[e(g,{flat:"",icon:"more_vert"},{default:l(()=>[e(Q,{anchor:"top middle",self:"top right"},{default:l(()=>[e(i,{clickable:""},{default:l(()=>[e(n,null,{default:l(()=>[d("Update")]),_:1})]),_:1}),e(i,{clickable:""},{default:l(()=>[e(n,null,{default:l(()=>[d("Delete")]),_:1})]),_:1}),e(i,{clickable:""},{default:l(()=>[e(n,null,{default:l(()=>[d("Update Status")]),_:1})]),_:1})]),_:1})]),_:1})])]),_:2},1024),e(q),e(p,{dense:""},{default:l(()=>[(m(!0),k(w,null,D(a.cols.filter(s=>s.name!=="desc"),s=>(m(),b(i,{key:s.name},{default:l(()=>[e(n,null,{default:l(()=>[s.label!="Action"?(m(),b(_,{key:0},{default:l(()=>[d(r(s.label),1)]),_:2},1024)):L("",!0)]),_:2},1024),e(n,{side:""},{default:l(()=>[e(_,{caption:""},{default:l(()=>[d(r(s.value),1)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["class"])],4)]),_:1},8,["rows","columns","selected","filter"])])])],64)}var ce=x(N,[["render",Z]]);export{ce as default};
