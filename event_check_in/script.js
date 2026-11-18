const defaultGuests = [
  {id:1,name:"Maria Santos",ticket:"EVT-1001",org:"Student Council",email:"maria@example.com",checkedIn:true,checkinTime:"2026-11-16T08:05:00"},
  {id:2,name:"John Carlo Reyes",ticket:"EVT-1002",org:"BSIT Department",email:"john@example.com",checkedIn:true,checkinTime:"2026-11-16T08:12:00"},
  {id:3,name:"Angelica Mae Cruz",ticket:"EVT-1003",org:"IT Society",email:"angelica@example.com",checkedIn:false,checkinTime:null},
  {id:4,name:"Mark Anthony Dela Cruz",ticket:"EVT-1004",org:"Student Council",email:"mark@example.com",checkedIn:false,checkinTime:null}
];

let guests = JSON.parse(localStorage.getItem("eventCheckInGuests") || "null") || defaultGuests;
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

function save(){localStorage.setItem("eventCheckInGuests",JSON.stringify(guests))}
function initials(name){return name.split(/\s+/).map(x=>x[0]).slice(0,2).join("").toUpperCase()}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function timeText(v){if(!v)return "—";return new Date(v).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}
function dateText(v){if(!v)return "—";return new Date(v).toLocaleDateString([],{month:"short",day:"numeric"})}

function render(){
  const total=guests.length, inCount=guests.filter(g=>g.checkedIn).length;
  $("#totalGuests").textContent=total;
  $("#checkedIn").textContent=inCount;
  $("#notCheckedIn").textContent=total-inCount;
  $("#rate").textContent=total ? Math.round(inCount/total*100)+"%" : "0%";
  renderRecent();
  renderTable();
}

function renderRecent(){
  const recent=guests.filter(g=>g.checkedIn).sort((a,b)=>new Date(b.checkinTime)-new Date(a.checkinTime)).slice(0,5);
  $("#recentCheckins").innerHTML=recent.length ? recent.map(g=>`
    <div class="recent-item">
      <div class="avatar">${initials(g.name)}</div>
      <div><b>${escapeHTML(g.name)}</b><small>${escapeHTML(g.ticket)} · ${dateText(g.checkinTime)} ${timeText(g.checkinTime)}</small></div>
      <span class="status in">Checked in</span>
    </div>`).join("") : '<div class="empty">No check-ins yet.</div>';
}

function renderTable(){
  const q=($("#guestSearch")?.value || "").toLowerCase();
  const filter=$("#guestFilter")?.value || "all";
  const data=guests.filter(g=>{
    const match=`${g.name} ${g.ticket} ${g.org}`.toLowerCase().includes(q);
    const status=filter==="all" || (filter==="checked"&&g.checkedIn) || (filter==="pending"&&!g.checkedIn);
    return match&&status;
  });
  $("#guestTable").innerHTML=data.length ? data.map(g=>`
    <tr>
      <td><b>${escapeHTML(g.name)}</b><br><span style="color:#7b8497;font-size:9px">${escapeHTML(g.email||"")}</span></td>
      <td>${escapeHTML(g.ticket)}</td>
      <td>${escapeHTML(g.org)}</td>
      <td>${g.checkedIn ? dateText(g.checkinTime)+" "+timeText(g.checkinTime) : "—"}</td>
      <td><span class="status ${g.checkedIn?"in":"pending"}">${g.checkedIn?"Checked in":"Pending"}</span></td>
      <td>${g.checkedIn ? `<button class="action" onclick="undoCheckIn(${g.id})">Undo</button>` : `<button class="check-btn" onclick="checkIn(${g.id})">Check In</button>`}</td>
    </tr>`).join("") : `<tr><td colspan="6"><div class="empty">No matching guests.</div></td></tr>`;
}

function findGuest(query){
  const q=query.trim().toLowerCase();
  return guests.find(g=>g.ticket.toLowerCase()===q) ||
    guests.find(g=>g.name.toLowerCase()===q) ||
    guests.find(g=>g.ticket.toLowerCase().includes(q) || g.name.toLowerCase().includes(q));
}

function guestCard(g){
  if(!g) return `<div class="result warn">No guest found. Check the name or ticket code and try again.</div>`;
  return `<div class="result ${g.checkedIn?"success":""}">
    <div class="guest-main">
      <div><div class="guest-name">${escapeHTML(g.name)}</div>
      <div class="guest-meta">${escapeHTML(g.ticket)} · ${escapeHTML(g.org)}</div></div>
      ${g.checkedIn ? `<span class="already">✓ CHECKED IN</span>` : `<button class="check-btn" onclick="checkIn(${g.id})">Check In</button>`}
    </div>
    ${g.checkedIn ? `<div class="guest-meta" style="margin-top:10px">Checked in at ${dateText(g.checkinTime)} ${timeText(g.checkinTime)}</div>` : ""}
  </div>`;
}

window.checkIn=function(id){
  const g=guests.find(x=>x.id===Number(id)); if(!g)return;
  if(!g.checkedIn){g.checkedIn=true;g.checkinTime=new Date().toISOString();save();render();}
  const result=$("#checkinResult"); if(result) result.innerHTML=guestCard(g);
  const quick=$("#quickResult"); if(quick) quick.innerHTML=guestCard(g);
};

window.undoCheckIn=function(id){
  const g=guests.find(x=>x.id===Number(id)); if(!g)return;
  g.checkedIn=false;g.checkinTime=null;save();render();
};

function go(page){
  $$(".page").forEach(p=>p.classList.remove("active"));
  $$(".nav-link").forEach(n=>n.classList.remove("active"));
  $("#"+page).classList.add("active");
  document.querySelector(`[data-page="${page}"]`)?.classList.add("active");
  $("#pageTitle").textContent=page==="dashboard"?"Event Dashboard":page==="checkin"?"Guest Check-In":"Guest List";
}

$$(".nav-link").forEach(btn=>btn.addEventListener("click",()=>go(btn.dataset.page)));
$$("[data-page-jump]").forEach(btn=>btn.addEventListener("click",()=>go(btn.dataset.pageJump)));

$("#openAddGuest").addEventListener("click",()=>$("#guestModal").classList.remove("hidden"));
$("#closeModal").addEventListener("click",()=>$("#guestModal").classList.add("hidden"));
$("#guestModal").addEventListener("click",e=>{if(e.target===$("#guestModal"))$("#guestModal").classList.add("hidden")});

$("#checkinForm").addEventListener("submit",e=>{
  e.preventDefault();
  const g=findGuest($("#checkinSearch").value);
  $("#checkinResult").innerHTML=guestCard(g);
});
$("#quickCheckForm").addEventListener("submit",e=>{
  e.preventDefault();
  const g=findGuest($("#quickSearch").value);
  $("#quickResult").innerHTML=guestCard(g);
});
$("#guestSearch").addEventListener("input",renderTable);
$("#guestFilter").addEventListener("change",renderTable);

$("#guestForm").addEventListener("submit",e=>{
  e.preventDefault();
  const ticket=$("#ticketCode").value.trim().toUpperCase();
  if(guests.some(g=>g.ticket.toLowerCase()===ticket.toLowerCase())){
    alert("That ticket code already exists.");
    return;
  }
  guests.push({
    id:Date.now(),name:$("#guestName").value.trim(),ticket,
    org:$("#organization").value.trim(),email:$("#email").value.trim(),
    checkedIn:false,checkinTime:null
  });
  save();render();e.target.reset();$("#guestModal").classList.add("hidden");
  go("guests");
});

$("#sideEventDate").textContent=new Date().toLocaleDateString([],{weekday:"long",month:"short",day:"numeric"});
render();
