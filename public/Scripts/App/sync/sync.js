var db = new Dexie("DBAsesorias");
let url_api='https://asesorias-edgar0710.vercel.app/asesorias/';
var database={
Init: function() {
    db.version(1).stores({
        Asesorias: `
          ++id,
          txt_name,
          txt_apaterno,
          txt_amaterno,
          ddl_carrera,ddl_cuatri,
          group,
          au_descripcion,ddl_docente,materia,time,date`
      }
      );
      navigator.serviceWorker.ready.then((swRegistration)=>{
        return swRegistration.sync.register('syncData');
    }).then(function (){
        console.log('Se registro la sincronización');
    }) 
},
PostDataFetch: function(jsonData) {
    fetch(url_api, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
      }).then(response => response.json())
      .then(data => {
        Mensaje.Show("success",null,"Asesoria agregada con exito online");
      })
      .catch(function(err) {
        database.Insert(jsonData);
      })
},
Insert: function(jsonData) {
    db.Asesorias.bulkPut([jsonData]).then(()=>{
        console.log('Se inserto con exito');
        Mensaje.Show("success",null,"Asesoria agregada con exito offline");
    }).catch(function(error){
      console.log(error);
      Mensaje.Show("error","","Algo salio mal");
    })
}
,GetData:function(){
    db.allDocs({include_docs: true, descending: true}, function(err, doc) {
       console.log(doc);
      });
},
syncData: function(){
  db.transaction('rw', db.Asesorias, () => {
 
 let data = db.Asesorias;
 console.log(data);
 if(data!= undefined){
  data.each((element)=>{
    console.log("se sincronizo un elemento");
    console.log(element.id);
   database.PostDataFetch(element);
     database.deleteElement(element.id);
 })
}});

},
deleteElement:  function(id){
  console.log(id);
 var a= db.Asesorias.delete(id).then(function(){


  console.log('Se elimino de la bd ',id);
 });
}

}
