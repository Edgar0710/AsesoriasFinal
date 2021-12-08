
var Form={
Init:function(){
 Form.AddEvents();
 
},
AddEvents:function(){
    $('#form_asesoria').on('submit', function(e) { 
        e.preventDefault();
      var jsonData=$(this).serializeArray()
        .reduce(function(a, z) { a[z.name] = z.value; return a; }, {});
        console.log(jsonData);
         database.PostDataFetch(jsonData);
      });
}
}

window.addEventListener('load', function(){
    Form.Init();
})