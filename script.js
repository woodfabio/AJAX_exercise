window.addEventListener('DOMContentLoaded', function () {

    let carregando = false; // indica se uma requisição Ajax está em andamento

    // função para carregar mais imagens
    function carregarImagens() {
    if (carregando) {
        return;
    }
    carregando = true;
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "dados.json", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
        let divImagens = document.getElementById("images");
        let images = JSON.parse(ajax.responseText);
        for (const image of images.owls) {
            let img = document.createElement("img");
            img.src = image.imagemUrl;
            divImagens.appendChild(img);
        }
        carregando = false;
        }
    };
    ajax.send();
    }

    // detecta quando o usuário chegou no final da página e carrega mais imagens
    window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        carregarImagens();
    }
    };
});