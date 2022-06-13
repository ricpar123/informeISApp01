var formulario = document.getElementById("formulario");

let nombreCliente = '';
let email1 = '';
let email2 = '';
let email3 = '';
let email4 = '';

    function validar(e) {
        var nombre = document.getElementById("nombre"),
            mail1 = document.getElementById("email1"),
            mail2 = document.getElementById("email2"),
            mail3 = document.getElementById("email3"),
            mail4 = document.getElementById("email4");
        
        if(nombre.value == 0 || mail1.value == 0 ){
            e.preventDefault();
            alert("Error, los campos nombre y email1 deben ser completados");
        } else {
            e.preventDefault();
           console.log("nombre, mail's: ", nombre, mail1, mail2, mail3, mail4);
           nombreUsuario = nombre.value;
           mail1Cliente = mail1.value;
           mail2Cliente = mail2.value;
           mail3Cliente = mail3.value;
           mail4Cliente = mail4.value;

           let _body = {nombre: nombreUsuario, email1: mail1Cliente, email2: mail2Cliente,email3: mail3Cliente,email4: mail4Cliente};
           console.log('body ', _body);

           
                fetch('http://localhost:8080/clientes', {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('algo salio mal');
                }else{
                   alert('nuevo cliente en base de datos ')

                }
            }) 
                       
            
            .catch(function(error) {
                console.log('Failed', error);
            });
        }
    } 
formulario.addEventListener('submit', validar);       
