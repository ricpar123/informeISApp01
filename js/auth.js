var formulario = document.getElementById("formulario");

let nombreUsuario = '';
let claveUsuario = '';
let rolUsuario = '';

const channel1 = new BroadcastChannel('canal1');
 






function validar(e) {
        var nombre = document.getElementById("nombre"),
            clave = document.getElementById("clave");
            
        
    if(nombre.value == 0 || clave.value == 0){
            e.preventDefault();
            alert("Error, los campos deben ser completados");
    } else {
            e.preventDefault();
           console.log('nombre, clave: del formulario', nombre.value, clave.value);
           nombreUsuario = nombre.value;
           claveUsuario = (clave.value).toString();

          if(localStorage.getItem('nombre')){
              let user = localStorage.getItem('nombre');
              let pwd = localStorage.getItem('clave');
              console.log('datos localStorage:', user, pwd);
          
          
           if(user == nombreUsuario && pwd == claveUsuario) {
            if(localStorage.getItem('rol') == 'admin'){
                window.open('../vistas/menu.html');
            }else{
                window.open('../vistas/informe.html');
            }

           }else{
            alert('Clave o nombre incorrectos');
            return;
           }
           
        }else{

            let _body = {userid: nombreUsuario, clave: claveUsuario};
           console.log('body ', _body);

           fetch('http://localhost:8080/usuarios/log', {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('Clave o nombre incorrectos - consulte al administrador');
                    return;
            
                }else {
                    console.log('fetch exitoso');
                    //rolUsuario = data.usuario.rol;
                    console.log('usuario: ', data.usuario);
                    rolUsuario = data.usuario.rol;
                    console.log('Rol: ', rolUsuario);

                    localStorage.setItem('nombre', nombreUsuario);
                    localStorage.setItem('clave', claveUsuario);
                    localStorage.setItem('rol', rolUsuario);


                    if(rolUsuario == 'admin'){
                        window.open('../vistas/menu.html');
                    }else{
                        window.open('../vistas/informe.html');
                    }
                }
                
                   

                
            })
            .catch(function(error) {
                console.log('Failed', error);
            });



        }

           

           

           
                
            

                    
                       
            
            
            
            
    }

       

}

        
    


formulario.addEventListener("submit", validar);


function isOnline() {

    if ( navigator.onLine ) {
        // tenemos conexión
        console.log('online');
        alert('Online');


    } else{
        // No tenemos conexión
      alert('Offline');
    }

}

window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );

isOnline();




