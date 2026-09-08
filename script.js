'use strict';
const $ = id => document.getElementById(id);
const colors=['#f296c1','#b7a0ec','#f4d474','#89d3c1','#90c9ec'];
const clawPrizes=[
 {id:'bear',name:'Honey bear',tag:'A cuddly study buddy',color:'#fff0d9'},
 {id:'frog',name:'Pocket frog',tag:'Tiny friend. Big energy.',color:'#e4f3e5'},
 {id:'unicorn',name:'Dreamy unicorn',tag:'A little legendary',color:'#fce4ef'},
 {id:'dog',name:'Biscuit puppy',tag:'Floppy ears, loyal heart',color:'#f6e1c8'},
 {id:'cat',name:'Peaches kitten',tag:'Your purr-fect desk friend',color:'#ffebdc'},
 {id:'bunny',name:'Marshmallow bunny',tag:'Soft ears and pink paws',color:'#fbeaf3'},
 {id:'chick',name:'Sunny chick',tag:'A pocketful of sunshine',color:'#fff3bc'}
];
const shopPrizes=[
 {id:'ice-coolmint',name:'Ice Breakers mints',tag:'Coolmint',cost:25},
 {id:'ice-wintergreen',name:'Ice Breakers mints',tag:'Wintergreen',cost:25},
 {id:'ice-cinnamon',name:'Ice Breakers mints',tag:'Cinnamon',cost:25},
 {id:'extra-spearmint',name:'Extra gum',tag:'Spearmint',cost:20},
 {id:'extra-peppermint',name:'Extra gum',tag:'Peppermint',cost:20},
 {id:'extra-polar',name:'Extra gum',tag:'Polar Ice',cost:20},
 {id:'slime-pink',name:'GuiGui slime',tag:'Pink swirl',cost:65},
 {id:'slime-purple',name:'GuiGui slime',tag:'Purple sparkle',cost:65},
 {id:'keychain-strawberry',name:'Strawberry keychain',tag:'A sweet little bag charm',cost:45},
 {id:'keychain-star',name:'Pastel star keychain',tag:'A little everyday sparkle',cost:45},
 {id:'dumdum-cherry',name:'Dum Dums lollipop',tag:'Cherry',cost:10},
 {id:'dumdum-blue',name:'Dum Dums lollipop',tag:'Blue raspberry',cost:10},
 {id:'journal-pink',name:'Pink daydream journal',tag:'Pages for your big ideas',cost:80},
 {id:'journal-purple',name:'Lavender journal',tag:'Notes, doodles, dreams',cost:80},
 {id:'gel-pens',name:'Rainbow gel pens',tag:'Make your notes colorful',cost:55},
 {id:'yoyo',name:'Classic yo-yo',tag:'For your well-earned break',cost:30}
].map((p,art)=>({...p,art,color:'#fbf8fc'})).concat([
 {id:'ice-sours-fruit',name:'Ice Breakers Sours',tag:'Sour Fruits',cost:25},
 {id:'ice-sours-berry',name:'Ice Breakers Sours',tag:'Mixed Berry, Strawberry & Cherry',cost:25},
 {id:'ice-fruity-mix',name:'Ice Breakers mints',tag:'Fruity Mix · Strawberry, Tangerine & Watermelon',cost:25},
 {id:'ice-duo-strawberry',name:'Ice Breakers Duo',tag:'Strawberry',cost:25},
 {id:'ice-pineapple-mango',name:'Ice Breakers Sparkling',tag:'Pineapple Mango',cost:30},
 {id:'extra-pink-lemonade',name:'Extra gum',tag:'Pink Lemonade',cost:20},
 {id:'extra-watermelon',name:'Extra gum',tag:'Sweet Watermelon',cost:20},
 {id:'extra-strawberry-lemon',name:'Extra Refreshers',tag:'Strawberry Lemon',cost:25},
 {id:'glitter-pens-rainbow',name:'Rainbow glitter pens',tag:'A sparkling rainbow set',cost:55},
 {id:'glitter-pens-berry',name:'Berry glitter pens',tag:'Pink & purple sparkle',cost:35},
 {id:'highlighter-yellow',name:'Sunshine highlighter',tag:'Yellow',cost:15},
 {id:'highlighter-pink',name:'Blush highlighter',tag:'Pink',cost:15},
 {id:'highlighter-mint',name:'Mint highlighter',tag:'Mint green',cost:15},
 {id:'highlighter-lavender',name:'Lavender highlighter',tag:'Purple',cost:15},
 {id:'correction-pink',name:'Correction tape',tag:'Pink case · White tape',cost:20},
 {id:'correction-mint',name:'Correction tape',tag:'Mint case · White tape',cost:20},
 {id:'correction-lavender',name:'Correction tape',tag:'Lavender case · White tape',cost:20},
 {id:'glue-strawberry',name:'Scented glue stick',tag:'Strawberry scent',cost:15},
 {id:'glue-grape',name:'Scented glue stick',tag:'Grape scent',cost:15},
 {id:'ruler-cat',name:'Kitten ruler',tag:'Pink · Little study helper',cost:20},
 {id:'ruler-cloud',name:'Cloud ruler',tag:'Sky blue · Dreamy desk buddy',cost:20},
 {id:'eraser-panda',name:'Panda eraser',tag:'A tiny desk companion',cost:15},
 {id:'eraser-icecream',name:'Ice cream eraser',tag:'A sweet little scoop',cost:15},
 {id:'eraser-strawberry',name:'Strawberry eraser',tag:'Berry cute',cost:15},
 {id:'highlighter-set',name:'Pastel highlighter set',tag:'Yellow, pink, mint & lavender',cost:45}
].map((p,art)=>({...p,art,artGrid:5,artSheet:'fruity-stationery.png',color:'#fbf8fc'})));
const prizes=[...clawPrizes,...shopPrizes];
const shopCategories=[
 {name:'Mints',prefixes:['ice-']},
 {name:'Gum',prefixes:['extra-']},
 {name:'Lollipops',prefixes:['dumdum-']},
 {name:'Slime & toys',prefixes:['slime-','yoyo']},
 {name:'Cute keychains',prefixes:['keychain-']},
 {name:'Journals',prefixes:['journal-']},
 {name:'Pens & highlighters',prefixes:['gel-pens','glitter-pens-','highlighter-']},
 {name:'Little desk supplies',prefixes:['correction-','glue-','ruler-','eraser-']}
];
// Individual source bounds keep neighboring products out of every preview.
const stationeryCrops=[
 [20,20,225,255],[275,20,215,255],[520,20,215,255],[757,20,215,255],[1010,20,220,255],
 [22,288,220,242],[270,288,215,242],[525,283,178,247],[750,282,214,248],[1020,290,193,240],
 [24,538,223,200],[272,538,216,200],[511,538,213,200],[755,538,213,200],[988,540,242,204],
 [12,773,228,205],[265,773,227,205],[550,750,100,245],[758,750,111,245],[903,821,340,160],
 [8,1050,290,169],[323,1018,174,209],[546,1003,149,216],[755,1015,180,205],[1005,997,215,237]
];
const catalogImages=new Map();
function catalogImage(src){
 if(!catalogImages.has(src)){
  const ready=new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(image);image.src=src});
  catalogImages.set(src,ready);
 }
 return catalogImages.get(src);
}
function shopArt(prize,cls='prize-art'){
 const wrap=el('div',undefined,cls);const art=el('canvas',undefined,'catalog-art');
 art.width=360;art.height=360;
 const crop=prize.artGrid===5?stationeryCrops[prize.art]:[
  (prize.art%4)*313.5+5,Math.floor(prize.art/4)*313.5+5,303.5,303.5
 ];
  catalogImage(prize.artSheet||'arcade-prizes.png').then(image=>{
  const ctx=art.getContext('2d');const [sx,sy,sw,sh]=crop;
  const scale=340/Math.max(sw,sh),width=sw*scale,height=sh*scale;
  ctx.drawImage(image,sx,sy,sw,sh,(360-width)/2,(360-height)/2,width,height);
 });
 art.setAttribute('role','img');art.setAttribute('aria-label',`${prize.name} — ${prize.tag}`);wrap.append(art);return wrap;
}

let state={tickets:0,done:0,tasks:['Review notes for 15 minutes','Finish one homework question','Organize your study space','Read 5 pages of your book'],collection:[],active:null,phase:'idle',reward:null,streak:{days:0,lastDay:null}};
try{const saved=JSON.parse(localStorage.getItem('study-claw-v1'));if(saved&&Array.isArray(saved.tasks)&&saved.tasks.every(t=>typeof t==='string')&&Array.isArray(saved.collection)&&saved.collection.every(i=>prizes.some(p=>p.id===i))&&((Number.isInteger(saved.tickets)&&saved.tickets>=0)||(typeof saved.tickets==='string'&&/^\d+$/.test(saved.tickets)))&&Number.isInteger(saved.done)&&saved.done>=0){state={...state,...saved};if(!['idle','capsule','task','reward'].includes(state.phase))state.phase='idle';if(['capsule','task'].includes(state.phase)&&typeof state.active!=='string'){state.phase='idle';state.active=null}}}catch{}
state.tickets=String(state.tickets);
if(!state.streak||!Number.isSafeInteger(state.streak.days)||state.streak.days<1||!Number.isSafeInteger(state.streak.lastDay))state.streak={days:0,lastDay:null};
function localDay(date=new Date()){return Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000}
function formatTickets(value){return BigInt(value).toLocaleString()}
function creditTickets(value){state.tickets=(BigInt(state.tickets)+BigInt(value)).toString()}
function streakInfo(today=localDay()){
 const {days,lastDay}=state.streak;
 const current=lastDay!==null&&today-lastDay<=1?days:0;
 const claimed=lastDay!==null&&today<=lastDay;
 return {days:current,claimed,bonus:(5n*2n**BigInt(current)).toString()};
}
function claimDailyStreak(today=localDay()){
 const info=streakInfo(today);if(info.claimed)return '0';
 state.streak={days:info.days+1,lastDay:today};creditTickets(info.bonus);return info.bonus;
}
function renderStreak(){
 const info=streakInfo();$('streak-days').textContent=`${info.days} day${info.days===1?'':'s'}`;
 $('streak-status').textContent=info.claimed?`Today is complete! Tomorrow’s bonus: +${formatTickets(info.bonus)} tickets.`:`Complete a task today for +${formatTickets(info.bonus)} bonus tickets.`;
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderStreak()});
window.addEventListener('focus',renderStreak);
setInterval(renderStreak,60000);
let busy=false,x=50,depth=50,capsules=[],toastTimer;
function save(){try{localStorage.setItem('study-claw-v1',JSON.stringify(state))}catch{}}
function el(tag,text,cls){const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e}
function toast(msg){$('toast').textContent=msg;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3000)}
function prizePreview(appearance,cls='prize-preview'){
 const wrap=el('div',undefined,cls);
 if(typeof createPrizePreview==='function')wrap.append(createPrizePreview(appearance));
 return wrap;
}
function caughtAppearance(){return state.caughtAppearance||{prize:state.caughtPrize||null,color:'#f296c1',tilt:0}}
function renderDelivery(){
 $('prize-slot').replaceChildren();
 if(['capsule','task','reward'].includes(state.phase))$('prize-slot').append(prizePreview(caughtAppearance(),'delivered-prize'));
}
function render(){ $('tickets').textContent=formatTickets(state.tickets);renderStreak();$('done-count').textContent=`${state.done} task${state.done===1?'':'s'} completed`;$('task-count').textContent=`${state.placements?.length||0} prizes · ${state.tasks.length} tasks`;$('collection-count').textContent=state.collection.length;
const list=$('task-list');list.replaceChildren();state.tasks.forEach((task,i)=>{const li=el('li');const dot=el('span',undefined,'dot');dot.textContent='○';const remove=el('button','×');remove.type='button';remove.setAttribute('aria-label',`Remove task: ${task}`);remove.disabled=busy||state.taskIds?.[i]===state.activeTaskId;remove.onclick=()=>{state.tasks.splice(i,1);state.taskIds.splice(i,1);save();render();fillCapsules()};li.append(dot,el('span',task,'task-text'),remove);list.append(li)});if(!state.tasks.length)list.append(el('li','All clear! Add a task for your next grab.'));
$('restock').hidden=state.placements.length>0;$('restock').disabled=busy;
$('task-input').disabled=busy;$('task-form').querySelector('button').disabled=busy;$('grab').disabled=busy||(state.phase==='idle'&&!state.placements.length);$('grab').textContent=busy?'GRABBING…':state.phase==='capsule'?'OPEN TASK':state.phase==='task'?'VIEW TASK':state.phase==='reward'?'PLAY AGAIN':!state.placements.length?'EMPTY':!state.tasks.length?'ADD TASK':'DROP & GRAB';document.querySelectorAll('[data-dir]').forEach(b=>b.disabled=busy);$('control-status').textContent=busy?'Claw in motion…':state.phase==='idle'?(!state.placements.length?'All prizes collected! Restock the claw machine below.':!state.tasks.length?'Add a to-do before grabbing a prize.':'Arrows aim · Red ring = drop spot · Space / G grabs'):state.phase==='reward'?'Choose “Let’s grab another” to play again.':'You can aim. Finish Your Mission to grab again.';renderMission();renderShop();renderCollection();renderDelivery();}
function renderMission(){const m=$('mission');m.replaceChildren();if(busy){m.className='mission-idle';m.append(el('div','✧','mission-icon'),el('h2','One little mission, coming up…'),el('p','The claw is picking your next step.'));return}
if(state.phase==='idle'){m.className='mission-idle';m.append(el('div','🎯','mission-icon'),el('h2','A little nudge to get going'),el('p','Aim the claw and hit GRAB!\nCatch a prize to choose a task from your to-dos.'));const steps=el('div',undefined,'steps');steps.innerHTML='<b>① Grab</b><span>② Do your task</span><span>③ Get rewarded</span>';m.append(steps)}
else if(state.phase==='capsule'){m.className='reward';const caught=prizes.find(p=>p.id===state.caughtPrize);m.append(prizePreview(caughtAppearance()),el('h2',caught?`You caught ${caught.name}!`:'You caught a capsule!'),el('p',caught?'Read its task tag. Finish the task to keep your stuffy.':'Open it and finish your task to earn tickets.'));const b=el('button',caught?'Read the task tag →':'Open my capsule ✦','primary');b.onclick=()=>{state.phase='task';save();render()};m.append(b)}
else if(state.phase==='task'){m.className='mission-task';m.append(el('h2',state.active),el('p','Take your time. Come back when you’re done to unlock your surprise.'));const b=el('button','✓  I finished this task!','primary');b.onclick=completeTask;m.append(b)}
else if(state.phase==='reward'){m.className='reward';const r=state.reward;const p=r&&prizes.find(p=>p.id===r.prize);m.append(p?prizePreview(caughtAppearance()):el('div','🎟','reward-emoji'),el('h2',p?`You won ${p.name}!`:`You earned ${r?.tickets||0} tickets!`),el('p',p?'A new friend joined your collection. You earned it.':'A little progress deserves a little celebration.'));if(r?.streakBonus&&r.streakBonus!=='0')m.append(el('p',`Daily streak: day ${state.streak.days}! +${formatTickets(r.streakBonus)} bonus tickets`,'streak-celebration'));const b=el('button','Let’s grab another →','primary');b.onclick=()=>{state.phase='idle';state.active=null;state.reward=null;state.caughtPrize=null;state.caughtAppearance=null;state.activeTaskId=null;save();render();fillCapsules();$('machine-status').textContent='READY TO PLAY';$('prize-slot').replaceChildren()};m.append(b)}}
function renderShop(){const grid=$('prize-grid');grid.replaceChildren();shopCategories.forEach(category=>{grid.append(el('h2',category.name,'prize-category'));category.prefixes.flatMap(prefix=>shopPrizes.filter(p=>p.id.startsWith(prefix))).forEach(p=>{const card=el('article',undefined,'prize-card');const art=shopArt(p);const b=el('button',undefined,'redeem');b.append(el('span',`🎟 ${p.cost}`),el('span','Redeem →'));b.disabled=BigInt(state.tickets)<BigInt(p.cost);b.setAttribute('aria-label',`Redeem ${p.name} for ${p.cost} tickets`);b.onclick=()=>{if(BigInt(state.tickets)<BigInt(p.cost))return;state.tickets=(BigInt(state.tickets)-BigInt(p.cost)).toString();state.collection.push(p.id);save();render();celebrate();toast(`${p.name} added to your collection!`)};card.append(art,el('h3',p.name),el('p',p.tag),b);grid.append(card)})})}
function renderCollection(){
 const c=$('collection');c.replaceChildren();
 if(!state.collection.length){const empty=el('div',undefined,'collection-empty');empty.append(el('div','✦','mission-icon'),el('h2','Your first prize is waiting'),el('p','Complete a task at the claw machine or redeem tickets in Arcade Prizes.'));c.append(empty);return}
 const list=el('ul',undefined,'owned-list');
 prizes.forEach(p=>{const count=state.collection.filter(id=>id===p.id).length;if(!count)return;
  const row=el('li',undefined,'owned-prize');row.append(Number.isInteger(p.art)?shopArt(p,'owned-art'):prizePreview({prize:p.id,color:p.color,tilt:0},'owned-art'));
  const info=el('div',undefined,'owned-info');info.append(el('h2',p.name),el('p',p.tag));row.append(info,el('span',`× ${count}`,'owned-quantity'));list.append(row);
 });c.append(list);
}
let taskSerial=Date.now();
function ensurePlacements(){
 if(!Array.isArray(state.taskIds)||state.taskIds.length!==state.tasks.length)state.taskIds=state.tasks.map(()=>`task-${++taskSerial}`);
 if(state.prizeMode!==3){
  // Keep a previously revealed mission reachable when upgrading older saved games.
  if(['capsule','task'].includes(state.phase)&&state.active&&!state.activeTaskId){state.tasks.push(state.active);state.activeTaskId=`task-${++taskSerial}`;state.taskIds.push(state.activeTaskId)}
  state.placements=[];state.prizeMode=3;for(let i=0;i<state.tasks.length*3;i++)addOnePrize();layoutPrizes();save();
 }
 if(state.pileStyle!==1){for(const p of state.placements){if(`${p.layer}:${p.slot}`!==state.pendingPrizeKey)p.prize=mixedVariety(p.slot,p.layer)}layoutPrizes();state.pileStyle=1;save()}
 if(state.plushVarieties!==2){for(const p of state.placements){if(`${p.layer}:${p.slot}`!==state.pendingPrizeKey)p.prize=mixedVariety(p.slot,p.layer)}state.plushVarieties=2;save()}
 if(state.fullPileVersion!==1){while(state.placements.length<52)addOnePrize();layoutPrizes();state.fullPileVersion=1;save()}
}
function mixedVariety(slot,layer){return ['bear','dog',null,'cat','frog','bunny','unicorn','chick'][(slot+layer*3)%8]}
function addOnePrize(){
 const bottom=state.placements.filter(p=>p.layer===0).length,top=state.placements.length-bottom;
 for(const layer of (bottom>top?[1,0]:[0,1]))for(let slot=0;slot<45;slot++)if(!state.placements.some(p=>p.slot===slot&&p.layer===layer)){
  const n=state.prizeSerial=(state.prizeSerial||0)+1;
  state.placements.push({slot,layer,prize:mixedVariety(slot,layer),color:colors[n%colors.length]});return;
 }
}
function pilePositions(dense=false){
 const positions=[],cols=dense?9:6,rows=dense?6:5;
 for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
  const wx=-1.6+col*3.2/(cols-1),wz=-.06+row*2.16/(rows-1);
  // Reserve the chute plus a safety margin for the entire prize, not just its center.
  if(wx<-.5&&wz<1)continue;
  positions.push({wx,wz});
 }
 return positions;
}
function layoutPrizes(){
 const dense=state.placements.some(p=>p.slot>=26),positions=pilePositions(dense),scale=dense?.69:.96;
 for(const p of state.placements){
  const pos=positions[p.slot],noise=Math.sin(p.slot*17+p.layer*9);
  p.wx=pos.wx;p.wz=pos.wz;
  p.worldSize=scale*(.97+.03*Math.cos(p.slot*7+p.layer));p.tilt=noise*.2;
  p.wy=p.layer?scale*(.6+.06*Math.cos(p.slot*3)):.02;
 }
}
function isPrizeExposed(prize){return prize.layer===1||!capsules.some(p=>p.layer===1&&p.slot===prize.slot)}
function findGrabTarget(aimX,aimZ){
 return capsules.filter(c=>isPrizeExposed(c)&&Math.hypot(c.wx-aimX,c.wz-aimZ)<=c.worldSize*.32)
  .sort((a,b)=>Math.hypot(a.wx-aimX,a.wz-aimZ)-Math.hypot(b.wx-aimX,b.wz-aimZ))[0];
}
function activePileHeight(){return findGrabTarget(scene.x,scene.z)?.wy||0}
function fillCapsules(){
 ensurePlacements();$('capsules').replaceChildren();
 capsules=state.placements.filter(p=>`${p.layer}:${p.slot}`!==state.pendingPrizeKey).map((p,index)=>({...p,index}));
 if(typeof drawScene==='function')drawScene();
}
function move(dir){if(busy)return;if(dir==='left')x=Math.max(0,x-1.5);if(dir==='right')x=Math.min(100,x+1.5);if(dir==='up')depth=Math.max(0,depth-3);if(dir==='down')depth=Math.min(100,depth+3);if(typeof updateClaw==='function')updateClaw()}
const wait=ms=>new Promise(r=>setTimeout(r,matchMedia('(prefers-reduced-motion: reduce)').matches?80:ms));
async function grab(){
 if(busy||state.phase!=='idle'||!state.tasks.length||!capsules.length)return;
 busy=true;render();$('machine-status').textContent='PICKING A LITTLE WIN';
 // Only a prize directly under the claw can be caught. Never move the aim to a prize.
 const target=findGrabTarget(scene.x,scene.z);
 await animateScene({y:target?target.wy+target.worldSize*.94:activePileHeight()+.42},650);
 scene.closed=true;scene.held=target||null;drawScene();await wait(180);
 if(!target){
  await animateScene({y:2.7},650);scene.closed=false;drawScene();busy=false;render();
  $('machine-status').textContent='MISSED — TRY AGAIN';toast('Nothing caught! Adjust your aim and try again.');return;
 }
 await animateScene({y:2.7},650);await animateScene({x:-1.42,z:.03},750);
 scene.closed=false;await animateScene({y:.6},450);await animateScene({drop:1.1},350);
 const taskIndex=Math.floor(Math.random()*state.tasks.length);state.caughtPrize=target.prize;state.caughtAppearance={prize:target.prize,color:target.color,tilt:target.tilt||0};state.active=state.tasks[taskIndex];state.activeTaskId=state.taskIds[taskIndex];state.pendingPrizeKey=`${target.layer}:${target.slot}`;state.phase='capsule';scene.held=null;scene.drop=0;
 busy=false;save();$('machine-status').textContent='PRIZE CAUGHT!';
 x=50;depth=50;scene.y=2.7;render();fillCapsules();updateClaw();toast('Prize caught! Reveal its task in Your Mission.');
}
function completeTask(){if(state.phase!=='task')return;const taskIndex=state.taskIds.indexOf(state.activeTaskId);if(taskIndex<0)return;state.tasks.splice(taskIndex,1);state.taskIds.splice(taskIndex,1);state.placements=state.placements.filter(p=>`${p.layer}:${p.slot}`!==state.pendingPrizeKey);state.pendingPrizeKey=null;state.done++;if(state.caughtPrize&&prizes.some(p=>p.id===state.caughtPrize)){const prize=prizes.find(p=>p.id===state.caughtPrize);state.collection.push(prize.id);state.reward={prize:prize.id}}else{const tickets=[15,20,25,30][Math.floor(Math.random()*4)];creditTickets(tickets);state.reward={tickets}}state.reward.streakBonus=claimDailyStreak();state.phase='reward';save();render();celebrate();$('machine-status').textContent='NICE WORK, SUPERSTAR!'}
function celebrate(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;for(let i=0;i<38;i++){const p=el('i',undefined,'confetti-piece');p.style.left=`${Math.random()*100}%`;p.style.background=colors[i%5];p.style.animationDelay=`${Math.random()*.4}s`;$('confetti').append(p);setTimeout(()=>p.remove(),2100)}}
function addTask(task){state.tasks.push(task);state.taskIds.push(`task-${++taskSerial}`);$('task-input').value='';save();render();if(!busy)fillCapsules();$('glass').focus({preventScroll:true});toast('Task loaded. Arrow keys now control the claw.')}
function normalizedTask(task){return task.trim().replace(/\s+/g,' ').toLocaleLowerCase()}
let duplicateTask='';
$('task-form').onsubmit=e=>{
 e.preventDefault();if(busy)return;const task=$('task-input').value.trim();if(!task)return;
 if(state.tasks.length>=30){toast('Your to-do list has 30 tasks. Finish one to make room.');return}
 if(state.tasks.some(existing=>normalizedTask(existing)===normalizedTask(task))){duplicateTask=task;$('duplicate-heading').textContent='You already have this task';$('duplicate-copy').textContent='Do you want to add it again?';$('duplicate-dialog').showModal();return}
 addTask(task);
};
$('duplicate-dialog').addEventListener('close',()=>{if($('duplicate-dialog').returnValue==='confirm'&&duplicateTask)addTask(duplicateTask);else $('task-input').focus();duplicateTask=''});
function grabAction(){
 if(busy)return;
 if(state.phase==='idle'){
  if(!state.placements.length){$('restock').focus();toast('The machine is empty. Click Restock claw machine to refill it.');return}
  if(!state.tasks.length){$('task-input').focus();toast('Add a to-do first. Every prize needs a current task.');return}
  return grab();
 }
 if(state.phase==='reward'){$('mission').querySelector('button').click();$('glass').focus({preventScroll:true});return}
 $('mission').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
 const button=$('mission').querySelector('button');if(button)button.focus({preventScroll:true});
 toast(state.phase==='capsule'?'Open your caught prize to reveal its task.':'Finish your current task before grabbing another prize.');
}
function restockMachine(){
 if(busy||state.placements.length||state.pendingPrizeKey)return;
 for(let i=0;i<52;i++)addOnePrize();layoutPrizes();save();fillCapsules();render();
 $('machine-status').textContent='RESTOCKED!';$('glass').focus({preventScroll:true});toast('52 new prizes! Your tasks, tickets, and collection are unchanged.');
}
ensurePlacements();$('restock').onclick=restockMachine;$('grab').onclick=grabAction;document.querySelectorAll('[data-dir]').forEach(b=>b.onclick=()=>move(b.dataset.dir));function handleGameKey(e){
 if(activeTab!=='machine-panel'||e.target.closest('[role="tab"]'))return;
 if(e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;
 const dirs={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'};
 if(dirs[e.key]){e.preventDefault();move(dirs[e.key]);return}
 const button=e.target.closest('button');const gameButton=button&&(button.id==='grab'||button.dataset.dir);
 if(e.key?.toLowerCase()==='g'||(e.code==='Space'&&(!e.target.closest('button,a')||gameButton))){e.preventDefault();if(!e.repeat)grabAction()}
}
document.addEventListener('keydown',handleGameKey);
$('glass').addEventListener('pointerdown',()=>$('glass').focus({preventScroll:true}));
let activeTab='machine-panel';
function showTab(panelId,focus=false){
 if(!['shop','machine-panel','my-prizes'].includes(panelId))return;
 activeTab=panelId;
 for(const id of ['shop','machine-panel','my-prizes']){
  const selected=id===panelId;$(id).hidden=!selected;const tab=$(`tab-${id}`);tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
 }
 if(focus)$(`tab-${panelId}`).focus();
 if(panelId==='machine-panel'&&typeof drawScene==='function')drawScene();
}
const tabIds=['machine-panel','shop','my-prizes'];
tabIds.forEach((id,index)=>{
 const tab=$(`tab-${id}`);tab.onclick=()=>showTab(id);
 tab.addEventListener('keydown',e=>{
  let next;if(e.key==='ArrowRight')next=(index+1)%3;else if(e.key==='ArrowLeft')next=(index+2)%3;else if(e.key==='Home')next=0;else if(e.key==='End')next=2;else return;
  e.preventDefault();e.stopPropagation();showTab(tabIds[next],true);
 });
});
window.addEventListener('resize',()=>{if(!busy)fillCapsules();if(typeof drawScene==='function')drawScene()});render();fillCapsules();
