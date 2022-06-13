var lista =[]; 
 var columnas = ["Nombre", "Clave", "Rol", "Opciones"];
 var listajson=[];

    
 async function fetchUsuarios(){

    const res = await fetch('http://localhost:8080/usuarios/tabla');

     
    if(!res.ok){
        const msg = `error en fetchUsuarios:, ${res.status}`;
        throw new Error(msg);
    }

    let usuarios =  await res.json()
    .then(data => {
        console.log('data', data);
        lista = data.usuarios;
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
        
        name.innerHTML = `<input type = "text" id = "name[${index}]" size = '10' value = ${item.userid}></input>`;
        let clave = row.insertCell(1);
        clave.innerHTML = `<input type = "text" id = "clave[${index}]" size = '10' value = ${item.clave}></input>`;
        let rol = row.insertCell(2);
        rol.innerHTML = `<input type = "text" id = "rol[${index}]" size = '10' value = ${item.rol}></input>`;
        let op = row.insertCell(3);
        op.innerHTML =  `<a onClick= "Guardar(${index})"><i class= "fa fa-save"></i><span>guardar</span></a><a onClick="Borrar(${index})"<i class="fas fa-trash-alt"></i><span>borrar</span></a>`
                        
    
    });

 }    

 fetchUsuarios()
 .catch(e =>{
     console.log('hubo un problema' + e.message);
 });

    
    

function Guardar(id){
    
    let userid = document.getElementById(`name[${id}]`).value;
    let clave = document.getElementById(`clave[${id}]`).value;
    let rol = document.getElementById(`rol[${id}]`).value;
    let Id = lista[id]._id;
    
    let _body = {_id: Id, userid: userid, clave: clave, rol: rol}

    console.log('Body: ', _body);

   
    fetch('http://localhost:8080/usuarios', {
                method: "PUT",
                body: JSON.stringify(_body),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('algo salio mal');
                }else{
                   alert('usuario modificado en base de datos ')

                }
            }) 
}        
    



function Borrar(idr){
    var result = window.confirm('confirmar Borrar Usuario?');
    
        if(result){
            let id = lista[idr]._id;

            fetch(`http://localhost:8080/usuarios/${id}`, {
                method: "DELETE",
                headers: {"Content-type": "application/json"}
            })
                .then(response => response.json())
                .then ((data) => {
                    if(data.ok === false){
                        alert('algo salio mal');
                    }else{
                        alert('usuario eliminado en base de datos ')

                    }
                })

        }
}


    

function NuevoUsuario(){
    window.open("nuevoUsuario.html");
}


   
 
    



    
 




