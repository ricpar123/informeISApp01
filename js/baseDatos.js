





// Utilidades para grabar PouchDB

importScripts('/lib/pouchdb/pouchdb.min.js');

const db = new PouchDB('informes');



function guardarInforme( datos ) {
   
   
    
    console.log('guardarInformes: ', datos);

    datos._id = new Date().toISOString();
    console.log('inicializado DB ', db);

    return db.put( datos ).then( () => {

        self.registration.sync.register('nuevo-informe')
        .then( () => {
            console.log('SYNC registrado');
        });

        const newResp = { ok: true, offline: true };

        return new Response( JSON.stringify(newResp) );

    });

}


// Enviar informes al Servidor
function enviarInformes() {

   
    const info = [];

    return db.allDocs({ include_docs: true }).then( docs => {


        docs.rows.forEach( row => {

            const doc = row.doc;

            const fetchProm =  fetch('http://localhost:8080/informes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
                }).then( res => {

                    return db.remove( doc );

                });
            
            info.push( fetchProm );


        }); // fin del foreach
        
        

        return Promise.all( info );

    });


}
