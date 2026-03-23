<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Avalia+ | Scanner</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
</head>

<body>

<script src="./js/config.js"></script>
<script src="js/conexao.js"></script>
<script src="js/layout.js"></script>

<script>

function iniciarPagina(){

  criarLayout();

  const isMobile = window.innerWidth <= 900;

  // ============================
  // 🔴 BLOQUEIO DESKTOP
  // ============================
  if(!isMobile){

    document.getElementById("conteudo").innerHTML = `
      <h2 style="margin-bottom:20px;">📷 Scanner Inteligente</h2>

      <div class="card" style="text-align:center;">

        <p style="
          font-size:18px;
          margin-bottom:15px;
          color:#ff5a5a;
          font-weight:bold;
        ">
          ⚠️ Funcionalidade exclusiva para celular
        </p>

        <p style="opacity:0.7; line-height:1.5;">
          O scanner utiliza a câmera do dispositivo para leitura automática
          de gabaritos.
        </p>

        <br>

        <p style="opacity:0.6;">
          Acesse esta página pelo seu smartphone para utilizar.
        </p>

      </div>
    `;

    return;
  }

  // ============================
  // 🟢 MOBILE - EM PRODUÇÃO
  // ============================
  document.getElementById("conteudo").innerHTML = `

    <h2 style="margin-bottom:20px;">📷 Scanner Inteligente</h2>

    <div class="card" style="text-align:center;">

      <div style="
        font-size:20px;
        font-weight:bold;
        margin-bottom:15px;
        color:#00ffcc;
      ">
        🚧 Em desenvolvimento
      </div>

      <p style="opacity:0.8; line-height:1.6;">
        Este módulo permitirá leitura automática de gabaritos
        utilizando a câmera do celular.
      </p>

      <br>

      <div style="
        text-align:left;
        max-width:500px;
        margin:0 auto;
        line-height:1.6;
      ">
        ✔ Leitura via QR Code<br>
        ✔ Correção instantânea<br>
        ✔ Identificação de respostas<br>
        ✔ Integração com Avalia+<br>
        ✔ Uso otimizado para ambiente escolar<br>
      </div>

      <br>

      <div style="
        margin-top:20px;
        padding:15px;
        background:#0f0f0f;
        border-radius:10px;
        font-size:14px;
        opacity:0.7;
      ">
        Em breve disponível para uso em sala de aula.
      </div>

    </div>
  `;
}

window.onload = iniciarPagina;

</script>

</body>
</html>
