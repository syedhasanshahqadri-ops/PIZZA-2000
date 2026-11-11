const U=i=>i.startsWith('http')?i:`https://images.unsplash.com/photo-${i}?w=600&q=70&auto=format&fit=crop`;
const IMG={Pizza:['1513104890138-7c749659a591','1565299624946-b28f40a0ae38','1574071318508-1cdbab80d002','1571407970349-bc81e7e96d47','1594007654729-407eedc4be65'],
Pasta:['1621996346565-e3dbc646d9a9','1551183053-bf91a1d81141'],'Garlic Bread':['https://unsplash.com/photos/BRMvT4sw-4c/download?force=true&w=700','https://unsplash.com/photos/ZibrloV_aEY/download?force=true&w=700'],Broast:['1626645738196-c2a7c87a8f58','1562967914-608f82629710'],
Burgers:['1568901346375-23c9450c58cd','1550547660-d9450f859349','1571091718767-18b5b1457add'],Sandwiches:['1528735602780-2552fd46c7af','1509722747041-616f39b57569'],Fries:['1573080496219-bb080dd4f877','1630384060421-cb20d0e0649d']};
const P=(n,l,s,d)=>({n:'Pizza '+n,d,o:[['Large',l],['Small',s]]}),S=(n,p,d='')=>({n,d,o:[['Regular',p]]});
const MENU={Pizza:[P('Jalapeno',1040,520,'Vinegared jalapeno, onions, chicken, bell pepper, cheddar, red sauce'),P('Mexican',1040,520,'Spicy creamy sauce, bell pepper, onions, chicken, cheddar'),P('2000 Special',1050,520,'Cheddar, spicy chicken, sausages, capsicum, green chillies, olives'),P('Kabab',1040,520,'Tomato sauce, cheese, kabab pieces, onion, olives, green chilli'),P('Afghani Feast',1020,510,'Cheese, Italian sauce, Afghani chicken, mushroom, onions'),P('Malai Boti',1040,520,'Malai chicken, mouth-watering cheese, sauce, black olive'),P('Arabian',1040,520,'Peproni, chicken, olives, cheese, onion, green chilli'),P('Euro',1050,520,'Peproni, sausages, bell pepper, cheese, olive, green chilli'),P('Smoke Tikka',1030,520,'Smoked chicken, olive, onion, green chilli, capsicum'),P('Supreme',1040,520,'Cheese, chicken, peproni, sausages, onions, olive, bell pepper'),P('Napoli',1020,510,'Italian tomato sauce, mashed chicken, cheese, garlic, origano'),P('Chicken Tikka',1050,520,'Cheese, tomato sauce, garlic, origano, mushrooms, chicken chunks'),P('Fajita',1040,520,'Italian sauce, fajita chicken, onions, bell pepper, black olives'),P('Tandori',1020,510,'Tandori chicken, vinegared chilli, onions, mushrooms, green chilli'),P('Shawarma',1030,520,'Cheese, chicken shawarma, black olives, onions, bell pepper'),P('Capri',1020,510,'Melted cheese, beef mince, mashed chicken, origano, black olives'),P('Millano',1020,510,'Cheese, beef mince, mushrooms, tomato sauce, garlic origano'),P('Florance',1020,510,'Italian tomato sauce, cheese, peproni, mushrooms, bell pepper'),P('Venice (Vegetable)',1000,500,'Peprica tomato sauce, mushrooms, garlic origano, black olives'),P('Pioneer (2000)',1050,520,'Sweet corn, sauce, mushrooms, red sausages, full of cheese'),P('Plain',980,480,'Pizza for cheese lovers')],
Pasta:[S('Pasta Large Box',750,'White sauce, chicken, olive, mushrooms, cheese'),S('Pasta Small Box',550,'White sauce, chicken, olive, mushrooms, cheese')],
'Garlic Bread':[S('Garlic Bread Special (4 pcs)',180),S('Garlic Cheese Bread (4 pcs)',150)],
Broast:[S('Full Chicken Broast and Fries',2280),S('Half Chicken Broast and Fries',1140),S('Quarter Broast, Leg',560,'With fries'),S('Quarter Broast, Chest',580,'With fries')],
Burgers:[S('Chicken Burger with Fries',420),S('Chicken Cheese Burger with Fries',470),S('Chicken Jumbo Burger with Fries',740),S('Chicken Cheese Jumbo Burger',790,'With fries'),S('Zinger Burger with Fries',500),S('Zinger Cheese Burger with Fries',550),S('Beef Burger with Fries',420),S('Beef Cheese Burger with Fries',470),S('Beef Jumbo Burger with Fries',740),S('Beef Cheese Jumbo Burger',790,'With fries')],
Sandwiches:[S('Club Sandwich with Fries',480),S('Chicken Sandwich with Fries',420)],
Fries:[S('Plain Fries',220),S('Masala Fries',270),S('Pizza Fries',400)]};
const FEE=200,PAY={Easypaisa:'0300 1234567',JazzCash:'0301 7654321'},$=s=>document.querySelector(s),rs=n=>'Rs. '+n.toLocaleString('en-PK');
let cart=JSON.parse(localStorage.getItem('p2k-cart')||'[]'),cat='Pizza';
// theme
const th=$('#theme'),syncT=()=>th.textContent=document.documentElement.dataset.theme==='dark'?'Light':'Dark';syncT();
th.onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;localStorage.setItem('p2k-theme',t);syncT()};
// menu
function tabs(){$('#tabs').innerHTML=Object.keys(MENU).map(c=>`<button role="tab" aria-selected="${!qs&&c===cat}" data-c="${c}">${c}</button>`).join('');
$('#tabs').onclick=e=>{if(e.target.dataset.c){cat=e.target.dataset.c;qs='';$('#q').value='';$('#qx').hidden=true;tabs();grid()}}}
let qs='';
const GARLIC='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 275"><defs><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FDBA74"/><stop offset="1" stop-color="#F97316"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8cf7a"/><stop offset="1" stop-color="#dc9136"/></linearGradient></defs><rect width="400" height="275" fill="url(#a)"/><ellipse cx="200" cy="228" rx="160" ry="16" fill="#7F1D1D" opacity=".3"/>'+[0,1,2,3].map(i=>`<g transform="translate(${52+i*76} 62) rotate(${i%2?4:-4} 34 70)"><rect width="68" height="148" rx="32" fill="#a85a1a"/><rect x="6" y="6" width="56" height="136" rx="27" fill="url(#b)"/><path d="M12 34q22 12 44 0v52q-22 12-44 0z" fill="#fde68a" opacity=".9"/><ellipse cx="24" cy="52" rx="5" ry="3" fill="#15803d"/><ellipse cx="42" cy="66" rx="5" ry="3" fill="#16a34a"/><ellipse cx="30" cy="80" rx="4" ry="2.5" fill="#15803d"/><circle cx="44" cy="46" r="3" fill="#fffbeb"/><circle cx="22" cy="68" r="2.5" fill="#fffbeb"/></g>`).join('')+'</svg>');
function list(){const ws=qs.toLowerCase().split(/\s+/).filter(Boolean);return ws.length?Object.entries(MENU).flatMap(([c,a])=>a.map((it,i)=>({c,i,it}))).filter(x=>ws.every(w=>(x.it.n+' '+x.it.d+' '+x.c).toLowerCase().includes(w))):MENU[cat].map((it,i)=>({c:cat,i,it}))}
const item=c=>MENU[c.dataset.c][c.dataset.i];
function refresh(c){const it=item(c),k=+c.dataset.k,o=it.o[k],f=cart.find(x=>x.id===it.n+'|'+o[0]);c.querySelector('.price').textContent=rs(o[1]);c.classList.toggle('has',!!f);c.querySelectorAll('.sz').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.k===k));
c.querySelector('.act').innerHTML=f?`<div class="step"><button data-a="-1" aria-label="Remove one">-</button><span>${f.q}</span><button data-a="1" aria-label="Add one">+</button></div>`:'<button class="add" data-a="1">Add to cart</button>'}
function grid(){const L=list(),inf=$('#qinfo');inf.hidden=!qs.trim();inf.textContent=`${L.length} result${L.length===1?'':'s'} for "${qs.trim()}"`;
$('#grid').innerHTML=L.length?L.map(({c,i,it},n)=>{const im=IMG[c];return `<article class="item" style="--i:${n%8}" data-c="${c}" data-i="${i}" data-k="0"><div class="ph"><img loading="lazy" src="${U(im[i%im.length])}" alt="${it.n}" onerror="this.onerror=null;${c==='Garlic Bread'?'this.src=GARLIC':'this.remove()'}"></div><div class="ib"><h3>${it.n}</h3><p>${it.d}</p>${it.o.length>1?`<div class="sizes" role="group" aria-label="Size">${it.o.map((o,k)=>`<button class="sz" data-k="${k}">${o[0]}</button>`).join('')}</div>`:''}<div class="row"><span class="price"></span><span class="act"></span></div></div></article>`}).join(''):'<p class="empty">No items found. Try another word like pizza, burger or fries.</p>';
document.querySelectorAll('.item').forEach(refresh);watch()}
$('#grid').onclick=e=>{const c=e.target.closest('.item');if(!c)return;const s=e.target.closest('.sz');if(s){c.dataset.k=s.dataset.k;return refresh(c)}const a=e.target.closest('[data-a]');if(!a)return;const it=item(c),o=it.o[c.dataset.k],id=it.n+'|'+o[0],f=cart.find(x=>x.id===id);if(!f)cart.push({id,n:it.n,o:o[0],p:o[1],q:1});else{f.q+=+a.dataset.a;if(f.q<1)cart.splice(cart.indexOf(f),1)}save()};
$('#q').oninput=e=>{qs=e.target.value;$('#qx').hidden=!qs;tabs();grid()};
$('#qx').onclick=()=>{qs='';$('#q').value='';$('#qx').hidden=true;tabs();grid();$('#q').focus()};
// cart
const sub=()=>cart.reduce((a,x)=>a+x.p*x.q,0);
function save(){localStorage.setItem('p2k-cart',JSON.stringify(cart));$('#cnt').textContent=cart.reduce((a,x)=>a+x.q,0);
$('#lines').innerHTML=cart.length?cart.map((x,i)=>`<div class="ln"><b>${x.n}</b><span>${rs(x.p*x.q)}</span><small>${x.o}</small><span></span><div class="q"><button data-d="-1" data-i="${i}">-</button>${x.q}<button data-d="1" data-i="${i}">+</button></div></div>`).join(''):'<p class="sub">Your cart is empty. Pick something from the menu.</p>';
$('#sub').textContent=rs(sub());$('#tot').textContent=rs(sub()+(cart.length?FEE:0));$('#place').disabled=closed||!cart.length;document.querySelectorAll('.item').forEach(refresh)}
$('#lines').onclick=e=>{const d=e.target.dataset.d;if(!d)return;const x=cart[e.target.dataset.i];x.q+=+d;if(x.q<1)cart.splice(e.target.dataset.i,1);save()};
const dr=$('#drawer'),tog=o=>{dr.classList.toggle('open',o);$('#scrim').hidden=!o;dr.setAttribute('aria-hidden',!o)};
$('#cartBtn').onclick=()=>tog(true);$('#close').onclick=$('#scrim').onclick=()=>tog(false);
const txnWrap=()=>$('#txnWrap'),txnIn=()=>document.querySelector('#co [name=txn]');
function resetPay(){txnWrap().style.display='';txnIn().required=true}
document.querySelectorAll('[name=pay]').forEach(r=>r.onchange=()=>{const b=$('#payBox'),cod=r.value==='Cash on Delivery';b.hidden=false;txnWrap().style.display=cod?'none':'';txnIn().required=!cod;if(cod)txnIn().value='';
b.innerHTML=cod?`Pay <b>${rs(sub()+FEE)}</b> in cash to our rider when your order arrives. No advance payment needed.`:`Send <b>${rs(sub()+FEE)}</b> to <b>${r.value}</b> number <b>${PAY[r.value]}</b> (account: Pizza 2000), then enter the transaction ID below.`});
// firebase
const ok=window.FB_CONFIG&&FB_CONFIG.projectId,db=ok?(firebase.initializeApp(FB_CONFIG),firebase.firestore()):null;
// ---- open / closed status (set from staff panel) ----
let closed=false;const closedMsg='Pizza 2000 is currently closed';
const cb=document.createElement('div');cb.hidden=true;cb.setAttribute('role','alert');cb.style.cssText='background:#7F1D1D;color:#fff;text-align:center;font-weight:700;padding:10px 16px';cb.textContent=closedMsg;document.body.prepend(cb);
function shop(){cb.hidden=!closed;const b=$('#place'),er=$('#err');b.disabled=closed||!cart.length;if(closed){er.textContent=closedMsg+'. Orders cannot be placed right now.';er.hidden=false}else if(er.textContent.indexOf(closedMsg)===0){er.hidden=true}}
if(db)db.collection('settings').doc('store').onSnapshot(d=>{closed=d.exists&&d.data().open===false;shop()},()=>{});
$('#co').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),b=$('#place'),er=$('#err');if(closed){shop();return}er.hidden=true;b.disabled=true;b.textContent='Placing order';
const id='P2K-'+Date.now().toString(36).toUpperCase().slice(-6),o={id,name:f.get('name'),phone:f.get('phone'),address:f.get('addr'),location:LOC&&LOC.lat!=null?{lat:LOC.lat,lng:LOC.lng,accuracy:LOC.accuracy||null}:null,payment:f.get('pay'),txn:f.get('pay')==='Cash on Delivery'?'N/A (COD)':f.get('txn'),items:cart.map(({n,o,p,q})=>({n,o,p,q})),subtotal:sub(),delivery:FEE,total:sub()+FEE,status:'New'};
try{if(db){o.createdAt=firebase.firestore.FieldValue.serverTimestamp();await db.collection('orders').doc(id).set(o)}else throw new Error('Firebase is not configured yet. Add your config in firebase-config.js.');
cart=[];save();e.target.reset();resetPay();$('#payBox').hidden=true;tog(false);$('#oid').textContent=id;$('#done').hidden=false}
catch(x){er.textContent=x.code==='permission-denied'?closedMsg+'. Orders cannot be placed right now.':'Order not sent. '+x.message;er.hidden=false}b.disabled=closed||!cart.length;b.textContent='Place order'};
$('#ok').onclick=()=>$('#done').hidden=true;
$('#msg').onsubmit=e=>{e.preventDefault();$('#msgOk').hidden=false;e.target.reset()};
// ---- motion and 3D effects ----
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover)').matches&&!calm;
document.querySelectorAll('h2').forEach(h=>{const t=h.textContent;h.setAttribute('aria-label',t);h.innerHTML=[...t].map((c,i)=>`<span aria-hidden="true" style="--i:${i}">${c===' '?'&nbsp;':c}</span>`).join('');h.classList.add('split')});
function count(el){const n=+el.dataset.n,t0=performance.now();(function f(t){const p=Math.min(1,(t-t0)/1400);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);if(e.target.dataset.n)count(e.target)}}),{threshold:.15});
function watch(){document.querySelectorAll('.split:not(.in),.item:not(.in),[data-n]:not(.in)').forEach(x=>io.observe(x))}
const hero=$('.hero');
for(let i=0;i<7;i++){const e=document.createElement('span');e.className='ember';e.style.cssText=`--x:${6+i*14}%;--d:-${i*1.1}s`;hero.prepend(e)}
$('#orbit').innerHTML=['pep','bas','oli','pep','bas','pep','oli','bas','pep','oli'].map((c,i)=>`<i class="t ${c}" style="--a:${i*36}deg;--r:calc(var(--W)*${i%2?.56:.5});--s:calc(var(--W)*${.07+(i%3)*.02});--z:${40+i%4*25}px"></i>`).join('');
const WD=['hot','cheesy','spicy','fresh','crispy'],wd=$('#words');let wi=0;
setInterval(()=>{wi=(wi+1)%WD.length;wd.textContent=WD[wi];wd.classList.remove('flipin');void wd.offsetWidth;wd.classList.add('flipin')},2200);
const nm=Object.values(MENU).flat().map(x=>`<span>${x.n}</span>`).join('');$('#mt').innerHTML=nm+nm;
if(fine){const sc=$('#stage');
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();sc.style.setProperty('--rx',(-((e.clientY-r.top)/r.height-.5)*18)+'deg');sc.style.setProperty('--ry',(((e.clientX-r.left)/r.width-.5)*26)+'deg')});
hero.addEventListener('pointerleave',()=>{sc.style.setProperty('--rx','0deg');sc.style.setProperty('--ry','0deg')});
document.addEventListener('pointermove',e=>{const c=e.target.closest('.item,.tilt');if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.transform=`perspective(900px) rotateX(${(.5-y)*10}deg) rotateY(${(x-.5)*12}deg) translateY(-6px)`;c.style.setProperty('--gx',x*100+'%');c.style.setProperty('--gy',y*100+'%');c.style.setProperty('--px',x-.5);c.style.setProperty('--py',y-.5)});
document.addEventListener('pointerout',e=>{const c=e.target.closest('.item,.tilt');if(c&&!c.contains(e.relatedTarget))c.style.transform=''})}
// ---- delivery location ----
let LOC=null,gpsNow=false;try{LOC=JSON.parse(localStorage.getItem('p2k-loc')||'null')}catch(e){}
const addrBox=()=>document.querySelector('#co [name=addr]');
function locUI(){$('#locBtn').textContent=LOC&&LOC.address?'Deliver to: '+LOC.address:'Set your delivery location';if(LOC&&LOC.address&&addrBox()&&!addrBox().value)addrBox().value=LOC.address}
function openLoc(){gpsNow=false;$('#addr').value=LOC&&LOC.address||'';$('#gpsMsg').textContent='';$('#loc').hidden=false}
$('#locBtn').onclick=$('#chLoc').onclick=openLoc;
$('#locSkip').onclick=()=>{$('#loc').hidden=true;sessionStorage.setItem('p2k-skip','1')};
$('#gps').onclick=()=>{const m=$('#gpsMsg');if(!navigator.geolocation){m.textContent='Your browser cannot share location. Please type your address.';return}
m.textContent='Finding your location...';
navigator.geolocation.getCurrentPosition(async p=>{const lat=p.coords.latitude,lng=p.coords.longitude;let ad='';
try{const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);ad=(await r.json()).display_name||''}catch(e){}
LOC={...LOC,lat,lng,accuracy:Math.round(p.coords.accuracy)};gpsNow=true;
$('#addr').value=ad||$('#addr').value||`Pinned location ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
m.textContent='Location found. Add your house or flat number if needed, then save.'},
er=>{m.textContent=er.code===1?'Location permission was denied. Please type your address.':'Could not get your location. Please type your address.'},{enableHighAccuracy:true,timeout:15000})};
$('#locSave').onclick=()=>{const a=$('#addr').value.trim();if(!a){$('#gpsMsg').textContent='Please type your address or use your current location.';return}
if(!gpsNow&&LOC&&a!==LOC.address){delete LOC.lat;delete LOC.lng;delete LOC.accuracy}
LOC={...LOC,address:a};localStorage.setItem('p2k-loc',JSON.stringify(LOC));addrBox().value=a;$('#loc').hidden=true;locUI()};
$('nav').onclick=()=>$('.bar').classList.remove('open');
$('#burger').onclick=()=>{const o=$('.bar').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
tabs();grid();save();watch();locUI();
if(!(LOC&&LOC.address)&&!sessionStorage.getItem('p2k-skip'))setTimeout(openLoc,400);
