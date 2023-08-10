import{_ as W,r as f,at as Y,$ as z,a4 as Q,o as r,a as I,e as n,f as t,a6 as l,Q as h,a5 as c,a7 as y,ab as G,bl as H,B as L,ax as B,ae as u,ad as m,aK as K,ay as J,aL as X,aw as Z,aa as $,a9 as ee,ag as le,ah as ae}from"./index.5b2acc78.js";import{a as V,b as te}from"./QSelect.fbaf293c.js";import{Q as O,a as oe,b as _}from"./QTable.9be2365e.js";import{Q as x,b as g,a as p}from"./selection.9088e168.js";import{Q as ne}from"./QList.3973144f.js";import{A as se}from"./api-service.e4a3f494.js";import{A as re}from"./ApprovalProcess.6a7b5490.js";import{h as de}from"./moment.53181859.js";import{u as ie}from"./use-quasar.b612f3c1.js";import{u as ce}from"./auth.store.b2378202.js";import{S as ue}from"./SearchAddCompo.f8c630c2.js";import"./format.2a3572e1.js";import"./use-fullscreen.6b3ff2b1.js";import"./axios.33769ef8.js";import"./ClosePopup.a91d546e.js";const U=f([{name:"request_type",required:!0,label:"Expense Type",align:"left",field:d=>d.name,format:d=>`${d}`,sortable:!0},{name:"amount",align:"left",label:"Amount",field:"amount",sortable:!0},{name:"paid",align:"left",label:"Paid By",field:"paid",sortable:!0},{name:"created",align:"left",label:"Created On",field:"created",sortable:!0},{name:"location",align:"left",label:"Location",field:"location"},{name:"status",align:"left",label:"Status",field:"status",sortable:!0},{name:"approvals",align:"left",label:"Approvals",field:"approvals"},{name:"role",align:"left",label:"Rejection",field:"role"},{name:"action",label:"Action",field:"action"}]),me=[{label:"Product Purchase",value:"ProductPurchase",type:"PRODUCT_PURCHASE"},{label:"Office",value:"OfficeExpense",type:"OFFICE"},{label:"Delivery",value:"DeliveryExp",type:"DELIVERY"},{label:"Conveyance",value:"ConveyanceExp",type:"CONVINCE"},{label:"Factory",value:"FactoryExp",type:"FACTORY"},{label:"BP",value:"BpExp",type:"BP"},{label:"Labour",value:"LabourExp",type:"LABOUR"},{label:"Marketing",value:"MarketingExp",type:"MARKETING"},{label:"Mobile Allowance",value:"MobileAllowance",type:"MOBILE_ALLOWANCE"},{label:"Salary Received Receipt",value:"SalaryExp",type:"SALARY"},{label:"Other Bill",value:"OtherBill",type:"OTHERS"}],fe={components:{SearchAddCompo:ue,ApprovalProcess:re},setup(){const d=f([]),i=new se,A=ie(),a=ce(),b=f(),k=f([]),E=f(null),S=f(!1),e=f(!1),o=f({page:1,rowsPerPage:10,rowsNumber:10}),s=Y({own_data:!1,employee:null,type:null});function q(){s.own_data&&(C.payee=a.getUserInfo._id),s.employee&&(C.payee=s.employee),s.type&&(C.request_type=s.type.type),b.value.requestServerInteraction()}function T(){s.own_data=!1,s.employee=null,s.type=null,C={},b.value.requestServerInteraction()}let C={};async function N(v){const{page:w,rowsPerPage:P}=v.pagination;e.value=!0;const R=(await i.get("/expense-control",{params:{page:w,limit:P,filter:C}})).data;console.log("\u{1F680} ~ file: ExpensePage.vue:270 ~ onRequest ~ data:",R.data),k.value.splice(0,k.value.length,...R.data),o.value.rowsNumber=R.total,o.value.page=w,o.value.rowsPerPage=P,e.value=!1}z(()=>{a.getUserRoleName!=="super_admin"&&j(),b.value.requestServerInteraction()});function F(){S.value=!1,b.value.requestServerInteraction()}function M(v){E.value=v,S.value=!0}function D(v){A.dialog({title:"Delete Expense Record",message:"Are you sure you want to delete this expense record?",cancel:!0,persistent:!0}).onOk(()=>{i.delete(`/expense-control/${v}`).then(()=>{A.notify({color:"green-4",textColor:"white",position:"top",icon:"cloud_done",message:"expense record deleted successfully"}),b.value.requestServerInteraction()}).catch(w=>{A.notify({color:"red-4",textColor:"white",position:"top",icon:"error",message:w.response?w.response.data.message:"An error occured"})})})}function j(){const v=U.value.findIndex(w=>w.name==="location");v!==-1&&U.value.splice(v,1)}return{moment:de,tableRef:b,pagination:o,loading:e,onRequest:N,selected:d,columns:U,rows:k,model:f(null),name:f(null),designation:f(null),options:["Google","Facebook","Twitter","Apple","Oracle"],val:f(!0),getSelectedString(){return d.value.length===0?"":`${d.value.length} record${d.value.length>1?"s":""} selected of ${k.value.length}`},openStatusUpdateWindow:M,approvalCandidate:E,closeStatusWindow:F,approval:S,deleteExpanse:D,authStore:a,expense_types:me,data_filter:s,doFilter:q,clearFilter:T}}},_e=d=>(le("data-v-5b7c016c"),d=d(),ae(),d),pe={class:"mx-4 my-6 flex justify-between"},ve=_e(()=>n("div",{class:"text-2xl font-semibold"},"Expense",-1)),ye={class:"flex md:gap-x-5 gap-1 justify-items-end"},ge={class:"flex flex-col gap-3 w-auto q-pa-md"},be={class:""},we={class:""},xe={class:"q-px-md gt-sm"},he={class:"text-xs"},ke={class:"text-xs"},Se={class:"text-xs"},Ce={class:"text-xs"},Ae=["href"],Ee={class:"bg-blue-200 inline p-2 text-blue-800"},qe={class:"bg-red-200 inline p-2 text-red-800"},Re={class:"column items-end"},Ve={class:"q-pa-md lt-md"},Ue={class:"column items-end"},Pe=["href"],Qe={class:"bg-blue-200 inline p-1 text-blue-800"},Ie={class:"bg-red-200 inline p-1 text-red-800"};function Le(d,i,A,a,b,k){const E=Q("SearchAddCompo"),S=Q("approval-process");return r(),I("main",null,[n("section",pe,[ve,n("div",ye,[n("div",null,[t(h,{outline:"",label:"Filter",rounded:""},{default:l(()=>[t(V,{"max-width":"500px"},{default:l(()=>[n("div",ge,[t(H,{modelValue:a.data_filter.own_data,"onUpdate:modelValue":i[0]||(i[0]=e=>a.data_filter.own_data=e),label:"My Request"},null,8,["modelValue"]),t(te,{dense:"",outlined:"",modelValue:a.data_filter.type,"onUpdate:modelValue":i[1]||(i[1]=e=>a.data_filter.type=e),options:a.expense_types,label:"Type",filled:""},null,8,["modelValue","options"]),t(E,{disable:a.data_filter.own_data,onSelected:i[2]||(i[2]=e=>a.data_filter.employee=e),label:"Employee",api:"users",userType:"EMPLOYEE"},null,8,["disable"]),t(L,{class:"mt-3"}),t(h,{color:"green",label:"Apply","no-caps":"",onClick:a.doFilter},null,8,["onClick"]),t(h,{color:"red",label:"Clear","no-caps":"",onClick:a.clearFilter},null,8,["onClick"])])]),_:1})]),_:1})]),n("div",null,[a.authStore.canAccess("expense_create")?(r(),c(h,{key:0,outline:"",rounded:"",to:"/expense/add-expense",label:"Add Expense","no-caps":""})):y("",!0)])])]),n("div",be,[n("section",we,[n("div",xe,[t(O,{flat:"",class:"h-[85vh]",rows:a.rows,onRequest:a.onRequest,columns:a.columns,ref:"tableRef",pagination:a.pagination,"onUpdate:pagination":i[3]||(i[3]=e=>a.pagination=e),loading:a.loading,style:{background:"rgba(244, 244, 244, 0.8)"},"selected-rows-label":a.getSelectedString,selection:"multiple",selected:a.selected,"onUpdate:selected":i[4]||(i[4]=e=>a.selected=e),"row-key":"name"},{body:l(e=>[t(oe,{class:"",props:e},{default:l(()=>[t(_,null,{default:l(()=>[t(B,{"left-label":"",modelValue:e.selected,"onUpdate:modelValue":o=>e.selected=o},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(_,null,{default:l(()=>[n("div",null,[n("div",he,u(e.row.request_type),1)])]),_:2},1024),t(_,null,{default:l(()=>[n("div",null,[n("div",ke,u(e.row.amount),1)])]),_:2},1024),t(_,null,{default:l(()=>{var o,s;return[n("div",null,[n("div",Se,u(((o=e.row.payer)==null?void 0:o.first_name)+" "+((s=e.row.payer)==null?void 0:s.last_name)),1)])]}),_:2},1024),t(_,null,{default:l(()=>[n("div",null,[n("div",Ce,u(a.moment(e.row.createdAt).format("LL | h:mma")),1)])]),_:2},1024),a.authStore.getUserRoleName=="super_admin"?(r(),c(_,{key:0},{default:l(()=>[n("a",{target:"_blank",class:"text-blue-500",href:`https://www.google.com/maps/place/${e.row.creator_location.latitude+","+e.row.creator_location.longitude}`},"Open Map",8,Ae)]),_:2},1024)):y("",!0),t(_,null,{default:l(()=>[m(u(e.row.status),1)]),_:2},1024),t(_,null,{default:l(()=>[n("div",Ee,u(e.row.approvedBy.filter(o=>!o.changed).length),1)]),_:2},1024),t(_,null,{default:l(()=>[n("div",qe,u(e.row.rejectedBy.filter(o=>!o.changed).length),1)]),_:2},1024),t(_,null,{default:l(()=>[n("div",Re,[t(h,{flat:"",icon:"more_vert"},{default:l(()=>[t(V,{anchor:"top middle",self:"top right"},{default:l(()=>[t(x,{clickable:"",onClick:o=>d.$router.push(`/expense/add-expense/?id=${e.row._id}&type=${e.row.request_type}`)},{default:l(()=>[t(g,null,{default:l(()=>[m("Details")]),_:1})]),_:2},1032,["onClick"]),a.authStore.canAccess("expense_write")?(r(),c(x,{key:0,clickable:"",onClick:o=>a.deleteExpanse(e.row._id)},{default:l(()=>[t(g,null,{default:l(()=>[m("Delete")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.authStore.canAccess("expense_write")||a.authStore.canAccess("expense_read")?(r(),c(x,{key:1,clickable:"",onClick:o=>a.openStatusUpdateWindow(e.row)},{default:l(()=>[t(g,null,{default:l(()=>[m("Update Status")]),_:1})]),_:2},1032,["onClick"])):y("",!0)]),_:2},1024)]),_:2},1024)])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","onRequest","columns","pagination","loading","selected-rows-label","selected"])]),n("div",Ve,[t(O,{rows:a.rows,columns:a.columns,"row-key":"name",selection:"multiple",selected:a.selected,"onUpdate:selected":i[5]||(i[5]=e=>a.selected=e),filter:d.filter,grid:"","hide-header":""},{item:l(e=>[n("div",{class:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition",style:K(e.selected?"transform: scale(0.95);":"")},[t(J,{bordered:"",flat:"",class:X(e.selected?d.$q.dark.isActive?"bg-grey-9":"bg-grey-2":"")},{default:l(()=>[t(Z,{class:"flex bg-green text-white justify-between"},{default:l(()=>[t(B,{dense:"",modelValue:e.selected,"onUpdate:modelValue":o=>e.selected=o,color:"white",label:e.row.name},null,8,["modelValue","onUpdate:modelValue","label"]),n("div",Ue,[t(h,{flat:"",icon:"more_vert"},{default:l(()=>[t(V,{anchor:"top middle",self:"top right"},{default:l(()=>[t(x,{clickable:"",onClick:o=>d.$router.push(`/expense/add-expense/?id=${e.row._id}&type=${e.row.request_type}`)},{default:l(()=>[t(g,null,{default:l(()=>[m("Details")]),_:1})]),_:2},1032,["onClick"]),a.authStore.canAccess("expense_write")?(r(),c(x,{key:0,clickable:"",onClick:o=>a.deleteExpanse(e.row._id)},{default:l(()=>[t(g,null,{default:l(()=>[m("Delete")]),_:1})]),_:2},1032,["onClick"])):y("",!0),a.authStore.canAccess("expense_write")||a.authStore.canAccess("expense_read")?(r(),c(x,{key:1,clickable:"",onClick:o=>a.openStatusUpdateWindow(e.row)},{default:l(()=>[t(g,null,{default:l(()=>[m("Update Status")]),_:1})]),_:2},1032,["onClick"])):y("",!0)]),_:2},1024)]),_:2},1024)])]),_:2},1024),t(L),t(ne,{dense:""},{default:l(()=>[(r(!0),I($,null,ee(e.cols.filter(o=>o.name!=="desc"),o=>(r(),c(x,{key:o.name},{default:l(()=>[t(g,null,{default:l(()=>[o.label!="Action"?(r(),c(p,{key:0,caption:""},{default:l(()=>[m(u(o.label),1)]),_:2},1024)):y("",!0)]),_:2},1024),t(g,{side:"",class:"text-black"},{default:l(()=>[o.label=="Expense Type"?(r(),c(p,{key:0},{default:l(()=>[m(u(e.row.request_type),1)]),_:2},1024)):o.label=="Amount"?(r(),c(p,{key:1},{default:l(()=>[m(u(e.row.amount),1)]),_:2},1024)):o.label=="Paid By"?(r(),c(p,{key:2},{default:l(()=>{var s,q;return[m(u(((s=e.row.payer)==null?void 0:s.first_name)+" "+((q=e.row.payer)==null?void 0:q.last_name)),1)]}),_:2},1024)):o.label=="Created On"?(r(),c(p,{key:3},{default:l(()=>[m(u(a.moment(e.row.createdAt).format("LL | h:mma")),1)]),_:2},1024)):o.label=="Location"&&a.authStore.getUserRoleName=="super_admin"?(r(),c(p,{key:4},{default:l(()=>[n("a",{target:"_blank",class:"text-blue-500",href:`https://www.google.com/maps/place/${e.row.creator_location.latitude+","+e.row.creator_location.longitude}`},"Open Map",8,Pe)]),_:2},1024)):o.label=="Status"?(r(),c(p,{key:5},{default:l(()=>[m(u(e.row.status),1)]),_:2},1024)):o.label=="Approvals"?(r(),c(p,{key:6},{default:l(()=>[n("div",Qe,u(e.row.approvedBy.filter(s=>!s.changed).length),1)]),_:2},1024)):o.label=="Rejection"?(r(),c(p,{key:7},{default:l(()=>[n("div",Ie,u(e.row.rejectedBy.filter(s=>!s.changed).length),1)]),_:2},1024)):y("",!0)]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["class"])],4)]),_:1},8,["rows","columns","selected","filter"])])])]),t(G,{modelValue:a.approval,"onUpdate:modelValue":i[6]||(i[6]=e=>a.approval=e),persistent:""},{default:l(()=>[t(S,{data:a.approvalCandidate,req_type:"expense",user_type:"payer",onClose:a.closeStatusWindow},null,8,["data","onClose"])]),_:1},8,["modelValue"])])}var Ze=W(fe,[["render",Le],["__scopeId","data-v-5b7c016c"]]);export{Ze as default};
