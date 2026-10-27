function renderHero(){
 const select=document.querySelector('#heroPlatform'),grid=document.querySelector('#heroGames');if(!select||!grid)return;
 const chosen=select.value;const all=[...new Set(games.flatMap(platforms))].sort((a,b)=>a.localeCompare(b));
 select.innerHTML='<option value="">Todas as plataformas</option>'+all.map(p=>'<option value="'+esc(p)+'">'+esc(p)+'</option>').join('');select.value=chosen;
 const ordered=games.filter(g=>/^https:\/\/github\.com\//i.test(g.url)).sort((a,b)=>(Number(b.stars)||0)-(Number(a.stars)||0)||a.title.localeCompare(b.title));
 const picks=ordered.filter(g=>!chosen||platforms(g).includes(chosen)).slice(0,6);
 grid.innerHTML=picks.map(g=>'<a class="hero-game" href="'+esc(safeURL(g.url))+'" target="_blank" rel="noopener noreferrer"><img src="'+esc(picture(g))+'" alt="'+esc(g.title)+'"><span><small>'+esc(g.platform)+'</small><strong>'+esc(g.title)+'</strong></span></a>').join('');
 grid.querySelectorAll('img').forEach((img,i)=>img.addEventListener('error',()=>{img.src=fallbackPoster(picks[i])},{once:true}));
}
document.querySelector('#heroPlatform').addEventListener('change',renderHero);if(games.length)renderHero();
