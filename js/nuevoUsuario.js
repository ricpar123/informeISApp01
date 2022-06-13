var formulario = document.getElementById("formulario");


let nombreUsuario = '';
let claveUsuario = '';
let rolUsuario = '';
let datos = [];

    function validar(e) {
        var nombre = document.getElementById("nombre"),
            clave = document.getElementById("clave"),
            rol = document.getElementById("rol");
        
        if(nombre.value == 0 || clave.value == 0 || rol.value == 0){
            e.preventDefault();
            alert("Error, los campos deben ser completados");
        } else {
            e.preventDefault();
           console.log('nombre, clave: rol', nombre.value, clave.value, rol.value);
           nombreUsuario = nombre.value;
           claveUsuario = (clave.value).toString();
           rolUsuario = rol.value;
           datos = {'nombre': nombreUsuario, 'clave': claveUsuario, 'rol': rolUsuario};

           console.log('Datos: ', datos);

           let _body = {userid: nombreUsuario, clave: claveUsuario, rol: rolUsuario};
           console.log('body ', _body);

           
                fetch('http://localhost:8080/usuarios/reg', {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('algo salio mal');
                }else{
                   alert('nuevo usuario en base de datos ')

                }
            }) 
                       
            
            .catch(function(error) {
                console.log('Failed', error);
            });
        
           
        }
    
    } 

formulario.addEventListener('submit', validar);       
 