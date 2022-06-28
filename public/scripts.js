const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')
const tableLinks = document.querySelector("#table-links")


let elementExcluir;
let elementEditar;

function addElement({ name, url }) {

    const link = { name, url }

  
    criaElemento(name, url)

}

function confirmaRemocao(){

    if(elementExcluir != undefined)
        
        removeElement(elementExcluir);

    elementExcluir = undefined;
}

function removeElement(element) {
    

    element.remove()

}

function criaElemento(name, url) {

    const tr = document.createElement("tr")
    const tdname = document.createElement('td')
    const tdurl = document.createElement("td")
    const tdOperacoes = document.createElement('td')
    const btnExcluir = document.createElement('button')// Cria um botão p/ apagar o a linha criadar
    const a = document.createElement('a')

    // data-toggle="modal" data-target="#myModal"

    btnExcluir.setAttribute("class",'btn')
    btnExcluir.setAttribute("data-toggle","modal")
    btnExcluir.setAttribute("data-target","#modalExcluir")
    btnExcluir.classList.add('btn-danger')// adiciona cor ao botão, usando uma classe do botstrap
    btnExcluir.classList.add("fa")
    btnExcluir.classList.add("fa-trash-o")
    btnExcluir.classList.add("btn-lg")
    btnExcluir.classList.add("btn-sm")
    btnExcluir.addEventListener("click",()=>{

        elementExcluir = btnExcluir.parentNode.parentNode
    })
    
  
    a.setAttribute('href',url)
    a.setAttribute("target","_blank")
    a.innerHTML = url

    tdname.innerHTML = name
    tdurl.appendChild(a)
    // btnExcluir.innerHTML = "EXCLUIR"
    tdOperacoes.appendChild(btnExcluir)
    tdOperacoes.setAttribute('class','text-center')// 
    tr.appendChild(tdname)
    tr.appendChild(tdurl)
    tr.appendChild(tdOperacoes)

    tableLinks.appendChild(tr)
}

form.addEventListener('submit', (event) => {

    // Função preventDefault é responsável por interceptar eventos, assim o desenvolvedor pode tratar o evento de forma diferente do padrão
    event.preventDefault();

    // Obtendo o valor do campo de input
    let { value } = input

    // Verifica se o valor foi fornecido
    if (!value)
        return alert('Preencha o campo!')

    // Obtem as duas informações do nome do site e sua url, que estão separadas pela virgula
    const [name, url] = value.split(',')

    // Caso o usuário não tenha fornecido a url é retornada uma mensagem de error
    if (!url)
        return alert('O texto não está formatado da maneira correta.')

    // É usada expressões regulares para validar se a url fornecida é correta 
    // A função test invocada para execultar a expressão regular e retorna true caso corresponda ao padrão valido
    if (!/^http/.test(url))
        return alert('Digite a url da maneira correta.')

    // Caso passe nos testes, o elemento é inserido na lista
    addElement({ name, url })

    // O input é limpo para receber uma nova entrada
    input.value = ''

})