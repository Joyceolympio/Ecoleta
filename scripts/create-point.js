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
    fetch(url)
        .then(resp => resp.json())
        .then(cidades => {

            for (let city of cidades) {
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
};

document.querySelector("select[name=uf]").addEventListener("change", getCidades);

