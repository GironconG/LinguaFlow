(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const n={user:{points:0,completedLessons:[]},currentLesson:null,lessons:[{id:"reading-hiragana-1",category:"Reading",title:"Hiragana basics (A-O)",description:"Aprende las 5 vocales fundamentales (あ, い, う, え, お).",icon:"🏮",requiredPoints:0,cards:[{type:"info",eng:"A",esp:"あ",phonetic:"/a/"},{type:"info",eng:"I",esp:"い",phonetic:"/i/"},{type:"quiz",question:'¿Cuál es el Hiragana de la vocal "A"?',options:["あ","い","え"],correct:0}]},{id:"speaking-greetings",category:"Speaking",title:"Saludos de cortesía",description:"Frases esenciales para el día a día.",icon:"👋",requiredPoints:50,cards:[{type:"info",eng:"Hello",esp:"Konnichiwa (こんにちは)",phonetic:"/kon-ni-chiwa/"},{type:"info",eng:"Good Morning",esp:"Ohayou (おはよう)",phonetic:"/o-hayou/"},{type:"quiz",question:'¿Cómo se dice "Hola" de forma estándar?',options:["Sayonara","Konnichiwa","Ohayou"],correct:1}]},{id:"grammar-basics",category:"Grammar",title:'Estructura "Desu"',description:"Cómo presentarte y definir cosas.",icon:"⛩️",requiredPoints:100,cards:[{type:"info",eng:"It is...",esp:"...Desu (...です)",phonetic:"/des/"},{type:"quiz",question:'¿Qué palabra se usa al final para decir "Es"?',options:["Desu","Mesu","Kesu"],correct:0}]}]},d={onboarding:document.getElementById("onboarding"),lesson:document.getElementById("lesson-view"),chat:document.getElementById("chat-view")},g={points:document.querySelector(".stars")};function u(){const i=document.querySelector(".showcase-grid");i.innerHTML="",n.lessons.forEach(t=>{const a=n.user.points<t.requiredPoints,o=document.createElement("div");o.className=`showcase-item glass ${a?"locked":""}`,a||(o.dataset.lesson=t.id),o.innerHTML=`
            <div class="category-tag">${t.category}</div>
            <div class="item-icon">${t.icon}</div>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${n.user.completedLessons.includes(t.id)?"100":"0"}%"></div>
            </div>
            <span class="item-status">${a?`Necesitas ${t.requiredPoints}★`:"Disponible"}</span>
        `,a||(o.onclick=()=>{const e=n.lessons.find(s=>s.id===t.id);p("lesson"),m(e)}),i.appendChild(o)})}function p(i){Object.values(d).forEach(t=>t.classList.add("hidden")),d[i].classList.remove("hidden"),i==="onboarding"&&u()}function m(i){n.currentLesson=i,d.lesson.innerHTML=`
        <div class="lesson-card glass animate-slide">
            <span class="category-indicator">${i.category}</span>
            <h2>${i.title}</h2>
            <div id="card-container"></div>
            <div class="lesson-controls">
                <button id="next-card" class="btn-primary">Siguiente</button>
            </div>
        </div>
    `;let t=0;const a=()=>{const e=i.cards[t],s=document.getElementById("card-container");e.type==="info"?s.innerHTML=`
                <div class="vocab-card animate-pop">
                    <div class="esp">${e.esp}</div>
                    <div class="eng">${e.eng}</div>
                    <div class="phonetic">${e.phonetic}</div>
                </div>
            `:(s.innerHTML=`
                <div class="quiz-card animate-pop">
                    <p class="question">${e.question}</p>
                    <div class="options">
                        ${e.options.map((r,c)=>`<button class="opt-btn" data-idx="${c}">${r}</button>`).join("")}
                    </div>
                </div>
            `,document.querySelectorAll(".opt-btn").forEach(r=>{r.onclick=c=>{parseInt(c.target.dataset.idx)===e.correct?(c.target.classList.add("correct"),n.user.points+=10,l(),setTimeout(o,800)):c.target.classList.add("wrong")}}))},o=()=>{t++,t<i.cards.length?a():f()};document.getElementById("next-card").onclick=o,a()}function f(){n.user.completedLessons.includes(n.currentLesson.id)||(n.user.completedLessons.push(n.currentLesson.id),n.user.points+=20),d.lesson.innerHTML=`
        <div class="lesson-complete glass">
            <h1 class="item-icon">✨</h1>
            <h2 class="gradient-text">¡Módulo Completado!</h2>
            <p>Has ganado puntos para desbloquear la siguiente pieza de tu vitrina.</p>
            <button id="back-to-vitrina" class="btn-primary">Volver a la Vitrina</button>
        </div>
    `,document.getElementById("back-to-vitrina").onclick=()=>{p("onboarding")},l()}function l(){g.points.innerText=`★ ${n.user.points}`}u();l();
