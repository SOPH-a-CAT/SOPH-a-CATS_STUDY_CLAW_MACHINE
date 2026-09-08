/* Small dependency-free 3D renderer. World axes: x sideways, y height, z depth. */
const scene={x:0,z:0,y:2.7,closed:false,held:null,drop:0};
let canvas=document.createElement('canvas');canvas.id='scene';canvas.setAttribute('aria-label','3D claw chamber with plush prizes and a square drop chute');$('glass').append(canvas);
let ctx=canvas.getContext('2d');
function project(x,y,z){const scale=1/(1+z*.16);return{x:canvas.clientWidth/2+x*canvas.clientWidth*.205*scale,y:canvas.clientHeight*.79-y*canvas.clientHeight*.215*scale-z*canvas.clientHeight*.083,scale}}
function shade(hex,n){const v=parseInt(hex.slice(1),16);return `rgb(${Math.max(0,Math.min(255,(v>>16)+n))},${Math.max(0,Math.min(255,((v>>8)&255)+n))},${Math.max(0,Math.min(255,(v&255)+n))})`}
function polygon(points,color,line){ctx.beginPath();points.forEach((v,i)=>{const p=project(...v);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)});ctx.closePath();ctx.fillStyle=color;ctx.fill();if(line){ctx.strokeStyle=line;ctx.lineWidth=1.5;ctx.stroke()}}
function rod(a,b,width,color){const p=project(...a),q=project(...b);ctx.lineCap='round';ctx.lineWidth=width*p.scale;ctx.strokeStyle='#476174';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();ctx.lineWidth=width*p.scale*.52;ctx.strokeStyle=color;ctx.stroke()}
function ball(x,y,z,r,color,sx=1,sy=1){const p=project(x,y,z),radius=r*canvas.clientWidth*.205*p.scale;ctx.save();ctx.translate(p.x,p.y);ctx.scale(sx,sy);const g=ctx.createRadialGradient(-radius*.35,-radius*.4,radius*.05,0,0,radius);g.addColorStop(0,shade(color,48));g.addColorStop(.55,color);g.addColorStop(1,shade(color,-55));ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill();ctx.restore()}
function shadow(x,z,r){const p=project(x,0,z);ctx.fillStyle='#28465035';ctx.beginPath();ctx.ellipse(p.x,p.y,r*canvas.clientWidth*.205*p.scale,r*canvas.clientWidth*.045*p.scale,0,0,Math.PI*2);ctx.fill()}
function plush(x,y,z,kind,size){
 const palette={bear:'#dca571',frog:'#70ba81',unicorn:'#d8b5ed',dog:'#d4a574',cat:'#efa975',bunny:'#f4dfe6',chick:'#f3ce52'};
 const c=palette[kind]||palette.bear;
 const b=(dx,dy,dz,r,col=c,sx=1,sy=1)=>ball(x+dx*size,y+dy*size,z+dz*size,r*size,col,sx,sy);
 const poly=(points,col)=>polygon(points.map(([dx,dy,dz])=>[x+dx*size,y+dy*size,z+dz*size]),col);
 if(kind==='chick'){
  b(-.15,.07,-.07,.11,'#ed9b42',1.2,.5);b(.15,.07,-.07,.11,'#ed9b42',1.2,.5);
  b(0,.32,0,.3,c,1,1.1);b(-.28,.34,0,.14,'#e8b93b',.7,1.15);b(.28,.34,0,.14,'#e8b93b',.7,1.15);
  b(0,.69,0,.28);b(-.05,.96,0,.07,c,.5,1.7);b(.04,.98,.01,.065,c,.5,1.6);
  b(-.10,.74,-.255,.032,'#343349');b(.10,.74,-.255,.032,'#343349');b(-.17,.64,-.24,.05,'#f0a083',1,.5);b(.17,.64,-.24,.05,'#f0a083',1,.5);
  poly([[-.09,.64,-.27],[.09,.64,-.27],[0,.56,-.39]],'#eb923c');poly([[0,.64,-.28],[.09,.64,-.27],[0,.56,-.39]],'#b9662e');return;
 }
 b(-.24,.16,0,.16);b(.24,.16,0,.16);b(0,.35,.01,.28,c,1,1.16);b(-.27,.38,0,.12);b(.27,.38,0,.12);
 if(kind==='frog'){b(-.17,.86,0,.13);b(.17,.86,0,.13)}
 else if(kind==='bunny'){
  b(-.15,1.04,.015,.13,c,.7,2.05);b(.15,1.04,.015,.13,c,.7,2.05);b(-.15,1.06,-.065,.085,'#e9adc8',.55,2);b(.15,1.06,-.065,.085,'#e9adc8',.55,2);
 }else if(kind==='cat'){
  poly([[-.28,.77,0],[-.23,1.06,.015],[-.06,.84,-.04]],'#d28e67');poly([[.28,.77,0],[.23,1.06,.015],[.06,.84,-.04]],'#d28e67');
  poly([[-.23,.84,-.04],[-.22,1,-.01],[-.12,.86,-.07]],'#e9b2b4');poly([[.23,.84,-.04],[.22,1,-.01],[.12,.86,-.07]],'#e9b2b4');
 }else if(kind==='dog'){b(-.28,.64,.025,.145,'#936645',.85,1.95);b(.28,.64,.025,.145,'#936645',.85,1.95)}
 else{b(-.2,.87,.02,.15);b(.2,.87,.02,.15);b(-.2,.87,-.06,.08,'#efbfd0');b(.2,.87,-.06,.08,'#efbfd0')}
 b(0,.68,-.01,.3,c,1,.92);b(0,.29,-.22,.17,kind==='frog'?'#bfe8a1':'#fae8d5',1,.94);
 if(kind==='unicorn'){b(-.12,.93,-.03,.11,'#f2a9d5');rod([x,y+.92*size,z],[x,y+1.16*size,z],8*size,'#ffdb7d')}
 if(kind==='dog'){b(-.10,.74,-.255,.075,'#976b4a');b(0,.59,-.27,.12,'#f5dec3',1.3,.8)}
 b(-.105,.73,-.28,.034,'#30334a');b(.105,.73,-.28,.034,'#30334a');b(-.16,.62,-.27,.052,'#ed9eb5',1,.5);b(.16,.62,-.27,.052,'#ed9eb5',1,.5);
 b(0,.59,-.31,kind==='dog'?.06:.055,kind==='frog'?'#4b885d':kind==='bunny'?'#ce88a8':'#745246',1,.65);
 if(kind==='cat')for(const side of [-1,1])for(const dy of [-.025,.025])rod([x+side*.15*size,y+(.60+dy)*size,z-.28*size],[x+side*.3*size,y+(.59+dy*2)*size,z-.27*size],1.3,'#976b64');
}
function prize3d(item,x,y,z){const pivot=project(x,y+.3*item.worldSize,z);ctx.save();ctx.translate(pivot.x,pivot.y);ctx.rotate(item.tilt||0);ctx.translate(-pivot.x,-pivot.y);const size=item.worldSize||.75;if(item.prize){plush(x,y,z,item.prize,size)}else{ball(x,y+.31*size,z,.32*size,item.color);const p=project(x,y+.31*size,z);ctx.strokeStyle='#ffffff99';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(p.x,p.y,.32*size*canvas.clientWidth*.205*p.scale,.075*size*canvas.clientWidth*.205*p.scale,-.12,0,Math.PI*2);ctx.stroke()}ctx.restore()}
function drawScene(){const dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
 polygon([[-2,0,2.5],[2,0,2.5],[2,3.4,2.5],[-2,3.4,2.5]],'#b9dfe5');polygon([[-2,0,-.5],[-2,0,2.5],[-2,3.4,2.5],[-2,3.4,-.5]],'#8dbdc9');polygon([[2,0,-.5],[2,0,2.5],[2,3.4,2.5],[2,3.4,-.5]],'#d8f3f1');polygon([[-2,0,-.5],[2,0,-.5],[2,0,2.5],[-2,0,2.5]],'#a1d7cb');
 for(let z=0;z<=2.5;z+=.5)rod([-2,0,z],[2,0,z],1,'#73b5b0');for(let x=-2;x<=2;x+=.5)rod([x,0,-.5],[x,0,2.5],1,'#73b5b0');
 // Square opening: rim, dark shaft, visible inside walls and front lip.
 polygon([[-1.95,.015,-.47],[-.88,.015,-.47],[-.88,.015,.6],[-1.95,.015,.6]],'#f5c3db','#ab4b7a');polygon([[-1.83,.025,-.36],[-1,.025,-.36],[-1,.025,.48],[-1.83,.025,.48]],'#291e3c');polygon([[-1.83,.025,.48],[-1,.025,.48],[-1,-.35,.48],[-1.83,-.35,.48]],'#6c426a');polygon([[-1,.025,-.36],[-1,.025,.48],[-1,-.35,.48],[-1,-.35,-.36]],'#9c628e');
 rod([-1.8,3.05,-.35],[-1.8,3.05,2.35],8,'#d1e6ee');rod([1.8,3.05,-.35],[1.8,3.05,2.35],8,'#d1e6ee');rod([-1.8,3.05,scene.z],[1.8,3.05,scene.z],9,'#e0edf2');
 // Overlapping, tilted prizes form one heap; layer membership still controls catches.
 capsules.filter(c=>c!==scene.held).sort((a,b)=>b.wz-a.wz||a.layer-b.layer).forEach(c=>{shadow(c.wx,c.wz,c.worldSize*.4);prize3d(c,c.wx,c.wy,c.wz)});
 shadow(scene.x,scene.z,.27);const aim=project(scene.x,activePileHeight(),scene.z);ctx.strokeStyle='#f63f9180';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(aim.x,aim.y,18*aim.scale,7*aim.scale,0,0,Math.PI*2);ctx.stroke();
 rod([scene.x,3.05,scene.z],[scene.x,scene.y,scene.z],4,'#c3d4df');ball(scene.x,scene.y,scene.z,.12,'#a8c0ce',1,.7);
 for(let a=0;a<3;a++){const angle=a*Math.PI*2/3+.3,r=scene.closed?.13:.29;const p=[scene.x+Math.cos(angle)*r,scene.y-.25,scene.z+Math.sin(angle)*r];rod([scene.x,scene.y,scene.z],p,8,'#e3f1f5');rod(p,[scene.x+Math.cos(angle)*r*.45,scene.y-.4,scene.z+Math.sin(angle)*r*.45],7,'#c7dce6')}
 if(scene.held)prize3d(scene.held,scene.x,scene.y-.94*scene.held.worldSize-scene.drop,scene.z);
 polygon([[-1.95,.07,-.47],[-.88,.07,-.47],[-.88,-.11,-.47],[-1.95,-.11,-.47]],'#d58daf');
}
function updateClaw(){scene.x=(x-50)/30;scene.z=2.2-depth*.024;drawScene()}
function animateScene(values,duration=600){const from={};for(const k in values)from[k]=scene[k];if(matchMedia('(prefers-reduced-motion: reduce)').matches){Object.assign(scene,values);drawScene();return Promise.resolve()}return new Promise(resolve=>{let start;function frame(t){if(start===undefined)start=t;const f=Math.min(1,(t-start)/duration),ease=f*f*(3-2*f);for(const k in values)scene[k]=from[k]+(values[k]-from[k])*ease;drawScene();if(f<1)requestAnimationFrame(frame);else resolve()}requestAnimationFrame(frame)})}
// Delivery previews use the exact same model, colors, shading, and pose as the chamber.
function createPrizePreview(appearance){
 const output=document.createElement('canvas');output.width=480;output.height=400;
 output.setAttribute('role','img');output.setAttribute('aria-label',prizes.find(p=>p.id===appearance.prize)?.name||'Ticket capsule');
 const chamberCanvas=canvas,chamberContext=ctx;
 try{
  canvas={clientWidth:240,clientHeight:200};ctx=output.getContext('2d');ctx.scale(2,2);
  const model={...appearance,worldSize:appearance.prize?2.3:2.7};
  shadow(0,0,.55);prize3d(model,0,0,0);
 }finally{canvas=chamberCanvas;ctx=chamberContext}
 return output;
}
updateClaw();render();
