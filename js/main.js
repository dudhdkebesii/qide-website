// 移动端菜单
const navToggle=document.getElementById('navToggle'),menu=document.getElementById('menu');
if(navToggle)navToggle.addEventListener('click',()=>menu.classList.toggle('open'));
if(menu)menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

// 滚动渐显
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const sib=e.target.parentElement?e.target.parentElement.children:[];
  const idx=Array.from(sib).indexOf(e.target);
  e.target.style.transitionDelay=Math.min(idx*70,350)+'ms';
  e.target.classList.add('in');io.unobserve(e.target);
}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// 公司图片：色块 → 图片滚动浮现
const fio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');fio.unobserve(e.target)}}),{threshold:.35});
document.querySelectorAll('.about-visual .frame').forEach(f=>fio.observe(f));

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

// 应用领域卡片：点击展开详情（不跳转）
document.querySelectorAll('.app-card').forEach(card=>{
  card.addEventListener('click',()=>card.classList.toggle('open'));
});

// 产品中心：分类筛选
document.querySelectorAll('.filter-bar .fbtn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-bar .fbtn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    const f=btn.dataset.filter;
    document.querySelectorAll('.pcard').forEach(card=>{
      const show=f==='all'||card.dataset.cat===f;
      if(show){card.style.display='';requestAnimationFrame(()=>card.classList.remove('hide'));}
      else{card.classList.add('hide');setTimeout(()=>{if(card.classList.contains('hide'))card.style.display='none';},280);}
    });
  });
});

// 产品详情页：从 URL hash 读取产品名，并填充产品专属内容
const PRODUCTS={
  '无填充尼龙系列':{
    sub:'高性能尼龙复合材料 · PA6 无填充系列 · 一般注塑级',
    meta:{desc:'一般注塑级',model:'N6100',feature:'通用级 · 高流动 · 耐候 · 耐黄变',apps:'电子电器，电子接插件，一般工业结构件，尼龙扎带，卡扣，玩具'},
    intro:'Kitech高性能尼龙6.66复合材料系列：将高强度与外观性完美结合，兼具刚性与韧性的平衡，非常适用于动态型产品，如汽车零部件、运动器材、婴儿童车等结构部件的以塑代钢，是满足轻量化需求的优选材料。选用进口国际大厂聚酰胺切片作为基材，潜心研究数十种高性能玻璃纤维、矿物纤维及填充剂的力学性能、分散效果与骨架作用，配以现代化高精度、高扭矩双螺杆高速挤出系统，自主创新螺杆组合与科学挤出工艺，获得性能优异且稳定的产品组合。本系列为无填充通用注塑级，具备高流动、耐候、耐黄变特性，广泛应用于电子电器、电子接插件、一般工业结构件、尼龙扎带、卡扣及玩具等制品。',
    tags:['高流动','耐候','耐黄变','通用级','易加工'],
    specs:[
      {prop:'密度',std:'ISO 1183',unit:'g/cm³',val:'1.14'},
      {prop:'熔融指数（275℃/5kg）',std:'ISO 1133',unit:'g/10min',val:'≈25'},
      {prop:'拉伸强度',std:'ISO 527',unit:'MPa',val:'75'},
      {prop:'断裂伸长率',std:'ISO 527',unit:'%',val:'25'},
      {prop:'弯曲强度',std:'ISO 178',unit:'MPa',val:'105'},
      {prop:'弯曲模量',std:'ISO 178',unit:'MPa',val:'2800'},
      {prop:'缺口冲击强度（23℃）',std:'ISO 179',unit:'kJ/m²',val:'5'},
      {prop:'热变形温度（1.8MPa）',std:'ISO 75',unit:'℃',val:'70'},
      {prop:'熔点',std:'ISO 3146',unit:'℃',val:'220'},
      {prop:'吸水率（23℃/24h）',std:'ISO 62',unit:'%',val:'1.2'},
      {prop:'成型收缩率',std:'ISO 294',unit:'%',val:'1.2'},
      {prop:'阻燃等级',std:'UL94',unit:'—',val:'HB'}
    ],
    apps:[['📟','电子电器'],['🔌','电子接插件'],['🛠','工业结构件'],['🔗','尼龙扎带·卡扣'],['⚙','齿轮·耐磨件'],['🧸','玩具·消费品']]
  },
  _default:{
    sub:'主营产品 · 占营业收入 42.08% · 高强度 · 耐高温 · 尺寸稳定',
    meta:{desc:'改性工程塑料',model:'多牌号可选',feature:'高强度 · 耐高温 · 尺寸稳定',apps:'新能源汽车、运动器材、高端家电、婴童用品、电子电气等'},
    intro:'以尼龙（PA）为基体的改性工程塑料，具备高强度、耐热性与尺寸稳定性，广泛应用于新能源汽车、运动器材、高端家电等领域的结构件与功能件，是公司第一大主营产品（占营业收入 42.08%）。',
    tags:['耐高温','高强度','尺寸稳定','可定制'],
    specs:[],
    apps:[['🚗','新能源汽车'],['🏋','运动器材'],['📺','高端家电'],['👶','婴童用品'],['⚙','电子电气']]
  }
};
if(location.pathname.indexOf('product-detail')>=0){
  const name=decodeURIComponent((location.hash||'').replace('#',''))||'改性尼龙复合材料';
  const p=PRODUCTS[name]||PRODUCTS._default;
  document.querySelectorAll('[data-pname]').forEach(el=>el.textContent=name);
  document.title=name+' · 奇德新材';
  const sub=document.querySelector('[data-sub]');
  if(sub)sub.textContent=p.sub;
  const intro=document.querySelector('[data-intro]');
  if(intro)intro.textContent=p.intro;
  document.querySelectorAll('[data-meta]').forEach(el=>{const k=el.dataset.meta;if(p.meta[k])el.textContent=p.meta[k];});
  const tags=document.querySelector('[data-tags]');
  if(tags)tags.innerHTML=p.tags.map(t=>'<span>'+t+'</span>').join('');
  const specs=document.querySelector('[data-specs]');
  if(specs){
    if(p.specs.length){
      specs.innerHTML=p.specs.map(s=>'<tr><td>'+s.prop+'</td><td>'+s.std+'</td><td>'+s.unit+'</td><td><b>'+s.val+'</b></td></tr>').join('');
    }else{
      specs.innerHTML='<tr><td colspan="4" style="color:var(--muted);padding:22px 16px">该系列包含多个子系列（玻纤增强、增韧耐寒、阻燃、碳纤增强等），典型性能参数请进入具体子系列详情，或<a href="contact.html" style="color:var(--accent-ink);font-weight:600">索取 TDS 技术数据表</a>。</td></tr>';
    }
  }
  const apps=document.querySelector('[data-apps]');
  if(apps)apps.innerHTML=p.apps.map(a=>'<div class="app"><div class="ico">'+a[0]+'</div><b>'+a[1]+'</b></div>').join('');
}
