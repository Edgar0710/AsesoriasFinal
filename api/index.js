const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://edgar:Ragde1298@clusteredgar.tname.gcp.mongodb.net/asesorias?retryWrites=true&w=majority')
app.set('port',process.env.PORT||3000);
app.use(express.json());

app.use(require('./rutas/asesorias'));

app.listen(app.get('port'),()=>{
    console.log(`Server on port ${app.get('port')}.`);
});