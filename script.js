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
};

function removerInvestimento(indice){
    tipos.splice(indice, 1);
    somarInvestimentos();
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

document.addEventListener("DOMContentLoaded", function(){
    lerLocalStore();
    somarInvestimentos();
    configurarEventos();
    getApi();
});