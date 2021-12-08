importScripts('/Scripts/Vendors/dexie.js');
importScripts('/Scripts/Vendors/sweetalert2.all.min.js');
importScripts('/Scripts/App/sync/sync.js');
importScripts( '/Scripts/Vendors/Mensaje-1.0.js');

const _staticCache='staticCache@v2';//Save local data
const _dynamicCache='dynamicCache@v1.2';//Save files that not contempled for the user
const _inmutableCahe='inmutableCahe@v1';//Save data that  never change
self.addEventListener('install', function (eventinstall) {

  let files_appshell = [
    "/",
    '/index.html',
    '/Content/css/App/style.css'
  ];
  let files_inmutable = [
      '/Scripts/Vendors/dexie.js',
      'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js',
      'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js',
      '/Scripts/App/sync/sync.js',
      '/Scripts/App/main/main.js',
      '/Scripts/App/formulario/form.js',
      '/Scripts/Vendors/sweetalert2.all.min.js',
      '/Scripts/Vendors/Mensaje-1.0.js'
      
  ]

  const static_cache=caches.open(_staticCache).then(cache => {
    return cache.addAll(files_appshell);
  }).catch(error => {
    console.log(error);
  });
  const inmutable_cache=caches.open(_inmutableCahe).then(cache => {
    return cache.addAll(files_inmutable);
  }).catch(error => {
    console.log(error);
  });
eventinstall.waitUntil(
Promise.all([static_cache,inmutable_cache])
);
});



self.addEventListener('activate', event=>{

  event.waitUntil(
      caches.keys().then(cachesList=>Promise.all(
          cachesList.map(cacheName=>{
              if(_staticCache!=(cacheName)&&_inmutableCahe!=cacheName){
                  return caches.delete(cacheName);
              }
          })
      )).then(()=>{
          console.log('eleminados')
      })
  )
 
})




self.addEventListener('fetch', (event) => {


const res = caches.match(event.request)
 .then((param) => {
   return param ? param : fetch(event.request);
 })
 .catch((error) => {
   console.log(error); 
 });

event.respondWith(res);
});

self.addEventListener('message',object=>{
  switch(object.data.action){
    case 'skipWaiting':
    self.skipWaiting();
    break;
    case '':
      break;
    default:
      console.log("Erro")
      break;
  }
})

self.addEventListener('sync',function(event) {
  if(event.tag=='syncData'){
    event.waitUntil( database.syncData());
  }
})
