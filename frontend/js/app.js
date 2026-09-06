function go(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
function openM(id){document.getElementById(id)?.classList.add('open'); if(id==='sevaM')refreshSeva()}
function closeM(id){document.getElementById(id)?.classList.remove('open')}
async function bookDemo(btn){
 let card=btn.closest('.miniCard'), title=card?.querySelector('b')?.innerText||'Cultural experience';
 btn.innerText='SAVING…';
 try{await API.post('/experiences',{title,kind:'Adopt a Tradition'});btn.innerText='ADDED + SAVED ✓';btn.disabled=true;refreshPassport()}
 catch(e){btn.innerText='ADDED (DEMO) ✓';btn.disabled=true}
}
async function earnSeva(activity,credits,btn){
 try{let w=await API.post('/seva/earn',{activity,credits});btn.innerText=`+${credits} SAVED ✓`;document.querySelectorAll('.sevaCredits').forEach(x=>x.textContent=w.credits)}
 catch(e){btn.innerText='DEMO ONLY'}
}
async function redeemSeva(btn){
 try{let w=await API.post('/seva/redeem',{activity:'Community stay discount',credits:50});btn.innerText='50 CREDITS REDEEMED ✓';document.querySelectorAll('.sevaCredits').forEach(x=>x.textContent=w.credits)}
 catch(e){btn.innerText='Unable to redeem'}
}
async function submitPriority(btn){
 let category=document.getElementById('priorityCategory')?.value||'Accessibility need';
 try{let x=await API.post('/priority',{category,note:'Prototype transparent assistance request'});btn.innerText=`REQUEST #${x.id} SAVED ✓`}
 catch(e){btn.innerText='REQUEST CREATED (DEMO)'}
}
async function generateDocumentary(btn){
 btn.innerText='GENERATING…';
 try{let x=await API.post('/documentary',{});btn.innerText='DOCUMENTARY GENERATED ✓';let out=document.getElementById('docOut');if(out)out.innerHTML=`<b>${x.title}</b><br>${x.chapters.length} journey moments assembled • ${x.narration}`}
 catch(e){btn.innerText='DOCUMENTARY DEMO ✓'}
}
function toggleLang(){document.querySelector('.navtag').innerText=document.querySelector('.navtag').innerText.includes('not')?'सिर्फ़ यात्रा नहीं • एक कहानी':'not a trip. a story.';document.querySelector('.hero p').innerText=document.querySelector('.hero p').innerText.startsWith('Follow')?'तीर्थ, ध्वनियों, पुरानी तस्वीरों, कारीगरों और जीवित परंपराओं के साथ भारत की कहानी खोजिए।':'Follow a sacred thread through pilgrimages, disappearing sounds, family photographs, artisan stories and traditions that are still alive.'}
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));
