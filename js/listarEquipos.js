var lista =[]; 
var cliente = '';
var equipos=[];


async function fetchClientes(){
   
    const res = await fetch('http://localhost:8080/clientes', 
    {
    method: "GET",
    headers: {"auth": "auth"}
    });

   
    
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

    var select = document.getElementById("clientes");

   var opt = document.createElement("option");
    opt.text= "Seleccione un cliente";
    select.add(opt);
   
  
   
    lista.forEach((item, index) =>{
        var option = document.createElement("option");
        option.text = item.nombre;
        select.add(option);
    });

    select.addEventListener("change", (e) =>{
        document.getElementById("data-list").innerHTML = '';
        cliente = e.target.value;
        console.log('seleccionado: ', cliente);

        async function fetchEquipos() {

            
            console.log('cliente: ', cliente);
            const res = await fetch(`http://localhost:8080/equipos/${cliente}`);
            if(!res.ok){
                const msg = `error en fetchClientes/equipos:, ${res.status}`;
                throw new Error(msg);
            }


            let eq =  await res.json()
                .then(data => {
                    console.log('data', data);
                equipos = data.equipos;
                    console.log('lista:', equipos);

            });
        
            var columnas = ["Descripcion", "Marca", "Modelo", "Serie", "Opciones"];

            var columnCount = columnas.length;
            console.log('cantidad columnas', columnCount);
            var rowCount = equipos.length;
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
   

                equipos.forEach((item, index) => {
        
       
                let row = table.insertRow();
                let id = item._id;
                let descripcion = row.insertCell(0);
        
                descripcion.innerHTML = `<input type = "text" readonly id = "descripcion[${index}]" 
                size = '30' value=${item.descripcion}></input>`;
                let marca = row.insertCell(1);
                marca.innerHTML = `<input type = "text" readonly id = "marca[${index}]" size = '10' value = ${item.marca}></input>`;
                let modelo = row.insertCell(2);
                modelo.innerHTML = `<input type = "text" readonly id = "modelo[${index}]" size = '10' value = ${item.modelo}></input>`;
                let serie = row.insertCell(3);
                serie.innerHTML = `<input type = "text" readonly id = "serie[${index}]" size = '10' value = ${item.serie}></input>`;
        
                let op = row.insertCell(4);
                op.innerHTML =  `<a onClick= "Editar(${index})"><i class= "fa fa-edit"></i><span>editar</span></a><a onClick="Borrar(${index})" <i class="fas fa-trash-alt"></i><span>borrar</span></a>`
                        
    
            });

            equipos.forEach((item, index) => {

                document.getElementById(`descripcion[${index}]`).value =
                document.getElementById(`descripcion[${index}]`).defaultValue = item.descripcion;

                document.getElementById(`marca[${index}]`).value =
                document.getElementById(`marca[${index}]`).defaultValue = item.marca;

                document.getElementById(`modelo[${index}]`).value =
                document.getElementById(`modelo[${index}]`).defaultValue = item.modelo;

                document.getElementById(`serie[${index}]`).value =
                document.getElementById(`serie[${index}]`).defaultValue = item.serie;



        
            });

        
        
        
        
        
        }
        fetchEquipos()
        .catch(e =>{
            console.log('hubo un problema' + e.message);
        });


    
   
    });






}

    fetchClientes()
    .catch(e =>{
        console.log('hubo un problema' + e.message);
    });


function nuevoEquipo() {

    if(cliente == ''){
        alert('Se debe seleccionar un cliente');
        return;
    }else{
        var w = window.open('nuevoEquipo.html');
    }


    
} 


function Editar(id) {
    var select = document.createElement("select");
    var x = document.getElementById("cambiar");
    x.appendChild(select);

   var opt = document.createElement("option");
    opt.text= "Seleccione un cliente";
    select.add(opt);
   
  
   
    lista.forEach((item, index) =>{
        var option = document.createElement("option");
        option.text = item.nombre;
        select.add(option);
    });

    select.addEventListener("change", (e) =>{
        
        cliente = e.target.value;
        console.log('seleccionado: ', cliente);
        if (window.confirm('Confirma que quiere cambiar a este Cliente? ')){

            let idr = equipos[id]._id;
            let _body = {idr, cliente};

            fetch('http://localhost:8080/equipos', {
                method: "PUT",
                body: JSON.stringify(_body),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('algo salio mal');
                }else{
                   alert('equipo modificado en base de datos ')

                }
            });

        }
    
    });
}

function Borrar(idr){

    let id = equipos[idr]._id;

    if (confirm('Esta seguro de borrar a este equipo?')){
        fetch(`http://localhost:8080/equipos/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then ((data) => {
            if(data.ok === false){
                alert('algo salio mal');
            }else{
               alert('equipo eliminado en base de datos ')

            }
        }) 
    }

}