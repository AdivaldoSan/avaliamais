//=====Busca link da API no config.js

const API =  window.API_URL 

// ===============================
function normalizarChave(s){
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function tabelaParaObjetos(linhas){
  const cab = linhas[0].map(normalizarChave);

  return linhas.slice(1).map(l => {
    let obj = {};
    cab.forEach((c,i)=>{
      obj[c] = l[i];
    });
    return obj;
  });
}

// ===============================
async function carregarBancoCompleto(){

    const token = localStorage.getItem("TOKEN");

    if(!token){
        window.location.replace("index.html");
        return;
    }

    try {

        const [respQuestoes, respDescritores] = await Promise.all([
            fetch(API + "?tipo=questoes&token=" + token),
            fetch(API + "?tipo=descritores&token=" + token)
        ]);

        const q = await respQuestoes.json();
        const d = await respDescritores.json();

        if(q.erro || d.erro){

            localStorage.removeItem("TOKEN");
            window.location.replace("index.html");
            return;
        }

        return {
            questoes: tabelaParaObjetos(q),
            descritores: tabelaParaObjetos(d)
        };

    } catch (e) {

        console.error("Erro ao carregar banco:", e);

        alert("Erro de conexão com o servidor.");

        return {
            questoes: [],
            descritores: []
        };
    }
}

// ===============================
async function fetchProtegido(url, options = {}){

    const resp = await fetch(url, options);
    const dados = await resp.json();

    if(dados.erro === "nao_autorizado"){

        localStorage.removeItem("TOKEN");

        window.location.replace("index.html");
        return null;
    }

    return dados;
}

// ===============================
// PROTEÇÃO AUTOMÁTICA AO CARREGAR PÁGINA
// ===============================

(function(){

    const paginasPublicas = [
        "index.html",
        "aluno.html",
        "quiz.html",
        "cadastro.html"
    ];

    let paginaAtual = window.location.pathname;

if(paginaAtual.endsWith("/")){
    paginaAtual = "index.html";
}else{
    paginaAtual = paginaAtual.substring(paginaAtual.lastIndexOf("/") + 1);
}

    // EXCEÇÃO páginas públicas
    if(paginasPublicas.includes(paginaAtual)){
        return;
    }

    const token = localStorage.getItem("TOKEN");

    if(!token){
        window.location.replace("index.html");
    }

})();

// ===============================
// LOGOUT POR INATIVIDADE
// ===============================

(function(){

    const TEMPO_LIMITE = 30 * 60 * 1000;

    const paginasPublicas = [
        "index.html",
        "aluno.html",
        "quiz.html",
        "cadastro.html"
    ];

    let paginaAtual =
        window.location.pathname.split("/").pop();

    if(!paginaAtual){
        paginaAtual = "index.html";
    }

    if(paginasPublicas.includes(paginaAtual)){
        return;
    }

    let timer;

    function resetarTimer(){
        clearTimeout(timer);
        timer = setTimeout(encerrarSessao, TEMPO_LIMITE);
    }

    function encerrarSessao(){
        localStorage.removeItem("TOKEN");
        window.location.replace("index.html");
    }

    ["click","mousemove","keydown","scroll","touchstart"]
        .forEach(evento=>{
            document.addEventListener(evento, resetarTimer, true);
        });

    resetarTimer();

})();
