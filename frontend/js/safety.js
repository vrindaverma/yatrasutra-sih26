async function sendSOS(){
 sos.innerText='RELAYING…';sostxt.innerText='Searching nearby relay devices…';
 try{let x=await API.post('/sos',{kind:'Pilgrim SOS'});sos.innerText='SENT ✓';sostxt.innerText=`SOS persisted • relayed across ${x.relays} devices → ${x.status}`}
 catch(e){sos.innerText='SENT (DEMO) ✓';sostxt.innerText='Backend unavailable • visual mesh simulation only'}
}
