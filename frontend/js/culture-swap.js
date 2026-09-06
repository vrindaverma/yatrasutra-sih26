let idx=0, people=[
['🏺','Meera • Jaipur','32 years preserving Blue Pottery','Blue pottery','Product photography'],
['🧵','Rafiq • Varanasi','Third-generation handloom weaver','Banarasi weaving','Social media reels'],
['🎭','Kavita • Rajasthan','Folk storyteller & performer','Folk storytelling','Video editing']];
function next(){idx=(idx+1)%people.length;let p=people[idx];emoji.innerText=p[0];aname.innerText=p[1];bio.innerText=p[2];learn.innerText=p[3];help.innerText=p[4]}
async function match(){
 const btn=document.querySelector('.match'); btn.innerText='MATCHING…';
 try{await API.post('/cultureswap',{artisan:aname.innerText,learn:learn.innerText,help:help.innerText});btn.innerText='MATCHED + SAVED ✓';refreshPassport()}
 catch(e){btn.innerText='MATCHED (DEMO) ✓'}
 setTimeout(()=>{btn.innerText='CULTURESWAP →';next()},1000)
}
