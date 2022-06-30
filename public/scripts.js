const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')
const tableLinks = document.querySelector("#table-links")


let elementExcluir;
let elementEditar;



// Função para adiocionar elemento na tabela
function addElement({ name, url }) {

    const link = { name, url }

  
    criaElemento(name, url)

}

// Função para confirma se o usuario quer remover o elemento
function confirmaRemocao(){

    if(elementExcluir != undefined)
        
        removeElement(elementExcluir);

    elementExcluir = undefined;
}

// Função para remover
function removeElement(element) {
    
    if(element)
        element.remove()

}

// Função responsavel por criar um elemento da tabela
function criaElemento(name, url) {

    // Cria uma linha da tabela
    const tr = document.createElement("tr")

    // Cria a celula do nome do site
    const tdname = document.createElement('td')

    // Cria a celula da url
    const tdurl = document.createElement("td")

    // Cria a celula das operações
    const tdOperacoes = document.createElement('td')

    // Cria botão para excluir
    const btnExcluir = document.createElement('button')

    // Cria link para abrir o site
    const a = document.createElement('a')

    const icone = document.createElement("i");

    icone.setAttribute("class","fa")
    icone.classList.add("text-white")
    icone.classList.add("fa-trash-o")
    

    // Adiciona as classes do bootstrap
    btnExcluir.setAttribute("class",'btn')
    btnExcluir.setAttribute("data-toggle","modal")
    btnExcluir.setAttribute("data-target","#modalExcluir")
    btnExcluir.classList.add('btn-danger')// adiciona cor ao botão, usando uma classe do botstrap
    btnExcluir.classList.add("btn-sm")

    btnExcluir.appendChild(icone)

    // Adiciona um ouvinte de evento de click para o botão excluir
    btnExcluir.addEventListener("click",()=>{

        // Obtem a linha da tabela no qual o botão excluir está
        elementExcluir = btnExcluir.parentNode.parentNode
    })
    
    // Adiciona a url do link
    a.setAttribute('href',url)
    // Define que a pagina via abrir em uma nova aba
    a.setAttribute("target","_blank")
    a.innerHTML = url
    // Adiciona o link como conteudo da celula
    tdurl.appendChild(a)

    tdname.innerHTML = name

    // Adiciona o botão excluir com conteúdo da celula
    tdOperacoes.appendChild(btnExcluir)
    // Centraliza o botão no centro da celular
    tdOperacoes.setAttribute('class','text-center')// 

    // Adiciona os elementos na linha da tabela
    tr.appendChild(tdname)
    tr.appendChild(tdurl)
    tr.appendChild(tdOperacoes)

    // Adiciona a linha na tabela
    tableLinks.appendChild(tr)
}


// Função para interceptar o submit do formulario e validar os dados
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