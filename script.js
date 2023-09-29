window.addEventListener('DOMContentLoaded', function () {

    console.log("foi");

    let carregando = false; // indica se uma requisição Ajax está em andamento

    // função para carregar mais imagens
    function carregarImagens() {
        console.log("carregarImagens");
        if (carregando) {
            return;
        }
        carregando = true;
        let ajax = new XMLHttpRequest();
        ajax.open("GET", "dados.json", true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
            const bigDiv = document.getElementById('big-div');
            let images = JSON.parse(ajax.responseText);
            for (const image of images.owls) {
                // create div
                const smallDiv = document.createElement('div');
                smallDiv.className = 'small-div';
                //create image
                let img = document.createElement("img");
                img.src = image.imgUrl;
                img.classList.add('image');
                // create name
                let name = document.createElement("h2");
                name.classList.add("name")
                name.textContent = image.name;
                // create line breaks
                let br = document.createElement("div");
                br.appendChild(document.createElement("br"));
                br.appendChild(document.createElement("br"));
                // append children
                smallDiv.appendChild(img);
                smallDiv.appendChild(name);
                smallDiv.appendChild(br);
                bigDiv.appendChild(smallDiv);
            }
            carregando = false;
            }
        }
        ajax.send();
    }

    window.addEventListener('DOMContentLoaded', carregarImagens());

    // detecta quando o usuário chegou no final da página e carrega mais imagens
    window.onscroll = function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            carregarImagens();
        }
    };
});