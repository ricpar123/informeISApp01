var informes = [];
var clientes = [];
var columnas = ["cliente", "numero", "fecha", "Opciones"];
var cliente = '';
var is = [];


async function fetchClientes() {

    const res = await fetch('https://serveringroup.herokuapp.com/clientes',
        {
            method: "GET",
            headers: { "auth": "auth" }
        });



    if (!res.ok) {
        const msg = `error en fetchClientes:, ${res.status}`;
        throw new Error(msg);
    } else {
        res.json()
            .then(data => {
                console.log('data', data);
                clientes = data.listaClientes;
                console.log('lista:', clientes);
                var select = document.getElementById("clientes");

                var opt = document.createElement("option");
                opt.text = "Seleccione un cliente";
                select.add(opt);

                console.log('lista de clientes:', clientes);

                clientes.forEach((item, index) => {
                    var option = document.createElement("option");
                    option.text = item.nombre;
                    select.add(option);
                });

                select.addEventListener("change", (e) => {

                    cliente = e.target.value;

                    if (!(cliente.localeCompare('Seleccione un cliente'))) {
                        cliente = '';
                    }

                    console.log('seleccionado: ', cliente);
                });




            });


    }



}

fetchClientes()
    .catch(e => {
        console.log('hubo un problema' + e.message);
    });


var formulario = document.getElementById("form");



function validar(e) {
    e.preventDefault();

    var inicio = document.getElementById("inicio").value;
    var fin = document.getElementById("fin").value;

    if (inicio == 0 && fin == 0 && cliente == 0) {
        alert('los campos deben tener valores')
        return;


    } else if (inicio == 0 && fin == 0 && cliente != 0) {
        inicio = 'undefined';
        fin = 'undefined';

    } else if (cliente == 0 && fin != 0 && inicio != 0) {
        cliente = 'undefined';
    }

    fetch(`http://localhost:8080/informes/inicio/${inicio}/fin/${fin}/cliente/${cliente}`)
        .then(response => response.json())
        .then(data => {
            informes = data.informes;
            console.log('Success:', data.informes)
            is = data.informes;
            document.getElementById("data-list").innerHTML = "";
            tabla(is);

        })
        .catch((error) => {
            console.error('Error:', error);
        })
}

formulario.addEventListener('submit', validar);

async function fetchInformes() {

    const res = fetch('http://localhost:8080/informes', {
        method: "GET",
        headers: { "auth": "auth" }
    })
        .then(response => response.json())
        .then(data => {
            is = data.informes;
            console.log('is: ', is);
            tabla(is);
        });

}

fetchInformes()
    .catch(e => {
        console.log('hubo un problema' + e.message);

    });





function tabla(is) {
    var columnCount = columnas.length;
    console.log('cantidad columnas', columnCount);
    var rowCount = is.length;
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


    is.forEach((item, index) => {


        let row = table.insertRow();
        let id = item._id;
        let name = row.insertCell(0);

        name.innerHTML = `<input type = "text" id = "name[${index}]" size = '30' readonly value = ${item.cliente}></input>`;
        let numero = row.insertCell(1);
        numero.innerHTML = `<input type = "text" id = "numero[${index}]" size = '5' readonly value = ${item.numero}></input>`;
        let fecha = row.insertCell(2);
        fecha.innerHTML = `<input type = "text" id = "fecha[${index}]" size = '30' readonly value = ${item.fecha.substr(0, 10)}></input>`;
        let op = row.insertCell(3);
        op.innerHTML = `<a  onClick= "detalles(${index})"><i class= "fa fa-id-badge"></i><span>detalles</span></a><a onClick="Borrar(${index})"><i class="fas fa-trash-alt"></i><span>Borrar</span></a>`


    });

    is.forEach((item, index) => {

        document.getElementById(`name[${index}]`).value =
            document.getElementById(`name[${index}]`).defaultValue = item.cliente;

        let date = document.getElementById(`fecha[${index}]`).value;
        const fd = date.slice(0, 4);
        const md = date.slice(5, 7);
        const ld = date.slice(8, 10);
        date = `${ld}` + '-' + `${md}` + '-' + `${fd}`;

        document.getElementById(`fecha[${index}]`).value =
            document.getElementById(`fecha[${index}]`).defaultValue = date;



    });


}

function detalles(id) {

    var number = (is[id].numero).toString();
    var tecnico = (is[id].tecnico);
    var cliente = (is[id].cliente);
    var descripcion = (is[id].descripcion);
    var marca = (is[id].marca);
    var modelo = (is[id].modelo);
    var serie = (is[id].serie);
    var motivo = (is[id].motivo);
    var tipoTrabajo = (is[id].tipoTrabajo);
    var presupuesto = (is[id].presupuesto);
    var inicio = (is[id].fechaInicio);
    var hinicio = (is[id].horaInicio);

    var fin = (is[id].fechaFin);
    var hfin = (is[id].horaFin);
    var normales = (is[id].horasNormales);
    var lab = (is[id].horasLab);
    var viaje = (is[id].horasViaje);
    var total = is[id].horasTotales;
    var obs = is[id].obs;
    var servicio = is[id].servicio;
    var recibido = is[id].recibido;
    var ci = is[id].ci;
    var firma = is[id].firma;
    var firmaT = is[id].firmaT
    var fecha = is[id].fecha.substr(0, 10);

    var fd = fecha.slice(0, 4);
    var md = fecha.slice(5, 7);
    var ld = fecha.slice(8, 10);
    fecha = `${ld}` + '-' + `${md}` + '-' + `${fd}`;

    var fd = inicio.slice(0, 4);
    var md = inicio.slice(5, 7);
    var ld = inicio.slice(8, 10);
    inicio = `${ld}` + '-' + `${md}` + '-' + `${fd}`;

    var fd = fin.slice(0, 4);
    var md = fin.slice(5, 7);
    var ld = fin.slice(8, 10);
    fin = `${ld}` + '-' + `${md}` + '-' + `${fd}`;







    var doc = new jsPDF();
    doc.rect(6, 6, 200, 50);
    doc.setFont('Helvetica');
    doc.setFontType('BoldOblique');
    doc.setFontSize(35)
    doc.text(15, 15, 'I N G r o u p S. R. L');
    doc.setFont('Courier');
    doc.setFontType('Bold');
    doc.setFontSize(25);
    doc.text(12, 25, 'Ingenieria Electromecanica');
    doc.setFont('Courier');
    doc.setFontType('Oblique');
    doc.setFontSize(15);
    doc.text(12, 33, 'Maria Felicidad Gonzalez 820 c/ Dr. Molinas');
    doc.setFont('Courier');
    doc.setFontType('Oblique');
    doc.setFontSize(15);
    doc.text(30, 40, 'Telefono: (0981) 401 850');
    doc.setFont('Courier');
    doc.setFontType('Oblique');
    doc.setFontSize(15);
    doc.text(12, 47, 'e-mail: empresaingroup@gmail.com');
    doc.setFont('Courier');
    doc.setFontType('Oblique');
    doc.setFontSize(15);
    doc.text(30, 55, 'Fdo. de la Mora - Paraguay');
    doc.line(120, 6, 120, 56);
    doc.line(120, 33, 206, 33);
    doc.setFont('Courier');
    doc.setFontType('Oblique');
    doc.setFontSize(15);
    doc.text(122, 20, 'INFORME DE SERVICIO TECNICO');
    doc.setFont('times');
    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text(135, 50, 'Nº:');
    doc.text(150, 50, number);
    doc.rect(6, 56, 200, 10);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 63, 'Tecnico:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(40, 63, tecnico);

    doc.rect(6, 66, 200, 10);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 73, 'Cliente:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(35, 73, cliente);

    doc.rect(6, 76, 200, 10);
    doc.rect(6, 86, 200, 10);
    doc.line(120, 76, 120, 96);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 81, 'Equipo:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(35, 81, descripcion);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(122, 81, 'Marca:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(150, 81, marca);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 91, 'Modelo:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(35, 91, modelo);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(122, 91, 'Nro Serie:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(165, 91, serie);

    //Campos motivo, trabajo, presupuesto
    doc.rect(6, 96, 200, 10);
    doc.rect(6, 106, 200, 10);
    doc.line(120, 106, 120, 116)


    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 104, 'Motivo de la visita:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(85, 104, motivo);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 112, 'Tipo de trabajo:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(65, 112, tipoTrabajo);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(125, 112, 'Presupuesto:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(165, 112, presupuesto);

    //Campos de Fechas Inicio, Fin, horas
    doc.rect(6, 116, 200, 10);
    doc.rect(6, 126, 200, 10);
    doc.rect(6, 136, 200, 10);
    doc.rect(6, 146, 200, 10);
    doc.line(120, 126, 120, 136);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(50, 123, 'Fechas de inicio/fin      Horas trabajadas');

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 133, 'Inicio:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(30, 133, inicio);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(70, 133, 'Hr:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(80, 133, hinicio);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(122, 133, 'Fin:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(135, 133, fin);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(170, 133, 'Hr:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(180, 133, hfin);

    //Campos de horas normales, lab y viaje
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 143, 'Horas Normales:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(60, 143, normales);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(85, 143, 'Horas Lab:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(120, 143, lab);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(140, 143, 'Horas Viaje:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(180, 143, viaje);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(80, 153, 'Horas Totales:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(130, 153, total);

    //Campo de Servicio realizado
    doc.rect(6, 156, 200, 10);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(80, 163, 'Servicio Realizado');
    //doc.rect(6, 166, 200, 50);
    doc.rect(6, 166, 200, 30);
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(8, 173, servicio);

    //Campo de Observaciones
    //doc.rect(6, 216, 200, 10);
    doc.rect(6, 196, 200, 10);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(80, 200, 'Observaciones');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(8, 231, obs);
    //doc.rect(6, 226, 200, 30);
    doc.rect(6, 206, 200, 30)

    //campo de Recibido por, Ci nro
    //doc.rect(6,256, 200, 10);
    doc.rect(6, 236, 200, 10);

    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 243, 'Recibido por:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(60, 243, recibido);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(140, 243, 'CI nro:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(170, 243, ci);

    //Campo de firma, fecha
    //doc.rect(6, 266, 200, 25);
    doc.rect(6, 246, 200, 45);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(8, 253, 'Firma del cliente:');
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(140, 253, 'Fecha:');
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.addImage(firma, 'PNG', 10, 263, 50, 20);
    doc.setFont('courier');
    doc.setFontType('oblique');
    doc.setFontSize(15);
    doc.text(160, 253, fecha);
    doc.setFont('courier');
    doc.setFontType('bold');
    doc.setFontSize(15);
    doc.text(140, 283, 'Firma del Tecnico');
    doc.addImage(firmaT, 'PNG', 140, 253, 50, 20);




    doc.save('informe.pdf');

}

function Borrar(idr) {
    var result = window.confirm('confirmar borrar Informe?');

    if (result) {
        let id = is[idr]._id;

        // console.log('id a borrar: ', id);

        fetch(`http://localhost:8080/informes/${id}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" }
        })
            .then(response => response.json())
            .then((data) => {
                if (data.ok === false) {
                    alert('algo salio mal');
                } else {
                    alert('informe eliminado en base de datos ')

                }
            })

    }

}