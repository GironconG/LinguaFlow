(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const i={user:{points:0,completedLessons:[]},currentLesson:null,lessons:[{id:"reading-hiragana-1",category:"Reading",title:"Hiragana basics (A-O)",description:"Aprende las 5 vocales fundamentales (あ, い, う, え, お).",icon:"🏮",requiredPoints:0,cards:[{type:"info",eng:"A",esp:"あ",phonetic:"/a/"},{type:"info",eng:"I",esp:"い",phonetic:"/i/"},{type:"quiz",question:'¿Cuál es el Hiragana de la vocal "A"?',options:["あ","い","え"],correct:0}]},{id:"speaking-greetings",category:"Speaking",title:"Saludos de cortesía",description:"Frases esenciales para el día a día.",icon:"👋",requiredPoints:50,cards:[{type:"info",eng:"Hello",esp:"Konnichiwa (こんにちは)",phonetic:"/kon-ni-chiwa/"},{type:"info",eng:"Good Morning",esp:"Ohayou (おはよう)",phonetic:"/o-hayou/"},{type:"quiz",question:'¿Cómo se dice "Hola" de forma estándar?',options:["Sayonara","Konnichiwa","Ohayou"],correct:1}]},{id:"grammar-basics",category:"Grammar",title:'Estructura "Desu"',description:"Cómo presentarte y definir cosas.",icon:"⛩️",requiredPoints:100,cards:[{type:"info",eng:"It is...",esp:"...Desu (...です)",phonetic:"/des/"},{type:"quiz",question:'¿Qué palabra se usa al final para decir "Es"?',options:["Desu","Mesu","Kesu"],correct:0}]}]},d={onboarding:document.getElementById("onboarding"),lesson:document.getElementById("lesson-view"),chat:document.getElementById("chat-view")},u={points:document.querySelector(".points-badge")};function p(){const n=document.querySelector(".showcase-grid");n.innerHTML="",i.lessons.forEach(t=>{const r=i.user.points<t.requiredPoints,o=document.createElement("div");o.className=`showcase-item glass ${r?"locked":""}`,r||(o.dataset.lesson=t.id),o.innerHTML=`
            <div class="category-tag">${t.category}</div>
            <div class="item-icon">${t.icon}</div>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${i.user.completedLessons.includes(t.id)?"100":"0"}%"></div>
            </div>
            <span class="item-status">${r?`Necesitas ${t.requiredPoints}★`:"Disponible"}</span>
        `,r||(o.onclick=()=>{const e=i.lessons.find(s=>s.id===t.id);g("lesson"),m(e)}),n.appendChild(o)})}function g(n){Object.values(d).forEach(t=>t.classList.add("hidden")),d[n].classList.remove("hidden")}function m(n){i.currentLesson=n,d.lesson.innerHTML=`
        <div class="lesson-card glass animate-slide">
            <span class="category-indicator">${n.category}</span>
            <h2>${n.title}</h2>
            <div id="card-container"></div>
            <div class="lesson-controls">
                <button id="next-card" class="btn-primary">Siguiente</button>
            </div>
        </div>
    `;let t=0;const r=()=>{const e=n.cards[t],s=document.getElementById("card-container");e.type==="info"?s.innerHTML=`
                <div class="vocab-card animate-pop">
                    <div class="esp">${e.esp}</div>
                    <div class="eng">${e.eng}</div>
                    <div class="phonetic">${e.phonetic}</div>
                </div>
            `:(s.innerHTML=`
                <div class="quiz-card animate-pop">
                    <p class="question">${e.question}</p>
                    <div class="options">
                        ${e.options.map((a,c)=>`<button class="opt-btn" data-idx="${c}">${a}</button>`).join("")}
                    </div>
                </div>
            `,document.querySelectorAll(".opt-btn").forEach(a=>{a.onclick=c=>{parseInt(c.target.dataset.idx)===e.correct?(c.target.classList.add("correct"),i.user.points+=10,l(),setTimeout(o,800)):c.target.classList.add("wrong")}}))},o=()=>{t++,t<n.cards.length?r():f()};document.getElementById("next-card").onclick=o,r()}function f(){i.user.completedLessons.includes(i.currentLesson.id)||(i.user.completedLessons.push(i.currentLesson.id),i.user.points+=20),d.lesson.innerHTML=`
        <div class="lesson-complete glass">
            <h1 class="item-icon">✨</h1>
            <h2 class="gradient-text">¡Módulo Completado!</h2>
            <p>Has ganado puntos para desbloquear la siguiente pieza de tu vitrina.</p>
            <button class="btn-primary" onclick="switchScreen('onboarding')">Volver a la Vitrina</button>
        </div>
    `,l()}function l(){u.points.innerText=`★ ${i.user.points}`}p();l();
