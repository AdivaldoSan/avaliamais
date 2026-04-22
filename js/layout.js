function criarLayout(){
    if(typeof QRCode === "undefined"){
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js";
    document.head.appendChild(script);
    }
    
    const token = localStorage.getItem("TOKEN");
    const perfil = localStorage.getItem("PERFIL");
    const nome = localStorage.getItem("NOME");

    if(!token){
        window.location.href = "index.html";
        return;
    }

    // Detecta página atual
    const paginaAtual =
        window.location.pathname.split("/").pop();

    document.body.innerHTML = `
    <div class="app">

        <div class="sidebar" id="sidebar">

  <div class="logo-area">
    <h2 class="logo">
      Avalia<span class="logo-plus">+</span>
    </h2>
    <p class="logo-sub">
      Plataforma de Avaliação Digital
    </p>
  </div>

  <div class="menu-principal">
    <a href="painel.html"
       class="${paginaAtual==='painel.html'?'active':''}">
       Relatórios
    </a>

    <a href="professor.html"
       class="${paginaAtual==='professor.html'?'active':''}">
       Gerar Simulado
    </a>

    <a href="turmas.html"
       class="${paginaAtual==='turmas.html'?'active':''}">
       Turmas
    </a>

    <a href="dashboard.html"
       class="${paginaAtual==='dashboard.html'?'active':''}">
       Dashboard
    </a>

    <a href="#"
       onclick="abrirScanner()"
       class="${paginaAtual==='scanner.html'?'active':''}">
       Corrigir Prova
    </a>

    <a href="provas.html"
       onclick="return acessarProvas(event)"
       class="${paginaAtual==='provas.html'?'active':''}">
       Gerar Prova Impressa
    </a>

    <a href="lab_questoes.html"
       class="${paginaAtual==='lab_questoes.html'?'active':''}">
       Cadastrar Questões 
    </a>
   
    ${perfil === "ADMIN" ? `
      <a href="admin.html"
         class="${paginaAtual==='admin.html'?'active':''}">
         Admin
      </a>
    
    ` : ``}
  </div>

  <div class="sidebar-bottom">
    <a href="sobre.html"
       class="${paginaAtual==='sobre.html'?'active':''}">
       Sobre
    </a>
  </div>

</div>

        <div class="overlay"
             id="overlay"
             onclick="toggleMenu()"></div>

        <div class="main">

            <div class="topbar">
                <div class="menu-toggle"
                     onclick="toggleMenu()">☰</div>

                <div class="user-info">
                    ${nome} (${perfil})
                    <button class="btn-logout"
                            onclick="logout()">Sair</button>
                </div>
            </div>

            <div class="page-content"
                 id="conteudo"></div>

        </div>
    </div>
    `;
    aplicarBloqueioMenuLocal();
}

function toggleMenu(){
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
}

function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}

function isMobile(){
    return window.innerWidth <= 900;
}
//===================================================
function abrirScanner(){

    if(isMobile()){
        window.location.href = "/scanner.html";
        return;
    }

    abrirModalScanner();
}
//=================================================================
function abrirModalScanner(){

    const path = window.location.pathname.split("/")[1];
    const base = path ? `/${path}` : "";
    
    const link = window.location.origin + base + "/corrigir";
    const linkDisplay = link
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "");

    const modal = document.createElement("div");
    modal.id = "modalScanner";

    modal.innerHTML = `
<div style="
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.85);
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:9999;
">

    <div style="
        background:#121212;
        padding:30px;
        border-radius:16px;
        width:95%;
        max-width:850px;
        color:#fff;
        box-shadow:0 0 30px rgba(0,0,0,0.5);
    ">

        <div style="
            display:flex;
            gap:30px;
            flex-wrap:wrap;
            align-items:center;
        ">

            <!-- ESQUERDA (QR) -->
            <div style="flex:1; text-align:center; min-width:250px;">
                
                <h2 style="
                    margin-bottom:10px;
                    color:#4da3ff;
                ">
                    📷 Use no celular
                </h2>

                <div id="qrScanner"
                     style="
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:#fff;
                        padding:16px;
                        border-radius:12px;
                        width:fit-content;
                        margin:15px auto;
                     ">
                </div>

                <p style="
                    font-size:13px;
                    opacity:0.6;
                ">
                    Escaneie o QR Code
                </p>
            </div>

            <!-- DIREITA (INSTRUÇÕES) -->
            <div style="flex:1; min-width:260px;">

                <h3 style="
                    margin-bottom:10px;
                    color:#4da3ff;
                ">
                    Como acessar
                </h3>

                <ol style="
                    line-height:1.7;
                    font-size:14px;
                    opacity:0.9;
                    padding-left:18px;
                ">
                    <li>Abra a câmera do celular</li>
                    <li>Aponte para o QR Code</li>
                    <li>Toque no link exibido</li>
                    <li>Faça login no sistema</li>
                    <li>O scanner abrirá automaticamente</li>
                </ol>

                <div style="
                    margin-top:15px;
                    padding:12px;
                    background:#1e1e1e;
                    border:1px solid #333;
                    border-radius:8px;
                    font-size:13px;
                    word-break:break-all;
                ">
                
                    Ou digite no navegador:<br>
                
                    <span style="
                        color:#4da3ff;
                        font-weight:bold;
                        user-select:all;
                        cursor:text;
                    ">
                        ${linkDisplay}
                    </span>
                
                </div>

            </div>

        </div>

        <div style="text-align:center; margin-top:25px;">
            <button onclick="fecharModalScanner()" class="btn-primary">
                Fechar
            </button>
        </div>

    </div>
</div>
`;

    document.body.appendChild(modal);

   new QRCode(document.getElementById("qrScanner"), {
    text: link,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff", // FUNDO BRANCO FORÇADO
    correctLevel: QRCode.CorrectLevel.H
});

const qrEl = document.querySelector("#qrScanner img, #qrScanner canvas");
if(qrEl){
    qrEl.style.display = "block";
    qrEl.style.width = "220px";
    qrEl.style.height = "220px";
}
    
}

function fecharModalScanner(){
    const modal = document.getElementById("modalScanner");
    if(modal) modal.remove();
}
//==============================
function aplicarBloqueioMenuLocal(){

    const temTurma = localStorage.getItem("TEM_TURMA") === "1";

    const links = document.querySelectorAll(".menu-principal a");

    links.forEach(link => {

        const href = link.getAttribute("href") || "";

        const permitido =
            href.includes("turmas") ||
            href.includes("sobre");

        // 🔴 SEM TURMA → BLOQUEIA
        if(!temTurma && !permitido){
            link.style.opacity = "0.4";
            
            if(!href.includes("provas")){
                link.style.pointerEvents = "none";
            }
            
            link.style.cursor = "not-allowed";
            link.title = "Cadastre uma turma para liberar";
        }

        // 🟢 COM TURMA → DESBLOQUEIA
        if(temTurma){
            link.style.opacity = "";
            link.style.pointerEvents = "";
            link.style.cursor = "";
            link.title = "";
        }
    });
}
//=====================================================
function acessarProvas(e){

    if(isMobile()){
        e.preventDefault();

        alert("⚠️ A geração de provas ainda não está disponível no celular.\n\nAcesse pelo computador.");

        return false;
    }

    return true;
}
//====================================================
