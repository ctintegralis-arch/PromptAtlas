import React,{useMemo,useState} from 'react';import{createRoot}from'react-dom/client';import{Search,Command,BookOpen,Star,Copy,Check,ExternalLink,ShieldCheck,Filter,Plus,Menu,X,ArrowUpRight,Info,Download}from'lucide-react';import './style.css';
const raw=`/visualize|Diseño|Explicación visual|Comunitario
/deepdive|Investigación|Análisis profundo|Comunitario
/teachme|Educación|Enseñar un tema|Comunitario
/explaincode|Programación|Explicar código|Comunitario
/debug|Programación|Identificar errores|Comunitario
/research|Investigación|Investigar un tema|Comunitario
/factcheck|Investigación|Verificar afirmaciones|Comunitario
/brainstorm|Creatividad|Generar ideas|Comunitario
/strategy|Negocios|Diseñar estrategia|Comunitario
/architecture|Programación|Diseñar arquitectura|Comunitario
/improve|Escritura|Mejorar contenido|Comunitario
/critique|Análisis|Crítica constructiva|Comunitario
/promptengineer|IA avanzada|Diseñar prompts|Comunitario
/promptaudit|IA avanzada|Auditar prompts|Comunitario
/aiworkflow|Automatización|Diseñar flujos con IA|Comunitario
/masterprompt|IA avanzada|Combinar técnicas|Comunitario
/allinone|Productividad|Integrar enfoques|Comunitario
/eli5|Educación|Explicar sencillamente|Comunitario
/simplify|Escritura|Simplificar|Comunitario
/analogy|Educación|Explicar con analogías|Comunitario
/summarize|Escritura|Resumir|Comunitario
/keypoints|Escritura|Extraer ideas clave|Comunitario
/rewrite|Escritura|Reescribir|Comunitario
/outline|Documentos|Crear esquema|Comunitario
/checklist|Productividad|Lista de verificación|Comunitario
/actionplan|Productividad|Plan de acción|Comunitario
/firstprinciples|Análisis|Primeros principios|Comunitario
/rootcause|Análisis|Causa raíz|Comunitario
/swot|Negocios|Análisis FODA|Comunitario
/decisionmatrix|Negocios|Matriz de decisión|Comunitario
/reviewcode|Programación|Revisar código|Comunitario
/algorithm|Programación|Diseñar algoritmos|Comunitario
/promptchain|IA avanzada|Encadenar prompts|Comunitario
/metaprompt|IA avanzada|Crear prompts generadores|Comunitario
/systemprompt|IA avanzada|Redactar instrucciones de sistema|Comunitario
/multiexpert|Análisis|Contrastar expertos|Comunitario
/redteam|Análisis|Buscar vulnerabilidades|Comunitario
/systemthinking|Negocios|Pensamiento sistémico|Comunitario
/quickwins|Productividad|Mejoras inmediatas|Comunitario
/automationplan|Automatización|Planificar automatizaciones|Comunitario
/persona|Escritura|Definir personaje o perfil|Comunitario
/simulateexpert|Investigación|Simular enfoque experto|Comunitario
/evidence|Investigación|Solicitar evidencias|Comunitario
/uncertainty|Investigación|Identificar incertidumbres|Comunitario
/scorecard|Negocios|Crear evaluación|Comunitario
/ranking|Análisis|Ordenar opciones|Comunitario
/matrixcompare|Análisis|Comparación matricial|Comunitario
/viralhook|Marketing|Crear ganchos|Comunitario
/script60|Video|Guion de 60 segundos|Comunitario
/cta|Marketing|Llamada a la acción|Comunitario
/comic4|Diseño|Cómic de cuatro viñetas|No verificado
/mindmap|Educación|Mapa mental jerárquico|Personalizado
/infografia|Diseño|Infografía educativa|Personalizado
/sticky-notes|Educación|Tarjetas visuales de ideas|Personalizado
/logo|Diseño|Propuesta de logotipo|Personalizado
/retoque|Diseño|Editar imagen adjunta|Personalizado
/storyboard|Video|Secuencia audiovisual|Personalizado
/guion30|Video|Guion de 30 segundos|Personalizado
/guion60|Video|Guion de 60 segundos|Personalizado
/reel|Marketing|Guion para reel|Personalizado
/copy|Marketing|Texto publicitario|Personalizado
/metaads|Marketing|Plan de campaña Meta|Personalizado
/seo|Marketing|Contenido optimizado|Personalizado
/calendario30|Marketing|Calendario editorial mensual|Personalizado
/investigar|Investigación|Investigación con referencias|Personalizado
/evidencia|Investigación|Síntesis de evidencia científica|Personalizado
/pico|Investigación|Pregunta clínica PICO|Personalizado
/comparar|Análisis|Tabla comparativa|Personalizado
/criticar|Análisis|Evaluación crítica|Personalizado
/resumir|Escritura|Resumen estructurado|Personalizado
/reescribir|Escritura|Reescritura profesional|Personalizado
/traducir|Escritura|Traducción|Personalizado
/correo|Escritura|Correo profesional|Personalizado
/tabla|Datos|Tabla organizada|Personalizado
/grafico|Datos|Visualización de datos|Personalizado
/estadistica|Datos|Análisis estadístico|Personalizado
/excel|Documentos|Libro de cálculo|Personalizado
/word|Documentos|Documento Word|Personalizado
/pdf|Documentos|Documento PDF|Personalizado
/presentacion|Documentos|Presentación|Personalizado
/refactor|Programación|Refactorización|Personalizado
/test|Programación|Pruebas de software|Personalizado
/sql|Programación|Consulta SQL|Personalizado
/plan7|Productividad|Plan de siete días|Personalizado
/priorizar|Productividad|Priorización de tareas|Personalizado
/automatizar|Automatización|Diseño de automatización|Personalizado
/foda|Negocios|Matriz FODA|Personalizado
/finanzas|Negocios|Análisis financiero|Personalizado
/negociar|Negocios|Estrategia de negociación|Personalizado
/clase|Educación|Plan de clase|Personalizado
/quiz15|Educación|15 preguntas con respuestas|Personalizado
/flashcards|Educación|Tarjetas de estudio|Personalizado
/feynman|Educación|Explicación sencilla|Personalizado
/debate|Análisis|Debate estructurado|Personalizado
/prompt|IA avanzada|Prompt optimizado|Personalizado
/auditar|IA avanzada|Auditoría de prompt|Personalizado
/agente|IA avanzada|Diseño de agente|Personalizado
/flujo|IA avanzada|Flujo de trabajo|Personalizado`;
const base=raw.split('\n').map((s,i)=>{let [cmd,category,description,status]=s.split('|');return{id:`PA-${String(i+1).padStart(3,'0')}`,cmd,category,description,status,source:status==='Comunitario'?'https://github.com/Ronit049/ChatGPT-Command-Library':'',platform:'ChatGPT (como instrucción, no comando nativo)',example:`${cmd} ${description.toLowerCase()} sobre: [escribe aquí tu tema]`}});
const official=[{id:'OF-001',cmd:'@',category:'ChatGPT oficial',description:'Invocar selector de GPTs en conversación',status:'Oficial verificado',source:'https://help.openai.com/en/articles/8554407-what-are-gpts',platform:'ChatGPT web',example:'Escribe @ y selecciona un GPT disponible'},{id:'OF-002',cmd:'⌥ + Espacio',category:'Atajos',description:'Abrir barra de ChatGPT en Mac',status:'Oficial documentado',source:'https://help.openai.com/',platform:'macOS',example:'Pulsa Opción + Espacio en la aplicación macOS'}];
const all=[...official,...base];const statuses=['Todos','Oficial verificado','Oficial documentado','Comunitario','Personalizado','No verificado'];
function App(){const [query,setQuery]=useState(''),[cat,setCat]=useState('Todas'),[status,setStatus]=useState('Todos'),[tab,setTab]=useState('explorar'),[selected,setSelected]=useState(null),[fav,setFav]=useState(()=>{try{return JSON.parse(localStorage.getItem('pa-favs')||'[]')}catch{return[]}}),[custom,setCustom]=useState(()=>{try{return JSON.parse(localStorage.getItem('pa-custom')||'[]')}catch{return[]}}),[form,setForm]=useState(false),[newCmd,setNewCmd]=useState(''),[newDesc,setNewDesc]=useState(''),[copied,setCopied]=useState('');const data=[...all,...custom];const categories=['Todas',...new Set(data.map(x=>x.category))];const filtered=useMemo(()=>data.filter(x=>(tab!=='favoritos'||fav.includes(x.id))&&(cat==='Todas'||x.category===cat)&&(status==='Todos'||x.status===status)&&`${x.cmd} ${x.description} ${x.category}`.toLowerCase().includes(query.toLowerCase())),[data,tab,fav,cat,status,query]);function toggle(id){let next=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];setFav(next);localStorage.setItem('pa-favs',JSON.stringify(next))}async function copy(s,id){try{await navigator.clipboard.writeText(s);setCopied(id);setTimeout(()=>setCopied(''),1700)}catch{window.prompt('Copia el texto:',s)}}function add(e){e.preventDefault();if(!/^\/[a-z0-9_-]{2,40}$/i.test(newCmd.trim())||!newDesc.trim())return alert('Escribe un comando como /micomando y su descripción');if(data.some(x=>x.cmd===newCmd.trim()))return alert('Ya existe ese comando');let next=[...custom,{id:`CUSTOM-${Date.now()}`,cmd:newCmd.trim(),description:newDesc.trim(),category:'Mis macros',status:'Personalizado',platform:'ChatGPT (instrucción)',example:`${newCmd.trim()} [tema]`,source:''}];setCustom(next);localStorage.setItem('pa-custom',JSON.stringify(next));setForm(false);setNewCmd('');setNewDesc('');setCat('Todas');setTab('explorar')};function exportJSON(){let blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='promptatlas-catalogo.json';a.click();URL.revokeObjectURL(a.href)}return <div className="app"><aside className="sidebar"><div className="brand"><span className="brandicon"><Command size={23}/></span><span><strong>PromptAtlas</strong><small>Tu biblioteca de IA</small></span></div><div className="sidecaption">EXPLORAR</div><button className={tab==='explorar'?'nav active':'nav'} onClick={()=>setTab('explorar')}><BookOpen size={18}/> Biblioteca <span>{data.length}</span></button><button className={tab==='favoritos'?'nav active':'nav'} onClick={()=>setTab('favoritos')}><Star size={18}/> Favoritos <span>{fav.length}</span></button><div className="sidecaption">CATEGORÍAS</div><div className="categoryNav">{categories.filter(x=>x!=='Todas').map(c=><button key={c} className={cat===c?'catnav picked':'catnav'} onClick={()=>{setCat(cat===c?'Todas':c);setTab('explorar')}}>{c}</button>)}</div><div className="sidebottom"><ShieldCheck size={17}/> Estados y fuentes visibles<br/><small>Sin confundir macros con funciones nativas</small></div></aside><main><header><div className="mobilebrand"><Command size={21}/> PromptAtlas</div><span className="headerlabel">Biblioteca de comandos y macros</span><button className="outline small" onClick={exportJSON}><Download size={16}/> Exportar</button></header><div className="content"><div className="hero"><div className="eyebrow">TU CENTRO DE COMANDOS IA <span>• EDICIÓN INICIAL</span></div><h1>Encuentra el comando<br/><em>perfecto para cada idea.</em></h1><p>Busca por tarea, explora categorías y copia prompts listos para usar. Cada ficha distingue funciones oficiales de macros comunitarias y personalizadas.</p><div className="search"><Search size={21}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="¿Qué quieres hacer? Ej. cómic, investigar, publicidad..."/><kbd>⌕</kbd></div></div><div className="stats"><div><strong>{data.length}</strong><span>Entradas catalogadas</span></div><div><strong>{data.filter(x=>x.status==='Comunitario').length}</strong><span>Macros comunitarias</span></div><div><strong>{data.filter(x=>x.status==='Personalizado').length}</strong><span>Macros personalizadas</span></div><div><strong>{fav.length}</strong><span>Tus favoritos</span></div></div><div className="toolbar"><div><h2>{tab==='favoritos'?'Mis favoritos':'Explorar biblioteca'}</h2><p>{filtered.length} resultados encontrados</p></div><button className="primary" onClick={()=>setForm(true)}><Plus size={17}/> Nueva macro</button></div><div className="filters"><label><Filter size={16}/> Categoría <select value={cat} onChange={e=>setCat(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></label><label>Estado <select value={status} onChange={e=>setStatus(e.target.value)}>{statuses.map(s=><option key={s}>{s}</option>)}</select></label><button className="reset" onClick={()=>{setQuery('');setCat('Todas');setStatus('Todos')}}>Limpiar filtros</button></div><div className="cards">{filtered.map(x=><article className="item" key={x.id}><div className="itemtop"><span className="id">{x.id}</span><button className={'star '+(fav.includes(x.id)?'on':'')} title="Guardar favorito" onClick={()=>toggle(x.id)}><Star size={19} fill={fav.includes(x.id)?'currentColor':'none'}/></button></div><h3>{x.cmd}</h3><p>{x.description}</p><div className="tags"><span className="tag">{x.category}</span><span className={'tag state '+(x.status.startsWith('Oficial')?'verified':x.status==='Comunitario'?'community':x.status==='No verificado'?'unknown':'personal')}>{x.status}</span></div><div className="actions"><button onClick={()=>copy(x.example,x.id)}><Copy size={15}/>{copied===x.id?'Copiado':'Copiar ejemplo'}</button><button onClick={()=>setSelected(x)}>Ver ficha <ArrowUpRight size={15}/></button></div></article>)}</div>{!filtered.length&&<div className="empty">No hay resultados. Prueba otro término o limpia los filtros.</div>}<footer>PromptAtlas · Versión 1.0 · Catálogo inicial no exhaustivo. Las macros no son comandos nativos de OpenAI.</footer></div></main>{selected&&<div className="overlay" onClick={()=>setSelected(null)}><section className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><span className="eyebrow">FICHA DE COMANDO · {selected.id}</span><h2>{selected.cmd}</h2><p>{selected.description}</p><div className="detail"><b>Estado</b><span>{selected.status}</span><b>Categoría</b><span>{selected.category}</span><b>Compatibilidad</b><span>{selected.platform}</span><b>Ejemplo práctico</b><div className="example">{selected.example}</div><button className="primary" onClick={()=>copy(selected.example,selected.id)}><Copy size={16}/>{copied===selected.id?'Copiado':'Copiar ejemplo'}</button>{selected.source?<a href={selected.source} target="_blank" rel="noreferrer">Consultar fuente <ExternalLink size={15}/></a>:<small>Sin fuente externa verificada: macro propuesta o referencia no confirmada.</small>}</div><div className="notice"><Info size={17}/> El texto de una macro no garantiza la ejecución de una herramienta. Su resultado depende del modelo y de las funciones disponibles.</div></section></div>}{form&&<div className="overlay" onClick={()=>setForm(false)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={add}><button type="button" className="close" onClick={()=>setForm(false)}><X/></button><span className="eyebrow">TU BIBLIOTECA</span><h2>Nueva macro personalizada</h2><p>Guárdala en este navegador para encontrarla y copiarla cuando la necesites.</p><label>Comando<input value={newCmd} onChange={e=>setNewCmd(e.target.value)} placeholder="/micomando" required/></label><label>¿Qué debe hacer?<textarea value={newDesc} onChange={e=>setNewDesc(e.target.value)} placeholder="Describe su comportamiento..." required/></label><button className="primary" type="submit">Guardar macro</button><small>Las macros se guardan localmente en este dispositivo. Usa Exportar para hacer una copia.</small></form></div>}</div>};createRoot(document.getElementById('root')).render(<App/>);
