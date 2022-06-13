var lista =[]; 
 var columnas = ["Nombre", "Email1", "Email2", "Email3", "Email4", "Opciones"];
 

async function fetchClientes(){
   
    const res = await fetch('http://localhost:8080/clientes');

   
    
    if(!res.ok){
        const msg = `error en fetchClientes:, ${res.status}`;
        throw new Error(msg);
    }

    
    
    let clientes =  await res.json()
    .then(data => {
        console.log('data', data);
        lista = data.listaClientes;
        console.log('lista:', lista);

    });

    var columnCount = columnas.length;
    console.log('cantidad columnas', columnCount);
    var rowCount = lista.length;
    console.log('cantidad filas', rowCount);

    var table = document.createElement('table');
 
    document.getElementById("data-list").appendChild(table);

    var header = table.createTHead();
 
    var row = header.insertRow(-1);
 
    for (var i = 0; i < columnCount; i++) {
 
        var headerCell = document.createElement('th');
 
        headerCell.innerText = columnas[i].toUpperCase();
 
        row.appendChild(headerCell);
    } 
    var tBody = document.createElement('tbody');
 
    table.appendChild(tBody);
   

    lista.forEach((item, index) => {
        
       
        let row = table.insertRow();
        let id = item._id;
        let name = row.insertCell(0);
        
        name.innerHTML = `<input type = "text" id = "name[${index}]" size = '30' readonly ></input>`;
        let email1 = row.insertCell(1);
        email1.innerHTML = `<input type = "text" id = "email1[${index}]" size = '10' value = ${item.email1}></input>`;
        let email2 = row.insertCell(2);
        email2.innerHTML = `<input type = "text" id = "email2[${index}]" size = '10' value = ${item.email2}></input>`;
        let email3 = row.insertCell(3);
        email3.innerHTML = `<input type = "text" id = "email3[${index}]" size = '10' value = ${item.email3}></input>`;
        let email4 = row.insertCell(4);
        email4.innerHTML = `<input type = "text" id = "email4[${index}]" size = '10' value = ${item.email4}></input>`;
        let op = row.insertCell(5);
        op.innerHTML =  `<a onClick= "Guardar(${index})"><i class= "fa fa-save"></i><span>guardar</span></a><a onClick="Borrar(${index})"<i class="fas fa-trash-alt"></i><span>borrar</span></a>`
                        
    
    });

    
    lista.forEach((item, index) => {

        document.getElementById(`name[${index}]`).value =
        document.getElementById(`name[${index}]`).defaultValue = item.nombre;

    });
    

    

}

    
    

function Guardar(id){
    
    
    let email1 = document.getElementById(`email1[${id}]`).value;
    let email2 = document.getElementById(`email2[${id}]`).value;
    let email3 = document.getElementById(`email3[${id}]`).value;
    let email4 = document.getElementById(`email4[${id}]`).value;

    let Id = lista[id]._id;
    
    let _body = {_id: Id, email1: email1, email2: email2, email3: email3, email4: email4};

    console.log('Body: ', _body);

   
    fetch('http://localhost:8080/clientes', {
                method: "PUT",
                body: JSON.stringify(_body),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('algo salio mal');
                }else{
                   alert('cliente modificado en base de datos ')

                }
            }) 
    
    

}

function Borrar(idr){
    var result = window.confirm('confirmar Borrar Cliente y sus equipos?');
    
        if(result){
            let id = lista[idr]._id;
            let nombre = document.getElementById(`name[${idr}]`).value;
            let _body = {id, nombre};

            console.log('datos: ', _body);

            fetch('http://localhost:8080/clientes/', {
                method: "DELETE",
                body:JSON.stringify( _body),
                headers: {"Content-type": "application/json"}
            })
                .then(response => response.json())
                .then ((data) => {
                    if(data.ok === false){
                        alert('algo salio mal');
                    }else{
                        alert('cliente y sus equipos eliminados en base de datos ')

                    }
                })

        }
}

    

function NuevoCliente(){
    window.open("nuevoCliente.html");
}


   
 
    



    
 


fetchClientes()
.catch(e =>{
    console.log('hubo un problema' + e.message);
});

