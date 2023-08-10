import{_ as z,r as i,at as H,$ as K,o as u,a as q,e as n,f as a,Q as w,a6 as t,ab as G,ae as m,ad as f,a5 as p,a7 as _,aK as J,ay as R,aL as W,aw as N,ax as X,B as Y,aa as Z,a9 as $,a8 as k,E as P,aH as ee}from"./index.5b2acc78.js";import{Q as B,a as ae,b as v}from"./QTable.9be2365e.js";import{u as te,Q as le,a as L,b as T}from"./rbac.store.a503f2e1.js";import{b as C,Q as A,a as S}from"./selection.9088e168.js";import{a as oe}from"./QSelect.fbaf293c.js";import{Q as se}from"./QList.3973144f.js";import{u as ne}from"./user.store.f9dc60f8.js";import{u as re}from"./use-quasar.b612f3c1.js";import{A as de}from"./api-service.e4a3f494.js";import{h as ie}from"./moment.53181859.js";import{u as ue}from"./auth.store.b2378202.js";import"./use-fullscreen.6b3ff2b1.js";import"./format.2a3572e1.js";import"./axios.33769ef8.js";const ce=[{name:"user",required:!0,label:"User",align:"left",field:"user",format:r=>`${r}`,sortable:!0},{name:"creator",align:"left",label:"Creator",field:"creator",sortable:!0},{name:"user_type",align:"left",label:"User Type",field:"user_type",sortable:!0},{name:"createdAt",align:"left",label:"Created At",field:"createdAt",sortable:!0},{name:"action",label:"Action",field:"action"}],me={setup(){const r=new de,o=ne(),h=te(),l=ue(),c=re(),U=i(!1),e=i({});let s=i(!1);const g=H({first_name:null,last_name:null,email:null,phone_number:null,role:null}),V=i(),x=i([]),Q=i(!1),y=i({page:1,rowsPerPage:10,rowsNumber:10});async function E(d){const{page:b,rowsPerPage:D}=d.pagination;Q.value=!0;const I=await r.get("/users",{params:{inCompleted:!0,page:b,limit:D,user_type:"VENDOR"}});x.value.splice(0,x.value.length,...I.data.data),y.value.rowsNumber=I.data.total,y.value.page=b,y.value.rowsPerPage=D,Q.value=!1}K(()=>{V.value.requestServerInteraction(),h.fetchAllRoles()});const F=async()=>{try{await o.userInvite({...g,role:g.role.value}),c.notify({message:"Vendor User created",color:"positive",position:"top"}),s.value=!1}catch(d){c.notify({message:d.response?d.response.data.message:d.message,color:"negative",position:"top"})}};function M(d){Object.assign(e.value,d),U.value=!0}async function j(){try{await o.userInvite({...e.value,role:e.value.role.value,type:"recorded"}),c.notify({message:"Vendor User updated",color:"positive",position:"top"})}catch(d){c.notify({message:d.response?d.response.data.message:d.message,color:"negative",position:"top"})}}async function O(d){c.dialog({title:"Delete User Record",message:"Are you sure you want to delete this user record?",cancel:!0,persistent:!0}).onOk(()=>{r.delete(`/users/${d}`).then(()=>{c.notify({color:"green-4",textColor:"white",position:"top",icon:"cloud_done",message:"Vendor user record deleted successfully"}),V.value.requestServerInteraction()}).catch(b=>{c.notify({color:"red-4",textColor:"white",position:"top",icon:"error",message:b.response?b.response.data.message:"An error occured"})})})}return{rbacStore:h,moment:ie,registerUser:F,userRegister:g,rows:x,columns:ce,confirm:s,model:i(null),name:i(null),designation:i(null),val:i(!0),tableRef:V,pagination:y,loading:Q,onClick:()=>!1,onRequest:E,userUpdateDialog:U,updateCandidate:e,openUserUpdateDialog:M,updateUserInfo:j,deleteUser:O,authStore:l}}},fe={class:"mx-4 py-6 flex justify-between"},pe=n("div",{class:"text-2xl font-semibold"},"Pending Vendor Management",-1),ge={class:""},be={class:""},_e={class:"q-px-md gt-sm"},ve={class:"tw-py-1 tw-rounded-md"},ye={class:"flex gap-2"},we={class:"text-xs"},ke={class:"text-xs"},Ce={class:"bg-blue-200 inline p-2 text-blue-800"},he={class:"column items-end"},Ue={class:"q-pa-md lt-md"},Ve={class:"column items-end"};function xe(r,o,h,l,c,U){return u(),q("main",null,[n("section",fe,[pe,a(w,{color:"red",label:"Back","no-caps":"",onClick:o[0]||(o[0]=e=>r.$router.back())})]),n("div",ge,[n("section",be,[n("div",_e,[a(B,{flat:"",class:"h-[85vh]",rows:l.rows,ref:"tableRef",pagination:l.pagination,"onUpdate:pagination":o[4]||(o[4]=e=>l.pagination=e),loading:l.loading,onRequest:l.onRequest,columns:l.columns,style:{background:"rgba(244, 244, 244, 0.8)"}},{body:t(e=>[a(ae,{class:"",props:e},{default:t(()=>[a(v,{key:"user",props:e,onClick:o[1]||(o[1]=s=>r.openDialog=!0),class:""},{default:t(()=>[n("div",ve,[n("div",ye,[n("span",we,m(e.row.first_name)+" "+m(e.row.last_name),1)])])]),_:2},1032,["props"]),a(v,{key:"creator",props:e,class:""},{default:t(()=>[n("div",null,[n("div",ke,m(e.row.created_by.first_name+" "+e.row.created_by.last_name),1)])]),_:2},1032,["props"]),a(v,{key:"user_type",props:e,onClick:o[2]||(o[2]=s=>r.openDialog=!0),class:""},{default:t(()=>[f(m(e.row.user_type),1)]),_:2},1032,["props"]),a(v,{key:"createdAt",props:e,onClick:o[3]||(o[3]=s=>r.openDialog=!0),class:""},{default:t(()=>[n("div",Ce,m(l.moment(e.row.createdAt).format("LL | h:mma")),1)]),_:2},1032,["props"]),a(v,{key:"action"},{default:t(()=>[n("div",he,[a(le,{square:"",flat:"",padding:"none","text-color":"black",icon:"add",direction:"left",class:"border border-black"},{default:t(()=>[l.authStore.canAccess("user_create")?(u(),p(T,{key:0,flat:"",onClick:s=>l.openUserUpdateDialog(e.row),icon:"person_add",class:"bg-transparent shadow-none text-blue-500"},{default:t(()=>[a(L,{class:"bg-blue-6 text-xs",anchor:"top middle",self:"center middle",offset:[10,10]},{default:t(()=>[f(" Invite ")]),_:1})]),_:2},1032,["onClick"])):_("",!0),l.authStore.canAccess("user_create")?(u(),p(T,{key:1,onClick:s=>l.deleteUser(e.row._id),flat:"",icon:"delete",class:"bg-transparent shadow-none text-red-700"},{default:t(()=>[a(L,{class:"bg-blue-6 text-xs",anchor:"top middle",self:"center middle",offset:[10,10]},{default:t(()=>[f(" Delete ")]),_:1})]),_:2},1032,["onClick"])):_("",!0)]),_:2},1024)])]),_:2},1024)]),_:2},1032,["props"])]),_:1},8,["rows","pagination","loading","onRequest","columns"])]),n("div",Ue,[a(B,{rows:l.rows,columns:l.columns,"row-key":"name",selection:"multiple",selected:r.selected,"onUpdate:selected":o[5]||(o[5]=e=>r.selected=e),filter:r.filter,grid:"","hide-header":""},{item:t(e=>[n("div",{class:"q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition",style:J(e.selected?"transform: scale(0.95);":"")},[a(R,{bordered:"",flat:"",class:W(e.selected?r.$q.dark.isActive?"bg-grey-9":"bg-grey-2":"")},{default:t(()=>[a(N,{class:"flex justify-between bg-green text-white"},{default:t(()=>[a(X,{dense:"",modelValue:e.selected,"onUpdate:modelValue":s=>e.selected=s,label:e.row.name,color:"white","keep-color":""},null,8,["modelValue","onUpdate:modelValue","label"]),n("div",Ve,[a(w,{flat:"",icon:"more_vert"},{default:t(()=>[a(oe,{anchor:"top middle",self:"top right"},{default:t(()=>[l.authStore.canAccess("user_create")?(u(),p(A,{key:0,clickable:"",onClick:s=>l.openUserUpdateDialog(e.row)},{default:t(()=>[a(C,null,{default:t(()=>[f("Invite")]),_:1})]),_:2},1032,["onClick"])):_("",!0),l.authStore.canAccess("user_create")?(u(),p(A,{key:1,clickable:"",onClick:s=>l.deleteUser(e.row._id)},{default:t(()=>[a(C,null,{default:t(()=>[f("Delete")]),_:1})]),_:2},1032,["onClick"])):_("",!0)]),_:2},1024)]),_:2},1024)])]),_:2},1024),a(Y),a(se,{dense:""},{default:t(()=>[(u(!0),q(Z,null,$(e.cols.filter(s=>s.name!=="desc"),s=>(u(),p(A,{key:s.name},{default:t(()=>[a(C,null,{default:t(()=>[s.label!="Action"?(u(),p(S,{key:0},{default:t(()=>[f(m(s.label),1)]),_:2},1024)):_("",!0)]),_:2},1024),a(C,{side:""},{default:t(()=>[s.label=="Role"?(u(),p(S,{key:0,caption:""},{default:t(()=>{var g;return[f(m((g=s.value)==null?void 0:g.role_name),1)]}),_:2},1024)):(u(),p(S,{key:1,caption:""},{default:t(()=>[f(m(s.value),1)]),_:2},1024))]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),_:2},1032,["class"])],4)]),_:1},8,["rows","columns","selected","filter"])])])]),a(G,{modelValue:l.userUpdateDialog,"onUpdate:modelValue":o[12]||(o[12]=e=>l.userUpdateDialog=e),class:"",persistent:""},{default:t(()=>[a(R,{class:"my-card p-10",style:{width:"1020px","max-width":"80vw"}},{default:t(()=>[a(N,{class:"grid grid-cols-2 gap-5"},{default:t(()=>[a(k,{outlined:"",modelValue:l.updateCandidate.first_name,"onUpdate:modelValue":o[6]||(o[6]=e=>l.updateCandidate.first_name=e),placeholder:"First Name","bg-color":"white",dense:!0},null,8,["modelValue"]),a(k,{outlined:"",modelValue:l.updateCandidate.last_name,"onUpdate:modelValue":o[7]||(o[7]=e=>l.updateCandidate.last_name=e),placeholder:"Last Name","bg-color":"white",dense:!0},null,8,["modelValue"]),a(k,{outlined:"",modelValue:l.updateCandidate.email,"onUpdate:modelValue":o[8]||(o[8]=e=>l.updateCandidate.email=e),placeholder:"Email",dense:!0},{prepend:t(()=>[a(P,{name:"mail"})]),_:1},8,["modelValue"]),a(k,{outlined:"",modelValue:l.updateCandidate.phone_number,"onUpdate:modelValue":o[9]||(o[9]=e=>l.updateCandidate.phone_number=e),placeholder:"Phone Number",dense:!0},{prepend:t(()=>[a(P,{name:"phone"})]),_:1},8,["modelValue"])]),_:1}),a(ee,{align:"center",class:"row mx-2 py-5"},{default:t(()=>[a(w,{label:"Invite",color:"green",class:"col",onClick:o[10]||(o[10]=e=>l.updateUserInfo())}),a(w,{label:"Cancel",color:"negative",class:"col",onClick:o[11]||(o[11]=e=>l.userUpdateDialog=!1)})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}var Me=z(me,[["render",xe]]);export{Me as default};
