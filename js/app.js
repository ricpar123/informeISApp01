



if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js').then( reg => {
        console.log('sw registrado with scope: ', reg.scope);
    }, err => {
        console.log('sw registro fail', err);
    });
}
