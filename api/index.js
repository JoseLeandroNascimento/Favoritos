const fs = require("fs")
const http = require("http")
const data = require("./urls.json")
const URL = require("url")
const path = require("path")

function salvar(cb){

    fs.writeFile(path.join(__dirname,"urls.json"),JSON.stringify(data,null,2),(error)=>{

        if(error) throw error
        cb('Operação foi um sucesso!')
        
    })

}

http.createServer((req,res)=>{

    
    const {name,url,del} = URL.parse(req.url,true).query

    if(!name || !url){

        return res.end(JSON.stringify(data))

    }

    if(del){

    
        data.urls = data.urls.filter((item)=> item.name != name && item.url != url )

        return salvar(message => res.end(message))
       
    }

    data.urls.push({name,url})

    return salvar(message => res.end(message))
    

}).listen(9000,()=>{

    console.log("http://localhost:9000")
})

