function norm(s){return (s||"").toLowerCase();}
var STOPW=new Set(["and","the","for","with","from","that","this","want","need","make","build","help","into","your","you","are","use","using","when","what","how","a","an","of","to","i","my"]);
function tokens(s){return norm(s).split(/[^a-z0-9+.#-]+/).filter(function(w){return w&&w.length>1&&!STOPW.has(w);});}
function fuzzy(hay,needle){var hi=0;for(var i=0;i<needle.length;i++){hi=hay.indexOf(needle[i],hi);if(hi===-1)return 0;hi++;}return 0.35;}
function searchSkills(query,index){
  var qs=tokens(query), full=norm(query).trim();
  if(!full||!index||!index.length) return [];
  var out=[];
  for(var k=0;k<index.length;k++){var e=index[k];
    var name=norm(e.name), blob=norm((e.when||"")+" "+(e.tags||[]).join(" ")+" "+(e.keywords||[]).join(" "));
    var score=0, why=[];
    if(full.length>2&&name===full){score+=10;why.push("exact name");}
    var hits=0;
    for(var j=0;j<qs.length;j++){var q=qs[j];
      if(name.indexOf(q)>-1){score+=3;hits++;}
      else if(blob.indexOf(q)>-1){score+=1.4;hits++;}
      else{var f=fuzzy(name+" "+blob,q); if(f){score+=f;}}
    }
    if(qs.length>1&&hits>=2) score+=1.5;
    if(qs.length&&hits===0) continue;
    if(e.risk==="critical") score-=1.5;
    out.push({name:e.name,when:e.when||"",tags:e.tags||[],risk:e.risk||"safe",src:e.src||"",score:Math.round(score*100)/100,why:(why[0]||(hits+" keyword hit"+(hits>1?"s":"")))});
  }
  out.sort(function(a,b){return b.score-a.score;});
  return out.slice(0,8);
}
function buildPrompt(task,picks){
  var L=[];
  L.push('Task{ goal: "'+String(task).slice(0,200).replace(/"/g,"'")+'"; constraints: "only listed skills, no invented names, critical needs approval"; success: "works first try" }');
  picks.forEach(function(p,i){L.push('Skill['+(i+1)+']{ name: "'+p.name+'"; why: "'+p.why+'"; method: "use '+p.name+' for '+(p.when||"task").slice(0,110).replace(/"/g,"'")+'"; order: '+(i+1)+' }');});
  L.push("Tools[MCP]: only already-configured MCP; validate args, minimal scope");
  L.push("Execute: inspect -> plan -> change -> verify -> report");
  L.push("Verify: names exist in index; checks run; risk stated");
  return L.join("\n");
}
if(typeof module!=="undefined") module.exports={searchSkills:searchSkills,buildPrompt:buildPrompt};
