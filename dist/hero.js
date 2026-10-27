function renderHero(){
 const select=document.querySelector('#heroPlatform'),grid=document.querySelector('#heroGames');if(!select||!grid)return;
 const chosen=select.value;const all=[...new Set(games.flatMap(platforms))].sort((a,b)=>a.localeCompare(b));
 select.innerHTML='<option value="">Todas as plataformas</option>'+all.map(p=>'<option value="'+esc(p)+'">'+esc(p)+'</option>').join('');select.value=chosen;
 const ordered=[...games].sort((a,b)=>(a.top_pick||99999)-(b.top_pick||99999)||(b.stars||0)-(a.stars||0));
 let picks=[];if(chosen)picks=ordered.filter(g=>platforms(g).includes(chosen)).slice(0,6);else {for(const family of ['PlayStation','Xbox','Nintendo','Sega','Computadores','Outras']){const match=ordered.find(g=>platforms(g).some(p=>platformFamily(p)===family)&&!picture(g).startsWith('data:'));if(match)picks.push(match)}for(const g of ordered){if(picks.length>=6)break;if(!picks.includes(g))picks.push(g)}}
 grid.innerHTML=picks.map(g=>'<a class="hero-game" href="'+esc(safeURL(g.url))+'" target="_blank" rel="noopener noreferrer"><img src="'+esc(picture(g))+'" alt="'+esc(g.title)+'"><span><small>'+esc(g.platform)+'</small><strong>'+esc(g.title)+'</strong></span></a>').join('');
 grid.querySelectorAll('img').forEach((img,i)=>img.addEventListener('error',()=>{img.src=fallbackPoster(picks[i])},{once:true}));
}
document.querySelector('#heroPlatform').addEventListener('change',renderHero);if(games.length)renderHero();
