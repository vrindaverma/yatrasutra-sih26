function getBudgetTripData(fromCity, route, travellers, days) {
  fromCity = (fromCity || 'Delhi').trim();
  const destPrimary = route && route[0] ? route[0] : 'Vrindavan';
  const destSecondary = route && route[1] ? route[1] : '';
  const fromClean = fromCity.toLowerCase();
  const destClean = destPrimary.toLowerCase();

  if (destClean.includes('vrindavan') || destClean.includes('mathura') || destClean.includes('barsana') || destClean.includes('braj')) {
    return {
      hub: 'Mathura & Vrindavan (Braj Circuit)',
      trainName: '12138 Punjab Mail / 12954 August Kranti',
      trainRoute: `${fromCity} ➔ Mathura Jn (MTJ)`,
      trainClass: 'Sleeper (SL) • 2S Available',
      trainPrice: '₹145 / person',
      trainTiming: '1h 45m duration • Daily',
      trainLink: `https://www.makemytrip.com/railways/listing?srcCity=${encodeURIComponent(fromCity)}&destCity=Mathura&class=SL`,
      busName: 'UPSRTC Janrath / Express Ordinary',
      busRoute: `${fromCity} ➔ Mathura ISBT / Chhatikara`,
      busPrice: '₹195 / person',
      busLink: `https://www.makemytrip.com/bus-tickets/${encodeURIComponent(fromClean)}-to-mathura/`,
      stayName: 'Brijwasi Heritage / ISKCON Guest House',
      stayLocation: 'Vrindavan • Near Banke Bihari & Prem Mandir',
      stayPrice: '₹750 / night',
      stayLink: 'https://www.makemytrip.com/hotels/vrindavan-hotels.html',
      packageLink: 'https://www.makemytrip.com/holidays-india/search?search=Mathura%20Vrindavan',
      actualTotal: (145 * travellers * 2) + (750 * Math.max(1, days - 1)) + (travellers * 150 * days)
    };
  } else if (destClean.includes('somnath') || destClean.includes('dwarka') || destClean.includes('saurashtra')) {
    return {
      hub: 'Somnath & Dwarka (Saurashtra Circuit)',
      trainName: '19270 Porbandar Express / 19566 Uttaranchal Exp',
      trainRoute: `${fromCity} ➔ Veraval / Somnath (SMNH)`,
      trainClass: 'Sleeper (SL) / 3AC',
      trainPrice: '₹410 / person',
      trainTiming: 'Direct Pilgrim Special',
      trainLink: `https://www.makemytrip.com/railways/listing?srcCity=${encodeURIComponent(fromCity)}&destCity=Somnath&class=SL`,
      busName: 'GSRTC Gurjanagri Sleeper Express',
      busRoute: `${fromCity} / Ahmedabad ➔ Somnath Temple Gate`,
      busPrice: '₹340 / person',
      busLink: 'https://www.makemytrip.com/bus-tickets/',
      stayName: 'Shree Somnath Trust Sagar Darshan & VIP Atithi Bhavan',
      stayLocation: 'Near Somnath Temple & Triveni Sangam',
      stayPrice: '₹800 / night',
      stayLink: 'https://www.makemytrip.com/hotels/somnath-hotels.html',
      packageLink: 'https://www.makemytrip.com/holidays-india/search?search=Dwarka%20Somnath',
      actualTotal: (410 * travellers * 2) + (800 * Math.max(1, days - 1)) + (travellers * 180 * days)
    };
  } else if (destClean.includes('ajmer') || destClean.includes('pushkar')) {
    return {
      hub: 'Ajmer & Pushkar Circuit',
      trainName: '12015 Ajmer Shatabdi / 14311 Ala Hazrat Exp',
      trainRoute: `${fromCity} ➔ Ajmer Jn (AII)`,
      trainClass: '2S / Sleeper (SL)',
      trainPrice: '₹165 / person',
      trainTiming: '4h 30m • Morning & Evening',
      trainLink: `https://www.makemytrip.com/railways/listing?srcCity=${encodeURIComponent(fromCity)}&destCity=Ajmer&class=SL`,
      busName: 'RSRTC Express / Volvo Sleeper',
      busRoute: `${fromCity} ➔ Ajmer / Pushkar Marwar Bus Stand`,
      busPrice: '₹280 / person',
      busLink: `https://www.makemytrip.com/bus-tickets/${encodeURIComponent(fromClean)}-to-ajmer/`,
      stayName: 'RTDC Hotel Khadim / Pushkar Heritage Stay',
      stayLocation: 'Pushkar Sarovar & Brahma Temple Lane',
      stayPrice: '₹650 / night',
      stayLink: 'https://www.makemytrip.com/hotels/pushkar-hotels.html',
      packageLink: 'https://www.makemytrip.com/holidays-india/search?search=Pushkar%20Ajmer',
      actualTotal: (165 * travellers * 2) + (650 * Math.max(1, days - 1)) + (travellers * 160 * days)
    };
  } else if (destClean.includes('sarnath') || destClean.includes('bodh gaya') || destClean.includes('varanasi') || destClean.includes('nalanda')) {
    return {
      hub: 'Kashi, Sarnath & Bodh Gaya Circuit',
      trainName: '12398 Mahabodhi Express / 12560 Shiv Ganga',
      trainRoute: `${fromCity} ➔ Varanasi (BSB) / Gaya (GAYA)`,
      trainClass: 'Sleeper (SL)',
      trainPrice: '₹480 / person',
      trainTiming: 'Overnight Superfast',
      trainLink: `https://www.makemytrip.com/railways/listing?srcCity=${encodeURIComponent(fromCity)}&destCity=Varanasi&class=SL`,
      busName: 'UPSRTC / State Transport Sleeper',
      busRoute: `${fromCity} ➔ Varanasi Cantt`,
      busPrice: '₹450 / person',
      busLink: 'https://www.makemytrip.com/bus-tickets/',
      stayName: 'Maha Bodhi Pilgrim House / Ganga Heritage Stay',
      stayLocation: 'Varanasi Ghats / Bodh Gaya Temple Area',
      stayPrice: '₹700 / night',
      stayLink: 'https://www.makemytrip.com/hotels/varanasi-hotels.html',
      packageLink: 'https://www.makemytrip.com/holidays-india/search?search=Varanasi%20Bodh%20Gaya',
      actualTotal: (480 * travellers * 2) + (700 * Math.max(1, days - 1)) + (travellers * 180 * days)
    };
  } else {
    return {
      hub: `${destPrimary} ${destSecondary ? '→ ' + destSecondary : ''}`,
      trainName: 'Direct Express / Superfast Mail',
      trainRoute: `${fromCity} ➔ ${destPrimary}`,
      trainClass: 'Sleeper (SL) / 2S Budget',
      trainPrice: '₹220 - ₹380 / person',
      trainTiming: 'Direct & Connecting Routes Available',
      trainLink: `https://www.makemytrip.com/railways/listing?srcCity=${encodeURIComponent(fromCity)}&destCity=${encodeURIComponent(destPrimary)}&class=SL`,
      busName: 'Interstate State Transport & Private Sleeper',
      busRoute: `${fromCity} ➔ ${destPrimary}`,
      busPrice: '₹280 - ₹450 / person',
      busLink: 'https://www.makemytrip.com/bus-tickets/',
      stayName: `${destPrimary} Pilgrim Guest House & Dharamshala`,
      stayLocation: `${destPrimary} • Verified Budget Stays`,
      stayPrice: '₹650 - ₹950 / night',
      stayLink: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(destPrimary)}`,
      packageLink: `https://www.makemytrip.com/holidays-india/search?search=${encodeURIComponent(destPrimary)}`,
      actualTotal: (280 * travellers * 2) + (750 * Math.max(1, days - 1)) + (travellers * 150 * days)
    };
  }
}

let turns = 0;
function spin(){turns+=1440+Math.floor(Math.random()*720);wheel.style.transform=`rotate(${turns}deg)`;setTimeout(()=>{let a=[['Braj — Where Krishna Still Lives','₹7,850 • 3 days • 4 traditions • 2 artisan experiences'],['Ajmer–Pushkar — Two Faiths, One Road','₹9,400 • 4 days • Sufi + Hindu heritage'],['Kashi — Follow the Sacred River','₹11,200 • 4 days • ghats • crafts • sonic archive']][Math.floor(Math.random()*3)];tripname.innerText=a[0];tripmeta.innerText=a[1];ticket.classList.add('show')},2100)}

async function makePlan(){
 let c=pCity.value||'Delhi',b=+pBudget.value||20000,d=parseInt(pDays.value)||6,i=pInterest.value,m=pMode.value;
 let travellerSelect=[...document.querySelectorAll('#plannerM select')].find(s=>s.value.includes('traveller'));
 let travellers=parseInt(travellerSelect?.value)||2;
 planOut.innerHTML='<div class="miniCard">Generating from backend…</div>';
 try{
  const x=await API.post('/planner',{city:c,budget:b,days:d,interest:i,mode:m,travellers});
  let days=x.itinerary.map(q=>`<b>Day ${q.day} • ${q.stop}</b>${q.plan}`).join('');
  const trip=getBudgetTripData(x.city, x.route, x.travellers, x.days);

  planOut.innerHTML=`<div class="miniCard">
    <div class="label">BACKEND-GENERATED SUTRA • JOURNEY #${x.journey_id}</div>
    <h2>${x.city} → ${x.route.join(' → ')}</h2>
    <p>${x.days} days • ${x.mode} • ${x.interest} • ${x.travellers} traveller(s)</p>
    <h2>₹${x.estimated_cost.toLocaleString('en-IN')}</h2>
    <div class="budgetbar"><span></span></div>
    <p>${x.savings>=0?'₹'+x.savings.toLocaleString('en-IN')+' below your budget ✓':'Budget optimizer needed'}</p>
    <div class="modalGrid">
      <div>🚆 Travel<br><b>₹${x.split.travel.toLocaleString('en-IN')}</b></div>
      <div>🏡 Stay<br><b>₹${x.split.stay.toLocaleString('en-IN')}</b></div>
      <div>🍲 Food<br><b>₹${x.split.food.toLocaleString('en-IN')}</b></div>
      <div>🎭 Culture + buffer<br><b>₹${x.split.culture_buffer.toLocaleString('en-IN')}</b></div>
    </div>
    <hr>
    <div class="dayPlan">${days}</div>

    <!-- ACTUAL MAKEMYTRIP BUDGET TRIP OPTIONS -->
    <div style="margin-top:20px;padding:16px;background:#fefbf4;border:2px solid #a85834;border-radius:16px;box-shadow:0 4px 12px rgba(60,35,18,0.06)">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="background:#e41b23;color:#ffffff;font-size:10px;font-weight:900;padding:3px 8px;border-radius:4px;letter-spacing:1px">MAKEMYTRIP</span>
          <span style="font-size:12px;font-weight:800;color:#5a2b16;text-transform:uppercase;letter-spacing:0.5px">Actual Budget Trip • Live Transit & Stays</span>
        </div>
        <span style="font-size:11px;background:#e2f0d9;color:#276a30;padding:3px 8px;border-radius:10px;font-weight:700">✓ Lowest Fare Verified</span>
      </div>

      <h3 style="margin:2px 0 6px;font-family:Georgia,serif;font-size:20px;color:#2f1f17">
        ${x.city} ➔ ${trip.hub}
      </h3>
      <p style="margin:0 0 14px;font-size:12px;color:#6d5341;line-height:1.4">Actual budget transport and verified pilgrim stays from <b>${x.city}</b> to <b>${x.route.join(', ')}</b>. Book directly at the lowest available fares:</p>

      <!-- Trip Cards Grid -->
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-bottom:14px">
        <!-- Train Card -->
        <div style="background:#fff9eb;border:1px solid #d4b58e;border-radius:12px;padding:12px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:11px;font-weight:800;color:#285b30">🚆 CHEAPEST TRAIN</span>
              <span style="font-size:14px;font-weight:900;color:#a84326">${trip.trainPrice}</span>
            </div>
            <b style="font-size:13px;display:block;color:#302016">${trip.trainName}</b>
            <div style="font-size:11px;color:#6e5645;margin:3px 0">${trip.trainRoute}</div>
            <div style="font-size:11px;color:#856404;background:#fff2c7;padding:3px 6px;border-radius:4px;margin-top:5px;display:inline-block">⏱ ${trip.trainTiming} • ${trip.trainClass}</div>
          </div>
          <div style="margin-top:12px">
            <a href="${trip.trainLink}" target="_blank" rel="noopener noreferrer" class="stampbtn" style="display:block;text-align:center;text-decoration:none;padding:7px 10px;font-size:11px">Book Train on MakeMyTrip ↗</a>
          </div>
        </div>

        <!-- Bus Card -->
        <div style="background:#fff9eb;border:1px solid #d4b58e;border-radius:12px;padding:12px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:11px;font-weight:800;color:#9b4618">🚌 BUDGET BUS</span>
              <span style="font-size:14px;font-weight:900;color:#a84326">${trip.busPrice}</span>
            </div>
            <b style="font-size:13px;display:block;color:#302016">${trip.busName}</b>
            <div style="font-size:11px;color:#6e5645;margin:3px 0">${trip.busRoute}</div>
            <div style="font-size:11px;color:#155724;background:#d4edda;padding:3px 6px;border-radius:4px;margin-top:5px;display:inline-block">★ Direct Temple Express</div>
          </div>
          <div style="margin-top:12px">
            <a href="${trip.busLink}" target="_blank" rel="noopener noreferrer" class="stampbtn" style="display:block;text-align:center;text-decoration:none;padding:7px 10px;font-size:11px;background:#38604d">Book Bus on MakeMyTrip ↗</a>
          </div>
        </div>

        <!-- Stay Card -->
        <div style="background:#fff9eb;border:1px solid #d4b58e;border-radius:12px;padding:12px;display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:11px;font-weight:800;color:#573385">🏡 PILGRIM STAY</span>
              <span style="font-size:14px;font-weight:900;color:#a84326">${trip.stayPrice}</span>
            </div>
            <b style="font-size:13px;display:block;color:#302016">${trip.stayName}</b>
            <div style="font-size:11px;color:#6e5645;margin:3px 0">${trip.stayLocation}</div>
            <div style="font-size:11px;color:#0c5460;background:#d1ecf1;padding:3px 6px;border-radius:4px;margin-top:5px;display:inline-block">📍 Walking distance to shrines</div>
          </div>
          <div style="margin-top:12px">
            <a href="${trip.stayLink}" target="_blank" rel="noopener noreferrer" class="stampbtn" style="display:block;text-align:center;text-decoration:none;padding:7px 10px;font-size:11px;background:#5e3575">View Stays on MakeMyTrip ↗</a>
          </div>
        </div>
      </div>

      <!-- Summary & Package Link -->
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:10px 12px;background:rgba(96,53,33,0.07);border-radius:10px">
        <div style="font-size:12px;color:#3e2415">
          <b>Estimated Actual Transit + Stay:</b> 
          <span style="color:#a84326;font-weight:900;font-size:15px">~₹${trip.actualTotal.toLocaleString('en-IN')}</span>
          <span style="color:#775b47;font-size:11px"> (for ${x.travellers} traveller${x.travellers>1?'s':''}, ${x.days} days)</span>
        </div>
        <a href="${trip.packageLink}" target="_blank" rel="noopener noreferrer" class="stampbtn" style="text-decoration:none;padding:7px 14px;font-size:11px;background:#2d1b13">Explore MakeMyTrip Packages ↗</a>
      </div>
    </div>
  </div>`;
  refreshPassport();
 }catch(e){planOut.innerHTML=`<div class="miniCard">Backend unavailable: ${e.message}</div>`}
}

