let total;
let tipos;


function lerLocalStore(){
    tipos = JSON.parse(localStorage.getItem("tipos"));
    total = JSON.parse(localStorage.getItem("total"));

    if(tipos == null){
        tipos = [];
    }

    if(total == null) {
        total = 0;
    }
};

function salvarLocalStorage(){
    localStorage.setItem("tipos",JSON.stringify(tipos));
    localStorage.setItem("total", JSON.stringify(total));
};   

function somarInvestimentos(){
    total = 0;
    
    tipos.forEach(function(item){
        total += item.valor;
        console.log(item.valor);
        console.log(total);
    });
    
    salvarLocalStorage();
    alteraTotal();
};

function adicionarInvestimento(nome,valor){
    valor = Number(valor);
    
    if(nome.trim() === ""){
        alert("Digite um nome válido");
        return;
    }
    
    if(isNaN(valor) || valor <= 0){
        alert("Digite um valor númerico válido");
        return;
    }
    
    for(let i = 0; i<tipos.length ; i++){
        if(tipos[i].nome === nome){
            alert("Esse investimento já foi adicionado");
            return;
        }
    }
    
    tipos.push({nome:nome, valor:valor});
    somarInvestimentos();
    carregarInvestimentosNaTela();
};

function removerInvestimento(indice){
    tipos.splice(indice, 1);
    somarInvestimentos();
    carregarInvestimentosNaTela();
};

function adicionarValor(indice,valor){
    valor = Number(valor);
    
    if(isNaN(valor) || valor <= 0){
        alert("Digite um valor válido");
        return;
    }
    
    if(indice < 0 || indice >= tipos.length){
        alert("Investimento Inválido");
        return;
    }
    
    tipos[indice].valor += valor;
    somarInvestimentos();
    carregarInvestimentosNaTela();
};

function retirarValor(indice,valor){
    valor = Number(valor);
    
    if(indice < 0 || indice >= tipos.length){
        alert("Investimento Inválido");
        return;
    }
  
    if(valor > tipos[indice].valor){
        alert("Valor maior que o investimento");
        return;
    }
    
    tipos[indice].valor -= valor;
    somarInvestimentos();
    carregarInvestimentosNaTela();
};

async function getApi(){
    try {
        let response = await fetch("https://api.euroratesapi.dev/api/all-rates?currency=USD");
        
        if(!response.ok){
            throw new Error("Erro ao buscar dados da API");
        }
        
        let data = await response.json();
        let cotacao = data.rates.BRL;
        
        console.log("Cotação USD para BRL:", cotacao);
        return cotacao;
    } catch(error){
        console.log("Erro ao acessar API:", error);
    }
};

function configurarEventos(){
    let botaoNovo = document.querySelector(".botao-novo-tipo");
    let botaoReais = document.querySelector(".botao-reais");
    let botaoDolar = document.querySelector(".botao-dolares");
    
    botaoNovo.addEventListener("click", function(){
        let nome = prompt("Nome do investimento:");
        let valor = prompt("Valor do investimento");
        
        adicionarInvestimento(nome, valor);
    });
    
    botaoReais.addEventListener("click", function(){
        console.log("Modo reais");
    });
    
    botaoDolar.addEventListener("click", function(){
        console.log("Modo dólar");
    });
};


function alteraTotal() {
    const p = document.querySelector("p");
    p.innerHTML = `R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function carregarInvestimentosNaTela() {
    const secaoTipos = document.querySelector(".tipos");
    secaoTipos.innerHTML = "";
    if(tipos.length === 0) {
        const h1 = document.createElement("h1");
        h1.classList.add("adicione-primeiro");
        h1.style.fontSize = "40px";
        h1.textContent = "Adicione o primeiro investimento";
        secaoTipos.append(h1);
    } else {
        tipos.forEach((tipo, indice) => {
            const cardTipos = document.createElement("div");
            const botoesAdicionarRetirar = document.createElement("div");
            const botaoAdicionarValor = document.createElement("button");
            const botaoRetirarValor = document.createElement("button");
            const div = document.createElement("div");
            const h2 = document.createElement("h2");
            const p = document.createElement("p");
            const botaoExcluir = document.createElement("button");
            
            cardTipos.classList.add("card-tipos")
            botoesAdicionarRetirar.classList.add("botoes-adicionar-retirar");
            botaoAdicionarValor.classList.add("adicionar-valor");
            botaoAdicionarValor.addEventListener("click", () => adicionarValor(indice));
            botaoAdicionarValor.textContent = "+";
            botaoRetirarValor.classList.add("retirar-valor");
            botaoRetirarValor.addEventListener("click", () => retirarValor(indice));
            botaoRetirarValor.textContent = "-";
            botaoExcluir.classList.add("botao-de-excluir");
            botaoExcluir.addEventListener("click", () => removerInvestimento(indice));
            botoesAdicionarRetirar.append(botaoAdicionarValor);
            botoesAdicionarRetirar.append(botaoRetirarValor);
            h2.textContent = tipo.nome;
            p.textContent = `R$ ${tipo.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            div.append(h2);
            div.append(p);
            botaoExcluir.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            `;
            cardTipos.append(botoesAdicionarRetirar);
            cardTipos.append(div);
            cardTipos.append(botaoExcluir);
            
            secaoTipos.append(cardTipos)
        });
    }
};


document.addEventListener("DOMContentLoaded", function(){
    lerLocalStore();
    somarInvestimentos();
    configurarEventos();
    getApi();
    carregarInvestimentosNaTela();
});