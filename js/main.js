// 移动端菜单
const navToggle=document.getElementById('navToggle'),menu=document.getElementById('menu');
if(navToggle)navToggle.addEventListener('click',()=>menu.classList.toggle('open'));
if(menu)menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

// 滚动渐显
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// 数字滚动
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.count,d=1400,t0=performance.now();(function tick(t){const p=Math.min((t-t0)/d,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)})(t0);cio.unobserve(el)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

// 选项卡（产品筛选/IR 分类）
document.querySelectorAll('.tabs').forEach(group=>{
  group.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{
    group.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
    tab.classList.add('on');
  }));
});

// 演示表单
document.querySelectorAll('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();
  const btn=f.querySelector('[type=submit]');
  if(btn){btn.textContent='已提交（演示）';btn.disabled=true;}
}));
