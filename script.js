let total = 0
let tipos = []

document.addEventListener("DOMContentLoaded", function(){

    LerLocalStore()
    Somarinvestimentos()
    ConfigurarEventos()
    getApi()

})

function LerLocalStore(){

    tipos = JSON.parse(localStorage.getItem("tipos"))

    if(tipos == null){
        tipos = []
    }

}


    function adicionaInvestimento(nome,valor){
        valor = Number(valor)

        if(nome.trim() === ""){
            alert("Digite um nome válido")
            return
        }
        
        if(isNaN(valor) || valor <= 0){
            alert("Digite um valor númerico válido")
            return
        }
        for(let i = 0; i<tipos.length ; i++){
            if(tipos[i].nome === nome){
                alert("Esse investimento já foi adicionado")
                return
            }
        }
        tipos.push({nome:nome, valor:valor})

        Somarinvestimentos()
    }   

    function Somarinvestimentos(){
        total = 0
        tipos.forEach(function(item){
            total += item.valor
            console.log(item.valor)
            console.log(total)
        })
        SalvarLocalStorage()
    }

function AdicionarValor(indice,valor){

    valor = Number(valor)

    if(isNaN(valor) || valor <= 0){
        alert("Digite um valor válido")
        return
    }
    if(indice < 0 || indice >= tipos.length){
        alert("Investimento Inválido")
        return
    }

    tipos[indice].valor += valor

    Somarinvestimentos()
}

function RetirarValor(indice,valor){

    valor = Number(valor)

    if(indice < 0 || indice >= tipos.length){
        alert("Investimento Inválido")
        return
    }
    if(valor > tipos[indice].valor){
        alert("Valor maior que o investimento")
        return
    }

    tipos[indice].valor -= valor

    Somarinvestimentos()
}

    function RemoverInvestimento(indice){
        tipos.splice(indice, 1)
        Somarinvestimentos()
    }

    function SalvarLocalStorage(){
        localStorage.setItem("tipos",JSON.stringify(tipos))
    }

function AdicionarValor(indice,valor){

    valor = Number(valor)

    if(isNaN(valor) || valor <= 0){
        alert("Digite um valor válido")
        return
    }
    if(indice < 0 || indice >= tipos.length){
        alert("Investimento Inválido")
        return
    }

    tipos[indice].valor += valor

    Somarinvestimentos()
}
function LerLocalStore(){

    tipos = JSON.parse(localStorage.getItem("tipos"))

    if(tipos == null){
        tipos = []
    }

}

async function getApi(){

    try {

        let response = await fetch("https://api.euroratesapi.dev/api/all-rates?currency=USD")

        if(!response.ok){
            throw new Error("Erro ao buscar dados da API")
        }
        let data = await response.json()
        let cotacao = data.rates.BRL
        console.log("Cotação USD para BRL:", cotacao)
        return cotacao

    } 
    catch(error){

        console.log("Erro ao acessar API:", error)

    }

}

function ConfigurarEventos(){
    let botaoNovo = document.querySelector(".botao-novo-tipo")
    let botaoReais = document.querySelector(".botao-reais")
    let botaoDolar = document.querySelector(".botao-dolares")

    botaoNovo.addEventListener("click", function(){

        let nome = prompt("Nome do investimento:")
        let valor = prompt("Valor do investimento")

        adicionaInvestimento(nome, valor)
    })

    botaoReais.addEventListener("click", function(){

        console.log("Modo reais")
    })

    botaoDolar.addEventListener("click", function(){

        console.log("Modo dólar")
    })













}