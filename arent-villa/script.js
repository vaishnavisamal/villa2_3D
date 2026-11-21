(function(){'use strict';
var IMG={
 "logo": "images/logo.png",
 "s1": "images/pawna-lake-view.jpg",
 "s2": "images/pool-hills.jpg",
 "s3": "images/villa-exterior.jpg",
 "loc_mal": "images/hero-aerial-villa.jpg",
 "pool": "images/pool.jpg",
 "pool2": "images/pool2.jpg",
 "living": "images/living.jpg",
 "bed1": "images/bed1.jpg",
 "bed2": "images/bed2.jpg",
 "bed3": "images/bed3.jpg",
 "jacuzzi": "images/jacuzzi.jpg",
 "games": "images/games.jpg",
 "deck": "images/deck.jpg",
 "dining": "images/dining.jpg",
 "kids": "images/kids.jpg",
 "veranda": "images/veranda.jpg",
 "hero1": "images/hero-courtyard.jpg",
 "n_ext": "images/n_ext.jpg",
 "n_pool": "images/n_pool.jpg",
 "n_poolview": "images/n_poolview.jpg",
 "n_live1": "images/n_live1.jpg",
 "n_live2": "images/n_live2.jpg",
 "n_kitchen": "images/n_kitchen.jpg",
 "n_bed1": "images/n_bed1.jpg",
 "n_bed2": "images/n_bed2.jpg",
 "n_balcony": "images/n_balcony.jpg",
 "n_bath": "images/n_bath.jpg",
 "n_court": "images/n_court.jpg"
},PHONE='919371337557';
document.querySelectorAll('[data-img]').forEach(function(e){e.src=IMG[e.getAttribute('data-img')];});
var t=document.querySelector('.nav-toggle'),n=document.getElementById('main-nav');
if(t){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o?'true':'false');});}
n.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){n.classList.remove('open');});});
var slides=document.querySelectorAll('.slide'),dots=document.querySelectorAll('#dots button'),cnt=document.getElementById('slide-count'),cur=0,timer;
function show(i){cur=(i+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('active',k===cur);});dots.forEach(function(d,k){d.classList.toggle('on',k===cur);});cnt.textContent='0'+(cur+1)+' / 0'+slides.length;}
function start(){clearInterval(timer);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(function(){show(cur+1);},5500);}
dots.forEach(function(d,k){d.addEventListener('click',function(){show(k);start();});});start();
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});els.forEach(function(e){io.observe(e);});}else{els.forEach(function(e){e.classList.add('in');});}
var f=document.getElementById('plan-form'),err=document.getElementById('form-error');
f.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(f),dest=d.get('dest'),g=d.get('guests');
f.querySelectorAll('select').forEach(function(s){s.classList.remove('invalid');});
if(!dest||!g){if(!dest)f.elements.dest.classList.add('invalid');if(!g)f.elements.guests.classList.add('invalid');err.textContent='Please choose a destination and number of guests.';err.hidden=false;return;}
err.hidden=true;
var L=['Hello Arent Villa, I would like to plan a getaway.','Destination: '+dest,'Date: '+(d.get('date')||'Not sure yet'),'Guests: '+g];
window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(L.join('\n')),'_blank','noopener');});
})();

(function(){
'use strict';
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=window.matchMedia('(pointer: fine)').matches;

/* scroll progress + parallax */
var prog=document.getElementById('progress'),par=[].slice.call(document.querySelectorAll('[data-parallax]')),ticking=false;
function onScroll(){
  var h=document.documentElement.scrollHeight-innerHeight;
  prog.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
  if(!reduce)par.forEach(function(el){var r=el.getBoundingClientRect();if(r.bottom<-100||r.top>innerHeight+100)return;
    var c=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.translate='0 '+(c*-parseFloat(el.getAttribute('data-parallax'))).toFixed(1)+'px';});
  ticking=false;
}
addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(onScroll);}},{passive:true});onScroll();

/* hero heading: word-by-word 3D entrance */
var h1=document.querySelector('.hero-copy h1');
if(h1&&!h1.dataset.split){h1.dataset.split=1;var txt=h1.textContent.trim();h1.setAttribute('aria-label',txt);
  h1.innerHTML=txt.split(/\s+/).map(function(w,i){return '<span class="w" aria-hidden="true" style="--d:'+i+'">'+w+'</span>';}).join(' ');}

/* hero mouse depth */
var hero=document.querySelector('.hero');
if(hero&&fine&&!reduce){hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();
  hero.style.setProperty('--mx',(((e.clientX-r.left)/r.width)*2-1).toFixed(3));hero.style.setProperty('--my',(((e.clientY-r.top)/r.height)*2-1).toFixed(3));});
  hero.addEventListener('pointerleave',function(){hero.style.setProperty('--mx',0);hero.style.setProperty('--my',0);});}

/* golden dust particles */
var cv=document.getElementById('dust');
if(cv&&!reduce){var cx=cv.getContext('2d'),P=[],W=0,H=0,vis=true,dpr=Math.min(devicePixelRatio||1,2);
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0);}
  function mk(init){return{x:Math.random()*W,y:init?Math.random()*H:H+10,r:Math.random()*2.2+.6,v:Math.random()*.35+.12,s:Math.random()*Math.PI*2,a:Math.random()*.5+.25};}
  size();var n=W<700?26:48;for(var i=0;i<n;i++)P.push(mk(true));
  addEventListener('resize',size);
  new IntersectionObserver(function(e){vis=e[0].isIntersecting;}).observe(hero);
  (function loop(t){if(vis){cx.clearRect(0,0,W,H);P.forEach(function(p,i){p.y-=p.v;p.x+=Math.sin(t/1800+p.s)*.35;if(p.y<-10)P[i]=mk(false);
    var tw=.6+.4*Math.sin(t/600+p.s);cx.beginPath();cx.fillStyle='rgba(255,214,150,'+(p.a*tw).toFixed(2)+')';cx.shadowColor='rgba(255,200,120,.9)';cx.shadowBlur=8;cx.arc(p.x,p.y,p.r,0,6.283);cx.fill();});}
    requestAnimationFrame(loop);})(0);}

/* 3D tilt cards */
if(fine&&!reduce){document.querySelectorAll('.stay,.step').forEach(function(el){
  el.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    el.style.transition='transform .12s ease-out';
    el.style.transform='perspective(900px) rotateX('+((.5-py)*10).toFixed(2)+'deg) rotateY('+((px-.5)*14).toFixed(2)+'deg) scale(1.02)';
    el.style.setProperty('--gx',(px*100)+'%');el.style.setProperty('--gy',(py*100)+'%');el.classList.add('tilting');});
  el.addEventListener('pointerleave',function(){el.style.transition='transform .7s cubic-bezier(.2,.8,.2,1), box-shadow .3s';el.style.transform='';el.classList.remove('tilting');});});
  /* magnetic buttons */
  document.querySelectorAll('.btn').forEach(function(b){
    b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.translate=((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px '+((e.clientY-r.top-r.height/2)*.35).toFixed(1)+'px';});
    b.addEventListener('pointerleave',function(){b.style.translate='';});});}

/* 3D ring gallery */
var ring=document.getElementById('ring'),scene=document.getElementById('scene');
if(ring&&scene){
  function src(k){var e=document.querySelector('[data-img="'+k+'"]');return e?e.src:'';}
  var items=[['s1','Pawna Dam','50% 50%'],['loc_mal','Malavli, Pune','50% 50%'],['s3','Lonavala','50% 50%'],['pool','Pool with fountain','50% 50%'],['deck','Games deck','50% 50%'],['dining','Open-air dining','50% 50%']];
  var n2=items.length;ring.style.setProperty('--step',(360/n2)+'deg');
  items.forEach(function(it,i){var d=document.createElement('div');d.className='panel';d.style.setProperty('--i',i);
    var im=document.createElement('img');im.src=src(it[0]);im.alt=it[1];im.draggable=false;im.style.objectPosition=it[2];d.appendChild(im);
    var s=document.createElement('span');s.textContent=it[1];d.appendChild(s);ring.appendChild(d);});
  function fit(){var pw=Math.min(innerWidth*.68,440);ring.style.setProperty('--pw',pw+'px');
    ring.style.setProperty('--r',((pw/2)/Math.tan(Math.PI/n2)*1.12).toFixed(0)+'px');}
  fit();addEventListener('resize',fit);
  var rot=0,vel=0,drag=false,lx=0,hover=false,onscreen=true;
  new IntersectionObserver(function(e){onscreen=e[0].isIntersecting;}).observe(scene);
  scene.addEventListener('pointerdown',function(e){drag=true;lx=e.clientX;vel=0;scene.classList.add('drag');scene.setPointerCapture(e.pointerId);});
  scene.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-lx;lx=e.clientX;rot+=dx*.32;vel=dx*.32;});
  function end(){drag=false;scene.classList.remove('drag');}
  scene.addEventListener('pointerup',end);scene.addEventListener('pointercancel',end);
  scene.addEventListener('pointerenter',function(){hover=true;});scene.addEventListener('pointerleave',function(){hover=false;});
  (function spin(){if(onscreen){if(!drag){rot+=vel;vel*=.95;if(!hover&&!reduce&&Math.abs(vel)<.05)rot+=.1;}ring.style.setProperty('--rot',rot.toFixed(2)+'deg');}requestAnimationFrame(spin);})();
}
})();

(function(){var W='919371337557',cw=document.getElementById('cw'),fab=cw.querySelector('.cw-fab'),body=document.getElementById('cw-body'),inp=document.getElementById('cw-input');
function set(o){cw.classList.toggle('open',o);fab.setAttribute('aria-expanded',o);if(o){cw.classList.add('seen');setTimeout(function(){inp.focus()},250)}}
function add(t,c){var d=document.createElement('div');d.className='cw-msg '+c;d.textContent=t;body.appendChild(d);body.scrollTop=body.scrollHeight;return d}
function send(t){t=(t||'').trim();if(!t)return;add(t,'me');var u='https://wa.me/'+W+'?text='+encodeURIComponent('Hello Arent Villa, '+t);var r=add('Opening WhatsApp so you can send this to our team. ','bot');var a=document.createElement('a');a.href=u;a.target='_blank';a.rel='noopener';a.textContent='Tap here if it does not open';r.appendChild(a);document.getElementById('cw-chips').style.display='none';inp.value='';setTimeout(function(){window.open(u,'_blank','noopener')},500)}
fab.addEventListener('click',function(){set(!cw.classList.contains('open'))});
cw.querySelector('.cw-close').addEventListener('click',function(){set(false)});
document.getElementById('cw-form').addEventListener('submit',function(e){e.preventDefault();send(inp.value)});
document.getElementById('cw-chips').addEventListener('click',function(e){if(e.target.tagName==='BUTTON')send(e.target.textContent)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
})();
