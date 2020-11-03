// Arrow Function () => {} é igual a uma function anônima: function(){}
// .then((recebe uma resposta resp) => {retorna uma resposta em json return resp.json})
// uma função anônima pode ser escrita dessa forma .then( função res => retorno res.json())

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(resp => resp.json())
        .then(estados => {

            for (let estado of estados) {
                ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
            }

        })
};

populateUfs();

function getCidades(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;

    fetch(url)
        .then(resp => resp.json())
        .then(cidades => {


            for (let city of cidades) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;

        })
};

document.querySelector("select[name=uf]").addEventListener("change", getCidades);

//Itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (let item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(){
    const itemLi = event.target
    const itemId = itemLi.id;
    
    //adicionar ou remover uma classe com js
    //toggle = adicionar ou remover 
    itemLi.classList.toggle("selected")

    // verificar se existem itens selecionados, 
    // se sim pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex((item) =>{
        const itemFound = item === itemId //isso será true ou false 
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção

    if(alreadySelected >= 0){
        //tirar da seleção

        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    
    }else{
        //se não estiver selecionado, adicionar a selação

        selectedItems.push(itemId)
    }
    
    //atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}