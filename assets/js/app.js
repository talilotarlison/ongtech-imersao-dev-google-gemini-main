
// Dados para criar o conteúdo dinamicamente
import dados from "../bd/db.js"

// Função para criar o conteúdo
function createContent(item) {
    const container = document.querySelector('.resultados-pesquisa');

    const itemResultado = document.createElement('div');
    itemResultado.className = 'item-resultado';

    const title = document.createElement('h2');
    const titleLink = document.createElement('a');
    titleLink.href = item.link;
    titleLink.textContent = item.nome;
    title.appendChild(titleLink);

    const description = document.createElement('p');
    description.textContent = item.descricao;

    const moreInfoLink = document.createElement('a');
    moreInfoLink.href = item.link;
    moreInfoLink.textContent = "Mais informações para doações.";

    itemResultado.appendChild(title);
    itemResultado.appendChild(description);
    itemResultado.appendChild(moreInfoLink);

    container.appendChild(itemResultado);
}

// Chama a função para criar o conteúdo

function showData(dados) {
    document.querySelector('.resultados-pesquisa').innerHTML = "";
    dados.map((atletas) => {
        createContent(atletas);
    })
}

// funcao que faz a busca de resultados

let busca = document.querySelector(".buscar");
let btnBuscar = document.querySelector("button");
let btnVerTodos = document.querySelector("#ver-todos");

btnBuscar.addEventListener('click', () => {
    // Obtém o elemento mais baixo da página
    const elementoMaisBaixo = document.body.scrollHeight;
    // Rolar suavemente a página até o elemento mais baixo
    window.scrollTo({
        top: elementoMaisBaixo,
        behavior: 'smooth'
    });
    // Faz filter e incluide nos dados
    const buscaValor = busca.value.toLowerCase();
    const resultadosFiltrados = dados.filter(item =>
        item.nome.toLowerCase().includes(buscaValor)
    );
    // Validação dos dados
    if (resultadosFiltrados.length == 0) {
        showData(resultadosFiltrados);
        document.querySelector('.resultados-pesquisa').innerText = "Dados não encontrado!! Tente novamente.";
        busca.value = "";
        return
    } else if (busca.value == "") {
        document.querySelector('.resultados-pesquisa').innerText = "Campo vazio! Digite uma busca valida.";
        return
    }

    showData(resultadosFiltrados);
    busca.value = "";
});

// Lista todos os dados na tela
btnVerTodos.addEventListener('click', () => {
    showData(dados);
    // Obtém o elemento mais baixo da página
    const elementoMaisBaixo = document.body.scrollHeight;
    // Rolar suavemente a página até o elemento mais baixo
    window.scrollTo({
        top: elementoMaisBaixo,
        behavior: 'smooth'
    });
})

// Volta ao top da pagina
document.getElementById("voltar-topo").addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Ir para campo de busca
const btnDoar = document.querySelector('.button-doar');
btnDoar.addEventListener('click', (event) => {
    event.preventDefault();
    const busca = document.querySelector('.button-doar');
    busca.scrollIntoView({ behavior: 'smooth' });
});

// Mostra na tela
showData(dados);

