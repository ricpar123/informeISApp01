
// imports

importScripts('js/baseDatos.js');







const nombreCache = 'c1';

const LIMITE = 50;



function limpiarCache(name, numero){
    caches.open(name)
    .then(cache => {
        return cache.keys()
        .then (keys => {
            if(keys.length > numero){
                cache.delete( keys[0] )
                .then(limpiarCache(name, numero)); 
            }
        });
    });
}






self.addEventListener('install', e => {
   
   let cacheProm =  caches.open(nombreCache)
    .then (cache => {
        return cache.addAll([
            '/',
            '/index.html' 
                

        ]);
    });
    console.log('install');
    e.waitUntil(cacheProm);
   
   
});



// Estrategia Stale-while-revalidate

self.addEventListener('fetch', e => {
    if(e.request.clone().method === 'GET'){
        e.respondWith(caches.open(nombreCache). then((cache)=>{
            return cache.match(e.request).then((cacheRes) => {
                const netFetched = fetch(e.request).then((netRes) => {
                    cache.put(e.request, netRes.clone());
                    return netRes;
                });
        return cacheRes || netFetched;
            });

        }));

    }else if (e.request.clone().method === 'POST' && e.request.clone().url.includes('/informes')){
        e.respondWith(
            guardarInforme(form_data)
        )
    }
});


       
//almacenar datos del post

let form_data;
self.addEventListener('message', e => {
    console.log('form data :', e.data );
    if( e.data.hasOwnProperty('formData')){
        form_data = e.data.formData;
        
        //console.log('otro form data: ', form_data);
    }
   
});

//si hay conexion, postear el/los informe/s

self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if ( e.tag === 'nuevo-informe' ) {

        // postear a BD cuando hay conexión
       
        e.waitUntil( enviarInformes());

        /*
        const respuesta = enviarInformes();

        console.log('respuesta: ', respuesta);
        */
       
       
        self.registration.showNotification('Informe enviado al cliente y a Base de Datos');
 
        

        
       
    }

   
});


