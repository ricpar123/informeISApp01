var formulario = document.getElementById("formulario");
var cliente = window.opener.cliente
 console.log('cliente seleccionado: ',cliente );

 document.getElementById("cliente").value =
 document.getElementById("cliente").defaultValue = cliente;


    function validar(e) {
        
        var descripcion = document.getElementById("descripcion");
        var marca = document.getElementById("marca");
        var modelo = document.getElementById("modelo");
        var serie = document.getElementById("serie");
        
        if(descripcion.value == 0 || marca.value == 0 || modelo.value == 0 || serie.value == 0 ){
            e.preventDefault();
            alert("Error, todos los campos deben ser completados");
        } else {
            e.preventDefault();
           console.log("datos : ", cliente, descripcion.value, marca.value, modelo.value, serie.value);
           

           let _body = {cliente: cliente, descripcion: descripcion.value, marca: marca.value, modelo: modelo.value, serie: serie.value};
           console.log('body ', _body);

           
                fetch('http://localhost:8080/equipos', {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('algo salio mal');
                }else{
                   alert('nuevo equipo en base de datos ')

                }
            }) 
                       
            
            .catch(function(error) {
                console.log('Failed', error);
            });
        }
    }
    
    
formulario.addEventListener('submit', validar);       
