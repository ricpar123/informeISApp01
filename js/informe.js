var usuarios = [];
var clientes = [];
var equipos = [];
var cliente = '';
var equipo = '';
var email1 ='';
var email2 = '';
var email3 = '';
var email4 = '';
var cli = '';



Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});



async function fetchUsuarios(){
   
    const res = await fetch('http://localhost:8080/usuarios/tabla');

   
    
    if(!res.ok){
        const msg = `error en fetchUsuarios:, ${res.status}`;
        throw new Error(msg);
    }

    
    
    res.json()
    .then(data => {
        console.log('data', data);
        usuarios = data.usuarios;
        console.log('lista:', usuarios);

    

        var select = document.getElementById("tecnico");
    
    

        usuarios.forEach((item, index)=>{
        var option = document.createElement("option");
        option.text = item.userid;
        select.add(option);
       

        });


    

    });

}


fetchUsuarios();
    
    

        


async function fetchClientes(){
    const res = await fetch('http://localhost:8080/clientes');
    if(!res.ok){
        const msg = `error en fetchClientes:, ${res.status}`;
        throw new Error(msg);
       
    }
    res.json()
    .then(data => {
        console.log('data', data);
        clientes = data.listaClientes;
        console.log('clientes:', clientes);

        clientes.forEach((item, index) => {
            var option = document.createElement("option");
            option.text = [index, item.nombre];
            
            select.add(option);
        });
    });    
        var select = document.getElementById("cliente");

        var opt = document.createElement("option");
        opt.text= "Seleccione un cliente";
        select.add(opt);
}
    fetchClientes();       
       
    
        var select = document.getElementById("cliente");
    
        select.addEventListener("change", (e) =>{
        
            cli = e.target.value;
            console.log('seleccionado: ', cli);
            var c = cli.split(',');
            cliente = c[1];
            var idc = c[0];
            console.log('id cliente, cliente', idc, cliente);
            email1 = clientes[idc].email1;
            email2 = clientes[idc].email2;
            email3 = clientes[idc].email3;
            email4 = clientes[idc].email4;
            console.log('emails: ', email1, email2, email3, email4);

            fetchEquipos();
            
            
            
            
            
            
            
            
        });
        






    async function fetchEquipos() {
    
                
        console.log('cliente: ', cliente);
        const res = await fetch(`http://localhost:8080/equipos/${cliente}`);
            if(!res.ok){
                    const msg = `error en fetchClientes:, ${res.status}`;
                    throw new Error(msg);
            }
    
    
        res.json()
            .then(data => {
                    console.log('data', data);
                    equipos = data.equipos;
                    console.log('lista:', equipos);
                    
                var select = document.getElementById("equipo");

                var opt = document.createElement("option");
                opt.text= "Seleccione un equipo";
                select.add(opt);
                       
                        
                    
                equipos.forEach((item, index) =>{
                    var option = document.createElement("option");
                    option.text = [index, item.descripcion, item.serie];
                    select.add(option);
                });

            select.addEventListener("change", (e) =>{
        
                    equipo = e.target.value;
                    console.log('equipo seleccionado: ', equipo);
                    const words = equipo.split('');
                    var index = words[0];
                    console.log(index);

                    document.getElementById("descripcion").value =
                    document.getElementById("descripcion").defaultValue = equipos[index].descripcion; 
                    document.getElementById("marca").value =
                    document.getElementById("marca").defaultValue = equipos[index].marca; 
                    document.getElementById("modelo").value =
                    document.getElementById("modelo").defaultValue = equipos[index].modelo; 
                    document.getElementById("serie").value =
                    document.getElementById("serie").defaultValue = equipos[index].serie; 
                            
            });    
                    
                    
        });
                
                
                
    }

     
          
  
   
    
    
    
    
        





var fechaInicio = '';
var horaInicio = '';
var fechaFin = '';
var horaFin = '';
var hnormales = '';
var htotales = 0;
var mtotales = 0;
var total = '';

var inicio = document.getElementById('inicio');
inicio.addEventListener('change', (e) =>{
    inicio = e.target.value;
   
    let inipartes = inicio.split('T');
    fechaInicio = inipartes[0];
    horaInicio = inipartes[1];
   
    
    
}); 

var fin = document.getElementById('fin');
fin.addEventListener('change', (e) =>{
    fin = e.target.value;
    
    let finpartes = fin.split('T');
    fechaFin = finpartes[0];
    horaFin = finpartes[1];

    hnormales = normales();
    console.log('horas normales: ', hnormales);

    document.getElementById("normales").value =
    document.getElementById("normales").defaultValue = hnormales; 
    
    total = totales(hnormales);
    console.log('total:', total);

    document.getElementById("totales").value =
    document.getElementById("totales").defaultValue = total; 


}); 

function normales(){
    let nor = '';
    var horainipartes = horaInicio.split(':');
    var horainiparte = horainipartes[0];
    var minuiniparte = horainipartes[1];
    console.log('partesIni: ', horainiparte, minuiniparte);

    var horafinpartes = horaFin.split(':');
    var horafinparte = horafinpartes[0];
    var minufinparte = horafinpartes[1];
    

    normalhora = parseInt(horafinparte) - parseInt(horainiparte);
    normalminuto = parseInt(minufinparte) - parseInt(minuiniparte);

    if(normalminuto < 0){
        normalhora = normalhora +1;
        normalminuto = Math.abs(normalminuto);
        
    }else if(normalminuto < 10 ){
       
        normalminuto = '0'+normalminuto;
    }
    nor =   normalhora +':'+ normalminuto;
    
    return nor;
}

function totales(h){
    var tot = '';

    
    var hr = h.split(':');
    var hora = parseInt(hr[0]);
    var minuto = parseInt(hr[1]);
    console.log('minuto: ', minuto);
    console.log('mtotales: ', mtotales);
    htotales = htotales + hora;
    mtotales = parseInt(mtotales) + minuto;
    console.log('minutosTotales', mtotales);
    if(mtotales >= 60){
        mtotales = mtotales - 60;
        htotales = htotales + 1;
    }
    if(mtotales < 10){
        mtotales = '0'+ mtotales;
    }



    tot = htotales.toString() +':'+ mtotales.toString();

    return tot;

    

}

var lab = document.getElementById('lab');
lab.addEventListener('change', (e) =>{
    lab = e.target.value;
    console.log('hlab:', lab);
    total = totales(lab);
    console.log('horas totales: ', total);

    document.getElementById("totales").value =
    document.getElementById("totales").defaultValue = total; 

});
if(lab.value == '00:00:00'){
    lab = '00:00:00';
}

var hvj = document.getElementById('viaje');
hvj.addEventListener('change', (e) =>{
    hvj = e.target.value;
    console.log('hviaje:', hvj);
    total = totales(hvj);
    console.log('Totales: ', total)

    document.getElementById("totales").value =
    document.getElementById("totales").defaultValue = total; 
});
if(hvj.value == '00:00:00'){
    hvj = '00:00:00';
}

var canvas = document.getElementById("signature");

       function resizeCanvas() {
           var ratio = Math.max(window.devicePixelRatio || 1, 1);
           canvas.width = canvas.offsetWidth * ratio;
           canvas.height = canvas.offsetHeight * ratio;
           canvas.getContext("2d").scale(ratio, ratio);
       }
       window.onresize = resizeCanvas;
       resizeCanvas();

       var signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(250,250,250)'
       });

var formulario = document.getElementById("formulario");

var tecnico = [];

let descripcion = '';
let marca = '';
let modelo = '';
let serie = '';
let motivo = '';
let tipoTabajo = '';
let presupuesto = '';

let horasNormales = '';
let horasLab = '';
let horasViaje = '';
let horasTotales = '';
let servicio = '';
let obs = '';
let recibido = '';
let ci = '';
let fecha = '';
let firma = '';




    function validar(e) {
        e.preventDefault();
        const radioB = document.querySelectorAll('input[name= "trabajo"]');
        const radioB2 = document.querySelectorAll('input[name= "presu"]');
        
        

        for( const radiobutton of radioB) {
            if(radiobutton.checked){
                tipoTrabajo = radiobutton.value;
            }
        }

        for( const radiobu2 of radioB2){
            if(radiobu2.checked){
                presupuesto = radiobu2.value;
            }
        }
        
        var tec = document.getElementById("tecnico").value;
        
        motivo = document.getElementById("motivo").value;
       
        
        servicio = document.getElementById("destrabajo").value;
        firma = document.getElementById("firma");
        fecha = document.getElementById("fecha").value;
        equipo = document.getElementById("equipo").value;
        obs = document.getElementById("obs").value;
        recibido = document.getElementById("recibido").value;
        ci = document.getElementById("ci").value;
        


        
        if(tec == 0 || cliente == 0 || motivo == 0 ||  
             fechaInicio == 0 || fechaFin == 0 || servicio == 0  
            || fecha == 0 || equipo == 0 || signaturePad.isEmpty() || 
            tipoTrabajo == 0 || presupuesto == 0  ){
            e.preventDefault();
            alert('Error, los campos marcados con * deben ser completados');
            return;

        }else {
            e.preventDefault();
            //var selected = [];
            for( var option of document.getElementById('tecnico').options){
                if(option.selected){
                    tecnico.push(option.value);
                }
            }
            
            }
      
        
            //console.log('tecnico: ', tecnico);
     descripcion = document.getElementById("descripcion").value;
     marca = document.getElementById("marca").value; 
     modelo = document.getElementById("modelo").value;
     serie = document.getElementById("serie").value;
     



    let base64 = signaturePad.toDataURL('image/png').split(';base64,')[1];
    firma = base64;
    //console.log(base64);

    console.log('cliente seleccionado:', cliente);
    console.log('Motivo de la visita.', motivo);
    horasNormales = hnormales;
    horasLab = lab;
    horasViaje = hvj;
    horasTotales = total;
    

    let _body = {tecnico, cliente, descripcion, marca, modelo, serie, 
                motivo, tipoTrabajo, presupuesto, fechaInicio, horaInicio, 
                fechaFin, horaFin, horasNormales, horasLab, horasViaje, 
                horasTotales, servicio, obs, recibido, ci, firma, fecha,
                email1, email2, email3, email4 };

   // console.log('datos a enviar: ', _body);
    //enviar el formulario al service worker
   
    var form = { 'formData' : _body };
    navigator.serviceWorker.controller.postMessage(form);
    console.log('datos enviados al sw ');

    navigator.serviceWorker.addEventListener('message', e =>{
        if(e.data.form == 'recibido'){
            console.log('sw recibio los datos');
        }
    })
    
  

    fetch('http://localhost:8080/informes', {
        method: "POST",
        body : JSON.stringify(_body),
        headers: {"Content-Type": "application/json"}
    })
    .then( response => response.json())
    .then((data)=> {
        if(data.ok == false){
            alert('error en guardar datos')
        }else{
            alert('informe guardado en bd');
            alert('onLine...se envia al instante');
            alert('offLine...se envia apenas se tenga conexion');
        }

    })
    .catch((error)=>{
        console.log('Error', error);
    });
       
    }

    formulario.addEventListener('submit', validar);

// Detectar cambios de conexión


function isOnline() {

    if ( navigator.onLine ) {
        // tenemos conexión
        console.log('online');
        alert('Online')


    } else{
        // No tenemos conexión
       alert('Offline')
    }

}

window.addEventListener('online', isOnline );
window.addEventListener('offline', isOnline );

isOnline();

